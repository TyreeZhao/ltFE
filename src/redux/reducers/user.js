import {Map} from 'immutable';
import {} from 'actions';

const initialState = Map({
    username: '',
});

export default function user(state = initialState, action) {

    switch (action.type) {
        default: {
            return state;
        }
    }
}
