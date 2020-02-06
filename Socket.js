const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server)
const port = 5000;
var http = require("http")
var querystring = require('querystring');
var online = [ ]
io.on("connection",socket=>{
    console.log("a user connected : D") 
    // console.log("test",socket.connected) 
    // console.log(socket)
    // io.emit("onlineUser",2)
    socket.on("online",userId=>{
        // console.log(userId)
        online.push(userId)
        var time = new Date().getTime()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var timestamp = (year + '-' + month + '-' + date + 'T'+ hours+':'+min+':'+ sec+'Z')
        console.log(JSON.stringify(timestamp))
        console.log(time)
        var values = querystring.stringify({User:userId,
                                                        is_online:socket.connected,
                                                        last_seen:timestamp
                                                     })
        console.log(values)
        var options = {
            hostname:'192.168.43.22',
            port:'8000',
            path:'/chat/api/user/' + userId,
            method:"PUT",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':values.length
            },
            // body:JSON.stringify({
            //     User:userId,
            //     is_online:true
            // })
        };
        console.log(values)

        var request = http.request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data',function(data){
                //Here return django
                console.log(data);
                io.emit('onlineUser',data);
                adfgf = JSON.parse(data)
                io.emit(userId,adfgf);
            });
        });

        request.write(values);
        request.end();
    });
        // socket.broadcast.emit("onlineUser",userId)
    //     io.emit("onlineUser",userId)
    //     console.log(online)
    // })
    socket.on("userstatusserver",userid=>{
        var options = {
            hostname:'192.168.43.22',
            port:'8000',
            path:'/chat/api/user/' + userid,
            method:"GET",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                // 'Content-Length':values.length
            },
            // body:JSON.stringify({
            //     User:userId,
            //     is_online:true
            // })
        };
        var request = http.request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data',function(data){
                //Here return django
                add = JSON.parse(data)
                io.emit(userid,add);
            });
        });
        request.write;
        request.end();

    })

    socket.on('Doubts',a =>{
        socket.on('message',msgDatas =>{
            console.log(msgDatas)
            io.emit(a,msgDatas)
        })
        // console.log(a)
    })
    socket.on('params',param =>{
        console.log(param)
        socket.on("chat message",msg =>{
            console.log(msg)
            io.emit(param,msg );
        })
    })

    socket.on("offline",userId=>{
        // console.log(userId)
        // online.push(userId)
        // socket.disconnect(true)
        var time = new Date().getTime()
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var timestamp = (year + '-' + month + '-' + date + 'T'+ hours+':'+min+':'+ sec+'Z')
        console.log(JSON.stringify(timestamp))
        console.log(time)
        var values = querystring.stringify({User:userId,
                                                        is_online:false,
                                                        last_seen:timestamp
                                                     })
        console.log(values)
        var options = {
            hostname:'192.168.43.22',
            port:'8000',
            path:'/chat/api/user/' + userId,
            method:"PUT",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':values.length
            },
            // body:JSON.stringify({
            //     User:userId,
            //     is_online:true
            // })
        };
        console.log(values)

        var request = http.request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data',function(data){
                //Here return django
                console.log(data);
                io.emit('onlineUser',data);
                offlinestat = JSON.parse(data)
                io.emit(userId,offlinestat);
            });
        });

        request.write(values);
        request.end();
    });
        // socket.broadcast.emit("onlineUser",userId)
    //     io.emit("onlineUser",userId)
    //     console.log(online)
    // })
   
})
server.listen(port,()=> console.log("server running" + port))