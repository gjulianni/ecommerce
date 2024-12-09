import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'ecommerce',
  password: '123',
  port: 5432,
});

// Função para adicionar produto no banco
export const addProductToDatabase = async (product: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number | null;
  images: string[];
  is_active: boolean;
}) => {
  const query = `
    INSERT INTO edstore.products (name, description, price, stock, category_id, images, is_active, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING id;
  `;
  const values = [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.category_id,
    JSON.stringify(product.images),
    product.is_active,
  ];

  try {
    const res = await pool.query(query, values);
    return res.rows[0].id; 
  } catch (err) {
    console.error('Erro ao inserir produto:', err);
    throw err;
  }
};