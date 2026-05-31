import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const [data,setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if(response.data.success){
        setData(response.data.allAlbums);
      }
    } catch (error) {
      toast.error("Error ocurred")
    }
  }
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`,{id});
      if(response.data.success){
        toast.success("Album removed");
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occur");
    }
  }
  useEffect(()=>{
    fetchAlbums();
  },[]);

  return (
    <div>
        <p>All Album List</p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 '>
              <b>Image</b>
              <b>Name</b>
              <b>Album Description</b>
              <b>Album Color</b>
              <b>Action</b>
          </div>
          {data.map((item,index) => {
            return (
              <div key={index}  className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} className='w-12' alt="" />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <input type="color" value={item.bgColor}/>
                <p className='text-red-600 cursor-pointer' onClick={() => {removeAlbum(item._id)}}>X</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default ListAlbum
