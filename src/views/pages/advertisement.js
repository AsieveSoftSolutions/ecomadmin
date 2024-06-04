import React, { useEffect, Fragment } from 'react'
import '../../assets/scss/pages/pagescustom.scss'
import aveter from '../../assets/images/avatars/01.png'
import edit from '../../assets/images/icons/edit.svg'
import deleteimage from '../../assets/images/icons/delete.svg'
import addicon from '../../assets/images/icons/addicon.svg'
import searchicon from '../../assets/images/icons/search.svg'
import bactBtnIcon from '../../assets/images/icons/bactBtn.svg'
//axios
import axios from 'axios';

//apipath
import Apipath from '../../config/apipath';
import ReactPaginate from 'react-paginate';
import useState from 'react-usestateref'

import { SuccsessModel as SuccsessModel } from "../../components/models";
import { AdvertimentPriviewMmodel as AdvertimentPriviewMmodel } from "../../components/models";
import Select from 'react-select';
var subCategoryList = [];
var productTypeList = [];
var fileUploadName = "imag.png";
function Advertisement() {
    const [gridDisplay, setGridDisplay] = useState('')
    const [addDisplay, setAddDisplay] = useState('')
    const [categoryDropdownList, setCategoryDropdownList, categoryDropdownListRef] = useState([]);
    const [subCategoryDropDownList, setSubCategoryDropDownList, subCategoryDropDownListRef] = useState([]);
    const [productTypeDropdownList, setProductTypeDropdownList, productTypeDropdownListRef] = useState([]);
    const [occationDropdownList, setOccationDropdownList, occationDropdownListRef] = useState([]);
    const [productSizeDropdownList, setProductSizeDropdownList, productSizeDropdownListRef] = useState([]);
    const [fabricTypeDropdownList, setFabricTypeDropdownList, fabricTypeDropdownListRef] = useState([]);
    const [sleevePatternDropdownList, setSleevePatternDropdownList, sleevePatternDropdownListRef] = useState([]);
    const [neckDesignDropdownList, setNeckDesignDropdownList, neckDesignDropdownListRef] = useState([]);
    const [fileName, setFileName] = useState('');
    const [errorMsgText, setErrorMsgText] = useState('');
    const [minDate, setMinDate] = useState('');
    const [headerTiltle, setHeaderTiltle] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [advertisementList, setAdvertisementList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [messageModel, setMessageModel] = useState(false);
    const [currentPage, setCurrentPage, currentPageRef] = useState(1);
    const [skipCount, setSkipCount, skipCountRef] = useState(6);
    const [limitCount, setLimitCount, limitCountRef] = useState(6);
    const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
    const [selectedId, setSelectedId] = useState([]);
    const [selectedOccasionIds, setSelectedOccasionIds, selectedOccasionIdsRef] = useState([]);
    const [selectedSizeIds, setSelectedSizeIds, selectedSizeIdsRef] = useState([]);
    const [selectedFabricIds, setSelectedFabricIds, selectedFabricIdsRef] = useState([]);
    const [selectSleeveIds, setSelectSleeveIds, selectSleeveIdsRef] = useState([]);
    const [selectedNeckIds, setSelectedNeckIds, selectedNeckIdsRef] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds, selectedCategoryIdsRef] = useState([]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds, selectedSubCategoryIdsRef] = useState([]);
    const [selectedProductTypeIds, setSelectedProductTypeIds, selectedProductTypeIdsRef] = useState([]);
    const [initialized, setinitialized, initializedRef] = useState(false);
    const [previewModelShow, setPreviewModelShow ]= useState(false);
    const  [previewImgae, setPreviewImgae]  = useState('');
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    useEffect(() => {

        if (!initializedRef.current) {
            setinitialized(true)
            init();

        }

    }, []);

    function init() {
        try {
            defaultValue();
            categoryDropdown();
            getSubCategoryDropDown();
            getProductTypeDropDown();
            getOccasionDropdown();
            getProductSizeDrobdown();
            getfabricTypeDropdown();
            sleevePatternDropdown();
            NeckDesignDrobdown();
            getAdvertisementList()
        } catch (error) {

        }
    }
    function defaultValue() {
        try {
            setGridDisplay('block');
            setAddDisplay("None");
            setMinDate(new Date().toLocaleDateString("fr-CA"));
            document.getElementById('offer_percentage').value = "0";
        } catch (error) {
            console.log("Error", error);

        }
    }
    async function addBtn() {
        try {
            await clearData();
            setGridDisplay('None');
            setAddDisplay("block");
            setHeaderTiltle("Add Advertisement");
            setButtonName("Save");
            setErrorMsgText('');
            sessionStorage.removeItem("edit_data")
        } catch (error) {
            console.log("Error", error);
        }
    }
    function bactBtn() {
        try {
            setGridDisplay('block')
            setAddDisplay("None")
        } catch (error) {
            console.log("Error", error);
        }
    }
    function getAdvertisementList() {
        try {
            if (window.GetAdvertisementList) {
                window.GetAdvertisementList.cancel();
            }
            window.GetAdvertisementList = axios.CancelToken.source();
            setLoader(true);
            let postData = {
                "search": document.getElementById('search').value,
                "limit": skipCountRef.current,
                "skip_count": skipCountRef.current * currentPageRef.current - skipCountRef.current
            }
            axios({
                method: "post",
                url: Apipath['GetAdvertisementList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
                cancelToken: window.GetAdvertisementList.token,

            })
                .then(function (response) {
                    setLoader(false);
                    if (response.data.error_code == '9999') {
                        if (response.data.data[0].data.length > 0) {
                            setAdvertisementList(response.data.data[0].data);
                            setTotalPageCount(Math.ceil(response.data.data[0].pagination[0].total / limitCountRef.current));
                        }
                        else {
                            setAdvertisementList([]);
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
            let value = e.selected + 1;
            if (currentPageRef.current != value) {
                setCurrentPage(value);
                getAdvertisementList();
            }
        } catch (error) {
            console.log('error : ', error);
        }
    }
    function saveBtn() {
        try {

            let validate = validation();
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            if (validate) {
                if (sessionStorage.getItem("edit_data") == null) {
                    // document.getElementById("save_btn").style.display = "none"
                    // document.getElementById("loder_btn").style.display = "block"
                    let postData = {
                        "advertisement_id": "0",
                        "advertisement_name": document.getElementById('advertisement_name').value,
                        "coupon_code": document.getElementById('coupon_code').value,
                        "offer_percentage": isNaN(parseInt(document.getElementById('offer_percentage').value)) ? 0 : parseInt(document.getElementById('offer_percentage').value),
                        "image": fileUploadName,
                        "category_id": selectedCategoryIdsRef.current.map(a => a.value),
                        "sub_Category_id": selectedSubCategoryIdsRef.current.map(a => a.value),
                        "product_type_id": selectedProductTypeIdsRef.current.map(a => a.value),
                        "occasion_id": selectedOccasionIdsRef.current.map(a => a.value),
                        "sleeve_Pattern_id": selectSleeveIdsRef.current.map(a => a.value),
                        "fabric_type_id": selectedFabricIdsRef.current.map(a => a.value),
                        "neck_design_id": selectedNeckIdsRef.current.map(a => a.value),
                        "product_size_id": selectedSizeIdsRef.current.map(a => a.value),
                        "validate_from": document.getElementById('valid_from').value,
                        "validate_to": document.getElementById('valid_to').value,
                        "product_from": document.getElementById('product_start').value,
                        "product_to": document.getElementById('product_end').value,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "is_delete": 1,
                        "create_by": user_data[0].user_id,
                        "created_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-'),
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "post",
                        url: Apipath['AddAdvertisement'],
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: postData,
                    })
                        .then(function (response) {
                            // document.getElementById("save_btn").style.display = "block"
                            // document.getElementById("loder_btn").style.display = "none"
                            if (response.data.error_code == '9999') {
                                setGridDisplay('block');
                                setAddDisplay("None");
                                setCurrentPage(1);
                                getAdvertisementList();
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
                    let data = JSON.parse(sessionStorage.getItem("edit_data"))
                    let postData = {
                        "advertisement_name": document.getElementById('advertisement_name').value,
                        "coupon_code": document.getElementById('coupon_code').value,
                        "offer_percentage": isNaN(parseInt(document.getElementById('offer_percentage').value)) ? 0 : parseInt(document.getElementById('offer_percentage').value),
                        "image": fileUploadName,
                        "category_id": selectedCategoryIdsRef.current.map(a => a.value),
                        "sub_Category_id": selectedSubCategoryIdsRef.current.map(a => a.value),
                        "product_type_id": selectedProductTypeIdsRef.current.map(a => a.value),
                        "occasion_id": selectedOccasionIdsRef.current.map(a => a.value),
                        "sleeve_Pattern_id": selectSleeveIdsRef.current.map(a => a.value),
                        "fabric_type_id": selectedFabricIdsRef.current.map(a => a.value),
                        "neck_design_id": selectedNeckIdsRef.current.map(a => a.value),
                        "product_size_id": selectedSizeIdsRef.current.map(a => a.value),
                        "validate_from": document.getElementById('valid_from').value,
                        "validate_to": document.getElementById('valid_to').value,
                        "product_from": document.getElementById('product_start').value,
                        "product_to": document.getElementById('product_end').value,
                        "is_active": document.getElementById("category_checkbox").checked == true ? 1 : 0,
                        "update_by": user_data[0].user_id,
                        "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
                    }
                    axios({
                        method: "put",
                        url: Apipath['UpdateAdvertisement'] + data.advertisement_id,
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
                                getAdvertisementList();
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
            document.getElementById("save_btn").style.display = "block"
            document.getElementById("loder_btn").style.display = "none"
        }
    }
    async function editBtn(Data) {
        try {
            sessionStorage.setItem("edit_data", JSON.stringify(Data));
            setErrorMsgText('');
            document.getElementById('advertisement_name').value = Data.advertisement_name;
            document.getElementById('coupon_code').value = Data.coupon_code;
            document.getElementById('offer_percentage').value = Data.offer_percentage;
            document.getElementById('valid_from').value = Data.validate_from;
            document.getElementById('valid_to').value = Data.validate_to;
            document.getElementById('product_start').value = Data.product_from;
            document.getElementById('product_end').value = Data.product_to;

            setSelectedCategoryIds(JSON.parse(JSON.stringify(categoryDropdownListRef.current)).filter(function (cat) {
                return Data.category_id.includes(cat.value)
            }));
            console.log(selectedCategoryIdsRef.current);
            await categroyOnChange();
            setSelectedSubCategoryIds(JSON.parse(JSON.stringify(subCategoryDropDownListRef.current)).filter(function (cat) {
                return Data.sub_Category_id.includes(cat.value)
            }));
            await subCategoryOnChange();
            setSelectedProductTypeIds(JSON.parse(JSON.stringify(productTypeDropdownListRef.current)).filter(function (cat) {
                return Data.product_type_id.includes(cat.value)
            }));
            setSelectedSizeIds(JSON.parse(JSON.stringify(productSizeDropdownListRef.current)).filter(function (cat) {
                return Data.product_size_id.includes(cat.value)
            }));
            setSelectedFabricIds(JSON.parse(JSON.stringify(fabricTypeDropdownListRef.current)).filter(function (cat) {
                return Data.fabric_type_id.includes(cat.value)
            }));
            setSelectedOccasionIds(JSON.parse(JSON.stringify(occationDropdownListRef.current)).filter(function (cat) {
                return Data.occasion_id.includes(cat.value)
            }));
            setSelectSleeveIds(JSON.parse(JSON.stringify(sleevePatternDropdownListRef.current)).filter(function (cat) {
                return Data.sleeve_Pattern_id.includes(cat.value)
            }));
            setSelectedNeckIds(JSON.parse(JSON.stringify(neckDesignDropdownListRef.current)).filter(function (cat) {
                return Data.neck_design_id.includes(cat.value)
            }));
            setFileName(Data.image);
            fileUploadName = Data.image;
            document.getElementById("category_checkbox").checked = Data.is_active == 1 ? true : false;
            setHeaderTiltle("Edit Advertisement");
            setButtonName("Update");
            setGridDisplay('None');
            setAddDisplay("block");
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
                url: Apipath['UpdateAdvertisement'] + id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {

                        getAdvertisementList();
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
    function deleteBtn(Data) {
        try {
            sessionStorage.setItem("edit_data", JSON.stringify(Data));
            setMessageModel("Are You Sure To Delete The Advertisement ");
            setShowModel(true);
        } catch (error) {
            console.log("Error", error);
        }
    }
    function adDeleteOkBtn() {
        try {
            let user_data = JSON.parse(sessionStorage.getItem('admin_detatils'));
            let data = JSON.parse(sessionStorage.getItem("edit_data"))
            let postData = {
                "is_delete": 0,
                "update_by": user_data[0].user_id,
                "updated_date": new Date().toLocaleString('en-ZA').replace(',', '').replace(/\//g, '-')
            }
            axios({
                method: "put",
                url: Apipath['UpdateAdvertisement'] + data.advertisement_id,
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: postData,
            })
                .then(function (response) {

                    if (response.data.error_code == '9999') {
                        setShowModel(false);
                        getAdvertisementList();
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
                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.category_name;
                                object["value"] = element.category_id;
                                setCategoryDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setCategoryDropdownList([])
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
                        subCategoryList = response.data.data;
                        let category = selectedCategoryIdsRef.current.map(a => a.value);
                        let filtersubcategory = JSON.parse(JSON.stringify(subCategoryList)).filter(function (cat) {
                            return category.includes(cat.category_id)
                        }
                        );
                        if (filtersubcategory.length > 0) {
                            filtersubcategory.forEach((element,
                            ) => {
                                let object = {};
                                object["label"] = element.sub_category_name;
                                object["value"] = element.sub_Category_id;
                                setFabricTypeDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setFabricTypeDropdownList([])
                        }
                        // setSubCategoryDropDownList(filtersubcategory)
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
    function getProductTypeDropDown() {
        try {
            axios({
                method: "get",
                url: Apipath['ProductTypeDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        productTypeList = response.data.data;
                        let category = selectedCategoryIdsRef.current.map(a => a.value);
                        let subCategories = selectedSubCategoryIdsRef.current.map(a => a.value);
                        let filtersubcategory = JSON.parse(JSON.stringify(productTypeList)).filter(function (cat) {
                            if (subCategories.length > 0)
                                return category.includes(cat.category_id) && (cat.sub_Category_id == '0' ||
                                    subCategories.includes(cat.sub_Category_id))
                            if (subCategories.length == 0)
                                return category.includes(cat.category_id) ||
                                    subCategories.includes(cat.sub_Category_id)
                        }
                        );
                        if (filtersubcategory.length > 0) {
                            filtersubcategory.forEach((element,
                            ) => {
                                let object = {};
                                object["label"] = element.product_type_name;
                                object["value"] = element.product_type_id;
                                setProductTypeDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setProductTypeDropdownList([])
                        }
                        // setProductTypeDropdownList(filtersubcategory)
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
    function getOccasionDropdown() {
        try {
            axios({
                method: "get",
                url: Apipath['OccasionDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.occasion_Name;
                                object["value"] = element.occasion_id;
                                setOccationDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setOccationDropdownList([])
                        }

                        // console.log(ocarrayRef.current);
                        // setOccationDropdownList(response.data.data)
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
    function getProductSizeDrobdown() {
        try {
            axios({
                method: "get",
                url: Apipath['ProductSizeDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {

                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.size_Name;
                                object["value"] = element.size_id;
                                setProductSizeDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setProductSizeDropdownList([])
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
    function getfabricTypeDropdown() {
        try {
            axios({
                method: "get",
                url: Apipath['FabricTypeDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {
                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element,
                            ) => {
                                let object = {};
                                object["label"] = element.fabric_name;
                                object["value"] = element.fabric_id;
                                setFabricTypeDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setFabricTypeDropdownList([])
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
    function sleevePatternDropdown() {
        try {
            axios({
                method: "get",
                url: Apipath['SleevePatternDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {

                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.sleeve_pattern_Name;
                                object["value"] = element.sleeve_pattern_id;
                                setSleevePatternDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setSleevePatternDropdownList([])
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
    function NeckDesignDrobdown() {
        try {
            axios({
                method: "get",
                url: Apipath['NeckDesignDropdownList'],
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(function (response) {
                    if (response.data.error_code == '9999') {

                        if (response.data.data.length > 0) {
                            response.data.data.forEach((element, index) => {
                                let object = {};
                                object["label"] = element.neck_design_Name;
                                object["value"] = element.neck_design_id;
                                setNeckDesignDropdownList((ocarray) => [...ocarray, object])
                            });
                        }
                        else {
                            setNeckDesignDropdownList([])
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
    async function categroyOnChange() {
        try {

            setProductTypeDropdownList([]);
            setSubCategoryDropDownList([]);
            setSelectedProductTypeIds([]);
            setSelectedSubCategoryIds([]);
            let category = selectedCategoryIdsRef.current.map(a => a.value);
            let subCategories = selectedSubCategoryIdsRef.current.map(a => a.value);
            let filtersubcategory = JSON.parse(JSON.stringify(subCategoryList)).filter(function (cat) {
                return category.includes(cat.category_id)
            }
            );
            console.log(filtersubcategory);
            filtersubcategory.forEach((element, index) => {
                let object = {};
                object["label"] = element.sub_category_name;
                object["value"] = element.sub_Category_id;
                setSubCategoryDropDownList((ocarray) => [...ocarray, object])
            });
            // await setSubCategoryDropDownList(filtersubcategory)
            let filterProdoctType = JSON.parse(JSON.stringify(productTypeList)).filter(function (cat) {
                if (subCategories.length > 0)
                    return category.includes(cat.category_id) && (cat.sub_Category_id == '0' ||
                        subCategories.includes(cat.sub_Category_id))
                if (subCategories.length == 0)
                    return category.includes(cat.category_id) ||
                        subCategories.includes(cat.sub_Category_id)
            }
            );
            if (filterProdoctType.length > 0) {
                filterProdoctType.forEach((element,
                ) => {
                    let object = {};
                    object["label"] = element.product_type_name;
                    object["value"] = element.product_type_id;
                    setProductTypeDropdownList((ocarray) => [...ocarray, object])
                });
            }
            else {
                setProductTypeDropdownList([])
            }
            // console.log(filtersubcategory);
            // await setProductTypeDropdownList(filterProdoctType)
        } catch (error) {
            console.log("Error", error);
        }
    }
    async function subCategoryOnChange() {
        try {

            setSelectedProductTypeIds([]);
            setProductTypeDropdownList([]);
            let category = selectedCategoryIdsRef.current.map(a => a.value);
            let subCategories = selectedSubCategoryIdsRef.current.map(a => a.value);
            let filterProdoctType = JSON.parse(JSON.stringify(productTypeList)).filter(function (cat) {
                if (subCategories.length > 0)
                    return category.includes(cat.category_id) && (cat.sub_Category_id == '0' ||
                        subCategories.includes(cat.sub_Category_id))
                if (subCategories.length == 0)
                    return category.includes(cat.category_id) ||
                        subCategories.includes(cat.sub_Category_id)

            }
            );

            if (filterProdoctType.length > 0) {
                filterProdoctType.forEach((element,
                ) => {
                    let object = {};
                    object["label"] = element.product_type_name;
                    object["value"] = element.product_type_id;
                    setProductTypeDropdownList((ocarray) => [...ocarray, object])
                });
            }
            else {
                setProductTypeDropdownList([])
            }

        } catch (error) {
            console.log("Error", error);
        }
    }
    function clearData() {
        try {
            setSelectedCategoryIds([]);
            setSelectedSubCategoryIds([]);
            setSelectedProductTypeIds([]);
            setSelectedSizeIds([]);
            setSelectedFabricIds([]);
            setSelectedOccasionIds([]);
            setSelectSleeveIds([]);
            setSelectedNeckIds([]);
            document.getElementById('valid_from').value = "";
            document.getElementById('valid_to').value = "";
            document.getElementById('coupon_code').value = "";
            document.getElementById('offer_percentage').value = "0";
            document.getElementById('advertisement_name').value = "";
            document.getElementById('valid_to').value = "";
            document.getElementById("valid_from").value = "";
            document.getElementById("category_checkbox").checked = false;
            setFileName('');
        } catch (error) {
            console.log("Error", error);
        }
    }
    function validation() {
        try {
            let couponCode = document.getElementById('coupon_code').value;
            let offerPercentage = document.getElementById('offer_percentage').value;
            let validFrom = document.getElementById('valid_from').value;
            let ValidTo = document.getElementById('valid_to').value;
            let productStart = document.getElementById('product_start').value;
            let productEnd = document.getElementById('product_end').value;
            let advertisementName = document.getElementById('advertisement_name').value;
            if (fileUploadName == "") {
                setErrorMsgText("Please choose the file");
                return false;
            }
            else if (advertisementName == "") {
                document.getElementById("advertisement_name").focus();
                setErrorMsgText("Please enter advertisement name field");
                return false;
            }
            else if (couponCode != "" && offerPercentage == 0) {
                document.getElementById("offer_percentage").focus();
                setErrorMsgText("Please enter offer percentage field");
                return false;

            }
            else if (offerPercentage != 0 && couponCode == '') {
                document.getElementById("coupon_code").focus();
                setErrorMsgText("Please enter coupon code field");
                return false;

            }
            else if (validFrom != '' && ValidTo == '') {
                document.getElementById("valid_to").focus();
                setErrorMsgText("Please select valid date to field");
                return false;
            }

            else if (ValidTo != '' && validFrom == '') {
                document.getElementById("valid_from").focus();
                setErrorMsgText("Please select valid date from field");
                return false;

            }
            else if (validFrom != '' && ValidTo != '' && new Date(validFrom) > new Date(ValidTo)) {
                document.getElementById("valid_to").focus();
                setErrorMsgText("Please select valid date to field");
                return false;
            }
            else if (productStart != "" && productEnd == '') {
                document.getElementById("product_end").focus();
                setErrorMsgText("Please select product end field");
                return false;
            }
            else if (productEnd != "" && productStart == '') {
                document.getElementById("product_start").focus();
                setErrorMsgText("Please select product start field");
                return false;
            }
            else if (productEnd != "" && productStart != "" && new Date(productStart) > new Date(productEnd)) {
                document.getElementById("product_end").focus();
                setErrorMsgText("Please select valid product end field");
                return false;
            }
            else {
                return true;
            }

        } catch (error) {
            console.log("Error", error);
        }
    }
    function modelClose() {
        try {
            setShowModel(false);
        } catch (error) {
            console.log("Error", error);
        }
    }
    function imgaePreview(value) {
        try {
            setPreviewImgae(value);
            setPreviewModelShow(true);
        } catch (error) {
            console.log("Error", error);
        }
    }
    function previewModelClose() {
        try {
            setPreviewModelShow(false)
        } catch (error) {
            console.log("Error", error);
        }
    }
    return (
        <Fragment>
            <div className='w-100'>
                <div className='card W-100 pb-3 ' style={{ display: gridDisplay }} >
                    <div className="card-header">
                        Advertisement
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className="row mt-3 justify-content-end">
                            <div className=" mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className=' align-items-center input_div'>
                                    <input type='search' placeholder=' Search..' className='input_box' id="search"></input>
                                    <img src={searchicon} className='inputlogo'></img>
                                </div>
                            </div>
                            <div className="col-sm-6 mt-1 col-md-3 col-lg-3 col-xl-3 text-end">
                                <button className='addBtn' onClick={() => addBtn()}>Add<img src={addicon} className='action_icon ms-2' ></img></button>
                            </div>

                        </div>
                        <div style={{ height: "53vh", overflowY: "scroll" }} className='mt-2'>
                            <table className='w-100'>
                                <thead>
                                    <tr className='thead_border'>

                                        <th> Preview</th>
                                        <th>Advertisement Name</th>
                                        <th>Coupon Code</th>
                                        <th>Offer Percentage</th>
                                        <th>Valid From</th>
                                        <th>Valid To</th>
                                        <th>Action</th>
                                        <th >Active</th>

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
                                    {!loader && advertisementList.length == 0 &&
                                        <tr className="text-center" colSpan="16">
                                            <th colSpan="8" className="nofount_text" > No Data Found </th> </tr>}
                                    {!loader && advertisementList.length > 0 &&
                                        advertisementList.map((advertisement, index) => (
                                            <tr>

                                                <td><img src={advertisement.image == "" ? aveter : Apipath["GetImage"] + advertisement.image} className='preview_image'
                                                    onClick={() => imgaePreview(advertisement.image)}></img></td>
                                                <td>{advertisement.advertisement_name}</td>
                                                <td>{advertisement.coupon_code}</td>
                                                <td>{advertisement.offer_percentage}</td>
                                                <td >{advertisement.validate_from}</td>
                                                <td>{advertisement.validate_to}</td>
                                                <td >
                                                    <div className='d-flex justify-content-center gap-3  align-items-center'>
                                                        <img src={edit} className='action_icon' onClick={() => editBtn(advertisement)}></img>
                                                        <img src={deleteimage} className='action_icon' onClick={() => deleteBtn(advertisement)}></img>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input type='checkbox'
                                                        checked={advertisement.is_active == 1 ? true : false} onClick={() => activeOnChange(advertisement.is_active, advertisement.advertisement_id)} />
                                                </td>

                                            </tr>
                                        ))}

                                    {/* // <tr>
                                    //     <td>
                                    //         <input type='checkbox'></input>
                                    //     </td>
                                    //     <td><img src={aveter} className='preview_image'></img></td>
                                    //     <td>17-08-2023</td>
                                    //     <td >17-09-2023</td>

                                    //     <td >
                                    //         <div className='d-flex justify-content-center gap-3  align-items-center'>
                                    //             <img src={edit} className='action_icon'></img>
                                    //             <img src={deleteimage} className='action_icon'></img>
                                    //         </div>
                                    //     </td>
                                    // </tr>
                                    // <tr>
                                    //     <td>
                                    //         <input type='checkbox'></input>
                                    //     </td>
                                    //     <td><img src={aveter} className='preview_image'></img></td>
                                    //     <td>17-08-2023</td>
                                    //     <td >17-09-2023</td>

                                    //     <td >
                                    //         <div className='d-flex justify-content-center gap-3 align-items-center'>
                                    //             <img src={edit} className='action_icon'></img>
                                    //             <img src={deleteimage} className='action_icon'></img>
                                    //         </div>
                                    //     </td>
                                    // </tr> */}
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
                <div className='card W-100 pb-3 ' style={{ display: addDisplay }}>
                    <div className="card-header d-flex gap-3 align-items-center">
                        <img src={bactBtnIcon} className='back_btn' onClick={() => bactBtn()}></img>
                        {headerTiltle}
                    </div>
                    <div className='table_card my-3 mx-auto'>
                        <div className='row mt-3  align-items-end'>
                            <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                <div className='row'>
                                    <div className="col-12">
                                        <div className='w-100 p-2 add_input_box'>
                                            <input type='file' id="file_upload" style={{ width: "0px" }} accept="image/*" onChange={(e) => fileUpload(e)} />
                                            <label htmlFor="file_upload" className='image_label'>
                                                <img src={fileName == "" ? aveter : Apipath["GetImage"] + fileName} className='input_image'></img>

                                            </label>
                                        </div>

                                    </div>
                                </div>


                            </div>
                            {/* <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                              </div> */}
                            <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                                <div className='row'>

                                    <div className="col-xl-12">
                                        <label className='label_text'>Advertisement Name</label>
                                        <input type='text' placeholder=' Enter' className='input_tag' id="advertisement_name" onChange={() => setErrorMsgText('')}
                                        />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className="col-xl-12">
                                        <label className='label_text'>Category</label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            defaultValue={selectedCategoryIds}
                                            value={selectedCategoryIds}
                                            isMulti
                                            onChange={(e) => { setSelectedCategoryIds(e); categroyOnChange() }}
                                            options={categoryDropdownList}

                                        />
                                        {/* <select name="cars" id="category_dropdown" className='select_tag' onChange={() => categroyOnChange()}>
                                            {
                                                categoryDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                            }
                                            {
                                                categoryDropdownList.map((item, index) => {
                                                    return <option value={item.category_id}>{item.category_name}</option>
                                                })
                                            }
                                        </select> */}
                                    </div>

                                </div>

                                {/* <div className='row mt-2'>
                                    <div className="col-xl-4">
                                        <div className='active_btn'>
                                            <span >Active</span >
                                            <input type="checkbox" />
                                        </div>

                                    </div>

                                </div>
                                <div className='row mt-2   justify-content-end'>

                                    <div className="col-xl-4">
                                        <button className='addBtn'> Save</button>
                                    </div>
                                </div> */}



                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Sub Category</label>
                                {/* <select name="cars" id="sub_category_dropdown" className='select_tag' onChange={() => subCategoryOnChange()}>
                                    {
                                        subCategoryDropDownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        subCategoryDropDownList.map((item, index) => {
                                            return <option value={item.sub_Category_id}>{item.sub_category_name}</option>
                                        })
                                    }
                                </select> */}
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedSubCategoryIds}
                                    value={selectedSubCategoryIds}
                                    isMulti
                                    onChange={(e) => { setSelectedSubCategoryIds(e); subCategoryOnChange() }}
                                    options={subCategoryDropDownList}

                                />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Product Type</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedProductTypeIds}
                                    value={selectedProductTypeIds}
                                    isMulti
                                    onChange={(e) => setSelectedProductTypeIds(e)}
                                    options={productTypeDropdownList}

                                />
                                {/* <select name="cars" id="product_type_dropdown" className='select_tag'>
                                    {
                                        productTypeDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        productTypeDropdownList.map((item, index) => {
                                            return <option value={item.product_type_id}>{item.product_type_name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Occasion</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedOccasionIds}
                                    value={selectedOccasionIds}
                                    isMulti
                                    onChange={(e) => setSelectedOccasionIds(e)}
                                    options={occationDropdownList}

                                />
                                {/* <select name="cars" id="occasion_dropdown" className='select_tag'>
                                    {
                                        occationDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        occationDropdownList.map((item, index) => {
                                            return <option value={item.occasion_id}>{item.occasion_Name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Fabric Type</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedFabricIds}
                                    value={selectedFabricIds}
                                    isMulti
                                    onChange={(e) => setSelectedFabricIds(e)}
                                    options={fabricTypeDropdownList}

                                />
                                {/* <select name="cars" id="fabric_type_dropdown" className='select_tag'>
                                    {
                                        fabricTypeDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        fabricTypeDropdownList.map((item, index) => {
                                            return <option value={item.fabric_id}>{item.fabric_name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Sleeve Pattern</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectSleeveIds}
                                    value={selectSleeveIds}
                                    isMulti
                                    onChange={(e) => setSelectSleeveIds(e)}
                                    options={sleevePatternDropdownList}

                                />
                                {/* <select name="cars" id="sleeve_dropdown" className='select_tag'>
                                    {
                                        sleevePatternDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        sleevePatternDropdownList.map((item, index) => {
                                            return <option value={item.sleeve_pattern_id}>{item.sleeve_pattern_Name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Neck Design</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedNeckIds}
                                    value={selectedNeckIds}
                                    isMulti
                                    onChange={(e) => setSelectedNeckIds(e)}
                                    options={neckDesignDropdownList}

                                />
                                {/* <select name="cars" id="neck_design_dropdown" className='select_tag'>
                                    {
                                        neckDesignDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        neckDesignDropdownList.map((item, index) => {
                                            return <option value={item.neck_design_id}>{item.neck_design_Name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Size</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedSizeIds}
                                    value={selectedSizeIds}
                                    isMulti
                                    onChange={(e) => setSelectedSizeIds(e)}
                                    options={productSizeDropdownList}

                                />
                                {/* <select name="cars" id="size_dropdown" className='select_tag'>
                                    {
                                        productSizeDropdownList.length > 0 ? <option value="0">Please select</option> : <option value="0">No Data Found</option>
                                    }
                                    {
                                        productSizeDropdownList.map((item, index) => {
                                            return <option value={item.size_id}>{item.size_Name}</option>
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Valid Date From</label>
                                <input type='date' className="input_tag" min={minDate} id="valid_from" onChange={() => setErrorMsgText('')} />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Valid Date To</label>
                                <input type='date' className="input_tag" min={minDate} id="valid_to" onChange={() => setErrorMsgText('')} />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Product Start</label>
                                <input type='date' className="input_tag" id='product_start' onChange={() => setErrorMsgText('')} />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Product End</label>
                                <input type='date' className="input_tag" id='product_end' onChange={() => setErrorMsgText('')} />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Coupon Code</label>
                                <input type='text' placeholder=' Enter' className='input_tag' id="coupon_code" onChange={() => setErrorMsgText('')}
                                />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <label className='label_text'>Offer Percentage</label>
                                <input type='number' className='input_tag' min='0' id="offer_percentage" onChange={() => setErrorMsgText('')}
                                />
                            </div>
                            <div className="col-sm-12 mt-3 col-md-6 col-lg-4 col-xl-4">
                                <div className='active_btn'>
                                    <span className='label_text' >Active</span >
                                    <input type="checkbox" id="category_checkbox" />
                                </div>
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
                        <div className="col-sm-12">


                            <div className='row  justify-content-end'>

                                <div className="col-xl-2">
                                    <button className='addBtn' id="save_btn" onClick={() => saveBtn()}> {buttonName}</button>
                                    <button className='addBtn' id='loder_btn' style={{ display: "none" }}>
                                        <div class="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal show={show} size="md" onHide={() => setShow(false)} backdrop="static" centered>
                <Modal.Body>
                    <div className='d-flex justify-content-center model_content'>
                        Are You Sure To Delete The Advertisement ?
                    </div>
                    <div className='d-flex mt-3 gap-3 justify-content-center'>
                    <button className='model_btn' id="model_btn" style={{backgroundColor:"green"}}> Ok</button>
                    <button className='model_btn' id="model_btn"  style={{backgroundColor:"red"}} onClick={() => setShow(false)}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal> */}
            {showModel &&
                <SuccsessModel
                    show={showModel}
                    message={messageModel}
                    functionName={adDeleteOkBtn}
                    colseModel={modelClose}
                />}
            {previewModelShow &&
                <AdvertimentPriviewMmodel
                    show={previewModelShow}
                    adImgage={previewImgae}
                    colseModel={previewModelClose}
                />}



        </Fragment>
    )
}
export default Advertisement;