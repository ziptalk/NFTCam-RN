import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import NftItem from "../components/AllNft/NftItem";
import IconButton from "../components/UI/IconButton";
import { NftsContext } from "../store/nfts-context";
import {
  fetchMaterials,
  postMaterialImage,
  postMaterialMetadata,
} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import CreateButtonWithActionSheet from "../components/AllNft/CreateButtonWithActionSheet";

function renderNftItem(itemData) {
  return <NftItem {...itemData.item} />;
}

function AllNft({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [image, setImage] = useState(null);
  const [exifData, setExifData] = useState(null);

  const nftsCtx = useContext(NftsContext);

  useEffect(() => {
    getMaterials();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={"person"}
            color={"white"}
            onPress={myPageButtonHandler}
          />
        );
      },
    });
  }, [navigation, myPageButtonHandler]);

  async function getMaterials() {
    setIsFetching(true);
    try {
      const materials = await fetchMaterials();
      nftsCtx.setNfts(materials);
    } catch (error) {
      console.log("Error! ", error);
    }
    setIsFetching(false);
  }

  function myPageButtonHandler() {
    navigation.navigate("MyPage");
  }

  const imagePickerConfig = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: true,
    quality: 1,
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync(imagePickerConfig);
    setImageData(result.assets);
  }

  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync(imagePickerConfig);
    setImageData(result.assets);
  }

  function setImageData(assets) {
    setIsFetching(true);
    if (assets && assets.length > 0) {
      const selectedAsset = assets[0];

      console.log("Selected Image URI:", selectedAsset.uri);
      setImage(selectedAsset.uri);

      if (selectedAsset.exif) {
        console.log("EXIF Data:", selectedAsset.exif);
        setExifData(selectedAsset.exif);
      }
    }
    postMaterial();
  }

  async function postMaterial() {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg", // or 'image/png'
      name: "testPhoto.jpg", // any name you wish
    });

    try {
      const imageUrl = await postMaterialImage(formData);
      const responseData = await postMaterialMetadata(imageUrl, exifData);
      const newMaterial = {
        materialId: responseData.materialId,
        source: imageUrl,
        isMinting: "NONE",
        chainType: null,
      };
      nftsCtx.addNft(newMaterial);

      console.log("Image uploaded! materialId: ", responseData.materialId);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
    setIsFetching(false);
  }

  function imagePickerHandler() {
    pickImage();
  }

  function cameraHandler() {
    takePhoto();
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={nftsCtx.nfts}
        renderItem={renderNftItem}
        keyExtractor={(item) => item.materialId}
        key={2}
        numColumns={2}
        style={styles.list}
      />
      <CreateButtonWithActionSheet
        buttonStyle={styles.createButton}
        imagePickerHandler={imagePickerHandler}
        cameraHandler={cameraHandler}
      />
    </View>
  );
}

export default AllNft;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  list: {
    paddingTop: 20,
  },
  createButton: {
    position: "absolute",
    bottom: 32,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
