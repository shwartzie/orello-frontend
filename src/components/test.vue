<template>
    <div class="groups">
        <div class="group">
            <Container :get-child-payload="getChildPayload" @drop="onDrop('groups', $event)">
                <Draggable v-for="(group) in groups" :key="group.id">
                    <div class="draggable-item">
                        {{ group.id }}
                    </div>
                </Draggable>
            </Container>
        </div>


    </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/drag-and-drop.service.js'
export default {
    name: 'Groups',
    components: { Container, Draggable },
    data() {
        return {
            groups: null,
        }
    },
    methods: {
        onDrop(collection, dropResult) {
            // console.log('this.groups', this.groups)
            console.log('dropResult', dropResult)
            console.log('this[collection]', this[collection])
            const group = JSON.parse(JSON.stringify(this[collection]))
            const payload = JSON.parse(JSON.stringify(dropResult))
            this[collection] = applyDrag(group, payload)
        },
        getChildPayload(index) {
            console.log('index', index)

            return this.groups[index]
        },

    },
    async created() {
        const boards = await this.$store.getters.boards
        this.groups = [...boards[0].groups]
    }
}
</script>

<style>
.groups {
    display: flex;
    justify-content: stretch;
    margin-top: 50px;
    margin-right: 50px;
}

.group {
    margin-left: 50px;
    flex: 1;
}
</style>
