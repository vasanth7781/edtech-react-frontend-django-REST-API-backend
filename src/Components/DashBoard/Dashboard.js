import React  from 'react';
import {BrowserRouter as Router,NavLink} from 'react-router-dom';
import {Route} from 'react-router-dom'; 
import Chat  from '../Chat/Chat';
import Doubts from '../Doubts/Doubts'
import Videos  from '../Videos/Videos';
import VideoPlayer from '../Videos/VideoPlayer';
import io from "socket.io-client";
import DashboardMain from './DashboardMain'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
var aesjs = require('aes-js');

// using socket to send and received message 
let socket=   io("http://192.168.0.107:5000");     
 
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        // this.props.history.block()
        this.state=({
            active:null,
            decryptedUserToken:"",
            sidebar:true,
            childUpdate:true,
        })
        this.params = localStorage.getItem("userdata")
        this.hideSidebar= this.hideSidebar.bind(this)
        this.showSidebar= this.showSidebar.bind(this)
    }

    componentDidMount(){
// encrypting user data to store in localstorage
        var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

        var encryptedBytes = aesjs.utils.hex.toBytes(localStorage.getItem('userToken'));

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        this.setState({
            decryptedUserToken:decryptedText
        })     
    // checking localstorage for user login state 
        if(localStorage.getItem('userToken') != null){
            this.props.handleSuccesLogin(true)
        }else{
            this.props.handleSuccesLogin(false)
            this.props.history.push('/')      
        }
 // for handling size change in browser
        window.addEventListener('resize',this.handleResize)
    }
    handleResize =() =>{
        if(window.innerWidth <= 1200){
            this.setState({
                sidebar:false,
                childUpdate:false
            })
        }
    }
// for hiding sidebar 
    hideSidebar(){
        this.setState({
            sidebar:false,
            childUpdate:false
        })
    }
// for showing sidebar 
    showSidebar(){
        if(window.innerWidth <= 1200){
            setTimeout(function(){
                this.setState({
                    sidebar:false,
                    childUpdate:false
                })
            }.bind(this),10000)
        }

        this.setState({
            sidebar:true,
            childUpdate:false
        })
    }
// for changing styles when hiding sidebar
    hiidestyles={
        // paddingLeft:15,
        width: "calc(100% - 260px)",
        position: "relative",
        float: "right",
    }
// for changing styles when showing sidebar
    showstyles={
        overflowX :'hidden',
        position: "relative",

    }
// styles done to side bar
    sidebarStyles={
        width:260,
    }
