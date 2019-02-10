import React, { Component } from 'react';


import Menu from './menu'
import fidelityCard from '../images/fidelitycard.png';
import backgroundCarte from '../images/backgroundCarte.jpg';
import logoCarte from '../images/logocarte.png';

class Ajoutcarte extends Component {

    constructor(props)
    {

        super(props)
        this.state = {

            dateDuJour: '',
            limitPointage: '',
            cadeaux: '',
            statutMsg: '',
            afflisteCadeaux: []

        }


    }

    componentDidMount()
    {

        var d = new Date();
        var date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        var idClient = window.location.search.substring(4);

        this.setState({
            dateDuJour: date
        })

        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUX#ECHEC")
            {

                this.setState({
                    statutListeMsg: '3'
                })

            }
            else
            {

                this.setState({
                    afflisteCadeaux: response
                })

            }
            
    

        })
        .catch(err => console.error(err)) 

    }

    addCarte()
    {

        const { limitPointage, cadeaux } = this.state;
        const { idUserRecup, infosCarte, infosCarteIcon } = this.props;
        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=creationCarte&id=' + idClient
        + '&imgfondcarte=' + this.props.bkdgCarte
        + '&imgiconcarte=' + this.props.iconCarte
        + '&pointage=' + limitPointage
        + '&cadeaux=' + cadeaux)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response === "#AJTCARTE#SUCCESS")
            {

                this.setState({
                    statutMsg: '1'
                })

                setTimeout(() => window.location.href = "/voirclient?id=" + idClient,2500)
                //setTimeout(window.location.href = "/voirclient?id=" + idClient, 5000);

            }
            else if (response === "#AJTCARTE#ERROR") {

                this.setState({
                    statutMsg: '0'
                })
                
            }
            else if (response === "#AJTCARTE#EXISTE") {

                this.setState({
                    statutMsg: '2'
                })
                
            }

        })
        .catch(err => console.error(err))

    }

    vrfInsertion()
    {

        if(this.state.statutMsg === '1')
        {

            return <div className="msgSuccessPerso">
        
                La carte de fidélité a bien été créer ! Patientez...
        
            </div>


        }
        else if (this.state.statutMsg === '0') 
        {
            

            return <div className="msgErrorPerso">
        
                La carte de fidélité n'a pas été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Le client possède déjà une carte de fidélité. 
        
            </div>

        }


    }

    afficheListePrestation()
    {


        if(this.state.statutMsg === '3')
        {

            return <option>Aucun cadeaux à afficher !</option>


        }
        else
        {
            
            return this.state.afflisteCadeaux.map(value => {
                return (
                            <option>{value.prestation} - {value.prix} €</option>
                        )
            })
            

        }



        
    }


  render() {
    var idClient = window.location.search.substring(4);
    var QRCode = require('qrcode.react');

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
                                    <h1 className="h3 mb-0 text-gray-800">Création de carte</h1>
                                </div>


                            </div>
                            <div className="col-6">
                                                        

                            </div>

                    </div>

                    {this.vrfInsertion()}

                    <hr/>

                    {/* DEBUT CODE */}

                    <div className="container">
                    
                        <div className="panelCarte">
                        <div id="personalizecarte">  
                            <img src={'http://127.0.0.1/fidapi/img/' + this.props.bkdgCarte} className="img-responsive" id="img1" alt="" />
                            <img src={'http://127.0.0.1/fidapi/img/' + this.props.iconCarte}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                            <QRCode
                                value=""
                                size={100}
                                id="img3"
                            />  
                        
                        </div> 
                    </div>  
                    <br/>
                        
                                    
                    <label>Date : </label> {this.state.dateDuJour}
                    <br/>
                    <label>Image de fond : </label> {this.props.infosCarte}
                    <br/>
                    <label>Icône : </label> {this.props.infosCarteIcon} <br/>
                    <br/>
                    <div class="form-group">
                        <label>Limitation pointage : </label>
                        <select class="form-control"
                        value={this.state.limitPointage}
                        placeholder="Select"
                        onChange={e => this.setState({limitPointage: e.target.value})}>
                            <option value="" disabled selected>Select your option</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                            <option>60</option>
                            <option>70</option>
                            <option>80</option>
                            <option>90</option>
                            <option>100</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cadeaux : </label>
                        <select class="form-control"
                        value={this.state.cadeaux}
                        onChange={e => this.setState({cadeaux: e.target.value})}>>
                            <option value="" disabled selected>Select your option</option>
                            {this.afficheListePrestation()}
                        </select>
                    </div>
                    <button onClick={this.addCarte.bind(this)} className="btn btn-success btn-block" type="submit">Création de la carte</button>
    

                    
                    
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

export default Ajoutcarte;
