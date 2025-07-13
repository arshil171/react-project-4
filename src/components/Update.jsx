import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

const Update = () => {
    const [inputdata, setInputdata] = useState({ title: "", price: "", image: "", category: "" })

    let { id } = useParams()

    async function getData() {
        try {
            let res = await axios.get(`http://localhost:3000/product/${id}`)

            console.log(res.data)
            setInputdata(res.data)


        } catch (error) {
            console.log(error)
        }
    }
    async function handleUpdate(e) {
        e.preventDefault()
        await axios.put(`http://localhost:3000/product/${id} `, inputdata)
        alert("update Successfully")


    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-[100%] h-[500px]  mt-[20px] flex flex-col justify-center items-center update'>
            <form action="" onSubmit={handleUpdate} className='border font-medium w-[30%] h-[70%] rounded-[10px] '>
                <label htmlFor="" className='flex input w-[100%] h-[40px] flex justify-between items-center '><span className='text-[#ed2100]'>Product Title :-</span>
                    <input className='border w-[70%] padding text-[#2b2b2b rounded-[5px] h-[100%] ' type="text" value={inputdata.title} placeholder='Enter a product name' onChange={(e) => {
                        setInputdata({ ...inputdata, title: e.target.value })
                    }} />
                </label>
                <br />
                <label htmlFor=""  className='flex input1 font-medium w-[100%] h-[40px] flex justify-between items-center'><span className='text-[#ed2100]'>Price :-</span>
                    <input className='border  flex border w-[70%] padding rounded-[5px] h-[100%] text-[#2b2b2b]' type="text" value={inputdata.price} placeholder='Enter a product price' onChange={(e) => {
                        setInputdata({ ...inputdata, price: e.target.value })
                    }} />
                </label>
                <label htmlFor=""  className='flex w-[100%] font-medium input h-[40px] flex justify-between items-center'><span className='text-[#ed2100] text-[#2b2b2b'>Img url :-</span>
                    <input className='border flex  w-[70%] padding rounded-[5px] h-[100%]' type="text" value={inputdata.image} placeholder='Enter image url' onChange={(e) => {
                        setInputdata({ ...inputdata, image: e.target.value })
                    }} />
                </label>
                <label htmlFor=""  className='flex w-[100%] font-medium input h-[40px] flex justify-between items-center'><span className='text-[#ed2100] text-[#2b2b2b'>Category :-</span>
                    <input className='border flex  w-[70%] padding rounded-[5px] h-[100%]' type="text" value={inputdata.category} placeholder='Enter a product category' onChange={(e) => {
                        setInputdata({ ...inputdata, category: e.target.value })
                    }} />
                </label>
                <div className='w-[100%]  button2 h-[55px] flex justify-center items-center'>
                     <button className='border cursor-pointer w-[70%] h-[40px] rounded-[7px] bg-[#00aeff] text-white '>Update </button>
                </div>

               
            </form>

            <div>
                <Link to={"/"}><button className='button1 cursor-pointer border w-[180px] h-[40px] rounded-[7px] bg-[#898989] text-white' >Back to home page</button></Link>
            </div>
        </div>
    )
}

export default Update