import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import { Segment, Grid, Button, Image } from 'semantic-ui-react'
import axios from 'axios';
import { connect } from "react-redux";

class UploadAvatar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            imageURL: null
        }
    }

    fileInputRef = React.createRef();

    handleInput = (e) => {
        this.setState({image: e.target.files[0]});
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            this.setState({
                imgURL: [reader.result]
            })
        }
    }

    upload = () => {
        console.log(this.state.image)
        const formData = new FormData();
        formData.append('avatar', this.state.image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/api/user/"+this.props.auth.user.id, formData)
        
    }

    render() {
        if (this.state.imgURL) {
            return (
                <Segment style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid>
                        <Grid.Column width={10}>
                            <Button
                                content="Choose Image"
                                labelPosition="left"
                                icon="file"
                                onClick={() => this.fileInputRef.current.click()}
                            />
                            <input
                                ref={this.fileInputRef}
                                type="file"
                                hidden
                                onChange={this.handleInput}
                                name="avatar"
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Button onClick={() => this.upload()}> Upload </Button>
                        </Grid.Column>
                    </Grid>
                    <Image style={{padding: "10%"}} avatar size="large" src={this.state.imgURL} alt="Preview" />
                </Segment>
            );
        }
        return (
            <Segment style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Grid>
                    <Grid.Column width={10}>
                        <Button
                            content="Choose Image"
                            labelPosition="left"
                            icon="file"
                            onClick={() => this.fileInputRef.current.click()}
                        />
                        <input
                            ref={this.fileInputRef}
                            type="file"
                            hidden
                            onChange={this.handleInput}
                            name="avatar"
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button onClick={() => this.upload()}> Upload </Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(UploadAvatar);