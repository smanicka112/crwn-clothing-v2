import {BaseButton,GoogleButton,InvertedButton} from './button.styles.jsx';
/*
default

inverted

google sign in
*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
const Button = ({children, buttonType,...otherProps}) => {
    switch(buttonType)
    {
        case BUTTON_TYPE_CLASSES.google:
            return(
                <GoogleButton {...otherProps}>{children}</GoogleButton>
            ); 
            break;
        case BUTTON_TYPE_CLASSES.inverted:
            return(
                <InvertedButton {...otherProps}>{children}</InvertedButton>
            ); 
            break;
        default:
            return(
                <BaseButton {...otherProps}>{children}</BaseButton>
            ); 
            break;
    }
}
export default Button;