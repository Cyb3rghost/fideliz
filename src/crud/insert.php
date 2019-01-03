<?php 

    include 'connections.php';

    header('Access-Control-Allow-Origin: *');

    $named = $_GET['name'];
    $emailed = $_GET['email'];
    $sql = "INSERT INTO `users` (`id`, `nom`, `email`) VALUES (NULL, '$named', '$emailed')";
    if(mysqli_query($connect, $sql)){

        echo json_encode("Insertion avec succes");

    }else{
        echo json_encode("Insertion échouée !");
    };

    mysqli_close($connect);


?>