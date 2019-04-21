import React, { Component } from 'react';

import { Provider } from "react-redux";
import configureStore from "../redux/store";

import Day from './day';
import AddTask from './addTask';

let store = configureStore();

const DAYS_OF_WEEKS = 7
const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const DAY_NAMES = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]

class Calendar extends Component {
  constructor(props) {
    super(props)

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
  
  componentDidMount(){
	  
	let now = new Date()
	let y  = now.getFullYear()
	let m  = now.getMonth() + 1
	let d  = now.getDate()
	
	now.setDate(-1)
	let ds = now.getDate() // total dias del mes
	
	 this.setState({
		year: y,
		month: m,
		date: d,
		totalDays: ds,
		actionForm: false,
		sendToForm: {}
    })
	  
  }
  
  updateState( state ) {
	  this.setState( state )
  }

  createHeaderCalendar(){ 
    let rows = []
	let cols = []
	for (let i = 0; i < DAYS_OF_WEEKS; i++ ){
		cols.push(<th key={i}>{DAY_NAMES[i]}</th>)
	}
	rows.push(<tr key='header'>{cols}</tr>)
	return rows
  }
  
  createCalendar() {
    let  rows = []

	let offset = new Date(this.state.year, this.state.month-1, 1).getDay()
		offset = ( offset < DAYS_OF_WEEKS-1 ? offset : 0 )
		
	let days = this.state.totalDays
	let weeks = (days + offset)/DAYS_OF_WEEKS;
	let day =  1 - offset;
	
		
	
	for (let i = 0; i < weeks; i++ ){
		let cols = []
		for (let j = 0; j < DAYS_OF_WEEKS; j++) {
			
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
			   <b>{ MONTH_NAMES[ this.state.month-1 ] }</b> { this.state.year }
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