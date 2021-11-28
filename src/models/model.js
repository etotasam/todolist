export class User {
  constructor(userInfo, todoList = []) {
    this.userInfo = userInfo
    this.todoList = todoList
    this.userPostNumber
  }

  pushTodoList(value) {
    this.todoList.push(value)
  }
  unshiftTodoList(value) {
    this.todoList.unshift(value)
  }

  userPostNumber = {
    get getter() {
      return this.userPostNumber
    },
    set setter(number) {
      this.userPostNumber = number
    }
  }
  get modelsTodoList() {
    return this.todoList
  }
  set modelsTodoList(todos) {
    this.todoList = todos
  }

  get modelsUserInfo() {
    return this.userInfo;
  }
  set modelsUserInfo(value) {
    this.userInfo = value
  }

}


// class Todo {
//   constructor(text) {
//     this.text = text
//   }
// }