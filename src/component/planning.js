import React, { Component } from 'react';

import Menu from './menu'
import calendrier from '../images/calendar.png'
import ajout from '../images/ajout.png'

class Planning extends Component {



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
                  <h2><img src={calendrier} width="70" height="70" alt="Responsive image"/> Gestion de planning</h2>
              </div>
          
          </div>         
          
          <div className="page-header">
              <div className="container-perso">

                    <div className="row">
                
                        <div className="col-xs-8">
                        
                            <h1>Gestion de planning client <br/></h1>
                            <p className="text-justify">Cette interface vous permettra de définir un planning avec votre client.</p>
                        
                        </div>
                        <div className="col-xs-4 cadreAddCarte">
                        
                            <img src={ajout} width="70" height="70" alt="Responsive image"/>

                        </div>
                    
                    </div>
              </div>
          </div>

          <div className="container">
                <div className="row">
                    <div className="col-md-3 no-float">Navigation</div>
                    <div className="col-md-9 no-float">Content</div>
                </div>
            </div>
          
  
          </div>
        );
      }
    }
  
  export default Planning;