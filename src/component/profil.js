import React, { Component } from 'react';
import Menu from './menu'

import Footer from './footer'

import backgroundcarte from '../images/backgroundCarte.jpg';
import logocarte from '../images/logocarte.png';
import profil from '../images/profil.png';


class Profil extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            adresse: '',
            nomSociete: '',
            telephone: '',
            nbClient: '',
            limitClient: '',
            nbPointage: '',
            limitPointage: '',
            typeCompte: '',
            debutAbo: '',
            finAbo: '', 
            jRestants: '',
            imgFondCarte: '',
            imgIconCarte: ''
        }

    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        nom: value.nom,
                        prenom: value.prenom,
                        email: value.email,
                        adresse: value.adresse,
                        nomSociete: value.nomsociete,
                        telephone: value.telephone,
                        nbClient: value.nbclient,
                        limitClient: value.limitclient,
                        nbPointage: value.nbpointage,
                        limitPointage: value.limitpointage,
                        typeCompte: value.typecompte,
                        debutAbo: value.debutabo,
                        finAbo: value.finabo, 
                        jRestants: value.jrestant,
                        apikey: value.apikey,   
                        imgFondCarte: value.imgfond,
                        imgIconCarte: value.imgicon                     
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))


    }

    render() {
        return (

            <div>

            <Menu />

            <div className="panelInfo">
                
                <div className="container-perso">
                    <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
                </div>
            
            </div>   


            <div className="wellDashboardProfil">
                    
                    <h2>{this.state.nom}</h2>
                    {this.state.prenom}
                
                
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
                                <td align="center">{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Adresse</td>
                                <td  align="center">{this.state.adresse}</td>
                            </tr>
                            <tr>
                                <td>Nom de la société</td>
                                <td  align="center">{this.state.nomSociete}</td>
                            </tr>
                            <tr>
                                <td>Numéro de téléphone</td>
                                <td  align="center">{this.state.telephone}</td>
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
                                <td align="center">{this.state.typeCompte}</td>
                            </tr>
                            <tr>
                                <td>Limite de client</td>
                                <td  align="center">{this.state.nbClient} / {this.state.limitClient}</td>
                            </tr>
                            <tr>
                                <td>Limite de pointage</td>
                                <td  align="center">{this.state.nbPointage} / {this.state.limitPointage}</td>
                            </tr>
                            <tr>
                                <td>Début abonnement</td>
                                <td  align="center">{this.state.debutAbo}</td>
                            </tr>
                            <tr>
                                <td>Fin abonnement</td>
                                <td  align="center">{this.state.finAbo}</td>
                            </tr>
                            <tr>
                                <td>Jours restant</td>
                                <td  align="center">{this.state.jRestants}</td>
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
                                    <img src={'http://localhost:3000/images/' + this.state.imgFondCarte} className="img-responsive" id="img1" alt="" />
                                    <img src={'http://localhost:3000/images/' + this.state.imgIconCarte}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                                    
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
                                        <td align="center">{this.state.imgFondCarte}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Logo ( 100x100 )</b></td>
                                        <td align="center">{this.state.imgIconCarte}</td>
                                    </tr>
                                    </tbody>
                                </table>                            
                            
                            
                            
                            </div>                                                  
                        
                        </div>


                </div>
                </div> 
            </div>

            <Footer />

            </div>


        );
    }
}

export default Profil;