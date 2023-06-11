import React from 'react'
import '../css/AddUser.css'
export const AddUser = ({onShowModal, setUserUpdate}) => {
  const hanledShowModal = ()=>{
    onShowModal()
    setUserUpdate(null)
  }
  return (
    <button 
      className='btn-add'
      type='button'
      onClick={hanledShowModal}
     
     ><i className="fa-solid fa-plus"></i> Add user</button>
  )
}
