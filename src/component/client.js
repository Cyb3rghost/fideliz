import React, { Component } from 'react';
import Menu from './menu'

import Footer from './footer'

import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';

class Client extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nombreClient: '',
            dataClient: []
        }


    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                nombreClient: response                    
            })

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=listeClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                dataClient: response
            })


        })
        .catch(err => console.error(err))


    }


    render() {
        const { dataClient } = this.state;
        return (
            <div>
          
            <Menu />    

            <div className="panelInfo">
            
                <div className="container-perso">
                    <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
                </div>
        
            </div>   

            <div className="wellClient">
                        <div className="row">

                            <div className="col-md-10">                     
                         
                                Nombre de client : <p className="resizeNbClient">{this.state.nombreClient}</p><br/>
                                
                            
                            </div>

                            <div className="col-md-2 padCircle">
                            
                                <a href="/nouveauclient"><img src={ajout} class="img-circle " width="70" height="70" alt="" /></a><br/>

                                <br/>                        
                            
                            </div>


                        </div>
            </div>

            <table class="table table-striped">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        {dataClient.map((value, index) => 
                            (<tr key={index}>
                                    <td>{value.nom}</td>
                                    <td>{value.prenom}</td>
                                    <td>{value.adresse}</td>
                                    <td>{value.telephone}</td>
                                    <td>{value.email}</td>
                                    <td><a href={"/voirclient?id=" + value.id}>Voir</a> - Editez</td>
                                </tr>
                            )
                        )}
                        </tbody>
                </table>            

            <Footer />

            </div>
        );
    }

}

export default Client;