import { createUserWithEmailAndPassword } from "@firebase/auth";
import { createContext, useReducer,useEffect } from "react";
import {createAction} from '../utils/reducer/reducer.utils';
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    deleteItemFromCart: ()=>{},
    cartCount: 0,
    cartTotal:0,
})
export const CART_ACTIONS = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',

}
const INITIAL_STATE = {
    isCartOpen:false,
    cartItems: [],
    cartCount: 0,
    cartTotal:0,
}
export const cartReducer = (state,action)=>{
    const {type, payload} = action;
   
    var {newCartItems,newCartCount,newCartTotal,isCartOpen} = payload;
    switch(type){
        case CART_ACTIONS.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:!isCartOpen,
            };
        case CART_ACTIONS.SET_CART_ITEMS:
            
                 return {
                ...state,
                cartItems:newCartItems,
                cartCount:newCartCount,
                cartTotal:newCartTotal

            };
        default:
            throw new Error(`Unhandled type ${type} in CartReducer`);
    } 
    
}

export const CartProvider = ({children}) => {
/* 
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0); */

    const [state,dispatch] = useReducer(cartReducer,INITIAL_STATE);
    const {isCartOpen,cartItems,cartCount,cartTotal} = state;
    

    /*    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems]);
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price),0);
        setCartTotal(newCartTotal);
    },[cartItems]);  */ 
    const addCartItem = (cartItems,productToAdd) => {
        const existingCartItem = cartItems.find((cartItem) => cartItem.id===productToAdd.id)
        if(existingCartItem){
            return cartItems.map((cartItem) => cartItem.id === productToAdd.id? {...cartItem, quantity: cartItem.quantity+1}: cartItem);
        }
        return [...cartItems,{...productToAdd,quantity:1}];
    }
    const removeCartItem = (cartItems,productToRemove) => {
        const existingCartItem = cartItems.find((cartItem) => cartItem.id===productToRemove.id)
        if(existingCartItem && existingCartItem.quantity>1){
            return cartItems.map((cartItem) => cartItem.id === productToRemove.id? {...cartItem, quantity: cartItem.quantity-1}: cartItem);
        }
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }
    const deleteCartItem = (cartItems,itemToDelete) => {
        return cartItems.filter(cartItem => cartItem.id !== itemToDelete.id);
    }
    const setIsCartOpen = () => {
        dispatch(createAction(CART_ACTIONS.SET_IS_CART_OPEN,{isCartOpen}));
    }
    const updateCartItemsReducer = (newCartItems) => {
        var newCartCount,newCartTotal;
        newCartCount=newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price),0);
        dispatch(createAction(CART_ACTIONS.SET_CART_ITEMS,{newCartItems,newCartCount,newCartTotal}));
    }
    const addItemToCart = (itemToAdd) =>{
        updateCartItemsReducer(addCartItem(cartItems,itemToAdd));
        
    }
    const removeItemFromCart = (itemToRemove) =>{
        updateCartItemsReducer(removeCartItem(cartItems,itemToRemove));
   }
    const deleteItemFromCart = (itemToDelete) =>{
        updateCartItemsReducer(deleteCartItem(cartItems,itemToDelete));
    }
    const value = {isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount,removeItemFromCart,deleteItemFromCart,cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
