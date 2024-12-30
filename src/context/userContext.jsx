import { createContext, useEffect, useState } from "react";
import api from "../axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data?.data);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
      toast.error(error.message || "Failed to fetch user data.");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
