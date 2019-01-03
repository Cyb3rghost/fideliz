<?php

include 'connections.php';

header('Access-Control-Allow-Origin: *');

$result = mysqli_query($connect, "SELECT * FROM `users`");
if(mysqli_num_rows($result)){

    while($row[] = mysqli_fetch_assoc($result))
    {

        $json = json_encode($row);

    }

}else{

    echo 'Résultat non trouvé';

}

echo $json;

mysqli_close($connect);
?>