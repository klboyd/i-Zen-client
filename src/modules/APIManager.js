// functions for token handling, REST calls for API, and login/register/logout

import { Alert, Platform } from "react-native";
import { AsyncStorage } from "react-native";
import { NET_ADDR } from "react-native-dotenv";
import Constants from "expo-constants";

// set baseUrl according to the testing device
// current set up for Android emulator, iOS simulator, and iOS device
let baseUrl;

if (
  Constants.isDevice &&
  (Platform.OS === "android" || Platform.OS === "ios")
) {
  baseUrl = `http://${NET_ADDR}:8000`;
} else if (Platform.OS === "android") {
  baseUrl = "http://10.0.2.2:8000";
} else {
  baseUrl = "http://127.0.0.1:8000";
}

const setToken = async token => {
  try {
    await AsyncStorage.setItem("iZen-token", `Token ${token}`);
  } catch (error) {
    throw Exception("Error saving token:", error);
  }
};

const getToken = async () => {
  return await AsyncStorage.getItem("iZen-token");
};

const getAll = async resource => {
  const token = await getToken();

  const response = await fetch(`${baseUrl}/${resource}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return response.json();
};

const getOne = async (resource, id) => {
  const token = await getToken();

  const response = await fetch(`${baseUrl}/${resource}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return response.json();
};

const postItem = async (resource, newItem) => {
  const token = await getToken();

  try {
    const results = await fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(newItem)
    });
    if (results.status === 302) {
      return { responseMessage: "data already exists" };
    }
    return results.json();
  } catch (error) {
    console.log(error);
  }
};

const putItem = async (resource, id, updatedItem) => {
  const token = await getToken();

  try {
    await fetch(`${baseUrl}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(updatedItem)
    });
  } catch (error) {
    console.log("PUT ITEM:", error);
  }
};

const removeItem = async (resource, id) => {
  const token = await getToken();
  try {
    const results = await fetch(`${baseUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

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

const register = async userDetails => {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userDetails)
  });

  const resJSON = await response.json();

  if (resJSON && resJSON.token) {
    await setToken(resJSON.token);
  } else if (resJSON.error) {
    Alert.alert(resJSON.error);
  } else {
    Alert.alert("Something went wrong and account was not created.");
  }
};

const logout = async () => {
  return await AsyncStorage.removeItem("iZen-token");
};
export {
  getAll,
  getOne,
  postItem,
  putItem,
  removeItem,
  register,
  login,
  logout
};
