import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class TopicCompleted extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            topicCount : '',
        })
    }
    componentDidMount(){
        this.fetchCount()
    }

// fetching topic stated for a specific user from API

    fetchCount(){
        const url = 'http://192.168.0.107:8000/api/cat_count'
        fetch((url),{
            method:'GET',
            headers:{
                'Accept':'application/json',
            }
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                topicCount:res.results.filter(ys =>
                        ys.name === this.props.topic
                    ),
            })
        })
    }
    render(){
        console.log(this.props.topic_completed/this.state.topicCount.videoscount)
        const t = this.state.topicCount
        const countPercent = t && t.map(t=>
            Math.round((this.props.topic_completed/t.videoscount)*100)
            )
        const count = t && t.map(t =>
            t.videoscount)
        console.log(countPercent)
        return(
            <div style={{}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:5,margin:15,border:'solid',borderWidth:0.8,backgroundColor:'white',borderColor:'#c6bfbf'}}>
                    <div>
                        <h1>
                            {this.props.topic}
                        </h1>
                    </div>
                    <div style={{width:'65%'}}>
                         <CircularProgressbar  value={countPercent} text={countPercent+'% '}/>
                    </div>
                    <div style={{marginTop:10}}>
                        Topic Covered - {this.props.topic_completed+'/'+count}
                    </div>
                </div>
            </div>
        )
    }
}
export default TopicCompleted;