var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');


http.createServer((req, res) => {
  //console.log(req.method + " " + req.url);

  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  
  var q = url.parse(req.url, true);
  
  var urlGiven = q.pathname.split("/");
  var cityNum = urlGiven[urlGiven.length - 1];
  var flag = false
  if(cityNum[1] > 0){
      flag = true
  }

  if(q.pathname == "/"){

    //Lista alfabeticamente ordenada de cidades
    axios.get("http://localhost:3000/cidades")
      .then( (resp) => {
        let cidades = resp.data
        
        res.write("<h1>Lista de Cidades: </h1><ul>")
        for (i in cidades){
          res.write("<li><a href='"+ "http://localhost:3001/" + cidades[i].id + "'>" + cidades[i].nome + "</a></li>")
        }
        res.write("</ul>")
        res.end();

      })
      .catch(error => {
        console.log('error')
      })
  } else if (flag) {
        //console.log(cityNum)
        var fileName = "./Cidades/" + cityNum + ".html"
        fs.readFile(fileName, (err, file) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("ERRO: Página não encontrada");
                return res.end();
            }
            res.write(file);
            res.end();
        });      

  }
  else {
    res.write("ERRO: Página não encontrada")
    res.end();
  }
}).listen(3001);

console.log('Check it out at: http://localhost:3001/');

