var http = require('http');
var fs = require('fs');
var url = require('url');
var axios = require('axios');

http.createServer((req, res) => 
{
    //console.log(req.method + ' ' + req.url);
    
    var q = url.parse(req.url, true);
    
    // Done
    if(q.pathname == "/"){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.write('<h2>Menu do Cinema</h2>');
        res.write('<ul><li><a href="http://localhost:3001/filmes">Indice de Filmes</a></li>');
        res.write('<li><a href="http://localhost:3001/atores">Indice de Atores</a></li>');
        res.write('<li><a href="http://localhost:3001/generos">Indice de Generos</a></li></ul>');
    } 
    // Done
    else if(q.pathname == "/filmes"){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        axios.get('http://localhost:3000/filmes')
            .then(dados => {
                res.write('<h2>Lista de Filmes</h2>');
                res.write('<ul>');

                let filmes = dados.data;
                for (index in filmes) {
                    res.write("<li>" 
                                + "<a href='http://localhost:3001/filmes/" + filmes[index]._id.$oid + "'>"
                                + filmes[index].title 
                                +"</li>");
                }

                res.write('</ul>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            });
    } 
    // Done
    else if(q.pathname == "/atores"){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        axios.get('http://localhost:3000/filmes')
            .then(dados => {
                res.write('<h2>Lista de Atores</h2>');
                res.write('<ul>');

                let foundActors = [];
                let filmes = dados.data;
                for (index in filmes) {
                    let cast = filmes[index].cast;
                    if (cast != null) {
                        for (i in cast) {
                            if (!foundActors.includes(cast[i])) {
                                foundActors.push(cast[i]);
                                res.write("<li>" 
                                    + "<a href='http://localhost:3001/atores/" + cast[i] + "'>"
                                    + cast[i] 
                                    +"</li>");
                            }        
                        }
                    }
                }

                res.write('</ul>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            });
    }
    // Done 
    else if(q.pathname == "/generos"){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        axios.get('http://localhost:3000/filmes')
            .then(dados => {
                res.write('<h2>Lista de Generos:</h2>');
                res.write('<ul>');

                let foundGenres = [];
                let filmes = dados.data;
                for (index in filmes) {
                    let genres = filmes[index].genres;
                    if (genres != null) {
                        for (i in genres) {
                            if (!foundGenres.includes(genres[i])) {
                                foundGenres.push(genres[i]);
                                res.write("<li>" 
                                            + "<a href='http://localhost:3001/generos/" + genres[i] + "'>"
                                            + genres[i] 
                                            + "</li>");
                            }
                        }
                    }
                }

                res.write('</ul>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            });
    
    }
    // Done 
    else if (q.pathname.includes("/filmes/")) {
        var id = q.pathname.split("/")[2];
        axios.get('http://localhost:3000/filmes?_id.$oid=' + id)
            .then(dados => {
                let filme = dados.data;
                res.write('<h1>'+filme.title+'</h1>');
                res.write('<p><b>Ano:</b> ' + filme.year + '</p>');
                res.write('<p><b>Generos:</b> ' + filme.genres + '</p>');
                res.write('<p><b>Actores:</b> ' + filme.cast + '</p>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            });

    } 
    // Done
    else if (q.pathname.includes("/atores/")) {
        var actor = q.pathname.split("/")[2];
        actor = actor.replace("%20", " ");
        axios.get('http://localhost:3000/filmes')
            .then(dados => {
                res.write('<h1>' + actor + '</h1>');
                res.write('<h2>Filmes com o Ator: </h2>');
                res.write('<ul>');

                let filmes = dados.data;
                for (index in filmes) {
                    let cast = filmes[index].cast;
                    if (cast != null) {
                        if (cast.includes(actor)) {
                            res.write("<li>" 
                                        + "<a href='http://localhost:3001/filmes/" + filmes[index]._id.$oid + "'>"
                                        + filmes[index].title 
                                        +"</li>");
                        }
                    }
                }

                res.write('</ul>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            });
    } 
    // Done
    else if (q.pathname.includes("/generos/")) {
        var genre = q.pathname.split("/")[2];
        genre = genre.replace("%20", " ");
        axios.get('http://localhost:3000/filmes')
            .then(dados => {
                res.write('<h1>' + genre + '</h1>');
                res.write('<h2>Filmes do Genero: </h2>');
                res.write('<ul>');

                let filmes = dados.data;
                for (index in filmes) {
                    let genres = filmes[index].genres;
                    if (genres != null) {
                        if (genres.includes(genre)) {
                            res.write("<li>" 
                                        + "<a href='http://localhost:3001/filmes/" + filmes[index]._id.$oid + "'>"
                                        + filmes[index].title 
                                        +"</li>");
                        }
                    }
                }

                res.write('</ul>');
                res.end();
            })
            .catch(error => {
                res.write('Erro: ' + error);
                res.end();
            }); 
    }
    // Done 
    else {
        res.write('Erro: ' + q.pathname + ' não está implementado')
        res.end();
    }

}).listen(3001);    

console.log('Server running at http://localhost:3001/');
console.log('Pagina Filmes: http://localhost:3001/filmes');
console.log('Pagina Atores: http://localhost:3001/atores');
console.log('Pagina Generos: http://localhost:3001/generos');