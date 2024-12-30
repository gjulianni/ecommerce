import React, { useState } from 'react';

const PriceFilter = () => {
  const [price, setPrice] = useState(100); 

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      width: '90%',
      maxWidth: '400px',
      height: '200px',
      margin: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '10px',
    },
    slider: {
      width: '100%',
      cursor: 'pointer',
    },
    applyButton: {
      backgroundColor: isHovered ? 'rgb(0, 120, 230)' : 'rgb(0, 134, 255)',
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
        <p>Filtrar por preço:</p>
        <span>R$ {price.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1000"
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
      >Aplicar Filtro</button>
    </div>
  );
};


  



export default PriceFilter;