import React, { Component } from 'react';

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
            activeClassTab: 'active',
            activeClassTabDeux: ''
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
                    
                        <div className="col-6">
                        
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Gestion du compte</h1>
                            </div>
                        
                        </div>
                        <div className="col-6">
                        
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
                            <button type="submit" onClick={this.ajoutPrestation.bind(this)} class="btn btn-primary">Ajouter</button>
                            </div>
                        </div>
                        
                        </div>


                    
                    </div>

                    {this.afficheStatutCadeaux()}  

                    <hr/>

                    {/* DEBUT CODE */}

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


                    {/* FIN CODE */}


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
