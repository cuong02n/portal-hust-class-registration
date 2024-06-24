import * as Constants from "../util/constants/Constant.js";
import {toast} from "react-toastify";
import {client} from "./Axios.js";

export const setDayStartYear = async (year, date) => {
    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_WEEK_1, semester: year + '1', value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const setCurrentSemester = async (semester) => {
    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.CURRENT_SEMESTER, semester: null, value: semester
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const startRegisterOfficialStandard = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_REGISTER_CLASS_OFFICIAL_STANDARD,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const endRegisterOfficialStandard = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.END_REGISTER_CLASS_OFFICIAL_STANDARD,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const startRegisterUnofficialStandard = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_REGISTER_CLASS_UNOFFICIAL_STANDARD,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const endRegisterUnofficialStandard = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.END_REGISTER_CLASS_UNOFFICIAL_STANDARD,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const startRegisterOfficialElitech = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_REGISTER_CLASS_OFFICIAL_ELITECH,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const endRegisterOfficialElitech = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.END_REGISTER_CLASS_OFFICIAL_ELITECH,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const startRegisterUnofficialElitech = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_REGISTER_CLASS_UNOFFICIAL_ELITECH,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const endRegisterUnofficialElitech = async (semester, date) => {

    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.END_REGISTER_CLASS_UNOFFICIAL_ELITECH,
            semester: semester,
            value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const startFreeRegister = async (semester, date) => {
    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.START_REGISTER_FREE, semester: semester, value: date
        })
        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const endFreeRegister = async (semester, date) => {
    try {
        const {data} = await client.post('/super-admin/metadata', {
            metadataKey: Constants.END_REGISTER_FREE, semester: semester, value: date
        })

        return data.data

    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const getAllStudent = async () => {
    try {
        const {data} = await client.get('/super-admin/user/get-all-student')
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const getAllAdmin = async () => {
    try {
        const {data} = await client.get('/super-admin/user/get-all-admin')
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}