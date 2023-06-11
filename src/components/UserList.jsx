import React, { useState } from 'react'
import '../css/UserList.css'
import { deletetUser } from '../helpers/crudFunctions'
import Swal from 'sweetalert2'
export const UserList = ({ user, getAllUsers, onUpdateUser }) => {
  
  const onDeleteUser = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn_eliminar',
        cancelButton: 'btn_editar spacing',

      },
      buttonsStyling: false,
      background: "#231E39",
      color: "#B3B8CD"
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this user?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deletetUser(user.id).then(() => {
          getAllUsers();

        });
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'The user was deleted',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The user was not deleted',
          'error'
        )
      }
    })
  }




  return (
    <>

      <div className="car_user">
        {/* header de la tarjeta */}
        <div className="header_car">
          <p>User ID: <span className='span_primary'>{user.id}</span></p>
        </div>
        {/* Body de la tarjeta */}
        <div className="body_car">
          <div className="container_photho">
            <img src={user.image_url} alt="" />
          </div>

          <div className="container_email">
            <h3 autoCapitalize= "on">{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
          </div>

          <div className="container_buttons">
            <button type="button" onClick={()=>onUpdateUser(user)} className='btn_editar' ><i className="fa-solid fa-pen-to-square"></i> Edit</button>
            <button type="button" onClick={onDeleteUser} className='btn_eliminar'><i className="fa-solid fa-trash"></i> Delete</button>
          </div>

        </div>

        {/* Fpoter de la tarjeta */}
        <div className="footer_car">
          <i className="fa-solid fa-calendar-days"></i>
          <p>{user.birthday || "No date"}</p>
        </div>
      </div>




    </>
  )
}
