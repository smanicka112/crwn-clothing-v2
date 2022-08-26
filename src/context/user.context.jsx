import { onAuthStateChanged } from '@firebase/auth';
import {createContext, useState, useEffect, useReducer} from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null,
}
);

export const USER_ACTIONS = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
export const userReducer = (state,action) => {
      const {type, payload} = action;

    switch(type){
        case USER_ACTIONS.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:payload
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    } 
}
const INITIAL_STATE = {
    currentUser:null,
}
export const UserProvider = ({children}) => {

    //const [currentUser, setCurrentUser] = useState(null);
    const [state,dispatch] = useReducer(userReducer,INITIAL_STATE);
    const {currentUser} = state;
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTIONS.SET_CURRENT_USER,user));
    }
    const value =  {currentUser, setCurrentUser};
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}