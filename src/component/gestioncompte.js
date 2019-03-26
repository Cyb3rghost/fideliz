import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Menu from './menu'

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

    commandeBronzeMensuel()
    {

        if(this.state.statutMode === '2')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzeannuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.starterLimitClient
            + '&prix=' + this.state.starterPrix)
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


        }
        else if(this.state.statutMode === '1')
        {


            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandebronzemensuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.starterLimitClient
            + '&prix=' + this.state.starterPrix)
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

    
    commandeArgentMensuel()
    {

        if(this.state.statutMode === '2')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentannuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.ProfessionalLimitClient
            + '&prix=' + this.state.ProfessionalPrix)
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


        }
        else if(this.state.statutMode === '1')
        {


            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeargentmensuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.ProfessionalLimitClient
            + '&prix=' + this.state.ProfessionalPrix)
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

    commandeOrMensuel()
    {

        if(this.state.statutMode === '2')
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeorannuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.ExpertLimitClient
            + '&prix=' + this.state.ExpertPrix)
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


        }
        else if(this.state.statutMode === '1')
        {


            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=commandeormensuel&id=' + this.props.idUserRecup
            + '&limitationclient=' + this.state.ExpertLimitClient
            + '&prix=' + this.state.ExpertPrix)
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
        else if (this.state.statutAbonnement === '5') 
        {
          
            return <div className="alert alert-success" role="alert">
                L'achat du grade Or a bien été pris en compte. (30 Jours disponibles)
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

        }
        else if(event.target.value === 'Annuel')
        {

            this.setState({
                starterPrix: '9.99' * 11,
                starterStatut: event.target.value,
                starterLimitClient: '100',
                statutMode: '2'
            })

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

        }
        else if(event.target.value === 'Annuel')
        {

            this.setState({
                ProfessionalPrix: '19.99' * 11,
                ProfessionalStatut: event.target.value,
                ProfessionalLimitClient: '150',
                statutMode: '2'
            })

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
    
                                                            FORMULE D'ABONNEMENT MENSUEL
    
                                                        </div>
                                                        {this.afficheStatutAbonnement()}
                                                        <div class="card card-body bg-white">
    
                                                        <div className="mb-5 mt-5">
                                                            <div className="pricing card-deck flex-column flex-md-row mb-3">
                                                                <div className="card card-pricing text-center px-3 mb-4">
                                                                    <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Starter Royalty <br/> <i class="fas fa-star"></i> Bronze <i class="fas fa-star"></i></span>
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
                                                                            <li><i class="fas fa-check"></i> Limitation client : {this.state.starterLimitClient}</li>
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
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="30">€<span className="price">{this.state.ProfessionalPrix}</span><span className="h6 text-muted ml-2"> / <select onChange={this.getModeProfessionnal.bind(this)} value={this.state.ProfessionalStatut} className="form-control-sm">
                                                                                <option>Mensuel</option>
                                                                                <option>Annuel</option>
                                                                            </select>
                                                                            </span>
                                                                        </h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i class="fas fa-check"></i> Limitation client : {this.state.ProfessionalLimitClient}</li>
                                                                            <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
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
                                                                        <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="45">€<span className="price">{this.state.ExpertPrix}</span><span className="h6 text-muted ml-2"> / <select onChange={this.getModeExpert.bind(this)} value={this.state.ExpertStatut} className="form-control-sm">
                                                                                <option>Mensuel</option>
                                                                                <option>Annuel</option>
                                                                            </select>
                                                                            </span>
                                                                        </h1>
                                                                    </div>
                                                                    <div className="card-body pt-0">
                                                                        <ul className="list-unstyled mb-4">
                                                                            <li><i class="fas fa-check"></i> Limitation client : {this.state.ExpertLimitClient}</li>
                                                                            <li><i class="fas fa-check"></i> Accès carte de fidélisation</li>
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

                        <Menu />
    
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
    