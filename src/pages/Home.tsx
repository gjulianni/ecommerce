import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number | null; 
  images: string[];
  is_active: boolean;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: null,
    images: [],
    is_active: true,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products/categories")
      .then((response) => {
        setCategories(response.data); // Armazena as categorias na variável de estado
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setProduct((prev) => ({
      ...prev,
      images: value ? [value] : [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products/addproduct",
        product,
        {
          withCredentials: true,
        }
      );
      alert("Produto cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao cadastrar o produto.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nome do produto"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descrição do produto"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Preço"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Estoque"
        />
        <select
          name="category_id" 
          value={product.category_id || ""}
          onChange={handleChange} 
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Campo de URL das imagens */}
        <input
          type="text"
          name="images"
          value={product.images[0] || ""}
          onChange={handleImageChange}
          placeholder="URL da imagem"
        />
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default AddProduct;
