import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from "react-router-dom";
const CartDropDown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    let navigate = useNavigate();
    const navigateToCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout",{replace:false});
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                 cartItems.length ? (
                cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item}/>)))
                :
                (<span className='empty-message'>Your cart it empty</span>)

                }
            </div>
            <Button  onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown;