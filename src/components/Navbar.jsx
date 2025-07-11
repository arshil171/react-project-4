import React from 'react'
import { IoCart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDotsVertical } from 'react-icons/hi';


const Navbar = () => {
    return (
        <div className='w-[100%] h-[70px]  flex relative'>
            <h1 className='absolute left-[5%]  h-[100%] flex items-center text-[25px]'>Logo</h1>

            <div className='flex   '>
                <ul className='flex absolute left-[15%]  h-[100%] items-center justify-around w-[40%]'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Features</li>
                </ul>

            </div>

            <div className='absolute left-[87%]   h-[100%] flex items-center w-[80px]'>
                <p className='text-[30px]'><IoCart /> </p>
                <p className='absolute left-[35px]'>Cart</p>
            </div>
            <div className='absolute items-center left-[80%] flex h-[100%] w-[80px] r' >
                <span className='text-[30px]'><CgProfile /></span>
                <p className='absolute left-[35px] '>Login</p>
            </div>
            <div className='absolute left-[93%] h-[100%] flex items-center '>
                <p className='text-[23px]'><HiDotsVertical /></p>
            </div>
        </div>
    )
}

export default Navbar