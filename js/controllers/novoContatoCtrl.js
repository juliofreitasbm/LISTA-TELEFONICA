angular.module("listaTelefonica").controller("novoContatoCtrl", function($scope, contatosAPI, serialGenerator, $location, operadoras) {
    $scope.operadoras = operadoras.data;

    
    $scope.adicionarContato = function (contato) {
        // contato.data = new Date();
        contato.serial = serialGenerator.generate();
        contatosAPI.saveContato(contato).then(function(data) { 
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos")
        }).catch(function(error) {
            console.log("DEU RUIM no POST Contatos");
            console.log(error);
        });
    };

});