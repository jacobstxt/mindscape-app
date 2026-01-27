import { Stack } from "expo-router";
import "../global.css"
import {useColorScheme} from "nativewind";
import {useSystemBars} from "@/src/hooks/UseSystemBars";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { StatusBar } from 'react-native';
import {ThemeProvider} from "@react-navigation/core";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";


export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark'
  useSystemBars();

  return(
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
          <Stack screenOptions={{headerShown:false}}/>
        </SafeAreaProvider>
      </ThemeProvider>
  );
}
