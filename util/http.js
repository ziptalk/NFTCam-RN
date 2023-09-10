import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "./axiosInstance";
import axiosMultipartInstance from "./axiosMultipartInstance";

export const BASE_URL = "https://www.nft-flex.com/api";

export async function login() {
  const data = { uuid: "046AB16B-reactNative" };
  const response = await axios.post(`${BASE_URL}/auth/login`, data);

  return response.data;
}

export async function reissueToken(refreshToken) {
  const data = { refreshToken: refreshToken };
  const response = await axios.post(`${BASE_URL}/auth/reissue${data}`);

  return response.data;
}

export async function fetchMaterials() {
  const response = await axiosInstance.get(`/material/list`);
  console.log(response);

  return response.data.data;
}

export async function fetchMaterial(materialId) {
  const response = await axiosInstance.get(
    `${BASE_URL}/material/${materialId}`
  );

  return response.data.data;
}

export async function postMaterialImage(formData) {
  const token = await AsyncStorage.getItem("accessToken");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${BASE_URL}/material/save/image`,
    formData,
    config
  );

  // TODO: 이거 왜 인스턴스 못 쓰는지 확인해보기
  //   const response = await axiosInstance.post(
  //     `${BASE_URL}/material/save/image`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         //  Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  console.log("postMaterialImage: ", response);

  return response.data.imageUrl;
}

export async function postMaterialMetadata(data) {
  const response = await axiosInstance.post(
    `${BASE_URL}/material/save/content`,
    data
  );
  console.log("postMaterialMetadata: ", response);

  return response.data;
}

export async function patchMintingMaterial(materialId, nftData) {
  const response = await axiosInstance.patch(
    `/material/mint/${materialId}`,
    nftData
  );
  console.log(response);

  return response.data;
}

export async function postWallet(walletName, walletAddress) {
  const data = {
    walletName: walletName,
    walletAddress: walletAddress,
  };
  const response = await axiosInstance.post(`/wallet`, data);

  return response;
}

export async function fetchPoint() {
  const response = await axiosInstance.get(`/point`);
  console.log(response);

  return response.data.point;
}

export async function patchPoint(point) {
  const data = { point: point };
  const response = await axiosInstance.patch(`/point`, data);

  return response.data.point;
}
