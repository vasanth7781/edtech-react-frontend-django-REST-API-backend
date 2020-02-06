import React from 'react';


class  MessageList extends React.Component{
    constructor(props){
        super(props);
        this.state=({

        })
    }
    componentDidMount(){
        this.listener.scrollIntoView({block:'end',behavior:'smooth'})
    }

    render(){
    return(
    <div 
    ref=  {(ref)=>{ this.listener = ref}   }
    >
        <div 
        style ={localStorage.getItem('userId') != this.props.messageList.user?{display:"flex",justifyContent:'flex-start'}:{display:"flex",justifyContent:'flex-end'} } 
        >
        <p
        style ={localStorage.getItem('userId') != this.props.messageList.user?{borderRadius:25,padding:8,marginLeft:25,marginBottom:25,backgroundColor:'white',fontFamily:'sans-serif'}:{fontFamily:'sans-serif',borderRadius:25,padding:8,marginRight:25,marginBottom:25,backgroundColor:'#8dcaff ',} }         
        >{this.props.messageList.message} {this.props.messageList.id}
        </p>
        </div>
    </div>
    )
    }
}
export default MessageList;