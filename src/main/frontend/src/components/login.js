import React, {Component} from "react";

export default class Login extends Component {
    componentDidMount(){
        // setTimeout(function() { //Start the timer
        //     this.setState({render: true}) //After 1 second, set render to true
        // }.bind(this), 5000)
        window.location.href = "https://sso.ui.ac.id/cas2/login";
    }

    render() {
        return (
            ""
        )
    }
}