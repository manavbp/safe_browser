import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import PropTypes from 'prop-types';


export default class Root extends Component
{
    static propTypes =
    {
        store          : PropTypes.object,
        history        : PropTypes.object,
    }
    render()
    {
        return (
            <Provider store={ this.props.store }>
                <ConnectedRouter history={ this.props.history } >
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}
