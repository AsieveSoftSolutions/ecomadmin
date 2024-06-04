import React, { useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import edit from '../../assets/images/icons/edit.svg'
import deleteimage from '../../assets/images/icons/delete.svg'
import addicon from '../../assets/images/icons/addicon.svg'
import searchicon from '../../assets/images/icons/search.svg'
import bactBtnIcon from '../../assets/images/icons/bactBtn.svg'
import addbtnicon from '../../assets/images/icons/addbtnicon.svg'
//axios
import axios from 'axios';

//apipath
import Apipath from '../../config/apipath';
import AddEditModel from "../../components/models";
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
var subCategoryList = [];
const SubCategory = () => {
    const [gridDisplay, setGridDisplay] = useState('');
    const [addDisplay, setAddDisplay] = useState('');
    const [categoryDropdownList, setCategoryDropdownList] = useState([]);
    const [selectCategoryId, setSelectCategoryId] = useState("0");
    const [subCategoryDrobdownList, setSubCategoryDrobdownList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState('');
    const [headerTiltle, setHeaderTiltle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [selectFilterCategoryId, setSelectFilterCategoryId] = useState("0");
    const [selectActiveId, setSelectActiveId] = useState('2');
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            defaultValue();
            categoryDropdown();
            getSubCategoryList();
        } catch (error) {
            console.log("Error", error);
        }
    }
    function defaultValue() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");
            if (sessionStorage.getItem("edit_data") == null) {
                setHeaderTiltle("Add Sub Category");
                setButtonName("Save");
            }
            else {
                let data = JSON.parse(sessionStorage.getItem("edit_data"))
                setHeaderTiltle("Edit Sub Category");
                setButtonName("Update");
                setSubcategory(data.sub_category_name);
                setSelectCategoryId(data.category_id)
            }

        } catch (error) {
            console.log("Error", error);

        }
    }
    function addBtn() {
        try {
            setGridDisplay('None');
            setAddDisplay("block");
            setHeaderTiltle("Add Sub Category");
            setButtonName("Save");
            setErrorMsgText('');
            clearData();
            sessionStorage.removeItem("edit_data")
        } catch (error) {
            console.log("Error", error);
        }
    }
    function editCategory(category) {
        try {
            sessionStorage.setItem("edit_data", JSON.stringify(category));
            setGridDisplay('None');
            setAddDisplay("block");
            setErrorMsgText('');
            setHeaderTiltle("Edit Sub Category");
            setButtonName("Update");
            setSubcategory(category.sub_category_name);
            setSelectCategoryId(category.category_id)
        } catch (error) {
            console.log("Error", error);
        }
    }
    function bactBtn() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");

        } catch (error) {
            console.log("Error", error);

        }
    }
    function saveSubaCategory() {
        try {
            let validate = subCategoryValidation();
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            if (validate) {
                if (sessionStorage.getItem("edit_data") == null) {
                    document.getElementById("save_btn").style.display = "none"
                    document.getElementById("loder_btn").style.display = "block"
                    let postData = {
                        "category_id": document.getElementById("category_dropdown").value,
                        "sub_Category_id": 0,
                        "sub_category_name": document.getElementById("sub_category").value.trim(),
                        "create_by": user_data[0].user_id,
                        "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "post",
                        url: Apipath['AddSubCategory'],
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: postData,
                    })
                        .then(function (response) {
                            document.getElementById("save_btn").style.display = "block"
                            document.getElementById("loder_btn").style.display = "none"
                            if (response.data.error_code == '9999') {
                                setGridDisplay('block');
                                setAddDisplay("None");
                                getSubCategoryList();
                            }
                            else if (response.data.error_code == '9998') {
                                setErrorMsgText(response.data.message)
                            }
                            else {

                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })

                }
                else {
                    let data = JSON.parse(sessionStorage.getItem("edit_data"));
                    let postData = {
                        "category_id": document.getElementById("category_dropdown").value,
                        "sub_category_name": document.getElementById("sub_category").value.trim(),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "put",
                        url: Apipath['UpdateSubCategory'] + data.sub_Category_id,
                        headers: {
                            // 'Authorization': `bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        data: postData,
                    })
                        .then(function (response) {

                            if (response.data.error_code == '9999') {

                                setGridDisplay('block');
                                setAddDisplay("None");
                                getSubCategoryList();
                            }
                            else if (response.data.error_code == '9998') {
                                setErrorMsgText(response.data.message)
                            }
                            else {

                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                }

            }

        } catch (error) {
            console.log("Error", error);
        }
    }
    function categoryDropdown() {
        try {
            axios({
                method: "get",
                url: Apipath['GetCategoryDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        setCategoryDropdownList(response.data.data)
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
    function categoryDropdownOnChange() {
        try {
            setSelectCategoryId(document.getElementById("category_dropdown").value);
            setErrorMsgText('');
        } catch (error) {
            console.log("Error", error);
        }
    }
    function subCategoryValidation() {
        try {
            if (document.getElementById("category_dropdown").value == '0') {
                document.getElementById("category_dropdown").focus();
                setErrorMsgText("Please select category field");
                return false;
            }
            else if (document.getElementById("sub_category").value == '') {
                document.getElementById("sub_category").focus();
                setErrorMsgText("Please enter sub category field");
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    function getSubCategoryList() {
        try {
            if (window.GetSubCategoryList) {
                window.GetSubCategoryList.cancel();
            }
            window.GetSubCategoryList = axios.CancelToken.source();
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current,
                "category_id": document.getElementById("filter_category_dropdown").value,
                "is_active": parseInt(document.getElementById('filter_active_dropdown').value)
            }
            axios({
                method: "post",
                url: Apipath['GetSubCategoryList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetSubCategoryList.token,
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        if (response.data.data[0].data.length > 0) {
                            setSubCategoryDrobdownList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setSubCategoryDrobdownList([]);
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
                getSubCategoryList();
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function clearData() {
        try {
            setSelectCategoryId(0);
            setSubcategory('')
        } catch (error) {
            console.log("Error", error);
        }
    }
    function clearBtn() {
        try {
            document.getElementById("search").value = "";
            setSelectFilterCategoryId("0");
            document.getElementById('filter_category_dropdown').value = "0";
            setSelectActiveId("2");
            document.getElementById('filter_active_dropdown').value = "2";
            setCurrentPage(1);
            getSubCategoryList();
        } catch (error) {
            console.log("Error", error);
        }
    }
    function activeOnChange(value, id) {
        try {
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let postData = {
                "is_active": value == 1 ? 0 : 1,
                "update_by": user_data[0].user_id,
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
            }
            axios({
                method: "put",
                url: Apipath['UpdateSubCategory'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getSubCategoryList();
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
            <div>
                <div className='card W-100 p-1' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Sub Category
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className="row mt-3 justify-content-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3 text-end">
                                <button className='addBtn' onClick={() => addBtn()}>Add Sub Category<img src={addicon} className='action_icon ms-2'></img></button>
                            </div>
                        </div>
                        <div className="row mt-3 justify-content-end align-items-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Categroy</label>
                                {/* <input type='text' className='input_tag'>
                                    </input> */}
                                <select name="cars" id="filter_category_dropdown" className='input_tag' value={selectFilterCategoryId}
                                    onChange={(e) => { setSelectFilterCategoryId(e.target.value);  setCurrentPage(1);getSubCategoryList() }}>
                                    {
                                        categoryDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        categoryDropdownList.map((item, index) => {
                                            return <option value={item.category_id}>{item.category_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Status</label>
                                {/* <input type='text' className='input_tag'>
                                    </input> */}
                                <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectActiveId}
                                    onChange={(e) => { setSelectActiveId(e.target.value); setCurrentPage(1); getSubCategoryList() }}>
                                    <option value='2'>select</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>In Active</option>
                                </select>
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className=' align-items-center input_div'>
                                    <input type='search' placeholder='Search..' className='input_box' id='search' 
                                    onChange={() => {  setCurrentPage(1);getSubCategoryList() }} />
                                    <img src={searchicon} className='inputlogo'></img>
                                </div>
                            </div>
                            <div className="col-sm-4 mt-1 col-md-4 col-lg-2 col-xl-2">
                                <button className='addBtn' onClick={() => clearBtn()}>Clear</button>
                            </div>
                        </div>
                        <div className=" mt-2" style={{ height: "53vh", overflowY: "scroll" }} >
                            <table className=' w-100'>
                                <thead>
                                    <tr >
                                        <th>S.No</th>
                                        <th> Sub Category Name</th>
                                        <th> Category Name</th>
                                        <th>Status</th>
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
                                    {!loader && subCategoryDrobdownList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && subCategoryDrobdownList.length > 0 &&
                                        subCategoryDrobdownList.map((subCategory, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{subCategory.sub_category_name}</td>
                                                <td>{subCategory.category.length > 0 ? subCategory.category[0].category_name : ""}
                                                </td>
                                                <td><input type='checkbox'
                                                    checked={subCategory.is_active == 1 ? true : false} onClick={() => activeOnChange(subCategory.is_active, subCategory.sub_Category_id)} />

                                                </td>
                                                <td> <img src={edit} className='action_icon' onClick={() => editCategory(subCategory)}></img></td>
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
                    </div>
                </div>
                <div className='card W-100 p-3 ' style={{ display: addDisplay }}>
                    <div className="card-header d-flex gap-3 align-items-center">
                        <img src={bactBtnIcon} className='back_btn' onClick={() => bactBtn()}></img>
                        {headerTiltle}
                    </div>
                    <div className='addEditCard my-3 mx-auto'>
                        <div className='row mt-3 mb-3'>
                            <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                <div className='row justify-content-end'>
                                    <div className='col-xl-12 '>
                                        <label className='label_text'>Categroy</label>
                                        {/* <input type='text' className='input_tag'>
                                    </input> */}
                                        <select name="cars" id="category_dropdown" className='input_tag' value={selectCategoryId}
                                            onChange={() => categoryDropdownOnChange()}>
                                            {
                                                categoryDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                            }
                                            {
                                                categoryDropdownList.map((item, index) => {
                                                    return <option value={item.category_id}>{item.category_name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-xl-12 mt-3'>
                                        <label className='label_text'>Sub Categroy</label>
                                        <input type='text' placeholder=' Enter' className='input_tag' id="sub_category" value={subcategory}
                                            onChange={(e) => { setSubcategory(e.target.value); setErrorMsgText('') }} />
                                    </div>
                                    {/* <div className='col-xl-12 mt-3'>
                                        <div className='active_btn'>
                                            <span className='label_text'>Status</span >
                                            <input type="checkbox" id="category_checkbox" />
                                        </div>
                                    </div> */}
                                    <div className='col-xl-12'>
                                        <div className='d-flex justify-content-center'>
                                            {
                                                errorMsgText != "" && <div className='errormsg'>
                                                    {errorMsgText}
                                                </div>
                                            }

                                        </div>
                                    </div>

                                    <div className='col-xl-4 mt-3'>

                                        <button className='addBtn' id="save_btn" onClick={() => saveSubaCategory()}> {buttonName}</button>
                                        <button className='addBtn' id='loder_btn' style={{ display: "none" }}>
                                            <div class="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </button>

                                    </div>

                                </div>


                            </div>
                            {/* <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">

                            </div>
                            <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                <div className='row justify-content-end'>
                                    <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                        <button className='addBtn'> Save</button>
                                    </div>
                                </div>

                            </div> */}




                        </div>
                    </div>
                </div>
            </div>
        </Fragment>


    )
}
export default SubCategory;