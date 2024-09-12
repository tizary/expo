import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Colors } from "../../../../shared/tokens";
import { CustomLink } from "../../../../shared/customLink/CustomLink";
import { CloseDrawer } from "../../../../features/layout/ui/CloseDrawer/CloseDrawer";
import { useAtom, useSetAtom } from "jotai";
import { logoutAtom } from "../../../auth/model/auth.state";
import { loadProfileAtom } from "../../../user/model/user.state";
import { UserMenu } from "../../../user/ui/UserMenu/UserMenu";

export function CustomDrawer(props: DrawerContentComponentProps) {
  const logout = useSetAtom(logoutAtom);
  const [profile, loadProfile] = useAtom(loadProfileAtom);

  useEffect(() => {
    loadProfile();
  }, []);
   
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.content}>
        <CloseDrawer {...props.navigation} />
        <UserMenu user={profile.profile} />
      </View>
      <View style={styles.footer}>
        <CustomLink text="Выход" href={"/login"} onPress={() => logout()} />
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo.png")}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  footer: {
    gap: 50,
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 160,
  },
});
