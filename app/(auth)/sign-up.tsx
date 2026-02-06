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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from "@/src/validation/authSchema";
import {AppLoader} from "@/src/components/layout/AppLoader"; // шлях до схеми


export default function SignUp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [register, {isLoading}] = useRegisterMutation();

    const {control, handleSubmit, formState: { errors }} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            imageFile: undefined,
        }
    });

    const onValidSubmit = async (data: RegisterFormData) => {
        console.log("Attempting register with:", {data});
        try {
            const result = await register(data).unwrap();
            dispatch(loginSuccess(result.token));
        } catch (err: any) {
            console.error("Register failed", err);
            // Виводимо помилку, яку ми налаштували в AuthController на бекенді
            Alert.alert("Помилка реєстрації", err.data?.Errors?.Email || "Щось пішло не так");
        }
    };



    /*const handleRegister = async () => {
        try {
            const result = await register(form).unwrap();
            dispatch(loginSuccess(result.token));
        } catch (err) {
            console.error("Register failed", err);
            Alert.alert("Помилка входу", "Невірний логін або пароль");
        }
    };*/

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Входимо в систему..."
            />
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


                        <View className={'mt-8'}>
                        {/* Перевикористовую компонент з header */}
                        <AuthHeader
                            title="Create Account"
                            subtitle="Fill in your details below to join the Mindscape community."
                            isIcon={false}
                        />

                        {/* Контейнер для полів введення. Використовую компонент AppInput та AppImagePicker */}
                        <View className="gap-y-1">

                            <Controller control={control} name={"imageFile"}
                                        render={({ field: { onChange } }) => (
                                            <AppImagePicker
                                                onImagePicked={(uri) => onChange({
                                                    uri, name: 'avatar.jpg', type: 'image/jpeg'
                                                })}
                                                error={errors.imageFile?.message}
                                            />
                                        )}
                            />


                            <View className="flex-row items-start gap-x-3">

                                <Controller
                                    control={control}
                                    name="firstName"
                                    render={({ field: { onChange, value } }) => (
                                        <AppInput
                                            className="flex-1"
                                            placeholder="First Name"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.firstName?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={({ field: { onChange, value } }) => (
                                        <AppInput
                                            className="flex-1"
                                            placeholder="Last Name"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.lastName?.message}
                                        />
                                    )}
                                />

                            </View>

                            {/* autoCapitalize - вимикає shift який автоматично вмикає телефон  */}
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <AppInput
                                        placeholder="Email Address"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={value}
                                        onChangeText={onChange}
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (
                                    <AppInput
                                        placeholder="Password"
                                        isPassword={true}
                                        value={value}
                                        onChangeText={onChange}
                                        error={errors.password?.message}
                                    />
                                )}
                            />
                        </View>

                        {/* Кнопка реєстрації */}
                        <View className="mt-2">
                            <AppButton
                                title={isLoading ? "Loading..." : "Sign up"}
                                onPress={handleSubmit(onValidSubmit)}
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
        </>
    );
}