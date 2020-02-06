import React,{Component}  from 'react';
import { Player, ControlBar } from 'video-react';
import Chat from '../Chat/Chat'
import DoubtChat from './DoubtChat'
import VideoPlayerMain from "./VideoPlayerMain"
import '../../App.css';


class VideoPlayer extends Component{
    constructor(props){
        super(props);
        this.state=({
            Videos:[ ],
            tabValue:null
        })
        this.handleClick =this.handleClick.bind(this)
    }
    componentDidMount() {

    }

    componentDidUpdate(){
       window.onpopstate= (event)=>
           this.handleClick()  
       }
    
    handleClick(){
       this.props.videoPlayer(false,null)
    }

    handleTab=(tab)=>{
        this.setState({
            tabValue:tab
        })
    }
 
    render(){

        return(
    <div style={{width:"100%"}}>
        <div style={{display:'flex',width:"100%"}}>
            <div style={{ width:"50%"}}>
                    <VideoPlayerMain {...this.props} socket ={this.props.socket} VideoSrc = {this.props.VideoSource != undefined? this.props.VideoSource.vid: null} />
            </div>
            <div style={{width:"50%"}}>
                <div style={{display:'flex',border:'0.5px solid',height:50
                }}>
                    <div 
                    onClick = {()=>this.handleTab(0)}
                    style ={{cursor:'pointer',padding:10,border:'solid',height:"100%",borderWidth:0,borderRightWidth:1.1,justifyContent:'center',width:"100%",textAlign:'center'}}>
                        <div className='VideosTab' style={{width:'70%',height:'100%',display:'inline-block'}}>   
                            <p style={{textAlign:'center'}}>Click here to start Doubt sesion</p>
                        </div>
                    </div>
                </div>
                <div style={{height:'100%'}}>
                    <DoubtChat  {...this.props} sidebar={this.props.sidebar} VideoName ={this.props.VideoName !== undefined ?this.props.VideoName: this.props.match.params.name  } 
                    socket = {this.props.socket} TabValue ={this.state.tabValue}  />
                </div>
                </div>
            </div>
        </div>
        )
    }
}



export default VideoPlayer;