<template >
    <header class="flex flex-space-between">
        <section class="flex">
            <div class="flex">
                <a class="board-header-btn">choose type of display</a>
                <a class="board-header-btn">{{ board.title }}</a>
                <a class="board-header-btn">⭐</a>
            </div>
            <a class="board-header-btn">trello workspace</a>
            <a class="board-header-btn">trello workspaceworkspace choice</a>
            <div class="board-header-btn">
                <a v-for="member in board.members">
                {{member.fullname}}
                </a>
            </div>
            <a class="board-header-btn">dd new member+</a>
        </section>
        <!-- <section class="flex">
            <div class="flex">
                <a class="board-header-btn">slack+</a>
                <a class="board-header-btn">power ups</a>
                <a class="board-header-btn">automation+</a>
            </div>
            <div class="flex">
                <a class="board-header-btn">filter+</a>
                <a class="board-header-btn">filtershow menu+</a>
            </div>
        </section> -->
    </header>
</template>


<script>
export default {
    name: 'board-preview',
    data() {
        return {
            board: {
                "_id": "b101",
                "title": "Robot dev proj",
                "archivedAt": 1589983468418,
                "createdAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": "l102",
                        "title": "Progress",
                        "color": "#61bd33"
                    }
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "Group 1",
                        "archivedAt": 1589983468418,
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "Replace logo"
                            },
                            {
                                "id": "c102",
                                "title": "Add Samples"
                            }
                        ],
                        "style": {}
                    },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Do that",
                                "archivedAt": 1589983468418
                            },
                            {
                                "id": "c104",
                                "title": "Help me",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": "ZdPnm",
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ]
                                    }
                                ],
                                "memberIds": [
                                    "u101"
                                ],
                                "labelIds": [
                                    "l101",
                                    "l102"
                                ],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                }
                            }
                        ],
                        "style": {}
                    }
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ],
                "cmpsOrder": [
                    "status-picker",
                    "member-picker",
                    "date-picker"
                ]
            }
        }
    },
    // props: {
    //     board: Object,
    // },
    created() { },
    methods: {},
    computed: {},
    mounted() { },
    unmounted() { },
    components: {}
}

</script>