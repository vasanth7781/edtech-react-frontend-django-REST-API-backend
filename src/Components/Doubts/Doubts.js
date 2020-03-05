import React from 'react'
import MessageList from '../Chat/MessageList'
import InputComponent from '../Chat/InputComponent'


class Doubts extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            DoubtsMessage:[ ],
            page:1,
            last_page:false,
            reverse_msg:false,
            socketInvoke:true,
            Name:''
        })
        this.send = this.send.bind(this)
        this.socketConnect = this.socketConnect.bind(this)
    }

    componentDidMount(){
    // Event listener for scroll to keep updated when receiving new message from socket and API
    // Also scroll to bottom of  doubt component
        this.listener.addEventListener('scroll', (event)=>{
            // this.setState({
                var node = event.target
                const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
                if (node.scrollTop === 0){
                    if(this.state.last_page === false){
        // if scroll has reaced to top ,making call to API to receive more older data
                        this.loadMoreMessage()                     
                    }else {
                        return  null
                    }
                }
           });
        // this two checks is to load only once when component is render for the first time 
           if (this.state.last_page === false){
                this.getDoubtsdata()
           }
            if (this.state.socketInvoke === true){
            this.socketConnect()
        }
    }
// for receiving new message from other users and sending message by emitiing
    socketConnect =  async() =>{
        await this.props.socket.emit('Doubts',this.props.VideoName)
        this.props.socket.on(this.props.VideoName, msgdata => {
            this.setState({ 
                reverse_msg:true,
                DoubtsMessage:[...this.state.DoubtsMessage,msgdata]
              });
          })
     } 
// new message received in props will update the component and msg data is reversed in order to render properly
     componentWillReceiveProps(prevProps,nextProps){
         console.log(this.props)
         if(prevProps.sidebar === false){
            this.setState({
                reverse_msg:true
            })
            }
     }

// for loading more message with add page number for API call
    loadMoreMessage(){
        setTimeout(function(){
            this.setState({
                reverse_msg:false,
                socketInvoke:false,
                page: this.state.page+1,         
            },
                this.getDoubtsdata
                )
        }.bind(this),1000)
        
    }

// API call for getting already sent and received message w.r.t topic and also for load more message using page number
    getDoubtsdata = async()=>{
        const url = 'http://192.168.0.107:8000/chat/api/video/doubt/'+this.props.VideoName+'/?page='+this.state.page
        await fetch((url),{
               method:'GET',
               headers:{
                 'Accept': 'application/json',

               },
           })
           .then((response) =>{
            if(!response.ok){ 
                this.setState({
                    last_page:true,
                    socketInvoke:false
                })
            }
            else {
                return response.json()
            };
          })
          .then((res) => {
            //   console.log(res)
            if(res !== undefined){
            this.setState( {
                socketInvoke:false,
                DoubtsMessage:this.state.DoubtsMessage.concat((res.results))

            })
            }
        }) 
    }
// when send is clicked message is sent and also POST request is made using API
    send(_msg){
        var form = new FormData();
        const url = 'http://192.168.0.107:8000/chat/api/video/doubt/'+this.props.match.params.name+'/'
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
                topic:this.props.match.params.name
            })
        })
        .then((response) => response.json())
        .then((res) => {      
          this.props.socket.emit("message",res)
        })
    }

    render(){
        const message = this.state.reverse_msg == false ? this.state.DoubtsMessage.reverse() :this.state.DoubtsMessage
        const Message = message && message.map(
            message=><MessageList  key={message.id} friends_id = {this.state._frind_id} messageList = {message} reverse_msg = {this.state.reverse_msg}/>
        )  
        const InputMessage  = (<InputComponent {...this.props} sendMessage={this.send}  socketConnect={this.socketConnect} />)        
        return(
            <div>
                <div
                ref =  {(ref)=> this.listener = ref}
                style={
                    this.props.sidebar?
                    {overflowY:"scroll" ,height:400,width:"100%",border:'solid',borderWidth:1,borderTopWidth:0}
                :{overflowY:"scroll" ,height:500,width:"100%",border:'solid',borderWidth:1,borderTopWidth:0}
                }>
                    {Message}
                </div>
                <div style={{width:'100%'}}>
                    {InputMessage}
                </div>
            </div>
        )
    }
}
export default Doubts;
