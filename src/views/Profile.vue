<template>
    <div class="page-container">
        <Menu/>
        <div class="right-main">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Menu from "../components/Menu.vue";

    export default {
        data() {
            return {
            }
        },
        components: {
            Menu
        },
    }
</script>

<style scoped>
.page-container{
    margin-top: -47px;
    display: flex;
}
.right-main{
    flex: 1;
}
</style>