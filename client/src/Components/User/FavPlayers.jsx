import React from 'react';
import {
    Card,
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
    Tab
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import CheckFollow from '../../utils/renderFavButton';
class FavPlayers extends React.Component {

    componentDidMount() {
        console.log(this.props)
    }

    handleRemove = async (player_id) => {
        await axios.delete("/api/user/fav_players", {
            params: {
                player_id: player_id,
                user_id: this.props.auth.user.id
            }
        });
    }

    render() {
        if (this.props.user === undefined ) {
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

        if (this.props.user.fav_players === undefined) {
            return (
                <Message color='orange'>Your favorited players will be displayed here</Message>
            );
        }

        return (
            <List style={{ height: "100%" }} animated selection divided verticalAlign='middle'>
                {this.props.user.fav_players.map((player, index) => (
                    <List.Item key={index}>
                        <List.Content floated='right'>
                            <CheckFollow player_id={player.player_id} />
                        </List.Content>
                        <Image avatar src={player.img_url} onClick={() => this.props.history.push("/player/" + player.player_id)} />
                        <List.Content>
                            {player.name}
                        </List.Content>
                    </List.Item>
                ))
             }
            </List>

        );

    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(withRouter(FavPlayers));