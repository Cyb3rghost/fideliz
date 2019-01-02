<?php

include 'connections.php';

header('Access-Control-Allow-Origin: *');

$id = $_GET['id'];

$sql = "DELETE FROM `users` WHERE `id` = $id";

if(mysqli_query($connect, $sql)){

    echo json_encode("Suppression réussi avec succes");

}else{
    echo json_encode("Suppression échouée !");
};

mysqli_close($connect);


?>