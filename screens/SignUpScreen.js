import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [email,setEmail] = useState ('');
    const [password,setPassword] = useState ('');
    const handleSubmit = async ()=>{
        if (email && password){
            try{
                await createUserWithEmailAndPassword(auth,email,password)
            }catch(err){
                console.log('get error : ' ,err.message);
            }
        }
    }
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4" >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../assets/images/signupimg.png')} 
                style={{width: 325, height: 110}} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} >
        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Nama Lengkap</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholder='Masukan Nama'
            />
            <Text className="text-gray-700 ml-4">Alamat Email</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={password}
                onChangeText={value => setPassword(value)}
                placeholder='Masukan Email'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                // value=""
                placeholder='Masukan Password'
            />
            <TouchableOpacity
                className="py-3 bg-blue-500 rounded-xl"
                onPress = {handleSubmit}
            >
                <Text className="font-xl font-bold text-center text-white">
                    Mendaftar
                </Text>
            </TouchableOpacity>
        </View>
        
        
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Sudah punya akun?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-blue-500"> Masuk</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
