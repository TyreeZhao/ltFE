import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

export class Page1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.title}>Page1</div>
      </div>
    );
  }
}

export default connect()(Page1);
