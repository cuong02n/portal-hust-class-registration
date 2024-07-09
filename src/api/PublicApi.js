import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getAllClass = async (semester) => {
    try {
        const {data} = await client.get('/api/classes/get-by-semester', {
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

export const getAllCourse = async () => {
    try {
        const {data} = await client.get('/api/courses/get-all', {

        })
        return data.data
    } catch (err) {
        toast.error('Lấy danh sách học phần thất bại' + err.response.data.message)
        throw err
    }
}

export const getAllCourseRelationShip = async ()=>{
    try{
        const {data} = await client.get('/api/courses/get-all-relationship')
        return data.data
    }catch (err){
        toast.error('Lấy danh sách học phần điều kiện thất bại' + err.response.data.message)
        throw err
    }
}

export const getCurrentSemester = async () => {
    try{
        const {data} = await client.get('/api/metadata/current-semester')
        return data.data
    }catch (err){
        toast.error("Không có dữ liệu về kì học hiện tại")
        throw err
    }
}

export const getMetadataSemester = async (semester) => {
    try {
        const {data} = await client.get('/api/metadata/get-by-semester', {
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