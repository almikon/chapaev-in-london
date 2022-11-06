import { action, makeAutoObservable, makeObservable, observable } from 'mobx'

export type TodoProps = {
  id: number,
  title: string,
  completed: boolean
}

class Todo{
  @observable
  todos:TodoProps[] = [
    // {id: 1, title: 'Go to shop', completed: false},
    // {id: 2, title: 'To eat', completed: true},
    // {id: 3, title: 'To sleep', completed: false},
  ]

  constructor() {
    makeAutoObservable(this, {}, {deep: true})
    // makeObservable(this, {}, {deep: true})
    // makeObservable(this)
  }

  @action
  addTodo(todo: Omit<TodoProps, 'id'>) {
    const id = (this.todos[this.todos.length - 1]).id + 1
    const tempTodo:TodoProps = {...todo, id}
    this.todos.push(tempTodo)
  }

  removeTodo(id: number){
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  completeTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo )
  }

  fetchTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => this.todos = [...this.todos, ...json])
  }
}

export default new Todo()
