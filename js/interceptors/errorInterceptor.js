angular.module("listaTelefonica").factory("errorInterceptor", function ($q) {
    //depende da requisicao de contato individual para fazer sentido, mas ela nao foi implementada
    return {
        responseError: function (rejection) {
            if(rejection.status === 404) {
                $location.path("/error");
            }
            return $q.reject(rejection);
        }
    }
})