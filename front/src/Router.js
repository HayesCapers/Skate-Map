import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Map from './Map';
import Spot from './components/Spot';
import CreateSpot from './components/CreateSpot';
import Camera from './components/Camera';


class AppRouter extends Component {
	render() {
		return(
			<Router>

				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title='Login' hideNavBar />
					<Scene key='register' component={RegisterForm} title='Register' hideNavBar />
				</Scene>

				<Scene key='main'>
					<Scene key='map' component={Map} title='Map' hideNavBar />
					<Scene key='spot' component={Spot} title='spot' hideNavBar />
					<Scene key='spotForm' component={CreateSpot} title='Create New Spot' hideNavBar />
					<Scene key='camera' component={Camera} title='camera' hideNavBar />
				</Scene>

			</Router>
		)
	}
}



export default AppRouter;