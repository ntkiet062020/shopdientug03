import axios from 'axios';
import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/admin/Chart";


export default function ChartIncome() {
    const [userStats, setUserStats] = useState([]);


    const MONTHS = useMemo(
        () => [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        []
    );


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('/api/v1/admin/orders/income')
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Danh thu": item.total },
                    ])
                );

            } catch { }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div>
            <Chart
                data={userStats}
                title="Doanh thu hàng tháng"
                grid
                dataKey="Doanh thu"
            />
        </div>
    );
}