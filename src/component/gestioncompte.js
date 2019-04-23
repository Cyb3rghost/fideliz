import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Menu from './menu'
import Footer from './footer'

class Gestioncompte extends Component {

    constructor(props){

        super(props)
        this.state = {
            gestionInterface: '1',
            starterPrix: '9.99',
            starterStatut: 'Mensuel',
            starterLimitClient: '75',
            ProfessionalPrix: '19.99',
            ProfessionalStatut: 'Mensuel',
            ProfessionalLimitClient: '125',
            ExpertPrix: '29.99',
            ExpertStatut: 'Mensuel',
            ExpertLimitClient: '225',
            statutMode: '1',
            loading: true
        }

    }

    checkPaiement()
    {

        var md5 = require('md5');

        md5("secureTransaction" + this.props.idUserRecup + "Transactionsecure")

        if(this.props.match.params.eventpaiement === "success" && md5("secureTransaction" + this.props.match.params.identreprise + "Transactionsecure") === this.props.match.params.secure)
        {

            if(this.props.match.params.mode === "2")
            {

                switch (this.props.match.params.abonnement) {
                    case 'bronze':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzeannuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.starterPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOBRONZEANN#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '1'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOBRONZEANN#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '2'
                                })  
                
                            }
                        })
                        .catch(err => console.error(err))
                        break;
                    case 'argent':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentannuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.ProfessionalPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOARGENTANN#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '3'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOARGENTANN#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '4'
                                })  
                
                            }
                
                
                
                
                        })
                        .catch(err => console.error(err))
                        break;
                    case 'or':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeorannuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.ExpertPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOORANN#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '5'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOORANN#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '6'
                                })  
                
                            }
                
                        })
                        .catch(err => console.error(err))
                        break;
                    default:
                        break;
                }

            }
            else if(this.props.match.params.mode === "1")
            {

                switch (this.props.match.params.abonnement) {
                    case 'bronze':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzemensuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.starterPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOBRONZE#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '7'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOBRONZE#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '8'
                                })  
                
                            }
                        })
                        .catch(err => console.error(err))
                        break;
                    case 'argent':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentmensuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.ProfessionalPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOARGENT#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '9'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOARGENT#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '10'
                                })  
                
                            }
                
                
                
                
                        })
                        .catch(err => console.error(err))
                        break;
                    case 'or':
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeormensuel&id=' + this.props.idUserRecup
                        + '&limitationclient=' + this.props.match.params.limitationclient
                        + '&prix=' + this.state.ExpertPrix
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            console.log(response)
                            
                            if(response === "#ABOOR#SUCCESS")
                            {
                
                                this.setState({
                                    statutAbonnement: '11'
                                })
                
                                setTimeout(() => window.location.href = "/dashboard",2500)
                
                            }
                            else if (response === "#ABOOR#FAILED") {
                            
                                this.setState({
                                    statutAbonnement: '12'
                                })  
                
                            }
                
                        })
                        .catch(err => console.error(err))
                        break;
                    default:
                        break;
                }


            }


        }
        else if(this.props.match.params.eventpaiement === "annulation")
        {


            return <div className="alert alert-danger">

                <center>Finalisation transaction non sécurisée.</center>

            </div>


        }
                                                        

    }

    commandeBronzeMensuel()
    {

        if(this.state.statutMode === '2')
        {

            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=2&abonnement=bronze"
            + "&limitationclient=" + this.state.starterLimitClient
            + "&prix=" + this.state.starterPrix)

            /*console.log("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=2&abonnement=bronze"
            + "&limitationclient=" + this.state.starterLimitClient
            + "&prix=" + this.state.starterPrix)*/

        }
        else if(this.state.statutMode === '1')
        {


            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=1&abonnement=bronze"
            + "&limitationclient=" + this.state.starterLimitClient
            + "&prix=" + this.state.starterPrix)

            /*console.log("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=1&abonnement=bronze"
            + "&limitationclient=" + this.state.starterLimitClient
            + "&prix=" + this.state.starterPrix)*/

        }

    }

    
    commandeArgentMensuel()
    {

        if(this.state.statutMode === '2')
        {

            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=2&abonnement=argent"
            + "&limitationclient=" + this.state.ProfessionalLimitClient
            + "&prix=" + this.state.ProfessionalPrix)

        }
        else if(this.state.statutMode === '1')
        {

            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=1&abonnement=argent"
            + "&limitationclient=" + this.state.ProfessionalLimitClient
            + "&prix=" + this.state.ProfessionalPrix)

        }

    }

    commandeOrMensuel()
    {

        if(this.state.statutMode === '2')
        {

            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=2&abonnement=or"
            + "&limitationclient=" + this.state.ExpertLimitClient
            + "&prix=" + this.state.ExpertPrix)

        }
        else if(this.state.statutMode === '1')
        {

            window.open("https://www.lvnweb.re/fideliz/fidapi/main.php?action=paiementPayPlug&identreprise=" + this.props.idUserRecup 
            + "&mode=1&abonnement=or"
            + "&limitationclient=" + this.state.ExpertLimitClient
            + "&prix=" + this.state.ExpertPrix)

        }

    }

    afficheStatutAbonnement()
    {


        if(this.state.statutAbonnement === '1')
        {

            return <div className="alert alert-success" role="alert">
                L'achat du grade bronze a bien été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '2') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade bronze n'a pas été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '3') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade argent a bien été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '4') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade argent n'a pas été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '5') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or a bien été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '6') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or n'a pas été pris en compte. Patientez... (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '7') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade bronze a bien été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '8') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade bronze n'a pas été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '9') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade argent a bien été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '10') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade argent n'a pas été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '11') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or a bien été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '12') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or n'a pas été pris en compte. Patientez... (30 Jours disponibles)
            </div>

        }


    }

    getModeStarter(event)
    {

        console.log(event.target.value)
        
        if(event.target.value === 'Mensuel')
        {

            this.setState({
                starterPrix: '9.99',
                starterStatut: event.target.value,
                starterLimitClient: '75'
            })

            console.log(this.state.starterLimitClient)

        }
        else if(event.target.value === 'Annuel')
        {

            this.setState({
                starterPrix: '9.99' * 11,
                starterStatut: event.target.value,
                starterLimitClient: '100',
                statutMode: '2'
            })

            console.log(this.state.starterLimitClient)

        }

    }

    getModeProfessionnal(event)
    {

        console.log(event.target.value)
        
        if(event.target.value === 'Mensuel')
        {

            this.setState({
                ProfessionalPrix: '19.99',
                ProfessionalStatut: event.target.value,
                ProfessionalLimitClient: '125'
            })

            console.log(this.state.ProfessionalLimitClient)

        }
        else if(event.target.value === 'Annuel')
        {

            this.setState({
                ProfessionalPrix: '19.99' * 11,
                ProfessionalStatut: event.target.value,
                ProfessionalLimitClient: '150',
                statutMode: '2'
            })

            console.log(this.state.ProfessionalLimitClient)

        }

    }

    getModeExpert(event)
    {

        console.log(event.target.value)
        
        if(event.target.value === 'Mensuel')
        {

            this.setState({
                ExpertPrix: '29.99',
                ExpertStatut: event.target.value,
                ExpertLimitClient: '225'
            })

        }
        else if(event.target.value === 'Annuel')
        {

            this.setState({
                ExpertPrix: '29.99' * 11,
                ExpertStatut: event.target.value,
                ExpertLimitClient: '250',
                statutMode: '2'
            })

        }

    }

    render() {

        let loadingdata;
        if(this.state.loading)
        {
    
            loadingdata = <div>
    
                                <div className="container-fluid">
    
    
                                    <div className="row">
    
                                        <div className="col-md-12">
    
                                                    <div>
                                                        <div className="headerTitle">
    
                                                            FORMULE D'ABONNEMENT
    
                                                        </div>
                                                        {this.checkPaiement()}
                                                        
                                                        {this.afficheStatutAbonnement()}
                                                        <div className="card card-body bg-white">
    
                                                        <div className="mb-5 mt-5">
                                                            <div className="pricing card-deck flex-column flex-md-row mb-3">
                                                                <div className="card card-pricing text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Starter Royalty <br/> <i className="fas fa-star"></i> Bronze <i className="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15">€<span className="price">{this.state.starterPrix}</span><span className="h6 text-muted ml-2"> / <select onChange={this.getModeStarter.bind(this)} value={this.state.starterStatut} className="form-control-sm">
                                                                                <option value="Mensuel">Mensuel</option>
                                                                                <option value="Annuel">Annuel</option>
                                                                            </select>
                                                                            </span>
                                                                        </h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i className="fas fa-check"></i> Limitation client : {this.state.starterLimitClient}</li>
                                                                            <li><i className="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i className="fas fa-check"></i> Gestion client</li>
                                                                            <li><i className="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i className="fas fa-check"></i> Gestion carte</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeBronzeMensuel.bind(this)} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                                <div className="card card-pricing popular shadow text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Professional Royalty <br/> <i className="fas fa-star"></i> Argent <i className="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="30">€<span className="price">{this.state.ProfessionalPrix}</span><span className="h6 text-muted ml-2"> / <select onChange={this.getModeProfessionnal.bind(this)} value={this.state.ProfessionalStatut} className="form-control-sm">
                                                                                <option>Mensuel</option>
                                                                                <option>Annuel</option>
                                                                            </select>
                                                                            </span>
                                                                        </h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i className="fas fa-check"></i> Limitation client : {this.state.ProfessionalLimitClient}</li>
                                                                            <li><i className="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i className="fas fa-check"></i> Gestion client</li>
                                                                            <li><i className="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i className="fas fa-check"></i> Gestion carte</li>
                                                                            <li><i className="fas fa-check"></i> Support technique / client</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeArgentMensuel.bind(this)} className="btn btn-primary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                                <div className="card card-pricing text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Expert Royalty <br/> <i className="fas fa-star"></i> Or <i className="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="45">€<span className="price">{this.state.ExpertPrix}</span><span className="h6 text-muted ml-2"> / <select onChange={this.getModeExpert.bind(this)} value={this.state.ExpertStatut} className="form-control-sm">
                                                                                <option>Mensuel</option>
                                                                                <option>Annuel</option>
                                                                            </select>
                                                                            </span>
                                                                        </h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i className="fas fa-check"></i> Limitation client : {this.state.ExpertLimitClient}</li>
                                                                            <li><i className="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i className="fas fa-check"></i> Gestion client</li>
                                                                            <li><i className="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i className="fas fa-check"></i> Gestion carte</li>
                                                                            <li><i className="fas fa-check"></i> Support technique / client</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeOrMensuel.bind(this)} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
    
                                                    </div>
                                                    
    
    
                                                    </div>
  
                                        <br/>
    
                                        </div>
    
    
                                    </div>    
    
    
    
                                </div>
    
    
            </div>
        
        }
        else
        {
    
            loadingdata =  <div className="styleLoader"><center><Loader 
                                type="Triangle"
                                color="#00BFFF"
                                height="100"	
                                width="100"
                            /> </center></div>
    
        }
    
        return (
          <div>
    
                <div id="wrapper">
    
                    
    
                    <div id="content-wrapper" className="d-flex flex-column">
    
                    <div id="content">

                        <Menu title="Gestion des abonnements" />
    
                        {loadingdata}
    
                    </div>
    
                    <Footer />
    
                    </div>
    
                </div>
    
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
    
          </div>
        );
      }
    }
    
    export default Gestioncompte;
    