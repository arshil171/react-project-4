import React from 'react'
import { IoCart } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router';


const Navbar = () => {
    return (
        <div className='w-[100%] h-[70px]  flex sticky top-0 navbar bg-white   text-[#1F2937] z-[100] border-[2px]'>
            <h1 className='absolute left-[5%]  h-[100%] flex items-center text-[25px]'>Logo</h1>

            <div className='flex   '>
                <ul className='flex absolute left-[15%]  h-[100%] items-center justify-around w-[40%]'>
                  <Link to={"/"}>  <li className='cursor-pointer font-medium text-blue-600'>Home</li></Link>
                    <li className=' font-medium text-blue-600'>About</li>
                    <li className=' font-medium text-blue-600'>Contact</li>
                    <li className=' font-medium text-blue-600'>Features</li>
                </ul>

            </div>

             <Link to={"/cart"} > <div className='absolute left-[87%]   h-[100%] flex items-center w-[80px]'>
                <p className='text-[30px]'><IoCart /> </p>
                <p className='absolute left-[35px]'>Cart</p>
            </div></Link>
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