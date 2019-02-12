import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Navbarup from './navbarup'
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

                    <Navbarup idEntreprise={this.props.idUserRecup} />

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
