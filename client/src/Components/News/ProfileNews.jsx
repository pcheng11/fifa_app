
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
    Label,
    Divider,
    Image,
    Segment,
    Grid,
    Button,
    Header,
    Message,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import axios from 'axios';

import { api_url } from "../../api.js";

class ProfileNews extends React.Component {

    state = { news: [] }

    /**
     * 
     * @param {*props} nextProps 
     * get user news feed from news api
     */
    componentDidMount() {
        let url = 'https://newsapi.org/v2/everything';
        const { player_names, team_names } = this.props;

        let _news = [];
        let promises = [];
        for (var name of player_names.concat(team_names)) {
            promises.push(
                axios.get(url, {
                    params: {
                        q: name,
                        sortBy: "popularity",
                        language: 'en',
                        apiKey: "3fac4a0432e6492bbf51741358eadd12"
                    }
                })
            );
        }
        Promise.all(promises).then((responses) => {
            this.setState({news: 
                            [].concat.apply([], responses.map(response => {
                                    return response.data.articles }))})
        });
    }

    render() {
        const { news } = this.state;
        const {player_names, team_names} = this.props;
        if (player_names.length === 0 && team_names.length === 0) {
            return (
                <Message color='orange'>News will be displayed after you favorite a player/team</Message>
            );
        }
        if (news.length === 0) {
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
        return (
            news.map((news, index) => {
                return (
                    <Segment padded key={index}>
                        <Label attached='top'>
                            {news.source.name}
                        </Label>
                        <Grid style={{ padding: "10px" }}>
                                <Grid.Column width={10} style={{ fontWeight: 'bold' }}>
                                    <Grid.Row>
                                        <a href={news.url}>{news.title}</a>
                                    </Grid.Row>
                                    <Divider />
                                    <Grid.Row>
                                        {news.description}
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Image src={news.urlToImage} />
                                </Grid.Column>
                        </Grid>
                    </Segment>
                );
            })
        );
    }
}

export default ProfileNews;