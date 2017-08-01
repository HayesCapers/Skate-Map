import React from 'react';
import { View, Image } from 'react-native';

const Logo = (props) => {
	return(
		<View style={styles.container}>
			<Image
				style={styles.logo}
				resizeMode="contain"
				source={require('../assets/images/skate-map-logo-gold.png')}
			/>
		</View>
	)
}

const styles = {
	logo: {
		alignSelf: 'center',
		height: 200,
		width: 350,
	},
	container: {
		marginBottom: 50
	}
}

export default Logo;