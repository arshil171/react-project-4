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
      let res = await axios.get(`http://localhost:3000/product `)  //  

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
    if (inputdata.title == "" && inputdata.price == "") {
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
    <div className='border  relatve w-[100%] h-[100vh] '>
      <div className=' ml-[50%] absolute top-[0%] left-[57%]  w-[350px] flex h-[70px] items-center'>
        <input id='input' className='relative left-[5%] h-[38px] w-[80%]  border rounded-[5px]' type="text" onChange={handleSearch} placeholder='Serching' />
        <p className='relative h-[100%] right-[10px] flex items-center '><FaMagnifyingGlass /></p>
      </div>
      <div className=' absolute  w-[200px] h-[200px] bg-red-900 flex flex-col right-[5%] top-[13%]'>
        <button className='border ' onClick={handleAsc}>Asc</button>
        <button className='border' onClick={handleDes}>Des</button>
        <select name="" id="" onChange={handleCategory}>
          <option value="all">All</option>
          <option value="shoes">shoes</option>
          <option value="cricket">cricket</option>
          <option value="phone">phone</option>
        </select>


      </div>
      <form onSubmit={handleSubmit} className='w-[100%] flex ' >
        <div className='w-[80%] border rounded-[7px]  relative'>
          <h1 className='text-[18px] w-[100%] h-[40px] items-center border rounded-t-md  flex justify-center font-medium'>Product Adding Menu</h1>
          <div className='border h-[70px] flex items-center justify-around rounded-b-md '>
            <label  htmlFor="" className=''>
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.title} placeholder='Enter a product title' onChange={(e) => {
                setInputdata({ ...inputdata, title: e.target.value })
              }} />
            </label>

            <label htmlFor="" >
              <input type="text"  className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding' value={inputdata.price} placeholder='Enter a product price' onChange={(e) => {
                setInputdata({ ...inputdata, price: e.target.value })
              }} />
            </label>
            <label >
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding'  value={inputdata.image} placeholder='Enter image url' onChange={(e) => {
                setInputdata({ ...inputdata, image: e.target.value })
              }} />
            </label>
            <label>
              <input type="text" className='border h-[40px] w-[250px] flex pl-[10px] rounded-[5px] padding'  value={inputdata.category} placeholder='Enter a product category' onChange={(e) => {
                setInputdata({ ...inputdata, category: e.target.value })
              }} />
            </label>

            <button className='border w-[80px] h-[40px] rounded-[7px] bg-black text-white'>Add </button>
          </div>
        </div>
      </form>
      <div className='w-[100vw] flex  flex-wrap border justify-start'>
        {data1 && data1.map((item) => {
          return (

            <div className='w-[200px] h-[400px]  ' id='main' key={item.id}>
              <p>title : {item.title}</p>
              <p>price : {item.price}</p>
              <p>category : {item.category}</p>
              <img src={item.image || null} alt="" />
              <button onClick={() => { handleDelete(item.id) }}>Delete</button>
              <Link to={`/update/${item.id}`}>  <button >Edit</button></Link>
            </div>


          )
        })}
      </div>
      <div className='flex w-[100px] border justify-between' >
        <button disabled={count == 1} onClick={() => {
          setCount(count - 1)
        }} className='border pl-[10px]'>Prev</button>
        <p>{count}</p>
        <button disabled={count == pageCount} onClick={() => {
          setCount(count + 1)
        }} className='border ml-[10px]'>Next</button></div>
    </div>
  )
}

export default Home