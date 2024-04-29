angular.module("listaTelefonica").config(function($routeProvider) {
    $routeProvider.when("/contatos", {
        templateUrl: "view/contatos.html",
        controller: "listaTelefonicaCtrl",
        resolve: {
            contatos: function (contatosAPI) {
                return contatosAPI.getContatos();
            },
            operadoras: function (operadorasAPI) {
                return operadorasAPI.getOperadoras();
            }
        }
    });
    $routeProvider.when("/novoContato", {
        templateUrl: "view/novoContato.html",
        controller: "novoContatoCtrl",
        resolve: {
            operadoras: function (operadorasAPI) {
                return operadorasAPI.getOperadoras();
            }
        }
    });
    $routeProvider.when("/detalhesContato/:id", {
        templateUrl: "view/detalhesContato.html",
        controller: "detalhesContatoCtrl",
        resolve: {
            contato: function (contatosAPI, $route) {
                //Deveria ser feito uma requisicao utilizando getContato() e pegando apenas o contato
                //com id especifico no backend, mas essa eh uma adaptacao fazendo a requisicao inteira
                return contatosAPI.getContatos().then(function(contato) {
                    return contato.data[$route.current.params.id-1];
                })
            }
        }
    });
    $routeProvider.when("/error", {
        templateUrl: "view/error.html",
    });
    $routeProvider.otherwise({redirectTo: "/contatos"})
});