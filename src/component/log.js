import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Menu from './menu'
import Navbarup from './navbarup'

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

var items = [

];

const { SearchBar } = Search;
const columns = [{
    dataField: 'id',
    text: 'Identifiant',
    sort: true
  }, {
    dataField: 'idcarte',
    text: 'IDCarte',
  },{
    dataField: 'client',
    text: 'Client',
  }, {
    dataField: 'departpointage',
    text: 'Début pointage',
  }, {
    dataField: 'finpointage',
    text: 'Fin pointage',
  }, {
    dataField: 'code',
    text: 'Code',
  }, {
    dataField: 'prestation',
    text: 'Prestation',
  }, {
    dataField: 'prix',
    text: 'Prix',
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

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
  
    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=logpointages&ident=' + this.props.idUserRecup)
    .then((response) => response.json())
    .then((response) => {

        
        if(response === "#LSTPOINTAGE#VIDE")
        {

            console.log(response)

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

        loadingdata = <div><Navbarup idEntreprise={this.props.idUserRecup} />
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Log des pointages</h1>
            </div>

            <hr/>

            <ToolkitProvider
                keyField="id"
                data={ this.state.dataPointage.map( function(value) {
            
                    var addDataItems = { 
                    id: value.id,
                    idcarte: 'IDC' + value.idcarte,
                    client: value.client,
                    departpointage: value.departpointage, 
                    finpointage: value.finpointage,
                    code: value.code,
                    prestation: value.prestation,
                    prix: value.prix + ' €'
                                        }
                    return addDataItems;
                }) }
                columns={ columns }
                search


                >
                {
                    props => (
                    <div>
                        <div className="row">
                        
                            <div className="col-md-8">
                            
                            
                            </div>
                            <div className="col-md-4">
                            
                                <SearchBar { ...props.searchProps } />

                            </div>
                        
                        </div>
                        <hr />
                        <div className="bg-white">
                            <BootstrapTable 
                                { ...props.baseProps }
                                ref={ n => this.node = n }
                                filter={ filterFactory() }
                                pagination={ paginationFactory() }
                                selectRow={ { mode: 'checkbox', clickToSelect: true } }
                                defaultSorted={ defaultSorted } 
                                striped
                                hover
                                condensed
                            />
                        </div>
                    </div>
                    )
                }
            </ToolkitProvider>
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

                    <Menu />

                    <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        {loadingdata}

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2019</span>
                        </div>
                        </div>
                    </footer>

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
