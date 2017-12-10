import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import '../styles/core.scss'
import styles from './styles.css';

export class CoreLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    fetching: PropTypes.bool,
  }

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.conten}>
          {this.props.children}
        </div>
        <div className={styles.navi}>

          <Link to={"/shoplist"} className={styles.link} activeClassName={styles.isActive}>
            <div className={styles.text}>shoplist</div>
          </Link>

          <Link to={"/home"} className={styles.link} activeClassName={styles.isActive}>
            <div className={styles.text}>我</div>
          </Link>

        </div>
      </div>
    )
  }
}

export default connect()(CoreLayout);
