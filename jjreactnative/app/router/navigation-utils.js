
import {REPLACE_WITH} from './navigation-actions';

export const NavigationUtils = {
    replaceWith(navigation, replaceIndex, routeName, params) {
        if (!navigation) return;
        navigation.dispatch({
            type: REPLACE_WITH,
            replaceIndex,
            routeName,
            params
        })
    }
}