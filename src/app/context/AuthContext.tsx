"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

export type User = {
  username: string;
  id: string;
};

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (
    accessToken: string,
    refreshToken: string
  ) => void;
  clearTokens: () => void;
  logout: () => void;
  setLoginUser: (user: User) => void;
  loginUser: () => User | null;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<
    string | null
  >(null);
  const [refreshToken, setRefreshToken] =
    useState<string | null>(null);
  const [user, setUser] = useState<User | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    // Load tokens and user from local storage on initial load
    const storedAccessToken =
      localStorage.getItem("accessToken");
    const storedRefreshToken =
      localStorage.getItem("refreshToken");
    const storedUser =
      localStorage.getItem("user");

    if (
      storedAccessToken &&
      storedRefreshToken &&
      storedUser
    ) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setTokens = useCallback(
    (
      newAccessToken: string,
      newRefreshToken: string
    ) => {
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem(
        "accessToken",
        newAccessToken
      );
      localStorage.setItem(
        "refreshToken",
        newRefreshToken
      );
    },
    []
  );

  const loginUser = () => {
    return user;
  };

  const setLoginUser = useCallback(
    (user: User) => {
      setUser(user);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    },
    []
  );

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setLoginUser({ username: "", id: "" });
    router.push("/login");
  }, [clearTokens, router, setLoginUser]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        clearTokens,
        setLoginUser,
        logout,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
