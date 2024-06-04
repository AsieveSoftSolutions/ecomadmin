import React, { useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import edit from '../../assets/images/icons/edit.svg'
import logo from '../../assets/images/icons/jkLOGO3x.jpg'
//axios
import axios from 'axios';

//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
import PdfIcon from '../../assets/images/icons/filetype-pdf.svg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Invoice = () => {
    const [gridDisplay, setGridDisplay] = useState('');
    const [addDisplay, setAddDisplay] = useState('');
    const [invoiceList, setInvoiceList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [selectActiveId, setSelectActiveId] = useState('2');
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    const [downloadData, setDownloadData, downloadDataRef] = useState({});
    useEffect(() => {
        init();

    }, []);
    function init() {
        try {
            defaultValue();
            getBrandList();

        } catch (error) {
            console.log("Error", error);
        }
    }
    function defaultValue() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");
            // if (sessionStorage.getItem("edit_data") == null) {
            //     setHeaderTiltle("Add Sub Category");
            //     setButtonName("Save");
            // }
            // else {
            //     let data = JSON.parse(sessionStorage.getItem("edit_data"))
            //     setHeaderTiltle("Edit Sub Category");
            //     setButtonName("Update");
            // }

        } catch (error) {
            console.log("Error", error);

        }
    }
    function getBrandList() {
        try {

            if (window.GetOrderList) {
                window.GetOrderList.cancel();
            }
            window.GetOrderList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": '',
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current
            }
            axios({
                method: "post",
                url: Apipath['GetOrderList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetOrderList.token,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {

                        if (response.data.data[0].data.length > 0) {
                            // setDownloadData(response.data.data[0].data[1])
                            setInvoiceList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setInvoiceList([]);
                            setTotalPageCount(0);
                        }
                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {

        }
    }
    function handlePageClick(e) {
        try {
            let value = e.selected + 1
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                getBrandList();
            }
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
        await setDownloadData(orderDetails);
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


    return (
        <Fragment>
            <div>
                <div className='card W-100 p-1' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Invoice
                    </div>
                    <div className='table_card my-3 mx-auto'>

                        {/* <div className="row  justify-content-end align-items-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Status</label>
                                <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectActiveId}
                                    onChange={(e) => { setSelectActiveId(e.target.value); setCurrentPage(1); getBrandList() }}>
                                    <option value='2'>select</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>In Active</option>
                                </select>
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className=' align-items-center input_div'>
                                    <input type='search' placeholder='Search...' className='input_box' id='search'
                                        onChange={() => { setCurrentPage(1); getBrandList(); }} />
                                    <img src={searchicon} className='inputlogo'></img>
                                </div>
                            </div>
                            <div className="col-sm-4 mt-1 col-md-4 col-lg-2 col-xl-2">
                                <button className='addBtn' onClick={() => clearBtn()}>Clear</button>
                            </div>


                        </div> */}
                        <div className=" mt-2" style={{ height: "53vh", overflowY: "scroll" }} >
                            <table className=' w-100'>
                                <thead>
                                    <tr className='thead_border'>
                                        <th>S.No</th>
                                        <th>Order Id</th>
                                        <th>Buyer Name</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Delivery partner</th>
                                        <th>Oeder Date</th>
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
                                    {!loader && invoiceList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && invoiceList.length > 0 &&
                                        invoiceList.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.order_id}</td>
                                                <td>
                                                    {item.first_name + " " + item.last_name}
                                                </td>
                                                <td>{item.street}</td>
                                                <td>{item.total_price}</td>
                                                <td>{item.order_details.length>0 && item.order_details[0].postal_service.length > 0 ? item.order_details[0].postal_service[0].postal_service_name : ''}</td>
                                                <td>{item.order_date}</td>
                                                <td> <img src={PdfIcon} className='action_icon' onClick={()=>downloadPDF(item)}></img></td>
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
                                    forcePage={currentPage - 1}
                                // disabledClassName={'disabled'}
                                />
                            </div>
                        }
                    </div>

                </div>
                <div>
                    <div id='invoice'
                    style={{ display: 'none' }} 
                    >
                        {downloadData && downloadData.order_details &&
                            <div style={{ width: "90%", margin: "auto" }}>
                                <div className='d-flex justify-content-between  align-items-center'>
                                    <div style={{ height: "80px" }}>
                                        <img src={logo} style={{ height: "100%", width: "100%" }} />
                                    </div>
                                    <div style={{ fontSize: "15px", color: 'black', textAlign: "end" }} >
                                        <div>JenandJak PTE.LTD.</div>
                                        <div>Srinivasan Nagar, II nd Street</div>
                                        <div>Koyambedu</div>
                                        <div>Chennai - 600 107</div>
                                    </div>

                                </div>
                                <div style={{
                                    marginTop: "10px",
                                    width: '100%', backgroundColor: "#d2d4d7", textAlign: "center",
                                    padding: '5px 0px', fontSize: "18px", fontWeight: '600', color: 'black'
                                }}>
                                    INVOICE
                                </div>
                                <div style={{ fontSize: "15px", color: 'black' }}
                                    className='mt-3 d-flex gap-5 justify-content-between  align-items-center'>
                                    <div >
                                        <div >
                                            Billing Address :
                                        </div>
                                        <div>{downloadData.first_name + ' ' + downloadData.last_name}</div>
                                        <div>{
                                            downloadData.street
                                        }{downloadData.city != '' ? ', ' + downloadData.city : ''}
                                            {downloadData.state != '' ? ', ' + downloadData.state : ''}{' - ' + downloadData.pincode}</div>
                                    </div>
                                    <div>
                                        <div>Order Id :{downloadData.order_id} </div>
                                        <div>Order Date: {downloadData.order_date}</div>
                                    </div>
                                </div>
                                <div className='order_table' >
                                    <table className='w-100'>
                                        <thead>
                                            <tr className='thead_border'
                                                style={{ backgroundColor: "black", color: 'white' }}>

                                                <th>S.No</th>
                                                <th>Order Id</th>
                                                <th>Product Details</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Price Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {downloadData.order_details?.length > 0 &&
                                                downloadData.order_details.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.order_details_id}</td>
                                                        <td>
                                                            {item.product.length > 0 &&
                                                                <div>{item.product[0].product_name}</div>
                                                            }
                                                            {item.sub_product.length > 0 &&
                                                                item.sub_product[0].color_family &&
                                                                <div>Color: {item.sub_product[0].color_family}</div>
                                                            }
                                                            {item.sub_product.length > 0 &&
                                                                item.sub_product[0].product_size.length > 0 &&
                                                                <div>Size: {item.sub_product[0].product_size[0].size_Name}</div>
                                                            }

                                                            {/* <div>Size : XL</div> */}

                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>₹ {item.price}</td>
                                                        <td>₹ {item.total_price}</td>
                                                    </tr>
                                                ))}

                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td colspan="5" style={{ textAlign: 'left' }}>Sub Total : </td>
                                                <td>₹ {downloadData.sub_total}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="5" style={{ textAlign: 'left' }}>Delivery Charge : </td>
                                                <td>₹ {downloadData.delivery_amount}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="5" style={{ textAlign: 'left' }}>GST : </td>
                                                <td>₹ {downloadData.order_details[0].gst_price}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="5" style={{ textAlign: 'left' }}>Total : </td>
                                                <td>₹ {downloadData.total_price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Invoice;

