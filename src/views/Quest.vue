<template>
<div class="quest-main">
    <div class="quest">
        <div class="project">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
                <span>Genki</span>
            </div>
            <div class="project-info">
                <div class="project-logo">
                    <img :src="quest.logo" alt="">
                </div>
                <div class="project-intro">
                    <h3>Quest</h3>
                    <div class="intro-span">
                        <span>Impression: {{quest.impression}}</span>
                        <span>Total Participants: {{quest.participants}}</span>
                        <span>Referrals: {{quest.referrals}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="blocks">
        <div class="blocks-chart">
            <chart1></chart1>
        </div>
        <div class="blocks-chart">
            <chart2></chart2>
        </div>
    </div>
    <div class="quest-table">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="datetime"
            label="Time/Txs">
            <template slot-scope="scope">
                {{scope.row.datetime}}<br />{{scope.row.txs}}
            </template>
        </el-table-column>
        <el-table-column
            prop="address"
            label="User">
        </el-table-column>
        <el-table-column
            prop="retention_7"
            label="7day retention">
        </el-table-column>
        <el-table-column
            prop="retention_14"
            label="14 day retention">
        </el-table-column>
        <el-table-column
            prop="retention_30"
            label="30 day retention">
        </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import chart1 from "./charts/Charts1.vue";
import chart2 from "./charts/Charts2.vue";

import {getQuests,getQuestsId,getQuestsIdHistory} from '../api/index';
    export default {
        data() {
            return {        
                tableData:[{
                    date:"2022-01-30",
                    hash:'0xafBc06C22aA54c03352C370767560b7B0524F996',
                    complete:true,
                    channel:'ETH'
                }],
                quest:[]
            }
        },
        created() {
            this.getQuestsFun();
        },
        components: {
            chart1,
            chart2
        }, 
        methods:{
            async getQuestsFun(){
                let res = await getQuests();
                if(res.successed && res.errcode==0){
                    this.quest = res.data[0];

                    let res2 = await this.getQuestsIdHistoryFun(this.quest.id);
                    console.log(res2);
                }
            },
            async getQuestsIdHistoryFun(id){
                let res = await getQuestsIdHistory(id);
                if(res.successed && res.errcode==0){
                    this.tableData = res.data;
                }
            }
        }
    }
</script>

<style scoped>
.quest{
    margin-top: -47px;  
    padding: 40px; 
    background: #fff;
}
.project{
    height: 175px;
    display: flex;
    width: 1200px;
    margin: 0 auto;
}
.logo{
    margin-right: 150px;
    display: flex;
    justify-content: center;
}
.logo img{
    width: 50px;
    height: 50px;
}
.logo span{
    font-size: 24px;
    margin-top: 10px;
    margin-left: 10px;
}
.project-logo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
}
.project-logo img{
    width: 100%;
    border: 1px solid #fff;
}
.project-info{
    display: flex;
}
.project-intro h3{
    margin-bottom: 30px;
    margin-top: 15px;
}
.intro-span span{
    margin-right: 15px;
}
.blocks{
    min-height: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
}
.blocks-chart{
    width: 400px;
    height: 400px;
}
.quest-table{
    width: 80%;
    margin: 0 auto;
}
</style>