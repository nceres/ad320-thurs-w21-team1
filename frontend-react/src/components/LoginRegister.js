import React, {Component} from 'react';
import fire from '../config/Fire';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '',
            formTitle: 'Login',
            loginBtn: true
        }
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    register = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    getAction = action => {
        if(action === 'reg'){
            this.setState({formTitle: 'Register New User', loginBtn: false, fireErrors: ''});
        }else{
            this.setState({formTitle: 'Login', loginBtn: true, fireErrors: ''});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;

        let submitBtn = this.state.loginBtn ? 
            (<input className="loginBtn userInput" type="submit" onClick={this.login} value="Login" />) : 
            (<input className="loginBtn userInput" type="submit" onClick={this.register} value="Register" />);

        let login_register = this.state.loginBtn ?
            (<button className="registerBtn" onClick={() => this.getAction('reg')}>Register</button>) : 
            (<button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>)

        return(
            <div className="login_form">
                <div id="title">{this.state.formTitle}</div>
                <div className="body">
                    {errorNotification}
                    <form>
                        <lable>
                            Email: 
                        <input type="text" className="userInput"
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        name="email" /><br></br>
                        </lable>
                        <lable>
                            Password: 
                        <input type="password" className="userInput"
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        name="password" /><br></br>
                        </lable>
                        {submitBtn}
                    </form>
                    {login_register}
                </div>
            </div>
        )
    }
}

export default Login;