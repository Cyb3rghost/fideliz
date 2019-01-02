<?php

include 'connections.php';

header('Access-Control-Allow-Origin: *');

$id = $_GET['id'];
$nom = $_GET['nom'];
$email = $_GET['email'];

$sql = "UPDATE `users` SET `nom` = '".$nom."', `email` = '".$email."' WHERE `id` = $id";

if(mysqli_query($connect, $sql)){

    echo json_encode("Mise à jour réussi avec succes");

}else{
    echo json_encode("Mise à jour échouée !");
};

mysqli_close($connect);


?>