// for logout and clearing local storage
    Logout (){
        localStorage.clear()
    }
    render() {
        console.log(this.state.sidebar)
        return (
            <Router>
            <div className = "wrapper">
            {this.state.sidebar === true ? 
                <div style = {this.sidebarStyles} className=" border-right h-100 position-fixed" id="sidebar-wrapper">
                    <ul style={{marginTop:80}} className="list-group list-group-flush">                   
                        <li style={{}} className=" list-group-item-action ">
                            <NavLink to ='/user/dashboard' style={{display:'flex',margin:'0px 10px',textDecoration:"none",color:'#3c4858',
                        }} 
                            activeStyle={{
                            color:'#ff6361',
                            border: 'solid',
                            borderWidth:0,
                            borderLeftWidth:2,
                            display: "flex",
                            textDecoration:"none",}}>
                                < DashboardOutlinedIcon style={{padding:'10px 15px',fontSize:'3.5rem'}}/>
                                <p style={{marginBottom:0,paddingLeft:5,paddingRight:5,paddingTop:15,paddingBottom:15}}>
                                    Dashboard
                                    </p>
                                    </NavLink>
                        </li>
                        <li style={{}} className=" list-group-item-action  ">
                            <NavLink to ='/user/videos'  style={{display:'flex',margin:'0px 10px',textDecoration:"none",color:'#3c4858',
                        }}
                            activeStyle={{
                            color:'#ff6361',
                            border: 'solid',
                            borderWidth:0,
                            borderLeftWidth:2,
                            display: "flex",
                            textDecoration:"none",}}>
                            <VideoLibraryOutlinedIcon style={{padding:'10px 15px',fontSize:'3.5rem'}}/>
                            <p  style={{marginBottom:0,paddingLeft:5,paddingRight:5,paddingTop:15,paddingBottom:15}}>
                                Videos
                                </p>
                                </NavLink>
                        </li>
                        <li style={{}} className=" list-group-item-action ">
                            <NavLink to ='/user/chat'  style={{display:'flex',margin:'0px 10px',textDecoration:"none",color:'#3c4858',
                        }}
                            activeStyle={{
                                color:'#ff6361',
                                border: 'solid',
                                borderWidth:0,
                                borderLeftWidth:2,
                                display: "flex",textDecoration:"none",}}>
                        <ChatOutlinedIcon style={{padding:'10px 15px',fontSize:'3.5rem'}} />
                            <p style={{marginBottom:0,paddingLeft:5,paddingRight:5,paddingTop:15,paddingBottom:15}}>
                                Chat
                                </p>
                                </NavLink>
                    
                        </li>
                        <li style={{}} className="list-group-item-action  ">
                            <NavLink to ='/user/Doubts'  style={{display:'flex',margin:'0px 10px',textDecoration:"none",color:'#3c4858'}} 
                            activeStyle={{
                            color:'#ff6361',
                            border: 'solid',
                            borderWidth:0,
                            borderLeftWidth:2,
                            display: "flex",textDecoration:"none",}}>
                            <NotesOutlinedIcon  style={{padding:'10px 15px',fontSize:'3.5rem'}} />
                            <p style={{marginBottom:0,paddingLeft:5,paddingRight:5,paddingTop:15,paddingBottom:15}}>
                                Doubts
                                </p> 
                                </NavLink>
                        </li>
                        <li style={{}} className="list-group-item-action ">
                            <NavLink to ='/user/Test'   style={{display:'flex',margin:'0px 10px',textDecoration:"none",color:'#3c4858'}} 
                            activeStyle={{
                                color:'#ff6361',
                                border: 'solid',
                                borderWidth:0,
                                borderLeftWidth:2,
                                display: "flex",textDecoration:"none",}}>
                            <AssignmentOutlinedIcon style={{padding:'10px 15px',fontSize:'3.5rem'}} />
                            <p style={{marginBottom:0,paddingLeft:5,paddingRight:5,paddingTop:15,paddingBottom:15}}>
                                Test
                                </p>
                                </NavLink>
                        </li>
                    </ul>
                </div>
                :
                null
             }
                <div style={this.state.sidebar === true ?this.hiidestyles:this.showstyles} className = ""> 
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " style={{
                    backgroundColor:'white',justifyContent:'center',height:50,border:'solid',borderWidth:0,borderBottomWidth:2,
                    borderBottomColor:'#949494',borderBottomRightRadius:4,borderBottomLeftRadius:4,flexFlow:"row",
                   display:"flex"
                   }}>
                    <div style={{width:'100%',display:'flex',flexFlow:'row'}}>
                        <div>
                            {this.state.sidebar === true ?
                            <div style={{backgroundColor:'#ff6361',borderRadius:8,cursor:'pointer'}} onClick ={this.hideSidebar}>
                                <a >
                                <MenuIcon style={{fontSize:'2.25rem'}}/>
                                </a>
                            </div>
                            :
                            <div style={{backgroundColor:'#ff6361',borderRadius:8,cursor:'pointer'}} onClick ={this.showSidebar}>
                                <a >
                                <MenuIcon style={{fontSize:'2.25rem'}}/>
                                </a>
                            </div>
                            }
                        </div>  
                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                        <div style={{justifyContent:'center',display:'flex',width:'100%',}}>
                            <div style={{width:'100%',}}>
                            <form style={{width:'100%',}}>
                                <input style={{border:'solid',borderWidth:1,width:'100%',paddingLeft:10}} type='text'  placeholder ='Search here...' />
                            </form>
                            </div>
                            <div style={{border:'solid',borderWidth:1,width:35,height:'100%',display:'flex',justifyContent:'center',borderLeftWidth:0}}>
                            <SearchIcon style={{fontSize:'1.5rem',alignSelf:'center'}} />
                            </div>
                        </div>
                    </div>
                        
                    <div style={{width:'100%',display:'flex',flexFlow:'row-reverse'}}>                  
                    <div style={{backgroundColor:'#ff6361',padding:2,paddingLeft:20,paddingRight:20,borderRadius:35,marginRight:5}} onClick = {this.Logout}>
                        <div>
                        <a style={{textDecoration:'none',color:'black'}} href = '/' >
                        Log out
                        </a>
                        </div>
                    </div>
                    </div>
                </nav>
                <div style={{marginTop:50,backgroundColor:'#F8F7F6',height:"100vh"}}>
                    <Route path='/user/dashboard'  exact strict render ={
                            (props)=>(
                                    <DashboardMain {...props}/>
                                )
                        }    
                        />
                    <Route path='/user/videos'  exact strict 
                    render ={
                            (props)=>(
                                <Videos {...props} sidebar = {this.state.sidebar}  socket = {socket} userAuth = {this.state.decryptedUserToken}/>
                                )
                        }    
                        />
                    <Route path='/user/chat'  exact strict render ={
                        (props)=>{
                            return(
                                <Chat {...props} sidebar={this.state.childUpdate} socket = {socket} userAuth = {this.state.decryptedUserToken} />
                            )
                          }
                        }    
                        />
                       <Route path ="/user/videos/:name" 
                            exact strict render ={(props)=>{
                              return(
                                <VideoPlayer  {...props} sidebar={this.state.childUpdate}  socket = {socket} userAuth = {this.state.decryptedUserToken} />
                           )
                          }}
                         />
                    <Route path='/user/doubts'  exact strict render ={
                        ()=>{
                            return(
                                <h1>welcome doubts</h1>
                            )
                        }
                    }    
                    />
                    <Route path='/user/test'  exact strict render ={
                        ()=>{
                            return(
                                <h1>welcome test</h1>
                            )
                        }
                    }    
                    />
                    </div>
                </div>
            </div>
                
          </Router>
        )
    }
}
export default Dashboard;