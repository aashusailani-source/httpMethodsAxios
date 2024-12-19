import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/postApi'
import Form from './Form';

function Post() {

    const [data , setData] = useState([]);

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
        console.log("render ")
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

  return (

    <div className='flex flex-col justify-center items-center'>
        <section className="py-2 flex items-center justify-center bg-gray-800 w-full">
            <Form data={data} setData={setData} />
        </section>
        <section className="py-8 bg-gray-800 min-h-screen">
            <ol className="flex justify-center items-center w-full gap-6 flex-wrap px-4">
                {
                    data.map((currElem, index) => {
                        const { id, body, title } = currElem;

                        return (
                            <li key={id} className="w-72 h-auto max-w-xs p-4 flex flex-col justify-between bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                {/* Number on the card */}
                                <div className="absolute top-2 left-4 bg-gray-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                                    {index + 1}
                                </div>

                                <div className="flex flex-col flex-grow mt-6">
                                    {/* Title */}
                                    <p className="text-xl font-semibold truncate text-gray-100">{title.split(' ').slice(0, 4).join(' ')}</p>
                                    
                                    {/* Body */}
                                    <p className="text-sm mt-2 text-gray-300 truncate">{body.split(' ').slice(0, 15).join(' ')}{body.split(' ').length > 15 ? '...' : ''}</p>
                                </div>

                                <div className="flex gap-4 mt-4">
                                    {/* Edit Button */}
                                    <button className="bg-green-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-green-700 transform transition duration-300 ease-in-out hover:scale-105">
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button className="bg-red-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-red-700 transform transition duration-300 ease-in-out hover:scale-105" onClick={() => handleDeletePost(id)}>
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