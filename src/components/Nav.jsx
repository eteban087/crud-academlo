import React from 'react'
import '../css/Nav.css'
import { SearchUser } from './SearchUser'
export const Nav = ({filterUser}) => {
  return (
    <nav className='nav'>
        <h1>All users</h1>
        <SearchUser filterUser = {filterUser} />
    </nav>
  )
}
