import React, { Component } from 'react';
import Configuration from '../fidconfig'

import Menu from './menuclient'
import Footer from '../footer'

class Mescadeaux extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeauxAttente: [],
            cadeauxRecu: [],
            statutConfirmationCadeaux: '',
            statutCadeauxAttente: '',
            statutCadeauxRecu: '',
        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheCadeauxRecu&id=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AFFCADEAUXRECU#ECHEC")
            {

                this.setState({
                    statutCadeauxRecu: '2'
                })



            }
            else
            {

                this.setState({
                    cadeauxRecu: response,
                    statutCadeauxRecu: '1'
                })                

            }


    

        })
        .catch(err => console.error(err))        

    }

    afficheCadeauxRecu()
    {

        if(this.state.statutCadeauxRecu === '1')
        {

            return this.state.cadeauxRecu.map(value => {
                return ( <div key={value.id}>
                    <div  className="wellCadeaux">
                        <div className="container-perso">

                            <b>Cadeaux reçu le :</b> {value.datereceptioncadeaux} <br/>
                            <b>IDC :</b> {value.idcarte} - <b>QRCODE :</b> {value.code} <br/>
                            <i className="fas fa-gifts"></i> : {value.cadeaux} - {value.prix} €<br/>
                       
                        </div>
                </div>
                
                </div>
                        )
            })


        }
        else if (this.state.statutCadeauxRecu === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Vous n'avez reçu aucun cadeaux !
        
            </div>

        }



    }




  render() {

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu title="Cadeaux de fidélités" />

                    <div className="container-fluid">

                    <hr/>
                    
                    {/* DEBUT CODE */}

                    <div className="page-header">
                        <div className="container-perso">

                            <h1><i className="fas fa-gifts"></i> Cadeaux reçu... <br/></h1>
                            <p className="text-justify">Vous trouverez ici vos prestations terminées.</p>

                        </div>
                    </div>    

                    {this.afficheCadeauxRecu()}

                    {/* FIN CODE */}


                    </div>

                </div>

                <Footer />

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

      </div>
    );
  }
}

export default Mescadeaux;
