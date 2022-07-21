<template>
    <div id="app">
        <div class="container">
            <div class="left">
                <draggable v-model="items1" transition="100" class="drop-zone">
                    <template v-slot:item="{ item }">
                        <div class="draggable-item">
                            {{ item.title }}
                        </div>
                    </template>
                </draggable>
            </div>

            <div class="right">
                <draggable v-model="items2" transition="100" class="drop-zone">
                    <template v-slot:item="{ item }">
                        <div class="draggable-item">
                            {{ item.title }}
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vue3-draggable';
export default {
    name: 'App',
    components: {
        Draggable,
    },
    data() {
        return {
            items1: Array(5)
                .fill({})
                .map((_, index) => ({ title: `Item ${index + 1}` })),
            items2: Array(5)
                .fill({})
                .map((_, index) => ({ title: `Item ${index + 10}` })),
        };
    },
};
</script>