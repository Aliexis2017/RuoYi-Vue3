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
    zhqTest {{ count }}
    <el-button @click="add"></el-button>
    <el-button @click="connectWebSocket">连接WebSocket</el-button>
    <el-input v-model="msg" @keyup.enter="sendMsg"></el-input>
    <div v-for="item in msgList">{{ item }}</div>
  </div>
</template>
<script setup name="zhqTest">
import VueNativeSock from 'vue-native-websocket';
import WebSocketService from './WebSocketService'; // 根据你的实际路径导入

import {getCurrentInstance, ref, onMounted} from "vue";
import request from "@/utils/request";
import {listUser} from "@/api/system/user";

const count = ref(12) // count = {value:12}
console.log('count', count)

function add() {
  count.value++
}

const {proxy} = getCurrentInstance();
let list = ref([])

function getList() {
  request({
    url: '/system/user/list',
    method: 'get',
    params: {}
  }).then(res => {
    list.value = res.rows
  })
}


// websocket
let msg = ref('')
const msgList = reactive([])

// let socket = ref(new WebSocket("ws://localhost:8080/socket"));

function sendMsg() {
  console.info('🚀 发送 ==> ', msg)
  msgList.push("🚀：" + msg.value)
  WebSocketService.sendMessage(proxy.$route.query.toId, msg.value);
  msg.value = ''
}

function connectWebSocket() {
  // 连接 socket
  WebSocketService.connect(proxy.$route.query.id);
  // 设置 返回消息回调
  WebSocketService.setOnMessageHandler(message => {
    msgList.push('🦃：' + message);
  });
}

onMounted(() => {
  // socket.value.onopen = function (event) {
  //   msgList.push("WebSocket 连接已建立");
  // };
  //
  // socket.value.onmessage = function (event) {
  //   msgList.push("收到消息: " + event.data);
  // };
  //
  // socket.value.onclose = function (event) {
  //   if (event.wasClean) {
  //     msgList.push("WebSocket 连接已关闭" + event);
  //   } else {
  //     msgList.push("WebSocket 连接意外关闭" + event);
  //   }
  // };
  // proxy.use(VueNativeSock, 'ws://localhost:80/socket', {
  //   reconnection: true,
  //   reconnectionAttempts: 5,
  //   reconnectionDelay: 3000,
  // });
  // proxy.$socket.onmessage = (message) => {
  //   console.info('🚀 message ==> ', message)
  //   msgList.push(JSON.parse(message.data));
  // };
// })
})
onMounted(() => {
  WebSocketService.close()
})
</script>

<script>

export default {
  name: "zhqTest",
  components: {},

  props: {},

  data() {
    return {
      list2: []
    }
  },

  created() {
  },

  mounted() {
    this.list2 = []
  },

  methods: {},
  computed: {},

  watch: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.zhqTestBox {
  padding: 16px;
}
</style>
