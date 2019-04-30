import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
    Icon,
    Button,
} from 'semantic-ui-react';
import axios from 'axios';
/**
 * The is a helper component for the favorited button of each player
 */
class CheckFavTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = { followed: null, followedText: "", fav_teams: [] };
    }


    async componentWillMount() {
        const team_response = await axios.get("/api/user/fav_teams", {
            params: {
                user_id: this.props.auth.user.id
            }
        });
        this.setState({
            fav_teams: team_response.data.data.map(team => { return team.team_id })
        });
        if (this.state.fav_teams.includes(this.props.team_id)) {
            this.setState({
                followed: true,
            });
        } else {
            this.setState({
                followed: false,
            });
        }
    }

    /**
     * Change button based on user input
     */
    favUnfavTeam = async (followed, team_id) => {
        if (followed === false) {
            this.setState({ followed: true });
            axios.post("/api/user/fav_teams", {
                team_id: team_id,
                user_id: this.props.auth.user.id
            })

        } else {
            this.setState({
                followed: false
            });
            axios.delete("/api/user/fav_teams", {
                params: {
                    team_id: team_id,
                    user_id: this.props.auth.user.id
                }
            });
        }
    }

    render() {
        const { followed } = this.state;
        if (followed === true) {
            return (
                <Button
                    color='blue'
                    onClick={() => this.favUnfavTeam(this.state.followed, this.props.team_id)}>
                    <Icon name='star' />
                    Unfavorite
                </Button>
            );
        } else if (followed === false) {
            return (
                <Button
                    color='yellow'
                    onClick={() => this.favUnfavTeam(this.state.followed, this.props.team_id)}>
                    <Icon name='star' />
                    Favorite
            </Button>
            );
        } else {
            return null;
        }
    }


}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(CheckFavTeam);
