import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, Switch, Button } from 'react-native';
import {Header, AddTaskForm} from './components'
import store from './todoStore'
import actions from './actions';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      todos : []
    }
    store.subscribe(() => {
      this.setState({todos:store.getState()})
      AsyncStorage.setItem('todos', JSON.stringify(store.getState()))
    })
  }

  componentDidMount() {
    actions.loadTasks()
  }

  addTask = (name) => {
    actions.addTask(name)
  }  
  
  doneTask = (item) => {
    actions.doneTask(item)
  }
  
  removeTask = (item) => {
    actions.removeTask(item)
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
