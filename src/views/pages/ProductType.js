import React, { useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import edit from '../../assets/images/icons/edit.svg'
import deleteimage from '../../assets/images/icons/delete.svg'
import addicon from '../../assets/images/icons/addicon.svg'
import searchicon from '../../assets/images/icons/search.svg'
import bactBtnIcon from '../../assets/images/icons/bactBtn.svg'
import addbtnicon from '../../assets/images/icons/addbtnicon.svg'
import aveter from '../../assets/images/avatars/01.png'
//axios
import axios from 'axios';
//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
var subCategoryList = [];
var fileUploadName = "";
const ProductType = () => {
    const [gridDisplay, setGridDisplay] = useState('');
    const [addDisplay, setAddDisplay] = useState('');
    const [errorMsgText, setErrorMsgText] = useState('');
    const [headerTiltle, setHeaderTiltle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [categoryDropdownList, setCategoryDropdownList] = useState([]);
    const [subCategoryDropDownList, setSubCategoryDropDownList, subCategoryDropDownListRef] = useState([]);
    const [prodcutTypeList, setprodcutTypeList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [productType, setProductType] = useState('');
    const [selectCategoryId, setSelectCategoryId] = useState(0);
    const [selectSubCategoryId, setSelectSubCategoryId] = useState(0);
    const [selectFilterSubCategoryId, setSelectFilterSubCategoryId] = useState("0");
    const [selectFilterCategoryId, setSelectFilterCategoryId] = useState("0");
    const [filterSubCategoryDropDownList, setFilterSubCategoryDropDownList] = useState([]);
    const [fileName, setFileName] = useState("");
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
            getProductTypeList();
            categoryDropdown();
            getSubCategoryDropDown();

        } catch (error) {
            console.log("Error", error);
        }
    }
    function defaultValue() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");
            if (sessionStorage.getItem("edit_data") == null) {
                setHeaderTiltle("Add Product Type");
                setButtonName("Save");
            }
            else {
                let data = JSON.parse(sessionStorage.getItem("edit_data"))
                setHeaderTiltle("Edit Product Type");
                setButtonName("Update");
            }

        } catch (error) {
            console.log("Error", error);

        }
    }

    async function addBtn() {
        try {
            setGridDisplay('None');
            setAddDisplay("block");
            setHeaderTiltle("Add Product Type");
            setButtonName("Save");
            setErrorMsgText('');
            await clearData();
            await categoryDropdownOnChange()
            sessionStorage.removeItem("edit_data")
        } catch (error) {
            console.log("Error", error);
        }
    }
    function clearData() {
        try {
            setSelectSubCategoryId('0');
            setSelectCategoryId("0");
            setProductType('');
            setErrorMsgText('');
            setFileName("");
            fileUploadName = '';
            document.getElementById("category_dropdown").disabled = false;
            document.getElementById("sub_category_dropdown").disabled = false;
        } catch (error) {
            console.log("Error", error);


        }
    }
    async function editBtn(prodcutTypeList) {
        try {
            sessionStorage.setItem("edit_data", JSON.stringify(prodcutTypeList));
            setHeaderTiltle("Edit Product Type");
            setButtonName("Update");
            setFileName(prodcutTypeList.image);
            fileUploadName = prodcutTypeList.image;
            setProductType(prodcutTypeList.product_type_name);
            setSelectCategoryId(prodcutTypeList.category_id);
            document.getElementById("category_dropdown").value = prodcutTypeList.category_id
            await categoryDropdownOnChange()
            setSelectSubCategoryId(prodcutTypeList.sub_Category_id);
            document.getElementById("sub_category_dropdown").value = prodcutTypeList.sub_Category_id
            // document.getElementById("category_dropdown").disabled = true;
            // document.getElementById("sub_category_dropdown").disabled = true;
            setErrorMsgText('');
            setGridDisplay('none');
            setAddDisplay("block");
        } catch (error) {
            console.log("Error", error);
        }
    }
    async function fileUpload(event) {
        try {
            setErrorMsgText('');
            const files = event.target.files;
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('files', file);
            });
            if (fileUploadName != "") {
                await axios({
                    method: "delete",
                    url: Apipath['DeleteImage'] + fileUploadName,
                    headers: {
                        // 'Authorization': `bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(function (response) {
                        if (response.data.error_code == '9999') {

                        }
                        else {

                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }
            await fetch(Apipath['ImageUpload'], {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error_code == '9999') {
                        setFileName(data.data[0]);
                        fileUploadName = data.data[0];
                    }
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.error(error);
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
    function getProductTypeList() {
        try {
            if (window.GetProductTypeList) {
                window.GetProductTypeList.cancel();
            }
            window.GetProductTypeList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current,
                "category_id": document.getElementById("filter_category_dropdown").value,
                "sub_Category_id": document.getElementById("filter_sub_category_dropdown").value,
                "is_active": parseInt(document.getElementById('filter_active_dropdown').value)
            }
            axios({
                method: "post",
                url: Apipath['GetProductTypeList'],
                headers: {
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetProductTypeList.token,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {

                        if (response.data.data[0].data.length > 0) {
                            setprodcutTypeList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setprodcutTypeList([]);
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
            console.log("Error", error);
        }
    }
    function handlePageClick(e) {
        try {
            let value = e.selected + 1
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                getProductTypeList();
            }
        } catch (error) {
            console.log('error : ', error);
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
    function getSubCategoryDropDown() {
        try {
            axios({
                method: "get",
                url: Apipath['GetSubCategoryDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        subCategoryList = response.data.data
                        let filtersubcategory = subCategoryList.filter(function (cat) {
                            return cat.category_id == document.getElementById("category_dropdown").value
                        }
                        );
                        setSubCategoryDropDownList(filtersubcategory)
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
            setSelectCategoryId(document.getElementById("category_dropdown").value)
            let filtersubcategory = subCategoryList.filter(function (cat) {
                return cat.category_id == document.getElementById("category_dropdown").value
            }
            );
            setSubCategoryDropDownList(filtersubcategory);
        } catch (error) {
            console.log("Error", error);
        }
    }
    function activeOnChange(is_active, id) {
        try {
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let postData = {
                "is_active": is_active == 1 ? 0 : 1,
                "update_by": user_data[0].user_id,
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
            }
            axios({
                method: "put",
                url: Apipath['UpdateProductType'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getProductTypeList();
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
    function saveBtn() {
        try {
            let validate = validation();
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            if (validate) {
                if (sessionStorage.getItem("edit_data") == null) {
                    document.getElementById("save_btn").style.display = "none"
                    document.getElementById("loder_btn").style.display = "block"
                    let postData = {
                        "category_id": document.getElementById("category_dropdown").value,
                        "sub_Category_id": document.getElementById("sub_category_dropdown").value,
                        "product_type_id": "0",
                        "product_type_name": document.getElementById("product_type").value.trim(),
                        "image": fileUploadName,
                        "create_by": user_data[0].user_id,
                        "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "post",
                        url: Apipath['AddProductType'],
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
                                setCurrentPage(1);
                                getProductTypeList();
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
                        "sub_Category_id": document.getElementById("sub_category_dropdown").value,
                        "product_type_name": document.getElementById("product_type").value.trim(),
                        "image": fileUploadName,
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "put",
                        url: Apipath['UpdateProductType'] + data.product_type_id,
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
                                getProductTypeList();
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
    function validation() {
        try {
            if (fileUploadName == "") {
                // document.getElementById("category_dropdown").focus();
                setErrorMsgText("Please upload image");
                return false;
            }
            else if (document.getElementById("category_dropdown").value == "0") {
                document.getElementById("category_dropdown").focus();
                setErrorMsgText("Please select category field");
                return false;
            }
            else if (subCategoryDropDownListRef.current.length > 0 &&
                document.getElementById("sub_category_dropdown").value == "0") {
                document.getElementById("sub_category_dropdown").focus();
                setErrorMsgText("Please select sub category field");
                return false;
            }
            else if (document.getElementById("product_type").value == "") {
                document.getElementById("product_type").focus();
                setErrorMsgText("Please enter product type field");
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    async function clearBtn() {
        try {
            document.getElementById("search").value = "";
            setSelectFilterCategoryId("0");
            document.getElementById('filter_category_dropdown').value = "0";
            await categoryFilterDropdownOnChange();
            setSelectFilterSubCategoryId("0");
            document.getElementById("filter_sub_category_dropdown").value = "0";
            setSelectActiveId("2");
            document.getElementById('filter_active_dropdown').value = "2";
            setCurrentPage(1);
            getProductTypeList();

        } catch (error) {
            console.log("Error", error);
        }
    }
    async function categoryFilterDropdownOnChange() {
        try {
            setSelectFilterCategoryId(document.getElementById("filter_category_dropdown").value)
            let filtersubcategory = subCategoryList.filter(function (cat) {
                return cat.category_id == document.getElementById("filter_category_dropdown").value
            }
            );

            await setFilterSubCategoryDropDownList(filtersubcategory);
            setSelectFilterSubCategoryId("0");
            setCurrentPage(1);
            getProductTypeList();
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <Fragment>
            <div>
                <div className='card W-100 p-1' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Product Type
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className="row justify-content-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3 text-end">
                                <button className='addBtn' onClick={() => addBtn()}>Add Product Type<img src={addicon} className='action_icon ms-2'></img></button>
                            </div>
                        </div>
                        <div className="row  justify-content-end align-items-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Status</label>
                                {/* <input type='text' className='input_tag'>
                                    </input> */}
                                <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectActiveId}
                                    onChange={(e) => { setSelectActiveId(e.target.value); setCurrentPage(1); getProductTypeList() }}>
                                    <option value='2'>select</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>In Active</option>
                                </select>
                            </div>
                            <div className='mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3 '>
                                <label className='label_text'>Categroy</label>
                                {/* <input type='text' className='input_tag'>
                                </input> */}
                                <select name="cars" id="filter_category_dropdown" className='input_tag' value={selectFilterCategoryId}
                                    onChange={() => categoryFilterDropdownOnChange()}>
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
                            <div className='mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                                <label className='label_text'>Sub Categroy</label>
                                {/* <input type='text' className='input_tag'>
                                </input> */}
                                <select name="cars" id="filter_sub_category_dropdown" className='input_tag' value={selectFilterSubCategoryId}
                                    onChange={(e) => { setSelectFilterSubCategoryId(e.target.value); setCurrentPage(1);; getProductTypeList(); }}>
                                    {
                                        filterSubCategoryDropDownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        filterSubCategoryDropDownList.map((item, index) => {
                                            return <option value={item.sub_Category_id}>{item.sub_category_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                <div className=' align-items-center input_div'>
                                    <input type='search' placeholder='Search...' className='input_box' id='search'
                                        onChange={() => { setCurrentPage(1); getProductTypeList(); }} />
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
                                    <tr className='thead_border'>
                                        <th>S.No</th>
                                        <th> Category Name</th>
                                        <th> Sub Category Name</th>
                                        <th>Product Type Name</th>
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
                                    {!loader && prodcutTypeList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && prodcutTypeList.length > 0 &&
                                        prodcutTypeList.map((productType, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{productType.category.length > 0 ? productType.category[0].category_name : ""}
                                                </td>
                                                <td>{productType.sub_category.length > 0 ? productType.sub_category[0].sub_category_name : ""}
                                                </td>
                                                <td>{productType.product_type_name}</td>

                                                <td><input type='checkbox'
                                                    checked={productType.is_active == 1 ? true : false} onClick={() => activeOnChange(productType.is_active, productType.product_type_id)} />

                                                </td>
                                                <td> <img src={edit} className='action_icon' onClick={() => editBtn(productType)}></img></td>
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
                                    <div>
                                        <div className='w-100 p-2 add_input_box'>
                                            <input type='file' id="file_upload" style={{ width: "0px" }} accept="image/*" onChange={(e) => fileUpload(e)} />
                                            <label htmlFor="file_upload" className='image_label'>
                                                <img src={fileName == "" ? aveter : Apipath["GetImage"] + fileName} className='input_image'></img>

                                            </label>
                                        </div>
                                    </div>
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
                                    <div className='col-xl-12  mt-3'>
                                        <label className='label_text'>Sub Categroy</label>
                                        {/* <input type='text' className='input_tag'>
                                </input> */}
                                        <select name="cars" id="sub_category_dropdown" className='input_tag' value={selectSubCategoryId}
                                            onChange={(e) => setSelectSubCategoryId(e.target.value)}>
                                            {
                                                subCategoryDropDownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                            }
                                            {
                                                subCategoryDropDownList.map((item, index) => {
                                                    return <option value={item.sub_Category_id}>{item.sub_category_name}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='col-xl-12 mt-3'>
                                        <label className='label_text'>product Type</label>
                                        <input type='text' placeholder=' Enter' className='input_tag' id="product_type" value={productType}
                                            onChange={(e) => { setProductType(e.target.value); setErrorMsgText('') }} />
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

                                        <button className='addBtn' id="save_btn" onClick={() => saveBtn()}> {buttonName}</button>
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
export default ProductType;

