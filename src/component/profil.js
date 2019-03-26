import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'
import Select from 'react-select';

import Navbarup from './navbarup'
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
            statutUpload: '',
            selectedOption: null,
            afflisteCadeaux: [],
            cadeaux: '',
            prixcadeaux: '',
            loading: false

        }

    }

    componentDidMount()
    {


        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
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
                        imgIconCarte: value.imgicon,
                        cadeaux: value.cadeaux,
                        prixcadeaux: value.prixcadeaux,
                        loading: true                     
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                afflisteCadeaux: response
            })
    

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
        axios.post(Configuration.hostnameManuelServer + 'fidapi/main.php?action=uploadBackgroundImg&id=' + this.props.idUserRecup, fd
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
        axios.post(Configuration.hostnameManuelServer + 'fidapi/main.php?action=uploadLogoImg&id=' + this.props.idUserRecup, fd
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

    enregistreCadeaux()
    {
        const { selectedOption } = this.state;
        var separePrestation = selectedOption.label.split(' - ')

        /*console.log(Configuration.hostnameManuelServer + 'fidapi/main.php?action=updateCadeauxEntreprise'
        + '&identreprise=' + this.props.idUserRecup
        + '&prestation=' + separePrestation[0]
        + '&prix=' + separePrestation[1].substring(0, separePrestation[1].length-1))*/

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=updateCadeauxEntreprise'
        + '&identreprise=' + this.props.idUserRecup
        + '&prestation=' + separePrestation[0]
        + '&prix=' + separePrestation[1].substring(0, separePrestation[1].length-1))
        .then((response) => response.json())
        .then((response) => {

            if(response === "#UPENTGIFT#SUCCESS")
            {

                console.log(response)
                this.setState({ selectedOption, cadeaux: separePrestation[0], prixcadeaux: separePrestation[1].substring(0, separePrestation[1].length-1)});

            }
            else if(response === "#UPENTGIFT#FAILED")
            {

                console.log(response)
                this.setState({ selectedOption });
                console.log(`Option selected:`, selectedOption);

            }

        })
        .catch(err => console.error(err))


    }

    handleChange = (selectedOption) => {

            console.log(selectedOption)
            this.setState({ selectedOption })
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

    const { selectedOption } = this.state;

    let options = this.state.afflisteCadeaux.map(function (valux) {
            return { value: valux.id, label: valux.prestation + ' - ' + valux.prix + '€' }
    })


    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                    <div className="container-fluid">

                    <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.state.imgIconCarte}  className="pousseIcone" width="75" height="75" align="left" alt="" /><h2> {this.state.nom} <br/><small>{this.state.prenom}</small></h2>

                    <hr/>

                    <div class="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Informations sur votre profil</h6>
                                    <div className="dropdown no-arrow">
                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Panel :</div>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/modifprofil">Modifiez votre profil</a>
                                        </div>
                                    </div>
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
                            <th scope="row">Client total</th>
                            <td  align="center">{this.state.nbClient}</td>
                            </tr>
                            <tr>
                            <th scope="row">Pointage total</th>
                            <td  align="center">{this.state.nbPointage}</td>
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

                        <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Information sur votre carte</h6>
                                </div>
                                <div class="card-body">
                                {this.afficheStatutCarte()}

                                <div className="panelCarte">
                                    <div id="personalizecarte">  
                                    <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.state.imgFondCarte} className="img-fluid" id="img1" alt="" />
                                    <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.state.imgIconCarte}  className="img-fluid" id="img2" alt="" />
                                    
                                    </div> 
                                </div>   

                                <br/>
                                {this.props.infoTypeCompte != "0" &&
                                    <div><table class="table table-striped">
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
                                            <td align="center"><button class="btn btn-dark btn-block" onClick = {this.fileUpload} type="submit">J'upload</button></td>
                                        </tr>
                                        <tr>
                                            <td><b>Logo ( 100x100 )</b></td>
                                            <td align="center">{this.state.imgIconCarte}</td>
                                        </tr>
                                        <tr>
                                            <td><input type="file" onChange = {this.fileSelectLogo} /></td>
                                            <td align="center"><button class="btn btn-dark btn-block" onClick = {this.fileUploadLogo} type="submit">J'upload</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div> 
                                }

                                {this.props.infoTypeCompte === "0" &&
                                    <div class="alert alert-danger" role="alert">
                                        Vous devez upgrader votre compte pour pouvoir modifier votre carte.
                                    </div>          
                                }

                                </div>
                            </div>

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Gestion du cadeau</h6>
                                </div>
                                <div className="card-body">
                                
                                        <div className="container">
                                        
                                        <p className="text-justify">
                                        <b>Cadeau :</b> {this.state.cadeaux} <br/>
                                        <b>Valeur du cadeau :</b> <span className="badge badge-dark">{this.state.prixcadeaux} €</span>  <br/>
                                        <hr/>
                                        Cette partie vous permet d'effectuer le paramétrage des cadeaux sur votre carte de fidélité.
                                        Les cadeaux sont délivrés lorsque votre client atteind la limitation des pointages
                                        fixé sur votre carte.
                                        </p>
                                        
                                        <Select
                                            style={{ width: 300 }}
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                        />  

                                        <br/>

                                        <button type="button" onClick={this.enregistreCadeaux.bind(this)} className="btn btn-success">Enregistrez</button>


                                        </div>

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

                    <Menu title="Profil" />

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

export default Profil;
