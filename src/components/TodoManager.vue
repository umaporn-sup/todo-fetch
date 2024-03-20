<script setup>
// Add, Edit, Delete, Read todo here
import AddEditTodo from './AddEditTodo.vue'
import { TodoManagement } from '../libs/TodoManagement'
import TodoList from './TodoList.vue'
// import todos from '../../data/todos.json'
import {
  getItems,
  getItemById,
  deleteItemById,
  addItem,
  editItem
} from '../libs/fetchUtils.js'
import { onMounted, ref } from 'vue'

const showModal = ref(false)
const clearModal = (flagModal) => {
  showModal.value = flagModal
}
const editingTodo = ref({ id: undefined, category: '', description: '' })
const openModalToEdit = (todo) => {
  showModal.value = true
  editingTodo.value = todo
}
//GET
const myTodos = ref(new TodoManagement())
onMounted(async () => {
  //call endpoint of backend
  const items = await getItems(import.meta.env.VITE_BASE_URL)
  //add items to myTodos
  myTodos.value.addTodos(items)
  // console.log(myTodos.value.getTodos())
})

//DELETE
const removeTodo = async (removeId) => {
  //backend
  const removeStatus = await deleteItemById(
    import.meta.env.VITE_BASE_URL,
    removeId
  )
  if (removeStatus === 200) {
    //frontend
    myTodos.value.removeTodo(removeId)
  }
}

//ADD or EDIT
const updateTodo = async (newTodo) => {
  //backend, POST (Add new Item)
  if (newTodo.id === undefined) {
    const addedItem = await addItem(import.meta.env.VITE_BASE_URL, {
      category: newTodo.category,
      description: newTodo.description
    })
    console.log(addedItem)
    //frontend
    myTodos.value.addTodo(
      addedItem.id,
      addedItem.category,
      addedItem.description
    )
  }
  //EDIT
  else {
    //backend, PUT (replace new todo)
    const editedItem = await editItem(
      import.meta.env.VITE_BASE_URL,
      newTodo.id,
      newTodo
    )
    // console.log(editItem)
    //frontend
    myTodos.value.updateTodo(newTodo.id, newTodo.category, newTodo.description)
  }
  showModal.value = false
  editingTodo.value = { id: undefined, category: '', description: '' }
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <button
        @click="openModalToEdit"
        class="px-2 py-0.5 text-green-600 rounded-lg hover:text-green-500"
      >
        Add New Todo
      </button>
    </div>
    <TodoList
      :todos="myTodos.getTodos()"
      @editMode="openModalToEdit"
      @deleteTodo="removeTodo"
    />
    <Teleport to="#addEditModal">
      <div
        v-show="showModal"
        class="absolute left-0 right-0 top-1/3 m-auto bg-slate-50 h-48 w-72 shadow-lg rounded-md"
      >
        <AddEditTodo
          @closeModal="clearModal"
          @saveTodo="updateTodo"
          :todo="editingTodo"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped></style>
