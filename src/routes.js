import React from 'react';
import { Route } from "react-router-dom";

import Home from './containers/HomePage';
import PostList from './containers/PostList';

const BaseRouter = () => {
	return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/posts/" component={PostList} />
			</div>
		)
}

export default BaseRouter;