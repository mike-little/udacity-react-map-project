import React from 'react';
import './../App.css'

class SideBar extends React.Component {
    state = {
        searchFilterString: '',
        selectedParkIndex: -1,
        userInput: ''
    };

    onClickFn = (index) => {
       this.setState({selectedParkIndex: index})
       this.props.selectPark(index);
    }

    handleChange = (event) => {
       this.setState({userInput: event.target.value});
       this.props.filterParks(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="App-filter">
                    <input type="text"
                           placeholder="Filter"
                           value={this.state.userInput}
                           onChange={this.handleChange}/>
                </div>
                <div className="App-list">
                    <ol>
                        {this.props.dogParkList.map( (park, index) =>
                            <li onClick={this.onClickFn.bind(null, index)}
                                className={this.state.selectedParkIndex === index ? 'active' : ''}
                                key={index}>
                                {park.name}
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }

}

export default SideBar
