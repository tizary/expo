import { StyleSheet, View, } from "react-native";
import React, { useState } from "react";
import ImageUploader from "../../shared/ImageUploader/ImageUploader";
import { Gaps } from "../../shared/tokens";
import { Avatar } from "../../entities/user/ui/Avatar/Avatar";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <View style={styles.container}>
     <Avatar image={image} />
      <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Gaps.g20,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
