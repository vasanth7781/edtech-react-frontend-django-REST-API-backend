import React,{Component} from 'react';

var aesjs = require('aes-js');


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            isLogged:false,

        }};
    componentDidMount (){
        if (localStorage.getItem('userToken') != null){
            this.props.history.push('/')
        }
    }

    changeHandler = e=>{
        this.setState({ [e.target.name]:e.target.value})
    }
    login = e =>{
        fetch(('http://192.168.0.107:8000/api/users/login'),{
            method:'POST',  
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body:JSON.stringify(
                this.state)
            
        })
        .then((response) => response.json()
        )        
        .then((res) => {   
            if((res.token != null) && (res.username === this.state.username) ){
            this.setState({
                isLogged:true   
            })
         }else{
             this.setState({
                 isLogged:false
             })
         }
            this.props.handleSuccesLogin(this.state.isLogged)
            var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

            var text = res.token
            var textBytes = aesjs.utils.utf8.toBytes(text)
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            console.log(encryptedHex);  
            var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
            
            localStorage.setItem('userId',res.id)
            localStorage.setItem('userName',res.username)   
            localStorage.setItem('userToken',encryptedHex)

            if (this.state.isLogged === true){
                this.props.history.push("/",{res})
            }else{
                this.props.history.push("/auth/Login")
            }
        })
        e.preventDefault()
        
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
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                   </form>
                   </div>
                  
              </div>
        )
    }
}
export  default Login;
