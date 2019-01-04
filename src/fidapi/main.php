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

                $sqlinscription = "INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `apikey`) VALUES (NULL, '".$emailEnt."', '".$protectmdp."', '1', '', '', '', '".$nomEntreprise."', '', '2', '0', '10', '0', '15', '0000-00-00', '0000-00-00', '0', 'null', 'null', '".$apikey."')";
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
            if(mysqli_num_rows($result)){

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }
            
            }else{
            
                $json = json_encode('#CO#ECHEC');
            
            }
            
            echo $json;

            mysqli_close($connect);


            break;
        case 'datadashboard':
            $id = $_GET['id'];

            $sql = "SELECT * FROM `accsociete` WHERE `id` = '".$id."'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result)){

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }
            
            }else{
            
                $json = json_encode('#DATARECUPDASH#ECHEC');
            
            }
            
            echo $json;

            mysqli_close($connect);
            break;
        case 'compteNombreClient':
            $id = $_GET['id'];

            $sql = "SELECT COUNT(*) FROM `acctclient` WHERE `identreprise` = '".$id."'";
            $result = mysqli_query($connect, $sql);
            if($row = mysqli_fetch_row($result))
            {

                $json = json_encode($row);

            }
            else
            {

                $json = json_encode($row);

            }
            
            echo $json;

            mysqli_close($connect);
            break;
        case 'listeClient':
            $id = $_GET['id'];

            $sql = "SELECT * FROM `acctclient` WHERE `identreprise` = '".$id."'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result)){

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }
            
            }else{
            
                $json = json_encode('#LISTECLIENT#ECHEC');
            
            }
            
            echo $json;

            mysqli_close($connect);
            break;
        case 'voirClient':
            $id = $_GET['id'];

            $sql = "SELECT * FROM `acctclient` WHERE `id` = '".$id."'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result)){

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }
            
            }else{
            
                $json = json_encode('#FICHECLIENT#ECHEC');
            
            }
            
            echo $json;

            mysqli_close($connect);
            break;
        case 'ajoutClient':
            $idEntreprise = $_GET['id'];
            $dateInscription = date("Y-m-d");
            $nomClient = $_GET['nomClient'];
            $prenomClient = $_GET['prenomClient'];
            $adresseClient = $_GET['adresseClient'];
            $telephoneClient = $_GET['telephoneClient'];
            $emailClient = $_GET['emailClient'];
            $passwordClient = $_GET['passwordClient'];
            $passwordCryptClient = md5("secureClient".$passwordClient."Clientsecure");

            $sql = "SELECT * FROM `acctclient` WHERE `email` = '".$emailClient."'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                $json = json_encode("#AJTCLIENT#EXISTE");

                echo $json;

            }
            else
            {


                $sqldeux = "INSERT INTO `acctclient` (`id`, `identreprise`, `dinscription`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbcartetotal`, `nbcarteterminer`, `nbpointagetotal`) VALUES (NULL, '".$idEntreprise."', '".$dateInscription."', '".$nomClient."', '".$prenomClient."', '".$adresseClient."', '".$telephoneClient."', '".$emailClient."', '".$passwordCryptClient."', '0', '0', '0')";
                if(mysqli_query($connect, $sqldeux))
                {
    
                    $json = json_encode("#AJTCLIENT#SUCCESS");
    
                }
                else
                {
    
                    $json = json_encode("#AJTCLIENT#ERROR");
    
                }
                
                echo $json;


            }


            mysqli_close($connect);
            break;
        default:
            # code...
            break;
    }


}


?>