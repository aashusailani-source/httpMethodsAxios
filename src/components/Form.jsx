import React, { useState } from 'react'
import { postData } from '../api/postApi';

function Form({data,setData}) {

    const [addData,setAddData] = useState(
        {
            title: "",
            body: "",
        }
    );

    const handleInputChange = (e) => {
        const { name , value } = e.target;
        setAddData((prev) => {
            console.log(prev);
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const addPostData = async () => {
        const res = await postData(addData);
        console.log("res ",res);

        if(res.status == 201){
            setData([...data,res.data]);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPostData();
    };


  return (
        <form onSubmit={handleFormSubmit} className="w-full max-w-md p-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-center text-gray-100 mb-2">Create a Post</h2>
            
            <div className="mb-4 flex gap-4">
                <div className="flex-1">
                    <label htmlFor="title" className="block text-gray-200 text-sm font-medium mb-1">Title</label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Add Title"
                        onChange={handleInputChange}
                        value={addData.title}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out
                        text-black"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="body" className="block text-gray-200 text-sm font-medium mb-1">Post</label>
                    <input 
                        type="text"
                        id="body"
                        name="body"
                        placeholder="Add Post"
                        onChange={handleInputChange}
                        value={addData.body}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out
                        text-black"
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-200 ease-in-out"
            >
                Add Post
            </button>
        </form>



  )
}

export default Form