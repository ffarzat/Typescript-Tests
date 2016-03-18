///<reference path='Scripts/typings/npm/npm.d.ts'/>
var npm = require('npm');
var fs = require('fs');
var diretorioBiblioteca = 'C:\\Users\\Fabio\\Downloads\\Jade-Novo-Test';
var arquivoConfiguracao = '\\package.json';
var json = JSON.parse(fs.readFileSync(diretorioBiblioteca + arquivoConfiguracao, 'utf8'));
var version = json.version;
console.log("Otimizando a library: ", json.name);
console.log("   Versão: ", json.version);
console.log("   Arquivo raiz: ", json.main);
process.chdir(diretorioBiblioteca);
console.log("   Executando o Install");
npm.load({ loglevel: "silent" }, function (err) {
    // handle errors
    // install module ffi
    npm.commands.install([], function (er, data) {
        if (er) {
            console.log('       Falha geral na instalação da ', json.name);
            console.log(er);
        }
        //console.log(data);
        console.log('       Sucesso no Install.');
        console.log("   Executando os testes");
        npm.commands.test([], function (er, data) {
            if (er) {
                console.log('       Falha na execução dos testes');
                console.log(er);
            }
            //console.log(data);
            console.log('       Sucesso nos Testes.');
            console.log("   Encerrando...");
        });
    });
    npm.on('log', function (message) {
        // log installation progress
        console.log(message);
    });
});
//# sourceMappingURL=app.js.map