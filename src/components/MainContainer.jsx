import React, { useEffect, useRef, useState } from 'react'
import HomeContainer from './HomeContainer';
import {motion} from 'framer-motion'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { useStateValue } from "../contents/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

const MainContainer = () => {

  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
  <div className='w-full h-auto flex flex-col items-center justify-center'>
    <HomeContainer/>
    

    <MenuContainer/>

    {cartShow && <CartContainer />}

    <AboutUs/>

    <Contact/>

  </div>
  );
}

export default MainContainer;

