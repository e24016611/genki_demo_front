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
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="project-intro">
                    <h3>Quest</h3>
                    <div class="intro-span">
                        <span>Impression: xx</span>
                        <span>Total Participants: xx</span>
                        <span>Referrals: xxx</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="blocks">
        <div class="blocks-chart"></div>
        <div class="blocks-chart"></div>
    </div>
    <div class="quest-table">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="hash"
            label="hash">
        </el-table-column>
        <el-table-column
            prop="complete"
            label="complete">
        </el-table-column>
        <el-table-column
            prop="channel"
            label="channel">
        </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[{
                    date:"2022-01-30",
                    hash:'0xafBc06C22aA54c03352C370767560b7B0524F996',
                    complete:true,
                    channel:'ETH'
                }]
            }
        },
       components: {
       }, 
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
    display: flex;
    justify-content: space-around;
}
.blocks-chart{
    width: 400px;
    height: 175px;
    border: 1px solid #ccc;
}
.quest-table{
    width: 80%;
    margin: 0 auto;
}
</style>