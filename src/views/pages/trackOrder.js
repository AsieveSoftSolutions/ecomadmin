import React, { useState, useEffect, Fragment } from 'react'
import { Button, Nav, Collapse, Navbar, Container } from 'react-bootstrap'
import '../../assets/scss/pages/pagescustom.scss'
import aveter from '../../assets/images/avatars/01.png'
import searchicon from '../../assets/images/icons/search.svg'
const TackOrder = () => {




    return (
        <Fragment>
            <div className='card W-100 ' >
                <div className="card-header">
                    Track Order
                </div>
                <div className='table_card my-3 mx-auto'>
                    <div className="row justify-content-end">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <div className='mt-4 align-items-center input_div'>
                                <input  type='search' placeholder='example@gmail.com' className='input_box'></input>
                                <img src={searchicon} className='inputlogo'></img>
                            </div>
                        </div>

                    </div>
                    <div style={{ overflowX: 'auto' }} className='mt-2'>
                        <table className='w-100'>
                            <thead>
                                <tr className='thead_border'>
                                    <th >Pofile</th>
                                    <th>Buyer Name</th>
                                    <th>Product Id</th>
                                    <th>Product </th>
                                    <th>Order ID</th>
                                    <th>Status </th>
                                    <th>Price</th>
                                    <th>Address </th>
                                    <th>Delivery Person </th>
                                    <th>Date Of Order  </th>
                                    <th>Date of Delivery </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={aveter} style={{ width: "30px" }}></img></td>
                                    <td>Dora</td>
                                    <td>ID001</td>
                                    <td >Kurthi</td>
                                    <td >183</td>
                                    <td >$132</td>
                                    <td >Delivery </td>
                                    <td >Trichy </td>
                                    <td >Partner </td>
                                    <td >18-10-2023 </td>
                                    <td >25-10-2023 </td>
                                </tr>
                                <tr>
                                    <td><img src={aveter} style={{ width: "30px" }}></img></td>
                                    <td>Dora</td>
                                    <td>ID001</td>
                                    <td >Kurthi</td>
                                    <td >183</td>
                                    <td >$132</td>
                                    <td >Delivery </td>
                                    <td >Trichy </td>
                                    <td >Partner </td>
                                    <td >18-10-2023 </td>
                                    <td >25-10-2023 </td>

                                </tr>
                                <tr>
                                     <td><img src={aveter} style={{ width: "30px" }}></img></td>
                                    <td>Dora</td>
                                    <td>ID001</td>
                                    <td >Kurthi</td>
                                    <td >183</td>
                                    <td >$132</td>
                                    <td >Delivery </td>
                                    <td >Trichy </td>
                                    <td >Partner </td>
                                    <td >18-10-2023 </td>
                                    <td >25-10-2023 </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
export default TackOrder;