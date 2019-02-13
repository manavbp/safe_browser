import React from 'react';
import { mount, shallow } from 'enzyme';
import AddressBarInput from 'components/AddressBar/Input';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

// Some mocks to negate FFI and native libs we dont care about
jest.mock( 'extensions/safe/ffi/refs/types', () => ( {} ) );
jest.mock( 'extensions/safe/ffi/refs/constructors', () => ( {} ) );
jest.mock( 'extensions/safe/ffi/refs/parsers', () => ( {} ) );

jest.mock( 'ref-array', () => jest.fn() );
//
jest.mock( 'ffi', () => jest.fn() );
jest.mock( 'extensions/safe/ffi/authenticator', () => jest.fn() );

jest.mock( '@maidsafe/safe-node-app', () => jest.fn() );
jest.mock( 'extensions/safe/actions/safeBrowserApplication_actions' );

describe( 'AddressBarInput', () =>
{
    let wrapper;
    let instance;
    let props;
    let store;

    beforeEach( () =>
    {
        props = {
            windowId           : 1,
            address            : 'about:blank',
            isSelected         : false,
            isBookmarked       : false,
            addBookmark        : jest.fn(),
            removeBookmark     : jest.fn(),
            activeTabBackwards : jest.fn(),
            activeTabForwards  : jest.fn(),
            updateActiveTab    : jest.fn(),
            onBlur             : jest.fn(),
            onSelect           : jest.fn(),
            onFocus            : jest.fn(),
            reloadPage         : jest.fn(),
            activeTab          : { isLoading: false }
        };
    } );

    describe( 'constructor( props )', () =>
    {
        beforeEach( () =>
        {
            store = mockStore( props );

            wrapper = shallow(
                <Provider store={ store }>
                    <AddressBarInput { ...props } />
                </Provider>
            ).dive();
            instance = wrapper.instance();
        } );

        it( 'should have name AddressBarInput', () =>
        {
            expect( instance.constructor.name ).toMatch( 'Input' );
        } );
    } );

    describe( 'events', () =>
    {
        beforeEach( () =>
        {
            store = mockStore( props );

            wrapper = mount(
                <Provider store={ store } >
                    <AddressBarInput { ...props } />
                </Provider > );
            instance = wrapper.instance();
        } );

        afterEach( () =>
        {
            wrapper.unmount();
        } );

        it( 'check on onBlur,handleBlur is called', () =>
        {
            const handleBlur = jest.fn();
            wrapper = mount(
                <Provider store={ store } >
                    <AddressBarInput { ...props } onBlur={ handleBlur } />
                </Provider > );
            const input = wrapper.find( 'Input' );
            input.simulate( 'blur' );
            expect( handleBlur ).toHaveBeenCalled();
        } );

        it( 'check on onBlur,onBlur() is called', () =>
        {
            const input = wrapper.find( 'Input' );
            input.simulate( 'blur' );
            expect( props.onBlur ).toHaveBeenCalled();
        } );

        it( 'check on onFocus,handleFocus is called', () =>
        {
            const handleFocus = jest.fn();
            wrapper = mount(
                <Provider store={ store } >
                    <AddressBarInput { ...props } onFocus={ handleFocus } />
                </Provider > );
            instance = wrapper.instance();
            const input = wrapper.find( 'Input' );
            input.simulate( 'focus' );
            expect( handleFocus ).toHaveBeenCalled();
        } );

        it( 'check on onFocus,onFocus() is called', () =>
        {
            wrapper = mount(
                <Provider store={ store } >
                    <AddressBarInput { ...props } />
                </Provider > );
            instance = wrapper.instance();
            const input = wrapper.find( 'Input' );
            input.simulate( 'focus' );
            expect( props.onFocus ).toHaveBeenCalled();
        } );

        it( 'check on onKeyPress if updateActiveTab is called', () =>
        {
            const input = wrapper.find( 'Input' );
            input.simulate( 'keyPress', { key: 'Enter', keyCode: 13, which: 13 } );
            expect( props.updateActiveTab ).toHaveBeenCalled();
        } );

        it( 'check on onKeyPress if updateActiveTab is called with params', () =>
        {
            const input = wrapper.find( 'Input' );
            input.simulate( 'keyPress', { key: 'Enter', keyCode: 13, which: 13 } );
            expect( props.updateActiveTab ).toHaveBeenCalledWith( { url: 'about:blank', windowId: 1 } );
        } );

        it( 'check on onChange, if onSelect() is called', () =>
        {
            const input = wrapper.find( 'Input' );
            input.value = '123456';
            input.simulate( 'change' );
            expect( props.onSelect ).toHaveBeenCalled();
        } );
    } );
} );
