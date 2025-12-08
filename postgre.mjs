import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",       
  host: "localhost",      
  database: "employees", 
  password: "Cognine@again",
  port: 5432              
});

export const query = (text, params) => pool.query(text, params);
