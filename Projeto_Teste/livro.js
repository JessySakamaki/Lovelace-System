class livros {
    constructor(id, autor, idioma, titulo, sinopse, capitulos_disponiveis) 
    {
        this.id = id;
        this.autor = autor;
        this.idioma = idioma;
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.capitulos_disponiveis = capitulos_disponiveis;
    }
}

module.exports = livros;