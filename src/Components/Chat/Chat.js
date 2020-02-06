import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import Friends from './UserFriends';
import MessageList from './MessageList';
import InputComponent from './InputComponent';
import io from "socket.io-client";




class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            Users : '',
            _frind_id:'',
            frnd:"",
            page:1,
            message:[ ],
            extaMsh:[ ],
            last_page:false,
            reverse_msg:false,
            update:true
        })
        this.Message=this.Message.bind(this)
        this.loadMoreMessage = this.loadMoreMessage.bind(this)
        this.send =this.send.bind(this)
        this.socketConnect = this.socketConnect.bind(this)
    }
    componentDidMount() {
        this.listener.addEventListener('scroll', (event)=>{
                var node = event.target
                const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
                if (node.scrollTop === 0){
                    if(this.state.last_page === false){
                        this.loadMoreMessage()
                      
                    }else {
                        return  null
                    }
                }
           });
        this.fetchusers();
    }
    componentWillReceiveProps(prevprops,nextprops){
        if(prevprops.sidebar === false){
        this.setState({
            reverse_msg:true
        })
        }
    }
    loadMoreMessage(){
        setTimeout(function(){
            this.setState({
                reverse_msg:false,
                page: this.state.page+1,
            
            },
                this.Message
                )
        }.bind(this),1000)
        
    }
    
    fetchusers = () => {
      fetch (('http://192.168.0.107:8000/api/friends/'),{
            method:'POST',  
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body:JSON.stringify({
                user: localStorage.getItem("userId"),
            })
        })
        .then((response) => response.json())
        .then((res) => {
          this.setState({
            Users:res.friends
          })
        })  
          .catch((error) => {
            console.log(error)
          })
      }
      Message=async(frnd_id)=>{
          if (frnd_id != null){
            this.setState({
                _frind_id:frnd_id
            })
        }
        // const url = 'http://192.168.43.22:8000/chat/api/user/'+localStorage.getItem("userId")+'/'+frnd_id+'/'+localStorage.getItem("userToken")+'?page='+this.state.page
        const url ="http://192.168.0.107:8000/chat/api/user/2/3/e7ed54f4edf868f0f130b6e4b6ecc66d885c818b?page="+this.state.page
        await fetch(url)
          .then((response) =>{
            if(!response.ok){ 
                this.setState({
                    last_page:true
                })
                throw new Error (response.status)
            }
            else {
                return response.json()
            };
          })
          .then((res) => {
            if(res.detail === "Invalid page"){
                this.setState({
                    last_page:true
                })
            }else {
            this.setState( {
                message:this.state.message.concat((res.results)),
            })
        }
            })          
            .catch(error => {
            })

      }
      socketConnect = async (_chat_id) =>{
          const userId = localStorage.getItem('userId')
          const friend_uniq = _chat_id
          if (userId>friend_uniq){
              this. chat_id = friend_uniq+userId
          }else{
              this. chat_id = userId+friend_uniq
          }
          const room_id = this.chat_id
        this.setState({
            frnd: room_id
        })  
        await this.props.socket.emit('params',room_id)
        this.props.socket.on(room_id, json_data => {
            console.log(this.state.message)
               console.log( [...this.state.message.splice(0,1),json_data])
            this.setState({ 
                reverse_msg:true,
                message:[...this.state.message,json_data]
              });
          })
  }

    send(_msg){
        const url = 'http://192.168.0.107:8000/chat/api/user/post/2/3'
        fetch ((url),{
            method:'PUT',  
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body:
            JSON.stringify({
                user:localStorage.getItem("userId")  ,
                message:_msg,
                token:this.props.userAuth,
            })
        })
        .then((response) => response.json())
        .then((res) => {      
          this.props.socket.emit("chat message",res)
        })
    }
    render(){
        const message = this.state.reverse_msg == false ? this.state.message.reverse() :this.state.message
        const Message = message && message.map(
            message=><MessageList  key={message.id} friends_id = {this.state._frind_id} messageList = {message} reverse_msg = {this.state.reverse_msg}/>
        )   
        const UserFriends =this.state.Users;
        const Users =UserFriends && UserFriends.map(friends=>< Friends key={friends.id} friends = {friends} Message={this.Message} socketConnect={this.socketConnect}/>)
        const InputMessage  = (<InputComponent sendMessage={this.send}/>)
        return(
            <div style={{display:"flex",width:"100%",paddingTop:75,paddingLeft:30,paddingRight:30,paddingBottom:40}}>
                <div style={{padding:15,backgroundColor:'white',width:"75%"}}>
                {Users}
                </div>
                <div style={{padding:25 ,width:"100%",backgroundColor:'white'}}>
                    <div style={{backgroundColor:"aliceblue",width:"100%"}}>
                        <div style={{color:'white',textAlign:"center",backgroundColor:'#2c9cff',borderWidth:2,borderColor:'#d8d8d8'}}>
                            <h1>{this.state._frind_id}</h1>
                        </div>
                        <div >
                            <div 
                             ref =  {(ref)=> this.listener = ref}
                             style={{overflowY:"scroll" ,height:500,width:"100%"}}>
                                {Message}
                            </div>
                        </div>
                        <div style={{width:"100%"}}>
                           {InputMessage}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Chat;