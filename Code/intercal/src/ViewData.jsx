import GraphWrapper from './GraphWrapper.jsx';
import './styles/styles.css';
import './styles/viewData.css';

const ViewData = ({onClose, data}) =>{
    
    return (
        <div className = 'dataView'>
            <div className="header">
                <button className='closer'onClick={onClose}>Close</button>
                <h1>{data.postid}</h1>
            </div>
            <div className="dataBody">
                <GraphWrapper></GraphWrapper> 
            </div>
        </div>
    );
} 

export default ViewData;