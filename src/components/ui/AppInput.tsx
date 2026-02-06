import React, { useState } from 'react';
import { View, TextInput,Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useColorScheme} from "nativewind";
import {FieldError} from "react-hook-form";


//Через пропси передаю іконку і чи пароль це
interface AppInputProps extends TextInputProps {
    iconName?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    error?: string | FieldError;
}

export const AppInput = ({ iconName, isPassword, className,error, ...props }: AppInputProps) => {
    const [isSecure, setIsSecure] = useState(isPassword);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const errorMessage = typeof error === 'string' ? error : error?.message;

    const placeholderColor = isDark
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(30, 58, 138, 0.4)";

    const passwordEyeColor = isDark
        ? "#94a3b8"
        : "#1e3a8a";

    return (
        <View className={`${className}`}>
            <View className={
                `h-16 flex-row items-center px-4 rounded-2xl border mb-2
                bg-white/60 border-blue-100 
                /* Темна тема: класичне скло */
                dark:bg-white/10 dark:border-white/20
                ${errorMessage
                    ? 'border-red-500'
                    : 'border-blue-100 dark:border-white/20'} 
                ${className}`
            }>
                {iconName && (
                    <Ionicons name={iconName} size={22} color={isDark ? "white" : "#1e3a8a"} className="mr-3" />
                )}

                {/* Поле введення */}
                <TextInput
                    {...props}
                    secureTextEntry={isSecure}
                    placeholderTextColor={placeholderColor}
                    style={{
                        height: '100%',
                        textAlignVertical: 'center',
                        paddingTop: 0,
                        paddingBottom: 0,
                        fontSize: 18,
                        lineHeight: 22,
                    }}
                    className="flex-1  text-slate-900 dark:text-white text-lg"
                />

                {/* Кнопка "ока" для пароля */}
                {isPassword && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Ionicons
                            name={isSecure ? "eye-off-outline" : "eye-outline"}
                            size={22}
                            color={passwordEyeColor}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ minHeight: 20 }}>
                {errorMessage && (
                    <Text className="text-red-500 text-[12px] ml-2">
                        {errorMessage}
                    </Text>
                )}
            </View>
        </View>
    );
};