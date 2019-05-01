import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, 
        Label, 
        Divider, 
        Image, 
        Flag, 
        Icon, 
        Segment, 
        Menu, 
        Grid, 
        Button, 
        Header,
        Rating,
        Embed,
        Dimmer,
        Loader,
        Modal,
        Tab } from 'semantic-ui-react';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { Chart } from "react-google-charts";
import { api_url } from "../../api.js";
import DisplayPentagon from "../../utils/displayPentagon";
import NavbarHeader from '../Navbar/Navbar.js';
import {displayRating, displayScore } from '../../utils/displayRating';
import CheckFollow from '../../utils/renderFavButton';
import './Player.scss';
import SkillHighlight from './SkillHighlight.jsx';
import SimilarPlayers from './SimilarPlayers.jsx';
import News from '../News/News.jsx';
import GoogleMapReact from 'google-map-react';


/**
 * create player component
 */

class Player extends React.Component {
    state = { activeItem: 'player', player_id: "", player: [], highlightID: "", open: false, positions: [], followers: 0, trends:null }
    handleItemClick = (name) => {
        this.setState({ activeItem: name });
        if (name === 'home') {
            this.props.history.push('/');
        } else {
            this.props.history.push('/' + name);
        }
    };

    /**
     * 
     * @param {*} props 
     * make sure that the props are gotten before rendering the page
     */
    static getDerivedStateFromProps(props) {
       
        const player_id = props.match.params.player_id;
        return {
            player_id: player_id
        };

    }
    /**
     * query the api end point
     */ 
    async componentDidMount() {
        const response = await axios.get("/api/player/" + this.state.player_id)
        this.setState({ player: response.data.data, followers: response.data.data.followers });
        axios.get("/api/trends/player/" + this.state.player.wiki_name).then(res => {
            this.setState({trends: res.data})
        });
        console.log(this.state.player)
    }

    /**
     * dipslay all the attributes of a player
     */
    displayAttributes = attributes => {
        if (attributes === undefined) return null;
        return Object.keys(attributes).map((key, index) => {
            return (
                    <Grid.Row key={index}>
                        <Grid.Column width={6}>
                            <Label>{key}</Label>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Progress animated color={this.differColor(attributes[key])} 
                                      value={attributes[key]}>
                                      {attributes[key]}
                            </Progress>
                        </Grid.Column>
                    </Grid.Row>
            );
        });
    }

    /**
     * helper function for rendering similar players and News
     */
    renderNewsSPSH = () => {
        // const {player} = this.state;
        const panes = [
            { menuItem: 'News', render: () => <Tab.Pane><News name={this.state.player.name} /></Tab.Pane> },
            { menuItem: 'Similar Players', render: () => <Tab.Pane><SimilarPlayers player={this.state.player} history={this.props.history} renderFavButton={this.renderFavButton} /></Tab.Pane> },
            { menuItem: 'Skill Highlight', render: () => <Tab.Pane><SkillHighlight player_name={this.state.player.name} /></Tab.Pane> },
            { menuItem: 'Trending', render: () => <Tab.Pane style={{position: "relative"}}><div>{this.trending()}</div></Tab.Pane>},
            { menuItem: 'User Distribution', render: () => <Tab.Pane style={{ position: "relative" }}><div>{this.distribution()}</div></Tab.Pane> }
        ]
        return < Tab panes={panes} />;
    }


