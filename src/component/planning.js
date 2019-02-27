import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import moment from 'moment';


import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';

import Navbarup from './navbarup'
import Menu from './menu'

import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';

var now = new Date();

require('moment/locale/fr.js');

    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)"
    }


/*var items = [
  {
   _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1 color-4'
  },
  {
   _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2'
  },
  {
   _id            :guid(),
    name          : 'Conference , plaza',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11 , 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 14 ,30),
    classes       : 'color-4'
  },
  {
   _id            :'event-4',
    name          : 'Customers issues review',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 15, 0),
    classes       : 'color-3'

  },
  {
    _id           :'event-5',
    name          : 'Group activity',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 16, 30),
    classes       : 'color-4'
  },
  {
    _id           :'event-6',
    name          : 'Fun Day !',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 9, 14),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 17),
    classes       : 'color-3'
  },
  {
    _id           :'7',
    name          : 'Test !',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 14, 18),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 21),
    classes       : 'color-3'
  }
];*/

var items = [



];

class Planning extends Component {

    constructor(props)
    {

        super(props)   
        this.state = {
            items:[],
            selected:[],
            cellHeight:(60 / 4),
            showModal:false,
            locale:"fr",
            rowsPerHour:4,
            numberOfDays:4,
            startDate: new Date(),
            loading: true
        }
        this.handleRangeSelection = this.handleRangeSelection.bind(this)
        this.handleItemEdit = this.handleItemEdit.bind(this)
        this.zoomIn = this.zoomIn.bind(this)
        this.zoomOut = this.zoomOut.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this.addNewEvent = this.addNewEvent.bind(this)
        this.removeEvent = this.removeEvent.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.changeView = this.changeView.bind(this)
        this.handleCellSelection = this.handleCellSelection.bind(this)
    }

