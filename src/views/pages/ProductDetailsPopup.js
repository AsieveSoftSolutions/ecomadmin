
import React, { useState, useEffect, Fragment } from 'react'
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import Apipath from '../../config/apipath';
import Modal from 'react-bootstrap/Modal';
import closeIcon from '../../assets/images/icons/close.png'
import '../../assets/scss/pages/pagescustom.scss';
import edit from '../../assets/images/icons/edit.svg';
import deleteimage from '../../assets/images/icons/delete.svg';
// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// ProductDetailsPopup component
const ProductDetailsPopup = (props) => {
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

    <Modal show={show} size="xl" onHide={() => setShow(false)} backdrop="static" centered>
      <Modal.Body>
        <div className='d-flex justify-content-end mr-2'>
          <img className='close_btn' src={closeIcon} onClick={props.onClose} />
        </div>

        <div className="table-responsive mt-3">
          <table className='w-100'>
            <thead>
              <tr className='thead_border'>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Product Type</th>
                <th>Available Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              <tr key={props.product.product_id}>
                <td>{props.product.product_id}</td>
                <td>{props.product.product_name}</td>
                <td>{props.product.category.length > 0 ? props.product.category[0].category_name : ''}</td>
                <td>{props.product.sub_category.length > 0 ? props.product.sub_category[0].sub_category_name : ''}</td>
                <td>{props.product.product_type.length > 0 ? props.product.product_type[0].product_type_name : ''}</td>

                <td>{props.product.available_quantity}</td>
                <td><button className='model_btn' id="model_update_btn"
                  style={{ backgroundColor: "#ED6D7D" }} onClick={props.addBtn}>Add </button></td>

              </tr>

            </tbody>
          </table>

        </div>
        <div className="table-responsive mt-3" style={{ height: "45vh", overflowY: "scroll" }}>
          <table className='w-100'>
            <thead>
              <tr className='thead_border'>
                <th>Sub Product ID</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {props.product.sub_product.length > 0 && props.product.sub_product.map((subProd, index) => (
                <tr key={subProd.sub_product_id}>
                  <td>{subProd.sub_product_id}</td>
                  <td> <div
                    style={{
                      backgroundColor: subProd.color,
                      width: '30px',
                      height: '30px',
                    }}
                  /></td>
                  <td>{subProd.product_size.length > 0 ? subProd.product_size[0].size_Name : ''}</td>
                  <td>{subProd.price}</td>
                  <td>{subProd.quantity}</td>
                  <td>{subProd.profit}</td>

                  <td>{subProd.margin}%</td>
                  <td><img
                    key={index}
                    src={Apipath['GetImage'] + subProd.images[0]}
                    alt={`Selected Image ${index + 1}`}
                    style={{ height: '20px', width: '20px', marginRight: '10px' }}
                  /></td>
                  <td>
                    <div className='d-flex justify-content-around align-items-center gap-2'>
                      <img
                        src={deleteimage}
                        alt='Delete'
                        className='action_icon'
                        onClick={() => props.subProductDeleteBtn(subProd, 'sub_product_dlt')}
                      />
                      <img
                        src={edit}
                        onClick={() => props.modelSubProductEditBtn(subProd)}
                        alt='Edit'
                        className='action_icon'
                      />
                    </div></td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailsPopup;
