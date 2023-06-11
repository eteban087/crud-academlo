import axios from "axios"
const BASE_URL = "https://users-crud.academlo.tech/users/"

export const createUser = async (user) =>{
    const {data} = await axios.post(BASE_URL,user);
    return data;
}


export const getUser = async () =>{
    const {data} = await axios.get(BASE_URL);
    return data;
}

export const deletetUser = async (id) =>{
    const {data} = await axios.delete(`${BASE_URL}${id}/`);
    return data;
}

export const updatetUser = async (id,user) =>{
    const {data} = await axios.patch(`${BASE_URL}${id}/`,user);
    return data;
}


