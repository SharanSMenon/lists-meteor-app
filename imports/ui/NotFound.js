import React from 'react';
import { Link } from 'react-router'
export default () => (
    <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>404</h1>
            <p>We are unable to find this page</p>
            <br />
            <Link to="/" className="button button-hover button--link">Head Home</Link>
        </div>
    </div>
)