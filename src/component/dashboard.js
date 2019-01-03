import React, { Component } from 'react';
import Menu from './menu'

import dashboard from '../images/dashboard.png'

class Dashboard extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            totalClient: '',
            nbClient: '',
            limitClient: '',
            nbPointage: '',
            limitPointage: '',
            typeCompte: '',
            debutAbo: '',
            finAbo: '', 
            jRestants: '',
            apikey: ''
        }

    }

    componentDidMount()
    {

        alert('Secure : ' + this.props.loggedIn + '\nId : ' + this.props.idUserRecup)

        fetch('http://127.0.0.1/fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        nbClient: value.nbclient,
                        limitClient: value.limitclient,
                        nbPointage: value.nbpointage,
                        limitPointage: value.limitpointage,
                        typeCompte: value.typecompte,
                        debutAbo: value.debutabo,
                        finAbo: value.finabo, 
                        jRestants: value.jrestant,
                        apikey: value.apikey                        
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                totalClient: response                    
            })

        })
        .catch(err => console.error(err))


    }

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
                        <div class="panel-body"><h1>{this.state.totalClient}</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">LIMITE DE CLIENTS</div>
                        <div class="panel-body"><h1>{this.state.nbClient} / {this.state.limitClient} </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">
                        <div class="panel panel-default">
                            <div class="panel-heading">LIMITE DE POINTAGES</div>
                            <div class="panel-body"><h1>{this.state.nbPointage} / {this.state.limitPointage} </h1></div>
                        </div>                
                
                </div>

        <br/>

        </div>
        </div>

        <div className="container-perso">
            <div className="row">
            
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">TYPE DE COMPTE</div>
                        <div class="panel-body">
                        {this.state.typeCompte === '0' && <h1>Normal</h1>}
                        {this.state.typeCompte === '1' && <h1>Premium</h1>}
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">DEBUT ABONNEMENT</div>
                        <div class="panel-body"><h1>{this.state.debutAbo} </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">FIN ABONNEMENT</div>
                            <div class="panel-body"><h1>{this.state.finAbo}</h1></div>
                        </div>                
                
                </div>


            </div>
        </div>


        <div className="container-perso">
            <div className="row">
            
            <div className="col-md-4">

                <div class="panel panel-default">
                    <div class="panel-heading">JOURS RESTANT</div>
                    <div class="panel-body"><h1>{this.state.jRestants}</h1></div>
                </div>

                </div>
                <div className="col-md-4">

                <div class="panel panel-default">
                    <div class="panel-heading">APIKEY</div>
                    <div class="panel-body"><h4>{this.state.apikey}</h4></div>
                </div>                


                </div>
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading"></div>
                        <div class="panel-body"></div>
                    </div>                

                </div>


            </div>
        </div>


        </div>


      );
    }
}

export default Dashboard;