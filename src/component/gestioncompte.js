import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Navbarup from './navbarup'
import Wallet from '../images/walletabo.png'
import Prestations from '../images/prestations.png'

import Menu from './menu'

class Gestioncompte extends Component {

    constructor(props){

        super(props)
        this.state = {
            gestionInterface: '1',
            
            /* Gestion partie abonnement */
            statutAbonnement: '0',
            loading: true

            /* Gestion partie abonnement */
        }

    }

    commandeBronzeMensuel(statutabo)
    {

        if(statutabo === '1')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzeannuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOBRONZEANN#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '7'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOBRONZEANN#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '8'
                    })  
    
                }
            })
            .catch(err => console.error(err))

        }
        else
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzemensuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOBRONZE#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '1'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOBRONZE#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '2'
                    })  
    
                }
            })
            .catch(err => console.error(err))

        }


    }

    
    commandeArgentMensuel(statutabo)
    {

        if(statutabo === '1')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentannuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOARGENTANN#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '9'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOARGENTANN#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '10'
                    })  
    
                }
    
    
    
    
            })
            .catch(err => console.error(err))


        }
        else
        {


            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentmensuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOARGENT#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '3'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOARGENT#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '4'
                    })  
    
                }
    
    
    
    
            })
            .catch(err => console.error(err))


        }




    }

    commandeOrMensuel(statutabo)
    {

        if(statutabo === '1')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeorannuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOORANN#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '11'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOORANN#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '12'
                    })  
    
                }
    
    
    
    
            })
            .catch(err => console.error(err))


        }
        else
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeormensuel&id=' + this.props.idUserRecup)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
                
                if(response === "#ABOOR#SUCCESS")
                {
    
                    this.setState({
                        statutAbonnement: '5'
                    })
    
                    setTimeout(() => window.location.href = "/dashboard",2500)
    
                }
                else if (response === "#ABOOR#FAILED") {
                  
                    this.setState({
                        statutAbonnement: '6'
                    })  
    
                }
    
    
    
    
            })
            .catch(err => console.error(err))



        }



    }

    afficheStatutAbonnement()
    {


        if(this.state.statutAbonnement === '1')
        {

            return <div className="alert alert-success" role="alert">
                L'achat du grade bronze a bien été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '2') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade bronze n'a pas été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '3') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade argent a bien été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '4') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade argent n'a pas été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '5') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or a bien été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '6') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade Or n'a pas été pris en compte. (30 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '7') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Bronze a bien été pris en compte. (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '8') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade Bronze n'a pas été pris en compte. (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '9') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Argent a bien été pris en compte. (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '10') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade Argent n'a pas été pris en compte. (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '11') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or a bien été pris en compte. (365 Jours disponibles)
            </div>

        }
        else if (this.state.statutAbonnement === '12') 
        {
          
            return <div className="alert alert-danger" role="alert">
                L'achat du grade Or n'a pas été pris en compte. (365 Jours disponibles)
            </div>

        }
        

    }

    render() {

        let loadingdata;
        if(this.state.loading)
        {
    
            loadingdata = <div>
    
                                <Navbarup idEntreprise={this.props.idUserRecup} />
    
                                <div className="container-fluid">
    
    
                                    <div className="row">
    
                                        <div className="col-md-12">
    
                                                    <div>
                                                        <div className="headerTitle">
    
                                                            FORMULE D'ABONNEMENT MENSUEL
    
                                                        </div>
                                                        {this.afficheStatutAbonnement()}
                                                        <div class="card card-body bg-white">
    
                                                        <div className="mb-5 mt-5">
                                                            <div className="pricing card-deck flex-column flex-md-row mb-3">
                                                                <div className="card card-pricing text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Starter Royalty <br/> <i class="fas fa-star"></i> Bronze <i class="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15">€<span className="price">9.99</span><span className="h6 text-muted ml-2">/ par mois</span></h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i class="fas fa-check"></i> Gestion client</li>
                                                                            <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                            <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeBronzeMensuel.bind(this)} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                                <div className="card card-pricing popular shadow text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Professional Royalty <br/> <i class="fas fa-star"></i> Argent <i class="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="30">€<span className="price">19.99</span><span className="h6 text-muted ml-2">/ par mois</span></h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i class="fas fa-check"></i> Accès carte de réduction</li>
                                                                            <li><i class="fas fa-check"></i> Gestion client</li>
                                                                            <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                            <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                            <li><i class="fas fa-check"></i> Support technique / client</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeArgentMensuel.bind(this)} className="btn btn-primary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                                <div className="card card-pricing text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Expert Royalty <br/> <i class="fas fa-star"></i> Or <i class="fas fa-star"></i></span>
                                                                    <div className="bg-transparent card-header pt-4 border-0">
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="45">€<span className="price">29.99</span><span className="h6 text-muted ml-2">/ par mois</span></h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                            <li><i class="fas fa-check"></i> Accès carte de réduction</li>
                                                                            <li><i class="fas fa-check"></i> Accès carte de cadeaux</li>
                                                                            <li><i class="fas fa-check"></i> Gestion client</li>
                                                                            <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                            <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                            <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                            <li><i class="fas fa-check"></i> Support technique / client</li>
                                                                        </ul>
                                                                        <button type="button" onClick={this.commandeOrMensuel.bind(this)} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
    
                                                    </div>
                                                    <div className="headerTitle">
    
                                                    FORMULE D'ABONNEMENT ANNUEL
    
                                                    </div>
    
                                                    <div class="card card-body bg-white">
    
                                                        <div className="mb-5 mt-5">
                                                                <div className="pricing card-deck flex-column flex-md-row mb-3">
                                                                    <div className="card card-pricing text-center px-3 mb-4">
                                                                        <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Starter Royalty <br/> <i class="fas fa-star"></i> Bronze <i class="fas fa-star"></i></span>
                                                                        <div className="bg-transparent card-header pt-4 border-0">
                                                                            <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15">€<span className="price">109.89</span><span className="h6 text-muted ml-2">/ par an</span></h1>
                                                                        </div>
                                                                        <div className="card-body pt-0">
                                                                            <ul className="list-unstyled mb-4">
                                                                                <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                                <li><i class="fas fa-check"></i> Gestion client</li>
                                                                                <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                                <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                                <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                            </ul>
                                                                            <button type="button" onClick={() => this.commandeBronzeMensuel('1')} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-pricing popular shadow text-center px-3 mb-4">
                                                                        <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Professional Royalty <br/> <i class="fas fa-star"></i> Argent <i class="fas fa-star"></i></span>
                                                                        <div className="bg-transparent card-header pt-4 border-0">
                                                                            <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="30">€<span className="price">219.89</span><span className="h6 text-muted ml-2">/ par an</span></h1>
                                                                        </div>
                                                                        <div className="card-body pt-0">
                                                                            <ul className="list-unstyled mb-4">
                                                                                <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                                <li><i class="fas fa-check"></i> Accès carte de réduction</li>
                                                                                <li><i class="fas fa-check"></i> Gestion client</li>
                                                                                <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                                <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                                <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                                <li><i class="fas fa-check"></i> Support technique / client</li>
                                                                            </ul>
                                                                            <button type="button" onClick={() => this.commandeArgentMensuel('1')} className="btn btn-primary mb-3">Commandez maintenant</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-pricing text-center px-3 mb-4">
                                                                        <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Expert Royalty <br/> <i class="fas fa-star"></i> Or <i class="fas fa-star"></i></span>
                                                                        <div className="bg-transparent card-header pt-4 border-0">
                                                                            <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="45">€<span className="price">329.89</span><span className="h6 text-muted ml-2">/ par an</span></h1>
                                                                        </div>
                                                                        <div className="card-body pt-0">
                                                                            <ul className="list-unstyled mb-4">
                                                                                <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
                                                                                <li><i class="fas fa-check"></i> Accès carte de réduction</li>
                                                                                <li><i class="fas fa-check"></i> Accès carte de cadeaux</li>
                                                                                <li><i class="fas fa-check"></i> Gestion client</li>
                                                                                <li><i class="fas fa-check"></i> Gestion pointage</li>
                                                                                <li><i class="fas fa-check"></i> Gestion carte</li>
                                                                                <li><i class="fas fa-check"></i> Gestion planning</li>
                                                                                <li><i class="fas fa-check"></i> Support technique / client</li>
                                                                            </ul>
                                                                            <button type="button" onClick={() => this.commandeOrMensuel('1')} className="btn btn-outline-secondary mb-3">Commandez maintenant</button>
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
    
                    <Menu />
    
                    <div id="content-wrapper" className="d-flex flex-column">
    
                    <div id="content">
    
                        {loadingdata}
    
                    </div>
    
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2019</span>
                        </div>
                        </div>
                    </footer>
    
                    </div>
    
                </div>
    
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
    
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                    </div>
                </div>
    
          </div>
        );
      }
    }
    
    export default Gestioncompte;
    