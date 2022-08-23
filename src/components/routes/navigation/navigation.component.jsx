import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from './navigation.styles';
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropDown from "../../cart-dropdown/cart-dropdown.component";
const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    const signOutHandler = async () =>
    {
        await signOutUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                 <LogoContainer to='/'>
                    <div><CrwnLogo className='logo'/></div>
                </LogoContainer>
                
                <NavLinks>
                    <NavLink className='nav-link' to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>) : (<NavLink className='nav-link' to='/auth'>SIGN IN</NavLink>)
                    }
                    <CartIcon></CartIcon>
                </NavLinks> 
            </NavigationContainer>
            {
            isCartOpen && <CartDropDown/>
            }
            <Outlet/>
        </Fragment>
    );
};

export default Navigation;