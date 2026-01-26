import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {ScreenGradient} from "@/src/components/layout/ScreenGradient";
import {AuthHeader} from "@/src/components/auth/AuthHeader";
import {AppInput} from "@/src/components/ui/AppInput";
import {AppButton} from "@/src/components/ui/AppButton";
import {AppBackButton} from "@/src/components/ui/AppBackButton";


export default function SignUp() {
    const router = useRouter();

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


                    <View className="mt-40">
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
                            autoCapitalize="none"
                        />
                        <AppInput
                            placeholder="Password"
                            iconName="lock-closed-outline"
                            isPassword={true}
                        />
                    </View>


                    <View className="mt-6">
                        <AppButton
                            title="Log in"
                            onPress={() => console.log('Log in...')}
                        />
                    </View>

                    {/* Посилання на вхід, якщо вже є акаунт */}
                    <TouchableOpacity
                        className="mt-8 items-center"
                        onPress={() => router.replace('/auth/sign-up')}
                    >
                        <Text className="text-slate-300 text-center px-10 leading-6 text-base">
                            Don&#39;t have an account? <Text className="text-[#f1a7a1] font-bold">Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenGradient>
    );
}