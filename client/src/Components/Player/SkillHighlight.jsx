import React from 'react';
import {
    Label,
    Divider,
    Segment,
    Grid,
    Modal,
    Dimmer,
    Loader,
} from 'semantic-ui-react';

import axios from 'axios';
import { youtube_api } from '../../api.js'; 

/**
 * Skill highlight component
 */
class SkillHighlight extends React.Component {

    state = { highlight: [], highlightID: '', open: false };

    /**
     * receive result before reding the compoennt
     */
    componentWillMount() {
        axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                q: this.props.player_name + "skill",
                part: "snippet",
                maxResults: 20,
                key: youtube_api,
                videoSyndicated: true,
                type: "video",
                videoCategoryId: 17
            }
        }).then(response => this.setState({ highlight: response.data.items }));
    }

    
    handleClose = () => this.setState({ open: false })

    /**
     * modal functionality
     */
    openModal = () => {
        const { highlightID, open } = this.state;
        return (
            < Modal open={open} basic size="small" onClose={this.handleClose} >
                <iframe src={'https://www.youtube.com/embed/' + highlightID}
                    style={{ height: "60%", width: "80%" }} />
            </Modal >
        );
    }

    /**
     * redering highlihgt of a player
     */
    highlights = (highlight) => {
        return highlight.map((video, index) => {
            return (
                <Segment key={index}>
                    <Label attached='top'>
                        {video.snippet.channelTitle}
                    </Label>
                    <Grid style={{ padding: "2%" }}>
                        <Grid.Row>
                            <Grid.Column width={16} style={{ fontWeight: 'bold' }}>
                                {video.snippet.title}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <img src={video.snippet.thumbnails.medium.url}
                                    style={{ height: "100%", width: "100%", padding: "2%", cursor: "pointer" }}
                                    onClick={() => this.setState({ open: true, highlightID: video.id.videoId })}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column width={16}>
                                {video.snippet.description}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            );
        });
    }

    render() {
        const { highlight, highlightID, open } = this.state;
        // if (highlight.length === 0) {
        //     return (
        //         <Segment>
        //             <Grid style={{ padding: "2%" }}>
        //                 <Grid.Row stretched>
        //                     <Dimmer active inverted>
        //                         <Loader inverted>Loading</Loader>
        //                     </Dimmer>
        //                 </Grid.Row>
        //             </Grid>
        //         </Segment>
        //     );
        // }
        return (
            <div>
                {this.highlights(highlight)}
                {this.openModal()}
            </div>
        )
    
    }
}


export default SkillHighlight;