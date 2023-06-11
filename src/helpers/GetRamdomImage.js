import axios from "axios"

export const getRamdomImage = async () =>{
    const {data} = await axios.get(" https://randomuser.me/api/");
    const {results} = data;
    const image = results.map(user=>({
        img: user.picture.large
    }))


    return {
        img:image[0].img
    }
   
}