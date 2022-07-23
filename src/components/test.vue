<template>
    <div class="card-scene">
        <Container orientation="horizontal" @drop="onColumnDrop($event)">
            <Draggable v-for="column in scene.children" :key="column.id">
                <div>
                    <div class="card-column-header">
                        <span class="column-drag-handle">&#x2630;</span>
                        {{ column.name }}
                    </div>
                    <Container group-name="col" @drop="(e) => onCardDrop(column.id, e)"
                        :get-child-payload="getCardPayload(column.id)">
                        <Draggable v-for="card in column.children" :key="card.id">
                            <div>
                                <p>{{ card.data }}</p>
                            </div>
                        </Draggable>
                    </Container>
                </div>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems } from '../services/drag-and-drop.service'
const lorem = 'To check if a url is an image, call the test() method on a regular expression that matches an image extension at the end of a string, e.g. .png or .jpg. The test() method will check if the url ends with an image extension and return true if it does.'

const cardColors = [
    'azure',
    'beige',
    'bisque',
    'blanchedalmond',
    'burlywood',
    'cornsilk',
    'gainsboro',
    'ghostwhite',
    'ivory',
    'khaki'
]
const pickColor = () => {
    const rand = Math.floor(Math.random() * 10)
    return cardColors[rand]
}
const scene = {
    type: 'container',
    props: {
        orientation: 'horizontal'
    },
    children: generateItems(2, i => ({
        id: utilService.makeId(),
        children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
            id: `hi`,
            data: lorem.slice(Math.floor(Math.random() * 150) + 30, lorem.length)

        }))
    }))
}
import { utilService } from '../services/util.service.js'
export default {
    name: 'Cards',
    components: { Container, Draggable },
    data() {
        return {
            scene

        }
    },
    methods: {
        onColumnDrop(dropResult) {
            console.log(this.scene)
            const scene = Object.assign({}, this.scene)
            scene.children = applyDrag(scene.children, dropResult)
            this.scene = scene
        },
        onCardDrop(columnId, dropResult) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                console.log(dropResult)
                const scene = Object.assign({}, this.scene)
                const column = scene.children.filter(p => p.id === columnId)[0]
                const columnIndex = scene.children.indexOf(column)
                const newColumn = Object.assign({}, column)

                newColumn.children = applyDrag(newColumn.children, dropResult)
                scene.children.splice(columnIndex, 1, newColumn)
                this.scene = scene
            }
        },
        getCardPayload(columnId) {
            return (index) => {
                const task = this.scene.children.filter(p => p.id === columnId)[0].children[index]
                console.log(task)
                return task
            }
        }
    }
}
</script>