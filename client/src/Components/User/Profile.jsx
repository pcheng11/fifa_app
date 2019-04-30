import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, 
        Label, 
        List,
        Divider, 
        Image, 
        Flag, 
        Form,
        Input,
        Icon, 
        Segment, 
        Transition,
        Message,
        Menu, 
        Grid, 
        Button, 
        Header,
        Rating,
        Embed,
        Loader,
        Dimmer,
        Modal,
        Tab } from 'semantic-ui-react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import {
    SET_CURRENT_USER,
} from "../../actions/types";

import { api_url } from "../../api.js";
import DisplayPentagon from "../../utils/displayPentagon";
import NavbarHeader from '../Navbar/Navbar.js';
import {displayRating, displayScore } from '../../utils/displayRating';
import './Profile.scss';
import News from '../News/News.jsx';
import UploadAvatar from './UploadAvatar.jsx';
import CheckFavTeam from '../../utils/renderFavTeamButton';
import ProfileNews from '../News/ProfileNews.jsx';
import { updateUser } from '../../actions/authActions.js'
import FavPlayers from './FavPlayers.jsx'

/**
 * create profile component
 */

class Profile extends React.Component {
    
    state = { user: [], player_names: [], team_names: [], update_username: "", players: [], avatar: "" }
    /**
     * query the api end point
     */ 
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    async componentDidMount() {
        const response = await axios.get("api/user/" + this.props.auth.user.id);
        var base64Flag = 'data:image/jpeg;base64,';
        if (response.data.data.image) {
            var imageStr = this.arrayBufferToBase64(response.data.data.image.data.data);
            this.setState({
                avatar: base64Flag + imageStr
            })
        }
        else {
            this.setState({
                avatar: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
            })
        }
        
        this.setState({ user: response.data.data,
                        player_names: response.data.data.fav_players.map(player => {
                                        return player.name
                                       }),
                        team_names: response.data.data.fav_teams.map(team => {
                            return team.name
                        })
        });
    }

    /**
     * rendering fav teams
     */
    fav_teams = () => {
        if (this.state.user.length == 0) {
            return (
                <Segment>
                    <Grid style={{ padding: "2%" }}>
                        <Grid.Row stretched>
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                        </Grid.Row>
                    </Grid>
                </Segment>
            );
        }

        if (this.state.user.fav_teams.length === 0) {
            return (
                <Message color='orange'>Your favorite teams will be displayed here</Message>
            );
        }
        return (
            this.state.user.fav_teams.map((team, index) => {
                return (
                    <List.Item key={index}>
                        <List.Content floated='right'>
                            <CheckFavTeam team_id={team.team_id} />
                        </List.Content>
                        <Image avatar src={team.img_url} onClick={() => this.props.history.push("/team/" + team.team_id)} />
                        <List.Content>
                            {team.name}
                        </List.Content>
                    </List.Item>
                );
            })

        );
    }
    /**
     * helper function for rendering fav players and teams
     */
    renderFavPlayersTeams = () => {
        // const {player} = this.state;
        const panes = [
            { menuItem: 'Favorite Players', render: () => <Tab.Pane>
                    <FavPlayers user={this.state.user} />
                </Tab.Pane> },
            { menuItem: 'Favorite Teams', render: () => <Tab.Pane>
                {this.fav_teams()}
            </Tab.Pane> },
        ]
        return < Tab panes={panes} />;
    }

    /**
     * form submission handling
     */
    update = () => {
        const {update_username} = this.state;
        const data = { name: update_username };
        this.props.updateUser(data, this.props.auth.user.id);
    };

    render() {
        if (this.state.user.length === 0) {
            return (
                <Segment>
                    <Grid style={{ padding: "2%" }}>
                        <Grid.Row stretched>
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                        </Grid.Row>
                    </Grid>
                </Segment>
            );
        }
        return(
           
            <div className="profile-main">
                <NavbarHeader/>
                <div className="profile">
                    <div className="user">
                        <Segment style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "space-around"}}>
                            <Modal trigger={<Image id="user-avatar" avatar size="small" src={this.state.avatar} />} centered={false}>
                                <Modal.Content image>
                                    <UploadAvatar />
                                </Modal.Content>
                            </Modal>
                            <div>
                                <Label>Username</Label>
                                <Input placeholder={this.props.auth.user.name} onChange={(e) => this.setState({update_username: e.target.value})}/>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input placeholder={this.props.auth.user.email} readOnly />
                            </div>
                            <Button primary onClick={() => this.update()}>Update</Button>
                        </Segment>
                    </div>
                    <div className="fav">
                        {this.renderFavPlayersTeams()}
                    </div>
                    <div className="profile-news">
                        <ProfileNews player_names={this.state.player_names} team_names={this.state.team_names} />
                    </div>
                </div>
            </div>
        );
    }
}
//get state from redux store and map it to props
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { updateUser }
)(Profile);