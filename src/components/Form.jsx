import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/postApi';

function Form({data,setData,updateDataApi,setUpdatedDataApi}) {

    const [addData,setAddData] = useState(
        {
            title: "",
            body: "",
        }
    );

    useEffect(() => {
        console.log("render 2 inside form" ,updateDataApi)
        updateDataApi && setAddData({
            title:updateDataApi.title || "",
            body:updateDataApi.body || "",
        })
    },[updateDataApi]);

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

    const updatePostData = async () => {
        const res = await updateData(updateDataApi.id,addData);
        console.log(res);
        
        if(res.status === 200){
            setData((prev) => {
                console.log(prev);
                return prev.map((currElem) => {
                    return currElem.id === res.data.id ? res.data : currElem;
                })
            })
        }
        // setAddData({
        //     title: "",
        //     body: "",
        // })
        setUpdatedDataApi({});

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;
        // console.log("action ",e.nativeEvent.submitter.value);

        if(action === "Add"){
            addPostData();
        }
        else if(action === "Edit"){
            updatePostData();
        }
    };


  return (
<form onSubmit={handleFormSubmit} className="w-full max-w-md p-6 bg-black bg-opacity-70 backdrop-blur-lg text-white rounded-xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-wood.png")' }}>
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
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-black"
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
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-black"
            />
        </div>
    </div>

    <button 
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-200 ease-in-out"
        value={Object.keys(updateDataApi).length == 0 ? "Add" : "Edit"}
    >
        {Object.keys(updateDataApi).length == 0 ? "Add" : "Edit"}
    </button>
</form>
)
}

export default Form