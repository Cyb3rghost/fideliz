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
            $debutAbonnement = date("Y-m-d");
        
            $date_expire    =   $debutAbonnement;
            $nbre=30;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

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

                $sqlinscription = "INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `apikey`) VALUES (NULL, '".$emailEnt."', '".$protectmdp."', '1', '', '', '', '".$nomEntreprise."', '', '2', '0', '10', '0', '15', '0000-00-00', '0000-00-00', '0', 'carddefault.jpg', 'logodefault.png', '".$apikey."')";
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
        case 'jourRestantMaj':
            $connexionEmail = $_GET['cntemail'];
            $connexionPassword = $_GET['cntpassword'];
            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");

            $sql = "SELECT * FROM `accsociete` WHERE `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."' AND `confirmation` = '1'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                while($raw = mysqli_fetch_assoc($result))
                {

                    $id = $raw['id'];
                    $jourRestantChk = $raw['jrestant'];
                    $statutCompte = $raw['typecompte'];
                    $finAbonnement = $raw['finabo'];

                }
                
                if($jourRestantChk <= '0')
                {

                    $sqldeux = "UPDATE `accsociete` SET `typecompte` = '0', `jrestant` = '0' WHERE `id` = $id";
    
                    if($statutCompte != "0" && mysqli_query($connect, $sqldeux))
                    {
    
                            $json = json_encode('#UPTYPECPT#SUCCESS');
    
                    }
                    else
                    {
    
                            $json = json_encode('#UPTYPECPT#ECHEC');
    
                    }

                }

                if($jourRestantChk != '0')
                {

                    $diffDebutAbonnement = strtotime(date('Y-m-d'));
                    $diffFinAbonnement = strtotime($finAbonnement);
                    $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

                    if($jourRestant < '0')
                    {

                        $jourRestant = '0';

                    }

                    $sqltrois = "UPDATE `accsociete` SET `jrestant` = '".$jourRestant."' WHERE `id` = $id";
    
                    if(mysqli_query($connect, $sqltrois))
                    {
    
                            $json = json_encode('#UPTJRST#SUCCESS');
    
                    }
                    else
                    {
    
                            $json = json_encode('#UPTJRST#ECHEC');
    
                    }

                }
            
            }else{
            
                $json = json_encode('#ENT#NOEXIST');
            
                
            }
            
            echo $json;
            
            mysqli_close($connect);
            break;
        case 'connexion':
            
            $connexionEmail = $_GET['cntemail'];
            $connexionPassword = $_GET['cntpassword'];
            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");

            $sql = "SELECT * FROM `accsociete` WHERE `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."' AND `confirmation` = '1'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                /*while($raw = mysqli_fetch_assoc($result))
                {

                    $id = $raw['id'];
                    $finAbonnement = $raw['finabo'];

                }*/

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


                $sqldeux = "INSERT INTO `acctclient` (`id`, `identreprise`, `idsouche`, `dinscription`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbcartetotal`, `nbcarteterminer`, `nbpointagetotal`) VALUES (NULL, '".$idEntreprise."', '0', '".$dateInscription."', '".$nomClient."', '".$prenomClient."', '".$adresseClient."', '".$telephoneClient."', '".$emailClient."', '".$passwordCryptClient."', '0', '0', '0')";
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
        case 'majEntreprise':
            $id = $_GET['ident'];
            $nom = $_GET['nom'];
            $prenom = $_GET['prenom'];
            $adresse = $_GET['adresse'];
            $email = $_GET['email'];
            $nomSociete = $_GET['societe'];
            $telephone = $_GET['telephone'];

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $sqldeux = "UPDATE `accsociete` SET `nom` = '".$nom."', `prenom` = '".$prenom."', `adresse` = '".$adresse."', `telephone` = '".$telephone."', `email` = '".$email."' WHERE `id` = $id";
                if(mysqli_query($connect, $sqldeux))
                {
    
                    $json = json_encode("#MAJENT#SUCCESS");
    
                }
                else
                {
    
                    $json = json_encode("#MAJENT#FAILED");
    
                }



            }
            else
            {


                $json = json_encode("#ENT#NOEXIST");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'majClient':
            $id = $_GET['idclient'];
            $nom = $_GET['nom'];
            $prenom = $_GET['prenom'];
            $adresse = $_GET['adresse'];
            $email = $_GET['email'];
            $telephone = $_GET['telephone'];

            $sql = "SELECT * FROM `acctclient` WHERE `id` = $id AND `idsouche` = '0'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $sqldeux = "UPDATE `acctclient` SET `nom` = '".$nom."', `prenom` = '".$prenom."', `adresse` = '".$adresse."', `telephone` = '".$telephone."', `email` = '".$email."' WHERE `id` = $id OR `idsouche` = $id";
                if(mysqli_query($connect, $sqldeux))
                {
    
                    $json = json_encode("#MAJCLIENT#SUCCESS");
    
                }
                else
                {
    
                    $json = json_encode("#MAJCLIENT#FAILED");
    
                }



            }
            else
            {


                $json = json_encode("#MAJCLIENT#NOSOUCHE");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'changeMdpEnt':
            $id = $_GET['ident'];
            $ancienMDP = $_GET['oldmdp'];
            $cryptPassword = md5("secureINS".$ancienMDP."INSecure");
            $nouveauMDP = $_GET['nouveaumdp'];
            $cryptNewMDP = md5("secureINS".$nouveauMDP."INSecure");

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id AND `password` = '".$cryptPassword."'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                $sqldeux = "UPDATE `accsociete` SET `password` = '".$cryptNewMDP."' WHERE `id` = $id";
                if(mysqli_query($connect, $sqldeux))
                {

                    $json = json_encode("#MDFMDP#SUCCESS");

                }
                else
                {

                    $json = json_encode("#MDFMDP#FAILED");

                }

            }
            else
            {

                $json = json_encode("#MDFMDP#NOSOUCHE");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'changeMdp':
            $id = $_GET['idclient'];
            $ancienMDP = $_GET['oldmdp'];
            $cryptPassword = md5("secureClient".$ancienMDP."Clientsecure");
            $nouveauMDP = $_GET['nouveaumdp'];
            $cryptNewMDP = md5("secureClient".$nouveauMDP."Clientsecure");

            $sql = "SELECT * FROM `acctclient` WHERE `id` = $id AND `password` = '".$cryptPassword."' AND `idsouche` = '0'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                $sqldeux = "UPDATE `acctclient` SET `password` = '".$cryptNewMDP."' WHERE `id` = $id OR `idsouche` = $id";
                if(mysqli_query($connect, $sqldeux))
                {

                    $json = json_encode("#MDFMDP#SUCCESS");

                }
                else
                {

                    $json = json_encode("#MDFMDP#FAILED");

                }

            }
            else
            {

                $json = json_encode("#MDFMDP#NOSOUCHE");

            }

            echo $json;

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
            $idCarte = $_GET['idcarte'];
            $idEntreprise = $_GET['identreprise'];
            $idClient = $_GET['idclient'];
            $debutpointage = date("Y-m-d H:i:s"); 
            $code = rand(1, 99).rand(2, 999).rand(3, 9999);
            $prestation = $_GET['prestation'];
            $prix = $_GET['prix'];

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

                        $sqlquatre = "INSERT INTO `pointage` (`id`, `idcarte`, `identreprise`, `idclient`, `entreprise`, `departpointage`, `client`, `finpointage`, `statut`, `code`, `prestation`, `prix`) VALUES (NULL, '".$idCarte."', '".$idEntreprise."', '".$idClient."', '".$nomDeLaSociete."', '".$debutpointage."', '".$client."', '".$debutpointage."', '1', '".$code."', '".$prestation."', '".$prix."')";
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
            
            $idEntreprise = $_GET['idEntreprise'];
            $connexionEmail = $_GET['cntemail'];
            $connexionPassword = $_GET['cntpassword'];
            $protectcomdp = md5("secureClient".$connexionPassword."Clientsecure");

            $sql = "SELECT * FROM `acctclient` WHERE `identreprise` = '".$idEntreprise."' AND `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."'";
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
                $recuperationPrixSurCadeaux = explode(" - ", $cadeauxFidelite);
                $reelPrix = substr($recuperationPrixSurCadeaux[1], 0, -4);
            }

            if($nombrePointage === $limitationPointage)
            {

                $sqltrois = "SELECT * FROM `acctclient` WHERE `id` = $id";
                $resultdeux = mysqli_query($connect, $sqltrois);

                while($raw = mysqli_fetch_assoc($resultdeux))
                {

                    $nombreCarteTerminer = $raw['nbcarteterminer'];

                }

                mysqli_query($connect, "INSERT INTO `fidcadeaux` (`id`, `idclient`, `idcarte`, `date`, `cadeaux`, `statut`, `datereceptioncadeaux`, `code`, `prix`) VALUES (NULL, '".$id."', '".$idCarteFidelite."', '".$dateCreationCadeaux."', '".$recuperationPrixSurCadeaux[0]."', '1', '".$dateCreationCadeaux."', '".$code."', '".$reelPrix."')");
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

            $sql = "SELECT * FROM `fidcadeaux` WHERE `idclient` = $idClient AND `statut` = '1' ORDER BY `date` DESC";
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
        case 'confirmationCadeaux':
            $idCadeaux = $_GET['id'];
            $dateReception = date("Y-m-d H:i:s");

            $sql = "UPDATE `fidcadeaux` SET `statut` = '2', `datereceptioncadeaux` = '".$dateReception."' WHERE `id` = $idCadeaux AND `statut` = '1'";
            
            $result = mysqli_query($connect, $sql);

            if($result)
            {

                $json = json_encode("#CONFIRMCADEAUX#SUCCESS");

            }
            else
            {

                $json = json_encode("#CONFIRMCADEAUX#ECHEC");

            }

            echo $json;

            mysqli_close($connect);
            
            break;
        case 'afficheCadeauxRecu':
            $idClient = $_GET['id'];

            $sql = "SELECT * FROM `fidcadeaux` WHERE `idclient` = $idClient AND `statut` = '2' ORDER BY `datereceptioncadeaux` DESC";
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

                $json = json_encode("#AFFCADEAUXRECU#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'ajoutCadeaux':
            $idEntreprise = $_GET['id'];
            $prestation = $_GET['prestation'];
            $prix = $_GET['prix'];

            $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `prestation` = '".$prestation."'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                $json = json_encode("#AJTCADEAUX#EXISTE");

            }
            else
            {

                $sqldeux = "INSERT INTO `cadeaux` (`id`, `identreprise`, `prestation`, `prix`, `activation`) VALUES (NULL, '".$idEntreprise."', '".$prestation."', '".$prix."', '1');";
                if(mysqli_query($connect, $sqldeux))
                {

                    $json = json_encode("#AJTCADEAUX#SUCCESS");

                }
                else
                {

                    $json = json_encode("#AJTCADEAUX#ECHEC");

                }
                


            }
            
            echo $json;

            mysqli_close($connect);

            break;
        case 'afficheListeCadeaux':
            $idEntreprise = $_GET['id'];
            
            $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `activation` = '1'";
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


                $json = json_encode("#SLCTLISTECADEAUX#ECHEC");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'afficheListeCadeaux':
            $idEntreprise = $_GET['id'];
            
            $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `activation` = '1'";
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


                $json = json_encode("#SLCTLISTECADEAUX#ECHEC");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'afficheListeCadeauxInactive':
            $idEntreprise = $_GET['id'];
            
            $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `activation` = '0'";
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


                $json = json_encode("#SLCTLISTECADEAUXINACTIF#ECHEC");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'activePrestation':
            $id = $_GET['id'];

            $sql = "UPDATE `cadeaux` SET `activation` = '1' WHERE `id` = $id";
            if(mysqli_query($connect, $sql))
            {

                $json = json_encode("#ENABLEGIFT#SUCCESS");


            }
            else
            {

                $json = json_encode("#ENABLEGIFT#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'desactivePrestation':
            $id = $_GET['id'];

            $sql = "UPDATE `cadeaux` SET `activation` = '0' WHERE `id` = $id";
            if(mysqli_query($connect, $sql))
            {

                $json = json_encode("#DISABLEGIFT#SUCCESS");


            }
            else
            {

                $json = json_encode("#DISABLEGIFT#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'suppressionPrestation':
            $id = $_GET['id'];

            $sql = "DELETE FROM `cadeaux` WHERE `id` = $id";
            if(mysqli_query($connect, $sql))
            {

                $json = json_encode("#DELETEGIFT#SUCCESS");


            }
            else
            {

                $json = json_encode("#DELETEGIFT#ECHEC");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'uploadBackgroundImg':
            $ID = $_GET['id'];
            $idUniqueImg = rand(1, 999999);
            $date = date("d-m-Y");
            $fileinfo = getimagesize($_FILES["image"]["tmp_name"]);
            $width = $fileinfo[0];
            $height = $fileinfo[1];

            

            if($width = "600" || $height = "300")
            {

                $extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);

                if(move_uploaded_file($_FILES["image"]["tmp_name"], "img/" . "BCGC".$idUniqueImg."D".$date.".".$extension))
                {

                    if(mysqli_query($connect, "UPDATE `accsociete` SET `imgfond` = 'BCGC".$idUniqueImg."D".$date.".".$extension."' WHERE `id` = $ID;"))
                    {

                        /*$response = array(
                            "type" => "success",
                            "message" => "Background uploaded successfully."
                        );
    
                        $json = json_encode($response);*/

                        $json = json_encode("#MAJBKGCARTE#SUCCESS");


                    }
                    else
                    {

                        $json = json_encode("#MAJBKGCARTE#FAILED");

                    }
    
                }
                else
                {
    
                    /*$response = array(
                        "type" => "error",
                        "message" => "Problem in uploading image files."
                    );

                    $json = json_encode($response);*/
                    $json = json_encode("#UPLOADCARTE#FAILED");
    
                } 

            }
            else
            {

                /*$response = array(
                    "type" => "error",
                    "message" => "Image dimension should be within 600X300"
                );

                $json = json_encode($response);*/

                $json = json_encode("#UPLOADIMENSION#FAILED");

            }

            echo $json;
            break;
        case 'uploadLogoImg':
            $ID = $_GET['id'];
            $idUniqueImg = rand(1, 999999);
            $date = date("d-m-Y");
            $fileinfo = getimagesize($_FILES["image"]["tmp_name"]);
            $width = $fileinfo[0];
            $height = $fileinfo[1];

            

            if($width = "100" || $height = "100")
            {

                $extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);

                if($extension !== 'png')
                {

                    /*$response = array(
                        "type" => "error",
                        "message" => "Extension non autorisée. (Seulement PNG)"
                    );

                    $json = json_encode($response);*/

                    $json = json_encode("#EXTLOGOUPLOAD#FAILED");

                }
                else
                {


                    if(move_uploaded_file($_FILES["image"]["tmp_name"], "img/" . "LOGO".$idUniqueImg."D".$date.".".$extension))
                    {
    
                        if(mysqli_query($connect, "UPDATE `accsociete` SET `imgicon` = 'LOGO".$idUniqueImg."D".$date.".".$extension."' WHERE `id` = $ID;"))
                        {
    
                            /*$response = array(
                                "type" => "success",
                                "message" => "Logo uploaded successfully."
                            );
        
                            $json = json_encode($response);*/

                            $json = json_encode("#MAJLOGOCARTE#SUCCESS");
    
    
                        }
                        else
                        {
    
                            $json = json_encode("#MAJLOGOCARTE#FAILED");
    
                        }
        
                    }
                    else
                    {
        
                        /*$response = array(
                            "type" => "error",
                            "message" => "Problem in uploading image files."
                        );
    
                        $json = json_encode($response);*/

                        $json = json_encode("#UPLOADLOGOCARTE#SUCCESS");
        
                    } 


                }



            }
            else
            {

                /*$response = array(
                    "type" => "error",
                    "message" => "Image dimension should be within 600X300"
                );

                $json = json_encode($response);*/

                $json = json_encode("#UPLOADIMENSIONLOGO#FAILED");

            }

            echo $json;
            break;
        case 'selectionSociete':

            $sql = "SELECT * FROM `accsociete`";
            $test = array();
            if($result = mysqli_query($connect, $sql))
            {

                while($row[] = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row);

                }

            }
            else
            {

                $json = json_encode("#LISTENT#FAILED");
                
            }

            echo $json;
            mysqli_close($connect);

            break;
        case 'assoccompte':
            $idEntreprise = $_GET['idEnt'];
            $idUser = $_GET['idusr'];
            $date = date("Y-m-d");

            $sql = "SELECT * FROM `acctclient` WHERE `id` = '".$idUser."' AND `idsouche` = '0'";
            $result = mysqli_query($connect, $sql);
            if(mysqli_num_rows($result))
            {

                while($row = mysqli_fetch_assoc($result))
                {

                    $idSouche = $row['id'];
                    $dateInscription = $row['dinscription'];
                    $nom = $row['nom'];
                    $prenom = $row['prenom'];
                    $adresse = $row['adresse'];
                    $telephone = $row['telephone'];
                    $email = $row['email'];
                    $password = $row['password'];  

                }

                $sqldeux = "SELECT * FROM `acctclient` WHERE `identreprise` = '".$idEntreprise."' AND `idsouche` = '".$idUser."'";

                $resultdeux = mysqli_query($connect, $sqldeux);
                if(mysqli_num_rows($resultdeux))
                {

                    $json = json_encode("#ASSOC#EXIST");

                }
                else
                {

                    $sqltrois = "INSERT INTO `acctclient` (`id`, `identreprise`, `idsouche`, `dinscription`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbcartetotal`, `nbcarteterminer`, `nbpointagetotal`) VALUES (NULL, '".$idEntreprise."', '".$idSouche."', '".$date."', '".$nom."', '".$prenom."', '".$adresse."', '".$telephone."', '".$email."', '".$password."', '0', '0', '0')";
                    if($resultrois = mysqli_query($connect, $sqltrois))
                    {
    
                        $json = json_encode("#ASSOC#SUCCESS");
    
                    }
                    else
                    {
    
                        $json = json_encode("#ASSOC#FAILED");
    
                    }

                }

            }
            else
            {

                $json = json_encode("#ASSOC#NOEXIST");

            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandebronzemensuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=30;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '1' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOBRONZE#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOBRONZE#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandebronzeannuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=365;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '1' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOBRONZEANN#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOBRONZEANN#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandeargentmensuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=30;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '2' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOARGENT#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOARGENT#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandeargentannuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=365;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '2' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOARGENTANN#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOARGENTANN#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandeormensuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=30;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '3' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOOR#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOOR#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'commandeorannuel':
            $id = $_GET['id'];
            $debutAbonnement = date("Y-m-d");
            $date_expire    =   $debutAbonnement;
            $nbre=365;
            $tmp=explode('-', $date_expire);
            $jour = $tmp[2]; // on récupère le jour
            $mois = $tmp[1]; // puis le mois
            $annee = $tmp[0]; // l'annee ...

            $date_expiration = mktime($mois, $jour, $annee)+ 24*3600*$nbre;
            $finaldate_expiration = date("Y-m-d", $date_expiration);

            $diffDebutAbonnement = strtotime($debutAbonnement);
            $diffFinAbonnement = strtotime($finaldate_expiration);
            $jourRestant = dateDiff($diffDebutAbonnement, $diffFinAbonnement);

            $sql = "SELECT * FROM `accsociete` WHERE `id` = $id";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {


                $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '3' WHERE `id` = $id";
                if(mysqli_query($connect, $update))
                {

                        $json = json_encode("#ABOORANN#SUCCESS");

                }
                else
                {

                        $json = json_encode("#ABOORANN#FAILED");

                }



            }

            echo $json;

            mysqli_close($connect);
            break;
        case 'listePointageClient':
            $idCarteFid = $_GET['idfid'];
            $idEntreprise = $_GET['ident'];
            $idClient = $_GET['idclient'];
            
            $sql = "SELECT * FROM `pointage` WHERE `idcarte` = '".$idCarteFid."' AND `identreprise` = '".$idEntreprise."' AND `idclient` = '".$idClient."' ORDER BY `id` DESC";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                    while($row[] = mysqli_fetch_assoc($result))
                    {

                        $json=json_encode($row);

                    }

            }
            else
            {

                $json = json_encode("#POINTAGE#VIDE");


            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'gainsTotalClient':

            $idEntreprise = $_GET['ident'];


            $sql = "SELECT ROUND(SUM(prix), 2) AS `sommeTotal` FROM `pointage` WHERE `identreprise` = $idEntreprise AND `statut` = '2'";

            if($result = mysqli_query($connect, $sql))
            {

                while($row = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row['sommeTotal']);

                }

            }
            else
            {

                $json = json_encode("#GTOTALCLT#FAILED");

            }

            echo $json;
            
            mysqli_close($connect);

            break;
        case 'gainsClient':

            $idEntreprise = $_GET['ident'];
            $idClient = $_GET['idclt'];


            $sql = "SELECT ROUND(SUM(prix), 2) AS `sommeTotal` FROM `pointage` WHERE `identreprise` = $idEntreprise AND `idclient` = $idClient AND `statut` = '2'";

            if($result = mysqli_query($connect, $sql))
            {

                while($row = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row['sommeTotal']);

                }

            }
            else
            {

                $json = json_encode("#GTOTALCLT#FAILED");

            }

            echo $json;
            
            mysqli_close($connect);

            break;
        case 'prestationsCadeauxClientsTotal':

            $idClient = $_GET['idclt'];

            $sql = "SELECT ROUND(SUM(prix), 2) AS `sommeTotal` FROM `fidcadeaux` WHERE `idclient` = $idClient AND `statut` = '2'";

            if($result = mysqli_query($connect, $sql))
            {

                while($row = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row['sommeTotal']);

                }

            }
            else
            {

                $json = json_encode("#GTTPRSTATION#FAILED");

            }

            echo $json;
            
            mysqli_close($connect);

            break;
        case 'prestationsCadeauxClients':

            $idCarte = $_GET['idcarte'];
            $idClient = $_GET['idclt'];


            $sql = "SELECT ROUND(SUM(prix), 2) AS `sommeTotal` FROM `fidcadeaux` WHERE `idclient` = $idClient AND `idcarte` = '".$idCarte."' AND `statut` = '2'";

            if($result = mysqli_query($connect, $sql))
            {

                while($row = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row['sommeTotal']);

                }

            }
            else
            {

                $json = json_encode("#GTTPRSTATION#FAILED");

            }

            echo $json;
            
            mysqli_close($connect);

            break;
        case 'maintenance':

            $sql = "SELECT * FROM `parametres` WHERE `id` = '1'";
            if($result = mysqli_query($connect, $sql))
            {

                while($row[] = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row);

                }

            }
            else
            {

                $json = json_encode("#MAINTENANCE#ERREURDATA");
                
            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'logpointages':

            $idEntreprise = $_GET['ident'];

            $sql = "SELECT * FROM `pointage` WHERE `identreprise` = '$idEntreprise'";
            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result))
            {

                while($row[] = mysqli_fetch_assoc($result))
                {

                    $json=json_encode($row);

                }

            }
            else
            {

                $json = json_encode("#LSTPOINTAGE#VIDE");

            }

            echo $json;

            mysqli_close($connect);

            break;
        default:
            # code...
            break;
    }


}

function dateDiff($date1, $date2){
 
    // On récupère la différence de timestamp entre les 2 précédents
    $nbJoursTimestamp = $date2 - $date1;
    
    // ** Pour convertir le timestamp (exprimé en secondes) en jours **
    // On sait que 1 heure = 60 secondes * 60 minutes et que 1 jour = 24 heures donc :
    $nbJours = $nbJoursTimestamp/86400; // 86 400 = 60*60*24

    return $nbJours;

}

?>