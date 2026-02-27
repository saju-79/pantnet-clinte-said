import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts"
// const data  = [
//     { date: "2026-02-25", revenue: 14, order: 3 },
//     { date: "2026-02-26", revenue: 25, order: 4 }
// ]
const OrderChart = ({barChartData =[]}) => {

    if (!barChartData.length) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-400">
                No data available
            </div>
        )
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="300">
                <BarChart data={barChartData}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey= "order"
                        fill="#6366f1"
                        radius={[6, 6, 0, 0]}
                    />

                    <Bar
                        dataKey="revenue"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OrderChart