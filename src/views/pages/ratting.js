import React, {  useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import '../../assets/scss/pages/pagescustom.scss'
import aveter from '../../assets/images/avatars/01.png'
import searchicon from '../../assets/images/icons/search.svg'
import { findByText } from '@testing-library/react'
import edit from '../../assets/images/icons/edit.svg'
import openeye from '../../assets/images/icons/openeye.svg'
//axios
import axios from 'axios';

//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref'
import ReactPaginate from 'react-paginate';
import { RattingModel as RattingModel } from "../../components/models";
var reviewFilterValue = 'all';
var limitValue = 2;
var productId = ""
const Ratting = () => {
    const [productList, setProductList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [rattingList, setRattingList] = useState([]);
    const [rattingTotalCount, setRattingTotalCount] = useState(0);
    const [rattingLimit, setRattingLimit] = useState(0);
    const [selectedReviewFilterValue, setselectedReviewFilterValue] = useState('all');
    const [productTotalRatting, setProductTotalRatting] = useState(0);
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(7);
    const [limitCount, setLimitCount, limitCountRef] = useState(7);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    useEffect(() => {
        init()

    }, []);
    async function init() {
        try {
            await getProductList()
        } catch (error) {
            console.log("Error", error);
        }
    }
    function getProductList() {
        try {
            if (window.GetAllProductRatingList) {
                window.GetAllProductRatingList.cancel();
            }
            window.GetAllProductRatingList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current
            }
            axios({
                method: "post",
                url: Apipath['GetAllProductRatingList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetAllProductRatingList.token,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {
                        // setProductList(response.data.data[0].data);
                        if (response.data.data[0].data.length > 0) {
                            setProductList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setProductList([]);
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
            console.log("Error", error);
        }
    }
    function handlePageClick(e) {
        try {
            let value = e.selected + 1
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                getProductList();
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    async function viewBtn(value) {
        try {
            reviewFilterValue = 'all';
            setselectedReviewFilterValue('all');
            productId = value.product_id;
            setProductTotalRatting(value.rattingTotal)
            await getRattingList('first')
            setShowModel(true)
        } catch (error) {
            console.log("Error", error);
        }

    }
    async function getRattingList(value) {
        try {
            if (value == "read_more") {
                limitValue = limitValue + 20;

            }
            else if (value == 'update') {
                limitValue = limitValue
            }
            else {
                limitValue = 2
            }
            if (window.GetProductRattingList) {
                window.GetProductRattingList.cancel();
            }
            window.GetProductRattingList = axios.CancelToken.source();
            let postData = {
                "product_id": productId,
                "limit": limitValue,
                "rating_range": reviewFilterValue == "all" ? 0 : parseInt(reviewFilterValue),
                "skip": 0,
                "type": 2
            }
            await axios({
                method: "post",
                url: Apipath['GetProductRattingList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetProductRattingList.token,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {
                        if (response.data.data[0].data.length > 0) {
                            setRattingList(response.data.data[0].data)
                            setRattingTotalCount(response.data.data[0].pagination[0].total);
                            setRattingLimit(limitValue);
                        }
                        else {
                            setRattingList([])
                            setRattingTotalCount(0);
                            setRattingLimit(0);
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
    function selectedReviewFilter(value) {
        try {
            if (reviewFilterValue != value) {
                reviewFilterValue = value;
                setselectedReviewFilterValue(value);
                getRattingList("first");
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    async function closeModel() {
        try {

            setShowModel(false);
            await getProductList();
        } catch (error) {
            console.log("Error", error);
        }
    }
    function readMoreClick() {
        try {
            getRattingList('read_more')
        } catch (error) {
            console.log("Error", error);
        }
    }
    function activeOnChangeCheckbox(value, id) {
        try {
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let postData = {
                "is_active": value == 1 ? 0 : 1,
                "update_by": user_data[0].user_id,
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
            }
            axios({
                method: "put",
                url: Apipath['UpdateRatting'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getRattingList('update')
                    }
                    else {

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <Fragment>
            <div className='card W-100 ' >
                <div className="card-header">
                    Ratting
                </div>
                <div className='table_card my-3 mx-auto'>
                    <div className="row justify-content-end">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <div className='mt-4 align-items-center input_div'>
                                <input type='search' placeholder='search...' className='input_box' id='search'></input>
                                <img src={searchicon} className='inputlogo'></img>
                            </div>
                        </div>

                    </div>
                    <div style={{ height: "53vh", overflowY: "scroll" }} className='mt-2'>
                        <table className='w-100'>
                            <thead>
                                <tr className='thead_border'>
                                    <th>S.No</th>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Over All Ratting</th>
                                    <th>No.of Users</th>
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
                                {!loader && productList.length == 0 &&
                                    <tr className="text-center" colSpan="16">
                                        <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                {!loader && productList.length > 0 &&
                                    productList.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.product_id}</td>
                                            <td>{item.product_name.length > 0 ? item.product_name[0] : ""}</td>
                                            <td>{item.rattingTotal}</td>
                                            <td>{item.count}</td>
                                            <td> <img src={openeye} className='action_icon' onClick={() => viewBtn(item)}></img></td>
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
                        </div>}
                </div>
            </div>
            {showModel &&
                <RattingModel
                    show={showModel}
                    reviewFilterValue={selectedReviewFilterValue}
                    functionName1={selectedReviewFilter}
                    modelClose={closeModel}
                    reviewList={rattingList}
                    reviewCount={rattingTotalCount}
                    reviewLimit={rattingLimit}
                    readMoreFunction={readMoreClick}
                    reviewTotal={productTotalRatting}
                    activeOnChange={activeOnChangeCheckbox}
                />}
        </Fragment>
    )
}
export default Ratting;