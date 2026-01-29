import {View, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from "@/src/store";
import {logout} from "@/src/store/authSlice";
import {Ionicons} from "@expo/vector-icons";

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View className="flex-1 bg-slate-50 dark:bg-[#0F172A] px-6 pt-20">

            <View className="items-center mb-10">
                <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4 shadow-xl">
                    <Text className="text-white text-3xl font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </Text>
                </View>

                <Text className="text-2xl font-bold text-slate-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-slate-500 dark:text-blue-300/60 text-base">
                    {user?.email}
                </Text>
            </View>

            <View className="pb-10">
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