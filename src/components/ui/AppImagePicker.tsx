import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';


/*Current Image тут на майбутнє для сторінки зміни профілю наприклад*/
interface AppImagePickerProps {
    onImagePicked: (uri: string) => void; // Функція-коллбек для передачі фото батьківському компоненту
    currentImage?: string | null;
}

export const AppImagePicker = ({ onImagePicked, currentImage }: AppImagePickerProps) => {
    const [image, setImage] = useState<string | null>(currentImage || null);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handlePress = () => {
        // Меню вибору
        Alert.alert(
            "Profile Picture",
            "Choose an option",
            [
                { text: "Take Photo", onPress: () => pickImage('camera') },
                { text: "Choose from Gallery", onPress: () => pickImage('library') },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const pickImage = async (mode: 'camera' | 'library') => {
        let result;

        //параметри
        const options: ImagePicker.ImagePickerOptions = {
            quality: 0.75,
            allowsEditing: true,
            aspect:[1,1],
        }

        if (mode === 'camera') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') return alert('No camera access');
            result = await ImagePicker.launchCameraAsync(options);
        } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') return alert('No gallery access');
            result = await ImagePicker.launchImageLibraryAsync(options);
        }

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            const uri = result.assets[0].uri;
            setImage(uri);
            onImagePicked(uri); // Передаємо шлях назовні
        }
    };


    return (
        <View className="items-center my-4">
            <TouchableOpacity
                onPress={handlePress}
                className={`
                    w-28 h-28 rounded-full border-2 border-dashed items-center justify-center overflow-hidden
                    bg-blue-50/50 border-[#1e3a8a] 
                    dark:bg-white/10 dark:border-white/20
                `}
            >
                {image ? (
                    <Image source={{ uri: image }} className="w-full h-full" />
                ) : (
                    <View className="items-center">
                        <Ionicons name="camera-outline" size={32} color={isDark ? "rgba(255,255,255,0.4)" : "#1e3a8a"} />
                        <Text className="text-blue-900/60 dark:text-white/40 text-[10px] font-bold mt-1 uppercase tracking-tighter">UPLOAD</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};