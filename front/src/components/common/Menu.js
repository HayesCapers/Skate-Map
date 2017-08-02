import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Drawer from 'react-native-drawer';
import Map from '../../Map';
import { Hamburger, DrawerContents } from './';

class Menu extends Component {  
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
		this.toggleDrawer = this.toggleDrawer.bind(this)
		this.resetState = this.resetState.bind(this)
	}
  
	toggleDrawer(isOpen) {
		this.setState({
			isOpen: !isOpen
		})
	}

	resetState() {
		this.setState({
			isOpen: false
		})
	}

  render () {

  	console.log(this.state.isOpen)
    return (
	  	<Drawer
	  		open={this.state.isOpen}
			content={<DrawerContents />}
			tapToClose={true}
			onClose={() => this.resetState()}
			openDrawerOffset={0.2} // 20% gap on the right side of drawer
			panCloseMask={0.2}
			closedDrawerOffset={-3}
			styles={drawerStyles}
			tweenHandler={(ratio) => ({
			main: { opacity:(2-ratio)/2 }
			})}
	    >
       		<Map />
       		<Hamburger onPress={() => this.toggleDrawer(this.state.isOpen)} />
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export { Menu }
