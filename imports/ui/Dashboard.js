import React from 'react';
import { Link } from "react-router"
import PrivateHeader from './PrivateHeader'
import DashboardList from './DashboardList';
import AddList from './AddList';
export default () => (
    <div>
        <PrivateHeader title="Lists" />
        <div className="page-header">
            <div className="page-content">
                <h1 className="page-header__title">Dashboard</h1>
            </div>
        </div>
        <AddList />
        <DashboardList />
    </div>
)