<?php


include('connections.php');

header('Access-Control-Allow-Origin: *');

if(isset($_GET['action']))
{

    $action = $_GET['action'];

    switch ($action) {
        case 'inscription':
            # code...
            $nomEntreprise = $_GET['nEntreprise'];
            $emailEnt = $_GET['mailEntreprise'];
            $password = $_GET['password'];
            $protectmdp = md5("secureINS".$password."INSecure");
            $apikey = md5("secureAPI".rand(0, 99999)."APISecure");

            $sql = "SELECT * FROM `accsociete` WHERE `nomsociete` = '".$nomEntreprise."' OR `email` = '".$emailEnt."'";
            $result = mysqli_query($connect, $sql);
            if($row = mysqli_num_rows($result))
            {

                $json = json_decode($row);

            }
            else
            {
                $json = json_decode($row);
            }
            
            if($json === 1)
            {

                echo json_encode('#INS#EXISTE');

            }
            else
            {

                $sqlinscription = "INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `limitclient`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `apikey`) VALUES (NULL, '".$emailEnt."', '".$protectmdp."', '1', '', '', '', '".$nomEntreprise."', '', '2', '10', '15', '0000-00-00', '0000-00-00', '0', 'null', 'null', '".$apikey."')";
                if(mysqli_query($connect, $sqlinscription))
                {

                    echo json_encode("#INS#SUCCESS");

                }
                else
                {

                    echo json_encode("#INS#ERROR");

                }

            }
            
            mysqli_close($connect);
            break;
        case 'connexion':
            
            $connexionEmail = $_GET['cntemail'];
            $connexionPassword = $_GET['cntpassword'];
            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");

            $sql = "SELECT * FROM `accsociete` WHERE `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."' AND `confirmation` = '1'";
            $result = mysqli_query($connect, $sql);
            if($row = mysqli_num_rows($result))
            {

                $json = json_decode($row);

            }
            else
            {
                $json = json_decode($row);
            }

            if($json === 1)
            {

                echo json_encode("#CO#SUCCESS");

            }
            else
            {

                echo json_encode("#CO#ECHEC");

            }

            mysqli_close($connect);


            break;
        default:
            # code...
            break;
    }






}


?>