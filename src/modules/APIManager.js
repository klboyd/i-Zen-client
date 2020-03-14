import { Alert, Platform } from "react-native";
import { AsyncStorage } from "react-native";
import Constants from "expo-constants";
import { NET_ADDR } from "react-native-dotenv";

const baseUrl = Constants.isDevice
  ? `http://${NET_ADDR}:8000`
  : Platform.OS === "android"
  ? "http://10.0.2.2:8000"
  : "http://127.0.0.1:8000";

const setToken = async token => {
  try {
    await AsyncStorage.setItem("iZen-token", token);
  } catch (error) {
    throw Exception("Error saving token:", error);
  }
};

const getAll = async resource => {
  const response = await fetch(`${baseUrl}/${resource}`);
  return response.json();
};

// const post = async (resource, newItem) => {
//   const results = await fetch(`${baseUrl}/${resource}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
//     },
//     body: JSON.stringify(newItem)
//   });
//   return results.json();
// },

const login = async credentials => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(credentials)
  });

  const resJSON = await response.json();

  if (resJSON && resJSON.valid === true && resJSON.token) {
    await setToken(resJSON.token);
    return true;
  } else {
    Alert.alert("Username or password is incorrect.");
  }
};

const logout = async () => {
  return await AsyncStorage.removeItem("iZen-token");
};
export { login, logout };
