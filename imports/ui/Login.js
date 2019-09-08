import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({ error: "Unable to login. Please check your credentials" })
            } else {
                this.setState({ error: "" })
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Lists</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <div className="input-container">
                            <input type="email" name="email" placeholder="Email..." ref="email" formNoValidate className="login-input" />
                            <i className="icon"><FontAwesomeIcon icon={'envelope'} /></i>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" placeholder="Password" ref="password" className="login-input" />
                            <i className="icon"><FontAwesomeIcon icon={'key'} /></i>
                        </div>
                        <button className="button button-hover">Login</button>
                    </form>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}