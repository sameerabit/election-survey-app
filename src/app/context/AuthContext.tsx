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

export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const nextLocalStorage =
  (): Storage | void => {
    if (isBrowser()) {
      return window.localStorage;
    }
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
  user: User | null;
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
    JSON.parse(
      nextLocalStorage?.getItem("user") as string
    ) as User
  );
  const router = useRouter();

  useEffect(() => {
    // Load tokens and user from local storage on initial load
    const storedAccessToken =
      nextLocalStorage.getItem("accessToken");
    const storedRefreshToken =
      nextLocalStorage.getItem("refreshToken");
    const storedUser =
      nextLocalStorage.getItem("user");

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

      nextLocalStorage.setItem(
        "accessToken",
        newAccessToken
      );

      nextLocalStorage.setItem(
        "refreshToken",
        newRefreshToken
      );
    },
    []
  );

  const setLoginUser = useCallback(
    (user: User) => {
      setUser(user);

      nextLocalStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    },
    []
  );

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);

    nextLocalStorage.removeItem("accessToken");

    nextLocalStorage.removeItem("refreshToken");

    nextLocalStorage.removeItem("user");
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
        user,
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
