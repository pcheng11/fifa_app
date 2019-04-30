
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
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
    Form,
    TextArea,
    Tab
} from 'semantic-ui-react';

import { api_url } from "../../api.js";
import axios from 'axios';
import { displayRating, displayScore } from '../../utils/displayRating';

class SimilarPlayers extends React.Component {


    /**
     * helper compoenent for rendering similar players
     */
    render() {
        const { player, history } = this.props;
        return player.similar_players.map((player, index) => {
            return (
                <Segment key={index}>
                    <Label style={{ cursor: "pointer" }}
                        attached='left top'
                        >
                        {this.props.renderFavButton(player.player_id)}{' '}
                        {player.name}{' '}
                        <Flag style={{ size: '100px' }} name={player.nationality.toLowerCase()} />
                        {' Age: '}{player.age}
                        
                    </Label>
                    
                    <Grid style={{ padding: "1%" }} divided>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Image id="player-image" src={player.img_url} onClick={() => {
                                    history.push("/player/" + player.player_id)
                                    window.location.reload(true)

                                }}/>
                            </Grid.Column>

                            <Grid.Column width={6} style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                <div>
                                    {displayRating(player.potential, "Potential ")}
                                </div>
                                <div>
                                    {displayRating(player.overall, "Overall ")}
                                </div>
                            </Grid.Column>
                            <Grid.Column width={5} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                                <b><p style={{"font-size": 10}}>{player.club}</p></b>
                                <Link to={"/team/" + player.club_id}><Image size="mini" src={player.club_logo_url} /></Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                );
            })
    }
}

export default SimilarPlayers;