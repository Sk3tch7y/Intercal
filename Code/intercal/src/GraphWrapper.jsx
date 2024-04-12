import React from 'react';
import Graph from './dataViewing.jsx';
import './/styles/styles.css';
import './/styles/graphStyles.css';
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
        //TODO: When Oakley IS done <Graph data={graphData} />
        return (
            <div className='dataViewing'>
                <h1>Monitoring Post</h1>
                <div className='sidemenu'>{otherData}</div>
                <div className = 'graph'></div>
                <Graph data={graphData} />
            </div>
        );
    }
}

export default GraphWrapper;