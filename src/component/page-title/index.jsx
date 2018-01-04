'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class PageTitle extends React.Component{
    componentDidMount(){
        document.title = this.props.pageTitle || 'xuanhuan Admin'
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">{this.props.pageTitle}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default PageTitle;