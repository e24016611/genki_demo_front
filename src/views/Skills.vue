<template>
    <div class="main-page">
    <div class="header">
        <div class="header-middle">
            <div class="header-left">
                <a class="logo animate__animated animate__bounceInUp" href="/">
                  <img alt="RabbitHole Logo" src="../assets/images/LOGO.png" class="chakra-image css-5ac067" />
                </a>
                <nav class="nav-block">
                    <ul class="nav-list">
                      <li class="nav-list-a">
                        <a href="/quests">Quests</a>
                      </li>
                      <li class="nav-list-a">
                        <a class="active" href="/skills">Skills</a>
                      </li>
                      <li class="nav-list-a">
                        <a href="/projects">Projects</a>
                      </li>
                    </ul>
                </nav>
            </div>
            <div class="header-right">
                <div class="right-button" v-if="!currentAccount" @click="connect()">
                  <div class="btn-des connect">
                    Connect with MetaMask
                  </div>
                </div>
                <div class="right-button" v-if="currentAccount&&provider">
                  <img src="../assets/images/cricle.png" alt="">
                  <div class="btn-des">
                    <h4>Level {{user.level}}</h4>
                    <p>{{user.exp_to_next_level}}XP to next</p>
                  </div>
                </div>
                <div class="right-button" v-if="currentAccount&&provider" @click="goLinks">
                  <img src="../assets/images/avt.png" alt="">
                  <div class="btn-des">
                    <h4>My Profile</h4>
                    <p>{{getSubStr(user.address)}}</p>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="skills">
        <div class="skills-font animate__animated animate__backInLeft">
            <p>Skills</p>
            <img src="../assets/images/wenhao.png" alt="">
        </div>
        <div class="skills-desc animate__animated animate__backInLeft">
            Acquire skills to explore opportunities on Chain
        </div>
        <div class="skills-list">
            <ul>
                <li v-for="(item,index) in skill" :key="index" @click="goDetails(item.id)">
                    <div class="list-head">
                        <span>
                            <img :src="imgUrl+item.logo" alt="">
                        </span>
                        <span class="list-process">
                            <img src="../assets/images/cricle1.png" alt="">
                            <p>
                                <i>{{item.task_completed}}</i> 
                                of 
                                <i>{{item.task_total}}</i> 
                            </p>
                        </span>
                    </div>
                    <div class="list-project">
                        {{item.title}}
                    </div>
                    <div class="list-desc">
                        {{item.description}}
                    </div>
                </li>
                <!-- <li>
                    <div class="list-head">
                        <span>
                            <img src="../assets/images/icon-solana.png" alt="">
                        </span>
                        <span class="list-process">
                            <img src="../assets/images/cricle1.png" alt="">
                            <p>
                                <i>1</i> 
                                of 
                                <i>3</i> 
                            </p>
                        </span>
                    </div>
                    <div class="list-project">
                        Solana
                    </div>
                    <div class="list-desc">
                        Solana Explorer (Coming soon)
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
    import {getSkill,getSkillId,getUser,getAddUser} from '../api/index';
    import detectEthereumProvider from "@metamask/detect-provider";
    import Web3 from "web3";
    import helloWorld from '../components/HelloWorld.vue'
    export default {
        data(){
            return{
                imgUrl:"http://www.baidu.com/",
                count: 0,
                provider: {},
                web3: "",
                currentAccount: "",
                listings: [],
                contractAddress: "0x9518bC609c7b57079d0A0E090FaC1a9Dc1c2667a",
                abi: "",
                skill:[],
                user:{}
            }
        },
        components:{
            helloWorld
        },
        created(){
            this.getSkillList()
        },
        async mounted() {
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
        },
        methods:{
            goLinks(){
                this.$router.push('/links')
            },
            async getSkillList(){
               let res = await getSkill();
               if(res.successed){
                this.skill = res.data
               }
               console.log(this.skill)
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
                console.log(res)
                if(res.successed && res.errorcode==0){
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
            goDetails(id){
                this.$router.push({path:'/details',query:{id:id}})
            }
        }
    }
</script>

<style scoped>
    .header {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .header-middle {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-padding-start: 40px;
        padding-inline-start: 40px;
        -webkit-padding-end: 40px;
        padding-inline-end: 40px;
    }
    .header-left {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .header-left .logo{
    width: 74.8px;
    height: 95px;
    margin-right: 67.2px;
    }
    .nav-block{
    width: 365px;
    height: 67px;
    background: rgba(216,216,216,0.60);
    border-radius: 15px;
    }
    .nav-list{
    list-style: none;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100%;
    }
    .nav-list li{
    flex: 1;
    }
    .nav-list li a {
    cursor: pointer;
    -webkit-text-decoration: none;
    text-decoration: none;
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: rgba(255, 255, 255, 0.36);
    font-family: Circular Std Book;
    padding: 14px;
    border-radius: 10px;
    font-family: PingFangSC-Semibold;
    font-size: 26px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: 600;
    display: block;
    text-align: center;
    }
    .nav-list li a.active{
    padding: 8px;
    background: #FFFFFF;
    border-radius: 15px;
    font-family: PingFangSC-Semibold;
    font-size: 26px;
    color: #F2C93F;
    letter-spacing: 0;
    font-weight: 600;
    }
    .header-right {
    margin-top: 0px;
    /* -webkit-margin-end: 0px;
    margin-inline-end: 0px;
    margin-bottom: 0px;
    -webkit-margin-start: 340px;
    margin-inline-start: 340px; */
    overflow: hidden;
    }
    .right-button{
    width: 184px;
    height: 67px;
    background: #54A09D;
    border-radius: 15px;
    float: left;
    cursor: pointer;
    }
    .right-button img{
    padding: 15px;
    float: left;
    width: 36px;
    height: 36px;
    text-align: left;
    }
    .right-button .btn-des {
    float: left;
    text-align: left;
    margin-top: 13px;
    }
    .btn-des.connect{
        width: 100%;
        line-height: 67px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 0;
    }
    .right-button .btn-des h4{
    height: 20px;
    font-family: TitilliumWeb-SemiBold;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 600;
    }
    .right-button .btn-des p{
    height: 20px;
    font-family: TitilliumWeb-Regular;
    font-size: 16px;
    color: rgba(255,255,255,0.68);
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 400;
    }
    .header-right :first-child.right-button{
    margin-right: 29px;
    }
    .skills{
        margin: 52px 85px;
    }
    .skills-font{
        display: flex;
        align-items: baseline;
        margin-bottom: 16px;
    }
    .skills-font p{
        font-family: TitilliumWeb-SemiBold;
        font-size: 60px;
        color: #325151;
        letter-spacing: 0;
        line-height: 48px;
        font-weight: 600;
        margin-right: 25px;
    }
    .skills-font img{
        width:30px;
    }
    .skills-desc{
        height: 30px;
        font-family: TitilliumWeb-Regular;
        font-size: 26px;
        color: #B2B1AF;
        letter-spacing: 0;
        line-height: 30px;
        font-weight: 400;
        margin-bottom: 52px;
    }
    .skills-list{
        overflow: hidden;
        padding: 15px 0;
    }
    .skills-list ul{
        list-style: none;
    }
    .skills-list ul li{
        width: 360px;
        height: 221px;
        background: #FFFFFF;
        box-shadow: 4px 6px 10px 1px rgba(0,0,0,0.25);
        border-radius: 10px;
        float: left;
        margin-right: 30px;
        padding: 25px 19px;
        margin-bottom: 100px;
        box-sizing: border-box;
        cursor: pointer;
    }
    /* .skills-list ul li:hover{
        animation: pulse 1s;
    } */
    .list-head{
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    .list-process{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .list-process img{
        width: 36px;
        height: 36px;
        margin-right: 13.5px;
    }
    .list-process p{
        height: 24px;
        font-family: TitilliumWeb-SemiBold;
        font-size: 16px;
        color: rgba(95,95,95,0.68);
        letter-spacing: 0;
        text-align: center;
        line-height: 24px;
        font-weight: 600;
    }
    .list-process p i{
        height: 24px;
        font-family: TitilliumWeb-SemiBold;
        font-size: 16px;
        color: #5F5F5F;
        letter-spacing: 0;
        text-align: center;
        line-height: 24px;
        font-weight: 600;
        font-style: normal;
    }
    .list-project{
        height: 36px;
        font-family: TitilliumWeb-SemiBold;
        font-size: 24px;
        color: #FFB824;
        letter-spacing: 0;
        font-weight: 600;
        margin-bottom: 12px;
    }
    .list-desc{
        height: 77px;
        font-family: TitilliumWeb-Regular;
        font-size: 18px;
        color: #999999;
        letter-spacing: 0;
        line-height: 20px;
        font-weight: 400;
    }
</style>