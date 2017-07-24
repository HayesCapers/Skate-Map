// import React, { Component } from 'react';
// import Map from './Map';
// import { Router, Scene } from 'react-native-router-flux';

// class App extends Component {

// 	render() {
// 		return(

// 		)
// 	}	
// }

// export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';



class App extends Component {

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

		return(
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}

}

export default App;