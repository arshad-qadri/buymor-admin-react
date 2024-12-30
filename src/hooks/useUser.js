import { toast } from "react-toastify";
import api from "../axios";

const useUser = async () => {
  try {
    const user = await api.get("/auth/me");
    return user.data;
  } catch (error) {
    toast.error(error.message || "Failed to fetch user data.");
  }
};

export default useUser;
