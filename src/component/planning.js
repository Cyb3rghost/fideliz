import React, { Component } from 'react';
import { render } from "react-dom";
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from 'globalize'
import moment from 'moment'

import Footer from './footer'
import Menu from './menu'

require('globalize/lib/cultures/globalize.culture.fr')


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
            view: "week",
            date: new Date(),
            width: 500,
            culture: 'fr',
            loading: true
        }

    }

    componentDidMount() {

      var txtmsg = ''

      fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=affichePlanning' 
      + '&idEntreprise=' + this.props.idUserRecup)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        this.setState({events:response})

        var testInfo = this.state.events.map( function(value) {

              if(value.statut === '1')
              {

                txtmsg = "[ATT]"

              }
              else if(value.statut === "2")
              {

                txtmsg = "[CONF]"

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
        console.log(title + ' / ' + start + ' / ' + end + ' - ' + start.toLocaleDateString() + ' - ' + end.toLocaleDateString())

        var refonteDateStart = start.toLocaleDateString().split('/')
        var nouvelleDateStart = refonteDateStart[2] + '-' + refonteDateStart[1] + '-' + refonteDateStart[0]
        var refonteEndStart = end.toLocaleDateString().split('/')
        var nouvelleDateEnd = refonteEndStart[2] + '-' + refonteEndStart[1] + '-' + refonteEndStart[0]

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutPlanningEntreprise&idEntreprise=' + this.props.idUserRecup 
        + '&idclt=' + idClient
        + '&nom=' + title
        + '&startdate=' + nouvelleDateStart
        + '&endDate=' + nouvelleDateEnd
        + '&startheure=' + start.toLocaleTimeString()
        + '&endheure=' + end.toLocaleTimeString()
        + '&statut=1'
        + '&reelstart=' + start.toUTCString()
        + '&reelend=' + end.toUTCString()
        + '&idpropo=' + this.props.idUserRecup)
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
                idclient: idClient,
                statut: '1'
              },
            ],
          })

        })
        .catch(err => console.error(err))

    }

    //Clicking an existing event allows you to remove it
    onSelectEvent(pEvent) {
      console.log(pEvent.idclient)
      const idClient = this.props.match.params.id

      if(pEvent.idclient === idClient)
      {

          if(pEvent.idproposant === this.props.idUserRecup)
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
      
                      
                      setTimeout(() => window.location.pathname = '/planning/' + idClient, 1500)
          
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

                                            if(event.idclient === this.props.match.params.id)
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

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu />

                    {loadingdata}

                    <br/>
                    <br/>
                    <br/>

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

Planning.propTypes = propTypes

export default Planning;
