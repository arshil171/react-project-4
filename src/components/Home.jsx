import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, Link } from 'react-router'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
  const [data1, setData1] = useState([])
  const [inputdata, setInputdata] = useState({ title: "", price: "", image: "", category: "" })
  const [filterData, setFilterData] = useState([])
  const [count, setCount] = useState(1)
  const [pageCount, setPageCount] = useState(null);

  async function getData() {
    try {
      let res = await axios.get(`http://localhost:3000/product`)  //  ?_page=${count}&_per_page=3 

      console.log(res.data)
      setData1(res.data)
      // setData1([...res.data.data])
      setFilterData(res.data)
      setPageCount(res.data.pages)


    } catch (error) {
      console.log(error)
    }
  }
  function handleSearch(e) {
    console.log(e.target.value)

    let search = filterData.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())


    )
    setData1(search)
  }
  function handleAsc() {
    let res = data1.sort((a, b) => a.price - b.price)
    setData1([...res])
  }
  function handleDes() {
    let res = data1.sort((a, b) => b.price - a.price)
    setData1([...res])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (inputdata.title == "" && inputdata.price == "" && inputdata.image == "" && inputdata.category =="") {
      alert("please enter a valid field")
      return
    }
    await axios.post("http://localhost:3000/product", inputdata)
    alert("user added successfully ")
    getData()
    setInputdata({ title: "", price: "", image: "", category: "" })
  }
  async function handleDelete(id) {
    await axios.delete("http://localhost:3000/product/" + id)
    alert("delete successfully")
    getData()
  }
 async function handleAddToCart(id){
  let res3 = await axios.get(`http://localhost:3000/product/${id}`)
  console.log(res3)
  console.log(res3.data)
   await axios.post("http://localhost:3000/cart",res3.data )
   alert("product added in cart")
  }
  function handleCategory(e) {
    let allData = data1

    if (e.target.value === "all") {
      console.log(e.target.value)
      setData1(filterData)
      return;
    }
    let data = filterData.filter((item) => e.target.value === item.category)
    setData1(data)
  }

  console.log(data1)
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='  relatve w-[100%]  bg-gray-300 '>
      <div className=' ml-[50%] absolute top-[0%] left-[57%]  w-[350px] flex h-[70px] items-center text-[#1F2937] '>
        <input id='input' className='relative left-[5%] h-[38px] w-[80%] text-[#1F2937] border-gray-400 border-[2px] z-[100] rounded-[5px]' type="text" onChange={handleSearch} placeholder='Serching' />
        <p className='relative h-[100%] right-[10px] flex items-center z-[100]'><FaMagnifyingGlass /></p>
      </div>
      <div className=' absolute  w-[250px] h-[120px] flex flex-col right-[1%]  rounded-[6px] top-[13%] bg-white  '>
        <h1 className='w-[100%] bg-black text-white border h-[35px] font-medium flex items-center justify-center  rounded-t-md '>Filter Manu</h1>
        <div id='button'>
          <button className='border w-[43%] h-[33px]  rounded-[3px]' onClick={handleAsc}>Ascending </button>
          <button className='border w-[43%] h-[33px] rounded-[3px]' onClick={handleDes}>Descending </button>
        </div>
        <div className='w-[100%] flex justify-center'>
          <select className='border relative top-[5px] w-[93%] h-[31px] rounded-[3px]' name="" id="" onChange={handleCategory}>
            <option value="all">All</option>
            <option value="shoes">shoes</option>
            <option value="cricket">cricket</option>
            <option value="phone">phone</option>
          </select>
        </div>


      </div>
      <form onSubmit={handleSubmit} className='w-[100%] flex ' >
        <div className='w-[80%]   h-[123px] rounded-[7px] bg-white add  relative'>
          <h1 className='text-[18px]  w-[100%] h-[40px] items-center  rounded-t-md  flex justify-center font-medium  bg-black text-white'>Product Adding Menu</h1>
          <div className=' h-[82px]  flex items-center justify-around rounded-b-md '>
            <label htmlFor="" className=''>
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.title} placeholder='Enter a product title' onChange={(e) => {
                setInputdata({ ...inputdata, title: e.target.value })
              }} />
            </label>

            <label htmlFor="" >
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.price} placeholder='Enter a product price' onChange={(e) => {
                setInputdata({ ...inputdata, price: e.target.value })
              }} />
            </label>
            <label >
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.image} placeholder='Enter image url' onChange={(e) => {
                setInputdata({ ...inputdata, image: e.target.value })
              }} />
            </label>
            <label>
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.category} placeholder='Enter a product category' onChange={(e) => {
                setInputdata({ ...inputdata, category: e.target.value })
              }} />
            </label>

            <button className='border w-[80px] h-[40px] rounded-[7px] bg-black text-white'>Add </button>
          </div>
        </div>
      </form>
      <div className='w-[100vw] flex  flex-wrap  justify-start'>
        {data1 && data1.map((item) => {
          return (

            <div className='w-[280px] h-[420px]  relative rounded-[10px] bg-white' id='main' key={item.id}>
               <div className=' absolute top-[7px] w-[100%] flex justify-center '>
                  <img  className='border w-[90%] h-[200px] hover:w-[92%] hover:h-[205px]  duration-[0.2s] bg-gray-100 absolute  bg-auto image1 rounded-[4px] hover:rounded-[8px] top-[15px]' src={item.image || null} alt="" />
               </div>
              <div className='absolute top-[55%]   w-[90%] '>
                <p className='text-[16px]'><span className='font-medium '>Title :</span> <span className='text-zinc-600'>{item.title}</span> </p>
                <p className='text-[16px]'><span className='font-medium '>Price : </span><span className='text-zinc-600'>${item.price}</span></p>
                <p className='text-[16px]'><span className='font-medium '>Category :</span  ><span className='text-zinc-600'>{item.category}</span> </p>
              </div>

              <div className='absolute bottom-[15%] h-[40px]  w-[90%] ml-[30px] flex justify-between'>
                <button className='border bg-red-500 h-[40px] text-white w-[45%] rounded-[4px] cursor-pointer hover:w-[47%] duration-[0.4s]' onClick={() => { handleDelete(item.id) }}>Delete</button>
                <Link className='w-[45%] rounded-[4px] bg-slate-500 text-white cursor-pointer  hover:w-[47%] duration-[0.4s]' to={`/update/${item.id}`}>  <button className='   duration-[0.4s] rounded-[4px] cursor-pointer border  h-[40px] w-[100%] ' >Edit</button></Link>
              </div>
            <button onClick={()=>{
              handleAddToCart(item.id)
            }} className='border bg-cyan-300  absolute cursor-pointer bottom-[10px] left-[13px] duration-[0.5s] w-[90%] h-[42px]  rounded-[7px]'>Add To Cart</button>
            </div>
          
           
          )
        })}
      </div>
      {/* <div className='flex w-[100px] border justify-between' >
        <button disabled={count == 1} onClick={() => {
          setCount(count - 1)
        }} className='border pl-[10px]'>Prev</button>
        <p>{count}</p>
        <button disabled={count == pageCount} onClick={() => {
          setCount(count + 1)
        }} className='border ml-[10px]'>Next</button></div> */}
    </div>
  )
}

export default Home