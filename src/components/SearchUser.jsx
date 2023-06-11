import React, { useState } from 'react'
import '../css/SearchUser.css'

export const SearchUser = ({filterUser}) => {
    
    const [inputValue, setInputValue] = useState("")
    
    const SearchUser = ({target})=>{
        
        let termino = target.value.trim("");
        setInputValue(termino)
        filterUser(termino)
        
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        
        
    }

    return (

        <form onSubmit={onSubmit} className="container_search">
            <input type="text" placeholder='Filter by name' value={inputValue} onChange={SearchUser}  />
            <i className="fa-solid fa-magnifying-glass icon"></i>
        </form>
    )
}
