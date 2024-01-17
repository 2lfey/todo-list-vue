<script>
export default {
  data: () => ({
    task: {
      items: [],
    },
    itemsCount: 3,
  }),
  methods: {
    submit() {
      this.task.items = this.task.items.map((item, i) => ({ id: i, title: item, isChecked: false }))
      this.$emit('createTask', this.task)

      this.task = {
        items: [],
      }
      this.itemsCount = 3
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div class="space-y-2">
      <label className='block ml-2 text-sm font-bold text-gray-900 dark:text-white'>
        Title
      </label>
      <input type="text" placeholder="Task title" v-model="task.title" required
        class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
    </div>

    <div class="space-y-2">
      <div class="space-y-2" v-for="n in itemsCount" :key="n">
        <label className='block ml-2 text-sm font-bold text-gray-900 dark:text-white'>
          Item
        </label>
        <input type="text" placeholder="Item title" v-model="task.items[n - 1]" required
          class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
      </div>

      <button type="button" v-show="itemsCount < 5" @click="itemsCount++"
        class="w-full px-3 py-1.5 font-semibold text-sm text-primary-500 border-primary-500 border-2 hover:border-primary-700 hover:text-white hover:bg-primary-700 rounded">
        Add item
      </button>
    </div>

    <button type="submit"
      class="w-full px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
      Create
    </button>
  </form>
</template>