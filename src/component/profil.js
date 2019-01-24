import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
            imgIconCarte: '',

            selectedFileBKG : null,
            selectedFileLogo : null,
            statutUpload: ''

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

    fileSelect = event => {
        this.setState({selectedFileBKG: event.target.files[0]})
        console.log(event.target.files[0])
    }

    fileUpload = () => {

        const fd = new FormData();
        fd.append('image', this.state.selectedFileBKG, this.state.selectedFileBKG.name);
        axios.post('http://127.0.0.1/fidapi/main.php?action=uploadBackgroundImg&id=' + this.props.idUserRecup, fd
        ).then(res=>
        {
            console.log(res);

            if(res.data === "#MAJBKGCARTE#SUCCESS")
            {

                this.setState({
                    statutUpload: '1'
                })

            }
            else if (res.data === "#MAJBKGCARTE#FAILED") {

                this.setState({
                    statutUpload: '2'
                })

            }
            else if (res.data === "#UPLOADCARTE#FAILED") {
         
                this.setState({
                    statutUpload: '3'
                })
                
            }
            else if (res.data === "#UPLOADIMENSION#FAILED") {
         
                this.setState({
                    statutUpload: '4'
                })
                
            }   

            setTimeout(() => window.location.href = "/profil", 2500)

        }
        );
        
    }

    fileSelectLogo = event => {
        this.setState({selectedFileLogo: event.target.files[0]})
        console.log(event.target.files[0])
    }

    fileUploadLogo = () => {

        const fd = new FormData();
        fd.append('image', this.state.selectedFileLogo, this.state.selectedFileLogo.name);
        axios.post('http://127.0.0.1/fidapi/main.php?action=uploadLogoImg&id=' + this.props.idUserRecup, fd
        ).then(res=>
        {
            console.log(res);

            if (res.data === "#EXTLOGOUPLOAD#FAILED") {
         
                this.setState({
                    statutUpload: '5'
                })
                
            }
            else if (res.data === "#MAJLOGOCARTE#SUCCESS") {
         
                this.setState({
                    statutUpload: '6'
                })
                
            }
            else if (res.data === "#MAJLOGOCARTE#FAILED") {
         
                this.setState({
                    statutUpload: '7'
                })
                
            }
            else if (res.data === "#UPLOADLOGOCARTE#SUCCESS") {
         
                this.setState({
                    statutUpload: '8'
                })
                
            }
            else if (res.data === "#UPLOADIMENSIONLOGO#FAILED") {
         
                this.setState({
                    statutUpload: '9'
                })
                
            }

            setTimeout(() => window.location.href = "/profil", 2500)

        }
        );
        
    }

    afficheStatutCarte()
    {

        if(this.state.statutUpload === "1")
        {


            return <div className="msgSuccessPerso">
        
            <center>Le design de votre carte a bien été changer. Patientez...</center>
    
            </div>


        }
        else if (this.state.statutUpload === "2") {
            
            return <div className="msgErrorPerso">
        
            <center>Le design de votre carte n'a pas été changer. Patientez...</center>
    
            </div>

        }
        else if (this.state.statutUpload === "3") {
            
            return <div className="msgErrorPerso">
        
            <center>Les dimensions de votre image ne sont pas bonne. (Dimensions requises : 600 x 300)</center>
    
            </div>

        }
        else if (this.state.statutUpload === "4") {
            
            return <div className="msgErrorPerso">
        
            <center>Les dimensions de votre image ne sont pas bonne. (Dimensions requises : 600 x 300)</center>
    
            </div>

        }
        else if (this.state.statutUpload === "5") {
            
            return <div className="msgErrorPerso">
        
            <center>L'extension du logo n'est pas correct. Extension autorisée : PNG.</center>
    
            </div>

        }
        else if (this.state.statutUpload === "6") {
            
            return <div className="msgSuccessPerso">
        
            <center>La mise à jour du logo a bien été effectuer.</center>
    
            </div>

        }
        else if (this.state.statutUpload === "7") {
            
            return <div className="msgSuccessPerso">
        
            <center>La mise à jour du logo n'a pas été effectuer.</center>
    
            </div>

        }
        else if (this.state.statutUpload === "8") {
            
            return <div className="msgSuccessPerso">
        
            <center>L'upload du logo a bien été effectuer.</center>
    
            </div>

        }
        else if (this.state.statutUpload === "9") {
            
            return <div className="msgErrorPerso">
        
            <center>Les dimensions du logo ne sont pas bonne. Dimensions autorisée : 100X100.</center>
    
            </div>

        }


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
                                        <button class="btn btn-greenbutton btn-block" type="submit">Je m'abonne</button>
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
                                        <button class="btn btn-greenbutton btn-block" type="submit">Je m'abonne</button>
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
                    {this.afficheStatutCarte()}
                    <br/>
                        <div className="row">
                        
                            <div className="col-xs-6">
                            
                                <div className="panelCarte">
                                    <div id="personalizecarte">  
                                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.imgFondCarte} className="img-responsive" id="img1" alt="" />
                                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.imgIconCarte}  className="img-responsive img-rounded" id="img2" alt="" />
                                    
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
                                        <td><input type="file" onChange = {this.fileSelect} /></td>
                                        <td align="center"><button class="btn btn-greenbutton btn-block" onClick = {this.fileUpload} type="submit">J'upload</button></td>
                                    </tr>
                                    <tr>
                                        <td><b>Logo ( 100x100 )</b></td>
                                        <td align="center">{this.state.imgIconCarte}</td>
                                    </tr>
                                    <tr>
                                        <td><input type="file" onChange = {this.fileSelectLogo} /></td>
                                        <td align="center"><button class="btn btn-greenbutton btn-block" onClick = {this.fileUploadLogo} type="submit">J'upload</button></td>
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