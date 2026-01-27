import {SafeAreaView,SafeAreaViewProps} from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {useColorScheme} from "nativewind";


interface ScreenGradientProps extends SafeAreaViewProps {
    children: React.ReactNode; // Всі елементи, які ми покладемо всередину
}

export const ScreenGradient = ({ children, className, ...props }: ScreenGradientProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const darkColors = ['#020617', '#0f172a', '#1e3a8a'] as const;
    const lightColors = ['#f8fafc', '#e0f2fe', '#bae6fd'] as const;

    return (
        // LinearGradient має бути зовнішнім контейнером і займати весь простір
        <LinearGradient
            colors={isDark ? darkColors : lightColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/*
         SafeAreaView тепер всередині.
         Ми додаємо `flex-1`, щоб він розтягнувся, і дозволяємо передавати
         додаткові класи через `className` (наприклад, для відступів `p-6`)
          */}
            <SafeAreaView className={`flex-1 ${className || ''}`} {...props}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};