    /**
     * 
     */
    distribution = () => {
        const heatMapData = {
            positions: this.state.player.location,
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
    /**
     * treding heatmap
     */
   trending = () => {
        return (
            <div style={{ height: '35vh', width: '100%' }}>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="GeoChart"
                    options={{
                        cols: [
                            { id: '0', label: 'Provinces', type: 'string' },
                            { id: '1', label: 'Popularity', type: 'number' }
                        ],
                        resolution: "provinces",
                        region: "US"
                    }}
                    data={this.state.trends.data}
                    mapsApiKey="AIzaSyBlkPdBVduGBwtOUWRH7llSTvHZaZZZsb8"
                    rootProps={{ 'data-testid': '1' }
                    }
                />
            </div>
            );
       
          
   }

    /**
     * assign progress bar color
     */
    differColor = value => {
        if (value >= 80) return 'success';
        if (value >= 70) return 'info';
        if (value >= 60) return 'warning';
        else return 'danger';
    }

    /**
     * helper funciton for rendering the rating stars
     */
    renderStars = (rating1, rating2, rating3, rating4) => {
        if (rating1 != 0) {
            return (<Grid style={{ padding: "10%" }}>
                <Grid.Row>
                    <Label>Inter. Reputation</Label> <Rating icon="star" defaultRating={rating1} maxRating={5} disabled />
                </Grid.Row>
                <Grid.Row>
                    <Label>Weak Foot </Label> <Rating icon="star" defaultRating={rating2} maxRating={5} disabled />
                </Grid.Row>
                <Grid.Row>
                    <Label>Skill Moves</Label> <Rating icon="star" defaultRating={rating3} maxRating={5} disabled />
                </Grid.Row>
                <Grid.Row>
                    <Label>Work Rate</Label>{'  '}{rating4}
                </Grid.Row>
            </Grid>);
        }
    }

    /**
     * helper function for rendering the favortie button
     */
    renderFavButton = (player_id, followers) => {
        if (player_id != undefined) {
            return <CheckFollow player_id={player_id} />;
        }
    }

    

    
    render() {
        const { activeItem, player, playerNews, open, highlightID, followers } = this.state
        
        if (player.length === 0) {
            return (
                <div style={{ height: "100vh" }}>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </div>
            );
        }

        var flag_name = player.nationality;
        if (flag_name != null) {
            flag_name = flag_name.toLowerCase();
        }
        return(
            <div className="PlayerMain"
                style={{ backgroundImage: `url(${player.club_logo_url})`, 
                         backgroundRepeat: "repeat-y"}}>
                <NavbarHeader activeItem={activeItem} />
                <div className="player">
                    <div className="profileCard">
                        <Segment>
                            <Label style={{ cursor: "pointer" }}
                                attached='top'
                            >
                                {this.renderFavButton(player.player_id, followers)}{' '}
                                {player.name}{' '}
                                <Flag style={{ size: '100px' }} name={player.nationality.toLowerCase()} />
                                {' Age: '}{player.age}
                            </Label>
                                <Label as='a' color='orange' ribbon='right'>
                                    Followers: {followers}
                                </Label>
                            <Grid style={{ padding: "1%" }} divided>
                                <Grid.Row only="computer">
                                        <Grid.Column width={5}>
                                            <Image id="player-image" src={player.img_url} />
                                        </Grid.Column>

                                        <Grid.Column width={6} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                            <div>
                                                {displayRating(player.potential, "Potential ")}
                                            </div>
                                            <div>
                                                {displayRating(player.overall, "Overall ")}
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={5} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                                            <b><p style={{ "font-size": 10 }}>{player.club}</p></b>
                                            <Link to={"/team/" + player.club_id}><Image size="mini" src={player.club_logo_url} /></Link>
                                        </Grid.Column>
                                </Grid.Row>

                                <Grid.Row only="mobile tablet">
                                    <Grid.Column width={10}>
                                        <Image id="player-image" src={player.img_url} />
                                    </Grid.Column>
                                    <Grid.Column width={6} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                        <div>
                                            {displayRating(player.potential, "Potential ")}
                                        </div>
                                        <div>
                                            {displayRating(player.overall, "Overall ")}
                                        </div>
                                    </Grid.Column>
                                    {/* <Label color='teal' attached='bottom left'> 22</Label> */}
                                </Grid.Row>
                                
                                <Grid.Row only="mobile tablet">
                                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 auto"}}>
                                    <b><p style={{ "font-size": 20 }}>{player.club}</p></b>
                                    <Link to={"/team/" + player.club_id}><Image size="small" src={player.club_logo_url} /></Link>
                                    </div>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </div>
                    
                    <div className="stat">
                        <Segment style={{ padding: "4%" }}>
                            <Grid style={{ padding: "4%" }}>
                                <Grid.Column width={6} only="computer">
                                    {this.renderStars(~~player["International Reputation"],
                                        ~~player["Weak Foot"],
                                        ~~player["Skill Moves"],
                                        player["Work Rate"]
                                    )}
                                </Grid.Column>
                                <Grid.Column width={10} only="computer">
                                <DisplayPentagon player={player} />
                                </Grid.Column>
                                <Grid.Row only="mobile tablet">
                                    <DisplayPentagon player={player} />
                                </Grid.Row>
                                <Grid.Row only="mobile tablet" style={{ padding: "1%" }}>
                                    {this.renderStars(~~player["International Reputation"],
                                        ~~player["Weak Foot"],
                                        ~~player["Skill Moves"],
                                        player["Work Rate"]
                                    )}
                                </Grid.Row>
                               
                                
                            </Grid>
                        </Segment>
                        <Segment>
                            <Label as='a' color='red' ribbon>
                                <h2>Attacking</h2>
                            </Label>
                            <Grid style={{ padding: "1%" }}>
                            {this.displayAttributes(player.Attacking)}
                            </Grid>
                        </Segment>
                        <Segment>
                            <Label as='a' color='blue' ribbon>
                                <h2>Skill</h2>
                            </Label>
                            <Grid style={{ padding: "1%" }}>
                            {this.displayAttributes(player.Skill)}
                            </Grid>
                        </Segment>
                        <Segment>
                            <Label as='a' color='green' ribbon>
                                <h2>Movement</h2>
                            </Label>
                            <Grid style={{ padding: "1%" }}>
                            {this.displayAttributes(player.Movement)}
                            </Grid>
                        </Segment>
                        <Segment>
                            <Label as='a' color='yellow' ribbon>
                                <h2>Defending</h2>
                            </Label>
                            <Grid style={{ padding: "1%" }}>
                            {this.displayAttributes(player.Defending)}
                            </Grid>

                        </Segment>
                        <Segment>
                            <Label as='a' color='purple' ribbon>
                                <h2>Power</h2>
                            </Label>
                            <Grid style={{ padding: "1%" }}>
                            {this.displayAttributes(player.Power)}
                            </Grid>
                        </Segment>
                        
                    </div>
                    <div className="news">
                        {this.renderNewsSPSH()}
                    </div>
                </div>
            </div>
        );
    }
}
//get state from redux store and map it to props
const mapStateToProps = state => ({
    auth: state.auth,
    location: state.location
});

export default connect(
    mapStateToProps,
)(Player);
