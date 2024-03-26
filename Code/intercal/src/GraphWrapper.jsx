import React from 'react';
import Graph from './dataViewing.jsx';

class GraphWrapper extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state if needed
        this.state = {
            graphData: [],
            otherData: '',
        };
    }

    componentDidMount() {
        // Fetch graph data and other data from an API or any other source
        // Update the state with the fetched data
        this.setState({
            graphData: [/* graph data */],
            otherData: 'Some other data',
        });
    }

    render() {
        const { graphData, otherData } = this.state;
        //<Graph data={graphData} />
        return (
            <div>
                <h1>Monitoring Post</h1>
                <div className='sidemenu'>{otherData}</div>
                <div className = 'graph'></div>
                <Graph data = {graphData}></Graph>
            </div>
        );
    }
}

export default GraphWrapper;