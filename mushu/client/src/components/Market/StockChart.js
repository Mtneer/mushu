
import react from "react";
import { useContext } from react;
import { StockDataContext } from "../../providers/StockDataProvider";

export const StockChart = (symbol) => {

    const { getStockDataBySymbol } = useContext(StockDataContext);

    const [stockData, setStockData] = useState([]);

    // Fetch daily stock chart for TSLA when the component mounts
    useEffect(() => {
        const fetchStockData = async () => {
            const result = await getDailyChartForSymbol(symbol);

            setStockData(formatStockData(result.data['Time Series (Daily)']));
        };

        fetchStockData();
    }, []);

    return (
        <ChartCanvas width={width} height={400}
                margin={{left: 50, right: 50, top:10, bottom: 30}} type={type}
                seriesName="MSFT"
                data={data}
                xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
                xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>

            <Chart id={1} yExtents={d => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                <YAxis axisAt="left" orient="left" ticks={5} />
                <CandlestickSeries />
            </Chart>
        </ChartCanvas>
    );
};

function formatStockData(stockData) {
    // Convert stockData from an object to an array
    return Object.entries(stockData).map(entries => {
        const [date, priceData] = entries;

        return {
            date,
            open: Number(priceData['1. open']),
            high: Number(priceData['2. high']),
            low: Number(priceData['3. low']),
            close: Number(priceData['4. close'])
        }
    });
}

export default StockChart;