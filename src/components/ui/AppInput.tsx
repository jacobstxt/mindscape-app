import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useColorScheme} from "nativewind";


//Через пропси передаю іконку і чи пароль це
interface AppInputProps extends TextInputProps {
    iconName?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
}

export const AppInput = ({ iconName, isPassword, className, ...props }: AppInputProps) => {
    const [isSecure, setIsSecure] = useState(isPassword);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const placeholderColor = isDark
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(30, 58, 138, 0.4)";

    const passwordEyeColor = isDark
        ? "#94a3b8"
        : "#1e3a8a";

    return (
        <View className={
            `w-full h-16 flex-row items-center px-4 rounded-2xl border mb-4
            bg-white/60 border-blue-100 
            /* Темна тема: класичне скло */
            dark:bg-white/10 dark:border-white/20 
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
    );
};