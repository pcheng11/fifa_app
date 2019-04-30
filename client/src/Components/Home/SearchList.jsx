import React from 'react';
import { Grid, Image, Segment, Label, Flag, List, Divider } from 'semantic-ui-react';
import { displayRating } from '../../utils/displayRating';
import './SearchList.scss';
import { connect } from "react-redux";
import axios from 'axios'

import { withRouter } from 'react-router-dom';
/**
 * 
 * @param {Array} players
 * helper component for rendering the search list 
 */
class SearchList extends React.Component {

    render() {
        if (this.props.teamChecked) {
            const handleTeamClick = async (team_id) => {
                await axios.put("/api/team/" + team_id, { location: this.props.trends })
                this.props.history.push("/team/" + team_id)
            }
            var list = this.props.teams.map((team, index) => {
                return (
                    <List.Item key={index} style={{ padding: "2%" }} onClick={() => handleTeamClick(team.team_id)}>
                        <Image avatar large src={team.img_url} />
                        <List.Content>
                            <h5>{team.name}</h5>
                            <Label>Region</Label>
                            {team.region}
                            <Label>Attack</Label>
                            {displayRating(team.attack)}
                            <Label>Defence</Label>
                            {displayRating(team.defence)}
                        </List.Content>
                    </List.Item>
                )
            });
            return <div className="player-list"> <List animated style={{ height: "100%" }} selection divided verticalAlign='middle'>{list} </List> </div>;

        } else {
            const handlePlayerClick = async (player_id) => {
                await axios.put("/api/player/" + player_id, { location: this.props.trends })
                this.props.history.push("/player/" + player_id)
            }
            var list = this.props.players.map((player, index) => {
                return (
                    <List.Item key={index} style={{ padding: "2%" }} onClick={() => handlePlayerClick(player.player_id)}>
                        <List.Content floated='right'>
                            <Label>Potential</Label>
                            {displayRating(player.potential)}
                            <Label>Overall</Label>
                            {displayRating(player.overall)}
                        </List.Content>
                        <Image avatar large src={player.img_url} />
                        <List.Content>
                            <h5>{player.name}</h5>
                            <List.Description style={{ display: "flex", flexDirection: "row" }}>
                                <Flag name={player.nationality.toLowerCase()} /> <h6>Age {player.age}</h6>{" "}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )
            });
        }
        return <div className="player-list"> <List size="massive" animated style={{ height: "100%" }} selection divided verticalAlign='middle'>{list} </List> </div>;
    };
};

const mapStateToProps = state => ({
    trends: state.trends
});

export default connect(
    mapStateToProps,
)(SearchList);