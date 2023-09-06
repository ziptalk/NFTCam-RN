import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  accessToken: "",
  refreshToken: "",
  authenticate: () => {},
  reissue: () => {},
});

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  function authenticate(accessToken, refreshToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    AsyncStorage.setItem("accessToken", accessToken);
    AsyncStorage.setItem("refreshToken", refreshToken);
  }

  function reissue() {
    setAuthToken(null);
    AsyncStorage.removeItem("accessToken");
  }

  const value = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    authenticate: authenticate,
    reissue: reissue,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
