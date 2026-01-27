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
            ? 'bg-[#1e3a8a] border-blue-600 dark:bg-blue-400 dark:border-blue-500' 
            : 'bg-blue-100/50 border-blue-300 dark:bg-white/10 dark:border-white/20'  
    } ${className || ''}`;



    const textStyle = `text-xl font-bold ${
        isPrimary
            ? 'text-white'
            : 'text-[#1e3a8a] dark:text-white'
    }`;


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