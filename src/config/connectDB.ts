import pg from 'pg';
const { Client } = pg;
const { Pool } = pg;
import chalk from "chalk";

// Função para verificar se o banco de dados existe e criá-lo, se necessário
const ensureDatabaseExists = async (databaseName: string) => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "123",
    database: "postgres", // Conecta ao banco 'postgres' por padrão para checar a existência de outros bancos
  });

  try {
    await client.connect();
    
    // Verifica se o banco de dados existe
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [databaseName]
    );

    if (result.rowCount === 0) {
      // Se o banco não existe, cria-o
      console.log(chalk.blue(`Banco de dados "${databaseName}" não encontrado. Criando banco...`));
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(chalk.green(`Banco de dados "${databaseName}" criado com sucesso.`));
    } else {
      console.log(chalk.yellow(`Banco de dados "${databaseName}" já existe. Continuando...`));
    }
  } catch (error) {
    console.error(chalk.red("Erro ao verificar/criar banco de dados:"), error);
    throw error;
  } finally {
    await client.end();
  }
};

// Configuração de conexão do pool com o banco de dados
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "123",
  options: "-c search_path=edstore",
});

// Função para verificar a existência do schema
const schemaExists = async (schemaName: string) => {
  try {
    const result = await pool.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.schemata
        WHERE schema_name = $1
      ) AS schema_exists;
    `,
      [schemaName]
    );

    return result.rows[0].schema_exists;
  } catch (error) {
    console.error(chalk.red("Erro ao verificar existência do schema:"), error);
    throw error;
  }
};

// Função para criar o schema e as tabelas
const createSchemaAndTables = async () => {
  try {
    const schemaName = "edstore";

    // Verifica se o schema existe
    const schemaAlreadyExists = await schemaExists(schemaName);

    if (schemaAlreadyExists) {
      console.log(chalk.yellow(`Schema "${schemaName}" já existe. Pulando criação.`));
      return;
    }

   

    // Cria o schema e as tabelas caso não existam
    await pool.query(`
    DO
    $$
    BEGIN

    CREATE SCHEMA IF NOT EXISTS ${schemaName};
    SET search_path TO ${schemaName};

CREATE TABLE IF NOT EXISTS user_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- Exemplo: 'customer', 'admin', etc.
);

-- Inserir os tipos de usuário
INSERT INTO user_types (name) VALUES 
('customer'),
('admin');

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    address JSONB,
    user_type_id INT REFERENCES user_types(id), -- Relacionamento com a tabela de tipos de usuário
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


UPDATE users
SET user_type_id = (SELECT id FROM user_types WHERE name = 'customer')
WHERE user_type_id IS NULL;

-- Criação da tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id INT REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, description)
VALUES 
    ('Eletrônicos', 'Gadgets e dispositivos eletrônicos'),
    ('Roupas', 'Vestimentas, moda e acessórios'),
    ('Calçados', 'Sapatos, tênis e outros tipos de calçados'),
    ('Beleza', 'Produtos de cuidados pessoais e cosméticos'),
    ('Móveis', 'Móveis para casa e escritório'),
    ('Eletrodomésticos', 'Aparelhos eletrônicos e utensílios domésticos'),
    ('Informática', 'Computadores, periféricos e acessórios'),
    ('Esportes', 'Equipamentos e roupas para prática de esportes'),
    ('Brinquedos', 'Brinquedos educativos e recreativos para crianças'),
    ('Livros', 'Livros físicos e digitais de diversos gêneros'),
    ('Alimentos e Bebidas', 'Alimentos e bebidas para consumo diário'),
    ('Saúde', 'Produtos de cuidado com a saúde, medicamentos e suplementos'),
    ('Automotivo', 'Peças, acessórios e produtos para automóveis'),
    ('Casa e Decoração', 'Itens de decoração e utensílios para casa'),
    ('Ferramentas', 'Ferramentas para construção e reparos domésticos'),
    ('Pets', 'Produtos para animais de estimação'),
    ('Jardinagem', 'Produtos e acessórios para jardinagem e cultivo'),
    ('Arte e Artesanato', 'Material para artesanato, pintura e decoração'),
    ('Papeleria', 'Artigos de papelaria, escritório e escolar'),
    ('Tecnologia', 'Produtos tecnológicos, gadgets e inovações'),
    ('Cama, Mesa e Banho', 'Roupa de cama, mesa, banho e artigos de cama'),
    ('Fitness', 'Equipamentos e acessórios para treino e bem-estar'),
    ('Ciclismo', 'Bicicletas, acessórios e equipamentos para ciclismo'),
    ('Camping e Lazer', 'Equipamentos e acessórios para atividades ao ar livre'),
    ('Moda Infantil', 'Roupas e acessórios para crianças'),
    ('Instrumentos Musicais', 'Instrumentos e acessórios musicais'),
    ('Fotografia', 'Câmeras, lentes e acessórios de fotografia'),
    ('Gaming', 'Produtos e acessórios para videogames e jogos'),
    ('Acessórios de Moda', 'Bijuterias, relógios, bolsas e outros acessórios');

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    images JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de métodos de pagamento
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- Exemplo: 'credit_card', 'boleto', 'pix', 'paypal'
);

-- Inserir os métodos de pagamento
INSERT INTO payment_methods (name) VALUES 
('credit_card'),
('boleto'),
('pix'),
('paypal');

-- Criação da tabela de pagamentos
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    payment_method_id INT REFERENCES payment_methods(id) NOT NULL, -- Relacionamento com a tabela de métodos de pagamento
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de avaliações
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    END;
    $$;
    `);

    console.log(
      chalk.greenBright(
        `Schema "${schemaName}" and tables created successfully`
      )
    );
  } catch (error) {
    console.error(chalk.red("Error creating schema and tables:"), error);
  }
};

// Function to connect to the database and initialize schema
const connectDB = async () => {
	try {
	  const databaseName = "ecommerce";
  
	  // Garante que o banco de dados existe
	  await ensureDatabaseExists(databaseName);
  
	  // Conecta ao banco de dados
	  await pool.connect();
	  console.log(chalk.greenBright("Conexão com o banco de dados estabelecida com sucesso"));
  
	  // Inicializa o schema e as tabelas
	  await createSchemaAndTables();
	} catch (error) {
	  console.error(
		chalk.red("Erro ao conectar ao banco de dados ou inicializar o schema:"),
		error
	  );
	}
  };
  
  export { connectDB, pool };