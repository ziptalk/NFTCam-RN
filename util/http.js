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

export async function fetchMaterials(cursor) {
  let response = [];
  if (cursor) {
    console.log("커서 있음: ", cursor);
    response = await axiosInstance.get(`/material/list?cursor=${cursor}`);
  } else {
    console.log("커서 없음");
    response = await axiosInstance.get(`/material/list`);
  }
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
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log("postMaterialImage: ", response);

  return response.data.imageUrl;
}

export async function postMaterialMetadata(data) {
  const response = await axiosInstance.post(
    `${BASE_URL}/material/save/content`,
    data
  );

  return response.data;
}

export async function putMintingMaterial(materialId, nftData) {
  const response = await axiosInstance.put(
    `/material/mint/${materialId}`,
    nftData
  );

  return response.data;
}

export async function postWallet(walletName, walletAddress) {
  const data = {
    walletName: walletName,
    walletAddress: walletAddress,
  };
  const response = await axiosInstance.post(`/wallet`, data);

  return response.data;
}

export async function fetchWallet() {
  const response = await axiosInstance.get(`/wallet`);

  return response.data.data;
}

export async function fetchPoint() {
  const response = await axiosInstance.get(`/point`);

  return response.data.point;
}

export async function patchPoint(point) {
  const data = { point: point };
  const response = await axiosInstance.patch(`/point`, data);

  return response.data.point;
}
