export default {
    socket: null,
    clienId: '0',

    connect(id) {
        this.clienId = id
        this.socket = new WebSocket("ws://localhost:8080/websocket/" + (id || 0));
        // WebSocket端点
        this.socket.onopen = event => {
            console.log('WebSocket连接已建立', this.socket);
        };
    },

    close() {
        if (this.socket) {
            this.socket.close();
            console.log('WebSocket连接已关闭');
        }
    },

    sendMessage(toId, message) {
        if (this.socket) {
            this.socket.send(JSON.stringify({toId: toId, message: message, sid: this.clienId}));
        }
    },

    // 获取消息回调
    setOnMessageHandler(callback) {
        if (this.socket) {
            this.socket.onmessage = event => {
                callback(event.data);
            };
        }
    }
};
