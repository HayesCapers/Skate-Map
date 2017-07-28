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
			<Router sceneStyle={{ paddingTop: 65 }}>

				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title='Login' />
					<Scene key='register' component={RegisterForm} title='Register' />
				</Scene>

				<Scene key='main'>
					<Scene key='map' component={Map} title='Map' />
					<Scene key='spot' component={Spot} title='spot' />
					<Scene key='spotForm' component={CreateSpot} title='Create New Spot' />
					<Scene key='camera' component={Camera} title='camera' />
				</Scene>

			</Router>
		)
	}
}



export default AppRouter;