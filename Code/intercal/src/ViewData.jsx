import GraphWrapper from './GraphWrapper.jsx';
import './styles/styles.css';
import './styles/viewData.css';

const ViewData = ({onClose}, monitoringPost, data) =>{

    return (
        <div className = 'dataView'>
            <div className="header">
                <h1>{monitoringPost}</h1>
            </div>
            <div className="dataBody">
                <GraphWrapper></GraphWrapper> 
            </div>
        </div>
    );
} 

export default ViewData;