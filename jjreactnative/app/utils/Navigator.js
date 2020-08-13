import {NavigationActions} from 'react-navigation';
import type {NavigationParams, NavigationRoute} from 'react-navigation';

let _container;

function setContainer(container: Object) {
    _container = container;
}

function reset(routeName: string, params?: NavigationParams) {
    _container.dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    type: 'Navigation/NAVIGATE',
                    routeName,
                    params,
                }),
            ],
        }),
    );
}

function navigate(routeName: string, params?: NavigationParams) {
    _container.dispatch(
        NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
        }),
    );
}

function navigateDeep(actions: { routeName: string, params?: NavigationParams }[]) {
    _container.dispatch(
        actions.reduceRight(
            (prevAction, action): any =>
                NavigationActions.navigate({
                    type: 'Navigation/NAVIGATE',
                    routeName: action.routeName,
                    params: action.params,
                    action: prevAction,
                }),
            undefined,
        ),
    );
}

function getCurrentRoute(): NavigationRoute | null {
    if (!_container || !_container.state.nav) {
        return null;
    }

    return _container.state.nav.routes[_container.state.nav.index] || null;
}

function getRoutes() {
    if (!_container || !_container.state.nav) {
        return null;
    }
    return _container.state.nav.routes;
}

export default {
    setContainer,
    navigateDeep,
    navigate,
    reset,
    getCurrentRoute,
    getRoutes
};