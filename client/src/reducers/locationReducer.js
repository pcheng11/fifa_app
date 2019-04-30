
import { RECORD_LOCATION } from "../actions/types";

const initialState = {
    lat: null,
    lng: null
};

/**
 * Reducer for the redux
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case RECORD_LOCATION:
            console.log(action.payload.lat)
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng
            };
        default:
            return state;
    }
}