// src/components/auth/AuthHeader.tsx
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Вбудовані іконки Expo
import {useColorScheme} from "nativewind";

interface AuthHeaderProps {
    isIcon: boolean;
    title: string;
    subtitle?: string; // Опціональний підзаголовок
}

export const AuthHeader = ({ title, subtitle,isIcon }: AuthHeaderProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <View className="items-center mt-10 mb-6">
            {isIcon && (
                <View className="bg-blue-50/50 border-blue-200 dark:bg-white/10 dark:border-white/20 p-4 rounded-full mb-6 border">
                    <Ionicons name={isDark ? "moon-outline" : "sunny-outline"} size={48} color={isDark ? "#bae6fd" : "#0284c7"}/>
                </View>
            )}


            <Text className="text-blue-950 dark:text-white text-4xl font-extrabold text-center px-4 tracking-tight">
                {title}
            </Text>

            {subtitle && (
                <Text className="text-blue-800/70 dark:text-blue-100/60 text-center mt-5 px-10 leading-relaxed text-lg font-medium">
                    {subtitle}
                </Text>
            )}
        </View>
    );
};