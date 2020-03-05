import React,{Component} from 'react';
import {BrowserRouter as Router,Link,Redirect,Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Login from './login';
import SignUp from './SignUp';
import Dashoard from './DashBoard/Dashboard'
import NotFoundPage from './NotFound';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';




class NavBar extends Component{
    constructor(props){
        super(props)
        this.state=({
            isLogged:false,   
            navbarShadow:' ' ,
            mobView: false
        })
        this.handleSuccesLogin = this.handleSuccesLogin.bind(this)
        this.handleAlreadyLogged = this.handleAlreadyLogged.bind(this)
        this.Logout = this.Logout.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        if (localStorage.getItem('userToken') != null){
        this.handleSuccesLogin(true)
        }else{
        this.handleSuccesLogin(false)
        }
        window.addEventListener('scroll',this.handleScroll)
        window.addEventListener('resize',this.handleScreenSize.bind(this))
        this.handleScreenSIze()
    }
    handleScreenSize(){
        if(window.innerWidth < 790){
            this.setState({
                mobView:true
            })
        }else{
            this.setState({
                mobView:false
            })
        }
    }

    handleScroll(event){
        if (window.pageYOffset > 30){
            this.setState({
                navbarShadow : 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.29) 0px 6px 20px 0px'
            })
        }
        else{
            this.setState({
                navbarShadow:''
            })
        }
    }
    
     
    handleSuccesLogin(data ){
     if( localStorage.getItem('userToken') != null){
        this.setState({
            isLogged:data
        })
     }
    }
    handleAlreadyLogged(data){
        this.setState({
            isLogged:data
        })

    }
    Logout(){
        localStorage.clear()
        this.setState({
            isLogged:false
        })
    }
    render() {
        return (
  <Router>

    <Switch>
    <Route path='/'  exact strict render ={
                        ()=>{
                            if(localStorage.getItem("userToken") != null){
                                return (
                                    <Redirect to = '/user/dashboard' />
                                )
                            }else{
                            return(
                               
                                <div></div>
                            )
                            }
                        }
                    }    
                    />
    <Route path = '/terms-conditions/' exact strict render={
        ()=>{
            return(
                <div style={{paddingTop:160}}>
                <h1>Terms & conditions are to be listed </h1>
                </div>
            )
        }
    } />
    <Route path='/pricing/' exact strict render ={
                        ()=>{
                            return(
                                <h1>Pricing</h1>
                            )
                        }
                    }    
                    />
    <Route path='/login/' exact strict render ={
                        props=>(  <Login {...props} handleSuccesLogin = {this.handleSuccesLogin}  />)
                        
                    }    
                    />

    {this.state.isLogged == true?
     <Route path='/user/'  render ={
                        props=>(
                               <Dashoard {...props} handleSuccesLogin ={this.handleAlreadyLogged}/>
                            )
                    }    
                    /> 
                     :
                     null
                } 
    <Route path='/auth/signup' exact strict render ={
                        props=>(  <SignUp {...props}  />)
                    }    
                    />     
    <Route path='/aboutus/' exact strict render = {
        (props)=>{
            return(
                <div>
                    <h1>hiii</h1>
                </div>
            )
        }
    }
    />
    <Route path = '*' exact strict render ={
        (props)=>(<NotFoundPage {...props}/>)
    }
    />  
    </Switch>
    </Router>
        );
    }
}
export default NavBar;
