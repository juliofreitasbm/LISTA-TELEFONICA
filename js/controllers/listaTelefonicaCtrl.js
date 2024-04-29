angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatos, serialGenerator, operadoras) {
    $scope.app = "Lista Telefônica";
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var generateSerial = function() {
        contatos.data.forEach(function(item) {
            item.serial = serialGenerator.generate();
        });
    };

    // $scope.adicionarContato = function (contato) {
    //     $scope.contatos.push(angular.copy(contato));
    //     delete $scope.contato;
    //     $scope.contatoForm.$setPristine();
    // };
    $scope.adicionarContato = function (contato) {
        // contato.data = new Date();
        contato.serial = serialGenerator.generate();
        contatosAPI.saveContato(contato).then(function(data) { 
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).catch(function(error) {
            console.log("DEU RUIM no POST Contatos");
            console.log(error);
        });
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if(!contato.selecionado) return contato;
        });
    }
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    }
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    // generateSerial($scope.contatos);

});