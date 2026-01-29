import {Redirect, Stack} from "expo-router";
import "../global.css"
import {useColorScheme} from "nativewind";
import {useSystemBars} from "@/src/hooks/UseSystemBars";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { StatusBar } from 'react-native';
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {Provider} from "react-redux";
import {initializeAuth} from "@/src/store/authSlice";
import * as SecureStore from 'expo-secure-store';
import {useEffect, useState} from "react";
import {store, useAppDispatch, useAppSelector} from "@/src/store";


export default function RootLayout() {
    return (
        <Provider store={store}>
            <RootLayoutNav />
        </Provider>
    );
}


function RootLayoutNav() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const [isMounted, setIsMounted] = useState(false);

    useSystemBars();

    useEffect(() => {
        async function loadStorageData() {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                dispatch(initializeAuth(token));
            } catch (e) {
                console.error("Failed to load token", e);
                dispatch(initializeAuth(null));
            } finally {
                setIsMounted(true);
            }
        }
        loadStorageData();
    }, [dispatch]);


    if (isLoading || !isMounted) return null;

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="+not-found" />
                </Stack>

                {user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />}
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
