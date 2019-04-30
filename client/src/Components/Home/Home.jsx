import React, { Component } from 'react'
import { 
        Segment, 
        Input, 
        Icon, 
        Dropdown, 
        Checkbox, 
        Grid 
} from 'semantic-ui-react'
import { connect } from "react-redux";
import SearchList from './SearchList.jsx';
import axios from 'axios';
import { api_url } from "../../api.js";
import NavbarHeader from '../Navbar/Navbar.js';
import './Home.scss';
import { recordLocation } from '../../actions/recordLocation';
/**
 * Create Home component
 */
class Home extends Component {

    constructor() {
        super();
        this.state = { searching: false, 
                       activeItem: 'home', 
                       players: [], 
                       teams: [],
                       inputVal: '', 
                       sortBy: "", 
                       descChecked: false, 
                       ascendChecked: false,
                       teamChecked: false,
                        placeholder: "Search Players..."
        }
    }

    /**
     * Getting user location
     */
    componentDidMount() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            this.props.recordLocation(pos)
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
        
    }

    /**
     * update player data on input
     */
    changeInput = (e, {value}) => {
        this.setState({
            inputVal: value
        })
    }

    /**
     * Parent method for search
     */
    conductSearch = () => {
        const {teamChecked} = this.state;
        if (teamChecked) {
            this.searchTeam();
        } else {
            this.searchPlayer();
        }
    }

    searchPlayer = () => {
        this.setState({ searching: true })
        axios.get("/api/player", {
            params: {
                name: this.state.inputVal
            }
        })
        .then(response => response.data)
        .then(data => this.setState({ players: data.data, searching: false })).catch(err => console.log(err));
    }   

    /**
     * search player based on user's input
     */

    /**
     * search team based on user's input
     */
    searchTeam = () => {
        this.setState({ searching: true })
        axios.get("/api/team", {
            params: {
                name: this.state.inputVal
            }
        })
        .then(response => response.data)
        .then(data => this.setState({ teams: data.data, searching: false })).catch(err => console.log(err));
    }   

    /**
     * sorting function such as sort by age, potential
     * providing ascending and descending option
     */
    sort = (e, {label}) => {
        if (label === "Ascending") {
            if (this.state.sortBy === "Overall") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.overall < b.overall) ? -1 : 1),
                    descChecked: false,
                    ascendChecked: true
                })
            }
            if (this.state.sortBy === "Age") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.age < b.age) ? -1 : 1),
                    descChecked: false,
                    ascendChecked: true
                })
            }
            if (this.state.sortBy === "Potential") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.potential < b.potential) ? -1 : 1),
                    descChecked: false,
                    ascendChecked: true
                })
            }
            if (this.state.sortBy === "Attack") {
                this.setState({
                    players: this.state.teams.sort((a, b) => (a.attack < b.attack) ? -1 : 1),
                    descChecked: false,
                    ascendChecked: true
                })
            }
            if (this.state.sortBy === "Defence") {
                this.setState({
                    players: this.state.teams.sort((a, b) => (a.defence < b.defence) ? -1 : 1),
                    descChecked: false,
                    ascendChecked: true
                })
            }
        }
        if (label === "Descending") {
            if (this.state.sortBy === "Overall") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.overall < b.overall) ? 1 : -1),
                    descChecked: true,
                    ascendChecked: false
                })
            }
            if (this.state.sortBy === "Age") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.age < b.age) ? 1 : -1),
                    descChecked: true,
                    ascendChecked: false
                })
            }
            if (this.state.sortBy === "Potential") {
                this.setState({
                    players: this.state.players.sort((a, b) => (a.potential < b.potential) ? 1 : -1),
                    descChecked: true,
                    ascendChecked: false
                })
            }
            if (this.state.sortBy === "Attack") {
                this.setState({
                    players: this.state.teams.sort((a, b) => (a.attack < b.attack) ? 1 : -1),
                    descChecked: true,
                    ascendChecked: false
                })
            }
            if (this.state.sortBy === "Defence") {
                this.setState({
                    players: this.state.teams.sort((a, b) => (a.defence < b.defence) ? 1 : -1),
                    descChecked: true,
                    ascendChecked: false
                })
            }
        }
    }

    /**
     * sort by function:
     * age, potentail, attack, defence, rating
     */
    sortBy = (e, { value }) => {
        if (value === 'Age') {
            this.setState({
                players: this.state.players.sort((a, b) => (a.age > b.age) ? 1 : -1),
                descChecked: false,
                ascendChecked: false,
                sortBy: 'Age'
            });
        }
        if (value === 'Potential') {
            this.setState({
                players: this.state.players.sort((a, b) => (a.potential > b.potential) ? 1 : -1),
                descChecked: false,
                ascendChecked: false,
                sortBy: 'Potential'
            });
        }
        if (value === 'Overall') {
            this.setState({
                players: this.state.players.sort((a, b) => (a.overall > b.overall) ? 1 : -1),
                descChecked: false,
                ascendChecked: false,
                sortBy: 'Overall'
            });
        }
        if (value === 'Attack') {
            this.setState({
                players: this.state.players.sort((a, b) => (a.attack > b.attack) ? 1 : -1),
                descChecked: false,
                ascendChecked: false,
                sortBy: 'Attack'
            });
        }
        if (value === 'Defence') {
            this.setState({
                players: this.state.players.sort((a, b) => (a.defence > b.defence) ? 1 : -1),
                descChecked: false,
                ascendChecked: false,
                sortBy: 'Defence'
            });
        }
    }
    changeSearchCategory =() => {

        const { teamChecked } = this.state;
        if (teamChecked) {
            this.setState({ teamChecked: false, placeholder: "Search Players...", players: [], teams: [] });
        } else {
            this.setState({ teamChecked: true, placeholder: "Search Teams...", teams: [], players: [] });
        }
    }

    render() {
        const { activeItem, players, inputVal, searching, ascendChecked, descChecked, teamChecked, placeholder } = this.state
        if (searching) {
            var isLoading = true;
        } else {
            var isLoading = false;
        }
        if (!teamChecked) {
            var options = [
                { key: 'Age', text: 'Age', value: 'Age' },
                { key: 'Potential', text: 'Potential', value: 'Potential' },
                { key: 'Overall', text: 'Overall', value: 'Overall' }
            ]
        } else {
            var options = [
                { key: 'Attack:', text: 'Attack', value: 'Attack' },
                { key: 'Defence', text: 'Defence', value: 'Defence' }
            ]
        }

        return (
            <div>
                <NavbarHeader activeItem={activeItem}/>
                <div className='main'>
                    <Segment className="search">
                        <Input
                            loading={isLoading}
                            iconPosition='left'
                            className="search-bar"
                            action={{
                                icon: <Icon name='search' inverted circular link />,
                                onClick: (e) => this.conductSearch(e)
                            }}
                            placeholder={placeholder}
                            onChange={this.changeInput}
                            // style={{padding: '10px'}}
                        />
                        <Grid style={{ padding: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                            <Grid.Column width={4}>
                                <Dropdown 
                                    button
                                    floating
                                    options={options}
                                    placeholder="Sort By"
                                    onChange={this.sortBy}
                                />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Checkbox 
                                    label='Ascending'
                                    onChange={this.sort}
                                    checked={ascendChecked}
                                    />
                                <Checkbox
                                    label='Descending'
                                    onChange={this.sort}
                                    checked={descChecked}
                                />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <Checkbox 
                                    label='Search Team'
                                    toggle 
                                    onChange={() => this.changeSearchCategory()}
                                    checked={teamChecked}
                                    />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <SearchList className="player-list" teamChecked={teamChecked} players={this.state.players} teams={this.state.teams} history={this.props.history} />
                </div>
            </div>
        );
    }
}

//get state from redux store and map it to props
const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { recordLocation }
)(Home);