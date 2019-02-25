import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Loader from 'react-loader-spinner'

import "react-datepicker/dist/react-datepicker.css";

import attente from '../../images/attente.png'
import confirmation from '../../images/confirme.png'
import check from '../../images/check.png'
import refuse from '../../images/croix.png'

import Navbarupclient from './navbarupclient'
import Menu from './menuclient'


class Planningclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            startDate: new Date(),
            heures: '',
            statutMsgPlanning: '',
            planningAtt: [],
            planningVld: [],
            planningHst: [],
            loading: false

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

        fetch('http://127.0.0.1/fidapi/main.php?action=planningAttente&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + this.props.idUserRecupClient)
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

        fetch('http://127.0.0.1/fidapi/main.php?action=planningValider&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#PLANNINGVLD#VIDE")
            {

                console.log(response)

            }
            else
            {

                this.setState({
                    planningVld: response
                })

            }



        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=planningHistorique&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + this.props.idUserRecupClient)
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
                    planningHst: response,
                    loading: true
                })

            }



        })
        .catch(err => console.error(err))



    }

    addPlanning(idclient)
    {

        alert("http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=" + this.props.idEntRecupClient + "&idclient=" + idclient + "&date=" + this.state.startDate.toLocaleDateString() + "&heures=" + this.state.heures)

        fetch('http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + this.props.idUserRecupClient
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
        else if(this.state.statutMsgPlanning === "6")
        {

            return <div className="msgErrorPerso">
        
                Votre date n'a pas pu être confirmer.
        
            </div>

        }
        else if(this.state.statutMsgPlanning === "7")
        {

            return <div className="msgSuccessPerso">
        
                Votre date a bien été valider. Patientez...
        
            </div>

        }
        else if(this.state.statutMsgPlanning === "8")
        {

            return <div className="msgErrorPerso">
        
                Votre date n'a pas pû être refuser.
        
            </div>

        }
        else if(this.state.statutMsgPlanning === "9")
        {

            return <div className="msgSuccessPerso">
        
                Votre date a bien été refuser. Patientez...
        
            </div>

        }




    }

    valideDate(idate)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=confirmationDate&idate=' + idate
        + '&idclient=' + this.props.idUserRecupClient
        + '&idEntreprise=' + this.props.idEntRecupClient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#CONFIRMDATE#ECHEC")
            {

                this.setState({
                    statutMsgPlanning: '6'
                })

            }
            else if(response === "#CONFIRMDATE#SUCCESS")
            {

                this.setState({
                    statutMsgPlanning: '7'
                })

                setTimeout(() => window.location.href = "/planningclient", 2500)

            }

        })
        .catch(err => console.error(err))

    }

    refuseDate(idate)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=refusDate&idate=' + idate
        + '&idclient=' + this.props.idUserRecupClient
        + '&idEntreprise=' + this.props.idEntRecupClient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#REFUSDATE#ECHEC")
            {

                this.setState({
                    statutMsgPlanning: '8'
                })

            }
            else if(response === "#REFUSDATE#SUCCESS")
            {

                this.setState({
                    statutMsgPlanning: '9'
                })

                setTimeout(() => window.location.href = "/planningclient", 2500)

            }

        })
        .catch(err => console.error(err))


    }

  render() {
    const { planningAtt, planningVld, planningHst } = this.state;

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                            <Navbarupclient idUser={this.props.idUserRecupClient} />

                            <div className="container-fluid">

                            <div className="row">

                                    <div className="col-8">
                                    
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h1 className="h3 mb-0 text-gray-800">Gestion du planning</h1>
                                        </div>


                                    </div>
                                    <div className="col-4">
                                                                
                                        <center>
                                            <div className="form-inline">

                                                <div className="form-group">
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">

                                                <input 
                                                    type="time" 
                                                    min="00:00" 
                                                    max="18:00" 
                                                    className="form-control" 
                                                    value={this.state.heures}
                                                    onChange={(e) => this.setState({heures: e.target.value})}
                                                /> 
                                                </div>
                                                <button type="submit" onClick={() => this.addPlanning(this.props.idUserRecupClient)} className="btn btn-success">Proposer cette date</button>
                                            </div>
                                        </center>

                                    </div>

                            </div>

                            <hr/>
                            {this.afficheStatutPlanning()}
                            <br/>

                            {/* DEBUT CODE */}

                            <div className="container-perso">
                                    <div className="row">
                                        <div className="col-md-6">
                                        
                                        <div class="card">
                                            <h5 class="card-header">Planning en attente</h5>
                                            <div class="card-body">
                                                {planningAtt.map((value, index) => 
                                                            (<div key={index} className="planningAttente">
                                                                                
                                                                    <div className="row">
                                                                    
                                                                        <div className="col-2">
                                                                        
                                                                            <img src={attente} width="30" height="30" alt="Planning en attente..."/>
                                                                        
                                                                        </div>
                                                                        <div className="col-10">
                                                                        
                                                                            {value.date} <img src={refuse} width="30" height="30" onClick={() => this.refuseDate(value.id)} align="right" title="Refuser la date" alt="Refuser la date"/> <img src={check} width="30" onClick={() => this.valideDate(value.id)} height="30" align="right" title="Validation de la date" alt="Validation de la date"/>
                                                                        
                                                                        </div>                                    
                                                                    
                                                                    
                                                                    </div>
                                                                
                                                                </div>)
                                                        )} 
                                            </div>
                                        </div>
                                        
                                        </div>
                                        <div className="col-md-6">
                                        

                                        <div class="card">
                                            <h5 class="card-header">Planning à venir</h5>
                                            <div class="card-body">
                                                {planningVld.map((value, index) => 
                                                                (<div key={index} className="planningAttente">
                                                                                    
                                                                        <div className="row">
                                                                        
                                                                            <div className="col-2">
                                                                            
                                                                                <img src={confirmation} width="30" height="30" alt="Planning en attente..."/>
                                                                            
                                                                            </div>
                                                                            <div className="col-10">
                                                                            
                                                                                {value.date}
                                                                            
                                                                            </div>                                    
                                                                        
                                                                        
                                                                        </div>
                                                                    
                                                                    </div>)
                                                            )} 
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>

                                    <br/>
                                    
                                    <div class="card">
                                            <h5 class="card-header">Historique du planning</h5>
                                            <div class="card-body">
                                                <table class="table table-striped">
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

                                </div>
                            {/* FIN CODE */}


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

export default Planningclient;
