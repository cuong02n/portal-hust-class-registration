import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getAllClass = async (semester) => {
    try {
        const {data} = await client.get('/classes/get-all', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error('Lấy danh sách lớp thất bại' + err.response.data.message)
        throw err
    }
}

export const getCurrentSemester = async () => {
    try{
        const {data} = await client.get('/metadata/current-semester')
        return data.data
    }catch (err){
        toast.error("Không có dữ liệu về kì học hiện tại")
        throw err
    }
}

export const getMetadataSemester = async (semester) => {
    try {
        const {data} = await client.get('/metadata/get-by-semester', {
            params:{
                semester:semester
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}