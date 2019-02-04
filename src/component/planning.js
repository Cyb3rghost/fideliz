import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Menu from './menu'
import calendrier from '../images/calendar.png'
import attente from '../images/attente.png'
import confirmation from '../images/confirme.png'

class Planning extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            startDate: new Date(),
            heures: '',
            statutMsgPlanning: '',
            planningAtt: [],
            planningVld: [],
            planningHst: []

          };
        this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(date) {
        this.setState({
          startDate: date
        });
    }

    componentDidMount()
    {

        var idclient = window.location.search.substring(4)

        fetch('http://127.0.0.1/fidapi/main.php?action=planningAttente&identreprise=' + this.props.idUserRecup
        + '&idclient=' + idclient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#PLANNINGATT#VIDE")
            {

                this.setState({
                    statutMsgPlanning: '3'
                })

            }
            else
            {

                this.setState({
                    planningAtt: response
                })

            }

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=planningValider&identreprise=' + this.props.idUserRecup
        + '&idclient=' + idclient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#PLANNINGVLD#VIDE")
            {

                this.setState({
                    statutMsgPlanning: '3'
                })

            }
            else
            {

                this.setState({
                    planningVld: response
                })

            }



        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=planningHistorique&identreprise=' + this.props.idUserRecup
        + '&idclient=' + idclient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#PLANNINGHST#VIDE")
            {

                this.setState({
                    statutMsgPlanning: '5'
                })

            }
            else
            {

                this.setState({
                    planningHst: response
                })

            }



        })
        .catch(err => console.error(err))



    }

    addPlanning(idclient)
    {

        alert("http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=" + this.props.idUserRecup + "&idclient=" + idclient + "&date=" + this.state.startDate.toLocaleDateString() + "&heures=" + this.state.heures)

        fetch('http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=' + this.props.idUserRecup
        + '&idclient=' + idclient
        + '&date=' + this.state.startDate.toLocaleDateString()
        + '&heures=' + this.state.heures)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            
            if(response === "#ADDPLANNING#SUCCESS")
            {

                this.setState({
                    statutMsgPlanning: '1'
                })

                setTimeout(() => window.location.href = "/planning?id=" + idclient,2500)


            }
            else if(response === "#ADDPLANNING#ECHEC")
            {

                this.setState({
                    statutMsgPlanning: '2'
                })


            }


        })
        .catch(err => console.error(err))


    }

    afficheStatutPlanning()
    {

        if(this.state.statutMsgPlanning === "1")
        {

            return <div className="msgSuccessPerso">
        
                Votre date a était mis en attente de validation.
        
            </div>

        }
        else if(this.state.statutMsgPlanning === "2")
        {

            return <div className="msgErrorPerso">
        
                Votre date n'a pas était ajouter.
        
            </div>

        }
        else if(this.state.statutMsgPlanning === "4")
        {

            return <div className="msgErrorPerso">
        
                Cette date a été déjà programmer. Veuillez attendre la validation...
        
            </div>

        }


    }

  render() {
    var idClient = window.location.search.substring(4);
    const { planningAtt, planningVld, planningHst } = this.state;

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
                                    <h1 className="h3 mb-0 text-gray-800">Planning</h1>
                                </div>


                            </div>
                            <div className="col-6">
                            
                                <center>
                                <div className="row">

                                    <div className="col">
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col">

                                    <input 
                                        type="time" 
                                        min="00:00" 
                                        max="18:00" 
                                        className="form-control" 
                                        value={this.state.heures}
                                        onChange={(e) => this.setState({heures: e.target.value})}
                                    /> 
                                    </div>
                                    <div className="col">

                                    <button type="submit" onClick={() => this.addPlanning(idClient)} className="btn btn-success btn-block">Envoyer</button>
                                    
                                    </div>
                                </div>
                                </center>
                            
                            </div>

                    </div>

                    {this.afficheStatutPlanning()}
                    <hr/>

                    {/* DEBUT CODE */}

                    
                    <div className="row">

                        <div className="col-6">
                        
                        <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Planning en attente</h6>
                                </div>
                                <div class="card-body">

                                    <table class="table">
                                    <thead>
                                        <tr>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {planningAtt.map((value, index) => 
                                    (<tr key={index}>

                                        <td><img src={attente} width="30" height="30" alt="Planning en attente..."/></td>
                                        <td align="center">{value.date}</td>
                                            
                                        </tr>)
                                    )} 


                                    </tbody>
                                    </table>                   

                                </div>
                            </div>
     
                        
                        </div>
                        <div className="col-6">
                                
                        <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Planning à venir</h6>
                                </div>
                                <div class="card-body">

                                    <table class="table">
                                    <thead>
                                        <tr>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>

                                    
                                    {planningVld.map((value, index) => 
                                    (<tr key={index}>

                                        <td><img src={confirmation} width="30" height="30" alt="Planning en attente..."/></td>
                                        <td align="center">{value.date}</td>
                                            
                                        </tr>)
                                    )} 

                                    </tbody>
                                    </table>                   

                                </div>
                            </div>                        
                        
                        </div>


                    </div>

                    <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Historique du planning</h6>
                                </div>
                                <div class="card-body">

                                    <table class="table">
                                    <thead>
                                        <tr>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    {planningHst.map((value, index) => 
                                    (<tr key={index}>

                                        <td>{value.date}</td>
                                        {value.statut === '4' && <td><span className="badgeAccepter">Terminer</span></td>} 
                                        {value.statut === '2' && <td><span className="badgeAccepter">Accepter</span></td>}  
                                        {value.statut === '3' && <td><span className="badgeRefuser">Refuser</span></td>}  
                                            
                                        </tr>)
                                    )} 

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

export default Planning;
