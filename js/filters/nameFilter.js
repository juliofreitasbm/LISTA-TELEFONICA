angular.module("listaTelefonica").filter("name", function() {
    return function (input) {
        var listaDeNomes = input.split(" ");
        var listaDeNomesFormatada = listaDeNomes.map(function (nome) {
            if(/^(da|de|do|)$/.test(nome.toLowerCase())) return nome.toLowerCase();
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });

        return listaDeNomesFormatada.join(" ");
    };
});