import {useRouter} from "expo-router";
import {Platform, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

export const AppBackButton = () => {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <TouchableOpacity
            onPress={() => {router.back()}}
            className="p-3 bg-blue-500/10 border-blue-200 dark:bg-white/10 dark:border-white/20 rounded-full items-center justify-center border"
            style={{ marginTop: Platform.OS === 'ios' ? 0 : 10}}
        >
            <Ionicons name="chevron-back" size={24} color={isDark ? "white" : "#1e3a8a"} />
        </TouchableOpacity>
    );
};