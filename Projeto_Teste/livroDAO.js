const { Pool } = require('pg');
const Livro = require('./livro');

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'n2_Web',
    password: '123',
    port: 5432,
});

class LivroDAO{

    //busca todos os livros
    async getLivros(){
        const res = await pool.query('SELECT * FROM livros');
        return res.rows.map(row=>new Livro(row.id, row.autor, row.idioma, row.titulo, row.sinopse, row.capitulos_disponiveis));
    }

    //busca por id
    //async getLivro(id){
       // const res = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
       // return new Livro(row.id, row.autor, row.idioma, row.titulo, row.sinopse, row.capitulos_disponiveis);
       // }

       async getLivro(id) {
    const res = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    const row = res.rows[0]; // Obter a primeira linha da resposta
    return new Livro(row.id, row.autor, row.idioma, row.titulo, row.sinopse, row.capitulos_disponiveis);
}
    
    //Insert
    async insertLivro(autor, idioma, titulo, sinopse, capitulos_disponiveis){
        const res = await pool.query('INSERT INTO livros (autor, idioma, titulo, sinopse, capitulos_disponiveis) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [autor, idioma, titulo, sinopse, capitulos_disponiveis]);
        const row = res.rows[0];
        return new Livro(row.id, row.autor, row.idioma, row.titulo, row.sinopse, row.capitulos_disponiveis);
    }

    //Update
    async updateLivro(id, autor, idioma, titulo, sinopse, capitulos_disponiveis){
        const res = await pool.query('UPDATE livros SET autor = $2, idioma = $3, titulo = $1, sinopse = $4, capitulos_disponiveis = $5 WHERE id = $6 RETURNING *', 
        [autor, idioma, titulo, sinopse, capitulos_disponiveis, id]);
        const row = res.rows[0];
        return new Livro(row.id, row.autor, row.idioma, row.titulo, row.sinopse, row.capitulos_disponiveis);
    }

    //Delete
    async deleteLivro(id){
        await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    }
}

module.exports = new LivroDAO();





