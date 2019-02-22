// @flow
import { createActions } from 'redux-actions';
import { TYPES } from '@Actions/ui_actions';
import initialAppState from './initialAppState';

const initialState = initialAppState.ui;

const showSettingsMenu = ( state, payload ) =>
{
    const targetWindowId = payload;
    const getCurrentWindowState = state.windows;
    const windowState = [ ...getCurrentWindowState ];
    const found = windowState.find( (obj) => { if( obj.windowId === targetWindowId ) { return obj.windowId }});
    if ( found !== undefined )
    {
        windowState.forEach( (obj) => { if ( obj.windowId === targetWindowId ) { obj.settingsMenuIsVisible = true; } } );
    }
    else
    {
        windowState.push( { windowId: targetWindowId, settingsMenuIsVisible: true } );
    }
    const newState = { ...state, windows: windowState };
    return newState;
};

const hideSettingsMenu = ( state, payload ) =>
{
    const targetWindowId = payload.windowId;
    const getCurrentWindowState = state.windows;
    const windowState = [ ...getCurrentWindowState ];
    windowState.forEach( (obj) => { if( obj.windowId === targetWindowId ) { obj.settingsMenuIsVisible=false }} );
    const newState = { ...state, windows: windowState };
    return newState;
};


export default function ui( state: array = initialState, action )
{
    const { payload } = action;

    switch ( action.type )
    {
        case TYPES.SHOW_SETTINGS_MENU:
        {
            return showSettingsMenu( state, payload );
        }
        case TYPES.HIDE_SETTINGS_MENU:
        {
            return hideSettingsMenu( state, payload );
        }
        case TYPES.SELECT_ADDRESS_BAR:
        {
            return { ...state, addressBarIsSelected: true };
        }
        case TYPES.DESELECT_ADDRESS_BAR:
        {
            return { ...state, addressBarIsSelected: false };
        }
        case TYPES.BLUR_ADDRESS_BAR:
        {
            return { ...state, addressBarIsSelected: false };
        }
        case TYPES.FOCUS_WEBVIEW:
        {
            return { ...state, shouldFocusWebview: payload };
        }

        default:
            return state;
    }
}
