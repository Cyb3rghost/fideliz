import React, { Component } from 'react';

import Wallet from '../images/walletabo.png'
import Prestations from '../images/prestations.png'

import Menu from './menu'

class Gestioncompte extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeaux: [],
            cadeauxInactive: [],
            maprestation: '',
            prix: '',
            statutListeCadeaux: '',
            statutListeCadeauxInactive: '',
            gestionInterface: '1',
            
            /* Gestion partie abonnement */
            statutAbonnement: '0'

            /* Gestion partie abonnement */
        }

    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUX#ECHEC")
            {

                this.setState({
                    statutListeCadeaux: '1'
                })

            }
            else
            {

                this.setState({
                    cadeaux: response
                })

            }
            


    

        })
        .catch(err => console.error(err))   
        
        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeauxInactive&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUXINACTIF#ECHEC")
            {

                this.setState({
                    statutListeCadeauxInactive: '1'
                })

            }
            else
            {

                this.setState({
                    cadeauxInactive: response
                })

            }
            


    

        })
        .catch(err => console.error(err))  



    }

    ajoutPrestation()
    {

        alert('Prestation : ' + this.state.maprestation + '\nPrix : ' + this.state.prix)

        fetch('http://127.0.0.1/fidapi/main.php?action=ajoutCadeaux&id=' + this.props.idUserRecup + '&prestation=' + this.state.maprestation + '&prix=' + this.state.prix)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AJTCADEAUX#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '1'
                })

                setTimeout(() => window.location.href = "/gestioncompte",1000)

            }
            else if (response === "#AJTCADEAUX#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '2'
                })

            }
            else if (response === "#AJTCADEAUX#EXISTE") {
            
                this.setState({
                    statutAjtCadeaux: '3'
                })

            }


    

        })
        .catch(err => console.error(err)) 


    }

    afficheStatutCadeaux()
    {

        if(this.state.statutAjtCadeaux === '1')
        {

            return <div className="msgSuccessPerso">
                
                Votre prestation a bien été ajouter !
    
            </div>


        }
        else if (this.state.statutAjtCadeaux === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Votre prestation n'a pas pu être ajouter ! Veuillez recommencer s'il vous plait.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '3') 
        {
            

            return <div className="msgErrorPerso">
                
                Votre prestation existe déjà sous ce nom. 
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '4') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '5') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '6') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '7') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '8') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été supprimer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '9') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été supprimer.
        
            </div>

        }

    }

    activeCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=activePrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#ENABLEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '6'
                })

                setTimeout(() => window.location.href = "/gestioncompte",1000)

            }
            else if (response === "#ENABLEGIFT#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '7'
                })

            }


    

        })
        .catch(err => console.error(err)) 

    }

    desactiveCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=desactivePrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#DISABLEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '4'
                })

                setTimeout(() => window.location.href = "/gestioncompte",1000)

            }
            else if (response === "#DISABLEGIFT#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '5'
                })

            }


    

        })
        .catch(err => console.error(err)) 

    }

    suppressionCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=suppressionPrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#DELETEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '8'
                })

                setTimeout(() => window.location.href = "/gestioncompte",1000)

            }
            else if (response === "#DELETE#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '9'
                })

            }


    

        })
        .catch(err => console.error(err)) 

    }
    

    afficheListePrestation()
    {


        if(this.state.statutListeCadeaux === '1')
        {

            return <div className="msgErrorPerso">
                
                Vous n'avez enregistrer aucun cadeaux.
    
            </div>


        }
        else
        {
            
            return this.state.cadeaux.map(value => {
                return (
                            <tr>
                                <td>{value.prestation} </td>
                                <td>{value.prix} €</td>
                                <td><button class="btn btn-warning" onClick={() => this.desactiveCadeaux(value.id)} type="submit">Désactivation</button></td>
                            </tr>
                        
                        )
            })
            

        }



        
    }

    afficheListePrestationInactive()
    {


        if(this.state.statutListeCadeauxInactive === '1')
        {

            return <div className="msgErrorPerso">
                
                Vous n'avez enregistrer aucun cadeaux.
    
            </div>


        }
        else
        {
            
            return this.state.cadeauxInactive.map(value => {
                return (
                            <tr>
                                <td>{value.prestation} </td>
                                <td>{value.prix} €</td>
                                <td><button class="btn btn-success" onClick={() => this.activeCadeaux(value.id)} type="submit">Activation</button> - <button onClick={() => this.suppressionCadeaux(value.id)} class="btn btn-danger" type="submit">Suppression</button></td>
                            </tr>
                        
                        )
            })
            

        }



        
    }

    commandeBronzeMensuel(statutabo)
    {

        if(statutabo === '1')
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=commandebronzeannuel&id=' + this.props.idUserRecup)
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

            fetch('http://127.0.0.1/fidapi/main.php?action=commandebronzemensuel&id=' + this.props.idUserRecup)
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

            fetch('http://127.0.0.1/fidapi/main.php?action=commandeargentannuel&id=' + this.props.idUserRecup)
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


            fetch('http://127.0.0.1/fidapi/main.php?action=commandeargentmensuel&id=' + this.props.idUserRecup)
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

            fetch('http://127.0.0.1/fidapi/main.php?action=commandeorannuel&id=' + this.props.idUserRecup)
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

            fetch('http://127.0.0.1/fidapi/main.php?action=commandeormensuel&id=' + this.props.idUserRecup)
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
    return (
      <div>

            <div id="wrapper">

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                        </div>
                    </form>

                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                                </div>
                            </div>
                            </form>
                        </div>
                        </li>

                        <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw"></i>
                            <span className="badge badge-danger badge-counter">3+</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                            Alerts Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                <i className="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-success">
                                <i className="fas fa-donate text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-warning">
                                <i className="fas fa-exclamation-triangle text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 2, 2019</div>
                                Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                        </div>
                        </li>

                        <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw"></i>
                            <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                            Message Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                                <div className="status-indicator"></div>
                            </div>
                            <div>
                                <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                <div className="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                                <div className="status-indicator bg-warning"></div>
                            </div>
                            <div>
                                <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="dropdown-list-image mr-3">
                                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                                <div className="status-indicator bg-success"></div>
                            </div>
                            <div>
                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                        </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                            </a>
                        </div>
                        </li>

                    </ul>

                    </nav>

                    <div className="container-fluid">
                    
                    
                        <div className="row">

                            <div className="col-md-2">

                                <div onClick={() => this.setState({gestionInterface: '1'})} class="card card-body bg-white text-center">
                                    <h2>Prestations</h2>
                                    <br/>
                                    <center><img src={Prestations} width="150" height="150" alt="responsive-image" /></center>

                                </div> 

                                <br/>

                                <div onClick={() => this.setState({gestionInterface: '2'})} class="card card-body bg-white text-center">
                                    <h2>Abonnement</h2>
                                    <br/>
                                    <center><img src={Wallet} width="150" height="150" alt="responsive-image" /></center>
                                </div>    

                                <br/>

                                <div class="card card-body bg-white">
                                    <h2>Roboto</h2>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra codeply varius quam sit amet vulputate.
                                </div> 

                                <br/>    

                            </div>
                            <div className="col-md-10">
     
                                    {this.state.gestionInterface === "1" &&
                                            <div>
                                            
                                            <div class="card card-body bg-white">
                                            <div className="row">
                                        
                                            <div className="col-md-6">
                                            
                                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                    <h1 className="h3 mb-0 text-gray-800">Gestion du compte</h1>
                                                </div>
                                                <br/>
                                            
                                            </div>
                                            <div className="col-md-6">
                                            
                                            <div className="form-row">
                                                <div className="col">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ma prestation" 
                                                    value={this.state.maprestation}
                                                    onChange={e => this.setState({maprestation: e.target.value})}
                                                
                                                />
                                                </div>
                                                <div className="col">
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    placeholder="Prix" 
                                                    value={this.state.prix}
                                                    onChange={e => this.setState({prix: e.target.value})}
                                                
                                                />
                                                </div>
                                                <div className="col">
                                                <button type="submit" onClick={this.ajoutPrestation.bind(this)} class="btn btn-primary btn-block">Ajouter</button>
                                                </div>
                                            </div>
                                            
                                            </div>

                                            {this.afficheStatutCadeaux()} 
                                        
                                        </div>

                                        <hr/>

                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Prestations actives</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Prestations inactives</a>
                                            </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            
                                            
                                                <table class="table">
                                                <thead>
                                                    <tr>
                                                    
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.afficheListePrestation()}
                                                </tbody>
                                                </table>
                                            
                                            
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                    
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.afficheListePrestationInactive()}
                                                </tbody>
                                                </table>
                                            
                                            
                                            </div>
                                        </div>
                                        </div>

                                        </div>
                                          

                                    }

                                    {this.state.gestionInterface === "2" &&

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



                                    }   
                            <br/>

                            </div>


                        </div>    
                    
                    
                    
                    </div>


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
