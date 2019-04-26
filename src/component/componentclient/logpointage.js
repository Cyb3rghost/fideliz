import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from '../fidconfig'

import Menu from './menuclient'
import Footer from '../footer'

import MaterialTable from 'material-table'



class Logpointages extends Component {

  constructor(props)
  {

    super(props)
    this.state = {
        dataPointage: [],
        loading: false
    }

  }

  componentDidMount()
  {

    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=listePointageClient'
    + '&idclient=' + this.props.idUserRecupClient 
    + '&ident=' + this.props.idEntRecupClient
    + '&apikey=' + this.props.apikey)
    .then((response) => response.json())
    .then((response) => {

        switch (response) {
            case '#POINTAGE#VIDE':
                console.log(response)
                this.setState({
                    cartePointageMsg: '5'
                })
                break;            
            default:
                console.log(response)
                this.setState({
                    dataPointage: response,
                    loading: true
                })
                break;
        }

    })
    .catch(err => console.error(err))


  }

  render() {

    let loadingdata;


    
    if(this.state.loading)
    {

        loadingdata = <div>
        <div className="container-fluid">
        
            <MaterialTable
              columns={[
                { title: 'Entreprise', field: 'entreprise' },
                { title: 'Fin pointage', field: 'finpointage' },
                { title: 'Prestation', field: 'prestation' },
                { title: 'Prix', field: 'prix' },
              ]}
              data={ this.state.dataPointage.map( function(value) {
              
                  var addDataItems = { 
                  entreprise: value.entreprise,
                  finpointage: value.finpointage,
                  prestation: value.prestation,
                  prix: value.prix
                                      }
                  return addDataItems;
              }) }
              title="Pointages"
            />

            <br />



        </div></div>

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



                    <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <Menu title="Suivit des pointages" />

                        <br/>
                        <br/>
                        
                        {loadingdata}

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

export default Logpointages;
