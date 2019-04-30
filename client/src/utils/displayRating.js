import React from 'react';
import { Label } from 'semantic-ui-react';


/**
 * 
 * @param {number} rating 
 * helper funciton for displaying the rating
 * 
 */
const displayRating = (rating, name) => {
    if (rating >= 80) {
        return (
            <Label tag color="green"> {name}{rating} </Label>
        );
    }
    if (rating >= 70) {
        return (
            <Label tag color="olive"> {name}{rating} </Label>
        );
    }
    if (rating >= 60) {
        return (
            <Label tag color="orange"> {name}{rating} </Label>
        );
    } else {
        return (
            <Label tag color="red"> {name}{rating} </Label>
        );
    }
}


const displayScore = score => {
    let _score = Math.round(score * 100) / 100
    if (_score >= 80) {
        return (
            <Label circular color="green">
                {_score}
            </Label>
        );
    }
    if (_score >= 70) {
        return (
            <Label circular color="olive"> {_score} </Label>
        );
    }
    if (_score >= 60) {
        return (
            <Label circular color="orange"> {_score} </Label>
        );
    } else {
        return (
            <Label circular color="red"> {_score} </Label>
        );
    }
}

export {displayRating, displayScore}