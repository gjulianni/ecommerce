import ImageBanner from '../components/banner/ImageBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import LoginComponent from '../components/home/LoginComponent';
import RecommendedProductList from '../components/home/RecommendedProductList';
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

        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <ImageBanner images={images} />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <div style={{ width: '100%', maxWidth: '1400px' }}>
        <CategoryGrid />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
    <div style={{ width: '100%', maxWidth: '80%' }}>
        <LoginComponent />
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <div style={{ width: '100%', maxWidth: '80%' }}>
      <h1>👉 Produtos selecionados para você</h1>
        <WrapperSld>
          
        <RecommendedProductList />
        </WrapperSld>
      </div>
    </div>
        </GlobalStyles>
        
    )
}

const GlobalStyles = styled.body`
    padding: 0;
    margin: 0;
    box-sizing: border-box;

`;


const WrapperSld = styled.div`
   background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 3px 7px 2px rgba(0, 0, 0, 0.32);
  padding: 10px;
  max-width: 100%;
  width: 100%;
  overflow: hidden; /* Evita qualquer overflow */
  box-sizing: border-box;
    
`
