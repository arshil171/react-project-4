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
        <div>
            <form action="" onSubmit={handleUpdate}>
                <label htmlFor="">Product :-
                    <input type="text" value={inputdata.title} placeholder='Enter a product name' onChange={(e) => {
                        setInputdata({ ...inputdata, title: e.target.value })
                    }} />
                </label>
                <br />
                <label htmlFor="">price :-
                    <input type="text" value={inputdata.price} placeholder='Enter a product price' onChange={(e) => {
                        setInputdata({ ...inputdata, price: e.target.value })
                    }} />
                </label>
                <label htmlFor="">img url :-
                    <input type="text" value={inputdata.image} placeholder='Enter image url' onChange={(e) => {
                        setInputdata({ ...inputdata, image: e.target.value })
                    }} />
                </label>
                <label htmlFor="">category :-
                    <input type="text" value={inputdata.category} placeholder='Enter a product category' onChange={(e) => {
                        setInputdata({ ...inputdata, category: e.target.value })
                    }} />
                </label>
                <button>Update </button>
            </form>

            <div>
                <Link to={"/"}><button >Back to home page</button></Link>
            </div>
        </div>
    )
}

export default Update