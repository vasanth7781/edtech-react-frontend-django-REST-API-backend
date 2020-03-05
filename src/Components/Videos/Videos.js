import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import VideosList from './VideosList';
import VideoPlayer from './VideoPlayer';



class Videos extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            Videos : '',
            isOpened:false,
            source:"",
            name:' '
        })
        this.videoPlayer = this.videoPlayer.bind(this)
    }
    componentDidMount() {
        this.fetchVideosApi();
    }


    fetchVideosApi  (){
         fetch(('http://192.168.0.107:8000/api/videos'),{
            method:'GET',
            headers:{
              'Accept': 'application/json',
              // 'Authorization':'Token ' + this.params1
            },
        })
        .then((response) => response.json())
        .then((res) => {
        this.setState({
            Videos:res.results
        })
    })
 }

        videoPlayer(isPlayer,src,name){
            // console.log(name)
            if(this.state.source == null) {
                this.handleNull()
            }
            this.setState({isOpened:isPlayer})
            this.setState({
                source:src,
                name:name,
            })
        }
        handleNull(){
            this.setState({source:null,name:null})
        }
    render(){
        const videos = this.state.Videos
        const rows = [ ];

        videos && videos.map(videos =>{
            rows.push(videos.Category)
            return null
            })
        var result = [];
        result = rows.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        })
        const videoList = result && result.map((result,index)=>{
            return(
                <div key = {index}>
                    <VideosList key={index} {...this.props} Category = {result} videosCategory={videos} videoPlayer={this.videoPlayer}/>
                </div>
            )
        })
        return(
            <div>
            {this.state.isOpened === false?
            <div style={{margin:5,paddingTop:30}}>
                <h1>
                    {videoList}
                </h1>
            </div>
            :
            <div style={{display:'flex'}}>
            <div style={{width:"100%"}}>
                 <VideoPlayer {...this.props} sidebar={this.props.sidebar} socket= {this.props.socket} VideoName = {this.state.name} VideoSource = {this.state.source} videoPlayer={this.videoPlayer}/>
            </div>
            </div>
            }
            </div>
    
        )
    }
}

export default Videos;
