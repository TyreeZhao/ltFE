import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './styles.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.title}>{'FrontEnd HOME'}</div>
        <Link to="/Page1" className={styles.link}>Page1</Link>
        <Link to="/Page2" className={styles.link}>Page2</Link>
      </div>
    );
  }
}

export default connect()(Home);
