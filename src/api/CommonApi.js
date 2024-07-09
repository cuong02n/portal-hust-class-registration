import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getClassesByCourseId = async (semester, courseId) => {
    try {
        const {data} = client.get('/api/common/classes/get-by-course-id', {
            params: {
                semester: semester,
                courseId: courseId
            }
        })
        return data.data
    } catch (err) {
        toast.error("Không thể lấy dữ liệu học phần: " + courseId)
        throw err;
    }
}


