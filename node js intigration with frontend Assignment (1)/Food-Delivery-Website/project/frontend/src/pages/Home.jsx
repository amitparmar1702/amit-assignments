import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Category from '../Category';
import Card from '../components/Card';
import { DataContext } from '../context/UserContext';
import { RxCross2 } from "react-icons/rx";
import Card2 from '../components/Card2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Home = () => {
  const { cate, setCate, input, showCart, setShowCart } = useContext(DataContext);
  const [allFoodItems, setAllFoodItems] = useState([]);

  // ✅ Fetch data from backend API
  useEffect(() => {
    fetch("http://localhost:25000/api/foods")
      .then(res => res.json())
      .then(data => {
        setAllFoodItems(data);
        setCate(data); // show all items by default
      })
      .catch(err => console.error("Error fetching foods:", err));
  }, []);

  // ✅ Filter logic
  function filter(category) {
    if (category === "All") {
      setCate(allFoodItems);
    } else {
      const newList = allFoodItems.filter(item => item.food_category === category);
      setCate(newList);
    }
  }

  // ✅ Cart calculations
  const items = useSelector(state => state.cart);
  const subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);
  const deliveryFee = 20;
  const taxes = subtotal * 0.5 / 100;
  const total = Math.floor(subtotal + deliveryFee + taxes);

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav />

      {!input ? (
        <div className='flex flex-wrap justify-center items-center gap-5 w-full'>
          {Category.map((item, index) => (
            <div key={index} className='w-[140px] h-[150px] bg-white flex flex-col items-start
              gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 
              rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all
              duration-200' onClick={() => filter(item.name)}>
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      ) : null}

      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {cate.length > 0 ? cate.map((item, index) => (
          <Card key={index} name={item.food_name} image={`/assets/${item.food_image}`}
            price={item.price} id={item.id} type={item.food_type} />
        )) : (
          <div className='text-center text-2xl text-green-500 font-semibold pt-5'>No dish found</div>
        )}
      </div>

      {/* Cart Drawer */}
      <div className={`w-full md:w-[40vw] h-full top-0 right-0 bg-white shadow-xl flex flex-col items-center fixed  
          p-6 transition-all duration-400 overflow-auto pl-2 ${showCart ? "translate-x-0" : "translate-x-full"} `}>

        <header className='w-full flex justify-between items-center'>
          <span className='text-green-400 text-[18px] font-semibold pl-4'>Order items</span>
          <RxCross2 className='w-[25px] h-[25px] text-green-400 cursor-pointer hover:text-gray-600' onClick={() => setShowCart(false)} />
        </header>

        {items.length > 0 ? (
          <>
            <div className='w-full mt-9 flex flex-col gap-8 '>
              {items.map((item, index) => (
                <Card2 key={index} name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
              ))}
            </div>

            <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
                <span className='text-green-400 font-semibold text-lg'>Rs{subtotal}/-</span>
              </div>
              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
                <span className='text-green-400 font-semibold text-lg'>Rs{deliveryFee}/-</span>
              </div>
              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
                <span className='text-green-400 font-semibold text-lg'>Rs{taxes.toFixed(2)}/-</span>
              </div>
            </div>

            <div className='w-full flex justify-between items-center p-9'>
              <span className='text-lg text-gray-600 font-semibold'>Total</span>
              <span className='text-green-400 font-semibold text-2xl'>Rs{total}/-</span>
            </div>

            <button className='w-[80%] p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all'
              onClick={() => toast.success("Order Placed..")}>Place Order</button>
          </>
        ) : (
          <div className='text-center text-2xl text-green-500 font-semibold pt-5'>Empty Cart</div>
        )}
      </div>
    </div>
  );
};

export default Home;
