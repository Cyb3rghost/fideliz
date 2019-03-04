import React, { Component } from 'react';
import { render } from "react-dom";
import Loader from 'react-loader-spinner'

import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from 'globalize'

import Navbarup from './navbarup'
import Menu from './menu'

require('globalize/lib/cultures/globalize.culture.fr')

 const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

 const propTypes = {}
 const items = [

 ];


class Planning extends Component {

    constructor(props)
    {

        super(props)   
        this.state = {
            events: [],
            items: [],
            view: "day",
            date: new Date(),
            width: 500,
            culture: 'fr',
            loading: true
        }

    }

    componentDidMount() {

      const idClient = this.props.match.params.id
      fetch('http://127.0.0.1/fidapi/main.php?action=affichePlanning' 
      + '&idEntreprise=' + this.props.idUserRecup
      + '&idclt=' + idClient
      + '&statut=1')
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        this.setState({events:response})

        var testInfo = this.state.events.map( function(value) {

              if(value.statut === '1')
              {

                var txtmsg = "[ATT]"

              }
              else if(value.statut === "2")
              {

                var txtmsg = "[CONF]"

              }

              var addDataItems = { 
                id: value.id,
                title: value.title + ' - ' + txtmsg,
                start: new Date(value.reelstart),
                end: new Date(value.reelend),
                statut: value.statut,
                                  }
              return addDataItems;
        });

        items.push(...testInfo);
        this.setState({events:items})


      })
      .catch(err => console.error(err))      

    }

    handleSelect = ({ start, end }) => {
      const title = window.prompt('New Event name')
      const idClient = this.props.match.params.id
      if (title)
        console.log(title + ' / ' + start + ' / ' + end)
        fetch('http://127.0.0.1/fidapi/main.php?action=ajoutPlanningEntreprise&idEntreprise=' + this.props.idUserRecup 
        + '&idclt=' + idClient
        + '&nom=' + title
        + '&startdate=' + start.toLocaleDateString()
        + '&endDate=' + end.toLocaleDateString()
        + '&startheure=' + start.toLocaleTimeString()
        + '&endheure=' + end.toLocaleTimeString()
        + '&statut=1'
        + '&reelstart=' + start.toUTCString()
        + '&reelend=' + end.toUTCString())
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          
          this.setState({
            events: [
              ...this.state.events,
              {
                title,
                start,
                end,
                statut: '1'
              },
            ],
          })

        })
        .catch(err => console.error(err))

    }

    //Clicking an existing event allows you to remove it
    onSelectEvent(pEvent) {
      console.log(pEvent)
      const r = window.confirm(pEvent.title + '\nS: ' + pEvent.start + '\nE:' + pEvent.end + '\nStatut :' + pEvent.statut + "Would you like to remove this event?")
      if(r === true){
        
        fetch('http://127.0.0.1/fidapi/main.php?action=suppressionRdv' 
        + '&id=' + pEvent.id)
        .then((response) => response.json())
        .then((response) => {
  
          if(response === "#DELRDV#SUCCESS")
          {

            console.log(response)

            this.setState((prevState, props) => {
              const events = [...prevState.events]
              const idx = events.indexOf(pEvent)
              events.splice(idx, 1);
              return { events };
            });

          }
          else if(response === "#DELRDV#FAILED")
          {

            console.log(response)

          }

        })
        .catch(err => console.error(err)) 



      }
    }

  render() {
    const localizer = BigCalendar.globalizeLocalizer(globalize) 

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                            <Navbarup idUser={this.props.idUserRecupClient} />

                            <div className="container-fluid">

                            <div className="row">

                                    <div className="col-8">
                                    
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h1 className="h3 mb-0 text-gray-800">Gestion du planning</h1>
                                        </div>

                                    </div>    

                            </div>
                            <div className="bg-white" style={{ height: 700 }}>
                                      <button onClick={() => this.setState({ view: "month" })}><i class="fas fa-plus-square"></i></button>
                                      <button onClick={() => this.setState({ view: "day" })}>Day</button>
                                      <button onClick={() => this.setState({ view: "month" })}>Month</button>
                                      <button onClick={() => this.setState({ view: "week" })}>Week</button>
                                      
                                      <BigCalendar
                                        selectable
                                        localizer={localizer}
                                        events={this.state.events}
                                        toolbar={true}
                                        step={15}
                                        timeslots={8}
                                        culture={this.state.culture}
                                        view={this.state.view}
                                        onView={() => {}}
                                        date={this.state.date}
                                        onNavigate={date => this.setState({ date })}
                                        onSelectEvent={event => this.onSelectEvent(event)}
                                        onSelectSlot={this.handleSelect}
                                      /> 
                                      
                                    </div>   
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

Planning.propTypes = propTypes

export default Planning;
