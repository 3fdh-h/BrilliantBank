var websocket = null;

//连接WebSocket节点
function connectWebSocket(clientId) {
    if (!clientId) {
        alert('请输入客户端ID');
        return;
    }
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/ws/" + clientId);
        websocket.onerror = function () {
            setMessageInnerHTML("连接错误");
        };
        websocket.onopen = function () {
            setMessageInnerHTML("连接成功");
        };
        websocket.onmessage = function (event) {
            setMessageInnerHTML(event.data);
        };
        websocket.onclose = function () {
            setMessageInnerHTML("连接已关闭");
        };
        window.onbeforeunload = function () {
            websocket.close();
        };
    }
    else {
        alert('不支持websocket')
    }
}

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
    document.getElementById('message').innerHTML += innerHTML + '<br/>';
}

//发送消息
function send() {
    if (!websocket) {
        alert('请先连接WebSocket');
        return;
    }
    var message = document.getElementById('text').value;
    websocket.send(message);
}

//关闭连接
function closeWebSocket() {
    if (!websocket) {
        alert('连接已关闭');
        return;
    }
    websocket.close();
}