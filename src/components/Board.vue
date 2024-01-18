<script>

import Task from './Task.vue';
import CreationForm from './CreationForm.vue';
import { getBoard, saveBoard } from '../utils';

export default {
  beforeMount() {
    this.board = getBoard()
  },
  data: () => ({
    board: null,
    isCreating: false
  }),
  methods: {
    toggleItem(taskId, itemId) {
      let task = null
      let column = 0
      for (let i = 0; i < this.board.length; i++) {
        task = this.board[i].find(task => task.id == taskId)

        if (task) {
          column = i
          break
        }
      }

      const item = task.items.find(item => item.id == itemId)

      const prevCheckState = item.isChecked

      if ((column == 0) && (this.board[1].length >= 5)) { // 0 -> 1
        item.isChecked = false // stop moving from 0 col
        // saveBoard(this.board)
        // return
      } else if ((column == 1) && (this.board[0].length >= 3)) { // 1 -> 0
        item.isChecked = true // move 2
        // saveBoard(this.board)
        // return
      } else if ((column == 2) && (this.board[1].length >= 5)) { // 2 -> 1
        return // stop moving for 2 col
      } else {
        item.isChecked = !item.isChecked
      }

      const checkedCount = task.items.reduce((a, b) => a + Number(b.isChecked), 0)


      if (prevCheckState != item.isChecked) {
        if ((checkedCount / task.items.length) == 1) {
          this.board[column].splice(this.board[column].indexOf(task), 1)
          this.board[2].push(task)
        } else if ((checkedCount / task.items.length) > 0.5) {
          this.board[column].splice(this.board[column].indexOf(task), 1)
          this.board[1].push(task)
        } else if (column != 0) {
          this.board[column].splice(this.board[column].indexOf(task), 1)
          this.board[0].push(task)
        }
      }

      saveBoard(this.board)
    },
    closePopup(e) {
      if (e.target === e.currentTarget) {
        this.isCreating = false
      }
    },
    createTask(task) {
      if (this.canCreateTask) {
        const flat = this.board.flat()

        if (flat.length == 0) {
          task.id = 0
        } else {
          task.id = flat.sort((i1, i2) => -(i1.id - i2.id))[0].id++
        }

        this.board[0].push(task)

        saveBoard(this.board)
      }
    }
  },
  computed: {
    canCreateTask() {
      return this.board[0].length < 3
    }
  },
  components: {
    Task,
    CreationForm
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="ml-auto">
      <button @click="isCreating = true" :disabled="!canCreateTask"
        class="px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
        Create task
      </button>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(col, index) in board" :key="index" class="flex flex-col gap-4">
        <Task v-for="task in col" :key="task.id" :task="task" @item-toggled="toggleItem" />
      </div>
    </div>

    <div v-show="isCreating" @click="closePopup"
      class="flex items-center justify-center absolute top-0 left-0 w-screen h-screen bg-gray-300/50">
      <div class="max-w-96 w-full bg-gray-100 p-4 rounded-xl">
        <CreationForm @create-task="createTask" />
      </div>
    </div>

  </div>
</template>