import Credential from './credencial'

let Apipath ={
    "Login":Credential["GlobalUrl"]+"user/user_login",//post
    "GetCustomerList":Credential["GlobalUrl"]+"user/get_user_list",//post
    "AddCategory":Credential["GlobalUrl"]+"category/Add_Category", //post
    "GetCategoryList":Credential["GlobalUrl"]+"category/get_category_list",//post
    "UpdateCategory" :Credential["GlobalUrl"] +"category/Update_Category/" , //put
    "GetCategoryDropdownList":Credential["GlobalUrl"] +"category/get_dropdown_category_list",//get
    "AddSubCategory":Credential["GlobalUrl"] + "sub_category/add_sub_Category", //post
    "GetSubCategoryDropdownList":Credential["GlobalUrl"]+"sub_category/get_sub_category_dropdown_list", //post
    "mulitipleUpdateSubCategory":Credential["GlobalUrl"]+"sub_category/update_sub_Category", //post
    "UpdateSubCategory":Credential["GlobalUrl"]+"sub_category/update_sub_category_name/", //put
    "GetSubCategoryList":Credential["GlobalUrl"]+"sub_category/get_sub_category_list",//post
    "GetProductTypeList":Credential["GlobalUrl"]+"product_type/get_product_type_list", //post
    "UpdateProductType" :Credential["GlobalUrl"]+"product_type/update_product_type/",// put
    "AddProductType" : Credential["GlobalUrl"] + "product_type/add_product_type",//post
    "GetFabricTypeList":Credential["GlobalUrl"] + "fabric_type/get_fabric_type_list", //post
    "UpdateFabricType":Credential["GlobalUrl"] + "fabric_type/update_fabric_type/", //put
    "AddFabricType":Credential["GlobalUrl"] +"fabric_type/add_fabric_type",//post
    "GetSleevePatternList":Credential["GlobalUrl"] +"sleeve_pattern/get_sleeve_pattern_list",//post
    "UpdateSleevePatternList":Credential["GlobalUrl"] + "sleeve_pattern/update_sleeve_pattern/" , //put
    "AddSleevePattern":Credential["GlobalUrl"] + "sleeve_pattern/add_sleeve_pattern",//post
    "GetNeckDesignList":Credential["GlobalUrl"] +"neck_design/get_neck_design_list" ,//post
    "UpdateNeckDesign":Credential["GlobalUrl"]+"neck_design/update_neck_design/",//put
    "AddNeckdesign":Credential["GlobalUrl"]+"neck_design/add_neck_design",//post
    "GetOccasionList":Credential["GlobalUrl"]+"occasion/get_occasion_list",//post
    "UpdateOccasion":Credential["GlobalUrl"]+"occasion/update_occasion/",//put
    "AddOccasion":Credential["GlobalUrl"]+"occasion/add_occasion", //post
    "GetProductSizeList":Credential["GlobalUrl"]+"product_size/get_product_size_list", //post
    "UpdateProductSize":Credential["GlobalUrl"]+"product_size/update_product_size/",//put
    "AddProductSize":Credential["GlobalUrl"]+"product_size/add_product_size",//post
    "ProductTypeDropdownList":Credential["GlobalUrl"]+"product_type/get_product_type_dropdown_list",//get
    "OccasionDropdownList":Credential["GlobalUrl"]+"occasion/get_occasion_dropdown_list",//get
    "ProductSizeDropdownList":Credential["GlobalUrl"]+"product_size/get_product_size_dropdown_list",//get
    "FabricTypeDropdownList":Credential["GlobalUrl"]+"fabric_type/get_fabric_type_dropdown_list",//get
    "SleevePatternDropdownList":Credential["GlobalUrl"] + "sleeve_pattern/get_sleeve_pattern_dropdown_list" ,//get
    "NeckDesignDropdownList":Credential["GlobalUrl"] + "neck_design/get_neck_design_dropdown_list",//get
    "GetImage":Credential["GlobalUrl"]+"file/view_upload_file/",//get
    "ImageUpload":Credential["GlobalUrl"]+"file/upload_files" , //post
    "DeleteImage":Credential["GlobalUrl"]+"file/delete_file/" ,//delete
    "AddAdvertisement":Credential["GlobalUrl"] +"advertisement/add_advertisement" ,//post
    "GetAdvertisementList":Credential["GlobalUrl"]+"advertisement/get_advertisement_list",//post
    "UpdateAdvertisement":Credential["GlobalUrl"]+"advertisement/update_advertisement/" , //put
    "GetAllProductRatingList":Credential["GlobalUrl"]+"ratting/get_all_product_rating_list",//post
    "GetProductRattingList":Credential["GlobalUrl"]+"ratting/get_product_rating_list",//post
    "UpdateRatting":Credential["GlobalUrl"]+"ratting/update_ratting/",//put
    "GetProductList":Credential['GlobalUrl']+"product/get_product_list",//post
    "UpdateProduct":Credential['GlobalUrl']+"product/update_product",//put
    "AddProduct":Credential['GlobalUrl']+"product/add_product",//post
    "UpdateSupProduct":Credential['GlobalUrl'] +"product/update_sub_product",//post
    "AddSubProduct":Credential['GlobalUrl'] +"product/add_sub_product",//post
    "AddBrand":Credential['GlobalUrl'] +"brand/add_brand",//post
    "UpdateBrand":Credential['GlobalUrl'] +"brand/update_brand/",//put
    "GetBrandList":Credential['GlobalUrl'] +"brand/get_brand_list",//post
    "GetBrandDropdownList":Credential['GlobalUrl'] +"brand/get_brand_dropdown_list",//get
    "UpdateProductOnly":Credential['GlobalUrl'] +'product/update_product_only/',//put
    "GetOrderDetailsList":Credential['GlobalUrl'] +'order/get_order_details_list',//post
    "UpdateOrderDetails":Credential['GlobalUrl'] +"order/update_order_details/",//put
    "AddPostalService":Credential['GlobalUrl'] +"postal_service/add_postal_service",//post
    "UpdatePostalService":Credential['GlobalUrl'] +"postal_service/update_postal_service/",//put
    "GetPostalServiceList":Credential['GlobalUrl'] +"postal_service/get_postal_service_list",//post
    "GetDropDownPostalService":Credential['GlobalUrl']+"postal_service/get_postal_service_dropdown_list",//get
    "AddTax":Credential['GlobalUrl'] + "tax/add_tax",//post
    "UpdateTax":Credential['GlobalUrl']+"tax/update_tax/",//put
    'GetTalList':Credential['GlobalUrl']+"tax/get_tax_list",//post
    "GetDropDownTax":Credential['GlobalUrl']+"tax/get_tax_dropdown_list",//Get
    "AddDeliveryCharge":Credential['GlobalUrl']+"delivery_charge/add_deliver_charge",//post
    "UpdateDeliveryCharge":Credential['GlobalUrl']+"delivery_charge/update_deliver_charge/",//put
    "GetDeliveryChargeList":Credential['GlobalUrl']+"delivery_charge/get_deliver_charge_list",//post
    "GetCountryList":Credential['GlobalUrl'] +"postal_service/get_country_list/",//get
    "DeleteProduct":Credential['GlobalUrl'] +"product/delete_product/",//put
    "DeleteSubProduct":Credential['GlobalUrl']+"product/delete_sub_product/",//put
    'UpdateProductIsActive':Credential['GlobalUrl']+"product/update_product_is_ctive/",//put
    "GetRefundPrice":Credential['GlobalUrl']+"order/get_order_price",//post
    "RazorpayRefund":Credential['GlobalUrl']+"file/razorpay_refund_amount",//post
    "InsertRefund":Credential['GlobalUrl']+"order/update_order_refund",//post
    "GetOrderList":Credential['GlobalUrl']+'order/get_order_list',//post
    "GetRevenueItems":Credential['GlobalUrl']+'dashboard/get_revenue_items',//get
    "GetAmountByProduct":Credential['GlobalUrl']+'dashboard/get_prod_amt',//get
    "GetAmountByCategory":Credential['GlobalUrl']+'dashboard/get_category_amt_list',//get
    "GetQuantityOfProducts":Credential['GlobalUrl']+'dashboard/get_prdt_qnt',//get
    "GetTotalProfit":Credential['GlobalUrl']+'dashboard/get_tot_profit',//get
    "GetProfitForCategories": Credential['GlobalUrl']+'dashboard/get_profit_by_category', //get
    "GetTotalQuantity": Credential['GlobalUrl']+'dashboard/get_tot_qntt', //get
    "GetProductsSold": Credential['GlobalUrl']+'dashboard/get_prod_sold', //get
    "GetTotalExpenses": Credential['GlobalUrl']+'dashboard/get_expenses', //get
    "GetProfitByMonth": Credential['GlobalUrl']+'dashboard/get_profit_by_month', //get
    "GetProfitByProduct": Credential['GlobalUrl']+'dashboard/get_tot_pft_by_prod', //get
    "GetActualCost": Credential['GlobalUrl']+'dashboard/get_actual_cost', //get
    "GetSellingCost": Credential['GlobalUrl']+'dashboard/get_selling_cost', //get
    "GetProductTypeName": Credential['GlobalUrl']+'dashboard/get_product_type_filter', //get

}

export default Apipath; 