import React, { useEffect, useState } from 'react'
import { UserList } from './components/UserList'
import { Nav } from './components/Nav'
import { AddUser } from './components/AddUser'
import { UserForm } from './components/UserForm'
import { getUser } from './helpers/crudFunctions'



export const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([])
  const [userupdate, setUserUpdate] = useState(null)


  //  ===============FUNCION PARA MOSTRAR Y OCULTAR MODAL DE REGISTRO
  const onShowModal = () => {
    setShowModal(!showModal);
    
  }

  // =================FUNCION QUE OBTIENE TODOS LOS USUARIOS
  const getAllUsers = async () => {
    const user = await getUser();
  
    setUsers(user);
    
  }

  // =================FUNCION QUE FILTRA A LOS USUARIOS POR EL NOMBRE
  const filterUser = async (termino)  =>{
    termino = termino.toLowerCase();
    const user = await getUser();
    let newUsers = user.filter(newUser =>{
    
      return newUser.first_name.toLowerCase().indexOf(termino)>=0;
     
    });

    setUsers(newUsers)
   
  }


  // FUNCION QUE OBTIENE EL USUARIO A ACTUALIZAR
  const onUpdateUser = (user) => {
    setUserUpdate(user)
    onShowModal();
  }

  useEffect(() => {
    getAllUsers();
   

  }, [])



  return (
    <>
      <Nav filterUser = {filterUser}/>
      <div className="container">
        <AddUser onShowModal={onShowModal} setUserUpdate = {setUserUpdate} />
        <div className="container_users">
          {
            users.map(user => (
              <UserList
                key={user.id}
                user={user}
                getAllUsers={getAllUsers}
                onUpdateUser={onUpdateUser} />
            ))
          }

        </div>
        {
          showModal && <UserForm
            users = {users}
            onShowModal={onShowModal}
            getAllUsers={getAllUsers}
            userupdate={userupdate} />
        }
      </div>

    </>
  )
}
