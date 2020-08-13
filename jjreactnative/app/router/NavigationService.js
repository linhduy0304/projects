import {ObjectUtil} from '../utils/object-utils';

let _navigator;

function getRoute(route) {
    try {
        if (!route.routes || route.routes.length < 1) return route;

        let latestRoute = route.routes[route.routes.length - 1];
        return getRoute(latestRoute);
    }
    catch (e) {
        console.debug(e);
    }
    return undefined();
}

function getRouteWithParams(routes, routeName, params) {
    try {
        if (!route.routes || route.routes.length < 1) return route;

        let latestRoute = route.routes[route.routes.length - 1];
        return getRoute(latestRoute);
    }
    catch (e) {
        console.debug(e);
    }
    return undefined();
}

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function getNavigator() {
    return _navigator;
}

function getCurrentRoute() {
    try {
        if (!_navigator) return;

        const routes = ObjectUtil.getValue(_navigator, [], ['state', 'nav', 'routes']);
        if (routes.length > 0) {
            let latestRoute = routes[routes.length - 1];
            if (!latestRoute) return undefined;

            if (!!latestRoute.routes) latestRoute = getRoute(latestRoute);

            return latestRoute;
        }
    }
    catch (e) {
        console.debug(e);
    }
    return undefined;
}

function findRoute(routeName, params) {
    try {
        if (!_navigator) return;

        const routes = ObjectUtil.getValue(_navigator, [], ['state', 'nav', 'routes']);
        const result = [];
        if (!routes || routes.length < 1) return result;
        const keys = !!params ? Object.keys(params) : undefined;

        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            try {
                if (route.routeName && route.routeName.toLowerCase().indexOf(routeName.toLowerCase()) >= 0) {

                    route.isLast = i >= routes.length - 1;

                    if (!keys)
                    {
                        result.push(route);
                    }
                    else
                    {
                        const routeParams = route.params;
                        if (!!routeParams) {

                            let found = true;
                            for (let k of keys) {
                                if (routeParams[k] !== params[k]) {
                                    found = false;
                                    break;
                                }
                            }

                            if (!!found) {
                                result.push(route);
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.debug(e);
            }
        }

        return result;
    }
    catch (e) {
        console.debug(e);
    }
    return [];
}

export default {
    setTopLevelNavigator,
    getNavigator,
    getCurrentRoute,
    findRoute
};