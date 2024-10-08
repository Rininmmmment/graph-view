import { useState } from 'react';
import Title from './Title';
import Radio from './Radio';
import Textarea from './Textarea';

export default function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [invalidCount, setInvalidCount] = useState(0);
    const [direct, setDirect] = useState('undirected');
    const [weight, setWeight] = useState('unweighted');
    const [graphData, setGraphData] = useState('');
    const [graphUrl, setGraphUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!isGraphDataValid(graphData)) {
            return;
        }

        setIsLoading(true);
        const response = await fetch(`${apiUrl}/api/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "direct": direct, "weight": weight, "graph_data": graphData }),
        });
        const data = await response.json();
        setGraphUrl(data.graph_url);
        setError(data.error);
        setIsLoading(false);
    };

    const isGraphDataValid = (graphData) => {
        if (graphData === '') {
            setInvalidCount(prevCount => prevCount + 1);
            if (invalidCount > 4) {
                setError('Graph data is required 😡💢');
            } else {
                setError('Graph data is required 😔');
            }
            return false;
        } else if (weight === 'unweighted' && graphData.split('\n').some(line => line.split(' ').length !== 2)) {
            setInvalidCount(prevCount => prevCount + 1);
            if (invalidCount > 4) {
                setError('Invalid graph data 😡💢');
            } else {
                setError('Invalid graph data 🥺💧');
            }
            return false;
        } else if (weight === 'weighted' && graphData.split('\n').some(line => line.split(' ').length !== 3)) {
            setInvalidCount(prevCount => prevCount + 1);
            if (invalidCount > 4) {
                setError('Invalid graph data 😡💢');
            } else {
                setError('Invalid graph data 🥺💧');
            }
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            <Title title="Graph Viewer" />

            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <h3>Direction</h3>
                    <div className='radio-group'>
                        <Radio
                            name="direct"
                            value="undirected"
                            checked={direct === 'undirected'}
                            onChange={() => setDirect('undirected')}
                            label="undirected graph"
                        />
                        <Radio
                            name="direct"
                            value="directed"
                            checked={direct === 'directed'}
                            onChange={() => setDirect('directed')}
                            label="directed graph"
                        />
                    </div>

                    <h3>Weight</h3>
                    <div className='radio-group'>
                        <Radio
                            name="weight"
                            value="unweighted"
                            checked={weight === 'unweighted'}
                            onChange={() => setWeight('unweighted')}
                            label="unweighted"
                        />
                        <Radio
                            name="weight"
                            value="weighted"
                            checked={weight === 'weighted'}
                            onChange={() => setWeight('weighted')}
                            label="weighted"
                        />
                    </div>

                    {error && <div className="error">{error}</div>}
                    <Textarea
                        name="graph_data"
                        value={graphData}
                        onChange={(e) => setGraphData(e.target.value)}
                    />
                    <div>
                        <input className="submit-btn" type="submit" value="View" />
                    </div>
                </form>

                <div className='result'>
                    {isLoading && <div className="spinner"></div>}
                    {!isLoading && graphUrl && <img src={`data:image/png;base64,${graphUrl}`} alt="Graph" />}
                </div>
            </div>
        </div>
    );
}