import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Loader from 'react-loader-spinner'

import "react-datepicker/dist/react-datepicker.css";

import Navbarup from './navbarup'
import Menu from './menu'
import calendrier from '../images/calendar.png'
import attente from '../images/attente.png'
import confirmation from '../images/confirme.png'

require('moment/locale/fr.js');

var items = [

];

class Planning extends Component {

    constructor(props)
    {

        super(props)   
        this.state = {
          events: [
          ],
          startDate: new Date(),
          endDate: new Date(),
          agendaDate: new Date(),
          titleRDV: '',
          statutMsg: '',
          loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeAgenda = this.handleChangeAgenda.bind(this);
    }

    componentDidMount()
    {

      var dateDuJour = this.state.agendaDate.toLocaleDateString()

      fetch('http://127.0.0.1/fidapi/main.php?action=affichePlanning&today=' + dateDuJour)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        this.setState({events:response})

      })
      .catch(err => console.error(err))


    }

    handleChange(date) {
      console.log(date)
      this.setState({
        startDate: date
      });
    }

    handleChangeEnd(date) {
      console.log(date)
      this.setState({
        endDate: date
      });
    }

    handleChangeAgenda(date) {
      console.log(date)
      this.setState({
        agendaDate: date
      });

      var dateDuJour = this.state.agendaDate.toLocaleDateString()

      fetch('http://127.0.0.1/fidapi/main.php?action=affichePlanning&today=' + dateDuJour)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        this.setState({events:response})

      })
      .catch(err => console.error(err))

    }

    addRdv()
    {

        if(this.state.startDate.toLocaleDateString() === this.state.endDate.toLocaleDateString())
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=ajoutPlanningEntreprise&idEntreprise=2&idclt=0&nom=' + this.state.titleRDV
            + '&startdate=' + this.state.startDate.toLocaleDateString()
            + '&endDate=' + this.state.endDate.toLocaleDateString()
            + '&startheure=' + this.state.startDate.toLocaleTimeString()
            + '&endheure=' + this.state.endDate.toLocaleTimeString())
            .then((response) => response.json())
            .then((response) => {
              console.log(response)
            })
            .catch(err => console.error(err))


        }
        else
        {

            this.setState({
              statutMsg: '1'
            })
        }



    }

  render() {

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                            <Navbarup idUser={this.props.idUserRecupClient} />

                            <div className="container-fluid">

                            <div className="row">

                                    <div className="col-md-12">
                                    
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h1 className="h3 mb-0 text-gray-800">Gestion du planning</h1>
                                        </div>

                                    </div>
              

                            </div>

                            <div className="card">

                            <div className="card-body">
                              <label>Titre du rendez-vous : </label><input 
                              className="form-control" 
                              value={this.state.titleRDV}
                              onChange={(e) => this.setState({titleRDV: e.target.value})}
                              />
                              <br/>
                              <label>Départ du rendez-vous :  </label>
                              <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        showTimeSelect
                                        timeIntervals={15}
                                        dateFormat="d/MM/yyyy h:mm"
                                        timeCaption="time"
                                        className="form-control"
                              />
                              <label>Fin du rendez-vous :  </label>
                              <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.handleChangeEnd}
                                        showTimeSelect
                                        timeIntervals={15}
                                        dateFormat="d/MM/yyyy h:mm"
                                        timeCaption="time"
                                        className="form-control"
                              /><br/>
                              <br/>
                              <button type="button" onClick={this.addRdv.bind(this)} class="btn btn-primary">Prise d'un rendez-vous</button>
                            </div>
                            </div>
                            <br/>

                            <table class="table table-dark">
                              <thead>
                                <tr>
                                  <th> <DatePicker
                                            selected={this.state.agendaDate}
                                            onChange={this.handleChangeAgenda}
                                            dateFormat="d/MM/yyyy"
                                  /></th>
                                  <th scope="col">Temps</th>
                                  <th scope="col">Evènement</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.events.map((value) => 
                                    (
                                        <tr>
                                            <td></td>
                                            <td>{value.departheure} à {value.finheure}</td>
                                            <td>{value.title}</td>
                                        </tr>
                                    )
                                )}
                              </tbody>
                            </table>
                            
                            </div>

        </div>


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

export default Planning;
