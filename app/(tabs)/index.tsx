import React from 'react';
import { View, Text, ScrollView, TouchableOpacity,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";
import { useColorScheme } from "nativewind";


export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const userName = "Максим";
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View className="flex-1 bg-slate-50 dark:bg-[#0F172A]">
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    zIndex: 10,
                    overflow: 'hidden'
                }}
            >
                <BlurView
                    intensity={20}
                    tint={isDark ? "dark" : "light"}
                    style={StyleSheet.absoluteFill}
                />
            </View>

        <ScrollView
            className="flex-1 bg-slate-50 dark:bg-[#0F172A]"
            contentContainerStyle={{
                paddingTop: insets.top,
                paddingBottom: 100
            }}
            showsVerticalScrollIndicator={false}
        >


            <View className="px-6 pt-14  pb-6 flex-row justify-between items-center">
                <View>
                    <Text className="text-slate-500 dark:text-blue-300/60 text-base font-medium">
                        Вітаємо,
                    </Text>
                    <Text className="text-slate-900 dark:text-white text-3xl font-bold">
                        {userName} 👋
                    </Text>
                </View>
                <TouchableOpacity className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center border border-blue-200 dark:border-blue-700">
                    <Ionicons name="notifications-outline" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>


            <View className="px-6 mb-8">
                <View className="bg-[#1e3a8a] dark:bg-indigo-600 rounded-[30px] p-6 shadow-xl shadow-blue-500/50 relative overflow-hidden">
                    {/* Декоративне коло на фоні картки */}
                    <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

                    <Text className="text-white/80 text-lg font-medium mb-1">Твій Mindscape</Text>
                    <Text className="text-white text-4xl font-extrabold mb-6">Active Mode</Text>

                    <View className="flex-row justify-between items-end">
                        <View>
                            <Text className="text-white/60 text-xs uppercase tracking-widest mb-1">Прогрес завдань</Text>
                            <Text className="text-white text-xl font-bold">85% завершено</Text>
                        </View>
                        <TouchableOpacity className="bg-white px-4 py-2 rounded-xl">
                            <Text className="text-blue-600 font-bold">Деталі</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View className="px-6 mb-8">
                <Text className="text-slate-900 dark:text-white text-xl font-bold mb-4">Швидкий доступ</Text>
                <View className="flex-row flex-wrap justify-between">
                    <QuickActionItem icon="add-circle" title="Нова задача" color="bg-emerald-500" />
                    <QuickActionItem icon="calendar" title="Розклад" color="bg-amber-500" />
                    <QuickActionItem icon="stats-chart" title="Аналітика" color="bg-violet-500" />
                    <QuickActionItem icon="settings" title="Налаштування" color="bg-slate-500" />
                </View>
            </View>


            <View className="px-6">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-900 dark:text-white text-xl font-bold">Актуальні задачі</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 font-medium">Дивитись всі</Text>
                    </TouchableOpacity>
                </View>


                <TaskItem title="Налаштувати Mindscape.Api" time="10:00" status="In Progress" />
                <TaskItem title="Зробити Layout для Tabs" time="14:30" status="Done" />
                <TaskItem title="Тест на Pixel 7" time="18:00" status="Pending" />
            </View>

        </ScrollView>
        </View>
    );
}



const QuickActionItem = ({ icon, title, color }: { icon: any, title: string, color: string }) => (
    <TouchableOpacity className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl mb-4 flex-row items-center shadow-sm border border-slate-100 dark:border-slate-700">
        <View className={`${color} w-10 h-10 rounded-xl items-center justify-center mr-3`}>
            <Ionicons name={icon} size={20} color="white" />
        </View>
        <Text className="text-slate-800 dark:text-slate-200 font-semibold flex-1" numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
);


const TaskItem = ({ title, time, status }: { title: string, time: string, status: string }) => (
    <View className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-3 flex-row items-center border border-slate-100 dark:border-slate-700">
        <View className={`w-2 h-10 rounded-full mr-4 ${status === 'Done' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
        <View className="flex-1">
            <Text className="text-slate-900 dark:text-white font-bold text-base leading-5 mb-1">{title}</Text>
            <Text className="text-slate-400 text-xs font-medium uppercase tracking-tighter">{time} • {status}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
    </View>
);