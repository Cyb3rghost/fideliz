import React, { Component } from 'react';

import Menu from './menu'

import fidelityCard from '../images/fidelitycard.png';
import backgroundCarte from '../images/backgroundCarte.jpg';
import logoCarte from '../images/logocarte.png';
import qrCode from '../images/qrcode.png';

class Ajoutcarte extends Component {


    render() {
        return (
          <div id="wrapper">
            
          <Menu />
  
          <nav className="navbar navbar-inverse">
                  <div className="container-fluid">
                      <div className="navbar-header">
                      <a className="navbar-brand" href="#"></a>
                      </div>
                      <ul className="nav navbar-nav navbar-right">
                      <li className="active"><a href="#">Home</a></li>
                      <li><a href="#">Page 1</a></li>
                      <li><a href="#">Page 2</a></li>
                      <li><a href="#">Page 3</a></li>
                      </ul>
                  </div>
          </nav>
          <div className="panelInfo">
              
              <div className="container-perso">
                  <h2><img src={fidelityCard} width="70" height="70" alt="Responsive image"/> Création de carte</h2>
              </div>
          
          </div>         
  
          
          <div className="page-header">
              <div className="container-perso">
                    <h1>ETAPE 2 - Création de la carte <br/></h1>
                    <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                    et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
              </div>
          </div>
          
          <br/>

          <div className="container-perso">

            <div className="wellAddCarte">
                <div className="row">
                
                    <div className="col-md-4">
                    
                        <div className="panelCarte">
                            <div id="personalizecarte">  
                                <img src={backgroundCarte} className="img-responsive" id="img1" alt="" />
                                <img src={logoCarte}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                                <img src={qrCode}  width="60" height="60" id="img3" className="img-rounded" alt="" />
                            
                            </div> 
                        </div>  
                        <br/>
                    
                    </div>
                    <div className="col-md-8">
                    
                        
                        
                            <label>Date : </label> 04/01/2019
                            <br/>
                            <label>Image de fond : </label> backgroundCarte.jpg
                            <br/>
                            <label>Icône : </label> logoCarte.png <br/>
                            <br/>
                            <div class="form-group">
                                <label>Limitation pointage : </label>
                                <select class="form-control">
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
                                <select class="form-control">
                                    <option>1 coupe gratuite</option>
                                    <option>1 shampooing</option>
                                    <option>1 Brushing</option>
                                </select>
                            </div>
                            <button class="btn btn-loginConnexion btn-block" type="submit">Création de la carte</button>
                        
                    
                    
                    </div>
                
                
                </div>
            </div>
                    
                     


          </div>  
                         
          
            
          </div>
        );
      }
    }
  
  export default Ajoutcarte;