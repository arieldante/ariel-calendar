import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newTask, editTask, removeTask } from '../redux/actions';

class AddTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: (this.props.init.sendToForm.id ? this.props.init.sendToForm.id : 0),
			date: this.props.init.sendToForm.date,
			month: this.props.init.sendToForm.month,
			year: this.props.init.sendToForm.year,
			hour: (this.props.init.sendToForm.hour ? props.init.sendToForm.hour : 9),
			description: (this.props.init.sendToForm.description ? this.props.init.sendToForm.description : ''),
			color: ( this.props.init.sendToForm.color ? this.props.init.sendToForm.color : 'red' )
		};
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
	}
	
	handleInputChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({
		  [name]: value
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		let id = this.state.id;
		let d = this.state.date;
		let m = this.state.month;
		let h = this.state.hour;
		let y = this.state.year;
		let des = this.state.description ? this.state.description : 'Sin Tarea';
		let c = this.state.color;
		
		if( this.props.init.actionForm === 'ADD'){
				
			this.props.dispatch( newTask( { date: d, month: m, year: y, hour: h, description: des, color: c } ) )
			
		} else if ( this.props.init.actionForm === 'EDIT'){
			this.props.dispatch( editTask( { id: id, date: d, month: m, year: y, hour: h, description: des, color: c } ) )		
		}
		this.props.action( { actionForm: false } )
	}
	
	handleRemove(event) {
			event.preventDefault()

			if ( this.props.init.actionForm === 'EDIT'){
				let id = this.state.id;
				this.props.dispatch( removeTask( { id: id } ) )
			}
			this.props.action( { actionForm: false } )
	}
	
    hourOptions() {
        var arr = [];
        for (let i = 0; i < 24; i++) {
            arr.push(<option key={i} value={i} >{i}</option>)
        }
        return arr; 
    }
	
	render(){
	return (
		<div className="sidebar">
			<h2>{ this.props.init.actionForm==='ADD' ? 'Nueva Tarea' : 'Editar Tarea' }</h2>
			<form onSubmit={this.handleSubmit}>
				<label>
				  Fecha:<br/>
				  <input
					name="date"
					type="number"
					value={this.state.date}
					onChange={this.handleInputChange} disabled = 'disabled'  />
					<input
					name="month"
					type="number"
					value={this.state.month}
					onChange={this.handleInputChange} disabled = 'disabled' />
					<input
					name="year"
					type="number"
					value={this.state.year}
					onChange={this.handleInputChange} disabled = 'disabled' />
				</label><br/>
				<label>
				  Hora:<br/>
				  <select name="hour" value={this.state.hour} onChange={this.handleInputChange}>
						{this.hourOptions()}
				  </select>
				</label> <br/>
				<label>
				  Tarea:<br/>
				  <input
					name="description"
					type="text"
					value={this.state.description}
					onChange={this.handleInputChange} />
				</label><br/>
				<label>
				  Color:<br/>
				  <select name="color" value={this.state.color} onChange={this.handleInputChange}>
					<option value="green">Verde</option>
					<option value="red">Rojo</option>
					<option value="blue">Azul</option>
					<option value="Orange">Naranja</option>
				  </select>
				</label> 
				<br/><br/>
				<input type="submit" value="Aceptar" />
				<br/>
				<button
				  className="btn-remove"
				  onClick={this.handleRemove}>Eliminar</button>
			</form>
		</div>
	)}
}

export default connect( null, null )(AddTask);