    componentDidMount(){

      fetch('http://127.0.0.1/fidapi/main.php?action=affichePlanning')
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        this.setState({items:response})

        var testInfo = this.state.items.map( function(value) {

              var obtenirJourDepart = value.startdatetime.split('/');
              var obtenirJourFin = value.enddatetime.split('/');
              var obtenirHeureDepart = value.departheure.split(':');
              var obtenirMinuteFin = value.finheure.split(":");

              var addDataItems = { 
                _id           : value.uid,
                name          : value.nom,
                startDateTime : new Date(now.getFullYear(), now.getMonth(), obtenirJourDepart[0], obtenirHeureDepart[0], obtenirHeureDepart[1]),
                endDateTime   : new Date(now.getFullYear(), now.getMonth(), obtenirJourFin[0], obtenirMinuteFin[0], obtenirMinuteFin[1]),
                classes       : value.classes
                                  }
              return addDataItems;
        });

        items.push(...testInfo);
        this.setState({items:items})
        console.log(now.getDate())

      })
      .catch(err => console.error(err))


      
  
    }
  
  
  componentWillReceiveProps(next , last){
    if(next.items){
  
      this.setState({items:next.items})
    }
  }
    handleItemEdit(item, openModal) {
  
      if(item && openModal === true){
        this.setState({selected:[item] })
        return this._openModal();
      }
  
  
  
    }
    handleCellSelection(item, openModal) {
  
      if(this.state.selected && this.state.selected[0] === item){
        return  this._openModal();
      }
         this.setState({selected:[item] })
  
    }
  
    zoomIn(){
  var num = this.state.cellHeight + 15
      this.setState({cellHeight:num})
    }
    zoomOut(){
  var num = this.state.cellHeight - 15
      this.setState({cellHeight:num})
    }
  
  
    handleDateRangeChange (startDate, endDate) {
        this.setState({startDate:startDate })
  
    }
  
    handleRangeSelection (selected) {
  
  
  this.setState({selected:selected , showCtrl:true})
  this._openModal();
  
  }
  
  _openModal(){
    this.setState({showModal:true})
  }
  _closeModal(e){
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }
  
  handleItemChange(items , item){
  
  this.setState({items:items})
  }
  
  handleItemSize(items , item){
  
    this.setState({items:items})
  
  }
  
  removeEvent(items , item){
      console.log(item._id)

      fetch('http://127.0.0.1/fidapi/main.php?action=suppressionRdv&uid=' + item._id)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        if(response === "#DELRDV#SUCCESS")
        {

            this.setState({ items:items})

        }

      })
      .catch(err => console.error(err))
      //this.setState({ items:items});
  }
  
  addNewEvent (items , newItems){
    
    console.log(newItems)

    /*fetch('http://127.0.0.1/fidapi/main.php?action=ajoutPlanningEntreprise&idEntreprise=2&idclt=0&nom=' + newItems.name
    + '&startdate=' + newItems.startDateTime.toLocaleDateString()
    + '&endDate=' + newItems.endDateTime.toLocaleDateString()
    + '&startheure=' + newItems.startDateTime.toLocaleTimeString()
    + '&endheure=' + newItems.endDateTime.toLocaleTimeString()
    + '&uid=' + newItems._id
    + '&color=' + newItems.classes)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    })
    .catch(err => console.error(err))*/

    this.setState({showModal:false ,selected:[] , items:items});
    this._closeModal();
  }
  editEvent (items , item){
  
    console.log(item)

    fetch('http://127.0.0.1/fidapi/main.php?action=editRdv&nom=' + item.name
    + '&startdate=' + item.startDateTime.toLocaleDateString()
    + '&endDate=' + item.endDateTime.toLocaleDateString()
    + '&startheure=' + item.startDateTime.toLocaleTimeString()
    + '&endheure=' + item.endDateTime.toLocaleTimeString()
    + '&uid=' + item._id
    + '&color=' + item.classes)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    })
    .catch(err => console.error(err))

    this.setState({showModal:false ,selected:[] , items:items});
    this._closeModal();
  }
  
  changeView (days , event ){
  this.setState({numberOfDays:days})
  }

  render() {

    var AgendaItem = function(props){
      console.log( ' item component props' , props)
      return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
    }

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
   
                                    <div className="content-expanded bg-white">

                                        <div className="control-buttons">
                                          <button  className="button-control" onClick={this.zoomIn}> <i class="fas fa-search-plus"></i> </button>
                                          <button  className="button-control" onClick={this.zoomOut}> <i class="fas fa-search-minus"></i> </button>
                                          <button  className="button-control" onClick={this._openModal}> <i class="far fa-plus-square"></i> </button>
                                          <button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
                                          <button  className="button-control" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
                                          <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
                                          <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
                                        </div>

                                        <ReactAgenda
                                          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
                                          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                                          startDate={this.state.startDate}
                                          startAtTime={8}
                                          endAtTime={23}
                                          cellHeight={this.state.cellHeight}
                                          locale="fr"
                                          items={this.state.items}
                                          numberOfDays={this.state.numberOfDays}
                                          headFormat={"ddd DD MMM"}
                                          rowsPerHour={this.state.rowsPerHour}
                                          itemColors={colors}
                                          helper={true}
                                          //itemComponent={AgendaItem}
                                          view="calendar"
                                          autoScale={false}
                                          fixedHeader={true}
                                          onRangeSelection={this.handleRangeSelection.bind(this)}
                                          onChangeEvent={this.handleItemChange.bind(this)}
                                          onChangeDuration={this.handleItemSize.bind(this)}
                                          onItemEdit={this.handleItemEdit.bind(this)}
                                          onCellSelect={this.handleCellSelection.bind(this)}
                                          onItemRemove={this.removeEvent.bind(this)}
                                          onDateRangeChange={this.handleDateRangeChange.bind(this)} />
                                        {
                                          this.state.showModal? <Modal clickOutside={this._closeModal} >
                                          <div className="modal-content">
                                            <ReactAgendaCtrl 
                                            items={this.state.items} 
                                            itemColors={colors} 
                                            selectedCells={this.state.selected} 
                                            Addnew={this.addNewEvent} 
                                            edit={this.editEvent}  
                                            />

                                          </div>
                                        </Modal>:''
                                        }


                                        </div>



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

export default Planning;
