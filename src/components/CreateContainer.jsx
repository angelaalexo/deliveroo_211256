import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FaBowlFood, FaCloudArrowUp, FaDeleteLeft, FaMoneyBill } from 'react-icons/fa6';
import {foods} from '../util/data'
import Loader from './Loader'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { storage } from "../firebase.config";
import { actionType } from "../contents/reducer";
import { getAllFoodItems, saveItem } from "../util/firebaseFunctions";
import { useStateValue } from "../contents/StateProvider";

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{foodItems}, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,  `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  }
  
  const saveDetails = () => {
    console.log("Title:", title);
    console.log("Calories:", calories);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("Image Asset:", imageAsset);
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
  <div className='w-full min-h-screen flex items-center justify-center'>
    <div className='w-[80%] md:w-[70%] border border-red-800 rounded-lg p-2 flex flex-col items-center justify-center gap-4'>
      {
        fields && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
            alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-green-400 text-green-800"
          }`}>{msg}</motion.p>
        )
      }

      <div className='w-full py-2 border-b border-red-600 items-center flex gap-2'>
        <FaBowlFood className='text-xl text-red-600'/>
        <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='What tasty thing am I?'
        className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-red-600 text-textColor'/>
      </div>

      <div className='w-full'>
        <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
          <option value='other' className='bg-red-600'>Select category</option>
          {
            foods && foods.map((item) => (
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-red-600 text-orange-400' value={item.urlParamName}>
                {item.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg'>
          {isLoading ? ( 
            <Loader/> 
          ) : ( 
            <>
            {!imageAsset ? ( 
            <>
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                  <FaCloudArrowUp className='text-red-600 text-2xl hover:text-lighttextGray'/>
                  <p className='text-red-600 hover:text-lighttextGray'>Click here to upload</p>
                </div>
                <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                />
              </label>
            </> 
          ) : ( 
          <><div className='relative h-full'>
              <img src={imageAsset} alt='uploaded' className='object-cover w-full h-full'/>
              <button type='button' className='absolute bottom-3 right-3 p-3 rounded-lg bg-red-600 text-xl cursor-pointer outline-none hover:shadow-lg duration-200 transition-all ease-in-out'
              onClick={deleteImage}>
                <FaDeleteLeft className='text-white'/>
              </button>
            </div>
            </>
          )}
          </>
        )}
      </div>

      <div className='w-full flex flex-col md:flex-row items-center justify-center gap-3'>
        <div className='w-full py-2 border-b border-red-600 flex items-center gap-2'>
          <FaBowlFood className='text-red-600 text-2xl'/>
          <input type='text' required value={calories} onChange={(e) => setCalories(e.target.value)} placeholder='Calories' className='w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-red-500'/>
        </div>
        <div className='w-full py-2 border-b border-red-600 flex items-center gap-2'>
          <FaMoneyBill className='text-red-600 text-2xl'/>
          <input type='text' required value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' className='w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-red-500'/>
        </div>
      </div>

      <div className='flex items-center w-full'>
        <button type='button' onClick={saveDetails} className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-red-600 px-12 py-2 rounded-lg text-lg text-white font-semibold'>Save</button>
      </div>
    </div>
  </div>
  );
}


export default CreateContainer;