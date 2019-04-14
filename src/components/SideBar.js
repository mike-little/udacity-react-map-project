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
                           aria-label="Filter the Dog Park list"
                           placeholder="Filter"
                           value={this.state.userInput}
                           onChange={this.handleChange}/>
                </div>
                <div className="App-list">
                    <ol role="tablist">
                        {this.props.dogParkList.map( (park, index) =>
                            <li role="tab"
                                tabIndex="0"
                                onClick={this.onClickFn.bind(null, index)}
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
