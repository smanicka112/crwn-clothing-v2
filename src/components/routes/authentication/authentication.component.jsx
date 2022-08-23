import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils"
import SignUpForm from "../../sign-up-form/sign-up-form.component";
import SignInForm from "../../sign-in-form/sign-in-form.component";
import './authentication.styles.scss';
// import { useEffect } from "react";
// import { getRedirectResult} from 'firebase/auth';
const Authentication = () => {

    // useEffect(() => {
    //     async function getResultFromGoogleRedirect(){
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     getResultFromGoogleRedirect();
    // }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div class='authentication-container'>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authentication