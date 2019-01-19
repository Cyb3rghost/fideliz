import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Menu from './menuclient'
import calendrier from '../../images/calendar.png'
import ajout from '../../images/ajout.png'
import attente from '../../images/attente.png'
import confirmation from '../../images/confirme.png'

import Footer from '../footer'


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

        fetch('http://127.0.0.1/fidapi/main.php?action=planningAttente&identreprise=' + this.props.idEntRecupClient
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

        fetch('http://127.0.0.1/fidapi/main.php?action=planningValider&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + idclient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            if(response === "#PLANNINGVLD#VIDE")
            {

                this.setState({
                    statutMsgPlanning: '4'
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

        fetch('http://127.0.0.1/fidapi/main.php?action=planningHistorique&identreprise=' + this.props.idEntRecupClient
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

        alert("http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=" + this.props.idEntRecupClient + "&idclient=" + idclient + "&date=" + this.state.startDate.toLocaleDateString() + "&heures=" + this.state.heures)

        fetch('http://127.0.0.1/fidapi/main.php?action=addPlanning&identreprise=' + this.props.idEntRecupClient
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
            else if(response === "#ADDPLANNING#EXISTE")
            {

                this.setState({
                    statutMsgPlanning: '3'
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
        else if(this.state.statutMsgPlanning === "3")
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
            
          <Menu />
  
          <div className="panelInfo">
              
              <div className="container-perso">
                  <div className="row">

                        <div className="col-md-6">

                            <h2><img src={calendrier} width="70" height="70" alt="Responsive image"/> Gestion de planning </h2>

                        </div>

                        <div className="col-md-6 cadreProposeDate">

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
                                <button type="submit" onClick={() => this.addPlanning(idClient)} className="btn btn-fidelizPerso">Proposer cette date</button>
                            </div>
                            </center>

                        </div>

                  </div>
              </div>
          
          </div>         

          {this.afficheStatutPlanning()}
          <br/>

          <div className="container-perso">
                <div className="row">
                    <div className="col-md-6">
                    
                        <div class="panel panel-default">
                            <div className="panel-heading">Planning en attente</div>
                            <div className="panel-body-perso-left">
                            
                                {planningAtt.map((value, index) => 
                                    (<div key={index} className="planningAttente">
                                                        
                                            <div className="row">
                                            
                                                <div className="col-xs-2">
                                                
                                                    <img src={attente} width="30" height="30" alt="Planning en attente..."/>
                                                
                                                </div>
                                                <div className="col-xs-10">
                                                
                                                    {value.date}
                                                
                                                </div>                                    
                                            
                                            
                                            </div>
                                        
                                        </div>)
                                )} 
                            
                            </div>
                        </div>
                    
                    </div>
                    <div className="col-md-6">
                    

                    <div class="panel panel-default">
                            <div className="panel-heading">Planning à venir</div>
                            <div className="panel-body-perso-right">
                            
                                {planningVld.map((value, index) => 
                                        (<div key={index} className="planningAttente">
                                                            
                                                <div className="row">
                                                
                                                    <div className="col-xs-2">
                                                    
                                                        <img src={confirmation} width="30" height="30" alt="Planning en attente..."/>
                                                    
                                                    </div>
                                                    <div className="col-xs-10">
                                                    
                                                        {value.date}
                                                    
                                                    </div>                                    
                                                
                                                
                                                </div>
                                            
                                            </div>)
                                    )} 

                            
                            </div>
                        </div>


                    
                    </div>
                </div>
            
                <div class="panel panel-default">
                    <div className="panel-heading">Historique du planning</div>
                    <div className="panel-body-perso-right">

                    <table class="table table-striped">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        {planningHst.map((value, index) => 
                            (<tr key={index}>

                            <td>{value.date}</td>
                            {value.statut === '5' && <td><span className="badgeAccepter">Terminer</span></td>}  
                            {value.statut === '4' && <td><span className="badgeAccepter">Accepter</span></td>} 
                            {value.statut === '3' && <td><span className="badgeRefuser">Refuser</span></td>} 
                                 
                                
                            </tr>)
                        )} 
                        </tbody>
                    </table>

                    </div>
                </div>
            
            
            </div>


          
            <Footer />
  
          </div>
        );
      }
    }
  
  export default Planningclient;