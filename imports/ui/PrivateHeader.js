import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types'
import { Link } from "react-router"
import { browserHistory } from 'react-router'
const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <Link to="/dashboard" className="header--title"><h1>{props.title}</h1></Link>
                <button onClick={() => {
                    Accounts.logout()
                    // history.push('/signup')
                    browserHistory.replace('/')
                }} className="button button--header">Logout</button>
            </div>
        </div>
    )
}
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}
export default PrivateHeader;

