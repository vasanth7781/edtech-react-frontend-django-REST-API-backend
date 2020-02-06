import React,{Component} from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';



class SignUp extends Component{
    constructor(props){
        super(props);
    
    this.state={
        username:'',
        emailaddress:'',
        password:'',
        confirmpassword: ' ',
        not_correct_passwrd:false,

    }};

    changeHandler = e=>{
        console.log(e.target.value)
        this.setState({ [e.target.name]:e.target.value})

    }
    login = e =>{
        e.preventDefault()
        if (this.state.password != this.state.confirmpassword){
            this.setState({
                not_correct_passwrd:true
            })
            alert('Password must be same')
        }else{
            this.setState({
                not_correct_passwrd:false
            })
            fetch(('http://192.168.0.107:8000/api/users/login'),{
            method:'POST',  
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body:JSON.stringify({
                username:this.state.username,
                email:this.state.emailaddress,
                password:this.state.password
            })
                // this.state)
            
        })
        .then((response) => response.json()
        )        
        .then((res) => {     
            console.log(res)
            // this.props.history.push("/user/dashboard",{res})
        })
        }
        
      
    }

    render() {
        // console.log(this.state.not_correct_passwrd)
        const {emailaddress,username ,password,confirmpassword} = this.state
        return (
            <div style={{textAlign:'center',display:'flex',width:"100%",height:"100%",position:'absolute',justifyContent:'center',margin:"0 auto"}} className = "text-center">
            <div style={{alignSelf:'center',width:"30%",height:'auto',margin:'auto'}}>
                <form className="form-signin" onSubmit = {this.login}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="name"  className="form-control" placeholder="Email address" name = "emailaddress" value = {emailaddress} onChange = {this.changeHandler} />
                    <label htmlFor="username" className="sr-only">username</label>
                    <input type="name"  className="form-control" placeholder="Username" name = "username" value = {username} onChange = {this.changeHandler} />
                    <label htmlFor="inputPassword" className="sr-only">Password </label>
                    <input type="password"  className="form-control" placeholder="Password" name = "password" value = {password} onChange = {this.changeHandler} required=""/>
                    <label htmlFor="inputPassword" className="sr-only">Confirm Password </label>
                    <input type="password"  className="form-control" placeholder="Confirm Password" name = "confirmpassword" value = {confirmpassword} onChange = {this.changeHandler} required=""/>
                    <div>
                         {this.state.not_correct_passwrd == true ? <p style={{color:'red'}}> Same password should be entered </p> : null }
                    </div>
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
export  default SignUp;