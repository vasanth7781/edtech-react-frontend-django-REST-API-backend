import React,{Component} from 'react';
import Doubts from '../Doubts/Doubts';


class DoubtChat extends Component{

    render(){
        return(
            <div>
                {this.props.TabValue === 0 ? <Doubts ref ='socketInvoke' sidebar={this.props.sidebar} {...this.props} VideoName ={this.props.VideoName  } socket = {this.props.socket} /> : null}
            </div>
        )
    }
}

export default DoubtChat;