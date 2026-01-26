import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialButtonProps {
    type: 'google' | 'apple';
    onPress: () => void;
}

export const SocialButton = ({ type, onPress }: SocialButtonProps) => {
    const isGoogle = type === 'google';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center justify-center py-3 px-4 rounded-2xl mb-3 border ${
                isGoogle ? 'bg-white border-slate-200' : 'bg-black border-black'
            }`}
        >
            <Ionicons
                name={isGoogle ? 'logo-google' : 'logo-apple'}
                size={20}
                color={isGoogle ? '#DB4437' : 'white'}
            />
            <Text className={`ml-3 font-semibold ${isGoogle ? 'text-slate-900' : 'text-white'}`}>
                Continue with {isGoogle ? 'Google' : 'Apple'}
            </Text>
        </TouchableOpacity>
    );
};