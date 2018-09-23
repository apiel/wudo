import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from './component/post/Posts';
import Follow from './component/follow/Follow';
import Follower from './component/follower/Follower';

export const urls = {
	follow: '/follow',
	follower: '/follower',
	home: '/',
}

const UserRoutes = () => (
	<Switch>
		<Route path={urls.follow} component={Follow} />
		<Route path={urls.follower} component={Follower} />
		<Route path={urls.home} component={Posts} />
	</Switch>
);

export default UserRoutes;
