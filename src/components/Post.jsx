import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/postApi'
import Form from './Form';

function Post() {

    const [data , setData] = useState([]);
    const [updateDataApi, setUpdatedDataApi] = useState({});

    const getPostData = async () => {
        try {

            const res = await getPost();
            console.log(res.data);
            setData(res.data);

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        console.log("render")
        getPostData();
    },[]);


    const handleDeletePost = async (id) => {
       try {
        const res = await deletePost(id);
        if(res.status === 200){
            const newUpdatedPosts = data.filter((currElem) => currElem.id !== id);
            setData(newUpdatedPosts);
        }
        else{
            console.log("Failed to delete the Post: ",response.status);
        }
       } catch (error) {
        console.log(error.message);
       }
    }

    const handleUpdatePost = async (currElem) => {
        await setUpdatedDataApi(currElem);
    }

  return (
<div className='flex flex-col justify-center items-center'>
    <section className="py-4 flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-black w-full">
        <Form 
            data={data} 
            setData={setData} 
            updateDataApi={updateDataApi} 
            setUpdatedDataApi={setUpdatedDataApi} 
        />
    </section>
    <section className="py-8 bg-gray-950 min-h-screen">
        <ol className="flex justify-center items-center w-full gap-6 flex-wrap px-4">
            {
                data.map((currElem, index) => {
                    const { id, body, title } = currElem;

                    return (
                        <li key={id} className="w-72 h-auto max-w-xs p-4 flex flex-col justify-between bg-opacity-20 backdrop-blur-lg text-white rounded-3xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl border-red-800 border-2"
                            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-wood.png")' }}>
                            {/* Number on the card */}
                            <div className="absolute top-2 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                                {index + 1}
                            </div>

                            <div className="flex flex-col flex-grow mt-6">
                                {/* Title */}
                                <p className="text-xl font-semibold truncate text-gray-100">Title: {title.split(' ').slice(0, 4).join(' ')}</p>
                                
                                {/* Body */}
                                <p className="text-sm mt-2 text-gray-300 truncate">News: {body.split(' ').slice(0, 15).join(' ')}{body.split(' ').length > 15 ? '...' : ''}</p>
                            </div>

                            <div className="flex gap-4 mt-4">
                                {/* Edit Button */}
                                <button className="bg-red-700 text-white py-2 px-5 rounded-lg shadow-md hover:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105"
                                onClick={() => handleUpdatePost(currElem)}
                                >
                                    Edit
                                </button>

                                {/* Delete Button */}
                                <button className="bg-red-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-red-500 transform transition duration-300 ease-in-out hover:scale-105" onClick={() => handleDeletePost(id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })
            }
        </ol>
    </section>
</div>


  )
}

export default Post