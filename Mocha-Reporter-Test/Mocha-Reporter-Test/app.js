var Mocha = require('mocha'), fs = require('fs'), path = require('path');
// Instantiate a Mocha instance.
var mocha = new Mocha();
var testDir = 'uuid';
// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function (file) {
    // Only keep the .js files
    return file.substr(-3) === '.js';
}).forEach(function (file) {
    mocha.addFile(path.join(testDir, file));
});
try {
    // Run the tests.
    mocha.run(function (failures) {
        console.log(failures);
    });
}
catch (e) {
    console.log('Erro ao executar os testes', e);
}
//# sourceMappingURL=app.js.map