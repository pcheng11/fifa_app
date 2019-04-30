

import axios from "axios";
import {
    RECORD_LOCATION,
} from "./types";

export const setLocation = (crd) => {
    return {
        type: RECORD_LOCATION,
        payload: {
            lng: crd.longitude,
            lat: crd.latitude
        }
    };
};
/**
 * 
 * @param {*} location 
 * add user location
 */
export const recordLocation = (pos) => dispatch => {
    console.log(pos)
    var crd = pos.coords;
    dispatch(setLocation(crd))
};