import { useState, useContext } from "react";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import {  createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,signInWithGooglePopup, signInWithGoogleRedirect,  } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        try{
        const {user} = await signInAuthUserWithEmailAndPassword(email,password);
        resetFormFields();
        }
        catch(error){
            switch(error.code){
                case 'auth/user-not-found': 
                    alert('Email is not registered'); 
                    break;
                case 'auth/wrong-password': 
                    alert('Invalid password'); 
                    break;
            }
            console.log(error);
        }
        
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields,[name]:value});

    }
    const signInWIthGoogle = async () => {
        const {user} = await signInWithGoogleRedirect();
        
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} minLength="6"></FormInput>
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button type="button" buttonType='google-sign-in' onClick={signInWIthGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;