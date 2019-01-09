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
        case 'creationCarte':
            $id = $_GET['id'];
            $date = date("Y-m-d");
            $imgfond = $_GET['imgfondcarte'];
            $imgicon = $_GET['imgiconcarte'];
            $limitpointage = $_GET['pointage'];
            $cadeaux = $_GET['cadeaux'];

            $sql = "SELECT * FROM `acctclient` WHERE `id` = '$id'";
            $result = mysqli_query($connect, $sql);
            while($row = mysqli_fetch_assoc($result))
            {

                $nom = $row['nom'];
                $prenom = $row['prenom'];


            }

            $sqldeux = "SELECT * FROM `cartefidelite` WHERE `idclient` = $id  AND `statut` = '1'";
            $resultdeux= mysqli_query($connect, $sqldeux);
            if(mysqli_num_rows($resultdeux))
            {

                $json = json_encode("#AJTCARTE#EXISTE");

            }
            else
            {

                $sqltrois = "INSERT INTO `cartefidelite` (`id`, `idclient`, `datecreation`, `nom`, `prenom`, `nbpointage`, `limitpointage`, `statut`, `cadeaux`, `imgbackground`, `imgicon`, `qrcode`) VALUES (NULL, '".$id."', '".$date."', '".$nom."', '".$prenom."', '0', '".$limitpointage."', '1', '".$cadeaux."', '".$imgfond."', '".$imgicon."', '')";
                $resultrois = mysqli_query($connect, $sqltrois);
                if($resultrois)
                {
    
                    $json = json_encode("#AJTCARTE#SUCCESS");
    
                }
                else
                {
    
                    $json = json_encode("#AJTCARTE#ERROR");
    
                }
                

            }



            echo $json;

            mysqli_close($connect);

            break;
        case 'voirCarteClient':
            $id = $_GET['id'];

            $sql = "SELECT * FROM `cartefidelite` WHERE `idclient` = $id AND `statut` = '1'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }

            }
            else
            {

                $json = json_encode("#VOIRCARTE#NOEXIST");

            }

            echo $json;
            break;
        case 'pointage':
            $idEntreprise = $_GET['identreprise'];
            $idClient = $_GET['idclient'];
            $debutpointage = date("Y-m-d H:i:s"); 
            $code = rand(1, 99).rand(2, 999).rand(3, 9999);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $idEntreprise";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                while($row = mysqli_fetch_assoc($result))
                {
    
                    $nomDeLaSociete = $row['nomsociete'];
    
                } 

                $sqldeux = "SELECT * FROM `acctclient` WHERE `id` = $idClient";
                $resultdeux = mysqli_query($connect, $sqldeux);
                if(mysqli_num_rows($resultdeux))
                {


                    while($raw = mysqli_fetch_assoc($resultdeux))
                    {

                        $nom = $raw['nom'];
                        $prenom = $raw['prenom'];
                        $client = $nom." ".$prenom;

                    }

                    $sqltrois = "SELECT * FROM `pointage` WHERE `idclient` = $idClient AND `statut` = '1'";
                    $resultquatre = mysqli_query($connect, $sqltrois);
                    if(mysqli_num_rows($resultquatre))
                    {

                        $json = json_encode("#CHECKPOINTAGE#EXISTE");

                    }
                    else
                    {

                        $sqlquatre = "INSERT INTO `pointage` (`id`, `identreprise`, `idclient`, `entreprise`, `departpointage`, `client`, `finpointage`, `statut`, `code`) VALUES (NULL, '".$idEntreprise."', '".$idClient."', '".$nomDeLaSociete."', '".$debutpointage."', '".$client."', '".$debutpointage."', '1', '".$code."')";
                        if(mysqli_query($connect, $sqlquatre))
                        {
        
                            $sqlcinq = "UPDATE `cartefidelite` SET `qrcode` = '".$code."' WHERE `idclient` = $idClient  AND `statut` = '1';";
                            if(mysqli_query($connect, $sqlcinq))
                            {
        
                                $json = json_encode("#CARTEUPTCODE#SUCCESS");
        
                            }
                            else
                            {
        
                                $json = json_encode("#CARTEUPTCODE#ECHEC");
        
                            }
        
                        }
                        else
                        {
        
                            $json = json_encode("#ADDPOINTAGE#ECHEC");
        
                        }

                    }




                }
                else
                {

                    $json = json_encode("#DATACLT#ECHEC");

                }
                

            }
            else
            {

                $json = json_encode("#DATAENT#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'connexionClient':
            
            $connexionEmail = $_GET['cntemail'];
            $connexionPassword = $_GET['cntpassword'];
            $protectcomdp = md5("secureClient".$connexionPassword."Clientsecure");

            $sql = "SELECT * FROM `acctclient` WHERE `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result)){

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }
            
            }else{
            
                $json = json_encode('#COCLIENT#ECHEC');
            
            }
            
            echo $json;

            mysqli_close($connect);


            break;
        case 'checkPointage':
            $id = $_GET['id'];

            $sql = "SELECT * FROM `cartefidelite` WHERE `idclient` = $id  AND `statut` = '1'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                $sqldeux = "SELECT * FROM `pointage` WHERE `idclient` = $id AND `statut` = '1'";
                $resultdeux = mysqli_query($connect, $sqldeux);
                if(mysqli_num_rows($resultdeux))
                {

                    $json = json_encode("#CHKPOINTAGE#SUCCESS");

                }
                else
                {

                    $json = json_encode("#CHKPOINTAGE#ECHEC");

                }

                

            }
            else
            {

                $json = json_encode("#CHKCARTEFID#ECHEC");


            }

            echo $json;

            mysqli_close($connect);

            break;
            case 'checkCloturation':
            $id = $_GET['id'];
            $dateCreationCadeaux = date("Y-m-d H:i:s");
            $code = rand(1, 99).rand(2, 999).rand(3, 9999);
        
            //$json = json_encode("#CONFPOINTAGE#SUCCESS");
            $sqldeux = "SELECT * FROM `cartefidelite` WHERE `idclient` = $id AND `statut` = '1'";
            $result = mysqli_query($connect, $sqldeux);
                
            while($row = mysqli_fetch_assoc($result))
            {
        
                $nombrePointage = $row['nbpointage'];
                $limitationPointage = $row['limitpointage'];
                $idCarteFidelite = $row['id'];
                $cadeauxFidelite = $row['cadeaux'];
        
            }

            if($nombrePointage === $limitationPointage)
            {

                $sqltrois = "SELECT * FROM `acctclient` WHERE `id` = $id";
                $resultdeux = mysqli_query($connect, $sqltrois);

                while($raw = mysqli_fetch_assoc($resultdeux))
                {

                    $nombreCarteTerminer = $raw['nbcarteterminer'];

                }

                mysqli_query($connect, "INSERT INTO `fidcadeaux` (`id`, `idclient`, `idcarte`, `date`, `cadeaux`, `statut`, `datereceptioncadeaux`, `code`) VALUES (NULL, '".$id."', '".$idCarteFidelite."', '".$dateCreationCadeaux."', '".$cadeauxFidelite."', '1', '".$dateCreationCadeaux."', '".$code."')");
                mysqli_query($connect, "UPDATE `acctclient` SET `nbcarteterminer` = $nombreCarteTerminer + 1 WHERE `id` = $id");
                mysqli_query($connect, "UPDATE `cartefidelite` SET `statut` = '2', `qrcode` = '".$code."' WHERE `idclient` = $id  AND `statut` = '1'");
                $json = json_encode("#CLOTURATION#SUCCESS");

                

                

            }
            else
            {

                $json = json_encode("#CLOTURATION#NONECESSAIRE");

            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'validationPointage':
            $id = $_GET['id'];
            $idEntreprise = $_GET['idEntreprise'];
            $finpointage = date("Y-m-d H:i:s");
        
            //$json = json_encode("#CONFPOINTAGE#SUCCESS");
            $sqldeux = "SELECT * FROM `cartefidelite` WHERE `idclient` = $id  AND `statut` = '1'";
            $result = mysqli_query($connect, $sqldeux);
                
            while($row = mysqli_fetch_assoc($result))
            {
        
                $nombrePointage = $row['nbpointage'];
        
            }

            $update1 = mysqli_query($connect, "UPDATE `cartefidelite` SET `nbpointage` = $nombrePointage + 1 WHERE `idclient` = $id  AND `statut` = '1'");

            $sqltrois = "SELECT * FROM `acctclient` WHERE `id` = $id";
            $resultdeux = mysqli_query($connect, $sqltrois);
            
            while($raw = mysqli_fetch_assoc($resultdeux))
            {
        
                $nombrePointageTotal = $raw['nbpointagetotal'];
        
            }

            mysqli_query($connect, "UPDATE `acctclient` SET `nbpointagetotal` = $nombrePointageTotal + 1 WHERE `id` = $id");

            $resultrois = mysqli_query($connect, "SELECT * FROM `accsociete` WHERE `id` = $idEntreprise");
            
            while($rbw = mysqli_fetch_assoc($resultrois))
            {
        
                $nombrePointageTotalEntreprise = $rbw['nbpointage'];
        
            }

            if(mysqli_query($connect, "UPDATE `accsociete` SET `nbpointage` = $nombrePointageTotalEntreprise + 1 WHERE `id` = $idEntreprise"))
            {

                mysqli_query($connect, "UPDATE `pointage` SET `finpointage` = '".$finpointage."', `statut` = '2' WHERE `idclient` = $id;");
                $json = json_encode("#UPTENTREPRISE#SUCCESS");

            }
            else
            {

                $json = json_encode("#UPTENTREPRISE#ECHEC");

            }    

            echo $json;        

            mysqli_close($connect);

            break;
        case 'afficheCadeauxAttente':
            $idClient = $_GET['id'];

            $sql = "SELECT * FROM `fidcadeaux` WHERE `idclient` = $idClient AND `statut` = '1'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                while($row[] = mysqli_fetch_assoc($result))
                {
            
                    $json = json_encode($row);
            
                }


            }
            else
            {

                $json = json_encode("#AFFCADEAUX#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        default:
            # code...
            break;
    }


}


?>