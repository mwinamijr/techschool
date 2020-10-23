import React from 'react';
import { Route } from "react-router-dom";

import Home from './containers/HomePage';
import PostList from './containers/PostList';
import PostDeatil from './containers/PostDetails';

const BaseRouter = () => {
	return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/posts/" component={PostList} />
				<Route exact path="/posts/:id/" component={PostDeatil} />
			</div>
		)
}

export default BaseRouter;