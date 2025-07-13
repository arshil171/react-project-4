import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

const Cart = () => {
    const [data, setData] = useState([])
    const [price , setPrice] = useState(0)

    async function getData() {
        let res = await axios.get("http://localhost:3000/cart")


        setData(res.data)
        setPrice(res.data.price)

    }

    async function handleDelete(id) {
        await axios.delete("http://localhost:3000/cart/" + id)
        alert("Product Remove successfully from the cart")

    }


    useEffect(() => {
        getData()
    }, [])
    console.log(price)
    console.log(data)
    return (
        <div className='flex'>

            {data && data.map((item) => {
                return (

                    <div className='w-[280px] h-[360px] border relative rounded-[10px] bg-white' id='main' key={item.id}>
                        <div className=' absolute top-[7px] w-[100%] flex justify-center '>
                            <img className='border w-[90%] h-[200px] hover:w-[92%] hover:h-[205px]  duration-[0.2s] bg-gray-100 absolute  bg-auto image1 rounded-[4px] hover:rounded-[8px] top-[15px]' src={item.image || null} alt="" />
                        </div>
                        <div className='absolute top-[63%]   w-[90%] '>
                            <p className='text-[16px]'><span className='font-medium '>Title :</span> <span className='text-zinc-600'>{item.title}</span> </p>
                            <p className='text-[16px]'><span className='font-medium '>Price : </span><span className='text-zinc-600'>${item.price}</span></p>
                            <p className='text-[16px]'><span className='font-medium '>Category :</span  ><span className='text-zinc-600'>{item.category}</span> </p>
                        </div>

                        <div className='absolute bottom-[5%] h-[40px]  w-[90%] ml-[30px] flex justify-between'>
                            <button className='border bg-red-500 h-[40px] text-white w-[45%] rounded-[4px] cursor-pointer hover:w-[47%] duration-[0.4s]' onClick={() => { handleDelete(item.id) }}>Delete</button>
                            <Link className='w-[45%] rounded-[4px] bg-slate-500 text-white cursor-pointer  hover:w-[47%] duration-[0.4s]' to={`/update/${item.id}`}>  <button className='   duration-[0.4s] rounded-[4px] cursor-pointer border  h-[40px] w-[100%] ' >Buy Now</button></Link>
                        </div>

                    </div>


                )
            })}
            {/* <div className='w-[100%]  flex justify-end items-center h-[400px]'>
                <div id='subtotal' className='border w-[50%]  ml-[20px]'>
                    <h3>Cart Totals</h3>
                    <table>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$0</td>

                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>$0</td>
                        </tr>
                    </table>
                    <button className="normal">Proceed to checkout</button>
                </div>
            </div> */}
        </div>
    )


}

export default Cart