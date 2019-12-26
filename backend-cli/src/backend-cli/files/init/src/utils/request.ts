import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "config";
import { LocalStorage } from "./LocalStorage";

// Create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  async config => {
    // do something before request is sent
    let token: string = await LocalStorage.get("token");
    if (token) {
      config.headers["token"] = token;
    }
    // debugger;
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    // debugger;
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      alert(res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    // debugger;
    console.log("err request", error);
    if (error.response.status === 401) {
      // Navigation.navigate("Wellcome");
    }

    Alert.alert("Thông báo", error.response.data.message);
    return Promise.reject(error);
  }
);

export default service;
