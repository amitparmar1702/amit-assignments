import React from 'react'
import { GiChickenOven } from "react-icons/gi";
import { LuLeafyGreen } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';
function Card ({name,image,id,price,type}){
    let dispatch=useDispatch()
  return (

    <div className='w-[300px] h-[400px] bg-white p-3 rounded-lg flex 
    flex-col gap-3 shadow-lg hover:border-3 border-green-400 '>
        <div className='w-[100%] h-[60%] overflow-hidden rounded-lg'> 
        <img src={image} alt={name} className="w-full h-54 object-fill rounded-lg" />
        </div>

        <div className='text-2xl font-semibold'>
            {name}
        </div>

        <div className='w-full flex justify-between items-center'>
            <div className='text-lg font-bold text-green-500'>Rs {price}</div>
            <div className='flex justify-center items-center gap-2 text-green-500 text-lg
             font-semibold'>{type==="veg"?<LuLeafyGreen />:<GiChickenOven />}<span>{type}</span></div>
        </div>

        <button className='w-full p-3 rounded-lg bg-green-300 text-white 
        hover:bg-green-500 transition-all cursor-pointer' onClick={()=>{dispatch(AddItem({id:id, name:name, price:price, image:image, qty:1})); toast.success("Item added") }

        }>Add to dish</button>

    </div>

  )
}

export default Card