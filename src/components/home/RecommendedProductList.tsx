import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

// Interface para definir a estrutura dos produtos
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string;
}

export default function RecommendedProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // Fetch dos produtos na inicialização do componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para exibir o modal com a descrição do produto
  const handleShowModal = (description: string) => {
    setModalContent(description);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalContent(null);
  };

  return (
    <Container>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.images} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <p>{product.description.slice(0, 50)}...</p>
            <ProductPrice>R$ {Number(product.price).toFixed(2)}</ProductPrice>
            <ShowMoreButton onClick={() => handleShowModal(product.description)}>
              Ver Mais
            </ShowMoreButton>
          </ProductCard>
        ))}
      </ProductGrid>
      {modalContent && (
        <ModalOverlay>
          <ModalContent>
            <p>{modalContent}</p>
            <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

// Styled-components para estilização
const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: #fff;
  border-radius: 10px;
  
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled.div`
 border: 1px solid #ddd;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 350px; 

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1rem;
  
`;

const ProductPrice = styled.strong`
  color: #2d87f0;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  display: block;
`;

const ShowMoreButton = styled.button`
  background-color: #2d87f0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a5ca8;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #c12e2a;
  }
`;
