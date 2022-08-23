import { CartContext } from "../../context/cart.context";
import { useContext } from 'react';
import './checkout-item.styles.scss';
const CheckoutItem = ({item}) => {
    const {removeItemFromCart,addItemToCart,deleteItemFromCart} = useContext(CartContext);
    const deleteItem = () => {
        deleteItemFromCart(item);
    }
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={item.imageUrl} alt={`$(item.name)`}/>
            </div>
            <span className="name">{item.name}</span>
            <span className="quantity">
                <span className="arrow" onClick={()=>removeItemFromCart(item)} >❮</span>
                <span>{item.quantity}</span>
                <span className="arrow" onClick={()=>addItemToCart(item)}> ❯</span>
            </span>
            <span className="price">{item.price}</span>
            <div className="remove-button" onClick={deleteItem}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem;