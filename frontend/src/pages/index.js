import { useState } from 'react';

export default function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [direct, setDirect] = useState('undirected');
    const [weight, setWeight] = useState('unweighted');
    const [graphData, setGraphData] = useState('');
    const [graphUrl, setGraphUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${apiUrl}/api/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "direct": direct, "weight": weight, "graph_data": graphData }),
        });
        const data = await response.json();
        setGraphUrl(data.graph_url);
    };

    return (
        <div>
            <h1>Graph Viewer</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        name="direct"
                        value="undirected"
                        checked={direct === 'undirected'}
                        onChange={() => setDirect('undirected')}
                    /> 無向グラフ
                </label>
                <label>
                    <input
                        type="radio"
                        name="direct"
                        value="directed"
                        checked={direct === 'directed'}
                        onChange={() => setDirect('directed')}
                    /> 有向グラフ
                </label>
                <br /><br />

                <label>
                    <input
                        type="radio"
                        name="weight"
                        value="unweighted"
                        checked={weight === 'unweighted'}
                        onChange={() => setWeight('unweighted')}
                    /> 重みなし
                </label>
                <label>
                    <input
                        type="radio"
                        name="weight"
                        value="weighted"
                        checked={weight === 'weighted'}
                        onChange={() => setWeight('weighted')}
                    /> 重みつき
                </label>
                <br /><br />

                <textarea
                    name="graph_data"
                    rows="10"
                    cols="30"
                    value={graphData}
                    onChange={(e) => setGraphData(e.target.value)}
                ></textarea>
                <br />

                <input type="submit" value="Submit" />
            </form>

            {graphUrl && <img src={`data:image/png;base64,${graphUrl}`} alt="Graph" />}
        </div>
    );
}