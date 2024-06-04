import React, { useState, useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import "../assets/scss/pages/pagescustom.scss"
import Modal from 'react-bootstrap/Modal';
import Aveter from '../assets/images/avatars/01.png'
import StarRatings from 'react-star-ratings';
import closeicon from '../assets/images/icons/close.png'
import uploadIcon from '../assets/images/icons/upload.png';
import { SketchPicker } from 'react-color';
import Apipath from '../config/apipath';
export const SuccsessModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.show)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="md" onHide={() => setShow(false)} backdrop="static" centered>
            <Modal.Body>
                <div className='d-flex justify-content-center model_content'>
                    {props.message}
                </div>
                <div className='d-flex mt-3 gap-3 justify-content-center'>
                    <button className='model_btn' id="model_btn" style={{ backgroundColor: "green" }} onClick={props.functionName}> Ok</button>

                    <button className='model_btn' id="model_btn" style={{ backgroundColor: "red" }} onClick={props.colseModel}>Cancel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export const DeliveryModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.show)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="md" onHide={() => setShow(false)} backdrop="static" centered>
            <Modal.Body>
                <div className='d-flex justify-content-center model_content'>
                    {props.message}
                </div>
                <div className='d-flex mt-3 gap-3 justify-content-center'>
                    {!props.loader &&
                        <button className='model_btn' id="model_btn"
                            style={{ backgroundColor: "green" }} onClick={props.functionName}
                        > Ok</button>
                    }

                    {props.loader &&
                        <button className='model_btn' style={{ backgroundColor: "green" }}>
                            <div class="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    }
                    <button className='model_btn' id="model_btn"
                        style={{ backgroundColor: "red" }} onClick={props.colseModel}
                        disabled={props.loader}>Cancel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export const ShippedModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.show)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="md" backdrop="static" centered>
            <Modal.Body>
                <div className='d-flex justify-content-end mr-2'>
                    <img className='close_btn' id="close_btn" src={closeicon} onClick={props.colseModel} />
                </div>

                <div>
                    <div className="row">

                        <div className=" mt-2 col-xl-8">
                            <label className='label_text'>Track ID</label>
                            <input
                                type='text'
                                className='input_tag'
                                value={props.trackId}
                                onChange={(e) => {
                                    props.setTrackId(e.target.value);
                                    props.setErrorMsgText('')
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className=" mt-2 col-xl-8">
                            <label className='label_text'>Expected Delivery Date</label>
                            <input type='date' className="input_tag" min={props.modelMaxDate}
                                id='from_date' value={props.expectDeliveryDate}
                                onChange={(e) => { props.setExpectDeliveryDate(e.target.value); props.setErrorMsgText('') }} />
                        </div>
                    </div>
                </div>



                <div className='col-xl-12'>
                    <div className='d-flex justify-content-center'>
                        {
                            props.errorMsgText != "" && <div className='errormsg'>
                                {props.errorMsgText}
                            </div>
                        }

                    </div>
                </div>
                <div className='d-flex mt-3 gap-3 justify-content-center'>
                    {!props.loader &&
                        < button className='model_btn' id="model_btn"
                            style={{ backgroundColor: "green" }} onClick={props.functionName}
                            disabled={props.loader} > Save</button>
                    }
                    {props.loader &&
                        <button className='model_btn' style={{ backgroundColor: "green" }}>
                            <div class="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    }

                    <button className='model_btn' id="model_btn"
                        style={{ backgroundColor: "red" }} onClick={props.colseModel}
                        disabled={props.loader}>Cancel</button>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export const RattingModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.show)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="lg" backdrop="static" >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <div className='d-flex justify-content-end mr-2'>
                    <img className='close_btn' id="close_btn" src={closeicon} onClick={props.modelClose} />
                </div>
                <div>Review Filter</div>
                <div className='d-flex gap-4 mt-3 mb-3 ml-12'>
                    <div className={props.reviewFilterValue != 'all' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('all')}>All</div>
                    <div className={props.reviewFilterValue != '1' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('1')}>1*</div>
                    <div className={props.reviewFilterValue != '2' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('2')}>2*</div>
                    <div className={props.reviewFilterValue != '3' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('3')}>3*</div>
                    <div className={props.reviewFilterValue != '4' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('4')}>4*</div>
                    <div className={props.reviewFilterValue != '5' ? 'review_filter_detatils' : "review_filter_detatils_selected"}
                        onClick={() => props.functionName1('5')}>5*</div>

                </div>
                <div className='mt-2'>
                    <label >Customer Review</label>
                </div>
                <div className='ml-2 mt-2'>
                    {props.reviewList.length == 0 &&

                        <div className="nofount_text" > No Data Found </div>}
                    {props.reviewList.length > 0 && props.reviewList.map(ratting => (
                        <div className='mt-1'>
                            <div className='d-flex gap-4 align-items-center'>
                                <div className='review_image'>
                                    <img
                                        src={ratting.profile != undefined && ratting.profile != '' ? ratting.profile : Aveter} alt="" style={{ height: '100%', width: "100%" }} />
                                </div>
                                <lable className="review_name">{ratting.users.length > 0 ? ratting.users[0].user_name : ""}</lable>
                                {/* <lable className="review_size">
								{ratting.sub_product.length > 0 &&
									ratting.sub_product[0].product_size.length > 0 ? ratting.sub_product[0].product_size[0].size_Name : ""}
							</lable> */}
                                <input type='checkbox'
                                    checked={ratting.is_active == 1 ? true : false} onClick={() => props.activeOnChange(ratting.is_active, ratting.ratting_id)} />
                            </div>
                            <div>
                                <StarRatings
                                    rating={ratting.ratting_value}
                                    starRatedColor="gold"
                                    starDimension="20px"
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            <div>
                                <lable className="review_discrip">{ratting.feedback}</lable>
                            </div>
                        </div>
                    ))}

                    {props.reviewLimit < props.reviewCount &&
                        <div className='d-flex align-items-center justify-content-end '>
                            <label className='readmore_text' onClick={() => props.readMoreFunction()}>Read More...</label>
                        </div>}
                </div>
            </Modal.Body>
        </Modal>
    )
}
// export default { SuccsessModel, RattingModel };
export const EditSubProductModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.modelShow)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="lg" backdrop="static" >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <div className='d-flex justify-content-end mr-2'>
                    <img className='close_btn' id="close_btn" src={closeicon} onClick={props.onClose} />
                </div>
                <div className='row mt-2'>
                    <div className="col-sm-12 mt-2 ">
                        <label className='label_text'>File Upload</label>
                        <div className='input_tag d-flex justify-content-between file_upload'>
                            <input
                                type='file'
                                id="edit_file_upload"
                                style={{ width: "0px" }}
                                onChange={(e) => {
                                    props.fileUpload(e)
                                }}

                                multiple
                                accept="image/*"
                            />
                            <div className='product_image_list_div'>
                                {props.subProduct.images.map((fileName, index) => (
                                    <div className='product_image_div'>
                                        <img
                                            className='product_image'
                                            key={index}
                                            src={Apipath['GetImage'] + fileName}
                                            alt={`Selected Image ${index + 1}`}

                                        />
                                        <img src={closeicon} className='product_close_icon'
                                            onClick={() => props.deleteModelSubProductImage(fileName)} />
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="edit_file_upload" style={{ width: '25px', height: '50px' }}>
                                <img src={uploadIcon} style={{ height: '20%', width: '100%', cursor: 'pointer' }} alt="Upload Icon" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" mt-2 col-xl-4">
                            <label className='label_text'>Price</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={props.subProduct.price}
                                onChange={(e) => {
                                    props.setVariable({ ...props.subProduct, price: e.target.value });
                                }}
                            />
                        </div>
                        <div className=" mt-2  col-xl-4">
                            <label className='label_text'>Quantity</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={props.subProduct.quantity}
                                disabled />
                        </div>
                        <div className=" mt-2  col-xl-4">
                            <label className='label_text'>Update Quantity</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={props.subProduct.update_Quantity}
                                onChange={(e) => {
                                    props.setVariable({ ...props.subProduct, update_Quantity: e.target.value });
                                }} />
                        </div>
                        <div className=" mt-3 col-xl-4">
                            <label className='label_text'>Cost Per Item</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={props.subProduct.cost_per_item}
                                onChange={(e) => {
                                    props.setVariable({ ...props.subProduct, cost_per_item: e.target.value });
                                }}

                            />
                        </div>
                        <div className=" mt-2 col-xl-4">
                            <label className='label_text'>Profit</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={parseInt(props.subProduct.price) - (parseInt(props.subProduct.cost_per_item) + parseInt(props.subProduct.expense))}
                                disabled />
                        </div>
                        <div className=" mt-2 col-xl-4">
                            <label className='label_text'>Margin (%)</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={((parseInt(props.subProduct.price) - (parseInt(props.subProduct.cost_per_item) + parseInt(props.subProduct.expense))) / parseInt(props.subProduct.price) * 100).toFixed(2)}
                                disabled />
                        </div>
                        <div className=" mt-2  col-xl-4">
                            <label className='label_text'>Expenses</label>
                            <input
                                type='number'
                                className='input_tag'
                                value={props.subProduct.expense}
                                onChange={(e) => {
                                    props.setVariable({ ...props.subProduct, expense: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex mt-3 gap-3 justify-content-center'>
                    <button className='model_btn' id="model_update_btn" style={{ backgroundColor: "#ED6D7D" }} onClick={props.saveBtn}>Update</button>
                    <button className='model_btn' id='loder_btn' style={{ display: "none" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </button>

                </div>
            </Modal.Body>
        </Modal>
    )
}



export const AddSubProductModel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.modelShow)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} size="xl" backdrop="static" scrollable={true} >
            <Modal.Header>
                <div className='d-flex w-100 justify-content-end mr-2'>
                    <img className='close_btn' id="close_btn" src={closeicon} onClick={props.onClose} />
                </div>
            </Modal.Header>
            <Modal.Body>

                <div className="row mt-2">
                    <div className=" mt-1 col-lg-4">
                        <label className="label_text">Color Selection</label>
                        <div className="input_tag">
                            <SketchPicker
                                color={props.color}
                                onChange={props.colorChoose}
                                disableAlpha={true}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <label className="label_text">Selected Color</label>
                        <div className="selected_colors_container">
                            {props.color != '' &&
                                <div className="color_card" style={{ backgroundColor: props.color, width: '100px', height: '100px', marginTop: '5px', marginLeft: '20px' }}
                                    onClick={() => props.colorSelected(props.color)}>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <label className="label_text">Final Colors</label>
                        <div>

                            {
                                props.colorList.length > 0 &&
                                props.colorList.map((colorData, index) => (
                                    <div key={index}>
                                        <div className='d-flex mt-2 gap-3 justify-content-between align-items-center' style={{ height: '40px' }}>
                                            <div className='color_card'
                                                style={{ backgroundColor: colorData, width: '80%', height: '100%', border: "2px solid black" }} ></div>
                                            <span style={{ cursor: 'pointer' }}>

                                                <input type="radio" id="css" name="fav_language" value="CSS"
                                                    style={{ height: "18px", width: '18px' }}
                                                    onClick={() => props.colorChecked(colorData)} />
                                            </span>
                                            <img src={closeicon} className='color_romvoe_icon'
                                                onClick={() => props.removeAddColor(colorData)} />

                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-sm-12 mt-2 ">
                        <label className='label_text'>File Upload</label>
                        <div className='input_tag d-flex justify-content-between file_upload'>
                            <input
                                type='file'
                                id="add_file_upload"
                                style={{ width: "0px" }}
                                onChange={(e) => {
                                    props.productImageUpload(e)
                                }}

                                multiple
                                accept="image/*"
                            />
                            <div className='product_image_list_div'>
                                {props.imageList.map((fileName, index) => (
                                    <div className='product_image_div'>
                                        <img
                                            className='product_image'
                                            key={index}
                                            src={Apipath['GetImage'] + fileName}
                                            alt={`Selected Image ${index + 1}`}

                                        />
                                        <img src={closeicon} className='product_close_icon'
                                            onClick={() => props.deleteProductImage(fileName)} />
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="add_file_upload" style={{ width: '25px', height: '50px' }}>
                                <img src={uploadIcon} style={{ height: '20%', width: '100%', cursor: 'pointer' }} alt="Upload Icon" />
                            </label>
                        </div>
                    </div>
                </div>
                {props.subProductList &&
                    props.subProductList.length > 0 &&
                    <div className='row'>
                        <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                            <label className='label_text'>Color Family <span style={{ color: 'red' }}>*</span></label>
                            <select
                                name="occasion"
                                id="occasion"
                                className='select_tag'
                                value={props.subFamilyColor}
                                onChange={(e) => { props.setSubFamilyColo(e.target.value); props.subfamilyColorOnChange() }}
                            >
                                <option value="">Select</option>
                                {props.subFamilColorList.map(value => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                <div className='row mt-2'>
                    {props.sizeErrMsg &&
                        <div className='errormsg'>
                            {props.sizeErrMsg}
                        </div>
                    }
                    {props.subProductList &&
                        props.subProductList.length > 0 &&
                        props.subProductList.map((colorData, index) => (
                            <div key={index} >
                                {props.selectedNoSize != 1 &&
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4" style={{ width: 'fit-content' }}>
                                        <label className="label_text">Size <span style={{ color: 'red' }}>*</span></label>
                                        <div className='d-flex justify-content-between align-items-center input_tag' style={{ padding: "20px 15px" }}>
                                            {props.productSizeList.map((productSize, formIndex) => (
                                                <div>
                                                    {
                                                        !props.alredySizeList.includes(productSize.size_id) &&
                                                        <div className='radio_div' style={{ paddingLeft: '40px' }} key={productSize.size_id}>
                                                            <label>{productSize.size_Name}</label>
                                                            <input
                                                                type="checkbox"
                                                                name={`size_${formIndex}`}
                                                                checked={colorData.size.includes(productSize.size_id)}
                                                                onChange={() => {
                                                                    props.productInputChange({ target: { value: productSize.size_id } }, index, 'size');
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                }

                                <div className="row">
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Price <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={colorData.price}
                                            onChange={(e) => props.productInputChange(e, index, 'price')}
                                        />
                                    </div>
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Quantity <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={colorData.quantity}
                                            onChange={(e) => props.productInputChange(e, index, 'quantity')}
                                        />
                                    </div>
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Cost Per Item <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={colorData.cost}
                                            onChange={(e) => props.productInputChange(e, index, 'cost')}
                                        />
                                    </div>
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Profit</label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={parseInt(colorData.price) -
                                                (parseInt(colorData.cost) +
                                                  parseInt(colorData.expense))}
                                            disabled />
                                    </div>
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Margin (%)</label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={(
                                                ((parseInt(colorData.price) -
                                                  (parseInt(colorData.cost) +
                                                    parseInt(colorData.expense))) /
                                                  parseInt(colorData.price)) *
                                                100).toFixed(2)}
                                            disabled />
                                    </div>
                                    <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                                        <label className='label_text'>Expenses </label>
                                        <input
                                            type='text'
                                            className='input_tag'
                                            value={colorData.expense}
                                            onChange={(e) => props.productInputChange(e, index, 'expense')}
                                        />
                                    </div>

                                </div>
                            </div>

                        ))}
                </div>
                {props.subProductList &&
                    props.subProductList.length > 0 &&
                    props.subProductList[props.subProductList.length - 1].size.length > 0 &&
                    props.selectedSize.length < props.productSizeList.length &&
                    <div className='row' >
                        <div className='col'>
                            <button className='model_btn' style={{ backgroundColor: "#ED6D7D" }} onClick={props.addProductSize}> Add Another Size </button>

                        </div>

                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                {
                    props.errMsg != "" && <div className='errormsg'>
                        {props.errColorList.length > 0 &&
                            <div className='d-flex gap-3'>
                                {props.errColorList.map((colorData, index) => (
                                    <div className='error_color_cart' style={{ backgroundColor: colorData }}></div>
                                ))}
                            </div>
                        }


                        {props.errMsg}
                    </div>
                }
                <button className='model_btn' id="model_save_btn" style={{ backgroundColor: "#ED6D7D" }} onClick={props.saveBtn} >Save</button>
                <button className='model_btn' id='add_loder_btn' style={{ display: "none", backgroundColor: "#ED6D7D" }}>
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export const AdvertimentPriviewMmodel = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        init()

    }, []);
    function init() {
        try {
            setShow(props.show)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (

        <Modal show={show} fullscreen={true} onHide={() => setShow(false)} backdrop="static" centered>
            <Modal.Header>
                <div className='d-flex w-100 justify-content-end mr-2'>
                    <img className='close_btn' id="close_btn" src={closeicon} onClick={props.colseModel} />
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='w-100 ' style={{  height: '70vh'}}>
                    <img src={ Apipath['GetImage'] + props.adImgage } className='preview_model_imgae'>
                    
                    </img>
                   
                </div>

            </Modal.Body>
        </Modal>
    )
}