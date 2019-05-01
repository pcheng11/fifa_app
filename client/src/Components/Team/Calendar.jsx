import React from 'react';
import { Button, Label, Modal } from 'semantic-ui-react';
import { CLIENT_ID } from './secret';
import './Team.scss';
import axios from "axios";
import { connect } from "react-redux";

var SCOPES = 'https://www.googleapis.com/auth/calendar.events'
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];



class Calendar extends React.Component {
    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
     state = { added: false, open: false, link: "", matches: [], date: this.props.date, match: this.props.match };
    
    async componentWillMount() {

        if (this.props.userMatches.includes(this.props.match)) {
            this.setState({
                added: true,
            });
        } else {
            this.setState({
                added: false,
            });
        }
    }

     updateSigninStatus = (isSignedIn, game, time) => {

        if (isSignedIn) {
            if (time) {
                this._addEvent(game, time);
                alert("Matched Added!")
            }
        } else {
            window.gapi.auth2.getAuthInstance().signIn();
        }
    }


    _addEvent = (game, time) => {
        var d1 = new Date(time);
        var d2 = new Date(d1);
        console.log(time)
        d2.setMinutes(d2.getMinutes() + 90);
        var event = {
            'summary': "Soccer Match: " + game,
            'description': "",
            'start': {
                'dateTime': d1,
            },
            'end': {
                'dateTime': d2,
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 },
                ],
            },
        };

        var request = window.gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
        request.execute( event => {
            axios.post("/api/match/user/" + this.props.auth.user.id, {
                    match: game
                }
            ).then(
                this.setState({ added: true, link: event.htmlLink, open: true })
            )
        });
    }

    addEvent = (game, time) => {
        console.log(time)
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: "AIzaSyBlkPdBVduGBwtOUWRH7llSTvHZaZZZsb8",
                discoveryDocs: DISCOVERY_DOCS,
                clientId: CLIENT_ID,
                scope: SCOPES
            }).then(() => {
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
                this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get(), game, time);
            }, (error) => {
                console.log(error)
            });
        });
    }
    
    handleClose = () => this.setState({ open: false })


    render() {
        const { added, open, link, date, match } = this.state;
        console.log(date)
        if (added) {
               return <Label> Added </Label>
        }
        return (
            <Button
                color='blue'
                onClick={() => this.addEvent(match, date)}>
                Add Game
            </Button>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Calendar);