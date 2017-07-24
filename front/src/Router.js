import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Map from './Map'


class AppRouter extends Component {
	render() {
		return(
			<Router sceneStyle={{ paddingTop: 65 }}>

				<Scene key='main'>
					<Scene key='map' component={Map} title='Map' />
				</Scene>

				<Scene key='auth'>
					<Scene key='login' component={LoginForm} title='Login' />
					<Scene key='register' component={RegisterForm} title='Register' />
				</Scene>

			</Router>
		)
	}
}

export default AppRouter