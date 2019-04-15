import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Menu from './menu'
import Footer from './footer'

import MaterialTable from 'material-table'



class Log extends Component {

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
  
    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=logpointages&ident=' + this.props.idUserRecup
    + '&apikey=' + this.props.apikey)
    .then((response) => response.json())
    .then((response) => {

        
        if(response === "#LOGPOINTAGE#VIDE")
        {

            console.log(response)
            this.setState({
                loading: true
            })

        }
        else
        {

            this.setState({
                dataPointage: response,
                loading: true
            })

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
                { title: 'Identifiant', field: 'id' },
                { title: 'Idcarte', field: 'idcarte' },
                { title: 'Client', field: 'client' },
                { title: 'Pointage', field: 'finpointage' },
                { title: 'Code', field: 'code' },
                { title: 'Prestation', field: 'prestation' },
                { title: 'Prix', field: 'prix'},
              ]}
              data={ this.state.dataPointage.map( function(value) {
              
                  var addDataItems = { 
                  id: value.id,
                  idcarte: 'IDC' + value.idcarte,
                  client: value.client,
                  finpointage: value.finpointage,
                  code: value.code,
                  prestation: value.prestation,
                  prix: value.prix + ' €'
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

                        <Menu title="Suivit du pointage" />

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

export default Log;
