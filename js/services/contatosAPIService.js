angular.module("listaTelefonica").factory("contatosAPI", function ($http, config) {
    var _getContatos = function () {
        return $http.get(config.baseURL + "/contatosBackend.php");
    };
    var _saveContato = function (contato) {
        return $http.post(config.baseURL + "/contatosBackend.php", contato);
    };

    return {
        getContatos: _getContatos,
        saveContato: _saveContato
    };
});