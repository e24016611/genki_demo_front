<template>
    <div class="project">
        <div class="project-head">
            <div class="head-left" @click="goBack">
                <img src="../assets/images/back.png" alt="">
                <p>Back to Skill</p>
            </div>
            <div class="head-right">
                Start Task
            </div>
        </div>
        <div class="project-introduce animate__animated animate__backInLeft">
            <img :src="task.logo" alt="">
            <div class="task-name">
                <p>Task</p>
                <p>{{task.title}}</p>
            </div>
        </div>
        <div class="task-introduce animate__animated animate__backInLeft">
            {{task.description}}
        </div>
        <div class="task-btn-group">
            <div class="task-btn">Tutorial</div>
            <div class="task-btn">Ask Question</div>
        </div>
        <div class="task-currency">
            <div class="currency-list" v-if="task.tag_appear">
                <p>Appears in</p>
                <div class="currency-btn">
                    <img :src="task.tag_appear[0].logo" alt="">
                    <p>{{task.tag_appear[0].value}}</p> 
                </div>
            </div>
            <div class="currency-list" v-if="task.tag_network">
                <p>Network</p>
                <div class="currency-btn">
                    <img :src="task.tag_appear[0].logo" alt="">
                    <p>{{task.tag_network[0].value}}</p> 
                </div>
            </div>
            <div class="currency-list" v-if="task.tag_project">
                <p>Project</p>
                <div class="currency-btn">
                    <img :src="task.tag_appear[0].logo" alt="">
                    <p>{{task.tag_project[0].value}}</p> 
                </div>
            </div>

             
        </div>
    </div>
</template>

<script>
    import {getSkillId,getTaskId} from '../api/index';
    export default {
        data(){
            return {
                id:this.$route.query.id,
                task:{}
            }
        },
        created(){
        },
        watch: {
            '$route' (to, from) {
                console.log(to,from)
            }
        },
        methods:{
            async getDetails(id){
                let res = await getTaskId(id);
                if(res.successed){
                    this.task = res.data;
                }
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        mounted(){
            this.getDetails(this.id)
        }
    }
</script>

<style scoped>
.project{
    overflow: hidden;
    margin: 0 50px;
}
.project-head{
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
}
.head-left{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.head-left img{
    width: 45px;
    height: 45px;
    margin-right: 16px;
}
.head-left p{
    height: 30px;
    font-family: TitilliumWeb-Regular;
    font-size: 26px;
    color: #7D7D7D;
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 400;
}
.head-right{
    width: 214px;
    height: 67px;
    background-image: url("../assets/images/btn.png");
    background-size: 100% 100%;
    font-family: PingFangSC-Semibold;
    font-size: 26px;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    font-weight: 600;
    text-align: right;
    line-height: 67px;
    padding-right: 14px;
}
.project-introduce{
    display: flex;
    margin-bottom: 27px;
}
.project-introduce img{
    width: 113px;
    height: 113px;
    margin-right: 16px;
    border-radius: 50%;
}
.task-name p:first-child{
    height: 30px;
    font-family: TitilliumWeb-Regular;
    font-size: 26px;
    color: #B2B1AF;
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 400;
}
.task-name p:last-child{
    height: 48px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 55px;
    color: #325151;
    letter-spacing: 0;
    line-height: 48px;
    font-weight: 600;
}
.task-introduce{
    height: 30px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 26px;
    color: rgba(45,45,45,0.80);
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 42px;
}
.task-btn-group{
    overflow: hidden;
    margin-bottom: 27px;
}
.task-btn{
    width: 152px;
    height: 48px;
    line-height: 48px;
    background: #F4C93E;
    border-radius: 10px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: -0.77px;
    text-align: center;
    font-weight: 600;
    float: left;
    margin-right: 18px;
}
.task-currency{
    overflow: hidden;
}
.currency-list{
    padding: 0 10px 0 8px;
    float: left;
    margin-right: 18px;
}
.currency-list>p{
    width: 152px;
    height: 30px;
    font-family: TitilliumWeb-Regular;
    font-size: 26px;
    color: rgba(36,36,36,0.80);
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 400;
    margin-bottom: 11px;
}
.currency-list .currency-btn{
    height: 48px;
    background: #54A09D;
    border-radius: 10px;
    padding: 0 10px 0 8px;
    display: flex;
    align-items: center;
}
.currency-btn img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
}
.currency-btn p{
    min-width: 43px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    text-align: center;
    font-weight: 600;
}
</style>