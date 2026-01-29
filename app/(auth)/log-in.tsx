import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import {ScreenGradient} from "@/src/components/layout/ScreenGradient";
import {AuthHeader} from "@/src/components/auth/AuthHeader";
import {AppInput} from "@/src/components/ui/AppInput";
import {AppButton} from "@/src/components/ui/AppButton";
import {AppBackButton} from "@/src/components/ui/AppBackButton";
import {SocialButton} from "@/src/components/auth/SocialAuthButton";
import {useLoginMutation} from "@/src/services/AuthService";
import {loginSuccess} from "@/src/store/authSlice";
import {useAppDispatch} from "@/src/store";
import {BASE_URL} from "@/src/constants/Urls";



export default function LogIn() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, {isLoading, error}] = useLoginMutation();


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
            return;
        }

        console.log("Base URL:", BASE_URL);
        console.log("Attempting login with:", { email, password });

        try {
            const result = await login({ email, password }).unwrap();
            dispatch(loginSuccess(result.token));
        } catch (err) {
            console.error("Login failed", err);
            Alert.alert("Помилка входу", "Невірний логін або пароль");
        }
    };

    return (
        <ScreenGradient className="px-6">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-10"
                >

                    <View className="items-start">
                        <AppBackButton />
                    </View>


                    <View className="mt-24">
                    <AuthHeader
                        title="Welcome back!"
                        subtitle="Please log in to your account"
                        isIcon={false}
                    />
                        
                        
                    <View className="gap-y-1">
                        <AppInput
                            placeholder="Email Address"
                            iconName="mail-outline"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        <AppInput
                            placeholder="Password"
                            iconName="lock-closed-outline"
                            value={password}
                            onChangeText={setPassword}
                            isPassword={true}
                        />
                    </View>


                    <View className="mt-6">
                        <AppButton
                            title={isLoading ? "Loading..." : "Log in"}
                            onPress={handleLogin}
                            disabled={isLoading}
                        />
                    </View>

                        <View className="mt-8">
                            <View className="flex-row items-center mb-6">
                                <View className="flex-1 h-[1px] bg-blue-200 dark:bg-white/10" />

                                <Text className="mx-4 text-blue-900/40 dark:text-white/30 text-xs font-bold uppercase tracking-widest">
                                    OR
                                </Text>

                                <View className="flex-1 h-[1px] bg-blue-200 dark:bg-white/10" />
                            </View>

                            <SocialButton type="google" onPress={() => console.log('Google login')} />
                            <SocialButton type="apple" onPress={() => console.log('Apple login')} />
                        </View>


                        <TouchableOpacity
                            className="mt-6 items-center"
                            activeOpacity={0.7}
                            onPress={() => router.replace('/sign-up')}
                        >
                            <Text className="text-blue-900/60 dark:text-blue-100/50 text-center px-10 leading-6 text-base">
                                Don&#39;t have an account?{' '}
                                <Text className="text-[#1e3a8a] dark:text-white font-bold underline">
                                    Sign up
                                </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenGradient>
    );
}