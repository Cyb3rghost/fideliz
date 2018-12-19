import React, { Component } from 'react';
import Menu from './menu'


import dashboard from '../images/dashboard.png'



class Dashboard extends Component {


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
                <h2><img src={dashboard} width="70" height="70" alt="Responsive image"/> DASHBOARD</h2>
            </div>
        
        </div>         
        <br/>

        <div className="container-perso">
            <div className="row">
            
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">CLIENTS</div>
                        <div class="panel-body"><h1>350</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">LIMITE DE CLIENTS</div>
                        <div class="panel-body"><h1>5 / 10 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">LIMITE DE POINTAGES</div>
                            <div class="panel-body"><h1>10 / 15 </h1></div>
                        </div>                
                
                </div>

                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">TYPE DE COMPTE</div>
                        <div class="panel-body"><h1>PREMIUM</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">DEBUT ABONNEMENT</div>
                        <div class="panel-body"><h1>18/12/2018 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">FIN ABONNEMENT</div>
                            <div class="panel-body"><h1>20/12/2018 </h1></div>
                        </div>                
                
                </div>


            </div>
        </div>


          
        </div>
      );
    }
  }

export default Dashboard;