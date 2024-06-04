import React, { useEffect, Fragment, useMemo } from 'react'
//icons
import edit from '../../assets/images/icons/edit.svg'
import addicon from '../../assets/images/icons/addicon.svg'
import searchicon from '../../assets/images/icons/search.svg'
import bactBtnIcon from '../../assets/images/icons/bactBtn.svg'
// import deleteimage from '../../assets/images/icons/delete.svg'
// import addbtnicon from '../../assets/images/icons/addbtnicon.svg'
//axios
import axios from 'axios';
//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref';
//pegination
import ReactPaginate from 'react-paginate';
//react select 
import Select from 'react-select';
//counrty list 
import countryList from 'react-select-country-list'
const PostalService = () => {
    const [gridDisplay, setGridDisplay] = useState('');
    const [addDisplay, setAddDisplay] = useState('');
    const [errorMsgText, setErrorMsgText] = useState('');
    const [headerTiltle, setHeaderTiltle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [postalServiceList, setPostalServiceList] = useState([]);
    const [postalServiceName, setPostalServiceName, postalServiceNameRef] = useState('');
    const [url, setUrl, urlRef] = useState('');
    const [loader, setLoader] = useState(false);
    const [selectActiveId, setSelectActiveId] = useState('2');
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    const [options, setOptions, optionsRef] = useState(useMemo(() => countryList().getData(), []));
    const [selectedCountry, setSelectedCountry, selectedCountryRef] = useState([]);
    const [callValue, setCallValue, callValueRef] = useState(false)
    useEffect(() => {
        if (!callValueRef.current) {
            init();
            setCallValue(!callValueRef.current)
        }

    }, []);
    function init() {
        try {
            defaultValue();
            getPostalServiceList();

        } catch (error) {
            console.log("Error", error);
        }
    }
    function defaultValue() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");
            // setOptions((addSubProductList) => [
            //     { value: '0', label: 'select' }, ...addSubProductList])
            // setOptions((items)=>[...items])
            if (sessionStorage.getItem("edit_data") == null) {
                setHeaderTiltle("Add Sub Category");
                setButtonName("Save");
            }
            else {
                let data = JSON.parse(sessionStorage.getItem("edit_data"))
                setHeaderTiltle("Edit Sub Category");
                setButtonName("Update");
            }

        } catch (error) {
            console.log("Error", error);

        }
    }
    async function addBtn() {
        try {
            await clearData();
            setGridDisplay('None');
            setAddDisplay("block");
            setHeaderTiltle("Add Postal Service");
            setButtonName("Save");

        } catch (error) {
            console.log("Error", error);
        }
    }
    function clearData() {
        try {
            setPostalServiceName('');
            setSelectedCountry([]);
            setUrl('');
            document.getElementById("category_checkbox").checked = false;
            setErrorMsgText('');
            sessionStorage.removeItem("edit_data");
        } catch (error) {
            console.log("Error", error);
        }
    }
    function editBtn(itemList) {
        try {
            sessionStorage.setItem("edit_data", JSON.stringify(itemList));
            let filterDate = optionsRef.current.filter(function (cat) {
                return cat.label == itemList.country
            });
            setSelectedCountry(filterDate.length > 0 ? filterDate[0] : [])
            setPostalServiceName(itemList.postal_service_name);
            setUrl(itemList.url);
            document.getElementById("category_checkbox").checked = itemList.is_active == 1 ? true : false;
            setHeaderTiltle("Edit Postal Service");
            setButtonName("Update");
            setErrorMsgText('');
            setGridDisplay('None');
            setAddDisplay("block");
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
    function getPostalServiceList() {
        try {

            if (window.GetBrandList) {
                window.GetBrandList.cancel();
            }
            window.GetBrandList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current,
                "is_active": parseInt(document.getElementById('filter_active_dropdown').value)
            }
            axios({
                method: "post",
                url: Apipath['GetPostalServiceList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetBrandList.token,
            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {

                        if (response.data.data[0].data.length > 0) {
                            setPostalServiceList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setPostalServiceList([]);
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
                getPostalServiceList();
            }
        } catch (error) {
            console.log('error : ', error);
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
                url: Apipath['UpdatePostalService'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getPostalServiceList();
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
                        "postal_service_id": "0",
                        "postal_service_name": postalServiceNameRef.current.trim(),
                        "url": urlRef.current.trim(),
                        "country": selectedCountryRef.current.label,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "create_by": user_data[0].user_id,
                        "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "post",
                        url: Apipath['AddPostalService'],
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
                                getPostalServiceList();
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
                        "postal_service_name": postalServiceNameRef.current.trim(),
                        "url": urlRef.current.trim(),
                        "country": selectedCountryRef.current.label,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "put",
                        url: Apipath['UpdatePostalService'] + data.postal_service_id
                        ,
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
                                getPostalServiceList();
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
            let validate = isValidUrl()
            if (!selectedCountryRef.current?.label) {
                setErrorMsgText("Please select country field");
                return false;
            }
            else if (postalServiceNameRef.current == "") {
                document.getElementById("p_service").focus();
                setErrorMsgText("Please enter postal service field");
                return false;
            }
            else if (urlRef.current == "") {
                document.getElementById("url").focus();
                setErrorMsgText("Please enter url field");
                return false;
            }
            else if(!validate){
                document.getElementById("url").focus();
                setErrorMsgText("Please enter valid url");
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    function isValidUrl() {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
        );
        return pattern.test(urlRef.current);
    }
    function clearBtn() {
        try {
            document.getElementById("search").value = "";
            setSelectActiveId("2");
            document.getElementById('filter_active_dropdown').value = "2";
            setCurrentPage(1);
            getPostalServiceList();
        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <Fragment>
            <div>
                <div className='card W-100 p-1' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Postal Service
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className="row  justify-content-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3 text-end">
                                <button className='addBtn' onClick={() => addBtn()}>Add Postal Service<img src={addicon} className='action_icon ms-2'></img></button>
                            </div>
                        </div>
                        <div className="row  justify-content-end align-items-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Status</label>
                                {/* <input type='text' className='input_tag'>
                                    </input> */}
                                <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectActiveId}
                                    onChange={(e) => { setSelectActiveId(e.target.value); setCurrentPage(1); getPostalServiceList() }}>
                                    <option value='2'>select</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>In Active</option>
                                </select>
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className=' align-items-center input_div'>
                                    <input type='search' placeholder='Search...' className='input_box' id='search'
                                        onChange={() => { setCurrentPage(1); getPostalServiceList(); }} />
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
                                        <th>Country</th>
                                        <th>Postal Service</th>
                                        <th>url</th>
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
                                    {!loader && postalServiceList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && postalServiceList.length > 0 &&
                                        postalServiceList.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.country}</td>
                                                <td>{item.postal_service_name}</td>
                                                <td title={item.url}>{item.url}</td>
                                                <td><input type='checkbox'
                                                    checked={item.is_active == 1 ? true : false} onClick={() => activeOnChange(item.is_active, item.postal_service_id)} />

                                                </td>
                                                <td> <img src={edit} className='action_icon' onClick={() => editBtn(item)}></img></td>
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
                <div className='card W-100 p-3 ' style={{ display: addDisplay }}>
                    <div className="card-header d-flex gap-3 align-items-center">
                        <img src={bactBtnIcon} className='back_btn' onClick={() => bactBtn()}></img>
                        {headerTiltle}
                    </div>
                    <div className='addEditCard my-3 mx-auto'>
                        <div className='row mt-3 mb-3'>
                            <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                <div className='row justify-content-end'>

                                    <div className='col-xl-12 mt-2' >
                                        <label className='label_text'>Country </label>
                                        {/* <input type='text' className='input_tag'>
                                    </input> */}
                                        {/* <select name="cars" id="country_drop" className='input_tag' value={selectedCountry}
                                            onChange={(e) => { setSelectedCountry(e.target.value); setErrorMsgText('') }}>
                                            <option value='0'>select</option>
                                            <option value='india'>India</option>
                                            <option value='other'>Other</option>
                                        </select> */}
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            value={selectedCountry}
                                            options={options}
                                            onChange={(e) => { setSelectedCountry(e); setErrorMsgText('') }}
                                        />
                                    </div>
                                    <div className='col-xl-12 mt-2'>
                                        <label className='label_text'>Postal Service Name</label>
                                        <input type='text' placeholder=' Enter' className='input_tag' id="p_service" value={postalServiceName}
                                            onChange={(e) => { setPostalServiceName(e.target.value); setErrorMsgText('') }} />
                                    </div>
                                    <div className='col-xl-12 mt-2'>
                                        <label className='label_text'>Url</label>
                                        <input type='text' placeholder=' Enter' className='input_tag' id="url" value={url}
                                            onChange={(e) => { setUrl(e.target.value); setErrorMsgText('') }} />
                                    </div>
                                    <div className='col-xl-12 mt-3'>
                                        <div className='active_btn'>
                                            <span className='label_text'>Status</span >
                                            <input type="checkbox" id="category_checkbox" />
                                        </div>
                                    </div>
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
export default PostalService;

