import {  useEffect, useState } from "react";

import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <img src={product.images} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>R$ {Number(product.price).toFixed(2)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;