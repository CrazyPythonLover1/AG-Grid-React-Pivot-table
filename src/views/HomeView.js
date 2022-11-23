import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomeView = () => {
    return (
        <div className='content' >
            {/* <Link to='/form' style={{ fontSize: '20px', display: 'flex', padding: 16, color: 'blue'}}> Form </Link>
            <Link to='/pivot-table' style={{ fontSize: '20px', display: 'flex', padding: 16, color: 'blue'}}> Pivot Table </Link> */}
            <Link to='/ag-grid-pivot-table' style={{ fontSize: '20px', display: 'flex', padding: 16, color: 'blue'}}> AG Grid Pivot Table </Link>
        </div>
    )
}

export default HomeView;