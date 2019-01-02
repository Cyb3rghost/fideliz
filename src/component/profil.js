import React, { Component } from 'react';
import Menu from './menu'


import backgroundcarte from '../images/backgroundCarte.jpg';
import logocarte from '../images/logocarte.png';
import profil from '../images/profil.png';
<<<<<<< HEAD
<<<<<<< HEAD

class Profil extends Component {

=======
import carnet from '../images/carnet.png';
<<<<<<< HEAD
import userClient from '../images/adduser.png';
=======
>>>>>>> Creation api / fonctionnement inscription et connexion


class Profil extends Component {

<<<<<<< HEAD
    renderPanelTitle()
    {

        switch (window.location.pathname) {
            case '/dashboard':
                return <h2><img src={dashboard} width="70" height="70" alt="Responsive image"/> DASHBOARD</h2>
                break;
            case '/profil':
                return <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
                break; 
            case '/client':
                return <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
                break;   
            case '/voirclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> FICHE CLIENT</h2>
                break;     
            case '/nouveauclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
                break;  
            case '/modifclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> MODIFICATION CLIENT</h2>
                break; 
<<<<<<< HEAD
=======
=======
                break;      
            default:
                break;
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
        }

    }
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
=======
>>>>>>> Creation api / fonctionnement inscription et connexion

    render() {
        return (

            <div id="wrapper">
          
<<<<<<< HEAD
        <Menu />

        <nav className="navbar navbar-inverse">
=======
            <Menu />

            <nav className="navbar navbar-inverse">
>>>>>>> Creation api / fonctionnement inscription et connexion
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#"></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
            </nav>
            <div className="panelInfo">
                
                <div className="container-perso">
                    <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
                </div>
            
<<<<<<< HEAD
            <div className="container-perso">
                <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
            </div>
        
        </div>         
=======
            </div>   
>>>>>>> Creation api / fonctionnement inscription et connexion


            <div className="wellDashboardProfil">
                    
                    <h2>LEVENEUR</h2>
                    Ludovic
                
                
            </div>


            <div className="container-perso">
                    <div className="panel panel-default">

                    <div className="panel-heading">INFORMATIONS SUR VOTRE PROFIL</div>
                        <div className="">
                        
                        <table className="table table-striped">
                            <thead>
                        
                            </thead>
                            <tbody>
                            <tr>
                                <td>Email</td>
                                <td align="center">ludovic.lvnr@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Adresse</td>
                                <td  align="center">56 Bis Chemin du ruisseau 97421 La rivière</td>
                            </tr>
                            <tr>
                                <td>Nom de la société</td>
                                <td  align="center">FIDELIZ</td>
                            </tr>
                            <tr>
                                <td>Numéro de téléphone</td>
                                <td  align="center">0692.72.93.22</td>
                            </tr>

                            </tbody>
                        </table>
                        
                        
                        </div>


                    </div>
            </div>

            <div className="container-perso">
                    <div className="panel panel-default">

                    <div className="panel-heading">INFORMATIONS SUR VOTRE COMPTE</div>
                        <div className="">
                        
                        <table className="table table-striped">
                            <thead>
                        
                            </thead>
                            <tbody>
                            <tr>
                                <td>Type de compte</td>
                                <td align="center">Standard (ou premium)</td>
                            </tr>
                            <tr>
                                <td>Limite de client</td>
                                <td  align="center">5 / 10</td>
                            </tr>
                            <tr>
                                <td>Limite de pointage</td>
                                <td  align="center">21 / 40</td>
                            </tr>
                            <tr>
                                <td>Début abonnement</td>
                                <td  align="center">03/12/2018</td>
                            </tr>
                            <tr>
                                <td>Fin abonnement</td>
                                <td  align="center">05/12/2018</td>
                            </tr>
                            <tr>
                                <td>Jours restant</td>
                                <td  align="center">2</td>
                            </tr>

                            </tbody>
                        </table>

                        <div className="container-perso">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="panel panel-default">
                                    <div class="panel-heading">FORMULE MENSUELLE</div>
                                    <div class="panel-body">
                                        <table class="table table-striped">
                                                <thead>
                                                    <tr></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <td><b>Limite de client</b></td>
                                                    <td align="center">Illimité</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Limite de pointage</b></td>
                                                        <td align="center">Illimité</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Prix :</b></td>
                                                        <td align="center">6.99 € / Mois</td>
                                                    </tr>
                                                </tbody>
                                        </table>
                                        <button class="btn btn-loginConnexion btn-block" type="submit">Je m'abonne</button>
                                    </div>
                                    </div>
                                    </div>
                                <div class="col-xs-6">
                                    <div class="panel panel-default">
                                    <div class="panel-heading">FORMULE ANNUELLE</div>
                                    <div class="panel-body">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td><b>Limite de client</b></td>
                                                <td align="center">Illimité</td></tr>
                                            <tr>
                                                <td><b>Limite de pointage</b></td>
                                                <td align="center">Illimité</td>
                                            </tr>
                                            <tr>
                                                <td><b>Prix :</b></td>
                                                <td align="center">69.90 € / Ans (2 mois offert)</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <button class="btn btn-loginConnexion btn-block" type="submit">Je m'abonne</button>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                        
                        
                        </div>


                    </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">INFORMATIONS SUR LA CARTE</div>
                <div className="panel-body">

                        <div className="row">
                        
                            <div className="col-xs-6">
                            
                                <div className="panelCarte">
                                    <div id="personalizecarte">  
                                    <img src={backgroundcarte} className="img-responsive" id="img1" alt="" />
                                    <img src={logocarte} width="100" height="100" id="img2" className="img-rounded" alt="" />
                                    
                                    </div> 
                                </div>                                                                 
                            
                            </div>
                            <div className="col-xs-6">
                            
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b>Image de fond ( 600 x 300 )</b></td>
                                        <td align="center"><input type="file" id="exampleInputFile" /></td>
                                    </tr>
                                    <tr>
                                        <td><b>Logo ( 100x100 )</b></td>
                                        <td align="center"><input type="file" id="exampleInputFile" /></td>
                                    </tr>
                                    </tbody>
                                </table>                            
                            
                            
                            
                            </div>                                                  
                        
                        </div>


                </div>
                </div> 
            </div>



            </div>


        );
    }
}

export default Profil;