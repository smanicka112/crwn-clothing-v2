import {DirectoryItemContainer,BackgroundImage,Body} from './directory-item.styles'
import { useNavigate } from "react-router-dom";
const CategoryItem = ({category}) => {
    const {imageUrl,title,route} = category;
    let navigate = useNavigate();
    const navigateToShop = () => {
        navigate(route,{replace:false});
    }
    return(
        <DirectoryItemContainer onClick={navigateToShop}>
                <BackgroundImage imageUrl={imageUrl}/>  
                <Body>
                    <h2>{title.toUpperCase()}</h2>
                    <p>Shop Now</p>
                </Body>
        </DirectoryItemContainer>
    )
}

export default CategoryItem