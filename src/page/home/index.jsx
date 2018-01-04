'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import PageTitle from '../../component/page-title/index.jsx';

function Home() {
    return (
        <div id="page-wrapper">
            <PageTitle pageTitle="Home" />
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    Welcome
                </div>
            </div>
        </div>
    );
};

export default Home;
