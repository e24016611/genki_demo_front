<template>
    <div class="details">
        <div class="details-head animate__animated animate__backInLeft">
            <img src="../assets/images/BSC.jpg" alt="">
            <div class="head-desc">
                <p>Skill</p>
                <p>{{details.title}}</p>
            </div>
        </div>
        <div class="details-slogan animate__animated animate__bounceInDown">
            <p>{{details.subtitle}}</p>
            <p>{{details.description}}</p>
        </div>
        <div class="details-list">
        <ul>
            <li v-for="(item,index) in details.tasks" :key="index">
                <div class="list-head">
                    <img :src="item.logo" alt="">
                    <div class="list-desc">
                        <span class="not-complete" v-if="!item.completed">
                            <i></i>
                            NOT STARTED
                        </span>
                        <span class="complete" v-if="item.completed">
                            <i></i>
                            COMPLETE
                        </span>
                        <p class="">
                            <i class="head-num">{{item.exp}}</i>
                            <i class="head-font">xp</i>
                        </p>
                    </div>
                </div>
                <div class="list-font">
                    <p>{{item.title}}</p>
                    <p>{{item.description}}</p>
                </div>
                <div class="list-btn">
                    <span @click="goProject(item.id)">Details</span>
                    <span class="active" @click="startTask(item.id)">Start</span>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
    import {getSkillId,getTaskStart} from '../api/index';
    export default {
        data(){
            return {
                id:this.$route.query.id,
                details:{
                    id:"",
                    description:"",
                    title:"",
                    logo:"",
                    tasks:[]
                }
            }
        },
        methods:{
            async getDetails(id){
                let res = await getSkillId(id);
                if(res.successed){
                    this.details = res.data
                }
                console.log(this.details)
            },
            goProject(id){
                 this.$router.push({path:'/project',query:{id:id}})
            },
            // 开始任务
            async startTask(id){
                let res = await getTaskStart(id);
                console.log(res)
            }
        },
        mounted(){
            this.getDetails(this.id)
        }
    }
</script>

<style scoped>
.details{
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
    padding: 15px  0;
}
.details-head{
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.details-head img{
    width: 98px;
    height: 113px;
    margin-right: 31px;
}
.head-desc{
    flex: 1;
}
.head-desc p:first-child{
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 30px;
    color: #B2B1AF;
    margin-bottom: 8px;
}
.head-desc p:last-child{
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    font-size: 60px;
    line-height: 48px;
    color: #325151;
}
.details-slogan p:first-child{
    height: 30px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 26px;
    color: rgba(45,45,45,0.80);
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 10px;
}
.details-slogan p:last-child{
    height: 30px;
    font-family: TitilliumWeb-Regular;
    font-size: 26px;
    color: #B2B1AF;
    letter-spacing: 0;
    line-height: 30px;
    font-weight: 400;
    margin-bottom: 39px;
}
.details-list{
    padding-bottom: 20px;
}
.details-list ul{
    list-style: none;
    overflow: hidden;
}
.details-list ul li{
    width: 274px;
    height: 346px;
    background: #FFFFFF;
    box-shadow: 4px 6px 10px 1px rgba(0,0,0,0.25);
    border-radius: 15px;
    float: left;
    margin-right: 40px;
    margin-bottom: 40px;
    padding: 25px 28px 0 19px;
    box-sizing: border-box;
    position: relative;
}
.list-head{
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
}
.list-desc span{
    width: 109px;
    height: 24px;
    background: #D8D8D8;
    border-radius: 12px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: -0.5px;
    text-align: center;
    line-height: 24px;
    font-weight: 600;
    display: inline-block;
}
.list-desc span i{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
}
.list-desc span.complete{
   background: #54A09D;
}
.list-desc span.complete i{
    background: #F2C93F;
    border: 1px solid rgba(255, 255, 255, 0.8);
}
.list-desc p{
    text-align: right;
}

.head-num{
    font-family: TitilliumWeb-SemiBold;
    font-size: 16px;
    color: rgba(95,95,95,0.68);
    letter-spacing: 0;
    text-align: right;
    line-height: 24px;
    font-weight: 600;
    font-style: normal;
    margin-right: 2px;
}
.head-font{
    font-family: TitilliumWeb-SemiBold;
    font-size: 16px;
    color: #5F5F5F;
    letter-spacing: 0;
    text-align: right;
    line-height: 24px;
    font-weight: 600;
    font-style: normal;
}
.list-font p:first-child{
    height: 48px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 20px;
    color: #FFB824;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}
.list-font p:last-child{
    height: 66.21px;
    font-family: TitilliumWeb-Regular;
    font-size: 16px;
    color: #999999;
    letter-spacing: 0;
    line-height: 18px;
    font-weight: 400;
}
.list-btn{
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #D2CFC6;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
}

.list-btn span{
    font-family: TitilliumWeb-SemiBold;
    font-size: 13px;
    color: #632840;
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
}
.list-btn span.active{
    width: 96px;
    height: 30px;
    background: #F2C93F;
    border-radius: 14px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
    margin-top: 13px;
}
</style>