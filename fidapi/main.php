<?php


include('connections.php');

header('Access-Control-Allow-Origin: *');

if(isset($_GET['action']))
{

    $action = $_GET['action'];

    switch ($action) {
        case 'getApiKey':

            $id = $_GET['id'];

            $sql = "SELECT * FROM `apikey` WHERE `id` = '".$id."'";
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

                $json = json_encode("#GETAPIKEY#FAILED");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'inscription':
            # code...
            $nomEntreprise = $_GET['nEntreprise'];
            $nomEntreprise = mysqli_real_escape_string($connect, $nomEntreprise);
            $emailEnt = $_GET['mailEntreprise'];
            $emailEnt = mysqli_real_escape_string($connect, $emailEnt);
            $nom = $_GET['nom'];
            $nom = mysqli_real_escape_string($connect, $nom);
            $prenom = $_GET['prenom'];
            $prenom = mysqli_real_escape_string($connect, $prenom);
            $adresse = $_GET['adresse'];
            $adresse = mysqli_real_escape_string($connect, $adresse);
            $telephone = $_GET['telephone'];
            $telephone = mysqli_real_escape_string($connect, $telephone);
            $secteur = $_GET['secteur'];
            $secteur = mysqli_real_escape_string($connect, $secteur);
            $password = $_GET['password'];
            $password = mysqli_real_escape_string($connect, $password);
            $protectmdp = md5("secureINS".$password."INSecure");
            $protectmdp = mysqli_real_escape_string($connect, $protectmdp);
            $debutAbonnement = date("Y-m-d");
            $code = rand(0, 99).rand(0, 999).rand(0, 9999);
        
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

                $sqlinscription = "INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `qrcode`, `prestation`, `prix`, `activation`, `cadeaux`, `prixcadeaux`, `secteur`, `configuration`) VALUES (NULL, '".$emailEnt."', '".$protectmdp."', '1', '".$nom."', '".$prenom."', '".$adresse."', '".$nomEntreprise."', '".$telephone."', '1', '0', '5', '0', '10', '".$debutAbonnement."', '".$finaldate_expiration."', '".$jourRestant."', 'carddefault.jpg', 'logodefault.png', '".$code."', '', '0', '0', '', '0', '".$secteur."', '0')";
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
            $connexionEmail = mysqli_real_escape_string($connect, $connexionEmail);
            $connexionPassword = $_GET['cntpassword'];
            $connexionPassword = mysqli_real_escape_string($connect, $connexionPassword);
            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");
            $protectcomdp = mysqli_real_escape_string($connect, $protectcomdp);

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

                    $sqldeux = "UPDATE `accsociete` SET `typecompte` = '0', `jrestant` = '0', `activation` = '0' WHERE `id` = $id";
    
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
        case 'configurationPremiereConnexion':
            $connexionEmail = $_GET['cntemail'];
            $connexionEmail = mysqli_real_escape_string($connect, $connexionEmail);
            $connexionPassword = $_GET['cntpassword'];
            $connexionPassword = mysqli_real_escape_string($connect, $connexionPassword);
            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");
            $protectcomdp = mysqli_real_escape_string($connect, $protectcomdp);

            $sql = "SELECT * FROM `accsociete` WHERE `email` = '".$connexionEmail."' AND `password` = '".$protectcomdp."' AND `confirmation` = '1'";
            $result = mysqli_query($connect, $sql);

            while($raw = mysqli_fetch_assoc($result))
            {

                $id = $raw['id'];
                $configuration = $raw['configuration'];

            }

            if($configuration === '0')
            {


                mysqli_query($connect, "INSERT INTO `cadeaux` (`id`, `identreprise`, `idprestation`, `prestation`, `prix`, `activation`, `prdtgrp`) VALUES (NULL, '".$id."', '0', 'Produit de test', '0', '1', '0')");
                mysqli_query($connect, "UPDATE `accsociete` SET `cadeaux` = 'Produit de test', `prixcadeaux` = '10', `configuration` = '1' WHERE `id` = '".$id."'");

                $json = json_encode("#CONFIGURATIONDEPART#SUCCESS");

            }
            else
            {

                $json = json_encode("#CONFIGURATIONDEPART#FAILED");

            }

            echo $json;

            mysqli_close($connect);

            break;
        case 'connexion':
            
            $connexionEmail = $_GET['cntemail'];
            $connexionEmail = mysqli_real_escape_string($connect, $connexionEmail);
            $connexionPassword = $_GET['cntpassword'];
            $connexionPassword = mysqli_real_escape_string($connect, $connexionPassword);

            $protectcomdp = md5("secureINS".$connexionPassword."INSecure");
            $protectcomdp = mysqli_real_escape_string($connect, $protectcomdp);

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

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'compteNombreClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'listeClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }


            mysqli_close($connect);
            break;
        case 'voirClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'ajoutClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $dateInscription = date("Y-m-d");
                    $dateInscription = mysqli_real_escape_string($connect, $dateInscription);
                    $dateDeNaissance = $_GET['naissance'];
                    $dateDeNaissance = mysqli_real_escape_string($connect, $dateDeNaissance);
                    $nomClient = $_GET['nomClient'];
                    $nomClient = mysqli_real_escape_string($connect, $nomClient);
                    $prenomClient = $_GET['prenomClient'];
                    $prenomClient = mysqli_real_escape_string($connect, $prenomClient);
                    $adresseClient = $_GET['adresseClient'];
                    $adresseClient = mysqli_real_escape_string($connect, $adresseClient);
                    $telephoneClient = $_GET['telephoneClient'];
                    $telephoneClient = mysqli_real_escape_string($connect, $telephoneClient);
                    $emailClient = $_GET['emailClient'];
                    $emailClient = mysqli_real_escape_string($connect, $emailClient);
                    $passwordClient = $_GET['passwordClient'];
                    $passwordClient = mysqli_real_escape_string($connect, $passwordClient);
                    $passwordCryptClient = md5("secureClient".$passwordClient."Clientsecure");
                    $passwordCryptClient = mysqli_real_escape_string($connect, $passwordCryptClient);
        
                    $sql = "SELECT COUNT(*) FROM `acctclient` WHERE `identreprise` = '".$idEntreprise."'";
                    $result = mysqli_query($connect, $sql);
        
                    while($row = mysqli_fetch_row($result))
                    {
        
                        $totalClient = $row[0];
        
        
                    }
        
                    $sqldeux = "SELECT * FROM `accsociete` WHERE `id` = '".$idEntreprise."'";
                    $resultdeux = mysqli_query($connect, $sqldeux );
        
                    while($row = mysqli_fetch_assoc($resultdeux))
                    {
        
                        $limitationClient = $row['limitclient'];
        
                    }
        
                    if($totalClient === $limitationClient)
                    {
        
                        $json = json_encode("#LIMITCLIENT#ATTEIND");
        
                    }
                    else
                    {
        
                        $sqltrois = "SELECT * FROM `acctclient` WHERE `email` = '".$emailClient."'";
                        $resultrois = mysqli_query($connect, $sqltrois);
                        if(mysqli_num_rows($resultrois))
                        {
            
                            $json = json_encode("#AJTCLIENT#EXISTE");
            
                        }
                        else
                        {
            
            
                            $sqlquatre = "INSERT INTO `acctclient` (`id`, `identreprise`, `idsouche`, `dinscription`, `naissance`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbpointage`, `nbcarteterminer`, `nbpointagetotal`, `pointboutique`, `rating`) VALUES (NULL, '".$idEntreprise."', '0', '".$dateInscription."', '".$dateDeNaissance."', '".$nomClient."', '".$prenomClient."', '".$adresseClient."', '".$telephoneClient."', '".$emailClient."', '".$passwordCryptClient."', '0', '0', '0', '0', '0')";
                            if(mysqli_query($connect, $sqlquatre))
                            {
                
                                $json = json_encode("#AJTCLIENT#SUCCESS");
                
                            }
                            else
                            {
                
                                $json = json_encode("#AJTCLIENT#ERROR");
                
                            }
                            
                            
            
            
                        }
        
                    }
        
                    echo $json;


                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'testClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "SELECT COUNT(*) FROM `acctclient` WHERE `identreprise` = '".$idEntreprise."'";
                    $result = mysqli_query($connect, $sql);
        
                    while($row = mysqli_fetch_row($result))
                    {
        
                        $totalClient = $row[0];
        
        
                    }
        
                    $sqldeux = "SELECT * FROM `accsociete` WHERE `id` = '".$idEntreprise."'";
                    $resultdeux = mysqli_query($connect, $sqldeux );
        
                    while($row = mysqli_fetch_assoc($resultdeux))
                    {
        
                        $limitationClient = $row['limitclient'];
        
                    }
        
                    if($totalClient === $limitationClient)
                    {
        
                        echo "Limitation atteinte !";
        
        
                    }
                    else
                    {
        
                        echo $totalClient. " / ".$limitationClient;
        
                    }

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'majEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['ident'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $nom = $_GET['nom'];
                    $nom = mysqli_real_escape_string($connect, $nom);
                    $prenom = $_GET['prenom'];
                    $prenom = mysqli_real_escape_string($connect, $prenom);
                    $adresse = $_GET['adresse'];
                    $adresse = mysqli_real_escape_string($connect, $adresse);
                    $email = $_GET['email'];
                    $email = mysqli_real_escape_string($connect, $email);
                    $nomSociete = $_GET['societe'];
                    $nomSociete = mysqli_real_escape_string($connect, $nomSociete);
                    $telephone = $_GET['telephone'];
                    $telephone = mysqli_real_escape_string($connect, $telephone);
        
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


                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'majClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['idclient'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $nom = $_GET['nom'];
                    $nom = mysqli_real_escape_string($connect, $nom);
                    $prenom = $_GET['prenom'];
                    $prenom = mysqli_real_escape_string($connect, $prenom);
                    $adresse = $_GET['adresse'];
                    $adresse = mysqli_real_escape_string($connect, $adresse);
                    $email = $_GET['email'];
                    $email = mysqli_real_escape_string($connect, $email);
                    $telephone = $_GET['telephone'];
                    $telephone = mysqli_real_escape_string($connect, $telephone);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'changeMdpEnt':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['ident'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $ancienMDP = $_GET['oldmdp'];
                    $ancienMDP = mysqli_real_escape_string($connect, $ancienMDP);
                    $cryptPassword = md5("secureINS".$ancienMDP."INSecure");
                    $cryptPassword = mysqli_real_escape_string($connect, $cryptPassword);
                    $nouveauMDP = $_GET['nouveaumdp'];
                    $nouveauMDP = mysqli_real_escape_string($connect, $nouveauMDP);
                    $cryptNewMDP = md5("secureINS".$nouveauMDP."INSecure");
                    $cryptNewMDP = mysqli_real_escape_string($connect, $cryptNewMDP);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'changeMdp':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['idclient'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $ancienMDP = $_GET['oldmdp'];
                    $ancienMDP = mysqli_real_escape_string($connect, $ancienMDP);
                    $cryptPassword = md5("secureClient".$ancienMDP."Clientsecure");
                    $cryptPassword = mysqli_real_escape_string($connect, $cryptPassword);
                    $nouveauMDP = $_GET['nouveaumdp'];
                    $nouveauMDP = mysqli_real_escape_string($connect, $nouveauMDP);
                    $cryptNewMDP = md5("secureClient".$nouveauMDP."Clientsecure");
                    $cryptNewMDP = mysqli_real_escape_string($connect, $cryptNewMDP);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'creationCarte': // PEUT ETRE PLUS UTILISER - A SUPPRIMER PEUT ETRE
            $id = $_GET['id'];
            $id = mysqli_real_escape_string($connect, $id);
            $date = date("Y-m-d");
            $date = mysqli_real_escape_string($connect, $date);
            $imgfond = $_GET['imgfondcarte'];
            $imgfond = mysqli_real_escape_string($connect, $imgfond);
            $imgicon = $_GET['imgiconcarte'];
            $imgicon = mysqli_real_escape_string($connect, $imgicon);
            $limitpointage = $_GET['pointage'];
            $limitpointage = mysqli_real_escape_string($connect, $limitpointage);
            $cadeaux = $_GET['cadeaux'];
            $cadeaux = mysqli_real_escape_string($connect, $cadeaux);
            $code = rand(1, 99).rand(2, 999).rand(3, 9999);
            $code = mysqli_real_escape_string($connect, $code);

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

                $sqltrois = "INSERT INTO `cartefidelite` (`id`, `idclient`, `datecreation`, `nom`, `prenom`, `nbpointage`, `limitpointage`, `statut`, `cadeaux`, `imgbackground`, `imgicon`, `qrcode`) VALUES (NULL, '".$id."', '".$date."', '".$nom."', '".$prenom."', '0', '".$limitpointage."', '1', '".$cadeaux."', '".$imgfond."', '".$imgicon."', '".$code."')";
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
        case 'voirCarteClient': // PEUT ETRE PLUS UTILISER - A SUPPRIMER PEUT ETRE
            $id = $_GET['id'];
            $id = mysqli_real_escape_string($connect, $id);

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
        case 'pointage': // PEUT ETRE PLUS UTILISER - A SUPPRIMER PEUT ETRE
            $idCarte = $_GET['idcarte'];
            $idCarte = mysqli_real_escape_string($connect, $idCarte);
            $idEntreprise = $_GET['identreprise'];
            $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
            $idClient = $_GET['idclient'];
            $idClient = mysqli_real_escape_string($connect, $idClient);
            $debutpointage = date("Y-m-d H:i:s"); 
            $debutpointage = mysqli_real_escape_string($connect, $debutpointage);
            $code = $_GET['qrcode'];
            $code = mysqli_real_escape_string($connect, $code);
            $prestation = $_GET['prestation'];
            $prestation = mysqli_real_escape_string($connect, $prestation);
            $prix = $_GET['prix'];
            $prix = mysqli_real_escape_string($connect, $prix);


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
            $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
            $connexionEmail = $_GET['cntemail'];
            $connexionEmail = mysqli_real_escape_string($connect, $connexionEmail);
            $connexionPassword = $_GET['cntpassword'];
            $connexionPassword = mysqli_real_escape_string($connect, $connexionPassword);
            $protectcomdp = md5("secureClient".$connexionPassword."Clientsecure");
            $protectcomdp = mysqli_real_escape_string($connect, $protectcomdp);

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
        case 'afficheCadeauxAttente':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idClient = $_GET['id'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'confirmationCadeaux':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idCadeaux = $_GET['id'];
                    $idCadeaux = mysqli_real_escape_string($connect, $idCadeaux);
                    $dateReception = date("Y-m-d H:i:s");
                    $dateReception = mysqli_real_escape_string($connect, $dateReception);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            
            break;
        case 'afficheCadeauxRecu':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idClient = $_GET['id'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'ajoutCadeaux':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $prestation = $_GET['prestation'];
                    $prestation = mysqli_real_escape_string($connect, $prestation);
                    $prix = $_GET['prix'];
                    $prix = mysqli_real_escape_string($connect, $prix);
        
                    $sql = "SELECT * FROM `accsociete` WHERE `id` = $idEntreprise";
                    $result = mysqli_query($connect, $sql);
        
                    $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `prestation` = '".$prestation."'";
                    $result = mysqli_query($connect, $sql);
        
                    if(mysqli_num_rows($result))
                    {
        
                        $json = json_encode("#AJTCADEAUX#EXISTE");
        
                    }
                    else
                    {
        
                        $sqldeux = "INSERT INTO `cadeaux` (`id`, `identreprise`, `idprestation`, `prestation`, `prix`, `activation`, `prdtgrp`) VALUES (NULL, '".$idEntreprise."', '0', '".$prestation."', '".$prix."', '1', '0');";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'ajoutCadeauxGroupage':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idProduitPrincipale = $_GET['idprincipalproduit'];
                    $idProduitPrincipale = mysqli_real_escape_string($connect, $idProduitPrincipale);
                    $prestation = $_GET['prestation'];
                    $prestation = mysqli_real_escape_string($connect, $prestation);
                    $prix = $_GET['prix'];
                    $prix = mysqli_real_escape_string($connect, $prix);
        
                    $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `prestation` = '".$prestation."'";
                    $result = mysqli_query($connect, $sql);
        
                    if(mysqli_num_rows($result))
                    {
        
                        $json = json_encode("#AJTCADEAUX#EXISTE");
        
                    }
                    else
                    {
        
                        $sqldeux = "INSERT INTO `cadeaux` (`id`, `identreprise`, `idprestation`, `prestation`, `prix`, `activation`, `prdtgrp`) VALUES (NULL, '".$idEntreprise."', '".$idProduitPrincipale."', '".$prestation."', '".$prix."', '1', '0');";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'majProduitTotal':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idProduitPrincipale = $_GET['idprincipalproduit'];
                    $idProduitPrincipale = mysqli_real_escape_string($connect, $idProduitPrincipale);
                    $sommeTotal = $_GET['sommetotal'];
                    $sommeTotal = mysqli_real_escape_string($connect, $sommeTotal);
        
                    $sql = "UPDATE `cadeaux` SET `prix` = '".$sommeTotal."', `prdtgrp` = '1' WHERE `id` = $idProduitPrincipale;";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#MAJPRDTOTAL#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#MAJPRDTOTAL#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'afficheListeCadeaux':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'afficheListeCadeauxGroupe':


            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idPrestation = $_GET['idprestation'];
                    $idPrestation = mysqli_real_escape_string($connect, $idPrestation);
                    
                    $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = $idEntreprise AND `idprestation` = '".$idPrestation."' AND `activation` = '1'";
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
        
        
                        $json = json_encode("#LISTECADEAUXGRP#ECHEC");
        
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'dissolutionGroupage':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idPrestation = $_GET['idprestation'];
                    $idPrestation = mysqli_real_escape_string($connect, $idPrestation);
                    
                    $sql = "DELETE FROM `cadeaux` WHERE `idprestation` = '".$idPrestation."'";
                    $sqldeux = "UPDATE `cadeaux` SET `prdtgrp` = '0' WHERE `id` = '".$idPrestation."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        if(mysqli_query($connect, $sqldeux))
                        {
        
                            $json = json_encode("#DISSOLUTION#SUCCESS");
        
                        }
        
                    }
                    else
                    {
        
                        $json = json_encode("#DISSOLUTION#FAILED");
        
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'afficheListeCadeauxInactive':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'activePrestation':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'desactivePrestation':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'modificationProduit':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {
    
                    $idprestation = $_GET['idprestation'];
                    $idprestation = mysqli_real_escape_string($connect, $idprestation);
                    $nomPrestation = $_GET['nomprestation'];
                    $nomPrestation = mysqli_real_escape_string($connect, $nomPrestation);
                    $prixPrestation = $_GET['prixprestation'];
                    $prixPrestation = mysqli_real_escape_string($connect, $prixPrestation);
        
        
                    $sql = "UPDATE `cadeaux` SET `prestation` = '".$nomPrestation."', prix = '".$prixPrestation."' WHERE `id` = $idprestation";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#MDFPRODUIT#SUCCESS");
        
        
                    }
                    else
                    {
        
                        $json = json_encode("#MDFPRODUIT#FAILED");
        
                    }
        
                    echo $json;
    
                }
                else
                {
    
                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;
    
                }


            }

            mysqli_close($connect);

            break;
        case 'suppressionPrestation':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'uploadBackgroundImg':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $ID = $_GET['id'];
                    $ID = mysqli_real_escape_string($connect, $ID);
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'uploadLogoImg':


            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $ID = $_GET['id'];
                    $ID = mysqli_real_escape_string($connect, $ID);
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
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
        case 'selectionPrestation':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "SELECT * FROM `cadeaux` WHERE `identreprise` = '".$idEntreprise."' AND `activation` = '1'";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'assoccompte':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['idEnt'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idUser = $_GET['idusr'];
                    $idUser = mysqli_real_escape_string($connect, $idUser);
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandebronzemensuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '2', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandebronzeannuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '2', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandeargentmensuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '3', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandeargentannuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '3', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandeormensuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '4', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'commandeorannuel':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $id = $_GET['id'];
                    $id = mysqli_real_escape_string($connect, $id);
                    $limitationclient = $_GET['limitationclient'];
                    $limitationclient = mysqli_real_escape_string($connect, $limitationclient);
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
        
        
                        $update = "UPDATE `accsociete` SET `debutabo` = '".$debutAbonnement."', `finabo` = '".$finaldate_expiration."', `jrestant` = '".$jourRestant."', `typecompte` = '4', `limitclient` = '".$limitationclient."' WHERE `id` = $id";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);
            break;
        case 'listePointageClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['ident'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idClient = $_GET['idclient'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
                    
                    $sql = "SELECT * FROM `pointage` WHERE `identreprise` = '".$idEntreprise."' AND `idclient` = '".$idClient."' ORDER BY `id` DESC";
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'gainsTotalClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['ident'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
        
                    $sql = "SELECT ROUND(SUM(prix), 2) AS `sommeTotal` FROM `pointage` WHERE `identreprise` = $idEntreprise";
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
            mysqli_close($connect);

            break;
        case 'gainsClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['ident'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idClient = $_GET['idclt'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
            mysqli_close($connect);

            break;
        case 'prestationsCadeauxClientsTotal':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idClient = $_GET['idclt'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
            mysqli_close($connect);

            break;
        case 'prestationsCadeauxClients':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idCarte = $_GET['idcarte'];
                    $idCarte = mysqli_real_escape_string($connect, $idCarte);
                    $idClient = $_GET['idclt'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
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

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['ident'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
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

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'affichePlanning':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['idEntreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    //$idClient = $_GET['idclt'];
        
                    $sql = "SELECT * FROM `planning` WHERE `identreprise` = '".$idEntreprise."'";
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
        
                        $json = json_encode("#LSTPLANNING#VIDE");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'ajoutPlanningEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['idEntreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idClient = $_GET['idclt'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
                    $nom = $_GET['nom'];
                    $nom = mysqli_real_escape_string($connect, $nom);
                    $starDate = $_GET['startdate'];
                    $starDate = mysqli_real_escape_string($connect, $starDate);
                    $endDate = $_GET['endDate'];
                    $endDate = mysqli_real_escape_string($connect, $endDate);
                    $startHeure = $_GET['startheure'];
                    $startHeure = mysqli_real_escape_string($connect, $startHeure);
                    $endHeure = $_GET['endheure'];
                    $endHeure = mysqli_real_escape_string($connect, $endHeure);
                    $statut = $_GET['statut'];
                    $statut = mysqli_real_escape_string($connect, $statut);
                    $reelstart = $_GET['reelstart'];
                    $reelstart = mysqli_real_escape_string($connect, $reelstart);
                    $reelend = $_GET['reelend'];
                    $reelend = mysqli_real_escape_string($connect, $reelend);
                    $idpropo = $_GET['idpropo'];
                    $idpropo = mysqli_real_escape_string($connect, $idpropo);
                    
                    $sql = "SELECT * FROM `planning` WHERE `identreprise` = '".$idEntreprise."' AND `reelstart` BETWEEN '".$reelstart."' AND '".$reelend."'";
                    $result = mysqli_query($connect, $sql);
        
                    if(mysqli_num_rows($result))
                    {
        
        
                        $json = json_encode("#PLAGE#NONDISPONIBLE");
        
        
                    }
                    else
                    {
        
                        $sqldeux = "INSERT INTO `planning` (`id`, `identreprise`, `idclient`, `title`, `start`, `end`, `departheure`, `finheure`, `statut`, `reelstart`, `reelend`, `idproposant`) VALUES (NULL, '".$idEntreprise."', '".$idClient."', '".$nom."', '".$starDate."', '".$endDate."', '".$startHeure."', '".$endHeure."', '".$statut."', '".$reelstart."', '".$reelend."', '".$idpropo."')";
                        if($resultdeux = mysqli_query($connect, $sqldeux))
                        {
            
                            $json = json_encode("#ADDPLANNING#SUCCESS");
            
                        }
                        else
                        {
            
                            $json = json_encode("#ADDPLANNING#FAILED");
            
                        }
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'editRdv':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = "2";
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idClient = "0";
                    $idClient = mysqli_real_escape_string($connect, $idClient);
                    $nom = $_GET['nom'];
                    $nom = mysqli_real_escape_string($connect, $nom);
                    $starDate = $_GET['startdate'];
                    $starDate = mysqli_real_escape_string($connect, $starDate);
                    $endDate = $_GET['endDate'];
                    $endDate = mysqli_real_escape_string($connect, $endDate);
                    $startHeure = $_GET['startheure'];
                    $startHeure = mysqli_real_escape_string($connect, $startHeure);
                    $endHeure = $_GET['endheure'];
                    $endHeure = mysqli_real_escape_string($connect, $endHeure);
                    $uid = $_GET['uid'];
                    $uid = mysqli_real_escape_string($connect, $uid);
                    $color = $_GET['color'];
                    $color = mysqli_real_escape_string($connect, $color);
        
                    $sql = "UPDATE `planning` SET `nom` = '".$nom."', `startdatetime` = '".$starDate."', `enddatetime` = '".$endDate."', `departheure` = '".$startHeure."', `finheure` = '".$endHeure."', `classes` = '".$color."' WHERE `uid` = '".$uid."'";
                    if($result = mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#EDITRDV#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#EDITRDV#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'confirmationRdv':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $uid = $_GET['id'];
                    $uid = mysqli_real_escape_string($connect, $uid);
        
                    $sql = "UPDATE `planning` SET `statut` = '2' WHERE `id` = $uid";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#CONFRDV#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#CONFRDV#FAILED");
        
                    }
                    
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
            mysqli_close($connect);

            break;
        case 'suppressionRdv':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $uid = $_GET['id'];
                    $uid = mysqli_real_escape_string($connect, $uid);
        
                    $sql = "DELETE FROM `planning` WHERE `id` = '".$uid."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#DELRDV#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#DELRDV#FAILED");
        
        
                    }
                    
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }
            
            mysqli_close($connect);

            break;
        case 'updatePrestationEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $prestation = $_GET['prestation'];
                    $prestation = mysqli_real_escape_string($connect, $prestation);
                    $prix = $_GET['prix'];
                    $prix = mysqli_real_escape_string($connect, $prix);
        
                    $sql = "UPDATE `accsociete` SET `prestation` = '".$prestation."', `prix` = '".$prix."' WHERE `id` = '".$idEntreprise."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#UPENTPRESTA#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#UPENTPRESTA#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }



            mysqli_close($connect);

            break;
        case 'updateCadeauxEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $prestation = $_GET['prestation'];
                    $prestation = mysqli_real_escape_string($connect, $prestation);
                    $prix = $_GET['prix'];
                    $prix = mysqli_real_escape_string($connect, $prix);
        
                    $sql = "UPDATE `accsociete` SET `cadeaux` = '".$prestation."', `prixcadeaux` = '".$prix."' WHERE `id` = '".$idEntreprise."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#UPENTGIFT#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#UPENTGIFT#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'updateLimitationPrestationEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $prestation = $_GET['prestation'];
                    $prestation = mysqli_real_escape_string($connect, $prestation);
        
                    $sql = "UPDATE `accsociete` SET `limitpointage` = '".$prestation."' WHERE `id` = '".$idEntreprise."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#UPENTPNT#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#UPENTPNT#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'resetPointage':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "UPDATE `accsociete` SET `prestation` = 'Vide', `prix` = '0' WHERE `id` = '".$idEntreprise."'";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#RESETPRESTA#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#RESETPRESTA#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'pointageProductivite':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idClient = $_GET['id'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $datepointage = date("Y-m-d H:i:s"); 
                    $date = date("Y-m-d");
                    $qrcode = $_GET['qrcode'];
                    $qrcode = mysqli_real_escape_string($connect, $qrcode);
        
        
                    $sql = "SELECT * FROM `accsociete` WHERE `id` = '".$idEntreprise."' AND `activation` = '1'";
                    $result = mysqli_query($connect, $sql);
                    if(mysqli_num_rows($result))
                    {
        
                        while($row = mysqli_fetch_assoc($result))
                        {
        
                            $nomDeLaSociete = $row['nomsociete'];
                            $prestation = $row['prestation'];
                            $prix = $row['prix'];
                            $limitationPointage = $row['limitpointage'];
                            $backgroundCard = $row['imgfond'];
                            $iconCard = $row['imgicon'];
                            $nombrePointageSociete = $row['nbpointage'];
                            $cadeauxEntreprise = $row['cadeaux'];
                            $prixCadeauxEntreprise = $row['prixcadeaux'];
        
                        }
        
                        $sqldeux = "SELECT * FROM `acctclient` WHERE `id` = '".$idClient."'";
                        if($resultdeux = mysqli_query($connect, $sqldeux))
                        {
        
                            while($raw = mysqli_fetch_assoc($resultdeux))
                            {
        
                                $nom = $raw['nom'];
                                $prenom = $raw['prenom'];
                                $client = $nom." ".$prenom;
                                $pointageTotal = $raw['nbpointagetotal'];
                                $nombrePointage = $raw['nbpointage'];
                                $nombreCarteTotal = $raw['nbcarteterminer'];
                                $pointBoutique = $raw['pointboutique'];
        
        
                            }
        
                            if($nombrePointage === $limitationPointage)
                            {
        
                                // 1 - On crée la carte de fidélité avec statut 1
                                mysqli_query($connect, "INSERT INTO `cartefidelite` (`id`, `idclient`, `datecreation`, `nom`, `prenom`, `nbpointage`, `limitpointage`, `statut`, `cadeaux`, `imgbackground`, `imgicon`, `qrcode`) VALUES (NULL, '".$idClient."', '".$date."', '".$nom."', '".$prenom."', '".$nombrePointage."', '".$limitationPointage."', '1', '".$prestation."', '".$backgroundCard."', '".$iconCard."', '".$qrcode."')");
        
                                // 2 - On sélectionne l'ID de la carte concerner avec le statut 1 c'est à dire non confirmer.
                                $resultsix = mysqli_query($connect, "SELECT * FROM `cartefidelite` WHERE `idclient` = '".$idClient."' AND `qrcode` = '".$qrcode."' AND `statut` = '1'");
                                while($rcw = mysqli_fetch_assoc($resultsix))
                                {
        
                                     $idCarte = $rcw['id'];   
        
                                    // 3 - On crée le cadeaux de fidélité.
                                    mysqli_query($connect, "INSERT INTO `fidcadeaux` (`id`, `idclient`, `idcarte`, `date`, `cadeaux`, `statut`, `datereceptioncadeaux`, `code`, `prix`) VALUES (NULL, '".$idClient."', '".$idCarte."', '".$datepointage."', '".$cadeauxEntreprise."', '2', '".$datepointage."', '".$qrcode."', '".$prixCadeauxEntreprise."')");
        
                                    // 4 - On update tous les pointages en liaison de la carte de fidélité
                                    mysqli_query($connect, "UPDATE `pointage` SET `idcarte` = '".$idCarte."', `statut` = '2' WHERE `identreprise` = '".$idEntreprise."' AND `idclient` = '".$idClient."' AND `statut` = '1' AND `code` = '".$qrcode."'");
        
                                    // 5 - On met à jour la carte de fidélité en statut '2'
                                    mysqli_query($connect, "UPDATE `cartefidelite` SET `statut` = '2' WHERE `idclient` = '".$idClient."' AND `qrcode` = '".$qrcode."'");
        
                                }
        
                                // 5 - On remet à jour le nombre de pointage de l'utilisateur à zero
                                mysqli_query($connect, "UPDATE `acctclient` SET `nbpointage` = '0', `nbcarteterminer` = $nombreCarteTotal + 1, `rating` = '1' WHERE `id` = '".$idClient."'");
        
                                // 6 - On reset quand même la prestation à Vide et valeur 0 €
        
                                mysqli_query($connect, "UPDATE `accsociete` SET `prestation` = 'Vide', `prix` = '0' WHERE `id` = '".$idEntreprise."'"); // RESET PRESTATION ENTREPRISE + AJOUT SCORE POINTAGE
        
                                $json = json_encode("#LIMITPOINTAGE#ATTEIND");
        
        
                            }
                            else
                            {
        
                                $sqltrois = "INSERT INTO `pointage` (`id`, `idcarte`, `identreprise`, `idclient`, `entreprise`, `departpointage`, `client`, `finpointage`, `statut`, `code`, `prestation`, `prix`) VALUES (NULL, '0', '".$idEntreprise."', '".$idClient."', '".$nomDeLaSociete."', '".$datepointage."', '".$client."', '".$datepointage."', '1', '".$qrcode."', '".$prestation."', '".$prix."')";
                                if(mysqli_query($connect, $sqltrois))
                                {
            
                                        mysqli_query($connect, "UPDATE `accsociete` SET `nbpointage` = $nombrePointageSociete + 1, `prestation` = 'Null', `prix` = '0' WHERE `id` = '".$idEntreprise."'"); // RESET PRESTATION ENTREPRISE + AJOUT SCORE POINTAGE
                                        mysqli_query($connect, "UPDATE `acctclient` SET `nbpointagetotal` = $pointageTotal + 1, `nbpointage` = $nombrePointage + 1, `rating` = '1' WHERE `id` = '".$idClient."'"); // AJOUT +1 AU POINTAGE TOTAL DU CLIENT
                                        mysqli_query($connect, "UPDATE `acctclient` SET `pointboutique` = $pointBoutique + 1 WHERE `id` = $idClient OR `idsouche` = $idClient");
                                        $json = json_encode("#PRODUCTPOINTAGE#SUCCESS");
            
            
                                }
                                else
                                {
        
                                    $json = json_encode("#PRODUCTPOINTAGE#FAILED");
            
                                }
        
        
                            }
        
        
        
                        }
                        else
                        {
        
                            $json = json_encode("#FINDCLTPOINTAGE#FAILED");
        
                        }
        
        
                    }
                    else
                    {
        
                        $json = json_encode("#CARTEFIDENT#DESACTIVE");
        
                    }
        
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'activeCarte':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "SELECT * FROM `accsociete` WHERE `id` = '".$idEntreprise."'";
                    
                    if($result = mysqli_query($connect, $sql))
                    {
        
                        while($row = mysqli_fetch_assoc($result))
                        {
        
                            $typeDeCompte = $row['typecompte'];
        
                        }
        
                        if($typeDeCompte === '0')
                        {
        
        
                            $json = json_encode("#ENABLEDCARD#UPGRADE");
        
        
                        }
                        else
                        {
        
                            $sqldeux = "UPDATE `accsociete` SET `activation` = '1' WHERE `id` = '".$idEntreprise."'";
        
                            if(mysqli_query($connect, $sqldeux))
                            {
                
                                $json = json_encode("#ENABLEDCARD#SUCCESS");
                
                
                            }
                            else
                            {
                
                                $json = json_encode("#ENABLEDCARD#FAILED");
                
                
                            }
        
        
                        }
        
        
                    }
                    else
                    {
        
                        $json = json_encode("#ENTREPRISE#NOEXIST");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'desactiveCarte':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "UPDATE `accsociete` SET `activation` = '0' WHERE `id` = '".$idEntreprise."'";
        
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#DISABLEDCARD#SUCCESS");
        
        
                    }
                    else
                    {
        
                        $json = json_encode("#DISABLEDCARD#FAILED");
        
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'voirDernierPointageCarte':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['id'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "SELECT * FROM `pointage` WHERE `identreprise` = '".$idEntreprise."' ORDER BY `id` DESC LIMIT 0, 10";
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
            
                        $json = json_encode("#LASTPOINTAGE#VIDE");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'notationClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
                    $idClient = $_GET['idclient'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
                    $score = $_GET['score'];
                    $score = mysqli_real_escape_string($connect, $score);
                    $date = $_GET['date'];
                    $date = mysqli_real_escape_string($connect, $date);
        
                    $sql = "INSERT INTO `notation` (`id`, `identreprise`, `idclient`, `score`, `basenotation`, `date`) VALUES (NULL, '".$idEntreprise."', '".$idClient."', '".$score."', '10', '".$date."')";
                    if(mysqli_query($connect, $sql))
                    {
        
                        $json = json_encode("#NOTATION#SUCCESS");
        
        
                    }
                    else
                    {
        
                        $json = json_encode("#NOTATION#FAILED");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'resetRatingClient':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idClient = $_GET['idclient'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);
        
                    $sql = "UPDATE `acctclient` SET `rating` = '0' WHERE `id` = '".$idClient."'";
                    if(mysqli_query($connect, $sql))
                    {
        
        
                        $json = json_encode("#RESETRATING#SUCCESS");
        
                    }
                    else
                    {
        
                        $json = json_encode("#RESETRATING#FAILED");
        
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'calculScoreEntreprise':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {

                    $idEntreprise = $_GET['identreprise'];
                    $idEntreprise = mysqli_real_escape_string($connect, $idEntreprise);
        
                    $sql = "SELECT SUM(`score`) AS score_total, SUM(`basenotation`) AS note_total
                    FROM `notation`
                    WHERE `identreprise` = '".$idEntreprise."'";
        
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
        
                        $json = json_encode("#ENTSCORE#VIDE");
        
                    }
        
                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

            mysqli_close($connect);

            break;
        case 'consultationArchiveFidelite':

            if(isset($_GET['apikey']))
            {

                $apikey = $_GET['apikey'];

                $globalSql = "SELECT * FROM `apikey` WHERE `apikey` = '".$apikey."'";
                $resultSql = mysqli_query($connect, $globalSql);
            
                if(mysqli_num_rows($resultSql))
                {
                    
                    $idClient = $_GET['idclient'];
                    $idClient = mysqli_real_escape_string($connect, $idClient);

                    $sql = "SELECT * FROM `cartefidelite` WHERE `idclient` = '".$idClient."' ORDER BY `id` DESC";
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

                        $json = json_encode("#LSTCARDFIDELITE#VIDE");

                    }

                    echo $json;

                }
                else
                {

                    $jsonKey = json_encode("#APIKEY#NOEXIST");
                    echo $jsonKey;

                }


            }

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