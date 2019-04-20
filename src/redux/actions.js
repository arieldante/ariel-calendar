let id = 0;
export function newTask( payload ) {
  return {
    type: 'NEW_TASK',
	id: id++,
	date: payload.date,
	month: payload.month,
	year: payload.year,
	hour: payload.hour,
	description: payload.description,
	color: payload.color
  }
}

export function editTask( payload, index ) {
  return {
    type: 'EDIT_TASK',
	id: payload.id,
	date: payload.date,
	month: payload.month,
	year: payload.year,
	hour: payload.hour,
	description: payload.description,
	color: payload.color
  }
}

export function removeTask( payload, index ) {
  return {
    type: 'REMOVE_TASK',
	id: payload.id
  }
}