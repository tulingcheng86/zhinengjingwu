
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


function setupWebSocket(token) {
    const wsUrl = `ws://192.168.17.1/api/wrtmng/1/dev/websock?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = function() {
        console.log("Connection established");
        updateStatus("Connected");
        ws.send('{"task":"spectral"}');
        ws.send('{"cmd":"start","args":{"radio":"phy0"}}');
        ws.send('{"cmd":"continue"}');
    };

    ws.onmessage = function(event) {
        let data;
        if (typeof event.data === "string") {
          try {
            data = JSON.parse(event.data);
          } catch (error) {
            console.error("Error parsing event data as JSON:", error);
            return;
          }
        } else {
          data = event.data;
        }

        // 如果数据解析正确，并且包含需要的信息，就调用绘图函数
        if(data && data.data && data.data.signals) {
          renderChart(data);
        }
      };

    ws.onerror = function(event) {
        console.error("Error:", event);
        updateStatus("Error encountered");
    };

    ws.onclose = function() {
        console.log("Connection closed");
        updateStatus("Disconnected");
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
