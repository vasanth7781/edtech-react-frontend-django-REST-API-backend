import React,{Component}  from 'react';
import { Player, ControlBar } from 'video-react';
import Chat from '../Chat/Chat'
import DoubtChat from './DoubtChat'

class VideoPlayerMain extends Component{
    constructor(props){
        super(props);
        this.state=({
            Videos:[ ],
            tabValue:null
        })
        // this.handleClick =this.handleClick.bind(this)
    }
    componentDidMount() {
        this.getVideoSource()

    }

// API call for getting list of videos with their info data

    getVideoSource(){
            fetch(('http://192.168.0.107:8000/api/videos'),{
               method:'GET',
               headers:{
                 'Accept': 'application/json',
               },
           })
           .then((response) => response.json())
           .then((res) => {
           this.setState({
               Videos:res.results.filter(res =>{
                    return (res.name === this.props.match.params.name)
               } )
           })
       })
    }
    
// component is updated when changing url with another name while playing current video

    shouldComponentUpdate(prevProps,nextProps) {
        // console.log(nextProps)
        // console.log( this.state.Videos !== nextProps.Videos)
          return  this.state.Videos !== nextProps.Videos;
        }   

 
    render(){
        const videoSrc = this.state.Videos && this.state.Videos .map((videos)=>{
            return videos.videos
        })
        // console.log(videoSrc)
        
        return(
        <div >
            <div>
                <h1>name</h1>
            </div>
            <div style={{}}>
                <Player {...this.props}
                width={100}
                src= {this.props.VideoSrc !== null ? this.props.VideoSrc : videoSrc}
                >
                    <ControlBar />
                </Player>     
            </div>
        </div>           
        )
    }
}



export default VideoPlayerMain;