<?php

include 'connections.php';

header('Access-Control-Allow-Origin: *');
$id = $_GET['id'];

$result = mysqli_query($connect, "SELECT * FROM `users` WHERE `id` = $id");
if($row = mysqli_num_rows($result)){

    $json = json_decode($row);

}else{

    $json = json_decode($row);

}

echo $json;

mysqli_close($connect);

?>