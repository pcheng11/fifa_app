import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { useAlert } from "react-alert";

const Alert = () => {
    const alert = useAlert()
    console.log("alert")
    alert.show('Oh look, an alert!')
}

export default Alert