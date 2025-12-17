import React from 'react'
import { SignUpForm } from './_components/signupForm'

export default function page() {
  return <>
  
  <div className='flex flex-col justify-center items-center gap-8 my-8'>
    <h1 className=' text-center font-bold text-4xl font-sans text-gray-800 dark:text-white'> Create Account</h1>
    <SignUpForm/>
  </div>
  
  
  </>
}
