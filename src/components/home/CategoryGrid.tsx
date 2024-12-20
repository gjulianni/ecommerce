import React, { useRef } from "react";
import styled from "styled-components";

// Interface para as categorias
interface Category {
  name: string;
  icon: string; // Caminho do SVG ou componente SVG
  isNew?: boolean; // Se a categoria é nova
}

// Lista de categorias
const categories: Category[] = [
  { name: "Cupons", icon: "https://www.svgrepo.com/show/243589/coupon.svg", isNew: true },
  { name: "Celulares", icon: "data:image/png;base64,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" },
  { name: "Decoração", icon: "https://svgsilh.com/svg/701986.svg" },
  { name: "Automotivo", icon: "data:image/png;base64,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" },
  { name: "Imóveis", icon: "https://cdn-icons-png.flaticon.com/128/17688/17688469.png" },
  { name: "Eletrodomésticos", icon: "https://cdn-icons-png.flaticon.com/128/6020/6020736.png" },
  { name: "Móveis", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEX///8AAADHx8fz8/P29vYMDAxaWlohISH8/Pyrq6uWlpZ7e3ssLCzCwsLc3Nx3d3eysrI7OzucnJyJiYlGRkbOzs5NTU3t7e3W1tZwcHDm5uYaGhpra2ulpaW4uLg0NDRuCC+6AAACkUlEQVR4nO3c65ZrMBgGYIQ6M05tUZ37v8spscseM3yVpEz7vr8skvRZSoRWNCe1dBU5Ftr6NEpIbar1KDX7qU22HqXMpPsvibIIoZe0pKCsk8mW4hy6oiGhpCsHZRJKcpRBKPkBFFBAAQUUUEABBRRQQAEFFFBAAQUUUEABBRRQQG2F8i5lWR6qCcpt11/CbVAcEk1QWbfcbIma7imOcoECCiiggPodtbMe/dq4rpuyCcpo1zfnbVDj7GaUANQboq5boiLvx6SXrmSe/rx5IWklhAp1JakLAZSTqEHpBwFUFChC6UA9DWW7EtNYclCfDqEqNc4eUSZQ1EhCqQhQT0BVqlC1yCihVITyRFCnS23bNm/IFk7N95Jd+6bYyNNkrOIqZ/Fvzgsxva6dhrVdjBDqFsZRhPoLSbt2+E03UEDNo+4nweynPBlVJMcueTZ38X4yyvjXK8ZAASULxa9ulr8jFDv3mX2PDZ0nUEC9EMoIBWP48lGyAhRQu0b5sWD8fIJimrOUhX5qsf5S85N+So/95QSzKOFMUfQA9W4oZhQ80Y5QRj91wKN3M5TLeL4e1edBFOUJ/avd9wFFQxVJ3iXZ06MgWoB6ZdS55GOVON0R6n4KX4B6E1QVCabK5KM+A9HU86jK/eji/g/4e/d9+0JptVTUVQ4qk2k6nuSgnOaY8K/QTm7hfwxJCOG7OGgXOSJJ/P5JuzBK00yH/yjtOcys+Ei+IsznFXclQ/NWqVvKh98DJaA0rUfdlhhHnQjt+ff2GEcNQ0CgNkClklFiU9JND3Q6anSgf0OJTt432qQ/iBoqTVCyQ0cN2TtK7qWrj7UKNWxKVaBIU3lG3yqNXnhRMB1r7VF6GE0L81GlYGT6AjjJZWbIKDGhAAAAAElFTkSuQmCC" },
  { name: "Esportes", icon: "data:image/png;base64,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" },
  { name: "Ciclismo", icon: "data:image/jpeg;base64,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" },
  { name: "Calçados", icon: "data:image/png;base64,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" },
  { name: "Pets", icon: "data:image/png;base64,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" },
  { name: "Acessórios de Moda", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAZlBMVEX///8AAABvb2/S0tKhoaHw8PDi4uLz8/P8/PzNzc339/chISHc3Nzt7e2+vr6Tk5O1tbV9fX1JSUlkZGRdXV0bGxtYWFipqak8PDwmJibHx8dDQ0NSUlJ3d3eMjIwyMjIUFBQLCwt2Cix5AAAEqUlEQVR4nO1c25aiMBAEERQUAe+gwvD/P7k67py1QyUECElmT+pxAk5pOt2V6oDnOTg4ODg4/A+I4vxyueRxZJqICFG9v5at/0R5vddb03QwVtXNpzjlqWlSXVQHv4t7bpoWi/oL0HyiWJlm9onojFk+cbUoTNM7l6ZNREMRTd+/WZKjErSCPrG3I0aXPTR9vzZN8YW0l6bfVqZJPnHs5+mfQ9MsveokwdPfmaa5rmVo+nvTPKNNZ44fxePQqU6mc9OO/eGql/ZIKjZqM8M8F5TO4kchrQs6cDfK0vOYX/Mjo+/JyNWwxKM8P/NkTEbKwBjFF2iSP60/hlYkJFqzSjQgPAsylpGxiyGGb9DJpYua1v2lIYZvOJ5q4XiqheOpFr+F51bAxSaetL5T1W4Vz88ivqdi2CqeafOPCiM1rOLpVS1eRbbx9KLr946z6Qgiy3g+k9OyzvKk82freHLgeKqF46kWv4RnRO3bg2nnhoMt202yxf6myLt248m6ZpLnYbfRCv/7A2EBadrW9QquHJo2NZOeCorL8gUbWgrfWLZCnq0dibS36fXMpF1ppR1bcQvxjbvxIK2afpZPNLFRluv+DuIPTAbp6gEp4VxqLpOmsIH4lXt5iwaOhhoLu07D64XvLX20R0MbI73EC5zdxbv/Gi7gqH7Lfp1BItlPpkw4umQt/FTlSFmt2Z1YHBZXrZo0hlnzRjtbAfwuOjPpBXbg7+zRgBCuppOuIE1wfkT9YRzEhZZyH+FjFzjnsE3wN3Ts8LYwNEueyKxKdHkzuy4RZk0EI5mUPQvwF4UoK3LumTOTjvxtsKh6zHZyKB4ba5yYnimT4rV7lFm7g3LEREzKhQlWqurP5OCTlANqi2QNm4gAlsBBERZjuar0tAvWPgP9uAiaJgrFM09LDi3TnM/JFJX7Fc6aYzaQOJMulOzwIriCynHThQPorkCX5PCY/Hns3hF/66/Jhq7ympfiTDrNhlhxJPEUDcHZAU6xISJYl5upmWSHP3Z0kGKNu5+ucbewajQjDV1sv55VZLsEPh0yytDleFyqbDfO+hwcpJznYdR57djTPw8M0gCbGSpFA+6RbAb9CzwrhVoRFk6OLE07L84TA0X/nQKas/QqcVGWJAq/5W0eZ6DTY37PnMytObpzNqclgt0niblL0T5mRlMA2hCn/hULRPFm3jZ6DnLgo+8mkDhnf7Ag6OqIvv8JUsVoSSyPtFv8enb2YfcGHaZq0tGkJ3Glj9nrdZnUHb9SPPHM4rvqM/1jptyLcyhV2uMl9ghEdDXdhBfT1a63z0f9wI3o0hVJ8o3exmlKJnMjKi20GB31dqJXxCQVlqSQ8FRt+vWAWpfi0knjU+/5uEg+Pj265haaGL5BlUUpvJYpYBqfFWVtkqPwanZj1GRxoANxxnok4kIY+bZAvDYSmVNTOtBnu8BdhwH0SXPhCzf0oT9144awbkjsdPgvWtGHQz9NL+WfjdWFm5QAwm1hjZDdOGKzThs20tZLYHLRDznTmsq9e2MOZMPE5PYs9TYTxSgPw+22uNY8++2xHue8pEF1qRd6UF+qwMJ3oDk4ODg4ODg4ODg4KMAf2G08aqPBKMwAAAAASUVORK5CYII=" },
];

// Estilos dos componentes
const GridContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px;
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative; 
  scroll-snap-type: x mandatory; 
  &::-webkit-scrollbar {
    display: none; 
  }

`;

const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  color: black;
  border: none;
  padding: 11px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: background-color 0.3s ease;
 width: 48px;             
  height: 48px;  
  /* Sombra suave */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Leve fundo sombreado no hover */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); /* Aumenta a sombra no hover */
  }

  &:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Menor sombra quando pressionado */
  }
    @media (max-width: 768px) {
    /* Tornar as setas menores em telas pequenas */
    display: none;
  }

  ${({ direction }) => direction === 'left' ? `
    left: -8px;
  ` : `
    right: 8px;
  `}

 
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: scale(1.04);
  }
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const CategoryName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const NewBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #f39c12;
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
`;



const CategoryGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (gridRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
    <ArrowButton direction="left" onClick={() => handleScroll('left')}>
    &lsaquo;
    </ArrowButton>

    <GridContainer ref={gridRef}>
      {categories.map((category, index) => (
        <CategoryCard key={index}>
          {category.isNew && <NewBadge>Novidade</NewBadge>}
          <CategoryImage src={category.icon} alt={category.name} />
          <CategoryName>{category.name}</CategoryName>
        </CategoryCard>
      ))}
    </GridContainer>

    <ArrowButton direction="right" onClick={() => handleScroll('right')}>
    &rsaquo;
    </ArrowButton>
  </div>
  );
};

export default CategoryGrid;