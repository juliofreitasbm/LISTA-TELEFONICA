<?php

class Operadora {
	public $nome;
	public $codigo;
}

$minhaOperadora = new Operadora();
$minhaOperadora->nome="Oi";
$minhaOperadora->codigo="14";

// $array_contatos[] = array('nome' => 'Dennis', 'telefone' => '99998888', 'operadora' => $minhaOperadora, 'data' => time());
// $array_contatos[] = array('nome' => 'Danilo', 'telefone' => '88887777', 'operadora' => $minhaOperadora, 'data' => time());
// $array_contatos[] = array('nome' => 'Jorge', 'telefone' => '77776666', 'operadora' => $minhaOperadora, 'data' => time());

$arquivo = fopen('teste.txt','r');

    // Aqui você está definindo que a variável é um 'array()'
    $result = array();
    // Você agora irá verificar se existe o arquivo e se o código acim o leu (true|false)
    while(!feof($arquivo)){
        // Aqui foi onde você errou, pois seria '$result[]' e não '$result'
		$array_contatos = unserialize(fgets($arquivo));
    }
    // Fechando a leitura do arquivo
    fclose($arquivo);

echo json_encode($array_contatos);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

date_default_timezone_set('America/Sao_Paulo');

$post = file_get_contents("php://input");
$contato = json_decode($post);


if(!empty($post)){
	$contato = get_object_vars($contato);
	$contato['operadora'] = get_object_vars($contato['operadora']);
	
	$arquivo = fopen('teste.txt','r');

    // Aqui você está definindo que a variável é um 'array()'
    $result = array();
    // Você agora irá verificar se existe o arquivo e se o código acim o leu (true|false)
    while(!feof($arquivo)){
        // Aqui foi onde você errou, pois seria '$result[]' e não '$result'
		$array_contatos = unserialize(fgets($arquivo));
    }
    // Fechando a leitura do arquivo
    fclose($arquivo);


	$contato['id'] = $array_contatos ? count($array_contatos)+1 : 1;
	$array_contatos[] = $contato;
	
	$_SESSION['api_contatos'] = serialize($array_contatos);

	$arquivo = fopen('teste.txt','w');
	//Escreve no arquivo aberto.
	$texto = serialize($array_contatos);
	fwrite($arquivo, $texto);    
	//Fecha o arquivo.
	fclose($arquivo);
	// setcookie('api_contatos', serialize($array_contatos));
}

if(isset($_SESSION['api_contatos'])){

	$arquivo = fopen('teste.txt','r');

    // Aqui você está definindo que a variável é um 'array()'
    $result = array();
    // Você agora irá verificar se existe o arquivo e se o código acim o leu (true|false)
    while(!feof($arquivo)){
        // Aqui foi onde você errou, pois seria '$result[]' e não '$result'
		$array_contatos = unserialize(fgets($arquivo));
    }
    // Fechando a leitura do arquivo
    fclose($arquivo);
	

	// $array_contatos = unserialize($_SESSION['api_contatos']);

	if(isset($_GET['id'])){
		$indice = $_GET['id']-1;
		$contato = isset($array_contatos[$indice]) ? $array_contatos[$indice] : 'Esse contato não existe';
		echo json_encode($contato);
	}else{		
		echo json_encode($array_contatos);
	}
}
