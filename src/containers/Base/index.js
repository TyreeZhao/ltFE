import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import styles from './styles.css';

class Base extends PureComponent {

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
    global: state.get('global'),
});

export default connect(mapStateToProps)(Base);
