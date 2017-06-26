import {fromJS} from 'immutable';
import {SHOW_DIALOG,CLOSE_DIALOG} from 'constants/global';
const initialState = fromJS({
    dialog: fromJS({
        showDialog: false,
        components : ''
    })
});

function globalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_DIALOG :
            return state.updateIn(['dialog'] , (dialog)=> {
                return dialog.merge({
                    showDialog : true,
                    components : action.components
                })
            });

        default:
            return state;
    }
}

export default globalReducer;