<script>

import Task from './Task.vue';
import CreationForm from './CreationForm.vue';
import { getBoard, saveBoard } from '../utils';

const _board = [
  [
    {
      id: 0,
      title: 'Task',
      items: [
        {
          id: 0,
          title: "item title",
          isChecked: false,
        },
        {
          id: 1,
          title: "item title",
          isChecked: false,
        },
        {
          id: 2,
          title: "item title",
          isChecked: true,
        },
        {
          id: 3,
          title: "item title",
          isChecked: false,
        },
        {
          id: 4,
          title: "item title",
          isChecked: false,
        },
      ],
    },
    {
      id: 1,
      title: 'Task',
      items: [
        {
          id: 0,
          title: "item title",
          isChecked: false,
        },
        {
          id: 1,
          title: "item title",
          isChecked: true,
        },
        {
          id: 2,
          title: "item title",
          isChecked: true,
        },
        {
          id: 3,
          title: "item title",
          isChecked: false,
        },
        {
          id: 4,
          title: "item title",
          isChecked: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Task',
      items: [
        {
          id: 0,
          title: "item title",
          isChecked: false,
        },
        {
          id: 1,
          title: "item title",
          isChecked: true,
        },
        {
          id: 2,
          title: "item title",
          isChecked: true,
        },
        {
          id: 3,
          title: "item title",
          isChecked: false,
        },
      ],
    }
  ],
  [],
  []
]

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

      // const prevCheckedCount = task.items.reduce((a, b) => a + Number(b.isChecked), 0)

      item.isChecked = !item.isChecked

      const checkedCount = task.items.reduce((a, b) => a + Number(b.isChecked), 0)

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
          task.id = flat.sort((i1, i2) => i1.id - i2.id)[0].id++
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