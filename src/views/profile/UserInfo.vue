<template>
    <div class="user-info">
        <div class="user-top">
            <div class="user-left">
                <img src="@/assets/logo.png" alt="" class="user-head">
            </div>
            <div class="user-right">
                <div class="user-address">0xafBc06C22aA54c03352C370767560b7B0524F996</div>
                <div class="user-show">
                    <span>Rank: xxx</span>
                    <span>Total Points: xx</span>
                    <span>Referrals: xxx</span>
                </div>
            </div>
        </div>
        <div class="user-bottom">
           <h2>
               <span @click="current=0" :class="{active:current==0}">NTFS</span>
               <span @click="current=1" :class="{active:current==1}">History</span>
           </h2>
           <div class="bottom-content">
               <div class="user-ntfs" v-if="current==0">
                    <span v-for="(item,index) in ntfs" :key="index" class="ntfs">
                       {{item}}
                    </span>
               </div>
               <div class="user-history" v-if="current==1">
                   <div class="btn-group">
                        <button>Dapp</button>
                        <button>Referral</button>
                        <button>Time Frame</button>
                   </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                current:0,
                ntfs:[
                    "ETH",
                    "BSC",
                    "DeFi",
                    "NTF",
                    "Web3",
                ],
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
.user-info{
    width: 100%;
}
.user-top{
    height: 275px;
    display: flex;
    align-items: center;
    padding-left: 70px;
}
.user-head{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #fff;
}
.user-show span{
    margin-right: 10px;
}
.active{
    border-bottom: 3px solid #000000;
}
.user-ntfs{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.ntfs{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(0deg, #F8E7AD, #F8E7AD), #F8E7AD;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.btn-group{
    margin: 15px 0;
}
.btn-group>button{
    padding: 8px 12px;
    margin-right: 15px;
    border-radius: 5px;
    border: 0;
    outline: 0;
    cursor: pointer;
}
.user-bottom h2{
    margin-left: 80px;
    cursor: pointer;
}
.user-bottom h2 span{
    margin-right: 20px;
}
.user-left{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 25px;
}
.user-right{
    height: 100px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
}
.bottom-content{
    box-sizing: content-box;
    padding: 40px;
}
</style>