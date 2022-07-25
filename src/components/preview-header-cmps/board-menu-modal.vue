<template>
    <section class="pop-over menu-modal">
        <header class="flex header-title">
            <h3>Menu</h3>
            <a @click="closeModal" class="icon-close-side-modal"></a>
        </header>
        <div>

        </div>
        <section class="main-body" id="style-1">
            <div>   
                <a class="board-menu-section-header js-open-activity">
                    <span class="board-menu-section-header-icon icon-lg icon-activity"></span>
                    Activity
                </a>
            </div>
            <section v-for="activity in currBoard.activities">
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
                        {{getActivityTime(activity)}}
                    </div>
                </div>
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
        }
    },
    created() { },
    methods: {
        closeModal() {
            this.$emit("closeModal", false)
        },
        getActivityTime(activity){
            console.log(activity.createdAt);
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