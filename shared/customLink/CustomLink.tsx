import { Link, LinkProps,  } from "expo-router";
import { Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../tokens";

export function CustomLink({text, ...props}: LinkProps<string> & { text: string}) {
    return (
      <Link style={styles.link} {...props}>
      <Text>{text}</Text>  
      </Link>
    );
}

const styles = StyleSheet.create({
  link: {
    color: Colors.link,
    fontSize: Fonts.f18,
    fontFamily: Fonts.regular,
  },
});