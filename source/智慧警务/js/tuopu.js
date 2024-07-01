var jsonData = {
                   "status": "success",
                   "result": {
                       "status": {
                           "name": "meshvis",
                           "version": "1",
                           "protocol": "mi-mesh",
                           "local_mac": "00:10:60:14:00:1a",
                           "vis": [
                               {
                                   "device": "00:10:60:14:00:1a",
                                   "mesh": "fe:10:60:14:00:1a",
                                   "ip": "192.168.17.1,255.255.255.0",
                                   "hostname": "Mesh",
                                   "interfaces": [
                                       "02:10:60:14:00:1a"
                                   ],
                                   "paths": [
                                       {
                                           "router": "02:10:60:14:00:1a",
                                           "mac": "02:10:60:14:00:38",
                                           "nexthop": "02:10:60:14:00:38",
                                           "transmit_quality": "240/255",
                                           "metric": "1.063"
                                       },
                                       {
                                           "router": "02:10:60:14:00:1a",
                                           "mac": "02:10:60:14:00:28",
                                           "nexthop": "02:10:60:14:00:28",
                                           "transmit_quality": "233/255",
                                           "metric": "1.094"
                                       }
                                   ],
                                   "peers": [
                                       {
                                           "router": "02:10:60:14:00:1a",
                                           "mac": "02:10:60:14:00:28",
                                           "last_seen": "0.2s",
                                           "distance": "0.00km",
                                           "ccq": "91%",
                                           "signal": "-32 dBm",
                                           "snr": "63 dB",
                                           "noise_floor": "-101 dBm"
                                       },
                                       {
                                           "router": "02:10:60:14:00:1a",
                                           "mac": "02:10:60:14:00:38",
                                           "last_seen": "0.0s",
                                           "distance": "0.00km",
                                           "ccq": "100%",
                                           "signal": "-17 dBm",
                                           "snr": "78 dB",
                                           "noise_floor": "-101 dBm"
                                       }
                                   ]
                               },
                               {
                                   "device": "00:10:60:14:00:28",
                                   "mesh": "fe:10:60:14:00:28",
                                   "ip": "192.168.17.4/255.255.255.0",
                                   "hostname": "admin",
                                   "interfaces": [
                                       "02:10:60:14:00:28"
                                   ],
                                   "paths": [
                                       {
                                           "router": "02:10:60:14:00:28",
                                           "mac": "02:10:60:14:00:38",
                                           "nexthop": "02:10:60:14:00:38",
                                           "transmit_quality": "242/255",
                                           "metric": "1.054"
                                       },
                                       {
                                           "router": "02:10:60:14:00:28",
                                           "mac": "02:10:60:14:00:1a",
                                           "nexthop": "02:10:60:14:00:1a",
                                           "transmit_quality": "233/255",
                                           "metric": "1.094"
                                       }
                                   ],
                                   "peers": [
                                       {
                                           "router": "02:10:60:14:00:28",
                                           "mac": "02:10:60:14:00:1a",
                                           "last_seen": "0.2s",
                                           "distance": "0.00km",
                                           "ccq": "100%",
                                           "signal": "-19 dBm",
                                           "snr": "76 dB",
                                           "noise_floor": "-102 dBm"
                                       },
                                       {
                                           "router": "02:10:60:14:00:28",
                                           "mac": "02:10:60:14:00:38",
                                           "last_seen": "0.1s",
                                           "distance": "0.02km",
                                           "ccq": "100%",
                                           "signal": "-12 dBm",
                                           "snr": "83 dB",
                                           "noise_floor": "-102 dBm"
                                       }
                                   ]
                               },
                               {
                                   "device": "00:10:60:14:00:38",
                                   "mesh": "fe:10:60:14:00:38",
                                   "ip": "192.168.17.3/255.255.255.0",
                                   "hostname": "Mesh",
                                   "interfaces": [
                                       "02:10:60:14:00:38"
                                   ],
                                   "paths": [
                                       {
                                           "router": "02:10:60:14:00:38",
                                           "mac": "02:10:60:14:00:1a",
                                           "nexthop": "02:10:60:14:00:1a",
                                           "transmit_quality": "245/255",
                                           "metric": "1.041"
                                       },
                                       {
                                           "router": "02:10:60:14:00:38",
                                           "mac": "02:10:60:14:00:28",
                                           "nexthop": "02:10:60:14:00:28",
                                           "transmit_quality": "223/255",
                                           "metric": "1.143"
                                       }
                                   ],
                                   "peers": [
                                       {
                                           "router": "02:10:60:14:00:38",
                                           "mac": "02:10:60:14:00:28",
                                           "last_seen": "0.0s",
                                           "distance": "0.03km",
                                           "ccq": "72%",
                                           "signal": "-24 dBm",
                                           "snr": "71 dB",
                                           "noise_floor": "-103 dBm"
                                       },
                                       {
                                           "router": "02:10:60:14:00:38",
                                           "mac": "02:10:60:14:00:1a",
                                           "last_seen": "0.2s",
                                           "distance": "0.00km",
                                           "ccq": "100%",
                                           "signal": "-17 dBm",
                                           "snr": "78 dB",
                                           "noise_floor": "-103 dBm"
                                       }
                                   ]
                               }
                           ]
                       }
                   }
               }
    alert("123");
    // 创建 SVG 元素
    var svg = d3.select("#tuopu")
                .append("svg")
                .attr("width", 450)
                .attr("height", 300);

    // 定义节点和链接的数据
    data=jsonData.result.status.vis
    leng=jsonData.result.status.vis.length
    nodes=[]

    for (var i = 0; i < leng; i++){

       nodes.push({ id: data[i].hostname+"\n"+data[i].device, url: "https://www.example1.com" })
}



    var links = [
        {source: nodes[0], target: nodes[1]},
        {source: nodes[1], target: nodes[2]},
        {source: nodes[0], target: nodes[2]}

    ];

    // 创建力导向图
    var simulation = d3.forceSimulation(nodes)
                       .force("link", d3.forceLink(links).distance(200))
                       .force("charge", d3.forceManyBody().strength(-400))
                       .force("center", d3.forceCenter(150, 150));

    // 创建链接
    var link = svg.append("g")
                  .selectAll("line")
                  .data(links)
                  .join("line")
                  .attr("stroke", "#999")
                  .attr("stroke-opacity", 0.6)
                  .on("click", function(d, i, nodes) {
    // 'd' 是当前边的数据
    // 'i' 是当前边的索引
    // 'nodes' 是当前选择的节点集合（在本例中可能不需要）

    // 假设你有一个函数来创建和显示弹出窗口

  });

    // 创建节点
    var node = svg.append("g")
                  .selectAll("a")
                  .data(nodes)
                  .join("a")
                  .attr("xlink:href", d => d.url)
                  .attr("target", "_blank")
                  .call(drag(simulation))
                  .on("click", function(d, i, nodes) {
    // 'd' 是当前边的数据
    // 'i' 是当前边的索引
    // 'nodes' 是当前选择的节点集合（在本例中可能不需要）

    // 假设你有一个函数来创建和显示弹出窗口
    msg=""
    for (var j = 0; j < data[i.index].peers.length; j++){
       msg=msg+"->"+data[i.index].peers[j].mac+"\n"+"distance:"+data[i.index].peers[j].distance+"  "+"noise:"+data[i.index].peers[j].noise_floor+"\n"
}
    var meg = "ip: "+data[i.index].ip+"\n"+msg
    alert(meg);
  });

    node.append("circle")
        .attr("r", 20)
        .attr("fill", "#69b3a2");

    node.append("text")
        .attr("dy", "0.35em")
        .attr("x", 25)
        .text(d => d.id);

    // 更新力导向图
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // 定义拖拽行为
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subjectfy = null;
        }

        return d3.drag()
                 .on("start", dragstarted)
                 .on("drag", dragged)
                 .on("end", dragended);
    }