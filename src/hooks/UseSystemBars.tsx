import { useEffect } from "react";
import {Platform, useColorScheme} from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export function useSystemBars() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
        }
    }, [isDark]);
}
