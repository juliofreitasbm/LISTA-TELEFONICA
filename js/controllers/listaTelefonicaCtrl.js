angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator) {
    $scope.app = "Lista Telefônica";
    // $scope.contatos = [
    //     {nome: "Dennis", telefone: "99998888", operadora: {nome: "Oi", codigo: 14}, data: new Date()},
    //     {nome: "Danilo", telefone: "88887777", operadora: {nome: "Vivo", codigo: 15}, data: new Date()},
    //     {nome: "Jorge", telefone: "77776666", operadora: {nome: "Tim", codigo: 41}, data: new Date()}
    // ];
    $scope.contatos = [];
    $scope.operadoras = [];
    $scope.error = "";

    var carregarContatos = function() {
        contatosAPI.getContatos().then(function (request, status){
            $scope.contatos = request.data;
            // console.log(request.data);
        }).catch(function(error) {
            console.log("DEU RUIM no GET contatos");
            console.log(error);
            $scope.error = "Não foi possível carregar os dados!";
        });
    }
    // $scope.operadoras = [
    //     {nome: "Oi", codigo: 14, categoria:"Celular", preco: 2},
    //     {nome: "Vivo", codigo: 15, categoria:"Celular", preco: 1},
    //     {nome: "Tim", codigo: 41, categoria:"Celular", preco: 3},
    //     {nome: "GVT", codigo: 25, categoria:"Fixo", preco: 1},
    //     {nome: "Embratel", codigo: 21, categoria:"Fixo", preco: 2}
    // ];
    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().then(function (request, status){
            $scope.operadoras = request.data;
            // console.log(request.data);
        }).catch(function(error) {
            console.log("DEU RUIM no GET operadoras");
            console.log(error);
        });
    }

    // $scope.adicionarContato = function (contato) {
    //     $scope.contatos.push(angular.copy(contato));
    //     delete $scope.contato;
    //     $scope.contatoForm.$setPristine();
    // };
    $scope.adicionarContato = function (contato) {
        contato.data = new Date();
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

    carregarContatos();
    carregarOperadoras();
});