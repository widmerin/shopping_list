<template>
  <div class="list-item">
    <div class="list-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!editing" @dblclick="editTodo" class="list-item-label" :class="{ completed : completed }">{{ title }} </div>
      <input v-else class="list-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div>
    <div class="remove-item" @click="removeTodo">
      &times;
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed,
        'editing': this.todo.editing,
        'beforeEditCache': '',
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      cancelEdit() {
        this.editing = false
        this.title = this.beforeEditCache
      },
      doneEdit() {
        if (this.title.trim() == '') {
          this.title = this.beforeEditCache
        }
        this.editing = false
        this.$emit('finishedEdit', {
          'todo': {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'editing': this.editing,
          }
        })
      },
      editTodo() {
        this.beforeEditCache = this.title
        this.editing = true
      },
      removeTodo() {
        this.$emit('removedTodo', this.id)
      }
    }
  }
</script>