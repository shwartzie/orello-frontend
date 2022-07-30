<template >
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>Menu</h3>
            <a @click="closeModal" class="icon-side-modal close"></a>

        </header>
        <section class="modal-body" id="style-1">

            <section class="menu-modal-actions">
                <a class="board-menu-section-header js-open-activity" @click="openBackgroundSelectModal">
                    <span class="background-img"
                        :style="{ background: `${currBoard.style?.background?.thumb}  center / cover` }">
                    </span>
                    Change background
                </a>
                <hr>
            </section>
            <section class="activity-body">
                <div>
                    <a class="board-menu-section-header js-open-activity">
                        <span class="board-menu-section-header-icon icon-lg icon-activity"></span>
                        Activity
                    </a>
                </div>
                <section v-for="activity in currBoard.activities.slice(0, limit)">
                    <!-- <pre>{{ activity }}</pre> -->
                    <div class="phenom mod-attachment-type">
                        <div class="phenom-creator member">
                            <img :src="activity.byMember?.imgUrl" class="member-avatar">

                        </div>
                        <div class="activity-dis">
                            <span>
                                <span class="u-font-weight-bold">{{ activity.byMember?.fullname }} </span>
                                {{ activity.txt }}
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
    props: { currBoard: Object },
    emits: ['closeModal', 'setModalDisplay'],
    data() {
        return {
            limit: 20,
        }
    },
    created() {

    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
        getActivityTime(activity) {
            return utilService.getTimestamp(activity.createdAt)
        },
        openBackgroundSelectModal() {
            this.$emit('setModalDisplay', 'backgroundSelectModal')
        }
    },
    computed: {


    },
    mounted() { },
    unmounted() { },
    components: {}
}

</script>
