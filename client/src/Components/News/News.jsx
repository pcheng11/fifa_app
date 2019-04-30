
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
    Dimmer,
    Loader,
    Message
} from 'semantic-ui-react';
import axios from 'axios';

import { api_url } from "../../api.js";

class News extends React.Component {

    state = { news: [] }

    /**
     * get news from api end point
     */
    componentWillMount() {
        let url = 'https://newsapi.org/v2/everything';
        axios.get(url, {
            params: {
                q: this.props.name,
                sortBy: "popularity",
                language: 'en',
                apiKey: "3fac4a0432e6492bbf51741358eadd12"
            }
        }).then(res => this.setState({
            news: res.data.articles
        }));
    }

    render() {
        const  {news} = this.state;
        if (news.length === 0) {
                // <Segment>
                //     <Grid style={{ padding: "2%" }}>
                //         <Grid.Row stretched>
                //             <Dimmer active inverted>
                //                 <Loader inverted>Loading</Loader>
                //             </Dimmer>
                //         </Grid.Row>
                //     </Grid>
                // </Segment>
                return (
                <Message color='orange'>No news for this player</Message>
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
                        <Grid.Row>
                            <Grid.Column width={16} style={{ fontWeight: 'bold' }}>
                                <a href={news.url}>{news.title}</a>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Image src={news.urlToImage} />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                {news.description}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            );
            })
        );
    }
}

export default News;