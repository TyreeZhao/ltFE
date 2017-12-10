import React from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';

export class ShopList extends React.Component {

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.title}>
          {'shop list'}
        </div>
      </div>
    );
  }
}

export default connect()(ShopList);
