import { createStore } from 'redux'

function todoReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload]            
        case 'LOAD_TASKS':
            return action.payload  
        case 'DONE_TASK':
            return state.map(task => (task.id == action.payload) ? 
                {...task, done : !task.done} : task)
        case 'REMOVE_TASK':
            return state.filter(task => task.id != action.payload)
        default:
            return state
    }
}

export default createStore(todoReducer);