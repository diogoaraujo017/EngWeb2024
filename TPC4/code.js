var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


// Server creation
var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)


    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 

            // GET requests for composers
                if (req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.mainPage(d))
                    res.end()
                }

                // GET /compositores --------------------------------------------------------------------
                else if (req.url == "/compositores"){
                    axios.get("http://localhost:3000/compositores")
                        .then(resp => {
                            compositores = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composerListPage(compositores, d))
                            res.end()
                        })
                        .catch( erro =>{
                            res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get composer list... " + erro + "</p>")
                            res.write("<p><a href='/'> [Return] </a></p>")
                            res.end()
                        })
                }

                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]+$/i.test(req.url)){
                    var idComposer = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/" + idComposer)
                        .then(resp => {
                            composer = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composerPage(composer, d))
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get composer info... " + idComposer + "... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })
                }

                // GET /compositor/registo --------------------------------------------------------------------
                else if (req.url == "/compositores/registo"){
                    axios.get("http://localhost:3000/periodos")
                        .then(resp => {
                            periods = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composerFormPage(periods,d))
                            res.end()  
                        })
                        .catch( erro => {
                            res.writeHead(512, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get period list... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })  
                }        

                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    var idComposer = req.url.split("/")[3]

                    axios.get("http://localhost:3000/periodos")
                        .then(resp => {
                            periods = resp.data
                        })
                        .catch( erro => {
                            res.writeHead(512, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get period list... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })

                    axios.get("http://localhost:3000/compositores/" + idComposer)
                        .then(resp => {
                            composer = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composerFormEditPage(composer, periods, d))
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get composer info... " + idComposer + "... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })
                }
                
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    var idComposer = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/compositores/" + idComposer)
                        .then(resp => {
                            res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Composer " + idComposer + " deleted with sucess!</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(511, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not find the composer " + idComposer + "... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        })
                }
            
            // GET requests for periods
                // GET /periodos -------------------------------------------------------------------- Done 
                else if (req.url == "/periodos"){
                    axios.get("http://localhost:3000/periodos")
                    .then(resp => {
                        periodos = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodListPage(periodos, d))
                        res.end()
                    })
                    .catch( erro =>{
                        res.writeHead(515, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Could not get period list... " + erro + "</p>")
                        res.write("<p><a href='/'> [Return] </a></p>")
                        res.end()
                    })
                }

                // GET /periodos/registo -------------------------------------------------------------------- Done
                else if (req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.periodFormPage(d))
                    res.end()
                }

                // GET /periodos/:id -------------------------------------------------------------------- Done
                else if (/\/periodos\/P[0-9]+$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[2]
                    axios.get("http://localhost:3000/periodos/" + idPeriodo)
                        .then(resp => {
                            period = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodPage(period, d))
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(516, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get period info... " + idPeriodo + "... " + erro + "</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        })
                }

                // GET /periodos/edit/:id -------------------------------------------------------------------- Done
                else if (/\/periodos\/edit\/P[0-9]+$/i.test(req.url)){
                    var idPeriodo = req.url.split("/")[3]
                    axios.get("http://localhost:3000/periodos/" + idPeriodo)
                        .then(resp => {
                            periodo = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodFormEditPage(periodo, d))
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(522, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get period info... " + idPeriodo + "... " + erro + "</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        })
                }

                // GET /periodos/delete/:id -------------------------------------------------------------------- Done
                else if (/\/periodos\/delete\/P[0-9]+$/i.test(req.url)){
                    var idPeriod = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/periodos/" + idPeriod)
                        .then(resp => {
                            res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Period " + idPeriod + " deleted with sucess!</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        })
                        .catch( erro => {
                            res.writeHead(521, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not find the period " + idPeriod + "... " + erro + "</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        })
                }

            // GET ? -> Lancar um erro
                else {
                    res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p> GET not supported: " + req.method + "</p>")
                    res.write("<p><a href='/'> [Back] </a></p>")
                    res.end()
                }

                break
            case "POST":
              // COMPOSER POST REQUESTS  
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/compositores/", result)
                                .then(resp => {
                                    res.writeHead(201, {'Location': '/compositores/' + result.id})
                                    res.write("<p>Registo inserido! </p>")
                                    res.write("<p><a href='/compositores'> [Return] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(510, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.erroPage("Could not register composer!", d))
                                    res.write("<p><a href='/compositores'> [Return] </a></p>")
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(509, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get body... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        }
                        
                    })
                }

                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p>Compositor edited with success.</p>")
                                    res.write("<p><a href='/compositores'> [Return] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.erroPage("Could not edit composer!", d))
                                    res.write("<p><a href='/compositores'> [Return] </a></p>")
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get body... " + erro + "</p>")
                            res.write("<p><a href='/compositores'> [Return] </a></p>")
                            res.end()
                        }
                        
                    }
                )}

              // PERIOD POST REQUESTS
                // POST /periodos/registo --------------------------------------------------------------------
                else if (req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/periodos/", result)
                                .then(resp => {
                                    res.writeHead(201, {'Location': '/periodos/' + result.id})
                                    res.write("<p>Periodo inserido! </p>")
                                    res.write("<p><a href='/periodos'> [Return] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(519, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.erroPage("Could not register period!", d))
                                    res.write("<p><a href='/periodos'> [Return] </a></p>")
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get body... " + erro + "</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        }
                        
                    })
                }

                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/periodos/' + result.id})
                                    res.write("<p>Period edited with success.</p>")
                                    res.write("<p><a href='/periodos'> [Return] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(517, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.erroPage("Could not edit period!", d))
                                    res.write("<p><a href='/periodos'> [Return] </a></p>")
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(518, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Could not get body... " + erro + "</p>")
                            res.write("<p><a href='/periodos'> [Return] </a></p>")
                            res.end()
                        }
                        
                    }
                )}
                
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p> POST request not suported: " + req.method + "</p>")
                    res.write("<p><a href='/'> [Back] </a></p>")
                    res.end()
                }

                break
            
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p> Método não suportado: " + req.method + "</p>")
                res.write("<p><a href='/'> [Back] </a></p>")
                res.end()
                break
        }
    }
})

compositoresServer.listen(3001, ()=>{
    console.log("Servidor à escuta na porta 3001...")
    console.log("Pagina inicial: http://localhost:3001/")
    console.log("Lista de Compositores: http://localhost:3001/compositores")
    console.log("Lista de Periodos: http://localhost:3001/periodos")
})



