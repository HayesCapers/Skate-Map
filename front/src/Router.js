import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Map from './Map';
import Spot from './components/Spot';
import CreateSpot from './components/CreateSpot';
import Camera from './components/Camera';
import UserProfile from './components/UserProfile';
import MapSettings from './components/MapSettings';
import Reviews from './components/Review';
import { Menu } from './components/common';


class AppRouter extends Component {
	render() {
		return(
			<Router>

				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title='Login' hideNavBar />
					<Scene key='register' component={RegisterForm} title='Register' hideNavBar />
				</Scene>

				<Scene key='main'>
					<Scene key='map' component={Menu} title='Map' hideNavBar />
					<Scene key='user' component={UserProfile} hideNavBar />
					<Scene key='mapSettings' component={MapSettings} hideNavBar />
					<Scene key='spot' component={Spot} title='spot' hideNavBar />
					<Scene key='reviews' component={Reviews} hideNavBar />
					<Scene key='spotForm' component={CreateSpot} title='Create New Spot' hideNavBar />
					<Scene key='camera' component={Camera} title='camera' hideNavBar />
				</Scene>

			</Router>
		)
	}
}



export default AppRouter;