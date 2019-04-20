const initialState = {
  tasks: []
}

function taskApp(state = initialState, action) {
  switch ( action.type ) {
	  
    case 'NEW_TASK':
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks,
		  {
			id: action.id,
			date: action.date,
			month: action.month,
			year: action.year,
			hour: action.hour,
			description: action.description,
			color: action.color
		  }
        ]
      })
	  
    case 'EDIT_TASK':
	
      const update = state.tasks.map(task => {
        if(task.id === action.id){
			task.date = action.date
			task.month = action.month
			task.year = action.year
			task.hour = action.hour
			task.description = action.description
			task.color = action.color
        }
        return task
      })
      return { tasks: update }
	  
    case 'REMOVE_TASK':
		let filter =  state.tasks.filter(function(task) {
			return task.id !== action.id
		});	
	
		return {
			tasks: filter
		}
	  
	 default:
	 return initialState
  }
}

export default taskApp;