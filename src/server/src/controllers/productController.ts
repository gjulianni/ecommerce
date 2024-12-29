import { Request, Response } from 'express';
import { addProductToDatabase } from '../models/productModel';
import { pool } from '../../../config/connectDB'

// Função de cadastro de produto
export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category_id, images, is_active } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios' });
  }

  const product = {
    name,
    description,
    price,
    stock,
    category_id: category_id || null,
    images: images || [],
    is_active: is_active !== undefined ? is_active : true,
  };

  try {
    const productId = await addProductToDatabase(product);
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: productId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar o produto' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT id, name FROM categories');
      res.json(result.rows); // Retorna as categorias no formato { id, name }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
  };

  export const getProducts = async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT id, name, description, price, images FROM products ORDER BY RANDOM() LIMIT 4');
     
      res.json(result.rows); 
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  };

  export const searchProduct = async (req: Request, res: Response) => {
    
    let {searchString} = req.params;

    if(!searchString) {
      return res.status(404).json({ message: "Por favor, insira um termo válido para consultar produtos." })
    }
    
    try {
      const result = await pool.query(`SELECT * from products WHERE name ILIKE $1`,
        [`%${searchString}%`]
      );
      if(result && result.rowCount && result.rowCount > 0) {
        res.status(200).json(result.rows)
      } else {
        res.status(500).json({ message: 'Não há produtos no banco de dados com este nome.' })
      } 
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ message: 'Erro ao buscar produtos:', error });
    }
  };