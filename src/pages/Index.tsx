import ImageBanner from '../components/banner/ImageBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import LoginComponent from '../components/home/LoginComponent';
import Nav from '../components/nav/Nav';
import styled from 'styled-components';


export default function Index() {

    

    const images = [
        "https://www.climba.com.br/blog/wp-content/uploads/2021/07/Climba-BLOG-8.jpg",
        "https://climba.com.br/blog/wp-content/uploads/2021/07/Climba-BLOG-2.jpg",
        "https://climba.com.br/blog/wp-content/uploads/2021/07/Climba-BLOG-4.jpg",
        "https://climba.com.br/blog/wp-content/uploads/2021/07/Climba-BLOG-6.jpg",
      ];


    return (
      <GlobalStyles>
        <Nav />

        <div>
      <ImageBanner images={images} />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <div style={{ width: '100%', maxWidth: '1400px' }}>
        <CategoryGrid />
      </div>
    </div>
        <LoginComponent />
        </GlobalStyles>
        
    )
}

const GlobalStyles = styled.body`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
`;
