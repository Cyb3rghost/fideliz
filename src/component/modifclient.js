import React, { Component } from 'react';

import Menu from './menu'

class Modifclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {

            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            emailClient: '',
            telephoneClient: '',
            actuelMdp: '',
            nouveauMdp: '',
            retapeMdp: '',
            statutMsgMaj: ''

        }


    }

    componentDidMount()
    {

            var idClient = window.location.search.substring(4);
            fetch('http://127.0.0.1/fidapi/main.php?action=voirClient&id=' + idClient)
            .then((response) => response.json())
            .then((response) => {
    
                {response.map((value, index) => 
                    (
                        this.setState({
                            nomClient: value.nom,
                            prenomClient: value.prenom,
                            adresseClient: value.adresse,
                            emailClient: value.email,
                            telephoneClient: value.telephone,                    
                        })
                    )
                  )}
        
    
            })
            .catch(err => console.error(err))

    }

    majClient()
    {

        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=majClient&idclient=' + idClient
        + '&nom=' + this.state.nomClient
        + '&prenom=' + this.state.prenomClient
        + '&email=' + this.state.emailClient
        + '&adresse=' + this.state.adresseClient
        + '&telephone=' + this.state.telephoneClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#MAJCLIENT#SUCCESS")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '1'
                })

            }
            else if(response === "#MAJCLIENT#FAILED")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '2'
                })

            }
            else if(response === "#MAJCLIENT#NOSOUCHE")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '4'
                })

            }

        })
        .catch(err => console.error(err))

    }

    changeMDP()
    {

        var idClient = window.location.search.substring(4);

        if(this.state.nouveauMdp === this.state.retapeMdp)
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=changeMdp&idclient=' + idClient
            + '&oldmdp=' + this.state.actuelMdp
            + '&nouveaumdp=' + this.state.nouveauMdp)
            .then((response) => response.json())
            .then((response) => {
    
                if(response === "#MDFMDP#SUCCESS")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '3',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#FAILED")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '4',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#NOEXIST")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '4',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
    
            })
            .catch(err => console.error(err))


        }
        else
        {

            this.setState({
                statutMsgMaj: '5',
                actuelMdp: '',
                nouveauMdp: '',
                retapeMdp: ''
            })

        }

    }


    afficheStatutMaj()
    {


        if(this.state.statutMsgMaj === '1')
        {

            return <div className="msgSuccessPerso">
        
                Votre profil a bien été mis à jour.
        
            </div>


        }
        else if (this.state.statutMsgMaj === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre profil n'a pas été mis à jour.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '3') 
        {
            

            return <div className="msgSuccessPerso">
        
                Votre mot de passe a bien été modifier.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '4') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre mot de passe n'a pas été modifier.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '5') 
        {
            

            return <div className="msgErrorPerso">
        
                Les mots de passe ne sont pas identique.
        
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

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Modification du client</h1>
                    </div>

                    <hr/>
                    {this.afficheStatutMaj()}
                    {/* DEBUT CODE */}

                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nom</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nom"
                            value={this.state.nomClient}
                            onChange={(e) => this.setState({nomClient: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Prénom</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Prénom"
                            value={this.state.prenomClient}
                            onChange={(e) => this.setState({prenomClient: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Adresse</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Adresse"
                            value={this.state.adresseClient}
                            onChange={(e) => this.setState({adresseClient: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">N° Téléphone</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Numéro de téléphone"
                            value={this.state.telephoneClient}
                            onChange={(e) => this.setState({telephoneClient: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email"
                            value={this.state.emailClient}
                            onChange={(e) => this.setState({emailClient: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div className="col-sm-8"></div>
                        <div class="col-sm-4">
                        <button class="btn btn-success btn-block" onClick={this.majClient.bind(this)} type="button" id="button-addon2">Modification</button>
                        </div>
                    </div>

                    <hr/>

                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Mot de passe actuel</label>
                        <div class="col-sm-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            value={this.state.actuelMdp} 
                            onChange={(e) => this.setState({actuelMdp: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Nouveau mot de passe</label>
                        <div class="col-sm-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            value={this.state.nouveauMdp} 
                            onChange={(e) => this.setState({nouveauMdp: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Retapez Mot de passe</label>
                        <div class="col-sm-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            value={this.state.retapeMdp} 
                            onChange={(e) => this.setState({retapeMdp: e.target.value})}
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div className="col-sm-8"></div>
                        <div class="col-sm-4">
                        <button class="btn btn-success btn-block" onClick={this.changeMDP.bind(this)} type="button" id="button-addon2">Modifier le mot de passe</button>
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

export default Modifclient;
