import {useContext} from 'react';
import { CategoriesContext } from '../../../context/categories.context';
import CategoryPreview from '../../category-preview/category-preview.component';

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    console.log(categoriesMap);
    return (
        <div className='categories-container'>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                    );
                    }) }
                
        </div>
    );
}
export default CategoriesPreview;