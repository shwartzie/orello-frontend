<template>
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>Menu</h3>
            <a @click="closeModal" class="icon-close-side-modal"></a>
        </header>
        <section class="modal-body" id="style-1">

            <section class="menu-modal-actions">
                <a class="board-menu-section-header js-open-activity" @click="displayMode='changeImg'">
                    <span class="background-img" :style="{ backgroundImage: `url(${currBoard.style.backgroundImg})` }">
    
                    </span>
                    Change background
                </a>
            </section>
            <hr>
            <section class="activity-body" v-if="displayMode==='activity'">
                <div>
                    <a class="board-menu-section-header js-open-activity">
                        <span class="board-menu-section-header-icon icon-lg icon-activity"></span>
                        Activity
                    </a>
                </div>
                <section v-for="activity in currBoard.activities.slice(0, limit)" >
                    <div class="phenom mod-attachment-type">
                        <div class="phenom-creator member">
                            <img :src=activity.byMember.imgUrl class="member-avatar">
                        </div>
                        <div class="activity-dis">
                            <span>
                                <span class="u-font-weight-bold">{{ activity.byMember.fullname }} </span>
                                {{ activity.txt }} on
                                <span class="activity-task-title">
                                    {{ activity.task }}
                                </span>
                            </span>
                        </div>
                        <div class="timestamp">
                            {{ getActivityTime(activity) }}
                        </div>
                    </div>
                </section>
                <a @click="limit = currBoard.activities.length" v-if="limit !== currBoard.activities.length">view
                    more</a>
                <a @click="limit = 20" v-else>view less</a>
            </section>
            <section class="change-img-body activity-body">

            </section>
        </section>

    </section>
</template>

<script>
import { utilService } from '../../services/util.service'
export default {
    emits: ["closeModal"],
    data() {
        return {
            limit: 20,
            displayMode:'activity'
        }
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit("closeModal", false)
        },
        getActivityTime(activity) {
            return utilService.getTimestamp(activity.createdAt)
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },

    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>