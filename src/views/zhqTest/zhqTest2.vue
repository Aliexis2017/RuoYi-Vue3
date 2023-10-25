<!--
   /**
    * @Description: 文件描述
    * @module 基于 element-ui xxx 的二次封装
    * {@link} 参考链接
    * @author 郑鸿钦 on 2023/9/25$
    * @modify 郑鸿钦 on 2023/9/25$
    **/
-->
<template>
  <div class="zhqTestBox">
    zhqTest2 webSocket {{ count }}
    <el-button @click="add"></el-button>
  </div>
</template>
<script setup>
import { defineComponent, ref } from "vue";

function add() {
  if (2) {
    if (1) {
    }
  }
}

const count = ref();
</script>
<script></script>

<style lang="scss" rel="stylesheet/scss" scoped>
.zhqTestBox {
  padding: 16px;
}
</style>
