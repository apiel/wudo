import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from './component/post/Posts';
import Follow from './component/follow/Follow';
import Followers from './component/follower/Followers';

export const urls = {
	follow: '/follow',
	followers: '/followers',
	home: '/',
}

const UserRoutes = () => (
	<Switch>
		<Route path={urls.follow} component={Follow} />
		<Route path={urls.followers} component={Followers} />
		<Route path={urls.home} component={Posts} />
	</Switch>
);

export default UserRoutes;
