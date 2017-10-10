import React, {Component} from 'react';
import {connect} from 'react-redux';

import {} from '../../components';

import styles from './styles.css';

class Page1 extends Component {

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
