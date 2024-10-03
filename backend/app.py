import matplotlib
matplotlib.use('Agg')

from flask import Flask, render_template, request
import networkx as nx
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://graph-view-nq4y.vercel.app"])  # 許可するオリジンを指定

@app.route('/api/view', methods=['POST'])
def submit():
    ERROR_MSG = '入力が不正です。'

    # 入力
    data = request.get_json()
    direct = data['direct']
    weight = data['weight']
    graph_data = data['graph_data']

    try:
        if weight == 'unweighted':
            if direct == 'undirected':
                # 無向グラフ
                G = nx.parse_edgelist(graph_data.split('\n'), nodetype=int, create_using=nx.Graph())
            else:
                # 有向グラフ
                G = nx.parse_edgelist(graph_data.split('\n'), nodetype=int, create_using=nx.DiGraph())
    
        elif weight == 'weighted':
            edges = []
            for line in graph_data.split('\n'):
                parts = line.split()
                if len(parts) == 3:
                    u, v, w = map(int, parts)
                    edges.append((u, v, w))
            if direct == 'directed':
                # 重み付き有向グラフ
                G = nx.DiGraph()
            else:
                # 重み付き無向グラフ
                G = nx.Graph()
            G.add_weighted_edges_from(edges)

        # グラフを描画して画像として保存
        plt.clf()
        img = io.BytesIO()
        pos = nx.spring_layout(G)
        if weight == 'weighted':
            weights = nx.get_edge_attributes(G, 'weight')
            nx.draw(G, pos, with_labels=True, node_color='skyblue')
            nx.draw_networkx_edge_labels(G, pos, edge_labels=weights)
        else:
            nx.draw(G, pos, with_labels=True, node_color='skyblue')
        plt.savefig(img, format='png')
        img.seek(0)
        graph_url = base64.b64encode(img.getvalue()).decode()
        print(graph_url)
        return {
            'graph_url': graph_url
        }
    
    except Exception as e:
        return {
            'error': ERROR_MSG,
        }

if __name__ == '__main__':
    app.run(debug=True)