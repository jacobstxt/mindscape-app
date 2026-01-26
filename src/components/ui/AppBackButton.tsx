import {useRouter} from "expo-router";
import {Platform, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export const AppBackButton = () => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => {router.back()}}
            className="p-2 bg-white/10 rounded-full items-center justify-center border border-white/20"
            style={{ marginTop: Platform.OS === 'ios' ? 0 : 10}}
        >
            <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
    );
};