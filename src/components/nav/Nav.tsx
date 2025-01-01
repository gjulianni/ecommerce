import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Nav.css'
import axios from 'axios';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import PriceFilter from '../pricefilter/PriceFilter';

const Nav: React.FC = () => {

  const navigate = useNavigate();
  {/*const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

   const handleHomeClick = () => {
    navigate('/home'); 
  };
  const handleModelsClick = () => {
    navigate('/models'); 
  };
  const handleVipClick = () => {
    navigate('/vip');
  };
  const handleServersClick = () => {
    navigate('/servers');
    window.scrollTo(0, 0);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  */}


  const [searchString, setSearchString] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const searchProduct = async() => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:3001/api/products/search/${searchString}`);
      setProducts(response.data);
      navigate('/search-results', { state: { products: response.data, searchString: searchString } });
    } catch (error) {
      console.error("Erro ao buscar produtos nav:", error);
    }
  } 

  return (
    <>
      <nav className="nav">
        <button className="checkbtn">
          <FontAwesomeIcon icon={faBars} className="fas fa-bars" />
        </button>
        <div className='logonav'>
        <label className="logo">Edstore</label>
        <p>produtos</p>
        </div>
        <div className='search-area'>
        <input type='text' id='nav-search' placeholder='Busque seu produto'
        onChange={(e) => setSearchString(e.target.value)} 
        />
        <button onClick={searchProduct}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg></button>

        </div>
        {/*<ul className={isSidebarOpen ? 'open' : ''}>
          <li >Home</li>
          <li >Eletrônicos</li>
          <li >Roupas</li>
          <li >Móveis</li>
          <li >Esportes</li>
          <li >Ferramentas</li>
          <li >Automotivo</li>
          <li >Jardinagem</li>
          <li >Brinquedos</li>
        </ul>
        */}
      </nav>
  
    </>
  );
};

export const SearchResultsGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div style={gridStyle}>
      {products.length === 0 ? (
        <p></p>
      ) : (
        products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.images} alt={product.name} style={imageStyle} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>R$ {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};



const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', /* Ajuste o mínimo para manter os cards bonitos */
  gap: '24px', /* Espaçamento entre os cards */
  justifyContent: 'end', /* Alinha o grid à direita */
  maxWidth: '80%', /* Define um limite para o grid */
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  background: '#fff',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '80%',
  height: 'auto',
  borderRadius: '8px',
};

export default Nav;