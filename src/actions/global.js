import {SHOW_DIALOG,CLOSE_DIALOG} from 'constants/global';

export function closeDialog() {
    return {
        type: CLOSE_DIALOG
    };
}
export function showDialog(components) {
    return {
        type: SHOW_DIALOG,
        components
    };
}