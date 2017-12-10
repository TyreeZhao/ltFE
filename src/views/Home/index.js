import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import styles from './styles.css';

export class Home extends React.Component {
  render() {
    return (
      <div className={styles.view}>
        <div className={styles.title}>{'FrontEnd HOME'}</div>
      </div>
    );
  }
}

export default connect()(Home);
