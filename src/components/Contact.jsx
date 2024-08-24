import React from 'react';

const Contact = () => {

  return (
    <div className='w-full h-900 flex flex-col items-center justify-center'>
      <section className='w-full max-w-4xl mx-auto p-6 items-center justify-center'>
        <div className='w-full'>
          <p className='text-3xl font-semibold capitalize text-headingColor relative mb-4 before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
            Contact Us
          </p>
        </div>
      </section>

      <section className="contact-form w-full max-w-4xl mx-auto p-6">
        <div className="form-container">
          <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
          <form>
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input type="text" id="name" name="name" className="w-full p-2 mb-4 border border-red-600 rounded"/>

            <label htmlFor="email" className="block mb-2">Email:</label>
            <input type="email" id="email" name="email" className="w-full p-2 mb-4 border border-red-600 rounded"  />

            <label htmlFor="phone" className="block mb-2">Phone:</label>
            <input type="tel" id="phone" name="phone" className="w-full p-2 mb-4 border border-red-600 rounded"  />

            <label htmlFor="message" className="block mb-2">Message:</label>
            <textarea id="message" name="message" rows="4" className="w-full p-2 mb-4 border border-red-600 rounded" ></textarea>

            <button type="submit" className="submit-button bg-red-600 text-white p-2 rounded">Submit</button>
          </form>
        </div>
      </section>

      <section className="contact-info w-full max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <address className="not-italic mb-4">
          Deliveroo<br />
          123 Main Street<br />
          USA<br />
          Phone: <a href="tel:1234567890" className="text-red-600">+57 889 732 213</a><br />
          Email: <a href="mailto:deliveroo@gmail.com" className="text-red-600">deliveroo@gmail.com</a>
        </address>
      </section>
    </div>
  );
};

export default Contact;
