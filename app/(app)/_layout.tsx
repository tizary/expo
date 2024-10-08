import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Colors, Fonts } from "../../shared/tokens";
import { MenuButton } from "../../features/layout/ui/MenuButton/MenuButton";
import { CustomDrawer } from "../../widget/layout/ui/CustomDrawer/CustomDrawer";
import { StyleSheet } from "react-native";

export default function AppLayout() {
  const { accessToken } = useAtomValue(authAtom);
  if (!accessToken) {
    return <Redirect href={"/login"} />;
  }
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.blackLight,
            shadowColor: Colors.blackLight,
            shadowOpacity: 0,
          },
          headerLeft: () => {
            return <MenuButton navigation={navigation} />;
          },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: Fonts.regular,
            fontSize: Fonts.f20,
          },
          headerTitleAlign: "center",
          sceneContainerStyle: {
            backgroundColor: Colors.black,
          },
        })}
      >
        <Drawer.Screen name="index" options={{ title: "Мои курсы" }} />
        <Drawer.Screen name="profile" options={{ title: "Профиль" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

 const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
 })