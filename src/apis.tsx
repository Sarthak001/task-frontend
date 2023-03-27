import axios from "axios"


const BASE_URI = "http://localhost:3000/api/v1/"


const createForm = async (data: object) => {
    const jsonformatted = JSON.stringify(data)
    const response = await axios({
        method: 'POST',
        baseURL: BASE_URI,
        url: 'form',
        data: jsonformatted,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}

const getForms = async () => {
    const response = await axios({
        method: 'GET',
        baseURL: BASE_URI,
        url: 'forms',

    });
    return response.data
}

const getFormById = async (id:string) => {
    const response = await axios({
        method: 'GET',
        baseURL: BASE_URI,
        url: 'form/' + id,
    });
    return response.data
}

const updateFormById = async (id:string,data) => {

    const jsonformatted = JSON.stringify(data)
    const response = await axios({
        method: 'PUT',
        baseURL: BASE_URI,
        url: 'update/' + id,
        data: jsonformatted,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}






export { createForm, getForms, getFormById, updateFormById }