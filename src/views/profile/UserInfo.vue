<template>
    <div class="user-info">
        <div class="user-top">
            <div class="user-left">
                <img src="@/assets/logo.png" alt="" class="user-head">
            </div>
            <div class="user-right">
                <div class="user-address">
                    {{currentAccount}}
                </div>
                <div class="user-show">
                    <span>Rank: {{relation.rank}}</span>
                    <span>Total Points: {{relation.total_points}}</span>
                    <span>Referrals: {{relation.referrals}}</span>
                </div>
            </div>
        </div>
        <div class="user-bottom">
           <h2>
               <span @click="current=0" :class="{active:current==0}">NFTs</span>
               <span @click="current=1" :class="{active:current==1}">History</span>
           </h2>
           <div class="bottom-content">
               <div class="user-nfts" v-if="current==0">
                    <span v-for="(item,index) in nfts" :key="index" class="nfts">
                       {{item}}
                    </span>
               </div>
               <div class="user-history" v-if="current==1">
                   <div class="btn-group">
                        <el-button type="primary" @click="getDappFun">Dapp</el-button>
                        <el-button type="primary" @click="getReferralFun">Referral</el-button>
                        <el-button type="primary">Time Frame</el-button>
                   </div>
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="datetime"
                            label="date">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="address">
                        </el-table-column>
                        <el-table-column
                            prop="task"
                            label="task">
                        </el-table-column>
                        <el-table-column
                            prop="event_type"
                            label="event_type">
                        </el-table-column>
                    </el-table>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import {getSkill,getSkillId,getUser,getAddUser,getRelation,getDapp,getReferral} from '../../api/index';
    import detectEthereumProvider from "@metamask/detect-provider";
    import Web3 from "web3";
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                current:0,
                nfts:[
                    "ETH",
                    "BSC",
                    "DeFi",
                    "NTF",
                    "Web3",
                ],
                tableData:[],
                count: 0,
                provider: {},
                web3: "",
                currentAccount: "",
                listings: [],
                contractAddress: "0x9518bC609c7b57079d0A0E090FaC1a9Dc1c2667a",
                abi: "",
                skill:[],
                user:{},
                relation:''
            }
        },
        components: {
        },
        async created() {
            this.currentAccount = this.$route.params.currentAccount;
            this.getSkillList();
            this.getRelations();
        },
        watch:{
            current:{
                handler (val) {   // 当 current 发生变化时   
                    console.log(val) 
                    if(val == 1){
                        this.getDappFun()
                    }
                },
                immediate: true
            }
        },
        async mounted() {
            /*
            this.provider = await detectEthereumProvider();
            console.log(this.provider);
            console.log(Web3.givenProvider);
            if (this.provider) {
                this.web3 = new Web3(Web3.givenProvider);
                await this.provider
                    .request({ method: "eth_accounts" })
                    .then(this.handleAccountsChanged)
                    .catch((err) => {
                        console.error(err);
                    });
                if (this.provider.chainId === "0x1") {
                    console.log('conneting')
                }
            } else {
                console.log("Please install MetaMask!");
            }
            console.log(this.web3);
            */
        },
        methods:{
            // getReferral
            async getReferralFun(){
                let res = await getReferral(this.currentAccount)
                if(res.successed && res.errcode==0){
                    this.tableData = res.data;
                }
            },
            // getDapp
            async getDappFun(){
                const res = await getDapp(this.currentAccount)
                if(res.successed && res.errcode==0){
                    this.tableData = res.data;
                }
            },
            async getRelations(){
                let res = await getRelation(this.currentAccount);
                if(res.successed && res.errcode==0){
                    this.relation = res.data
                    console.log('relation',this.relation)
                }else{
                    console.log('error')
                }
            },
            goLinks(){
                this.$router.push('/links')
            },
            async getSkillList(){
               let res = await getSkill();
               if(res.successed){
                this.skill = res.data
               }
            },
            async getSkillId(id){
                let res = await getSkillId(id);
                this.skill = res
            },
            handleAccountsChanged(accounts) {
                if (accounts.length === 0) {
                    console.log("Please connect to MetaMask.", accounts);
                } else if (accounts[0] !== this.currentAccount) {
                    this.currentAccount = this.web3.utils.toChecksumAddress(accounts[0]);
                    this.isUser(this.currentAccount)
                }
            },
            connect() {
                this.provider
                .request({ method: "eth_requestAccounts" })
                .then(this.handleAccountsChanged)
                .catch((err) => {
                    if (err.code === 4001) {
                    console.log("Please connect to MetaMask.");
                    } else {
                    console.error(err);
                    }
                });
                console.log("connected with account " + this.currentAccount);
            },
            async isUser(account){
                let res = await getUser(account);
                if(res.successed && res.errcode==0){
                    this.user = res.data
                }else{
                    this.createUser(account)
                }
            },
            async createUser(account){
                let res = await getAddUser(account);
                this.user = res.data;
            },
            // 截取字符串
            getSubStr ( str){
                if(!str) return;
                var subStr1 = str.substr( 0, 5);
                var subStr2 = str.substr( str.length- 5, 2);
                var subStr = subStr1 + "···" + subStr2 ;
                return subStr;
            },
            goDetails(){
                this.$router.push({path:'/details',query:{id: this.skill[0].id}})
            },
        }
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
.user-nfts{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.nfts{
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
    margin-right: 30px;
}
.btn-group{
    margin: 15px 0;
}
/* .btn-group>button{
    padding: 8px 12px;
    margin-right: 15px;
    border-radius: 5px;
    border: 0;
    outline: 0;
    cursor: pointer;
} */
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