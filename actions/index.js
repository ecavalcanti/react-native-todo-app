import { AsyncStorage } from 'react-native'
import store from '../todoStore.js'

const addTask = (name) => {
    const item = {id:new Date(), name}
    store.dispatch({
        type: 'ADD_TASK', 
        payload: item
    })        
}

const loadTasks = async () => {
    try {
        const tasks = await AsyncStorage.getItem('todos') || '[]'
        store.dispatch({
            type: 'LOAD_TASKS', 
            payload: JSON.parse(tasks)
        })        
    } catch (error) {
        throw error
    }    
}

const doneTask = (task) => {
    store.dispatch({
        type: 'DONE_TASK', 
        payload: task.id
    })        
}

const removeTask = (task) => {
    store.dispatch({
        type: 'REMOVE_TASK', 
        payload: task.id
    })        
}

export default { addTask, loadTasks, doneTask, removeTask }
