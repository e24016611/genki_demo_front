<template>
  <div class="genki-menu">
      <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <h4>Genki</h4>
      </div>
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">Profile</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.genki-menu{
  width: 200px;
  height: 100vh;
  border-right: 1px solid #f5f5f5;
  background: white;
}
.genki-menu /deep/ .el-menu{
  border: none;
}
.logo{
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  padding-bottom: 50px;
}
.logo img{
  height: 60px;
}
</style>
