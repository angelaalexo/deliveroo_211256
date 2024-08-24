import React from 'react'
import Delivery from '../img/delivery.png'
import Backbg from '../img/gradient4.jpg'
import { HeroData } from '../util/data'
import Chef from '../img/chef1.png'
import { MdArrowRight } from "react-icons/md";


const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full' id='home'>
        <div className='py-2 flex-1 flex flex-col items-start justify-start gap-12'>
            <div className='flex gap-4'>
            <div className='flex items-center gap-2 bg-orange-200 justify-center px-4 py-1 rounded-full'>
                <p className='text-base text-orange-500 font-semibold'>Fast Delivery</p>
                <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt='delivery'/>
                </div>
            </div>

            <div className='flex items-center gap-2 bg-orange-200 justify-center px-4 py-1 rounded-full'>
            <p className='text-base text-orange-500 font-semibold ml-4'>Tasty food</p>
                <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Chef} className='w-full h-full object-contain' alt='chef'/>
                </div>
            </div>
            </div>

            <p className='text-[2.5rem] md:text-[4.25rem] font-bold tracking-wide text-headingColor'>Order the best {''}
                <span className='text-orange-500 text-[3rem] md:text-[5rem] font-bold'>FOOD</span>
                {''} in the city!
            </p>

            <p className='text-base text-textColor align-left md:w-[70%]'>...on your door in just minutes</p>

            <div className='flex gap-4 top-10'>
                <button type='button' className='bg-gradient-to-tr from-red-600 to-red-400 w-full md:w-auto px-4 py-2 rounded-xl hover:shadow-lg transition-all ease-in-out duration-150 text-white'>Order Now </button>
                <button type='button' className='bg-transparent md:w-auto px-4 py-2 flex items-center gap-2 rounded-xl hover:shadow-lg transition-all ease-in-out duration-150 text-red-600'>Learn More <MdArrowRight/></button>
            </div>

        </div>

        

        <div className='py-2  flex-1 flex items-center relative'>
            <img src={Backbg} className='ml-auto h-200 w-full lg:h-585 lg:w-auto rounded-2xl' alt='bg'/>

            <div className='w-full h-full absolute top-0 left-4 flex items-center justify-center px-20 py-28 gap-6 flex-wrap lg:px-32'>
                {HeroData && HeroData.map((n)=>(
                    <div key={n.id} className='lg:w-150 w-[140px]  p-2 bg-cardOverlay backdrop-blur-lg rounded-lg flex flex-col items-center justify-center'>
                    <img src={n.source} className='lg:w-38 -mt-10 lg:-mt-20 rounded-lg  h-30' alt='food1'/>
                    <p className='text-base lg:text-xl font-semibold text-red-600 mt-2 lg:mt-3'>{n.name}</p>
                    <p className='text-[10px] lg:text-sm text-headingColor font-extralight my-1 lg:my-1'>{n.description}</p>
                    <p className='text-md font-semibold text-headingColor'>
                        <span className='text-lg text-red-600'>€ </span>
                        {n.price}
                    </p>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default HomeContainer
