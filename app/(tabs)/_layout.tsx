import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {useColorScheme} from "nativewind";

export default function TabLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const activeColor = isDark ? '#60A5FA' : '#1E3A8A'; // Блакитний для темної, червоний для світлої
    const inactiveColor = isDark ? '#94a3b8' : '#8e8e93';
    const panelBg = isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)'; // Твій темно-синій або білий
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: panelBg,
                    position: 'absolute',
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -10 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Головна',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профіль',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}