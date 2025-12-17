import React from 'react'
import { LoginForm } from './_components/LoginForm'

export default function page() {
  return <>
  
  <div className='flex flex-col justify-center items-center gap-8 my-8'>
    <h1 className=' text-center font-bold text-4xl font-sans text-gray-800 dark:text-white'> Welcome Back !</h1>
    <LoginForm/>
  </div>
  
  
  </>
}
