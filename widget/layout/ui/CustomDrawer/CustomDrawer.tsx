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
import { logoutAtom } from "../../../../entities/auth/model/auth.state";
import { loadProfileAtom } from "../../../../entities/user/model/user.state";
import { UserMenu } from "../../../../entities/user/ui/UserMenu/UserMenu";
import CoursesIcon from "../../../../assets/menu/courses";
import ProfileIcon from "../../../../assets/menu/profile";
import MenuItem from "../../../../entities/layout/ui/MenuItem/MenuItem";

const MENU = [
  { text: "Курсы", icon: <CoursesIcon />, path: "index" },
  { text: "Профиль", icon: <ProfileIcon />, path: "profile" },
];

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
        {MENU.map((menu) => (
          <MenuItem key={menu.path} {...menu} drawer={props} />
        ))}
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
