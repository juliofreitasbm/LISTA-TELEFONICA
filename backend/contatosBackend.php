<?php

class Operadora {
	public $nome;
	public $codigo;
}

$minhaOperadora = new Operadora();
$minhaOperadora->nome="Oi";
$minhaOperadora->codigo="14";

$contatos[] = array('nome' => 'Dennis', 'telefone' => '99998888', 'operadora' => $minhaOperadora, 'data' => time());
$contatos[] = array('nome' => 'Vivo', 'telefone' => '88887777', 'operadora' => $minhaOperadora, 'data' => time());
$contatos[] = array('nome' => 'Tim', 'telefone' => '77776666', 'operadora' => $minhaOperadora, 'data' => time());

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

echo json_encode($contatos);

date_default_timezone_set('America/Sao_Paulo');

$post = file_get_contents("php://input");
$contato = json_decode($post);


if(!empty($post)){
	$contato = get_object_vars($contato);
	$contato['operadora'] = get_object_vars($contato['operadora']);
	$array_contatos = unserialize($_COOKIE['api_contatos']);
	$contato['id'] = count($array_contatos)+1;
	$array_contatos[] = $contato;
	setcookie('api_contatos', serialize($array_contatos));
}

if(isset($_COOKIE['api_contatos'])){

	$array_contatos = unserialize($_COOKIE['api_contatos']);

	if(isset($_GET['id'])){
		$indice = $_GET['id']-1;
		$contato = isset($array_contatos[$indice]) ? $array_contatos[$indice] : 'Esse contato não existe';
		echo json_encode($contato);
	}else{		
	  echo json_encode($array_contatos);
	}
}
