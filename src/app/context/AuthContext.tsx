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
  user: User | null;
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    // Load tokens and user from local storage on initial load
    const storedAccessToken =
      sessionStorage &&
      sessionStorage.getItem("accessToken");
    const storedRefreshToken =
      sessionStorage &&
      sessionStorage.getItem("refreshToken");
    const storedUser =
      sessionStorage &&
      sessionStorage.getItem("user");

    if (
      storedAccessToken &&
      storedRefreshToken &&
      storedUser
    ) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const setTokens = useCallback(
    (
      newAccessToken: string,
      newRefreshToken: string
    ) => {
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      sessionStorage &&
        sessionStorage.setItem(
          "accessToken",
          newAccessToken
        );
      sessionStorage &&
        sessionStorage.setItem(
          "refreshToken",
          newRefreshToken
        );
    },
    []
  );

  const setLoginUser = useCallback(
    (user: User) => {
      setUser(user);
      sessionStorage &&
        sessionStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      setIsAuthenticated(true);
    },
    []
  );

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    sessionStorage &&
      sessionStorage.removeItem("accessToken");
    sessionStorage &&
      sessionStorage.removeItem("refreshToken");
    sessionStorage &&
      sessionStorage.removeItem("user");
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setLoginUser({ username: "", id: "" });
    setIsAuthenticated(false);
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
        isAuthenticated,
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
