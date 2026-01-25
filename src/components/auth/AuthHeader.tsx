// src/components/auth/AuthHeader.tsx
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Вбудовані іконки Expo

interface AuthHeaderProps {
    title: string;
    subtitle?: string; // Опціональний підзаголовок
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
    return (
        <View className="items-center mt-10 mb-12">
            {/* Іконка сонечка. Колір підберемо під персиковий відтінок референса */}
            <View className="bg-white/10 p-4 rounded-full mb-6 border border-white/20">
                <Ionicons name="sunny-outline" size={48} color="#f1a7a1" />
            </View>

            {/* Заголовок */}
            <Text className="text-white text-3xl font-bold text-center px-4">
                {title}
            </Text>

            {/* Підзаголовок (якщо він переданий) */}
            {subtitle && (
                <Text className="text-slate-300 text-center mt-5 px-10 leading-6 text-base">
                    {subtitle}
                </Text>
            )}
        </View>
    );
};