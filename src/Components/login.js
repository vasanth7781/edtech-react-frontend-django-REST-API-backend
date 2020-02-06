import React,{Component} from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import {BrowserRouter as Router,Link,Redirect} from 'react-router-dom';
// import Route from 'react-router-dom/Route';
import CSRFTOKEN from '../CsrfToken'

var aesjs = require('aes-js');


class Login extends Component{
    constructor(props){
        super(props);
        // this.props.history.goBack("/user/dashbard")

    
    this.state={
        username:'',
        password:'',
        isLogged:false,
        csrf_token:'',

    }};
    componentDidMount (){
        if (localStorage.getItem('userToken') != null){
            this.props.history.push('/')
        }
        this.getCookie()
    }
    getCookie(name) {
        if (!document.cookie) {
          return null;
        }
        const token = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
    
        if (token.length === 0) {
          return null;
        }
        return decodeURIComponent(token[0].split('=')[1]);
        
      }

    changeHandler = e=>{
        this.setState({ [e.target.name]:e.target.value})
    }
    login = e =>{
        const csrftoken = this.getCookie('csrftoken')
        console.log(document)
        
        // console.log(csrftoken)
        this.setState({
            csrf_token: csrftoken
        })
        e.preventDefault()
        // console.log(e)
        fetch(('http://192.168.0.107:8000/api/users/login'),{
            method:'POST',  
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'X-CSRFTOKEN': csrftoken,
            },
            // credentials: 'include',
            body:JSON.stringify(
                this.state)
            
        })
        .then((response) => response.json()
        )        
        .then((res) => {   
            if((res.token != null) && (res.username === this.state.username) ){
                // console.log(this.state.username)
            this.setState({
                isLogged:true   
            })
         }else{
             this.setState({
                 isLogged:false
             })
         }
            // console.log(this.state.isLogged)
            this.props.handleSuccesLogin(this.state.isLogged)
            var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

            var text = res.token
            var textBytes = aesjs.utils.utf8.toBytes(text)
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            console.log(encryptedHex);  
            // console.log(res.token)
            var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

            // The counter mode of operation maintains internal state, so to
            // decrypt a new instance must be instantiated.
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var decryptedBytes = aesCtr.decrypt(encryptedBytes);

            // Convert our bytes back into text
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            console.log(decryptedText);
            
            localStorage.setItem('userId',res.id)
            localStorage.setItem('userName',res.username)   
            localStorage.setItem('userToken',encryptedHex)

            if (this.state.isLogged === true){
                this.props.history.push("/",{res})
            }else{
                this.props.history.push("/auth/Login")
            }
            this.props.handleSuccesLogin(true)
            // window.location.href="/user/dashboard"
            // this.props.history.goBack("/user/dashboard")
        })
        
    }

    render() {
        const {username ,password} = this.state
        return (
            <div style={{textAlign:'center',display:'flex',width:"100%",height:"100%",position:'absolute',justifyContent:'center',margin:"0 auto"}} className = "text-center">
                {/* <h1>{this.props.loggedInStatus}</h1> */}
                <div style={{alignSelf:'center',width:"30%",height:'auto',margin:'auto'}}>
                    <form className="form-signin" onSubmit = {this.login}>
                        <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="name"  className="form-control" placeholder="Email address" name = "username" value = {username} onChange = {this.changeHandler} />
                        <label htmlFor="inputPassword" className="sr-only">Password </label>
                        <input type="password"  className="form-control" placeholder="Password" name = "password" value = {password} onChange = {this.changeHandler} required=""/>
                      <CSRFTOKEN/>
                        <div className="checkbox mb-3">
                            <label>
                             <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        {/* <Link to ="/user/dashboard" > */}
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        {/* </Link> */}
                        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                   </form>
                   </div>
                  
              </div>
        )
    }
}
export  default Login;