import {View, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch} from "@/src/store";
import {logout} from "@/src/store/authSlice";
import {Ionicons} from "@expo/vector-icons";

export default function ProfileScreen() {
    const dispatch = useAppDispatch();


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-[#0F172A]">
            <Text className="text-2xl font-bold dark:text-white text-center">
                Сторінка профілю Mindscape
            </Text>

            <View className="mt-auto pb-10">
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.7}
                    className="flex-row items-center justify-center bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/30"
                >
                    <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                    <Text className="text-red-500 font-bold text-lg ml-2">
                        Вийти з акаунта
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}