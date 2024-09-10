import { StyleSheet, View, Image } from "react-native";
import { Input } from "../shared/input/Input";
import { Colors, Gaps } from "../shared/tokens";
import { Button } from "../shared/button/Button";
import { ErrorNotification } from "../shared/errorNotification/ErrorNotification";
import { useEffect, useState } from "react";
import { CustomLink } from "../shared/customLink/CustomLink";
import { loginAtom } from "../entities/auth/model/auth.state";
import { useAtom } from "jotai";
import { router } from "expo-router";

export default function Login() {
  const [localError, setLocalError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [{ accessToken, isLoading, error }, login] = useAtom(loginAtom);

  const submit = () => {
    if (!email) {
      setLocalError("Не введен email");
      return;
    }
    if (!password) {
      setLocalError("Не введен password");
      return;
    }
    login({ email, password });
  };

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  useEffect(() => {
    if (accessToken) {
      router.replace("/(app)");
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <ErrorNotification error={localError} />
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <Input placeholder="Email" onChangeText={setEmail} />
          <Input isPassword placeholder="Пароль" onChangeText={setPassword} />
          <Button text="Войти" onPress={submit} isLoading={isLoading} />
        </View>
        <CustomLink href={"/restore"} text="Восстановить пароль" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: "center",
    padding: 55,
    flex: 1,
  },
  content: {
    gap: Gaps.g50,
    alignItems: "center",
  },
  logo: {
    width: 220,
  },
  form: {
    alignSelf: "stretch",
    gap: Gaps.g16,
  },
});
