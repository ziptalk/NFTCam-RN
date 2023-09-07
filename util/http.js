import axios from "axios";
import axiosInstance from "./axiosInstance";

export const BASE_URL = "https://www.nft-flex.com/api";

export async function login() {
  const data = { uuid: "046AB16B-reactNative" };
  const response = await axios.post(BASE_URL + "/auth/login", data);

  return response.data;
}

export async function reissueToken(refreshToken) {
  const data = { refreshToken: refreshToken };
  const response = await axios.post(BASE_URL + "/auth/reissue", data);

  return response.data;
}

export async function fetchMaterials() {
  const response = await axiosInstance.get(BASE_URL + "/material/list");
  return response.data.data;
}

export async function storeExpense(expenseData) {
  const response = await axios.post(BASE_URL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BASE_URL + "expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expeseData) {
  return axios.put(BASE_URL + `expenses/${id}.json`, expeseData);
}

export async function deleteExpense(id) {
  return axios.delete(BASE_URL + `expenses/${id}.json`);
}
