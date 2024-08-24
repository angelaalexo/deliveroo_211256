import React, { useEffect } from 'react';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import CreateContainer from './components/CreateContainer';
import Menu from './components/Menu';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useStateValue } from './contents/StateProvider';
import { getAllFoodItems } from './util/firebaseFunctions';
import { actionType } from './contents/reducer';

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const location = useLocation();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
