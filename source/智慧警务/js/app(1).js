
const username = 'admin'; // Replace with actual username
const password = 'admin'; // Replace with actual password
    // console.log('111');
login(username, password)
        .then(token => {
            console.log("Token:", token);
            alert('success');
            setupWebSocket(token);
            var functionWithParams = createFunctionWithParams(token);
            setInterval(functionWithParams,1000);
            obtaininfo_wlanstatus(token);
            // console.log('222');
            obtaininfo_netbridge(token);
            obtaininfo_mesh(token);
        })
        .catch(error => {
            alert('failed');
            console.error("Login failed:", error);

        });

function createFunctionWithParams(param1) {
    return function() {
        obtaininfo_wlanstatus(param1);
    };
}

async function login(username, password) {
    const url = 'http://localhost/api/wrtmng/1/user/login'; // Replace with the actual login URL
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    //反向代理  CORS
    console.log(response); // 打印整个响应对象

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.result.token;
}


// 在函数外部初始化一个变量来保持对图表实例的引用
let myChartt = null;

function renderChart(data) {

    const ctx = document.getElementById('signalChart').getContext('2d');

    const frequencies = data.data.signals.map(s => s.freq);
    const levels = data.data.signals.map(s => s.level);

    if (myChartt) {
        // 如果图表已经存在，更新数据
        myChartt.data.labels = frequencies;
        myChartt.data.datasets[0].data = levels;
        myChartt.update();
    } else {
        // 如果图表不存在，创建新的图表
        myChartt = new Chart(ctx, {
            type: 'line',
            data: {
                labels: frequencies,
                datasets: [{
                    label: 'Signal Levels',
                    data: levels,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,  // 确保响应式开启
                maintainAspectRatio: true,  // 保持比例，如果你希望高度也动态变化，可以设置为false
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
        
    }
}

function obtaininfo_wlanstatus(token){
    const stamp = Date.now()
    const wsUrl = `http://localhost/api/wrtmng/1/dev/status?token=${token}&name=wlan.status&_=${stamp}`;
    fetch(wsUrl)
        .then(response => response.json())  // 将响应转换为JSON
        .then(data => {
            console.log('WLAN Status Response:', data);  // 在控制台输出WLAN状态数据
            console.log('WLAN Status Response1:', data.result.status[0].center1);  // 在控制台输出WLAN状态数据
            document.getElementById('center1').innerHTML=data.result.status[0].center1;
            document.getElementById('channel').innerHTML=data.result.status[0].channel;
            document.getElementById('channel_busy').innerHTML=data.result.status[0].channel_busy;
            document.getElementById('channel_receive').innerHTML=data.result.status[0].channel_receive;
            document.getElementById('channel_transmit').innerHTML=data.result.status[0].channel_transmit;
            document.getElementById('frequency').innerHTML=data.result.status[0].frequency;
            document.getElementById('link').innerHTML=data.result.status[0].link;
            document.getElementById('mac').innerHTML=data.result.status[0].mac;
            document.getElementById('mode').innerHTML=data.result.status[0].mode;
            document.getElementById('name').innerHTML=data.result.status[0].name;
            document.getElementById('noise').innerHTML=data.result.status[0].noise;
            document.getElementById('power').innerHTML=data.result.status[0].power;
            document.getElementById('radio').innerHTML=data.result.status[0].radio;
            document.getElementById('widthttt').innerHTML=data.result.status[0].width;
        })
        .catch(error => {
            console.error('Error fetching WLAN status:', error);  // 处理可能出现的错误
        });
}

function obtaininfo_tuopu(token){
    const stamp = Date.now()
    const wsUrl = `http://localhost/api/wrtmng/1/dev/status?token=${token}&name=net.mesh_vis&_=${stamp}`;
    fetch(wsUrl)
        .then(response => response.json())  // 将响应转换为JSON
        .then(data => {
            console.log('WLAN Status Response:', data);  // 在控制台输出WLAN状态数据
            console.log('WLAN Status Response1:', jsonData.result.status.vis[0].device);  // 在控制台输出WLAN状态数据
        })
        .catch(error => {
            console.error('Error fetching WLAN status:', error);  // 处理可能出现的错误
        });
}



function obtaininfo_netbridge(token){
    const stamp = Date.now()
    const wsUrl = `http://localhost/api/wrtmng/1/dev/status?token=${token}&name=net.bridge&_=${stamp}`;
    fetch(wsUrl)
        .then(response => response.json())  // 将响应转换为JSON
        .then(data => {

            console.log('Net Bridge Response:', data);  // 在控制台输出网络桥接状态数据
        })
        .catch(error => {

            console.error('Error fetching Net Bridge status:', error);  // 处理可能出现的错误
        });
}

function obtaininfo_mesh(token){
    const stamp = Date.now()
    const wsUrl = `http://localhost/api/wrtmng/1/dev/status?token=${token}&name=net.mesh_vis&_=${stamp}`
    fetch(wsUrl)
        .then(response => response.json())  // 将响应转换为JSON
        .then(data => {
            console.log('Net Mesh Response:', data);  // 在控制台输出拓扑结构相关数据
        })
        .catch(error => {
            console.error('Error fetching Net Mesh status:', error);  // 处理可能出现的错误
        });
}


function setupWebSocket(token) {
    const wsUrl = `ws://192.168.17.1/api/wrtmng/1/dev/websock?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = function() {
        console.log("Connection established");

        ws.send('{"task":"spectral"}');
        ws.send('{"cmd":"start","args":{"radio":"phy0"}}');
        ws.send('{"cmd":"continue"}');
    };

    ws.onmessage = function(event) {
        let dataa;
        if (typeof event.data === "string") {
          try {
            dataa = JSON.parse(event.data);
          } catch (error) {
            console.error("Error parsing event data as JSON:", error);
            return;
          }
        } else {
          dataa = event.data;
        }
      
        // 如果数据解析正确，并且包含需要的信息，就调用绘图函数
        if(dataa && dataa.data && dataa.data.signals) {
          renderChart(dataa);
        }
      };

    ws.onerror = function(event) {
        console.error("Error:", event);

    };

    ws.onclose = function() {
        console.log("Connection closed");

    };
}

function updateStatus(message) {
    document.getElementById('status').textContent = message;
}

function addMessage(message) {
    const messages = document.getElementById('messages');
    const msgElement = document.createElement('li');
    msgElement.textContent = message;
    // messages.appendChild(msgElement);
}
