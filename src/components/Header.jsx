import React, { useState } from 'react'
import Logo from '../img/logo.png'
import {FaShoppingCart, FaPlusCircle, FaLockOpen} from "react-icons/fa";
import {motion} from 'framer-motion'
import Profile from '../img/profile_icon.png'
import {Link} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {app} from '../firebase.config'
import {actionType} from '../contents/reducer';
import {useStateValue} from '../contents/StateProvider'

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user, cartShow, cartItems}, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if(!user){
            const {user: {providerData}} = await signInWithPopup(firebaseAuth, provider);
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0]
        });
        localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
        else{
            setIsMenu(!isMenu)
        }
    };

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
    
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
    };

    const showCart = () => {
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
      });
    };

return (
    <header className='fixed z-50 w-screen p-3 px-9 md:p-6 md:px-15 bg-primary'>
      {/*DESKTOP & TABLET*/}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
            <img src={Logo} className='w-24 object-cover' alt='logo'/>
            <p className='text-red-600 text-xl font-bold '>Deliveroo</p>
        </Link>

        <div className='flex items-center gap-10 mr-4'>
        <motion.ul initial={{opacity:0, x:300}} animate={{opacity:1, x:1}} exit={{opacity:0, x:300}} className='flex items-center gap-16 mr-18'>
            <li className='text-lg text-red-600 hover:text-orange-600 duration-75 transition-all ease-in-out cursor-pointer font-bold'><Link to={'/'}>Home</Link></li>
            <li className='text-lg text-red-600 hover:text-orange-600 duration-75 transition-all ease-in-out cursor-pointer font-bold'><Link to={'/menu'}>Menu</Link></li>
            <li className='text-lg text-red-600 hover:text-orange-600 duration-75 transition-all ease-in-out cursor-pointer font-bold'><Link to={'/about-us'}>About</Link></li>
            <li className='text-lg text-red-600 hover:text-orange-600 duration-75 transition-all ease-in-out cursor-pointer font-bold'> <Link to="/contact">Contact</Link></li>
        </motion.ul>

        <div className='relative flex items-center justify-center' onClick={showCart}>
            <FaShoppingCart className='text-orange-600 text-3xl cursor-pointer'/>
            {cartItems && cartItems.length > 0 && (
              <div className='absolute -top-3 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-sm text-white font-bold'>{cartItems.length}</p>
              </div>
            )}
        </div>

        <div className='relative'>
            <motion.img whileTap={{scale:0.6}} src={user ? user.photoURL : Profile} className='w=10 min-w-[30px] h-10 min-h-[30-px] drop-shadow-2xl cursor-pointer rounded-full' alt='profile' onClick={login}/>
            {isMenu && (
                <motion.div initial={{opacity: 0, scale:0.6}} animate={{opacity: 1, scale:1}} exit={{opacity: 0, scale:0.6}} className='w-40 bg-red-600 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                {user && user.email === 'angela.aleksovska@gmail.com' && (
                    <Link to={'/createItem'}>
                        <p className='px-3 py-3 flex items-center gap-4 cursor-pointer hover:bg-orange-500 transition-all duration-75 ease-in-out text-teal-50 text-base'>New Item<FaPlusCircle/></p>
                    </Link>
                    )
                }
                    <p className='px-3 py-3 flex items-center gap-4 cursor-pointer hover:bg-orange-500 transition-all duration-75 ease-in-out text-teal-50 text-base' onClick={logout}>Logout<FaLockOpen/></p>
                </motion.div>
                )
            }
        </div>
        </div>
      </div>

      {/*MOBILE*/}
      <div className='flex items-center justify-between md:hidden w-full h-full'>
        <div className='relative flex items-center justify-center' onClick={showCart}>
            <FaShoppingCart className='text-orange-600 text-3xl cursor-pointer'/>
            {cartItems && cartItems.length > 0 && (
            <div className='absolute -top-3 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-sm text-white font-bold'>{cartItems.length}</p>
            </div>
            )}
        </div>

        <Link to={'/'} className='flex items-center gap-2'>
            <img src={Logo} className='w-20 object-cover' alt='logo'/>
        </Link>
        
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Profile}
            className="w-10 min-w-[30px] h-10 min-h-[30px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div initial={{opacity: 0, scale:0.6}} animate={{opacity: 1, scale:1}} exit={{opacity: 0, scale:0.6}} className="w-40 bg-red-600 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
              {user && user.email === "angela.aleksovska@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-3 py-3 flex items-center gap-4 cursor-pointer hover:bg-orange-500 transition-all duration-75 ease-in-out text-teal-50 text-base">New Item <FaPlusCircle /></p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <li className="text-base text-white hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer  hover:bg-orange-500 px-3 py-2"><Link to="/">Home</Link></li>
                <li className="text-base text-white hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer  hover:bg-orange-500 px-3 py-2"><Link to="/menu">Menu</Link></li>
                <li className="text-base text-white hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer  hover:bg-orange-500 px-3 py-2"><Link to="/about-us">About Us</Link></li>
                <li className="text-base text-white hover:text-headingColor duration-75 transition-all ease-in-out cursor-pointer  hover:bg-orange-500 px-3 py-2"><Link to="/contact">Contact</Link></li>
              </ul>

              <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-red-950 gap-4 cursor-pointer hover:bg-orange-500 transition-all duration-75 
                ease-in-out text-teal-50 text-base" onClick={logout}>Logout <FaLockOpen /></p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

