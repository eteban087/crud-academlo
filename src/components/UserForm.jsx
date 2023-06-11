import React, { useEffect, useState } from 'react'
import '../css/FormModal.css'
import { useForm } from 'react-hook-form'
import 'animate.css';
import { getRamdomImage } from '../helpers/GetRamdomImage';
import { createUser, updatetUser } from '../helpers/crudFunctions';
import Swal from 'sweetalert2';
export const UserForm = ({ onShowModal, getAllUsers, userupdate }) => {

    const { register, handleSubmit, reset, formState: {errors} } = useForm()
    const [isIdUserToEdit, setIsIdUserToEdit] = useState(userupdate?.id)
   
    //  ================= FUNCION QUE ESTABLECE UNA IMAGEN RAMDOM AL USUARIO
    const setImage = async () => {
        const { img } = await getRamdomImage()
        reset({
            image_url: img
        })
    }

    useEffect(() => {
        setImage()

    }, [])

    useEffect(() => {
        reset(userupdate)
    }, [isIdUserToEdit])


    //    ===========FUNCION PARA ACTUALIZAR O CREAR UN UN SUARIO
    const submit = async (data) => {
        if(!data.birthday) data.birthday = null

       
        const { image_url, ...resData } = data
        if (isIdUserToEdit) {
            updatetUser(isIdUserToEdit,resData).then(() => {
                
              
                onShowModal();
                getAllUsers();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User updated successfully',
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#231E39",
                    color: "#B3B8CD"

                })
            })
        } else {

          
            createUser(data).then(() => {
              
                onShowModal();
                getAllUsers();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully',
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#231E39",
                    color: "#B3B8CD"

                })

            });

        }
    }

    return (
        <div className='container_modal animate__animated animate__fadeIn'>
            <form onSubmit={handleSubmit(submit)} className='form'>


                <div className="contaner_input_form">
                    <h2>{isIdUserToEdit ? "Update user" : "Register user"}</h2>


                    {/* INPUT NAME */}
                    <div className="name">
                        
                        <input 
                        type="text" 
                        placeholder='First name' 
                        {...register("first_name",{
                            required: "The first field is required",
                            minLength:{
                                value:2,
                                message: "minimum 2 character"
                            },
                            maxLength:{
                                value:25,
                                message: "maximum 25 characters"
                            }
                            })} />
                         <p className="error">{errors.first_name && errors.first_name.message}</p>
                    </div>


                    {/* INPUT LAST NAME */}
                    <div className="last_name">
                     
                        <input 
                        type="text" 
                        placeholder='Last name'  
                        {...register("last_name",{
                            required: "The last name field is required",
                            minLength:{
                                value:2,
                                message: "minimum 2 characters"
                            },
                            maxLength:{
                                value:25,
                                message: "maximum 25 characters"
                            }})} />
                          <p className="error">{errors.last_name && errors.last_name.message}</p>
                         
                    </div>


                    {/* INPUT EMAIL */}
                    <div className="email">
                        
                        <input 
                        type="email" 
                        placeholder='Email'  
                        {...register("email",{
                            required: "The Email field is required",
                            minLength:{
                                value:2,
                                message: "minimum 2 character"
                            },
                            maxLength:{
                                value:150,
                                message: "maximum 150 characters"
                            },
                            pattern: {
                                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                                message: "Invalid email"
                            }
                            
                            })} />
                         <p className="error">{errors.email && errors.email.message}</p>
                    </div>


                    {/* INPUT PASSWORD */}
                    <div className="password">
                        
                        <input 
                        type="password" 
                        placeholder='Password' 
                        autoComplete='false' 
                        {...register("password",{
                            required: "The password field is required",
                            minLength:{
                                value:8,
                                message: "minimum 8 character"
                            },
                            maxLength:{
                                value:25,
                                message: "maximum 25 characters"
                            }
                            })} />
                        <p className="error">{errors.password && errors.password.message}</p>

                    </div>

                    {/* INPUT BIRTHDAY */}
                    <div className="birthday">
                        
                        <input type="date"  {...register("birthday")} />
                    </div>
                    
                    {/* INPUT IMAGEN */}
                    <div className="image_user">
                        <input type='text'  {...register("image_url")} />
                        
                    </div>

                    <button 
                    type='submit' 
                    className='btn-register'><strong>{isIdUserToEdit ? "Save changes" : "Register user"}</strong></button>
                </div>

                <button
                    type='button'
                    onClick={onShowModal}
                    className='icon1'>
                    <i className="fa-solid fa-xmark "></i>

                </button>
            </form>
        </div>
    )
}
