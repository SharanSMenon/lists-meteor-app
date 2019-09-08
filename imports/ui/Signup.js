import React from 'react';
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base';
// import SimpleSchema from 'simpl-schema';
export default class Signup extends React.Component {
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
        if (password.length < 8) {
            return this.setState({error: 'Password must be more than 8 characters long'})
        }
        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                this.setState({ error: err.reason });
            } else {
                this.setState({ error: "" })
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Create An Account</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="email" name="email" placeholder="Email..." ref="email" formNoValidate={true}/>
                        <input type="password" name="password" placeholder="Password" ref="password" />
                        <button className="button button-hover" >Create Account</button>
                    </form>
                    <Link to="/">Already have an account?</Link>
                    </div>
            </div>
        );
    }
}