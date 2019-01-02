<?php 

    include 'connections.php';

<<<<<<< HEAD
=======
    header('Access-Control-Allow-Origin: *');

>>>>>>> Creation api / fonctionnement inscription et connexion
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