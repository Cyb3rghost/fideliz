import React, { Component } from 'react';
import { render } from "react-dom";
import Loader from 'react-loader-spinner'
import Configuration from '../fidconfig'

import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from 'globalize'

import Navbarup from './navbarupclient'
import Menu from './menuclient'

require('globalize/lib/cultures/globalize.culture.fr')

 const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

 const propTypes = {}
 const items = [

 ];

class Planningclient extends Component {

    constructor(props)
    {

        super(props)   
        this.state = {
            events: [],
            items: [],
            view: "week",
            date: new Date(),
            width: 500,
            culture: 'fr',
            loading: true
        }

    }

    componentDidMount() {

      fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=affichePlanning' 
      + '&idEntreprise=' + this.props.idEntRecupClient
      + '&idclt=' + this.props.idUserRecupClient)
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
                idclient: value.idclient,
                statut: value.statut,
                idproposant: value.idproposant,
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
      if (title)
        console.log(title + ' / ' + start + ' / ' + end)
        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutPlanningEntreprise&idEntreprise=' + this.props.idEntRecupClient 
        + '&idclt=' + this.props.idUserRecupClient
        + '&nom=' + title
        + '&startdate=' + start.toLocaleDateString()
        + '&endDate=' + end.toLocaleDateString()
        + '&startheure=' + start.toLocaleTimeString()
        + '&endheure=' + end.toLocaleTimeString()
        + '&statut=1'
        + '&reelstart=' + start.toUTCString()
        + '&reelend=' + end.toUTCString()
        + '&idpropo=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

          
          if(response === "#PLAGE#NONDISPONIBLE")
          {

            console.log(response)

          }
          else if(response === "#ADDPLANNING#SUCCESS")
          {

            console.log(response)
            this.setState({
              events: [
                ...this.state.events,
                {
                  title,
                  start,
                  end,
                  idclient: this.props.idUserRecupClient,
                  statut: '1'
                },
              ],
            })

          }
          else if(response === "#ADDPLANNING#FAILED")
          {

            console.log(response)

          }

        })
        .catch(err => console.error(err))

    }

    //Clicking an existing event allows you to remove it
    onDoubleClickEvent(pEvent) {
      console.log(pEvent.id)

      if(pEvent.idclient === this.props.idUserRecupClient)
      {


        if(pEvent.idproposant == this.props.idUserRecupClient)
        {
  
          const r = window.confirm(pEvent.title + '\nS: ' + pEvent.start + '\nE:' + pEvent.end + '\nStatut :' + pEvent.statut + '\n Id propo : ' + pEvent.idproposant + "\n Voulez-vous supprimer cette évènement ?")
  
          if(r === true)
          {
  
              fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=suppressionRdv' 
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
        else
        {
  
          if(pEvent.statut === "1")
          {
    
            const r = window.confirm(pEvent.title + '\nS: ' + pEvent.start + '\nE:' + pEvent.end + '\nStatut :' + pEvent.statut + '\n Id propo : ' + pEvent.idproposant + "\n Voulez-vous confirmer votre rendez-vous ? (Ok) pour confirmer (Annuler) pour refuser.")
    
            if(r === false){
              
              fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=suppressionRdv' 
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
            else
            {
    
                fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=confirmationRdv' 
                + '&id=' + pEvent.id)
                .then((response) => response.json())
                .then((response) => {
          
                  if(response === "#CONFRDV#SUCCESS")
                  {
        
                    console.log(response)
    
                    
                    setTimeout(() => window.location.pathname = '/planningclient', 1500)
        
                  }
                  else if(response === "#CONFRDV#FAILED")
                  {
        
                    console.log(response)
        
                  }
        
                })
                .catch(err => console.error(err))
    
            }
    
    
          }
          else
          {
    
            console.log("Aucune action possible sur une action confirmer !")
    
          }
          
        }


      }
      
    }
   


  render() {
    const localizer = BigCalendar.globalizeLocalizer(globalize) 

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

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
                                      <button onClick={() => this.setState({ view: "agenda" })}>Agenda</button>
                                      
                                      <BigCalendar
                                        selectable
                                        localizer={localizer}
                                        eventPropGetter={
                                          (event, start, end, statut, idclient) => {
                                            let newStyle = {
                                              backgroundColor: "#3174ad",
                                              color: '#fff',
                                              borderRadius: "0px",
                                              border: "none",
                                              width: "100%",
                                              padding: "2px 5px",
                                              boxshadow: "none",
                                              margin: "0"
                                            };
                                      
                                            if(event.idclient === this.props.idUserRecupClient)
                                            {

                                              if (event.statut === "1"){
                                                newStyle.backgroundColor = "#ffa000"
                                                newStyle.color = "#FFF"
                                                newStyle.borderColor = "#ffa000";
                                              }
                                        
                                              if (event.statut === "2"){
                                                newStyle.backgroundColor = "#43a047"
                                                newStyle.color = "#FFF"
                                                newStyle.borderColor = "#43a047";
                                              }

                                            }
                                            else
                                            {

                                              newStyle.backgroundColor = "#D32F2F"
                                              newStyle.color = "#D32F2F"
                                              newStyle.borderColor = "#D32F2F";

                                            }


                                            return {
                                              className: "",
                                              style: newStyle
                                            };
                                          }
                                        }
                                        events={this.state.events}
                                        toolbar={false}
                                        step={60}
                                        timeslots={1}
                                        culture={this.state.culture}
                                        view={this.state.view}
                                        onView={() => {}}
                                        date={this.state.date}
                                        onNavigate={date => this.setState({ date })}
                                        onDoubleClickEvent={event => this.onDoubleClickEvent(event)}
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

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu />

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

Planningclient.propTypes = propTypes

export default Planningclient;
