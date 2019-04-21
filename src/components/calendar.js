import React, { Component } from 'react';

import { Provider } from "react-redux";
import configureStore from "../redux/store";

import Day from './day';
import AddTask from './addTask';

let store = configureStore();

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
		 year: 2000,
		 month: 1,
		 date: 1,
		 totalDays: 30,
		 actionForm: false,
		 sendToForm: {}
    };
	
	this.updateState = this.updateState.bind(this)
	
  }
  
  componentDidMount() {
	let y  = new Date().getFullYear()
	let m  = new Date().getMonth() + 1
	let d  = new Date().getDate()
	let ds = new Date(y, m, 0).getDate()
	
    this.setState({
		year: y,
		month: m,
		date: d,
		totalDays: ds
    })
  }
  
  getMonthName() {
	  let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
	  return monthNames[ this.state.month-1 ]
  }
  
  updateState( state ) {
	  this.setState( state )
  }
	
  createHeaderCalendar(){ 
	let weekNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    let rows = []
	let cols = []
	for (let i = 0; i < 7; i++ ){
		cols.push(<th key={i}>{weekNames[i]}</th>)
	}
	rows.push(<tr key='header'>{cols}</tr>)
	return rows
  }
  
  createCalendar() {
    let  rows = []

	let offset = new Date(this.state.year, this.state.month-1, 1).getDay()
		offset = ( offset < 6 ? offset : 0 )
		
	let days = this.state.totalDays
	let weeks = (days + offset)/7;
	let day =  1 - offset;
	
		
	
	for (let i = 0; i < weeks; i++ ){
		let cols = []
		for (let j = 0; j < 7; j++) {
			
			let className = "day"
			if( day > 0 && day <= days ){
					if(    day === new Date().getDate()
						&& this.state.month === new Date().getMonth()+1 
						&& this.state.year === new Date().getFullYear() )
						{ className += " today" }
			}else{
				className += " empty";
			}
			
			cols.push(<Day key={j} date={ day } month={this.state.month} year={this.state.year} className={className} action={this.updateState} />)
			
			offset--
			day++
			
		}
		
		rows.push(<tr key={i}>{cols}</tr>)
	}
	return rows
  }
 
  render() {
    return (
		<Provider store={ store }>
			<div className="calendar">
			  <div className="calendar-header">
			   <b>{ this.getMonthName() }</b> { this.state.year }
			   </div>
				<div>
				  <table className="calendar-table">
					<tbody>
					{ this.createHeaderCalendar() }
					{ this.createCalendar() }
					</tbody>
				  </table>
				</div>
			</div>
			 {(this.state.actionForm) ? <AddTask action={this.updateState} init={ this.state } /> : ''}
		</Provider>
    );
  }
}

export default Calendar;