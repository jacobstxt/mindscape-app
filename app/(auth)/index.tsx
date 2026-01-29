import { View } from "react-native";
import {ScreenGradient} from "@/src/components/layout/ScreenGradient";
import {AuthHeader} from "@/src/components/auth/AuthHeader";
import {AppButton} from "@/src/components/ui/AppButton";
import {useRouter} from "expo-router";

export default function Index() {
    const router = useRouter();

  return (
      <ScreenGradient className="p-6 start items-center">

          <View className="flex-1 justify-between py-10">

              {/* Верхня частина: Лого та Текст */}
              <AuthHeader
                  title="Welcome to Mindscape"
                  subtitle="Create an account to get started on your health and happiness journey."
                  isIcon={true}
              />

              {/*Нижня частина: кнопки */}
              <View className="gap-y-6">
                  {/*Через пропси: title і variant передаю в кнопки надпис і дизайн*/}
                  <AppButton
                      title="Sign Up"
                      variant="primary"
                      onPress={() => router.push('/sign-up')}
                  />

                  <AppButton
                      title="Log In"
                      variant="outline"
                      onPress={() => router.push('/log-in')}
                  />
              </View>

          </View>
      </ScreenGradient>
  );
}
