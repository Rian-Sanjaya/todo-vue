<template>
  <div>
    <header class="todo-header"><div>todos</div></header>
    <section class="todoapp">
      <div class="todo-input">
        <input class="toggle-all" type="checkbox" v-model="toggleAll" />
        <input
          class="new-todo"
          autofocus
          autocomplet="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </div>
      <section class="todo-list-container">
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{ editing: todo === editedTodo, completed: todo.completed }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="delete" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              v-model="todo.title"
              v-todo-focus="todo === editedTodo"
              @keyup.enter="doneEdit(todo)"
              @blur="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">
          <strong>{{ remaining }}</strong> item left
        </span>
        <ul class="filters">
          <li>
            <a
              href="#/all"
              :class="{ selected: visibility === 'all' }"
              @click="setVisibility('all')"
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              :class="{ selected: visibility === 'active' }"
              @click="setVisibility('active')"
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibility === 'completed' }"
              @click="setVisibility('completed')"
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="countCompleted.length"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="footer-note">
      <p>Double click to edit a todo</p>
    </footer>
  </div>
</template>

<script>
const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed: function (todos) {
    return todos.filter((todo) => todo.completed);
  },
};

export default {
  name: 'Todo',
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Create a todo app',
          completed: false,
        },
        {
          id: 2,
          title: 'Re-learn vue',
          completed: false,
        },
      ],
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
    };
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    countCompleted() {
      return filters['completed'](this.todos);
    },
    toggleAll: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach((todo) => {
          todo.completed = value;
        });
      },
    },
  },
  methods: {
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = '';
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    removeCompleted() {
      this.todos = filters.active(this.todos);
    },
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style>
.todo-header div {
  width: 100%;
  text-align: center;
  font-size: 100px;
  font-weight: 100;
  color: rgba(175, 47, 47, 0.15);
}

.todoapp {
  position: relative;
  min-width: 230px;
  max-width: 530px;
  margin: 20px auto 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.todo-input {
  display: flex;
}

.todo-input .toggle-all {
  width: 40px;
  margin: auto 0;
}

.new-todo {
  flex: 1;
  padding: 12px 0;
  box-sizing: border-box;
  font-size: 24px;
  border: none;
  outline: none;
  font-style: italic;
}

.new-todo::placeholder {
  color: #bfbfbf;
  opacity: 0.5;
}

.todo-list-container {
  border-top: 1px solid #e6e6e6;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  line-height: 1.2;
  position: relative;
}

/* .todo-list li .view {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
} */

.todo-list li .toggle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  width: 40px;
}

.todo-list li .view label {
  display: block;
  padding: 15px 12px 15px 40px;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .delete {
  position: absolute;
  top: 0;
  right: 12px;
  bottom: 0;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 30px;
  font-weight: 100;
  width: 40px;
  color: #cc9a9a;
  transition: all 0.2s ease-out;
  display: none;
  cursor: pointer;
}

.todo-list li:hover .delete {
  display: block;
}

.todo-list li .delete:after {
  content: 'x';
}

.todo-list li .edit {
  width: 100%;
  font-size: 24px;
  border: none;
  box-sizing: border-box;
  padding: 15px 12px 15px 40px;
  line-height: 1.2;
  display: none;
  /* font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; */
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li.editing .edit {
  display: block;
}

.footer {
  padding: 10px 15px;
  border-top: 1px solid #e6e6e6;
  text-align: center;
  height: 20px;
}

.todo-count {
  float: left;
  text-align: left;
}

.clear-completed {
  float: right;
  cursor: pointer;
  line-height: 20px;
  border: 0;
  background: none;
  position: relative;
}

.clear-completed:hover {
  text-decoration: underline;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  left: 0;
  right: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border: 1px solid rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border: 1px solid rgba(175, 47, 47, 0.2);
}

.footer-note {
  margin-top: 90px;
  color: #bfbfbf;
  font-size: 16px;
  opacity: 0.8;
}

.footer-note p {
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>
