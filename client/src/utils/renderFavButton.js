import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
    Icon,
    Button,
    Transition
} from 'semantic-ui-react';
import axios from 'axios';

/**
 * The is a helper component for the favorited button of each player
 */
class CheckFollow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { followed: null, followedText: "", fav_players: [], animation: "jiggle", duration: 1000, visible: true };

    }


    async componentWillMount() {
        const player_response = await axios.get("/api/user/fav_players", {
            params: {
                user_id: this.props.auth.user.id
            }
        });
       
        this.setState({
            fav_players: player_response.data.data.map(player => {return player.player_id})
        });
        if (this.state.fav_players.includes(this.props.player_id) ) {
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
    favUnfavPlayer = async (followed, player_id) => {
        await this.toggleVisibility();

        if (followed === false) {
            this.setState({ followed: true });
            axios.post("/api/user/fav_players", {
                player_id: player_id,
                user_id: this.props.auth.user.id
            })

        } else {
            this.setState({
                followed: false
            });
            axios.delete("/api/user/fav_players", {
                params: {
                    player_id: player_id,
                    user_id: this.props.auth.user.id
                }
            });
        }
    }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { animation, duration, visible, followed } = this.state

        if (followed === true) {
            return (
                <Transition animation={animation} duration={duration} visible={visible}>
                    <Button 
                        color='blue'
                        onClick={() => this.favUnfavPlayer(this.state.followed, this.props.player_id)}>
                        <Icon name='star' />
                        Unfavorite
                    </Button>
                </Transition>
                
            );
        } else if (followed === false) {
            return (
                <Transition animation={animation} duration={duration} visible={visible}>
                    <Button 
                        color='yellow'
                        onClick={() => this.favUnfavPlayer(this.state.followed, this.props.player_id)}>
                        <Icon name='star' />
                        Favorite
                    </Button>
                </Transition>
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
)(CheckFollow);
