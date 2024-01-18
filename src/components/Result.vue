<script>
export default {
    props: {
        board: Array,
        query: String,
    },
    // data: () => ({
    //     task: {
    //         items: [],
    //     },
    //     itemsCount: 3,
    // })
}
</script>

<template>
    <div class="grid grid-cols-3 gap-4">
        <div v-for="col in board" class="flex flex-col gap-4">
            <div v-for="task in col" :key="task.id" class="space-y-4 p-4 border border-gray-500 rounded-md">
                <h2 class="text-xl font-bold">
                    {{ task.title }}
                </h2>

                <ul class="">
                    <li v-for="item in task.items" :key="item.id" class="flex">
                        <p class="flex-1 flex items-center gap-2">

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
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>