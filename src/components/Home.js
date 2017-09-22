import React, { Component } from 'react'
import styles from './styles.scss'

class Home extends Component {
	render() {
		return (
			<div>
				<div className={styles.home}>T.Zhao FE Starter</div>
				<div className={styles.input} data-content="123"></div>
			</div>
		)
	}
}

export default Home;
