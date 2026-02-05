import React from 'react';
import {View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import {ScreenGradient} from "@/src/components/layout/ScreenGradient";
import {AuthHeader} from "@/src/components/auth/AuthHeader";
import {AppInput} from "@/src/components/ui/AppInput";
import {AppButton} from "@/src/components/ui/AppButton";
import {AppImagePicker} from "@/src/components/ui/AppImagePicker";
import {AppBackButton} from "@/src/components/ui/AppBackButton";
import {useRegisterMutation} from "@/src/services/AuthService";
import {loginSuccess} from "@/src/store/authSlice";
import {useAppDispatch} from "@/src/store";
import {useForm} from "@/src/hooks/UseForm";
import {IRegister} from "@/src/types/auth/IRegister";


export default function SignUp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [register, {isLoading, error}] = useRegisterMutation();

    const { form, setForm } = useForm<IRegister>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageFile: undefined,
    });

    const handleRegister = async () => {
        try {
            const result = await register(form).unwrap();
            dispatch(loginSuccess(result.token));
        } catch (err) {
            console.error("Register failed", err);
            Alert.alert("Помилка входу", "Невірний логін або пароль");
        }
    };

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

                        <AppImagePicker
                            onImagePicked={(uri) => setForm({
                                ...form,
                                imageFile: {
                                    uri: uri,
                                    name: 'avatar.jpg',
                                    type: 'image/jpeg'
                                }
                            })}
                        />

                        <View className="flex-row gap-x-3">

                            <AppInput
                                className="flex-1"
                                placeholder="First Name"
                                iconName="person-outline"
                                value={form.firstName}
                                onChangeText={(text) => setForm({...form, firstName: text})}
                            />

                            <AppInput
                                className="flex-1"
                                placeholder="Last Name"
                                iconName="person-outline"
                                value={form.lastName}
                                onChangeText={(text) => setForm({...form, lastName: text})}
                            />

                        </View>

                        {/* autoCapitalize - вимикає shift який автоматично вмикає телефон  */}
                        <AppInput
                            placeholder="Email Address"
                            iconName="mail-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={form.email}
                            onChangeText={(text) => setForm({...form, email: text})}
                        />
                        <AppInput
                            placeholder="Password"
                            iconName="lock-closed-outline"
                            isPassword={true}
                            value={form.password}
                            onChangeText={(text) => setForm({...form, password: text})}
                        />
                    </View>

                    {/* Кнопка реєстрації */}
                    <View className="mt-6">
                        <AppButton
                            title={isLoading ? "Loading..." : "Sign up"}
                            onPress={handleRegister}
                            disabled={isLoading}
                        />
                    </View>

                        <TouchableOpacity
                            className="mt-6 items-center"
                            activeOpacity={0.7}
                            onPress={() => router.replace('/log-in')}
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