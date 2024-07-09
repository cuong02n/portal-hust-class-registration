import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getMyInfo = async () => {
    try {
        const {data} = await client.get('/api/user/get-info')
    } catch (err) {
        toast.error("Không thể lấy thông tin cá nhân")
        throw err
    }
}

export const getMetadata = (metadataKey) => {
    return
}