import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: '123',
  port: 5432,
});

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  user_type_id: number;
}

// Função para registrar um novo usuário
export const registerUser = async (name: string, email: string, passwordHash: string): Promise<User> => {
    // Obter o ID do tipo de usuário 'customer'
    const result = await pool.query(
      'SELECT id FROM edstore.user_types WHERE name = $1', ['customer']
    );
    
    const userTypeId = result.rows[0]?.id; // Obter o ID do tipo 'customer'
    
    if (!userTypeId) {
      throw new Error('Tipo de usuário "customer" não encontrado');
    }
  
    // Inserir o novo usuário, incluindo o user_type_id
    const insertResult = await pool.query(
      'INSERT INTO edstore.users (name, email, password_hash, user_type_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_type_id',
      [name, email, passwordHash, userTypeId]
    );
    
    return insertResult.rows[0]; // Retornar o usuário registrado
  };
  
  // Função para encontrar um usuário por email
  export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM edstore.users WHERE email = $1', [email]);
    return result.rows[0] || null;
  };