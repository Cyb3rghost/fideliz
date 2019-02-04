import React, { Component } from 'react';

import loyaltyCard from '../images/loyaltycard.png';

import Menu from './menu'


class Listetypecarte extends Component {


    constructor(props)
    {

        super(props)
        this.state = {
            idEntreprise: this.props.idUserRecup,
            dataInscription: '',
            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            emailClient: '',
            telephoneClient: '',
            carteTotal: '',
            pointageTotal: '',

            carteDateCreation: '',
            carteNom: '',
            cartePrenom: '',
            carteNbPointage: '',
            carteLimitPointage: '',
            carteStatut: '',
            carteCadeaux: '',
            carteImgBackground: '',
            carteImgIcon: '',
            carteQrCode: '',
            carteStatutMsg: '',
            cartePointageMsg: ''

        }

    }

    componentDidMount()
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        dataInscription: value.dinscription,
                        nomClient: value.nom,
                        prenomClient: value.prenom,
                        adresseClient: value.adresse,
                        emailClient: value.email,
                        telephoneClient: value.telephone,
                        carteTotal: value.nbcarteterminer,
                        pointageTotal: value.nbpointagetotal                     
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=voirCarteClient&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#VOIRCARTE#NOEXIST")
            {

                this.setState({
                    carteStatutMsg: '1'                                      
                })
            }
            else
            {

                
                this.setState({
                    carteStatutMsg: '2'
                })

                {response.map((valuedeux, index) => 
                    (
                        this.setState({
                            carteDateCreation: valuedeux.datecreation,
                            carteNom: valuedeux.nom,
                            cartePrenom: valuedeux.prenom,
                            carteNbPointage: valuedeux.nbpointage,
                            carteLimitPointage: valuedeux.limitpointage,
                            carteStatut: valuedeux.statut,
                            carteCadeaux: valuedeux.cadeaux,
                            carteImgBackground: valuedeux.imgbackground,
                            carteImgIcon: valuedeux.imgicon,
                            carteQrCode: valuedeux.qrcode                                            
                        })
                    )
                  )}


            }


    

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=checkPointage&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CHKPOINTAGE#SUCCESS':
                    this.setState({
                        cartePointageMsg: '1'
                    })
                    break;          
                default:
                    break;
            }


    

        })
        .catch(err => console.error(err))



    }

    afficheCarte()
    {

        var QRCode = require('qrcode.react');

        if(this.state.carteStatutMsg === "1")
        {


            return <div className="msgErrorPerso">
        
            <center>Vous ne possédez pas de carte de fidélité.</center>
    
            </div>


        }
        else
        {

            return <div>
            <div className="container-perso">
                <div className="panelCarte">
                    <div id="personalizecarte">  
                        <img src={'http://127.0.0.1/fidapi/img/' + this.state.carteImgBackground} className="img-responsive" id="img1" alt="" /> 
                        <h2 id="positionDonnee">{this.state.carteNom} {this.state.cartePrenom} <br/><small>{this.state.carteDateCreation} - {this.state.carteNbPointage} / {this.state.carteLimitPointage} Pointages</small></h2>
                        <img src={'http://127.0.0.1/fidapi/img/' + this.state.carteImgIcon}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                        <QRCode
                            value={this.state.carteQrCode}
                            size={100}
                            id="img3"
                        />
                    </div> 
                </div>  
            </div>
            <br/>
            {/*this.state.carteDateCreation
            this.state.carteNom
            this.state.cartePrenom
            this.state.carteNbPointage
            this.state.carteLimitPointage
            this.state.carteStatut
            this.state.carteCadeaux
            this.state.carteImgBackground
            this.state.carteImgIcon
            this.state.carteQrCode
            */}
            </div>

        }


    }

    confirmation()
    {

        var idClient = window.location.search.substring(4);


        fetch('http://127.0.0.1/fidapi/main.php?action=checkDatePointage&idclient=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CHKDATEPTGE#SUCCESS':
                    console.log(response)
                    fetch('http://127.0.0.1/fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case '#CLOTURATION#SUCCESS':
                                console.log(response)
                                break;   
                            case '#CLOTURATION#NONECESSAIRE':
                                console.log(response)
                                fetch('http://127.0.0.1/fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient + '&idEntreprise=' + this.props.idEntRecupClient)
                                .then((response) => response.json())
                                .then((response) => {
                        
                                    switch (response) {
                                        case '#UPTENTREPRISE#SUCCESS':
                                            console.log(response)
                                            setTimeout(() => window.location.href = "/fichecoclient",1000)
                                            break;   
                                        case '#UPTENTREPRISE#ECHEC':
                                            console.log(response)
                                            break;            
                                        default:
                                            break;
                                    }
                        
                                })
                                .catch(err => console.error(err))
                                break;            
                            default:
                                break;
                        }
            
            
                
            
                    })
                    .catch(err => console.error(err))  
                    break;   
                case '#CHKDATEPTGE#NOEXIST':
                    console.log(response)
                    fetch('http://127.0.0.1/fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case '#CLOTURATION#SUCCESS':
                                console.log(response)
                                break;   
                            case '#CLOTURATION#NONECESSAIRE':
                                console.log(response)
                                fetch('http://127.0.0.1/fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient + '&idEntreprise=' + this.props.idEntRecupClient)
                                .then((response) => response.json())
                                .then((response) => {
                        
                                    switch (response) {
                                        case '#UPTENTREPRISE#SUCCESS':
                                            console.log(response)
                                            setTimeout(() => window.location.href = "/fichecoclient",1000)
                                            break;   
                                        case '#UPTENTREPRISE#ECHEC':
                                            console.log(response)
                                            break;            
                                        default:
                                            break;
                                    }
                        
                                })
                                .catch(err => console.error(err))
                                break;            
                            default:
                                break;
                        }
            
            
                
            
                    })
                    .catch(err => console.error(err))                    
                    break;   
                case '#CHKDATEPTGE#ECHEC': 
                    console.log(response)
                    break;
                default:
                    break;
            }


    

        })
        .catch(err => console.error(err))


    }

    verifieEtatPointage()
    {


        if(this.state.cartePointageMsg === '1')
        {

            return <div className="msgSuccessPerso">
        
                Votre pointage est en attente ! <br/><button onClick={this.confirmation.bind(this)} class="btn btn-default" type="submit">Veuillez confirmer !</button>
        
            </div>


        }
        else if (this.state.cartePointageMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Aucune carte de fidélité n'est liée à ce compte.
        
            </div>

        }
        


    }

    
  render() {
    var idClient = window.location.search.substring(4);

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
                                    <h1 className="h3 mb-0 text-gray-800">TYPE DE CARTE</h1>
                                </div>


                            </div>
                            <div className="col-6">
                                                        

                            </div>

                    </div>

                    <hr/>

                    {/* DEBUT CODE */}

                    
                    <a href={'/ajoutcarte?id=' + idClient}><div class="card">
                        <div class="card-body">

                                <div className="row">

                                    <div className="col-8">
                                    
                                    <h1>CARTE DE FIDELITE</h1>
                                    
                                    </div>
                                    <div className="col-4">
                                    
                                        <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                    
                                    </div>

                                </div>

                        </div>
                    </div></a>

                    <br/>

                    <div class="card">
                        <div class="card-body">

                                <div className="row">

                                    <div className="col-8">
                                    
                                    <h1>CARTE DE REDUCTION</h1>
                                    
                                    </div>
                                    <div className="col-4">
                                    
                                        <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                    
                                    </div>

                                </div>

                        </div>
                    </div>

                    <br/>

                    <div class="card">
                        <div class="card-body">

                                <div className="row">

                                    <div className="col-8">
                                    
                                    <h1>CARTE CADEAUX</h1>
                                    
                                    </div>
                                    <div className="col-4">
                                    
                                        <img src={loyaltyCard} width="100" height="100" title="Carte cadeaux" align="right" alt="Responsive image"/>

                                    
                                    </div>

                                </div>

                        </div>
                    </div>

                    <br/>

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

export default Listetypecarte;
