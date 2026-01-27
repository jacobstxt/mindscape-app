import { Stack } from "expo-router";
import "../global.css"
import {useColorScheme} from "react-native";
import {useSystemBars} from "@/src/hooks/UseSystemBars";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { StatusBar } from 'react-native';


export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  useSystemBars();

  return(
  <SafeAreaProvider>
    <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
    <Stack screenOptions={{headerShown:false}}/>;
  </SafeAreaProvider>
  );
}
