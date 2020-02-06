import React,{Component} from 'react';
import {BrowserRouter as Router,Link,Redirect,Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';



class NotFoundPage extends React.Component{
    render(){
        return(
            <div style={{paddingTop:75,display:"flex",flexFlow:"column",alignItems:"center",paddingBottom:30}}>
                <div>
                    <h1 className='h1-404'>Oops!</h1>
                </div>
                <div style={{fontSize:"2rem",color:"#fd9313"}}>
                    404 Page Not found
                </div>
                <div style={{fontSize:'1.25rem'}}>
                    Sorry but the page you are looking for might have been removed  had its name changed or its temporarlily unavailiable
                </div>
                <div style={{background:"#30a0ad",padding:15,fontSize:"1.5rem",color:"white",borderRadius:50 }}>
                    <a style={{color:'white'}} href ='/' >Go to Homepage </a> 
                </div>
                

            </div>
        )
    }
}
export default NotFoundPage;