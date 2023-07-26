import React, { Fragment, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Link } from 'react-router-dom';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';

import { allOrders } from '../../actions/orderActions';
import { getAdminProducts } from '../../actions/productActions';
import { allUsers } from '../../actions/userActions';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // status order
    let da_dat_hang = 0;
    let dang_van_chuyen = 0;
    let da_giao_hang = 0;
    orders &&
        orders.forEach((order) => {
            if (order.orderStatus === "Đã đặt hàng") {
                da_dat_hang += 1;
            }
            if (order.orderStatus === "Đang vận chuyển") {
                dang_van_chuyen += 1;
            }
            if (order.orderStatus === "Đã giao hàng") {
                da_giao_hang += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch]);

    // let totalAmountall = 0;
    // orders &&
    //     orders.forEach((product) => {
    //         totalAmountall += product.totalPrice;
    //     });
    // Chart Line tính tổng doanh thu
    // const lineState = {
    //     labels: ["Số tiền ban đầu", "Tổng danh thu hiện tại"],
    //     datasets: [
    //         {
    //             label: "TỔNG DOANH THU",
    //             backgroundColor: ["blue"],
    //             hoverBackgroundColor: ["rgb(197, 72, 49)"],
    //             data: [0, totalAmountall],
    //         },
    //     ],
    // };
    // Doughnut tính số lượng hàng còn và hết hàng
    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    // Doughnut thống kê trạng thái đơn hàng
    const doughnutStateOrder = {
        labels: ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700"],
                data: [da_dat_hang, dang_van_chuyen, da_giao_hang],
            },
        ],
    };
    // radar chart
    // let tainghe_loa = 0;
    // let camera_thietbi = 0;
    // let dienthoai_laptop = 0;
    // let tv_tulanh = 0;
    // let maygiat = 0;
    // let dieuhoa = 0;
    // let maylocnuoc = 0;
    // let mayruabat = 0;
    // let mayeptraicay = 0;
    // let lonuong_lovisong = 0;
    // products &&
    //     products.forEach((product) => {
    //         if (product.category === "Tai nghe-Loa") {
    //             tainghe_loa += 1;
    //         }
    //         if (product.category === "Camera-Thiết bị quay phim") {
    //             camera_thietbi += 1;
    //         }
    //         if (product.category === "Điện thoại-Laptop") {
    //             dienthoai_laptop += 1;
    //         }
    //         if (product.category === "TV-Tủ Lạnh") {
    //             tv_tulanh += 1;
    //         }
    //         if (product.category === "Máy giặt") {
    //             maygiat += 1;
    //         }
    //         if (product.category === "Máy điều hoà") {
    //             dieuhoa += 1;
    //         }
    //         if (product.category === "Máy lọc nước") {
    //             maylocnuoc += 1;
    //         }
    //         if (product.category === "Máy rửa bát") {
    //             mayruabat += 1;
    //         }
    //         if (product.category === "Máy ép trái cây") {
    //             mayeptraicay += 1;
    //         }if (product.category === "Lò nướng - Lò vi sóng") {
    //             lonuong_lovisong += 1;
    //         }
    //     });
    // const data = {
    //     labels: [
    //     'Tai nghe-Loa',
    //     'Camera-Thiết bị quay phim',
    //     'Điện thoại-Laptop',
    //     'TV-Tủ Lạnh',
    //     'Máy giặt',
    //     'Máy điều hoà',
    //     'Máy lọc nước',
    //     "Máy rửa bát",
    //     'Máy ép trái cây ',
    //     'Lò nướng - Lò vi sóng'
    //     ],
    //     datasets: [{
    //         label: 'Danh mục sản phẩm',
    //         data: [tainghe_loa, camera_thietbi, dienthoai_laptop, tv_tulanh, maygiat, dieuhoa, maylocnuoc,mayruabat, mayeptraicay, lonuong_lovisong],
    //         fill: true,
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgb(54, 162, 235)',
    //         pointBackgroundColor: 'rgb(54, 162, 235)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgb(54, 162, 235)'
    //     }]
    // };

    return (
        <Fragment>
            <div class="grid-bg ba-grid anim">
                <div class="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <h1 className="my-4">Tổng quan</h1>

                            {loading ? <Loader /> : (
                                <Fragment>
                                    <MetaData title={'Admin Dashboard'} />

                                    <div className="row pr-4">
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-primary o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng danh thu<br /> <b>{totalAmount && totalAmount.toLocaleString()} VNĐ</b>
                                                    </div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-success o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng sản phẩm<br /> <b>{products && products.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-danger o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng hóa đơn<br /> <b>{orders && orders.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-info o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng người dùng<br /> <b>{users && users.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>Tình trạng số lượng hàng</h6>
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutState} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>Tình trạng đơn hàng</h6>
                                                    {/* Doughnut Chart */}
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutStateOrder} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-xl-6 col-sm-12 mb-3"> */}
                                            {/* <div className="card text-white bg-light o-hidden h-100"> */}
                                                {/* <div className="card-body"> */}
                                                    {/* <h6 className='text-dark'>Tổng doanh thu</h6> */}
                                                    {/* Line chart */}
                                                    {/* <div className="lineChart"> */}
                                                        {/* <Line */}
                                                            {/* data={lineState} */}
                                                        {/* /> */}
                                                    {/* </div> */}
                                                {/* </div> */}
                                            {/* </div> */}
                                        {/* </div> */}

                                    </div>
                                </Fragment>
                            )}

                            {/* <div className='row'> */}

                                {/* <div className='col-md-6'> */}
                                    {/* <ChartIncome /> */}
                                {/* </div> */}
                                {/* <div className='radar col-md-5 card text-white bg-light'> */}

                                    {/* <Radar
                                        data={data}
                                    /> */}
                                {/* </div> */}
                            {/* </div> */}

                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Dashboard