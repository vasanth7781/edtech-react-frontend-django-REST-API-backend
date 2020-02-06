import React from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';





class VideosList extends React.Component{
    constructor(props){
        super(props);
        this.state =({
            isClicked:true
        })
        this.playVideo = this.playVideo.bind(this)
    }
    playVideo (vid,name){
       this.props.videoPlayer(true,vid,vid.name)
    }
    render(){
        const videos = this.props.videosCategory.map((videos,index)=>{
           if (this.props.Category === videos.Category){
               return(   
                   <Router key={index}>      
                   <div key={index}
                    onClick={()=>{this.playVideo({vid:videos.videos,
                                                                    name:videos.name
                    
                    })}}
                     className = "card" style = {{width:250,marginBottom:15,marginTop:15}}>
                         <Link to ={"/user/videos/"+videos.name} style={{textDecoration:'none',color:'black'}} className= "hover"
                         >
                       <img alt={videos.name} src= {videos.image} style={{width:250,height:150}}/>
                       <div className="card-body">
                       <p className="card-text text-truncate" style={{fontSize:14}}>
                       {videos.name}
                       </p>
                       </div>
                       </Link>
                   </div>
                   </Router> 
               )
           }
           return null
        })
        return(
            <div>
               
            <h1>{this.props.Category}</h1>
            <div style = {{border:'solid',borderWidth:1,borderColor:'rgba(0,0,0,0.13)',borderRadius:2,marginLeft:0,marginRight:0}}className="card-deck1">
                    {videos}   
            </div> 
            </div>
        )
    }
}
export default VideosList;