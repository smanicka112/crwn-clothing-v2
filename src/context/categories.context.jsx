import {createContext, useState, useEffect} from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';
export const CategoriesContext = createContext({
    categoriesMap: {},
}
);

export const CategoriesProvider = ({children}) => {
    useEffect(()=> {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);
    const [categoriesMap, setCategoriesMap] = useState({});
    const value =  {categoriesMap, setCategoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}