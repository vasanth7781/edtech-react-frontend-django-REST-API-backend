import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import TopicCompleted from './TopicCompleted';



class DashboardMain extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            usertopic : '',
            profile:'',
        })
    }
    componentDidMount(){
        this.fetchUserTopicData()
        this.fetchUserProfile()
        this.getCookie()

    }

// fetching user profile details from api
    fetchUserProfile = () =>{
        const url = 'http://192.168.0.107:8000/api/users/profile/'
        fetch((url),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                user:2,
            })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                profile:res
            })
        })
    }
// fetching User topic from API
    fetchUserTopicData= () => {
        const url = "http://192.168.0.107:8000/api/users/usertopic/2";
        fetch((url),{
            method:'GET',
            headers:{
                'Accept':'application/json',
            }
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                usertopic:res,
            });
        })
    }

    render(){
        console.log(this.state.profile)
        const vals = this.state.usertopic
        return(
            <div style={{padding:15,marginTop:5}}>
                <div style={{backgroundColor:'pink', display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'flex-end'}}   >
                            <div>
                                edit profile
                            </div>
                        </div>
                    <div style={{ display:'flex',justifyContent:'center'}}>
                        <div style={{padding:15,display:'flex'}}>
                            <div style={{padding:5}}>
                                <img class='rounded-circle' style={{width:150,height:170}} src = {this.state.profile.image} />
                            </div>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}> 
                                <div style={{padding:5}}>
                                {this.state.profile.Name}
                                </div>
                                <div style={{padding:5}}>
                                    {this.state.profile.Mobileno}
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',flexFlow:'row wrap',marginTop:25}}>
                {
                Object.keys(vals).map((key, index) =>  {
                    if(key === "id"){
                        return null
                    }
                    else if(key === "Videosname"  ){
                        return null
                    }
                    else if(key === "user" ){
                        return null
                    }
                    else{
                        return  (
                            <div style={{width:'250px'}}>
                                <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}} >
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                        <TopicCompleted key={index} {...this.props} topic = {key} topic_completed = {vals[key]} />
                                    </div>
                                <div>
                            </div>
                        </div>
                     </div>      
                        )         
                }
            })
            }
                </div>
            </div>
        )
    }
}
export default DashboardMain
