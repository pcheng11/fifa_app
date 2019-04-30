import React from 'react';
import {
        Label,
        List,
        Divider,
        Image,
        Flag,
        Segment,
        Grid,
        Button,
        Loader,
        Dimmer,
        Form,
        TextArea,
        Tab } from 'semantic-ui-react';
import { api_url } from "../../api.js";
import { connect } from "react-redux";
import axios from 'axios';
import './Team.scss';
import NavbarHeader from '../Navbar/Navbar.js';
import DisplayPentagon from "../../utils/displayTeamPentagon";
import CheckFavTeam from '../../utils/renderFavTeamButton';
import News from '../News/News.jsx';
import Calendar from './Calendar.jsx';
import GoogleMapReact from 'google-map-react';
// import GoogleAuth from '../Auth/GoogleAuth.jsx';

/**
 * create team component
 */
class Team extends React.Component {
    state = { player: null, team: [], team_id: "", matches: [], userMatches: [], added: false }


    static getDerivedStateFromProps(props) {
        const team_id = props.match.params.team_id;
        return {
            team_id: team_id
        };
    }

    /**
     * query api team end points    
     */
    async componentDidMount() {
        // match: match_response.data.data
        const team_response = await axios.get("/api/team/" + this.state.team_id);
        const match_response = await axios.get("/api/match/" + this.state.team_id);
        const user_match_response = await axios.get("/api/match/user/" + this.props.auth.user.id);

        this.setState({ team: team_response.data.data,
                        matches: match_response.data.data.fixture,
                        userMatches: user_match_response.data.data.map(match => { return match })
                    });
    }

    renderFavButton = team_id => {
        if (team_id !== undefined) {
            return <CheckFavTeam team_id={team_id} />;
        }
    }

    /**
     * helper method for displaying team starting
     */

    renderPlayers= (team) => {
        const panes = [
            { menuItem: 'Stats', render: () => <Tab.Pane>{this.renderStats(team)}</Tab.Pane> },
            {
                menuItem: 'Starting', render: () => <Tab.Pane><List style={{ height: "100%" }} animated selection divided verticalAlign='middle'>{this.displayPlayers(this.state.team.starting)}</List></Tab.Pane> },
            { menuItem: 'Substitue', render: () => <Tab.Pane><List style={{ height: "100%" }} animated selection divided verticalAlign='middle'>{this.displayPlayers(this.state.team.sub)}</List></Tab.Pane> },
        ]
        return < Tab panes={panes} />;
    }

    renderMatches = () => {
        const { matches, userMatches } = this.state;
        return matches.map(match => {
            return (
                <Segment>
                    <Grid>
                        <Grid.Column width={10}>
                            {match.game}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {match.date}
                        </Grid.Column>
                        <Calendar match={match.game} date={match.datetime} userMatches={userMatches} />
                    </Grid>
                    <Divider vertical/>
                </Segment>
            );
        })
    }
    renderNewsAndMatches = () => {
        const panes = [
            { menuItem: 'News', render: () => <Tab.Pane><News name={this.state.team.name} /></Tab.Pane> },
            { menuItem: 'Upcoming Matches', render: () => <Tab.Pane>{this.renderMatches()}</Tab.Pane>},
            { menuItem: 'Trending', render: () => <Tab.Pane style={{ position: "relative" }}><div>{this.trending()}</div></Tab.Pane> }
        ]
        return < Tab panes={panes} />;
    }

    trending = () => {

        const heatMapData = {
            positions: this.state.team.location,
            options: {
                radius: 20,
                opacity: 0.6,
            }
        };
        const google = window.google;
        return (
            <div style={{ height: '35vh', width: '100%' }}>
                <GoogleMapReact
                    ref={(el) => this._googleMap = el}
                    bootstrapURLKeys={"AIzaSyBlkPdBVduGBwtOUWRH7llSTvHZaZZZsb8"}
                    defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
                    defaultZoom={0}
                    heatmapLibrary={true}
                    heatmap={heatMapData}
                />
            </div>
        );
    }

    renderStats = (team) => {
        return (<Segment>
                    <DisplayPentagon team={team}/>
                </Segment>);
    }

    displayPlayers = (players) => {
        if (players === undefined) return null;
        return players.map((player, index) => {
            return (
                <List.Item key={index}>
                    <Image avatar size="mini" src={player.image_url} onClick={() => this.props.history.push("/player/" + player.player_id)} />
                    <List.Content>
                        {player.player_name}
                    </List.Content>
                </List.Item>
            );
        })
       
    }
    render() {
        const { activeItem, team } = this.state
        var flag_name = team.nationality;
        if (flag_name != null) {
            flag_name = flag_name.toLowerCase();
        }
        if (team.length === 0) {
            return (
                <div style={{ height: "100vh" }}>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </div>
            );
        }

        return(
            <div className="TeamMain">
                <NavbarHeader activeItem={activeItem} />
                <div className="team">
                    <div className="teamprofileCard">
                        <Segment>
                            <Label style={{ cursor: "pointer" }}
                                attached='top'
                                >
                                    {this.renderFavButton(team.team_id)}
                                {' '}
                                {team.name}
                                {' '}
                                <Flag style={{ size: '100px' }} name={flag_name} />
                            </Label>
                            <Grid style={{ padding: "2%" }}>
                                <Grid.Row stretched>
                                    <Grid.Column width={6}>
                                        <Image style={{ height: "50%", width: "50%", borderRadius: "10px", border: "2px solid grey" }}
                                            id="result-image" src={team.img_url} />
                                    </Grid.Column>

                                    <Grid.Column width={10}>
                                        <div style={{ padding: '1%' }}>
                                            <Label>Country</Label>
                                            <Flag style={{ size: '100px' }} name={flag_name} />
                                        </div>
                                        <div style={{ padding: '1%' }}>
                                            <Label>League</Label>
                                            {team.league}
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </div>
                    <div className="news">
                        {this.renderNewsAndMatches()}
                    </div>
                    <div className="starting">
                        {this.renderPlayers(team)}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Team);