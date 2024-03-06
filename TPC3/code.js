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
        res.writeHead(200,{ "Content-Type": "text/html; charset=utf-8" });
        res.write('<h2>Menu do Cinema</h2>');
        res.write("<ul>");
        res.write('<li><a href="http://localhost:3001/filmes">Indice de Filmes</a></li>');
        res.write('<li><a href="http://localhost:3001/atores">Indice de Atores</a></li>');
        res.write('<li><a href="http://localhost:3001/generos">Indice de Generos</a></li>');
        res.write("</ul>");
        res.end();
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
                                    + "<a href='http://localhost:3001/atores/" + cast[i].replace(/\s+/g, '_') + "'>"
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
                                            + "<a href='http://localhost:3001/generos/" + genres[i].replace(/\s+/g, '_') + "'>"
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
                res.write('<h1>'+filme[0].title+'</h1>');

                if (filme[0].year){
                    res.write('<p><b>Ano:</b> ' + filme[0].year + '</p>');
                } else {
                    res.write('<p><b>Ano:</b> Nao especificado.</p>');
                }
                
                if (filme[0].cast.length === 0){
                    res.write('<p><b>Atores:</b> Nao especificado.</p>');
                }
                else {
                    res.write('<p><b>Atores:</b> ' + filme[0].cast + '</p>');
                }

                if (filme[0].genres.length === 0){
                    res.write('<p><b>Generos:</b> Nao especificado.</p>');
                }
                else {
                    res.write('<p><b>Generos:</b> ' + filme[0].genres + '</p>');   
                }
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
        actor = actor.replace(/_/g, ' ');
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
        genre = genre.replace(/_/g, ' ');
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