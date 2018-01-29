import React from 'react'
import ReactDom from 'react-dom'
import {applyRouterMiddleware, browserHistory, Router} from "react-router";
import {useScroll} from "react-router-scroll";
import { NavLayout} from "./routus/layout";

window.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1; //g
window.isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var onRouterChange = function () {
    if (window.isAndroid || (window.isIOS && !window.hasWXConfig)) {
        /*if (wxPaths.find(
                function (re) {
                    return location.pathname.match(re)
                }
            )) {*/
        //}
    }
}

const rootRoute = {
    childRoutes: [{
        component: NavLayout,
        onChange: (arg) => {onRouterChange()},
        childRoutes: [{
    path: '/',
    component: NavLayout,
    indexRoute: {onEnter: (n, replace) => replace(`/home?data=${new Date().getTime()+1}`)},
    childRoutes: [{
    path: '/home',
    component:NavLayout,
}]
}]
}]
};

ReactDom.render((
    <Router history={browserHistory} routes={rootRoute} render={applyRouterMiddleware(useScroll())}/>
), document.getElementById('root'));