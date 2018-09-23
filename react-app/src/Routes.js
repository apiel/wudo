import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from './component/post/Posts';
import Follow from './component/follow/Follow';
import Follower from './component/follower/Follower';

const UserRoutes = () => (
	<Switch>
		<Route path="/follow" component={Follow} />
		<Route path="/follower" component={Follower} />
		<Route path="/" component={Posts} />
	</Switch>
);

export default UserRoutes;
