import React, { useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import '../../assets/scss/pages/pagescustom.scss'
import aveter from '../../assets/images/avatars/01.png'
import searchicon from '../../assets/images/icons/search.svg'

//axios
import axios from 'axios';
//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
import { findByText } from '@testing-library/react'
import ShippedIcon from '../../assets/images/icons/shipped.png';
import DeliveryIcom from '../../assets/images/icons/delivered.png'
import RefundIcon from '../../assets/images/icons/refund.png'
import PdfIcon from '../../assets/images/icons/filetype-pdf.svg'
import { SuccsessModel as SuccsessModel } from "../../components/models";
import { ShippedModel as ShippedModel } from "../../components/models";
import { DeliveryModel as DeliveryModel } from "../../components/models";
//pdf downlody'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FabricType from './fabricType'
const Order = () => {
    const [loader, setLoader] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [orderListCount, setOrderListCount] = useState(0);
    const [selectedStatusId, setSelectedStatusId, selectedStatusIdRef] = useState('');
    const [fromDate, setFromDate, fromDateRef] = useState('');
    const [toDate, setToDate, toDateRef] = useState('');
    const [maxDate, setMaxdate, maxDateRef] = useState('');
    const [searchText, setSearchText, searchTextRef] = useState('');
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    const [shippedModelShow, setShippedModelShow] = useState(false);
    const [orderTrackId, setorderTrackId, orderTrackIdRef] = useState('');
    const [orderExpectDeliveryDate, setOrderExpectDeliveryDate, orderExpectDeliveryDateRef] = useState('');
    const [shippedModelErrMsg, setShippedModelErrMsg] = useState('');
    const [shippedLoader, setShippedLoader] = useState(false);
    const [orderId, setOrderId, orderIdRef] = useState('');
    const [postalServiceList, setPostalServiceList] = useState([]);
    const [selectedPostalService, setSelectedPostalService, selectedPostalServiceRef] = useState('0');
    const [deliveryModelShow, setDeliveryModelShow] = useState(false);
    const [deliveryModelLoader, setDeliveryModelLoader] = useState(false);
    const [deliveryModelMsg, setDeliveryModelMsg] = useState('');
    const [downloadOrderData, setdownloadOrderData] = useState({});
    const [refundData, setRefundData, refundDataRef] = useState({});
    const [refundModelShow, setRefundModelShow] = useState(false);
    const [refundModelMsg, setRefundModelMsg] = useState('');
    const [refundModelLoader, setRefundModelLoader] = useState(false);
    useEffect(() => {
        init()

    }, []);

    async function init() {
        try {
            await defaultValue();
            await getOrderList();
            await getPostalServiceList();
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function defaultValue() {
        try {
            setSelectedStatusId('All');
            setMaxdate(new Date().toLocaleString('en-ZA', { year: "numeric", month: "numeric", day: "numeric", }).replaceAll('/', '-'));

        } catch (error) {
            console.log('error : ', error);
        }
    }
    function Refund() {
        try {
            // const client = razorpay.Client(auth=("rzp_test_HDbOCjtb5npYYQ", 
            // "cVTCyfz84iWHt28eUUjAJJ7X"))

            // client.payments.refund('pay_NpPQClxsSI4Pc2', {
            //     "amount": "100",
            //     "speed": "optimum",
            //     "notes": {
            //         "notes_key_1": "Beam me up Scotty.",
            //         "notes_key_2": "Engage"
            //     },
            //     "receipt": "Receipt No. 31"
            // })
            //     .then(response => {
            //         console.log(response);
            //     })
            //     .catch(error => {
            //         // Handle error
            //     });
            let data = JSON.stringify({
                "amount": 100,
                "speed": "optimum",
                "receipt": "Receipt No. 31",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                }
            })
            axios({
                // method: "post",
                // url: "https://api.razorpay.com/v1/payments/pay_NpPQClxsSI4Pc2/refund",
                // headers: {
                //     'Authorization':  "rzp_test_HDbOCjtb5npYYQ" + ':' + "cVTCyfz84iWHt28eUUjAJJ7X",
                //     'Content-Type': 'application/json'
                // },
                // data: {
                //     "amount": 100,
                //     "speed": "optimum",
                //     "receipt": "Receipt No. 31",
                //     "notes": {
                //         "notes_key_1": "Tea, Earl Grey, Hot",
                //         "notes_key_2": "Tea, Earl Grey… decaf."
                //     }
                // }
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.razorpay.com/v1/payments/pay_NpPQClxsSI4Pc2/refund',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic cnpwX3Rlc3RfSERiT0NqdGI1bnBZWVE6Y1ZUQ3lmejg0aVdIdDI4ZVVVakFKSjdY'
                },
                data: data
            })
                .then(function (response) {

                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {

        }
    }
    async function getPostalServiceList() {
        try {
            axios({
                method: "get",
                url: Apipath['GetDropDownPostalService'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        setPostalServiceList(response.data.data)
                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function getOrderList() {
        try {
            if (window.GetOrderDetailsList) {
                window.GetOrderDetailsList.cancel();
            }
            window.GetOrderDetailsList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": searchTextRef.current,
                "limit": skipCountRef.current,
                "skip": skipCountRef.current * currentPageRef.current - skipCountRef.current,
                "status": selectedStatusIdRef.current,
                "from_date": fromDateRef.current,
                "to_date": toDateRef.current
            }
            axios({
                method: "post",
                url: Apipath['GetOrderDetailsList'],
                headers: {
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetOrderDetailsList.token,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {
                        if (response.data.data[0].data.length > 0) {
                            setOrderList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setOrderList([]);
                            setTotalPageCount(0);
                        }

                    }
                    else {
                    }
                })
                .catch(function (error) {
                    // handle error
                    setLoader(false);
                    console.log(error);
                })
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function clearBtn() {
        try {
            setSearchText('');
            setFromDate('');
            setToDate('');
            setSelectedStatusId('All');
            setCurrentPage(1);
            getOrderList()

        } catch (error) {
            console.log('error : ', error);
        }
    }
    function toDateOnChange(e) {
        try {
            setToDate(e.target.value);
            setCurrentPage(1);
            getOrderList()
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function fromDateOnChange(e) {
        try {
            setFromDate(e.target.value);
            if (fromDateRef.current == '') {
                setToDate('');
            }
            setCurrentPage(1);
            getOrderList();
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function handlePageClick(e) {
        try {
            let value = e.selected + 1
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                getOrderList();
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function shippedBtn(data) {
        try {
            await shippedClearDate()
            setOrderId(data.order_details_id)
            setShippedModelShow(true);
            if (data.delivery_status != 'ordered') {
                setorderTrackId(data.track_id)
                setOrderExpectDeliveryDate(data.expected_delivery_date);
                setSelectedPostalService(data.postal_service_id == '' ? 0 : data.postal_service_id);
            }

        } catch (error) {
            console.log('error : ', error);
        }
    }
    function shippedClearDate() {
        try {
            setorderTrackId('');
            setOrderExpectDeliveryDate('');
            setShippedModelErrMsg('');
            setSelectedPostalService('0');
            setShippedLoader(false)
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function shippedValidation() {
        try {
            if (orderTrackIdRef.current == '') {
                setShippedModelErrMsg('Please Enter Track Id')
                return false
            }
            else {
                return true
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function updateShipedStatus() {
        try {
            let validate = await shippedValidation()
            if (validate) {
                setShippedLoader(true);
                let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
                let postData = {
                    "shipped_date": maxDateRef.current,
                    "track_id": orderTrackIdRef.current,
                    "delivery_status": "shipped",
                    "expected_delivery_date": orderExpectDeliveryDateRef.current,
                    "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                    "update_by": user_data[0].user_id,

                }
                axios({
                    method: "put",
                    url: Apipath['UpdateOrderDetails'] + orderIdRef.current,
                    headers: {
                        // 'Authorization': `bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: postData,
                })
                    .then(function (response) {
                        setShippedLoader(false);
                        setShippedModelShow(false);
                        if (response.data.error_code == '9999') {

                            getOrderList()
                        }
                        else {

                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }

        } catch (error) {
            console.log('error : ', error);
        }
    }
    function shippedModelColseBtn() {
        try {
            setShippedModelShow(false);
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function deliveryBtn(data) {
        try {
            setOrderId(data.order_details_id)
            setDeliveryModelMsg('Are You Sure to Update the Status is Delivered');
            setDeliveryModelLoader(false)
            setDeliveryModelShow(true)
        } catch (error) {

        }
    }
    function deliveryStatusUpdateBtn() {
        try {
            setDeliveryModelLoader(true);
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            console.log(orderIdRef.current)
            let postData = {
                "delivery_date": maxDateRef.current,
                "delivery_status": "received",
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                "update_by": user_data[0].user_id,

            }
            console.log(postData);
            axios({
                method: "put",
                url: Apipath['UpdateOrderDetails'] + orderIdRef.current,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {
                    setDeliveryModelLoader(false);
                    setDeliveryModelShow(false);
                    if (response.data.error_code == '9999') {

                        getOrderList()
                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function deliveryModelColseBtn() {
        try {
            setDeliveryModelShow(false)
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function downloadPDF(orderDetails) {
        // const capture = document.querySelector('.invoice').innerHTML;

        // html2canvas(capture).then((canvas) => {
        //     const imgData = canvas.toDataURL('img/png');
        //     const doc = new jsPDF('p', 'mm', 'a4');
        //     // const componentWidth = doc.internal.pageSize.getWidth();
        //     // const componentHeight = doc.internal.pageSize.getHeight();
        //     var ratio = canvas.width / canvas.height;
        //     var width = doc.internal.pageSize.getWidth();
        //     var height = width / ratio;
        //     doc.addImage(imgData, 'PNG', 0, 0, width, height);

        //     doc.save('receipt.pdf');
        // })
        await setdownloadOrderData(orderDetails);
        document.getElementById('invoice').style.display = 'block'
        html2canvas(document.getElementById('invoice'), {
            scale: 1, // Adjust the scale as needed
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('portrait', 'pt', 'a4');
            var ratio = canvas.width / canvas.height;
            var width = doc.internal.pageSize.getWidth();
            var height = width / ratio;
            doc.addImage(imgData, 'PNG', 0, 0, width, height); // A4 dimensions
            doc.save('Invoice.pdf');
        });
        document.getElementById('invoice').style.display = 'none'
        // let pdf = new jsPDF('p', 'pt', 'a4');
        // pdf.html(document.getElementById('invoice'), {
        //     html2canvas: {
        //         scale: 0.5, // Adjust this value based on the zoom level
        //     },
        //     callback: function () {
        //         // Save or display the PDF
        //         window.open(pdf.output('bloburl'));
        //     },
        // });
    }
    async function refundBtn(data) {
        try {
            await setRefundData(data);
            setRefundModelMsg('Are You Sure To Refund price ?');
            setRefundModelLoader(false);
            setRefundModelShow(true);
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function getRefundPrice() {
        try {
            setRefundModelLoader(true);
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let postData = {
                "order_details_id": refundDataRef.current.order_details_id,
                "order_id": refundDataRef.current.order_id
            }
            await axios({
                method: "post",
                url: Apipath['GetRefundPrice'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(async function (response) {
                    if (response.data.error_code == '9999') {
                        setRefundData({
                            ...refundDataRef.current, 'refund_price':
                                response.data.data[0].total_price,
                            'refund_trance_id': response.data.data[0].order[0].transaction_id
                        });
                        console.log(refundDataRef.current);
                        await razorpayRefund()
                        // setRefundModelLoader(false);
                        // setRefundModelShow(false);

                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function razorpayRefund() {
        try {
            if (refundDataRef.current.refund_trance_id != '') {
                let postData = {
                    "amount": refundDataRef.current.refund_price,
                    "payment_id": refundDataRef.current.refund_trance_id,
                }
                await axios({
                    method: "post",
                    url: Apipath['RazorpayRefund'],
                    headers: {
                        // 'Authorization': `bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: postData,
                })
                    .then(function (response) {
                        if (response.data.error_code == '9999') {
                            setRefundData({
                                ...refundDataRef.current,
                                'refund_id': response.data.data[0].id
                            });
                            console.log(refundDataRef.current);
                            saveRefund()
                            // setRefundModelLoader(false);
                            // setRefundModelShow(false);

                        }
                        else {

                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }
            else{
                setRefundData({
                    ...refundDataRef.current,
                    'refund_id': ''
                });
                saveRefund()
            }

        } catch (error) {

        }
    }
    async function saveRefund() {
        try {
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let postData = {
                "refund_id": "0",
                "user_id": refundDataRef.current.user_id,
                "product_id": refundDataRef.current.product_id,
                "sub_product_id": refundDataRef.current.sub_product_id,
                "order_details_id": refundDataRef.current.order_details_id,
                "refund_amount": refundDataRef.current.refund_price,
                "razorpay_refund_id": refundDataRef.current.refund_id,
                "is_active": 1,
                "create_by": user_data[0].user_id,
                "update_by": user_data[0].user_id,
                "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
            }
            await axios({
                method: "post",
                url: Apipath['InsertRefund'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {

                        setRefundModelLoader(false);
                        setRefundModelShow(false);
                        getOrderList()
                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function refundModelColse() {
        try {
            setRefundModelShow(false);
        } catch (error) {
            console.log('error : ', error);
        }
    }
    return (
        <Fragment>
            <div className='card W-100 ' >
                <div className="card-header">
                    Order
                </div>
                <div className='table_card my-3 mx-auto'>
                    <div className="row justify-content-end align-items-end">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <div className='mt-4 align-items-center input_div'>
                                <input type='search' placeholder='search...'
                                    className='input_box' id='search' value={searchText}
                                    onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1);; getOrderList() }} />

                                <img src={searchicon} className='inputlogo' />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end align-items-end">
                        <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                            <label className='label_text'>From Date</label>
                            <input type='date' className="input_tag" max={maxDate} id='from_date' value={fromDate}
                                onChange={(e) => fromDateOnChange(e)} />
                        </div>
                        <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                            <label className='label_text'>To Date</label>
                            <input type='date' className="input_tag" max={maxDate}
                                disabled={fromDate == '' ? true : false}
                                min={fromDate}
                                id='to_date' value={toDate}
                                onChange={(e) => toDateOnChange(e)} />
                        </div>
                        <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                            <label className='label_text'>Status</label>

                            <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectedStatusId}
                                onChange={(e) => { setSelectedStatusId(e.target.value); getOrderList() }}>
                                <option value='All'>All</option>
                                <option value='ordered'>Ordered</option>
                                <option value='shipped'>Shipped</option>
                                <option value='received'>Received</option>
                                <option value='completed'>Completed</option>
                            </select>
                        </div>
                        <div className="col-sm-4 mt-1 col-md-4 col-lg-2 col-xl-2">
                            <button className='addBtn' onClick={() => clearBtn()}>Clear</button>
                        </div>

                    </div>
                    <div style={{ height: "53vh", overflowY: "scroll" }} className='mt-2'>
                        <table className='w-100'>
                            <thead>
                                <tr className='thead_border'>
                                    <th> Product ID</th>
                                    <th>Product</th>
                                    <th> Buyer Name</th>
                                    <th>Order ID</th>
                                    <th> Price</th>
                                    <th>Status </th>
                                    <th>Address </th>
                                    <th>Date of order</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loader &&
                                    <tr className="text-center" colSpan="16">
                                        <th colSpan="8"  >
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </th> </tr>
                                }
                                {!loader && orderList.length == 0 &&
                                    <tr className="text-center" colSpan="16">
                                        <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                {!loader && orderList.length > 0 &&
                                    orderList.map((orderDetails, index) => (
                                        <tr>
                                            <td>{orderDetails.product_id}</td>
                                            <td title={orderDetails.product.length > 0 ? orderDetails.product[0].product_name : ''}>{orderDetails.product.length > 0 ? orderDetails.product[0].product_name : ''}</td>
                                            <td title={orderDetails.users.length > 0 ? orderDetails.users[0].user_name : ''}>{orderDetails.users.length > 0 ? orderDetails.users[0].user_name : ''}</td>
                                            <td title={orderDetails.order_details_id}>{orderDetails.order_details_id}</td>
                                            <td >₹{orderDetails.total_price}</td>
                                            <td >{orderDetails.delivery_status}</td>
                                            <td title={orderDetails.order.length > 0 ? orderDetails.order[0].city : ''}>{orderDetails.order.length > 0 ? orderDetails.order[0].city : ''}</td>
                                            <td >
                                                {new Date(orderDetails.ordered_date).toLocaleString('en-GB', { year: "numeric", month: "numeric", day: "numeric", }).replaceAll('/', '-')}</td>

                                            <td className='d-flex gap-2'>{orderDetails.delivery_status == 'ordered' ?
                                                <div className='d-flex gap-2'>
                                                    <img title='Shipped' src={ShippedIcon} className='order_action_icon' onClick={() => shippedBtn(orderDetails)} />
                                                    <img title='Refund' src={RefundIcon} className='order_action_icon' onClick={() => refundBtn(orderDetails)} />
                                                </div> :
                                                orderDetails.delivery_status == 'shipped' ? <div className='d-flex gap-2'>
                                                    <img title='Shipped' src={ShippedIcon} className='order_action_icon' onClick={() => shippedBtn(orderDetails)} />
                                                    <img title='Delivered' src={DeliveryIcom} className='order_action_icon' onClick={() => deliveryBtn(orderDetails)} />
                                                </div>
                                                    : <span></span>}{<img title='Pdf' src={PdfIcon} className='order_action_icon' onClick={() => downloadPDF(orderDetails)} />}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {totalPageCount > 0 &&
                        <div className='d-flex justify-content-end align-items-center mt-3'>
                            <ReactPaginate
                                pageCount={totalPageCount}
                                // pageRangeDisplayed={3}
                                // marginPagesDisplayed={2}
                                onPageChange={handlePageClick}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                previousLabel={'<'}
                                nextLabel={'>'}
                                renderOnZeroPageCount={null}
                            // forcePage={currentPage - 1}
                            // disabledClassName={'disabled'}
                            />
                        </div>
                    }
                    {/* <button onClick={() => downloadPDF()}>
                       
                    </button> */}
                    <div >
                        <div id='invoice' style={{ display: 'none' }} >
                            <div className='Header' style={{ margin: "5px 20px" }}>
                                Thank You For Your Order
                            </div>
                            {downloadOrderData &&
                                <div className='pdf_container'>

                                    <div >
                                        <div className='user_name'>
                                            Hi {downloadOrderData?.users?.length > 0 ? downloadOrderData?.users[0].user_name : ''}
                                        </div>
                                        <div className='order_msg'>
                                            Just to let you Know we received your order, and it is now begin processed
                                        </div>
                                    </div>
                                    <div className='delivery_date'>
                                        {new Date(downloadOrderData?.ordered_date).toLocaleDateString("en", { month: "long", day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className='order_table' >
                                        <table className='w-100'>
                                            <thead>
                                                <tr className='thead_border'>

                                                    <th>Product</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div>{downloadOrderData?.order_details_id}</div>
                                                        <div>{downloadOrderData?.product?.length > 0 ? downloadOrderData?.product[0].product_name : ''}</div>
                                                        {/* <div>Size : XL</div> */}

                                                    </td>
                                                    <td>{downloadOrderData?.quantity}</td>
                                                    <td>₹ {downloadOrderData?.total_price}</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                {/* <tr>
                                               <td colspan="2" style={{ textAlign: 'left' }}>Sub Total : </td>
                                               <td>2</td>
                                           </tr> */}
                                                <tr>
                                                    <td colspan="2" style={{ textAlign: 'left' }}>Delivery Charge : </td>
                                                    <td>₹ {downloadOrderData?.delivery_amount}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ textAlign: 'left' }}>GST : </td>
                                                    <td>₹ {downloadOrderData?.gst_price}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ textAlign: 'left' }}>Total : </td>
                                                    <td>₹ {downloadOrderData?.total_price + downloadOrderData?.delivery_amount + downloadOrderData?.gst_price}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div >
                                        <div className='adrs_title'>Shipping address</div>
                                        <div className='adrs_value_div'>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].street : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].city : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].state : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].country : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].pincode : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].phone_number : ''}</div>
                                            <div className='adrs_value'>
                                                {downloadOrderData?.order?.length > 0 ? downloadOrderData?.order[0].email : ''}</div>
                                        </div>
                                    </div>
                                </div>
                            }



                        </div>
                    </div>

                </div>
                {shippedModelShow &&
                    <ShippedModel
                        show={shippedModelShow}
                        trackId={orderTrackId}
                        expectDeliveryDate={orderExpectDeliveryDate}
                        errorMsgText={shippedModelErrMsg}
                        setTrackId={setorderTrackId}
                        setExpectDeliveryDate={setOrderExpectDeliveryDate}
                        setErrorMsgText={setShippedModelErrMsg}
                        functionName={updateShipedStatus}
                        colseModel={shippedModelColseBtn}
                        modelMaxDate={maxDate}
                        loader={shippedLoader}


                    />

                }
                {deliveryModelShow &&
                    <DeliveryModel
                        show={deliveryModelShow}
                        message={deliveryModelMsg}
                        loader={deliveryModelLoader}
                        functionName={deliveryStatusUpdateBtn}
                        colseModel={deliveryModelColseBtn}
                    />
                }
                {refundModelShow &&
                    <DeliveryModel
                        show={refundModelShow}
                        message={refundModelMsg}
                        loader={refundModelLoader}
                        functionName={getRefundPrice}
                        colseModel={refundModelColse}
                    />
                }
            </div>
        </Fragment>
    )
}
export default Order;



