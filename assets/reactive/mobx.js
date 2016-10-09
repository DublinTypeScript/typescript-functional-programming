const {observable, computed} = mobx;
const {observer} = mobxReact;
const {Component} = React;

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;
    constructor(title) {
        this.title = title;
    }
}

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo => 
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) => 
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
);

const store = new TodoList();

React.render(<TodoListView todoList={store} />, document.getElementById('mount'));

store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);

store.todos[0].finished = true;



