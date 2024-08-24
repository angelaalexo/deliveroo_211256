import { fetchUser, fetchCart } from "../util/getLocalData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user : userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
};