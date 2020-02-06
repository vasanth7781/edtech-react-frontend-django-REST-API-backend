import React from 'react';


class  UserFriends extends React.Component{
    constructor(props){
        super(props);
        this.Message=  this.Message.bind(this)
    }

    Message(us){
        this.props.socketConnect(us)
        this.props.Message(us)
    }
    render(){
         return(
                <div>
                    <div onClick = {()=>this.Message(this.props.friends.user)} style={{cursor:'pointer',display:"flex",marginBottom:10,border:'solid',borderWidth:"0px 0px 0.9px 0px", }}>
                        
                        <div style={{padding:10}}>
                        <img alt ={this.props.friends.Name} className="rounded-circle" style={{width:100,height:100}} src = {this.props.friends.image}>
                        </img>
                        </div>
                        <div style ={{paddingTop:25,paddingBottom:25,paddingLeft:10,paddingRight:10,alignSelf:"center"}}>
                        <p style ={{marginBottom:0}}>{this.props.friends.Name} </p>
                        </div>
                    </div>
                    </div>
    )
    }
}
export default UserFriends;