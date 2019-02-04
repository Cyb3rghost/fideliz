import React, { Component } from 'react';
import axios from 'axios';

import Menu from './menu'

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
                        <h1 className="h3 mb-0 text-gray-800">Profil</h1>
                    </div>

                    <hr/>

                    <h2>{this.state.nom}</h2>
                    <small>{this.state.prenom}</small>

                    <hr/>

                    <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Information sur le profil</h6>
                                </div>
                                <div class="card-body">

                                    <table class="table">
                                        <thead>
                                            <tr>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <th scope="row">Email</th>
                                            <td align="center">{this.state.email}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Adresse</th>
                                            <td  align="center">{this.state.adresse}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Nom de la société</th>
                                            <td  align="center">{this.state.nomSociete}</td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Numéro de téléphone</th>
                                            <td  align="center">{this.state.telephone}</td>
                                            </tr>
                                        </tbody>
                                        </table>

                                </div>
                    </div>



                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Information sur le compte</h6>
                            </div>
                            <div class="card-body">

                            <table class="table">
                        <thead>
                            <tr>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Type de compte</th>
                            <td align="center">{this.state.typeCompte}</td>
                            </tr>
                            <tr>
                            <th scope="row">Limite client</th>
                            <td  align="center">{this.state.nbClient} / {this.state.limitClient}</td>
                            </tr>
                            <tr>
                            <th scope="row">Limite de pointage</th>
                            <td  align="center">{this.state.nbPointage} / {this.state.limitPointage}</td>
                            </tr>
                            <tr>
                            <th scope="row">Début abonnement</th>
                            <td  align="center">{this.state.debutAbo}</td>
                            </tr>
                            <tr>
                            <th scope="row">Fin abonnement</th>
                            <td  align="center">{this.state.finAbo}</td>
                            </tr>
                            <tr>
                            <th scope="row">Jours restant</th>
                            <td  align="center">{this.state.jRestants}</td>
                            </tr>


                        </tbody>
                        </table>

                            </div>
                        </div>




                        <div class="row">
                            <div class="col">

                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Formule mensuelle</h6>
                                </div>
                                <div class="card-body">

                                <table class="table table-striped"><thead><tr></tr></thead><tbody><tr><td><b>Limite de client</b></td><td align="center">Illimité</td></tr><tr><td><b>Limite de pointage</b></td><td align="center">Illimité</td></tr><tr><td><b>Prix :</b></td><td align="center">6.99 € / Mois</td></tr></tbody></table>
                                <button type="button" class="btn btn-primary">Je m'abonne</button>

                                </div>
                            </div>


                            </div>
                            <div class="col">

                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Formule annuelle</h6>
                                </div>
                                <div class="card-body">

                                <table class="table table-striped"><thead><tr></tr></thead><tbody><tr><td><b>Limite de client</b></td><td align="center">Illimité</td></tr><tr><td><b>Limite de pointage</b></td><td align="center">Illimité</td></tr><tr><td><b>Prix :</b></td><td align="center">6.99 € / Mois</td></tr></tbody></table>
                                <button type="button" class="btn btn-primary">Je m'abonne</button>

                                </div>
                            </div>




                            </div>
                        </div>

                        <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Information sur votre carte</h6>
                                </div>
                                <div class="card-body">
                                {this.afficheStatutCarte()}

                                <div className="panelCarte">
                                    <div id="personalizecarte">  
                                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.imgFondCarte} className="img-responsive" id="img1" alt="" />
                                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.imgIconCarte}  className="img-responsive img-rounded" id="img2" alt="" />
                                    
                                    </div> 
                                </div>   

                                <br/>

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

export default Profil;
