// import React from 'react';
import Sidebar from '../Dashboard/Sidebar Section/Sidebar'
import Body from '../Dashboard/Body Section/Body'
const Dashboard = () => {
    return (
        <div className='dashboard flex'>
            <div className="dashboardContainer flex">
                <Sidebar/>
                Dashboard
                <Body/>
            </div>
        </div>
    );
};

export default Dashboard;