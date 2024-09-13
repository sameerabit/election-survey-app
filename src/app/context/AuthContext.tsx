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
  setTokens: (accessToken: string) => void;
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
  const [user, setUser] = useState<User | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] =
    useState(true);

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tokens and user from local storage on initial load

    const checkAuth = async () => {
      try {
        const storedAccessToken =
          sessionStorage &&
          sessionStorage.getItem("accessToken");
        const storedUser =
          sessionStorage &&
          sessionStorage.getItem("user");
        if (storedAccessToken && storedUser) {
          setAccessToken(storedAccessToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const setTokens = useCallback(
    (newAccessToken: string) => {
      setAccessToken(newAccessToken);
      sessionStorage &&
        sessionStorage.setItem(
          "accessToken",
          newAccessToken
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
    sessionStorage &&
      sessionStorage.removeItem("accessToken");

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
        setTokens,
        clearTokens,
        setLoginUser,
        logout,
        user,
        isAuthenticated,
      }}
    >
      {!loading && children}
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
