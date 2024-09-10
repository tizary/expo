import { useSetAtom } from "jotai";
import { View, Text } from "react-native";
import { logoutAtom } from "../../entities/auth/model/auth.state";
import { Button } from "../../shared/button/Button";

export default function MyCourses() {
const logout = useSetAtom(logoutAtom)

  return (
    <View>
      <Text>index</Text>
      <Button text='Выход' onPress={logout} />
    </View>
  );
}
