import {SafeAreaView,SafeAreaViewProps} from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";


interface ScreenGradientProps extends SafeAreaViewProps {
    children: React.ReactNode; // Всі елементи, які ми покладемо всередину
}

export const ScreenGradient = ({ children, className, ...props }: ScreenGradientProps) => {
    return (
        // LinearGradient має бути зовнішнім контейнером і займати весь простір
        <LinearGradient
            // Кольори градієнта (від темного верху до світлого низу)
            colors={['#2c5364', '#203a43', '#f1a7a1']}
            // Напрямок градієнта: від верхнього лівого (0,0) до нижнього правого (1,1)
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            // Важливо: NativeWind іноді погано працює прямим стилем на LinearGradient,
            // тому flex: 1 задаємо через звичайний style
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