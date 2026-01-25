import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//Через пропси передаю іконку і чи пароль це
interface AppInputProps extends TextInputProps {
    iconName?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
}

export const AppInput = ({ iconName, isPassword, className, ...props }: AppInputProps) => {
    const [isSecure, setIsSecure] = useState(isPassword);

    return (
        <View className={`w-full bg-white/10 border border-white/20 rounded-2xl flex-row items-center px-4 mb-4 ${className}`}>
            {/* Іконка зліва */}
            {iconName && (
                <Ionicons name={iconName} size={22} color="rgba(255, 255, 255, 0.6)" className="mr-3" />
            )}

            {/* Поле введення */}
            <TextInput
                {...props}
                secureTextEntry={isSecure}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="flex-1 py-4 text-white text-base"
            />

            {/* Кнопка "ока" для пароля */}
            {isPassword && (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <Ionicons
                        name={isSecure ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="rgba(255, 255, 255, 0.6)"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};