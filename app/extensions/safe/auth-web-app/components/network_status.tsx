import * as React from "react";
import classNames from 'classnames';
import CONSTANTS from '../constants';

type propTypes = {
    status : number;
};

export default class NetworkStatus extends React.Component<propTypes>
{
    render()
    {
        let message = null;
        switch ( this.props.status )
        {
            case CONSTANTS.NETWORK_STATUS.CONNECTED: {
                message = 'Connected';
                break;
            }
            case CONSTANTS.NETWORK_STATUS.DISCONNECTED: {
                message = 'Terminated';
                break;
            }
            case CONSTANTS.NETWORK_STATUS.CONNECTING: {
                message = 'Connecting';
                break;
            }
            default: {
                message = '';
                break;
            }
        }
        return (
            <div className="nw-status">
                <span
                    className={ classNames( 'nw-status-i', {
                        connecting :
                            this.props.status
                            === CONSTANTS.NETWORK_STATUS.CONNECTING,
                        terminated :
                            this.props.status
                            === CONSTANTS.NETWORK_STATUS.DISCONNECTED,
                        connected :
                            this.props.status
                            === CONSTANTS.NETWORK_STATUS.CONNECTED
                    } ) }
                >
                    {' '}
                </span>
                <span className="nw-status-tooltip">{message}</span>
            </div>
        );
    }
}