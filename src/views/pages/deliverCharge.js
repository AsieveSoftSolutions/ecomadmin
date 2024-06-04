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
//react select 
import Select from 'react-select';
//apipath
import Apipath from '../../config/apipath';
import useState from 'react-usestateref';
import ReactPaginate from 'react-paginate';
import { Await } from 'react-router-dom'
const DeliveryCharge = () => {
    const [gridDisplay, setGridDisplay] = useState('');
    const [addDisplay, setAddDisplay] = useState('');
    const [errorMsgText, setErrorMsgText] = useState('');
    const [headerTiltle, setHeaderTiltle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [deliveryChargeList, setDeliveryChargeList] = useState([]);
    const [postalServiceList, setPostalServiceList, postalServiceListRef] = useState([]);
    const [selectedPostelSeviceList, setSelectedPostelSeviceList] = useState([]);
    const [selectedCountry, setSelectedCountry, selectedCountryRef] = useState('0');
    const [selectedPostal, setSelectedPostal, selectedPostalRef] = useState('0');
    const [selectedType, setSelectedType, selectedTypeRef] = useState('0');
    const [kgValue, setKgValue, kgValueRef] = useState(0);
    const [deliveryCharge, setdDeliveryCharge, deliveryChargeRef] = useState(0);
    const [taxName, setTaxName, taxNameRef] = useState('');
    const [taxPercentage, setTaxPercentage, taxPercentageRef] = useState(0);
    const [loader, setLoader] = useState(false);
    const [selectActiveId, setSelectActiveId] = useState('2');
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    const [countryList,setCountryList]= useState([]);
    const [filterCountryList,setFilterCountryList]= useState([]);
    const [filterSelectedCountry,setFilterSelectedCountry,filterSelectedCountryRef]= useState([]);
    const [callValue, setCallValue, callValueRef] = useState(false);
    const [filterPostalList,setFilterPostalList]= useState([]);
    const [selctedFilterPostal,setSelctedFilterPostal,selctedFilterPostalRef]= useState([]);
    useEffect(() => {
        if (!callValueRef.current) {
            init();
            setCallValue(!callValueRef.current)
        }

    }, []);
    async function init() {
        try {
            await defaultValue();
            await getDeliveryChargeList();
            await getCountryList();
            await getPostalServiceList();

        } catch (error) {
            console.log("Error", error);
        }
    }
    async function getCountryList(){
        try {
            await axios({
                method: "get",
                url: Apipath['GetCountryList']+1, 
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        setCountryList(response.data.data);
                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.country;
                                object["value"] = element.country;
                                setFilterCountryList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setFilterCountryList([])
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
    async function getPostalServiceList() {
        try {
            await axios({
                method: "get",
                url: Apipath['GetDropDownPostalService'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        setPostalServiceList(response.data.data);
                        let filterData  = postalServiceListRef.current.filter(function (cat) {
                            return cat.country == selectedCountryRef.current
                        });
                        let filterData1  = postalServiceListRef.current.filter(function (cat) {
                            return cat.country == filterSelectedCountryRef.current?.value
                        });
                        if (filterData1.length > 0) {
                            filterData1.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.postal_service_name;
                                object["value"] = element.postal_service_id;
                                setFilterPostalList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setFilterPostalList([])
                        }
                        setSelectedPostelSeviceList(filterData);
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
            setHeaderTiltle("Add Delivery Charge");
            setButtonName("Save");

        } catch (error) {
            console.log("Error", error);
        }
    }
    async function clearData() {
        try {
            setSelectedCountry("0");
            await CountryOnchage() ;
            setSelectedPostal("0");
            setSelectedType("0");
            setKgValue(0);
            setdDeliveryCharge(0)
            document.getElementById("category_checkbox").checked = false;
            setErrorMsgText('');
            sessionStorage.removeItem("edit_data");
            document.getElementById("save_btn").style.display = "block"
            document.getElementById("loder_btn").style.display = "none"
        } catch (error) {
            console.log("Error", error);
        }
    }
    async function editBtn(itemList) {
        try {
            document.getElementById("save_btn").style.display = "block"
            document.getElementById("loder_btn").style.display = "none"
            sessionStorage.setItem("edit_data", JSON.stringify(itemList));
            document.getElementById("category_checkbox").checked = itemList.is_active == 1 ? true : false;
            setSelectedCountry(itemList.postal_service?itemList.postal_service[0].country:"");
            await CountryOnchage() 
            setSelectedPostal(itemList.postal_service_id);
            setSelectedType(itemList.types);
            setKgValue(itemList.kg);
            setdDeliveryCharge(itemList.delivery_charge)
            setHeaderTiltle("Edit Delivery Charge");
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
    function getDeliveryChargeList() {
        try {
            // console.log(filterSelectedCountryRef.current.label?filterSelectedCountryRef.current?.label:'');
            if (window.GetBrandList) {
                window.GetBrandList.cancel();
            }
            window.GetBrandList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": '',
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current,
                "is_active": parseInt(document.getElementById('filter_active_dropdown').value),
                "postal_id":selctedFilterPostalRef.current.value?selctedFilterPostalRef.current?.value:'',
                "country":filterSelectedCountryRef.current.label?filterSelectedCountryRef.current?.label:''
            }
            axios({
                method: "post",
                url: Apipath['GetDeliveryChargeList'],
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
                            setDeliveryChargeList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setDeliveryChargeList([]);
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
                getDeliveryChargeList();
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
                url: Apipath['UpdateDeliveryCharge'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getDeliveryChargeList();
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
                        "delivery_charge_id": "0",
                        "postal_service_id": selectedPostalRef.current.trim(),
                        "types": selectedTypeRef.current,
                        "kg": kgValueRef.current,
                        "delivery_charge": deliveryChargeRef.current,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "create_by": user_data[0].user_id,
                        "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "post",
                        url: Apipath['AddDeliveryCharge'],
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
                                getDeliveryChargeList();
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
                        "postal_service_id": selectedPostalRef.current.trim(),
                        "types": selectedTypeRef.current,
                        "kg": kgValueRef.current,
                        "delivery_charge": deliveryChargeRef.current,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "put",
                        url: Apipath['UpdateDeliveryCharge'] + data.delivery_charge_id
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
                                getDeliveryChargeList();
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
    function CountryOnchage(){
        try {
            let filterData  = postalServiceListRef.current.filter(function (cat) {
                return cat.country == selectedCountryRef.current
            }
            );
            setSelectedPostelSeviceList(filterData);
        } catch (error) {
            
        }
    }
    function filterCountryOnChange(){
        try {
            let filterData1  = postalServiceListRef.current.filter(function (cat) {
                return cat.country == filterSelectedCountryRef.current?.value
            });
            setFilterPostalList([])
            if (filterData1.length > 0) {
                filterData1.forEach((element, index) => {
                    let object = {};
                    object["label"] = element.postal_service_name;
                    object["value"] = element.postal_service_id;
                    setFilterPostalList((ocarray) => [...ocarray, object])
                });
            }
            else {
                setFilterPostalList([])
            }
            setCurrentPage(1);
            getDeliveryChargeList()
        } catch (error) {
            
        }
    }
    function validation() {
        try {
            if(selectedCountryRef.current == '0'){
                document.getElementById("country_drop").focus();
                setErrorMsgText("Please select country field");
                return false;
            }
            else if(selectedPostalRef.current =='0'){
                document.getElementById("postal_service").focus();
                setErrorMsgText("Please select postal service field");
                return false;
            }
            else if(selectedTypeRef.current == '0'){
                document.getElementById("type_drop").focus();
                setErrorMsgText("Please select type field");
                return false;
            }
            else if(selectedTypeRef.current == 'kg' && (kgValueRef.current == '0' || kgValueRef.current == '' )){
                document.getElementById("kg_value").focus();
                setErrorMsgText("Please enter kg field");
                return false;
            }
            else if(deliveryChargeRef.current == '0' || deliveryChargeRef.current == ''){
                document.getElementById("d_charge").focus();
                setErrorMsgText("Please enter delivery charge field");
                return false;
            }
            else{
                return true;
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    function clearBtn() {
        try {
            setFilterSelectedCountry([]);
            setFilterPostalList([]);
            setSelctedFilterPostal([]);
            setSelectActiveId("2");
            document.getElementById('filter_active_dropdown').value = "2";
            setCurrentPage(1);
            getDeliveryChargeList();
        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <Fragment>
            <div>
                <div className='card W-100 p-1' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Delivery Charge
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className="row  justify-content-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3 text-end">
                                <button className='addBtn' onClick={() => addBtn()}>Add<img src={addicon} className='action_icon ms-2'></img></button>
                            </div>
                        </div>
                        <div className="row  justify-content-end align-items-end">
                            <div className="col-sm-6 mt-1 col-md-4 col-lg-3 col-xl-3" >
                                <label className='label_text'>Status</label>
                                {/* <input type='text' className='input_tag'>
                                    </input> */}
                                <select name="cars" id="filter_active_dropdown" className='input_tag' value={selectActiveId}
                                    onChange={(e) => { setSelectActiveId(e.target.value); setCurrentPage(1); getDeliveryChargeList() }}>
                                    <option value='2'>select</option>
                                    <option value='1'>Active</option>
                                    <option value='0'>In Active</option>
                                </select>
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                            <label className='label_text'>Country</label>
                                <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            value={filterSelectedCountry}
                                            options={filterCountryList}
                                            onChange={(e) => { setFilterSelectedCountry(e);filterCountryOnChange() }}
                                        />
                                
                            </div>
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <label className='label_text'>Postal Service</label>
                                <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            value={selctedFilterPostal}
                                            options={filterPostalList}
                                            onChange={(e) => { setSelctedFilterPostal(e);  setCurrentPage(1); getDeliveryChargeList() }}
                                        />
                                
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
                                        <th>Postal Service</th>
                                        <th>Types</th>
                                        <th>Kg</th>
                                        <th>Delivery Charge</th>
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
                                    {!loader && deliveryChargeList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && deliveryChargeList.length > 0 &&
                                        deliveryChargeList.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.postal_service?item.postal_service[0].postal_service_name:''}</td>
                                                <td>{item.types}</td>
                                                <td>{item.kg}</td>
                                                <td>{item.delivery_charge}</td>
                                                <td><input type='checkbox'
                                                    checked={item.is_active == 1 ? true : false} onClick={() => activeOnChange(item.is_active, item.delivery_charge_id)} />

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
                                        <select name="cars" id="country_drop" className='input_tag' value={selectedCountry}
                                            onChange={(e) => { setSelectedCountry(e.target.value); setErrorMsgText('');CountryOnchage() }}>
                                           {
                                                countryList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                            }
                                            {
                                                countryList.map((item, index) => {
                                                    return <option value={item.country}>{item.country}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-xl-12 mt-2'>
                                        <label className='label_text'>Postal Service</label>
                                        {/* <input type='text' className='input_tag'>
                                </input> */}
                                        <select name="cars" id="postal_service" className='input_tag' value={selectedPostal}
                                            onChange={(e) => { setSelectedPostal(e.target.value); setErrorMsgText('') }}>
                                            {
                                                selectedPostelSeviceList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                            }
                                            {
                                                selectedPostelSeviceList.map((item, index) => {
                                                    return <option value={item.postal_service_id}>{item.postal_service_name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-xl-12 mt-2' >
                                        <label className='label_text'>Types </label>
                                        {/* <input type='text' className='input_tag'>
                                    </input> */}
                                        <select name="cars" id="type_drop" className='input_tag' value={selectedType}
                                            onChange={(e) => { setSelectedType(e.target.value); setErrorMsgText('') }}>
                                            <option value='0'>select</option>
                                            <option value='kg'>Kg</option>
                                            <option value='normal'>Normal</option>
                                        </select>
                                    </div>
                                    <div className='col-xl-12 mt-2'>
                                        <label className='label_text'>Kg</label>
                                        <input type='number' min={0} placeholder=' Enter'
                                            className='input_tag' id="kg_value" value={kgValue}
                                            disabled={selectedType != 'kg' ? true : false}
                                            onChange={(e) => { setKgValue(e.target.value); setErrorMsgText('') }} />
                                    </div>
                                    <div className='col-xl-12 mt-2'>
                                        <label className='label_text'>Delivery Charge</label>
                                        <input type='number' min={0} placeholder=' Enter'
                                            className='input_tag' id="d_charge" value={deliveryCharge}
                                            onChange={(e) => { setdDeliveryCharge(e.target.value); setErrorMsgText('') }} />
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
export default DeliveryCharge;

