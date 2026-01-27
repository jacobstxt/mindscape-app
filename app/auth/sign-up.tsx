import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {ScreenGradient} from "@/src/components/layout/ScreenGradient";
import {AuthHeader} from "@/src/components/auth/AuthHeader";
import {AppInput} from "@/src/components/ui/AppInput";
import {AppButton} from "@/src/components/ui/AppButton";
import {AppImagePicker} from "@/src/components/ui/AppImagePicker";
import {AppBackButton} from "@/src/components/ui/AppBackButton";


export default function SignUp() {
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);

    return (
        <ScreenGradient className="px-6">
            {
                /* KeyboardAvoidingView дозволяє формі "підстрибувати" вгору,
                коли відкривається клавіатура. Це критично для UX.
                */
            }
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


                    <View>
                    {/* Перевикористовую компонент з header */}
                    <AuthHeader
                        title="Create Account"
                        subtitle="Fill in your details below to join the Mindscape community."
                        isIcon={false}
                    />

                    {/* Контейнер для полів введення. Використовую компонент AppInput та AppImagePicker */}
                    <View className="gap-y-1">
                        <AppImagePicker onImagePicked={(uri) => setAvatar(uri)} />

                        <AppInput
                            placeholder="Full Name"
                            iconName="person-outline"
                        />
                        {/* autoCapitalize - вимикає shift який автоматично вмикає телефон  */}
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
                        <AppInput
                            placeholder="Confirm Password"
                            iconName="lock-closed-outline"
                            isPassword={true}
                        />
                    </View>

                    {/* Кнопка реєстрації */}
                    <View className="mt-6">
                        <AppButton
                            title="Sign Up"
                            onPress={() => console.log('Registering...')}
                        />
                    </View>

                        <TouchableOpacity
                            className="mt-6 items-center"
                            activeOpacity={0.7}
                            onPress={() => router.replace('/auth/log-in')}
                        >
                            <Text className="text-blue-900/60 dark:text-blue-100/50 text-center px-10 leading-6 text-base">
                                Already have an account?{' '}
                                <Text className="text-[#1e3a8a] dark:text-white font-bold underline">
                                    Log in
                                </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenGradient>
    );
}