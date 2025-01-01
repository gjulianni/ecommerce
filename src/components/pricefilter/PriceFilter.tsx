import React, { useState } from 'react';
import styled from 'styled-components';

type PriceFilterProps = {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  applied: boolean;
  setApplied: React.Dispatch<React.SetStateAction<boolean>>;
  maxPrice: number;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ price, setPrice, applied, setApplied, maxPrice }) => {
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleApplyFilter = () => {
    setApplied(true);
  };

  const handleRemoveFilter = () => {
    setApplied(false);
  };

  
  
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: '#fff',
      width: '90%',
      maxWidth: '370px',
      height: '250px',
      margin: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '10px',
    },
    slider: {
      width: '100%',
      cursor: 'pointer',
    },
    applyButton: {
      backgroundColor: isHovered ? 'rgb(0, 97, 187)' : 'rgb(0, 134, 255)',
      color: '#fff',
      width: '80%',
      alignSelf: 'center',
      textTransform: 'uppercase' as 'uppercase',
      border: 'none',
      outline: 'none',
      fontSize: '20px',
      padding: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.header}>
      <PSld>Filtrar por preço:</PSld>
        <PSld>R$ {price.toFixed(2)}</PSld>
      </div>
      <input
        type="range"
        min="0"
        max={maxPrice}
        step="10"
        value={price}
        onChange={handlePriceChange}
        style={styles.slider}
      />
      <button 
        type='submit'
        style={styles.applyButton}
        onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleApplyFilter}
      >Aplicar Filtro</button>
      
      {applied && (
        <>
        <p>Filtro aplicado de R${price}</p>
        <button 
        type='submit'
        style={styles.applyButton}
        onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRemoveFilter}
      >Remover Filtro</button>
        </>
        
        
      )}
    </div>
  );
};

const PSld = styled.p`
  font-size: 20px;
  margin: 20px;

`
  



export default PriceFilter;