import React, {Component} from 'react';
import {connect} from 'react-redux';

import {} from '../../components';

import styles from './styles.css';

class Page2 extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.view}>
                <div className={styles.title}>Page2</div>
            </div>
        );
    }
}

export default connect()(Page2);
