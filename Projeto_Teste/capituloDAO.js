const { Pool } = require('pg');
const Capitulo = require('./capitulos');

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'n2_Web',
    password: '123',
    port: 5432,
});

class CapituloDAO{

    //busca todos os cap
    async getCapitulos(){
        const res = await pool.query('SELECT * FROM capitulos');
        const objetos = res.rows.map(row=>new Capitulo(row.id, row.titulo, row.qtd_paginas));
        console.log(objetos);
        return objetos;
    }

    //busca por id
    async getCapitulo(id){
        const res = await pool.query('SELECT * FROM capitulos WHERE id = $1', [id]);
        const row = res.rows[0];
        return new Capitulo(row.id, row.titulo, row.qtd_paginas);
        }
    
    //Insert
    async insertCapitulo(titulo, qtd_paginas){
        const res = await pool.query('INSERT INTO capitulos (titulo, qtd_paginas) VALUES ($1, $2) RETURNING *', [titulo, qtd_paginas]);
        const row = res.rows[0];
        return new Capitulo(row.id, row.titulo, row.qtd_paginas);
    }

    //Update
    async updateCapitulo(id, titulo, qtd_paginas){
        const res = await pool.query('UPDATE capitulos SET titulo = $1, qtd_paginas = $2 WHERE id = $3 RETURNING *', [titulo, qtd_paginas, id]);
        const row = res.rows[0];
        return new Capitulo(row.id, row.titulo, row.qtd_paginas);
    }

    //Delete
    async deleteCapitulo(id){
        await pool.query('DELETE FROM capitulos WHERE id = $1', [id]);
    }
}

module.exports = new CapituloDAO();


