import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
    return (
        <>
            <View className="flex-1 bg-white dark:bg-[#0F172A] items-center justify-center px-6 relative overflow-hidden">

                <View className="absolute top-20 -left-20 w-64 h-64 bg-blue-300 dark:bg-blue-600/20 rounded-full blur-3xl" />
                <View className="absolute bottom-20 -right-20 w-80 h-80 bg-indigo-300 dark:bg-indigo-600/10 rounded-full blur-3xl" />


                <View className="mb-10 items-center relative">
                    <Ionicons name="planet-outline" size={150} color="#60A5FA" style={{ opacity: 0.8 }} />
                </View>


                <Text className="text-blue-500 dark:text-white text-3xl font-extrabold mb-3 text-center tracking-wider">
                    Ой! Тут порожньо.
                </Text>

                <Text className="text-blue-500 dark:text-blue-200 text-center text-lg mb-12 leading-6 px-4 opacity-80">
                    Схоже, ви зайшли у недосліджену частину свого Mindscape. Ця сторінка не існує.
                </Text>

                <Link href="/" asChild>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="flex-row items-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-blue-600 px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/30"
                    >
                        <Ionicons name="rocket-outline" size={24} color="white" style={{ marginRight: 10 }} />
                        <Text className="text-white font-bold text-lg">
                            Повернутися на головну
                        </Text>
                    </TouchableOpacity>
                </Link>

                <Text className="absolute bottom-10 text-blue-600 dark:text-blue-400/40 text-sm">
                    Error 404 • Lost in Space
                </Text>
            </View>
        </>
    );
}