import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function Home() {
    return (
        <div>
            <main>
                <h1>Graph Viewer</h1>
                {/* <p>{{ error }}</p> */}
                <form action="/view" method="post">
                    {/* 向きがあるか */}
                    <label>
                        <input type="radio" name="direct" value="undirected" checked /> 無向グラフ
                    </label>
                    <label>
                        <input type="radio" name="direct" value="directed" /> 有向グラフ
                    </label>
                    <br /><br />

                    {/* 重みがあるか */}
                    <label>
                        <input type="radio" name="weight" value="unweighted" checked /> 重みなし
                    </label>
                    <label>
                        <input type="radio" name="weight" value="weighted" /> 重みつき
                    </label>
                    <br /><br />

                    {/* グラフのデータ */}
                    <textarea name="graph_data" rows="10" cols="30"></textarea>
                    <br />

                    {/* 送信 */}
                    <input type="submit" value="Submit" />
                </form>

                <h2>入力例</h2>
                <p>
                    例1: 重みなし
                    <br />
                    1 2
                    <br />
                    2 3
                    <br />
                    3 4
                    <br />
                    4 1
                </p>
                <p>
                    例2: 重みつき
                    <br />
                    1 2 3
                    <br />
                    2 3 4
                    <br />
                    3 4 5
                    <br />
                    4 1 6
                </p>

                {/* {% if graph_url %}
                    <img src="data:image/png;base64,{{ graph_url }}" alt="Graph">
                {% endif %} */}

            </main>
            <footer>

            </footer>
        </div>
    );
}
