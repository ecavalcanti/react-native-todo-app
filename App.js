import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, Switch, Button } from 'react-native';
import {Header, AddTaskForm} from './components'

export default class App extends React.Component {
  state = {
    todos:[]
  }
  async componentDidMount() {
    const todos = await AsyncStorage.getItem('todos')
    if (todos) {
      this.setState({todos:JSON.parse(todos)})
    }
  }
  addTask = (name) => {
    this.setState({todos:[...this.state.todos, {id:new Date(), name}]}, this.updateStorage)
  }
  async updateStorage() {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos))
    } catch (error) {
      alert(error.message)      
    }
  }
  doneTask = (item) => {
    item.done = !item.done;
    this.setState({todos:[...this.state.todos]}, this.updateStorage)
  }
  removeTask = (item) => {
    const newItems = this.state.todos.filter(todoItem => {
      return item.id != todoItem.id
    })
    this.setState({todos: newItems}, this.updateStorage)
  }
  renderItem = ({item}) => (
    <View style={styles.item}>
      <Switch value={item.done}
        onValueChange={()=>this.doneTask(item)}/>
      <Text 
        style={[styles.textItem, 
          {textDecorationLine:item.done ? 'line-through': 'none'}]}
        >{item.name}</Text>
        <Button color="red" title="X" onPress={()=>this.removeTask(item)}></Button>
    </View>
  )
  extractor = (item) => item.id
  render() {
    return (
      <View style={styles.container}>
        <Header title="Todo App" />
        <AddTaskForm onTaskAdd={this.addTask}/>
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={this.extractor}
          ItemSeparatorComponent={() => (
            <View style={{height:1, backgroundColor: 'aliceblue', marginLeft: 6}}/>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  item: {
    paddingLeft: 8,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textItem: {
    marginLeft: 8,
    flex: 1
  }
})
