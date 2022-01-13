<template>
  <div class="hello">
    <button v-if="!currentAccount" v-on:click="connect()">
      Connect with MetaMask
    </button>
    <div v-if="provider" class="welcome">账号： {{ currentAccount }}</div>
    <div v-else class="welcome">
      Please connect your Metamask to use the full website
    </div>
  </div>
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      provider: {},
      web3: "",
      currentAccount: "",
      listings: [],
      contractAddress: "0x9518bC609c7b57079d0A0E090FaC1a9Dc1c2667a",
      abi: "",
    };
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
    methods: {
      handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.", accounts);
        } else if (accounts[0] !== this.currentAccount) {
          console.log(this.web3.utils)
          this.currentAccount = this.web3.utils.toChecksumAddress(accounts[0]);
          console.log(this.currentAccount);
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
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
