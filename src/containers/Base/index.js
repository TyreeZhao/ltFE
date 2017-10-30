import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

export class Base extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    fetching: PropTypes.bool,
  }

  render() {
    return (
      <div className={styles.view}>
        Base
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Base);
