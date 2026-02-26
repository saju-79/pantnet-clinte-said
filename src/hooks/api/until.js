import axios from "axios"
import toast from "react-hot-toast";

export const saveUserInDb = async user => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user`, user)
    if (data.matchedCount > 0) {
        toast.success("User updated successfully ✅");
    }
    if (data.acknowledged) {
        toast.success("Operation successful ✅");
    }
}