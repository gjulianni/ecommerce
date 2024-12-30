import { useLocation } from 'react-router-dom';
import { SearchResultsGrid } from '../components/nav/Nav';
import Nav from '../components/nav/Nav';
import styled from 'styled-components';
import PriceFilter from '../components/pricefilter/PriceFilter';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const products = location.state?.products || [];
  const searchString = location.state?.searchString || "";

  

  return (
    <GlobalStyles>

      <Nav />
      
      <TitleWrapper>
      <h1>Resultados para {searchString}</h1>
      <PSld>{products.length} produtos encontrados</PSld>
      
      </TitleWrapper>
      <WrapperSld>
       
      <Wrapper>
      <PriceFilter />
      <SearchResultsGrid products={products} />
      </Wrapper>
      </WrapperSld>
    </GlobalStyles>
  );
};


const GlobalStyles = styled.div`
  background-color: #f9f9f9;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha à direita */
  align-items: flex-start; /* Garante que o conteúdo fique alinhado no topo */
  width: 100%; /* Permite que ocupe todo o espaço horizontal */
  padding: 20px; /* Adiciona algum espaçamento */
`;

const WrapperSld = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    height: auto;
    padding: 20px 0;
    
    
`

const PSld = styled.p`
  color: rgb(134, 134, 134);
  font-size: 22px;
  margin: 3px;
`


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`
