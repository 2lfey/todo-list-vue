<script>

export default {
  props: {
    task: Object
  },
  computed: {
    canDeleteItem() {
      return this.task.items.length > 3
    }
  }
}
</script>

<template>
  <div class="space-y-4 p-4 bg-gray-100 rounded-md">
    <h2 class="text-xl font-bold">
      {{ task.title }}
    </h2>

    <ul class="">
      <li v-for="item in task.items" :key="item.id" class="flex">
        <p @click="$emit('itemToggled', task.id, item.id)" class="flex-1 flex items-center gap-2">

          <svg :class="item.isChecked ? 'bg-primary-600 text-white' : 'text-transparent bg-white border border-gray-500'"
            class="inline-block w-4 h-4 rounded-sm" fill="currentColor" viewBox="1 1 14 14"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clip-rule="evenodd" fill-rule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z">
            </path>
          </svg>

          <span class="font-medium select-none">
            {{ item.title }}
          </span>
        </p>

        <svg @click="$emit('deleteItem', task.id, item.id)" v-show="canDeleteItem" class="w-4 h-4 text-primary-600 hover:text-primary-700" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"></path>
        </svg>
      </li>
    </ul>
  </div>
</template>