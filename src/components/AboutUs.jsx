import React from 'react';
import Delivery from '../img/delivery.png';

const AboutUs = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <section className='w-full max-w-4xl mx-auto bg-red-600 p-6 rounded-2xl'>
        <div className='w-full'>
          <p className='text-2xl font-semibold capitalize text-white relative mb-4 before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
            About Us
          </p>
          <p className='text-base text-white leading-relaxed mb-6 font-light'>
            Welcome to Deliveroo, where convenience meets quality! We are passionate about bringing delicious meals straight to your door, making it easier than ever to enjoy your favorite foods without the hassle. Whether you're craving a quick bite, a healthy option, or something indulgent, we've got you covered.
            <br /><br />
            Founded with a mission to transform the way people experience food delivery, we partner with the best local restaurants and chefs to offer a diverse menu that caters to all tastes and preferences. From traditional dishes to new culinary trends, our selection is curated to satisfy every palate.
            <br /><br />
            At Deliveroo, we believe in more than just delivering food; we believe in delivering happiness. That's why we prioritize fresh ingredients, timely service, and an easy-to-use platform that puts you in control. Whether you're ordering for yourself, your family, or your entire office, our commitment to excellence ensures every meal is prepared with care and delivered with a smile.
            <br /><br />
            Thank you for choosing Deliveroo. We’re excited to serve you and make every meal a memorable one!
          </p>
          <img src={Delivery} alt='delivery' className='w-40 h-40 mx-auto mt-6' />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
