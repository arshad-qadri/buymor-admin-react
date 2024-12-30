import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../variable";

const useAuth = () => {
  const logout = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`);
      localStorage.removeItem("token");
      location.href = "/login";
    } catch (error) {
      toast.error(error.message || "Failed to logout.");
    }
  };
  return { logout };
};

export default useAuth;
