import React, {Component} from 'react'
import { Text, View, TextInput, TouchableHighlight } from 'react-native'
import styles from './AddTaskForm.style'

export default class AddTaskForm extends Component {
    state = {
        taskName: ""
    }
    onAdd = () => {
        this.props.onTaskAdd(this.state.taskName)
        this.setState({taskName:""})
    }
    render() {
       return (
            <View style={styles.container}>
                <TextInput placeholder="Type the task" 
                    value={this.state.taskName}
                    onChangeText={taskName=>this.setState({taskName})}
                    style={styles.input} />
                <TouchableHighlight style={styles.button}
                    disabled={this.state.taskName.length == 0}
                    onPress={this.onAdd}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
       )
    }
}