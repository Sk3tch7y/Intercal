import React from 'react';
import Graph from './dataViewing.jsx';

const GraphWrapper = ({data}) => {
    //TODO: When Oakley IS done <Graph data={graphData} />

    return (
        <div>
            <h1>Monitoring Post</h1>
            <div className='sidemenu'></div>
            <div className = 'graph'></div>
            <Graph data={data} />
        </div>
    );
}

export default GraphWrapper;