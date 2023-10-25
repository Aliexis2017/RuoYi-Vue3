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
    WebSocket id = {{ id }}
    <el-button @click="connectWebSocket">连接WebSocket</el-button>
    <el-input v-model="msg" @keyup.enter="sendMsg"></el-input>
    <div v-for="item in msgList">{{ item }}</div>
  </div>
</template>
<script setup name="zhqTest">
import WebSocketService from './WebSocketService'; // 根据你的实际路径导入
import {getCurrentInstance, reactive, ref, onMounted} from "vue";

const {proxy} = getCurrentInstance();

let list = ref([])
// websocket
let msg = ref('')
const msgList = reactive([])

// let socket = ref(new WebSocket("ws://localhost:8080/socket"));
let id = proxy.$route.query.id
let toId = proxy.$route.query.toId

function sendMsg() {
  console.info('🚀 发送 ==> ', msg)
  msgList.push(`🚀 ${id}：` + msg.value)
  WebSocketService.sendMessage(toId, msg.value);
  msg.value = ''
}

function connectWebSocket() {
  // 连接 socket
  WebSocketService.connect(id);
  // 设置 返回消息回调
  WebSocketService.setOnMessageHandler(message => {
    msgList.push(`🦃 ${message}`);
  });
}

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
