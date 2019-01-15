import React, { Component } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import Menu from './menu'
import calendrier from '../images/calendar.png'
import ajout from '../images/ajout.png'
import attente from '../images/attente.png'
import confirmation from '../images/confirme.png'

import Footer from './footer'


class Planning extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }

    render() {
      
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
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="Temps"
                                    />
                                </div>
                                <button type="submit" className="btn btn-default">Proposer cette date</button>
                            </div>
                            </center>

                        </div>

                  </div>
              </div>
          
          </div>         

          <br/>

          <div className="container-perso">
                <div className="row">
                    <div className="col-md-6">
                    
                        <div class="panel panel-default">
                            <div className="panel-heading">Planning en attente</div>
                            <div className="panel-body-perso-left">
                            
                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                        
                                            <img src={attente} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                    
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={attente} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={attente} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={attente} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                            
                            </div>
                        </div>
                    
                    </div>
                    <div className="col-md-6">
                    

                    <div class="panel panel-default">
                            <div className="panel-heading">Planning à venir</div>
                            <div className="panel-body-perso-right">
                            
                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                        
                                            <img src={confirmation} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                    
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={confirmation} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={confirmation} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                                <div className="planningAttente">
                                
                                    <div className="row">
                                    
                                        <div className="col-xs-2">
                                            
                                            <img src={confirmation} width="30" height="30" alt="Responsive image"/>
                                        
                                        </div>
                                        <div className="col-xs-10">
                                        
                                            15/01/2019<br/>
                                            <small>22H10</small>
                                        
                                        </div>                                   
                                    
                                    
                                    </div>
                                
                                </div>

                            
                            </div>
                        </div>


                    
                    </div>
                </div>
            
                <div class="panel panel-default">
                    <div className="panel-heading">Historique du planning</div>
                    <div className="panel-body-perso-right">

                        qsdlqkjdqlskdjqldksj

                    </div>
                </div>
            
            
            </div>


          
            <Footer />
  
          </div>
        );
      }
    }
  
  export default Planning;