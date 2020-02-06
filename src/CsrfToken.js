import React from 'react';


class CSRFTOKEN extends React.Component{

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
    render(){
        var csrftoken = this.getCookie('csrftoken');
        return(
            <input type='hidden' name = "csrfmiddlewaretoken" value ={csrftoken} />
        )
    }

}
export default CSRFTOKEN;