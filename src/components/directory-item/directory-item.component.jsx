import {DirectoryItemContainer,BackgroundImage,Body} from './directory-item.styles'
import {Link} from 'react-router-dom';
const CategoryItem = ({category}) => {
    const {imageUrl,title,route} = category;
    return(
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl}/>  
            <Body>
            <Link to={route} className='title'>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </Link>
            </Body>
        </DirectoryItemContainer>
    )
}

export default CategoryItem