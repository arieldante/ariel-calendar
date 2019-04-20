import React, { Component } from 'react';
import { connect } from 'react-redux';

class Day extends Component {
		
	render(){
	return (
		<td className={this.props.className}>
			
			<div className="day-number">{this.props.date}</div>
			 <ul>
				{this.props.tasks.map((task, index) =>
					<li className="task" 
						key={index} 
						onClick={
							(e) => this.props.action( {
								actionForm: "EDIT",
								sendToForm:{
									id: task.id,	
									date: task.date,
									month: task.month,
									year: task.year,
									hour: task.hour,
									description: task.description,
									color: task.color
								} 
							}) 
						} 
						style= {{ color: task.color }} >
							{task.hour}:00 | {task.description}
					</li>
				)}
				<li>
					<button onClick={
						(e) => this.props.action( {
							actionForm: "ADD",
							sendToForm:{
								date: this.props.date,
								month: this.props.month,
								year: this.props.year
								} 
							}) 
					} >+</button>
				</li>
			 </ul>
			 
		</td>
	)}
}

function filterTasks( state, props ){
	let filtered = []
	for ( let i in state.tasks ) {

		if ( state.tasks[i].date === props.date && 
			 state.tasks[i].month === props.month &&
			 state.tasks[i].year === props.year ){					 
				filtered.push( state.tasks[i] )
		}
	}
	
	//ordeno por hora
	filtered.sort(function(a,b) {
		var x = a.hour
		var y = b.hour
		return x - y
	});

	return filtered
}

const mapStateToProps = (state, ownProps) => {
	return {
		tasks: filterTasks( state, ownProps )
	}
}

export default connect( mapStateToProps )(Day);
