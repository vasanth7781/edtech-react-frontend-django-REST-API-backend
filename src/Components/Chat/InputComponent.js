import React from 'react';


class InputComponent extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            sentMessage:' ',
        })
        this.changeHandler = this.changeHandler.bind(this)
        this.send = this.send.bind(this)

    }
    changeHandler (e){
        this.setState({ [e.target.name]:e.target.value})
    }

  send = e=>{
      e.preventDefault()
      this.setState({
          sentMessage:''
      });
      this.props.sendMessage(this.state.sentMessage)
  }
    render(){
        return(
            <div>
                 <form onSubmit={this.send} >
                    <input name="sentMessage" style={{width:"100%"}} type= "text" value={this.state.sentMessage}  onChange = {(e)=>this.changeHandler(e)} placeholder ="Enter your message"   />
                    <button className = "btn btn-lg btn-primary btn-block" type="submit">
                        send
                    </button>
                </form>
            </div>

        )
    }
}
export default InputComponent;  
