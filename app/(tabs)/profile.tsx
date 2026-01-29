import { View, Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-[#0F172A]">
            <Text className="text-2xl font-bold dark:text-white text-center">
                Сторінка профілю Mindscape
            </Text>
        </View>
    );
}