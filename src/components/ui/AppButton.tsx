import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';

// Типи пропсів для кнопок
interface AppButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'outline'; // Два варіанти вигляду primary - повністю залита кнопка, outline - лише border
}

export const AppButton = ({ title, variant = 'primary', className, ...props }: AppButtonProps) => {
    // Логіка стилів залежно від варіанту
    const isPrimary = variant === 'primary';

    // Базові стилі для всіх кнопок
    const containerStyle = `py-4 px-12 rounded-xl items-center justify-center border ${
        isPrimary
            ? 'bg-[#f1a7a1] border-[#f1a7a1]' // Залитий варіант кнопки
            : 'bg-white/10 border-white/40'   // Напівпрозорий варіант кнопки
    } ${className || ''}`;


    //Стиль для тексту
    const textStyle = `text-xl font-bold text-white `


    return (
        //За допомогою ...props можу передавати в button OnPress наприклад
        <TouchableOpacity
            activeOpacity={0.6}
            className={containerStyle}
            {...props}
        >
            <Text className={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};