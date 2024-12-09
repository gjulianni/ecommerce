import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Nav.css'

const Nav: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <nav className="nav">
        <button onClick={toggleSidebar} className="checkbtn">
          <FontAwesomeIcon icon={faBars} className="fas fa-bars" />
        </button>
        <div className='logonav'>
        <label className="logo">Edstore</label>
        <p>produtos</p>
        </div>
        <input type='text' id='nav-search' placeholder='Busque seu produto'/>
        <ul className={isSidebarOpen ? 'open' : ''}>
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
      </nav>
    </>
  );
};

export default Nav;