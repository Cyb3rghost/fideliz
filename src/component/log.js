import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import Menu from './menu'
import Navbarup from './navbarup'

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
  
    fetch('http://127.0.0.1/fidapi/main.php?action=logpointages&ident=' + this.props.idUserRecup)
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

            <div className="table-responsive">
                <table className="table table-bordered bg-white" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                        <th>Client</th>
                        <th>Début pointage</th>
                        <th>Fin pointage</th>
                        <th>Code</th>
                        <th>Prestation</th>
                        <th>Prix</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                        <th>Client</th>
                        <th>Début pointage</th>
                        <th>Fin pointage</th>
                        <th>Code</th>
                        <th>Prestation</th>
                        <th>Prix</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        {this.state.dataPointage.map((value) => 
                            (
                                <tr>
                                    <td>{value.client}</td>
                                    <td>{value.departpointage}</td>
                                    <td>{value.finpointage}</td>
                                    <td>{value.code}</td>
                                    <td>{value.prestation}</td>
                                    <td>{value.prix}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                    </table>
                </div>


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
