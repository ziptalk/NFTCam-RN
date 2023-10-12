import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [cursor, setCursor] = useState();

  const nftsCtx = useContext(NftsContext);

  // TODO: 이미지 캐싱 처리하기

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
      const materials = await fetchMaterials(cursor);
      cursor ? nftsCtx.pushNfts(materials) : nftsCtx.setNfts(materials);
      if (materials.length < 8) {
        setIsLast(true);
      }
      setCursor(materials.at(-1).materialId);
    } catch (error) {
      console.log("Error! ", error.response);
    }
    setIsFetching(false);
  }

  function onRefresh() {
    if (!isFetching && !isRefreshing) {
      setIsRefreshing(true);
      setCursor(null);
      setIsLast(false);
      getMaterials();
      setIsRefreshing(false);
    }
  }

  function onEndReached() {
    if (!isFetching && !isLast) {
      getMaterials();
    }
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

      if (selectedAsset.exif) {
        console.log("EXIF Data:", selectedAsset.exif);
      }
      postMaterial(selectedAsset);
    } else {
      setIsFetching(false);
    }
  }

  async function postMaterial(selectedAsset) {
    const formData = new FormData();
    formData.append("image", {
      uri: selectedAsset.uri,
      type: "image/jpeg",
      name: "testPhoto.jpg",
    });

    try {
      const imageUrl = await postMaterialImage(formData);
      //   console.log("imageUrl: ", imageUrl);
      const imageContent = {
        device: selectedAsset.exif.LensModel,
        imageUrl: imageUrl,
        takenAt: getFormattedDate(selectedAsset.exif.DateTimeOriginal),
        latitude: selectedAsset.exif.GPSLatitude ?? "37.49654666666667",
        longitude: selectedAsset.exif.GPSLongitude ?? "127.02825833333333",
      };
      //   console.log("imageContent: ", imageContent);
      const responseData = await postMaterialMetadata(imageContent);
      const newMaterial = {
        materialId: responseData.materialId,
        source: imageUrl,
        isMinting: "NONE",
        chainType: null,
      };
      nftsCtx.addNft(newMaterial);

      console.log("Image uploaded! materialId: ", responseData.materialId);
    } catch (error) {
      console.log("Error uploading image:", error.response);
    }
    setIsFetching(false);
  }

  function getFormattedDate(inputDate) {
    const datePart = inputDate.split(" ")[0].replace(/:/g, "-");
    const timePart = inputDate.split(" ")[1];
    return datePart + " " + timePart;
  }

  function imagePickerHandler() {
    pickImage();
  }

  function cameraHandler() {
    takePhoto();
  }

  // if (isFetching) {
  //   return <LoadingOverlay />;
  // }

  return (
    <View style={styles.root}>
      <FlatList
        data={nftsCtx.nfts}
        renderItem={renderNftItem}
        keyExtractor={(item) => item.materialId}
        key={2}
        numColumns={2}
        style={styles.list}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        ListFooterComponent={isFetching && <ActivityIndicator />}
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
