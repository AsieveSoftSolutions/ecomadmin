import React, { useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import '../../assets/scss/pages/pagescustom.scss'
import aveter from '../../assets/images/avatars/01.png'
import searchicon from '../../assets/images/icons/search.svg'

//axios
import axios from 'axios';

//apipath
import Apipath from '../../config/apipath'
import { isFluxStandardAction } from '@reduxjs/toolkit'
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
const Customer = () => {
    const [cutomerList, setCutomerList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    useEffect(() => {
        GetCustomerList()

    }, []);

    function GetCustomerList() {
        try {
            setLoader(true);
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current
            }
            axios({
                method: "post",
                url: Apipath['GetCustomerList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {
                        setCutomerList(response.data.data);
                        if (response.data.data[0].data.length > 0) {
                            setCutomerList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setCutomerList([]);
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
            console.log("error:", error)
        }
    }
    function handlePageClick(e) {
        try {
            let value = e.selected + 1
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                GetCustomerList();
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function searchOnChange(value) {
        try {
            setSearch(value);
            setCurrentPage(1);
            GetCustomerList()
        } catch (error) {

        }
    }
    return (
        <Fragment>
            <div className='card W-100 ' >
                <div className="card-header">
                    Customers
                </div>
                <div className='table_card my-3 mx-auto'>
                    <div className="row justify-content-end">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <div className='mt-1 align-items-center input_div'>
                                <input type='search' placeholder=' Search..' id="search" className='input_box'
                                    value={search} onChange={(e) => searchOnChange(e.target.value)} />
                                <img src={searchicon} className='inputlogo'></img>
                            </div>
                        </div>

                    </div>
                    <div style={{ height: "53vh", overflowY: "scroll" }} className='mt-2'>
                        <table className='w-100'>
                            <thead>
                                <tr className='thead_border'>
                                    <th >Pofile</th>
                                    <th> Customer ID</th>
                                    <th>Customer Name</th>
                                    <th> Address</th>
                                    <th>Customer Number</th>
                                    <th>Last Buy </th>
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
                                {!loader && cutomerList.length == 0 &&
                                    <tr className="text-center" colSpan="16">
                                        <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                {!loader && cutomerList.length > 0 &&
                                    cutomerList.map((customer, index) => (
                                        <tr>
                                            <td><img src={aveter} style={{ width: "30px" }}></img></td>
                                            <td>{customer.user_id}</td>
                                            <td>{customer.user_name}</td>
                                            <td >{customer.address.length != 0 ? customer.address[0].street : ""}</td>
                                            <td >{customer.address.length != 0 ? customer.address[0].phone_number : ""}</td>
                                            <td >Kurthi</td>
                                        </tr>
                                    ))
                                }

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
        </Fragment>
    )
}
export default Customer;