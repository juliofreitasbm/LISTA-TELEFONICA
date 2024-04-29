angular.module("listaTelefonica").factory("contatosAPI", function ($http, config) {
    var _getContatos = function () {
        return $http.get(config.baseURL + "/contatosBackend.php");
    };
    //Funcao nao utilizada de fato. Deveria trazer apenas um contato do backend, mas esta trazendo o array inteiro
    var _getContato = function (id) {
        return $http.get(config.baseURL + "/contatosBackend.php");
    };
    var _saveContato = function (contato) {
        return $http.post(config.baseURL + "/contatosBackend.php", contato);
    };

    return {
        getContatos: _getContatos,
        getContato: _getContato,
        saveContato: _saveContato
    };
});