import React, { useEffect, Fragment } from "react";
import { Button, Nav, Collapse, Navbar, Container } from "react-bootstrap";
import "../../assets/scss/pages/pagescustom.scss";
import aveter from "../../assets/images/avatars/01.png";
import edit from "../../assets/images/icons/edit.svg";
import deleteimage from "../../assets/images/icons/delete.svg";
import addicon from "../../assets/images/icons/addicon.svg";
import searchicon from "../../assets/images/icons/search.svg";
import bactBtnIcon from "../../assets/images/icons/bactBtn.svg";
import uploadIcon from "../../assets/images/icons/upload.png";
import { SketchPicker } from "react-color";
import ProductDetailsPopup from "./ProductDetailsPopup";
import Apipath from "../../config/apipath";
import openeye from "../../assets/images/icons/openeye.svg";
import ReactPaginate from "react-paginate";
import "../../assets/custom/css/pagination.css";
import axios from "axios";
import useState from "react-usestateref";
import closeIcon from "../../assets/images/icons/close.png";
import { Await } from "react-router-dom";
import { EditSubProductModel as EditSubProductModel } from "../../components/models";
import { AddSubProductModel as AddSubProductModel } from "../../components/models";
import { SuccsessModel as SuccsessModel } from "../../components/models";
const Product = () => {
  const [ProductData, setProductData] = useState([]);
  const [firstProduct, setFirstProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct, selectedProductRef] = useState(
    []
  );
  const [gridDisplay, setGridDisplay] = useState("");
  const [addDisplay, setAddDisplay] = useState("");
  const [color, setColor] = useState("");
  const [selectedEditSize, setSelectedEditSize] = useState(null);
  const itemsPerPage = 5;
  const [
    subCategoryDropDownList,
    setSubCategoryDropDownList,
    subCategoryDropDownListRef,
  ] = useState([]);
  const [
    productTypeDropDownList,
    setProductTypeDropDownList,
    productTypeDropDownListRef,
  ] = useState([]);
  const [productTypeFilterList, setProductTypeFilterList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [selectSubCategoryId, setSelectSubCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory, selectedCategoryRef] =
    useState("0");
  const [selectedSubCategory, setSubSelectedCategory, selectedSubCategoryRef] =
    useState("0");
  const [selectedProductType, setSelectedProductType, selectedProductTypeRef] =
    useState("0");
  const [selectedOccasion, setSelectedOccasion, selectedOccasionRef] =
    useState("0");
  const [selectedNeckDesign, setSelectedNeckDesign, selectedNeckDesignRef] =
    useState("0");
  const [selecteProductSize, setSelecteProductSize] = useState("");
  const [selectedFabricType, setSelectedFabricType, selectedFabricTypeRef] =
    useState("0");
  const [
    selectedSleevePattern,
    setSelectedSleevePattern,
    selectedSleevePatternRef,
  ] = useState("0");
  const [productUrl, setProductUrl, productUrlRef] = useState("");
  const [expense, setExpense] = useState("");
  const [sizeCheckboxesDisabled, setSizeCheckboxesDisabled] = useState(true);
  const [subCategories, setSubCategories, subCategoriesRef] = useState([]);
  const [productType, setProductType, productTypeRef] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [sleevePattern, setSleevePattern] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fabricType, setFabricType] = useState([]);
  const [neckDesign, setNeckDesign] = useState([]);
  const [editSubProduct, setEditSubProduct, editSubProductRef] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editedColorData, setEditedColorData] = useState([]);
  const [cost, setCost] = useState("");
  const [apiCallMade, setApiCallMade] = useState(false);
  const [productSize, setProductSize, productSizeRef] = useState([]);
  const [editFinal, setEditFinal] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedColors1, setSelectedColors1] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [
    selectedProductColor,
    setSelectedProductColor,
    selectedProductColorRef,
  ] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [StoredData, setStoredData] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productName, setProductName, productNameRef] = useState("");
  const [dressLength, setDressLength, dressLengthRef] = useState("0");
  const [dresswidth, setDressWidth, dresswidthRef] = useState("0");
  const [errorMsgText, setErrorMsgText] = useState("");
  const [headerTiltle, setHeaderTiltle, headerTiltleRef] = useState("");
  const [buttonName, setButtonName, buttonNameRef] = useState("");
  const [selectedColorList, setSelectedColorList, selectedColorListRef] =
    useState([]);
  const [
    selectFilterCategoryId,
    setSelectFilterCategoryId,
    selectFilterCategoryIdRef,
  ] = useState("0");
  const [
    selectFilterSubCategoryId,
    setSelectFilterSubCategoryId,
    selectFilterSubCategoryIdRef,
  ] = useState("0");
  const [
    selectFilterProducttypeId,
    setSelectFilterProducttypeId,
    selectFilterProducttypeIdRef,
  ] = useState("0");
  const [searchInput, setSearchInput, searchInputRef] = useState("");
  const [categoryDropdownList, setCategoryDropdownList] = useState([]);
  const [filterSubCategoryDropDownList, setFilterSubCategoryDropDownList] =
    useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [imageList, setImageList, imageListRef] = useState([]);
  const [selectedSizeList, setSelectedSizeList, selectedSizeListRef] = useState(
    []
  );
  const [productSizeData, setProductSizeData, productSizeDataRef] = useState({
    colorsData: [],
  });
  const [editProductSizeData, setEditProductSizeData, editProductSizeDataRef] =
    useState([]);
  const [brandList, setBrandList, brandListRef] = useState([]);
  const [selectedBrandId, setSelectedBrandId, selectedBrandIdRef] =
    useState("0");
  const [formData, setFormData, formDataRef] = useState({
    colorsData: [],
  });
  const [sizeChartFileNmae, setsizeChartFileNmae, sizeChartFileNmaeRef] =
    useState("");
  const [noSizeValue, setNoSizeValue, noSizeValueRef] = useState(false);
  const [editModelShow, seteditModelShow] = useState(false);
  const [selectedSubProduct, setSelectedSubProduct, selectedSubProductRef] =
    useState([]);
  const [addSubProducetModelShow, setAddSubProducetModelShow] = useState(false);
  const [subProductImageList, setSubProductImageList, subProductImageListRef] =
    useState([]);
  const [
    subProductSelectedColor,
    setSubProductSelectedColor,
    subProductSelectedColorRef,
  ] = useState("");
  const [
    subProductCheckedColor,
    setSubProductCheckedColor,
    subProductCheckedColorRef,
  ] = useState("");
  const [
    subProductSelectedColorList,
    setSubProductSelectedColorList,
    subProductSelectedColorListRef,
  ] = useState([]);
  const [addSubProductList, setAddSubProductList, addSubProductListRef] =
    useState([]);
  const [addslecedSizeList, setAddslecedSizeList, addslecedSizeListRef] =
    useState([]);
  const [
    addSelectedSubProductList,
    setAddSelectedSubProductList,
    addSelectedSubProductListRef,
  ] = useState([]);
  const [
    alredySelectedSizeList,
    setAlredySelectedSizeList,
    alredySelectedSizeListRef,
  ] = useState([]);
  const [productDescription, setProductDescription, productDescriptionRef] =
    useState([]);
  const [editProductId, setEditProductId, editProductIdRef] = useState("");
  const [currentPage, setCurrentPage, currentPageRef] = useState(1);
  const [skipCount, setSkipCount, skipCountRef] = useState(6);
  const [limitCount, setLimitCount, limitCountRef] = useState(6);
  const [totalPageCount, setTotalPageCount, totalPageCountRef] = useState(0);
  const [sizeNotSelectedErrMsg, setSizeNotSelectedErrMsg] = useState("");
  const [errorColorList, setErrorColorList] = useState([]);
  const [noSizeErrMsg, setNoSizeErrMsg] = useState("");
  const [addSizeNotSelecteErrMsg, setAddSizeNotSelecteErrMsg] = useState("");
  const [addErrorColorList, setAddErrorColorList] = useState([]);
  const [addSubModelErrorMsg, setAddSubModelErrorMsg] = useState("");
  const [familyColor, setFamilyColor, familyColorRef] = useState("");
  const [familyColorList, setFamilyColorList] = useState([]);
  const [addFamilyColor, setAddFamilyColor, addFamilyColorRef] = useState("");
  const [showSuccesseModel, setShowSeccessModel] = useState(false);
  const [delteProductId, setDelteProductId, delteProductIdRef] = useState("");
  const [successModelMsg, setSuccessModelMsg] = useState("");
  const [deleteType, setDeleteType, deleteTypeRef] = useState("");
  useEffect(() => {
    init();
  }, []);
  const openDetailsPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };
  const closeDetailsPopup = () => {
    setShowPopup(false);
  };
  const handleColorChange = (updatedColor) => {
    const newColor = updatedColor.hex;
    setSelectedColors([newColor]);
  };
  // useEffect(() => {
  // }, [StoredData]);
  const isCurrentColorComplete = () => {
    // const currentColorData = formData.colorsData[formData.colorsData.length - 1];
    // return (
    //   currentColorData &&
    //   currentColorData.images &&
    //   currentColorData.images.length > 0 &&
    //   currentColorData.price !== '' &&
    //   currentColorData.quantity !== '' &&
    //   currentColorData.cost !== ''
    // );
  };
  // useEffect(() => {
  //   console.log('zzzzzzzzzzzzzzzzzzzzzzz', ProductData);
  // }, [ProductData]);

  const handleSave = async () => {
    const currentDate = new Date().toISOString();
    try {
      let validate = await productValidation();
      if (validate) {
        if (!noSizeValueRef.current) {
          let filterData = JSON.parse(
            JSON.stringify(formDataRef.current.colorsData)
          ).filter((data) => {
            return data.size != "";
          });
          setFormData((prevFormData) => ({
            ...prevFormData,
            colorsData: filterData,
          }));
        }

        const productData = {
          product_name: productNameRef.current,
          description: productDescriptionRef.current,
          product_id: "0",
          neck_design_id: selectedNeckDesignRef.current,
          category_id: selectedCategoryRef.current,
          sub_Category_id: selectedSubCategoryRef.current,
          product_type_id: selectedProductTypeRef.current,
          occasion_id: selectedOccasionRef.current,
          sleeve_Pattern_id: selectedSleevePatternRef.current,
          fabric_type_id: selectedFabricTypeRef.current,
          dress_length: dressLengthRef.current,
          dress_weight: dresswidthRef.current,
          fitting: "fitting",
          product_url: productUrlRef.current,
          brand_id: selectedBrandIdRef.current,
          size_chart_image: sizeChartFileNmaeRef.current,
          no_size: noSizeValueRef.current ? 1 : 0,
          sub_product: JSON.parse(
            JSON.stringify(formDataRef.current.colorsData)
          ).map((group) => ({
            sub_product_id: "0",
            product_id: "0",
            size_id: group.size,
            color_family: group.color_family,
            color: group.color,
            images: group.images,
            price: parseFloat(group.price),
            quantity: parseInt(group.quantity),
            total_quantity: parseInt(group.quantity),
            cost_per_item: parseFloat(group.cost),
            profit: parseFloat(group.price - (group.expense + group.cost)),
            margin: parseInt(
              ((group.price - (group.expense + group.cost)) / group.price) * 100
            ),
            expense: parseFloat(group.expense),
            is_active: 1,
            is_delete: 1,
            create_by: "CUS001",
            update_by: "CUS001",
            created_date: currentDate,
            updated_date: currentDate,
          })),
          is_active: 1,
          is_delete: 1,
          create_by: "CUS001",
          update_by: "CUS001",
          created_date: currentDate,
          updated_date: currentDate,
        };
        // console.log(formDataRef.current);
        // console.log(productData);
        // return false;
        const response = await fetch(Apipath["AddProduct"], {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        const result = await response.json();
        console.log("Response:", result);
        if (result.error_code == "9999") {
          setGridDisplay("block");
          setAddDisplay("None");
          fetchData();
        }
      }
    } catch (error) {
      console.error("Error while saving product:", error);
    }

    // if (firstProduct && !apiCallMade) {
    //   let flattenedProductData;
    //   try {
    //     setProductData(async (prevProductData) => {
    //       const updatedProductData = [...prevProductData, ...formData.colorsData];
    //       flattenedProductData = [].concat(...updatedProductData);
    //       const payload = {
    //         productName,
    //         selectedCategory,
    //         selectedSubCategory,
    //         selectedProductType,
    //         selectedOccasion,
    //         selectedSleevePattern,
    //         selectedFabricType,
    //         selectedNeckDesign,
    //       };
    //       const productData = {
    //         product_name: productNameRef.current,
    //         product_id: "0",
    //         neck_design_id: selectedNeckDesignRef.current,
    //         category_id: selectedCategoryRef.current,
    //         sub_Category_id: selectedSubCategoryRef.current,
    //         product_type_id: selectedProductTypeRef.current,
    //         occasion_id: selectedOccasionRef.current,
    //         sleeve_Pattern_id: selectedSleevePatternRef.current,
    //         fabric_type_id: selectedFabricTypeRef.current,
    //         dress_length: dressLengthRef.current,
    //         dress_weight: dresswidthRef.current,
    //         fitting: "fitting",
    //         brand_id: selectedBrandIdRef.current,
    //         size_chart_image: sizeChartFileNmaeRef.current,
    //         sub_product: flattenedProductData.map((group) => ({
    //           sub_product_id: "0",
    //           product_id: "0",
    //           size_id: group.size,
    //           color: group.color,
    //           images: group.images,
    //           price: parseFloat(group.price),
    //           quantity: parseInt(group.quantity),
    //           total_quantity: parseInt(group.quantity),
    //           cost_per_item: parseFloat(group.cost),
    //           profit: parseFloat(group.price - group.cost),
    //           margin: parseInt((group.price - group.cost) / group.price * 100),
    //           is_active: 1,
    //           is_delete: 1,
    //           create_by: "CUS001",
    //           update_by: "CUS001",
    //           created_date: currentDate,
    //           updated_date: currentDate,
    //         })),
    //         is_active: 1,
    //         is_delete: 1,
    //         create_by: "CUS001",
    //         update_by: "CUS001",
    //         created_date: currentDate,
    //         updated_date: currentDate,
    //       };

    //       const response = await fetch(Apipath['AddProduct'], {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(productData),
    //       });
    //       const result = await response.json();
    //       console.log('Response:', result);
    //       if (result.error_code == "9999") {
    //         try {
    //           setGridDisplay('block')
    //           setAddDisplay("None")

    //         } catch (error) {
    //           console.log("Error", error);
    //         }
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Error while saving product:', error);
    //   }
    // }
    // else {
    //   // console.log('kkkkkkkkkkkkkkkkkkk', formData.colorsData)
    //   setStoredData((prevStoredData) => [...prevStoredData, formData.colorsData]);

    //   try {
    //     const payload = {
    //       productName,
    //       selectedCategory,
    //       selectedSubCategory,
    //       selectedProductType,
    //       selectedOccasion,
    //       selectedSleevePattern,
    //       selectedFabricType,
    //       selectedNeckDesign,
    //     };
    //     const productData = {
    //       product_name: productNameRef.current,
    //       product_id: "0",
    //       neck_design_id: selectedNeckDesignRef.current,
    //       category_id: selectedCategoryRef.current,
    //       sub_Category_id: selectedSubCategoryRef.current,
    //       product_type_id: selectedProductTypeRef.current,
    //       occasion_id: selectedOccasionRef.current,
    //       sleeve_Pattern_id: selectedSleevePatternRef.current,
    //       fabric_type_id: selectedFabricTypeRef.current,
    //       dress_length: dressLengthRef.current,
    //       dress_weight: dresswidthRef.current,
    //       fitting: "fitting",
    //       brand_id: selectedBrandIdRef.current,
    //       size_chart_image: sizeChartFileNmaeRef.current,
    //       sub_product: JSON.parse(JSON.stringify(formDataRef.current.colorsData)).map((group) => ({
    //         sub_product_id: "0",
    //         product_id: "0",
    //         size_id: group.size,
    //         color: group.color,
    //         images: group.images,
    //         price: parseFloat(group.price),
    //         quantity: parseInt(group.quantity),
    //         total_quantity: parseInt(group.quantity),
    //         cost_per_item: parseFloat(group.cost),
    //         profit: parseFloat(group.price - group.cost),
    //         margin: parseInt((group.price - group.cost) / group.price * 100),
    //         is_active: 1,
    //         is_delete: 1,
    //         create_by: "CUS001",
    //         update_by: "CUS001",
    //         created_date: currentDate,
    //         updated_date: currentDate,
    //       })),
    //       is_active: 1,
    //       is_delete: 1,
    //       create_by: "CUS001",
    //       update_by: "CUS001",
    //       created_date: currentDate,
    //       updated_date: currentDate,
    //     };

    //     // console.log('Product Datassssssssssssssssssss:', productData);
    //     const response = await fetch(Apipath['AddProduct'], {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(productData),
    //     });

    //     const result = await response.json();
    //     console.log('Response:', result);
    //     if (result.error_code == "9999") {
    //       setGridDisplay('block');
    //       setAddDisplay("None");
    //       fetchData();
    //     }
    //   } catch (error) {
    //     console.error('Error while saving product:', error);
    //   }

    // }
  };
  async function productValidation() {
    try {
      let validate = await fromDataValidation();
      if (document.getElementById("product_name").value == "") {
        document.getElementById("product_name").focus();
        setErrorMsgText("Please enter product name field");
        return false;
      } else if (document.getElementById("category").value == "0") {
        document.getElementById("category").focus();
        setErrorMsgText("Please select category");
        return false;
      } else if (
        subCategoriesRef.current.length > 0 &&
        document.getElementById("sub_category").value == "0"
      ) {
        document.getElementById("sub_category").focus();
        setErrorMsgText("Please select sub category");
        return false;
      } else if (
        productTypeRef.current.length &&
        document.getElementById("product_type").value == "0"
      ) {
        document.getElementById("product_type").focus();
        setErrorMsgText("Please select product type");
        return false;
      } else if (dresswidthRef.current == "0" || dresswidthRef.current == "") {
        document.getElementById("dress_weight").focus();
        setErrorMsgText("Please enter dress weight");
        return false;
      } else if (
        JSON.parse(JSON.stringify(formDataRef.current.colorsData)).length > 0 &&
        validate
      ) {
        setErrorMsgText("Please Enter Required Field");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error while  Save Validation:", error);
    }
  }
  function fromDataValidation() {
    try {
      let colorArray = [];
      selectedColorListRef.current.forEach((colorData) => {
        let filterData = JSON.parse(
          JSON.stringify(
            JSON.parse(JSON.stringify(formDataRef.current.colorsData))
          )
        ).filter((data) => {
          return data.color == colorData;
        });
        let count = 0;
        filterData.forEach((subProduct, index) => {
          if (
            subProduct.price == 0 ||
            subProduct.quantity == 0 ||
            subProduct.cost == 0 ||
            subProduct.expense == 0 ||
            (!noSizeValueRef.current && subProduct.size == 0) ||
            subProduct.color_family == ""
          ) {
            count = count + 1;
          }
        });
        if (count != 0 && productSizeRef.current.length >= filterData.length) {
          colorArray.push(colorData);
        }
      });
      setErrorColorList(colorArray);
      if (colorArray.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  }
  function noSizeOnChange() {
    try {
      let filterData = JSON.parse(
        JSON.stringify(formDataRef.current.colorsData)
      ).filter((data) => {
        return data.size != "";
      });
      if (filterData.length == 0) {
        setNoSizeValue(!noSizeValueRef.current);
      } else {
        setNoSizeErrMsg("This is Not Clickable");
      }
    } catch (error) {}
  }
  function productUpdateValidation() {
    try {
      if (document.getElementById("product_name").value == "") {
        document.getElementById("product_name").focus();
        setErrorMsgText("Please enter product name field");
        return false;
      } else if (document.getElementById("category").value == "0") {
        document.getElementById("category").focus();
        setErrorMsgText("Please select category");
        return false;
      } else if (
        subCategoriesRef.current.length > 0 &&
        document.getElementById("sub_category").value == "0"
      ) {
        document.getElementById("sub_category").focus();
        setErrorMsgText("Please select sub category");
        return false;
      } else if (
        productTypeRef.current.length &&
        document.getElementById("product_type").value == "0"
      ) {
        document.getElementById("product_type").focus();
        setErrorMsgText("Please select product type");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error while  Save Validation:", error);
    }
  }

  const AddAnotherSize = () => {
    const firstColor = formData.colorsData[0].color;
    const firstImages = formData.colorsData[0].images;
    setProductSizeData((prevProductSizeData) => ({
      ...prevProductSizeData,
      colorsData: [
        ...prevProductSizeData.colorsData,
        {
          color: selectedProductColorRef.current,
          images: imageListRef.current,
          color_family: familyColorRef.current,
          size: [],
          price: 0,
          quantity: 0,
          cost: 0,
          margin: 0,
          profit: 0,
          expense: 0,
        },
      ],
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      colorsData: [
        ...prevFormData.colorsData,
        {
          color: selectedProductColorRef.current,
          images: imageListRef.current,
          color_family: familyColorRef.current,
          size: "",
          price: 0,
          quantity: 0,
          cost: 0,
          margin: 0,
          profit: 0,
          expense: 0,
        },
      ],
    }));
    // console.log(productSizeDataRef.current)
    // console.log(formDataRef.current)
    // setProductData((prevProductData) => [...prevProductData, formData.colorsData]);
    // console.log('ddddddddddddddddddd', ProductData);
  };

  const ChangeNextColor = () => {
    setFirstProduct(true);
    setProductData((prevProductData) => [
      ...prevProductData,
      formData.colorsData,
    ]);
    // console.log('nnnnnnnnnnnnnn', ProductData);
    setSelectedColors([]);
    setSelectedFiles([]);
    // formData.colorsData = [];
  };

  const handleImageFileChange = (event, result) => {
    let formDataIndex = JSON.parse(
      JSON.stringify(formDataRef.current.colorsData)
    ).findIndex((product) => {
      return product.color == selectedProductColorRef.current;
    });
    if (formDataIndex != -1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        colorsData: prevFormData.colorsData.map((colorData, index) =>
          colorData.color == selectedProductColorRef.current
            ? { ...colorData, images: imageListRef.current }
            : colorData
        ),
      }));
    } else {
      setProductSizeData((prevProductSizeData) => ({
        ...prevProductSizeData,
        colorsData: [
          {
            color: selectedProductColorRef.current,
            images: imageListRef.current,
            size: [],
            color_family: "",
            price: 0,
            quantity: 0,
            cost: 0,
            margin: 0,
            profit: 0,
            expense: 0,
          },
        ],
      }));
      // console.log(productSizeDataRef.current);

      setFormData((prevFormData) => ({
        ...prevFormData,
        colorsData: [
          ...prevFormData.colorsData,
          {
            color: selectedProductColorRef.current,
            images: imageListRef.current,
            size: "",
            color_family: "",
            price: 0,
            quantity: 0,
            cost: 0,
            margin: 0,
            profit: 0,
            expense: 0,
          },
        ],
      }));
    }
  };
  function familyColorOnChange() {
    try {
      let formDataIndex = JSON.parse(
        JSON.stringify(formDataRef.current.colorsData)
      ).findIndex((product) => {
        return product.color == selectedProductColorRef.current;
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        colorsData: prevFormData.colorsData.map((colorData, index) =>
          colorData.color == selectedProductColorRef.current
            ? { ...colorData, color_family: familyColorRef.current }
            : colorData
        ),
      }));

      setProductSizeData((prevProductSizeData) => ({
        ...prevProductSizeData,
        colorsData: prevProductSizeData.colorsData.map((colorData, index) =>
          colorData.color == selectedProductColorRef.current
            ? { ...colorData, color_family: familyColorRef.current }
            : colorData
        ),
      }));
    } catch (error) {}
  }
  const handleFileChange = async (event) => {
    try {
      if (selectedProductColorRef.current != "") {
        const files = event.target.files;
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });

        const response = await fetch(Apipath["ImageUpload"], {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        setSelectedImages(result.data);
        setSelectedFiles(result.data);
        let image_list = [];
        result.data.forEach((fileNmae) => {
          image_list.push(fileNmae);
        });
        let array = imageListRef.current.concat(image_list);
        setImageList(array);
        handleImageFileChange(event, result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e, colorIndex, fieldName) => {
    const { value } = e.target;
    setErrorColorList([]);
    setErrorMsgText("");
    // let filterdata =JSON.parse(JSON.stringify(formDataRef.current.colorsData))
    let chcekArray = [];
    let chcekSizeArray = [];
    chcekSizeArray = chcekSizeArray.concat(
      productSizeDataRef.current.colorsData[colorIndex].size
    );
    if ("size" == fieldName) {
      let sizeArray = [];
      setSizeNotSelectedErrMsg("");
      sizeArray = sizeArray.concat(
        productSizeDataRef.current.colorsData[colorIndex].size
      );
      var index1 = sizeArray.indexOf(value);
      if (index1 != -1) {
        sizeArray.splice(index1, 1);
        setSelectedSizeList(sizeArray);
        if (sizeArray.length > 0) {
          setFormData(() => ({
            colorsData: formDataRef.current.colorsData.filter(
              (item) =>
                item.color == selectedProductColorRef.current &&
                item.size != value
            ),
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            colorsData: prevFormData.colorsData.map((colorData, index) =>
              colorData.color == selectedProductColorRef.current
                ? { ...colorData, size: "" }
                : colorData
            ),
          }));
        }

        // console.log(formDataRef.current);
      } else {
        sizeArray.push(value);
        setSelectedSizeList(sizeArray);
        chcekArray = JSON.parse(
          JSON.stringify(formDataRef.current.colorsData)
        ).filter((product) => {
          return (
            product.color == selectedProductColorRef.current &&
            product.size == value
          );
        });
      }
      if (chcekArray.length == 0) {
        setProductSizeData((prevProductSizeData) => ({
          ...prevProductSizeData,
          colorsData: prevProductSizeData.colorsData.map((colorData, index) =>
            index === colorIndex
              ? { ...colorData, [fieldName]: sizeArray }
              : colorData
          ),
        }));
        let sizeArray1 = [];
        sizeArray1 = sizeArray1.concat(
          productSizeDataRef.current.colorsData[colorIndex].size
        );
        sizeArray1.forEach((size, index) => {
          let formDataIndex = formDataRef.current.colorsData.findIndex(
            (product) => {
              return (
                product.color == selectedProductColorRef.current &&
                product.size == ""
              );
            }
          );

          if (formDataIndex != -1) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              colorsData: prevFormData.colorsData.map((colorData, index) =>
                index == formDataIndex
                  ? { ...colorData, [fieldName]: size }
                  : colorData
              ),
            }));
          } else {
            let formDataIndex1 = formDataRef.current.colorsData.findIndex(
              (product) => {
                return (
                  product.color == selectedProductColorRef.current &&
                  product.size == size
                );
              }
            );
            if (formDataIndex1 != -1) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                colorsData: prevFormData.colorsData.map((colorData, index) =>
                  index == formDataIndex1
                    ? { ...colorData, [fieldName]: size }
                    : colorData
                ),
              }));
            } else {
              setFormData((prevFormData) => ({
                ...prevFormData,
                colorsData: [
                  ...prevFormData.colorsData,
                  {
                    color: selectedProductColorRef.current,
                    images: imageListRef.current,
                    color_family: familyColorRef.current,
                    size: size,
                    price: 0,
                    quantity: 0,
                    cost: 0,
                    margin: 0,
                    profit: 0,
                    expense: 0,
                  },
                ],
              }));
            }
          }
        });
      }
    } else {
      if (chcekSizeArray.length > 0 || noSizeValueRef.current) {
        setProductSizeData((prevProductSizeData) => ({
          ...prevProductSizeData,
          colorsData: prevProductSizeData.colorsData.map((colorData, index) =>
            index === colorIndex
              ? { ...colorData, [fieldName]: value }
              : colorData
          ),
        }));
        let sizeArray2 = [];
        sizeArray2 = sizeArray2.concat(
          productSizeDataRef.current.colorsData[colorIndex].size
        );
        if (sizeArray2.length > 0) {
          sizeArray2.forEach((size, index) => {
            let formDataIndex2 = formDataRef.current.colorsData.findIndex(
              (product) => {
                return (
                  product.color == selectedProductColorRef.current &&
                  product.size == size
                );
              }
            );
            setFormData((prevFormData) => ({
              ...prevFormData,
              colorsData: prevFormData.colorsData.map((colorData, index) =>
                index == formDataIndex2
                  ? { ...colorData, [fieldName]: value }
                  : colorData
              ),
            }));
          });
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            colorsData: prevFormData.colorsData.map((colorData, index) =>
              index == colorIndex
                ? { ...colorData, [fieldName]: value }
                : colorData
            ),
          }));
        }
      } else {
        setSizeNotSelectedErrMsg("Please Select any one of the Product Size");
      }
    }
  };

  const editBtn = async (product) => {
    // console.log('1111111111111111', product);
    await clearData();
    setEditFinal(product);
    setEditProduct(true);
    const productId = product.product_id;
    setEditProductId(product.product_id);
    setProductName(product.product_name);
    setSelectedCategory(product.category_id);
    await categoryDropdownChange();
    setSubSelectedCategory(product.sub_Category_id);
    await subCategoryDropdownChange();
    setSelectedProductType(product.product_type_id);
    setSelectedOccasion(product.occasion_id);
    setSelectedSleevePattern(product.sleeve_Pattern_id);
    setSelectedFabricType(product.fabric_type_id);
    setSelectedNeckDesign(product.neck_design_id);
    setDressLength(product.dress_length);
    setDressWidth(product.dress_weight);
    setProductDescription(product.description);
    setsizeChartFileNmae(product.size_chart_image);
    setEditSubProduct([...editSubProduct, product.sub_product]);
    setProductUrl(product.product_url);

    if (product.sub_product.length > 0) {
      let colorData = [];
      product.sub_product.forEach((subProduct, index) => {
        if (!colorData.includes(subProduct.color)) {
          colorData.push(subProduct.color);
        }
      });
      setSelectedColorList(colorData);
    }

    try {
      setGridDisplay("None");
      setAddDisplay("block");
      setButtonName("Update");
      setHeaderTiltle("Edit");
    } catch (error) {
      console.log("Error", error);
    }

    console.log("aklsjdklajdkals", selectedCategory);
  };

  const handleupdate = async () => {
    // console.log('Update color data:', editFinal);
    // editFinal.product_name = productName;
    // editFinal.category_id = selectedCategory;
    // editFinal.sub_Category_id = selectedSubCategory;
    // editFinal.occasion_id = selectedOccasion;
    // editFinal.sleeve_Pattern_id = selectedSleevePattern;
    // editFinal.fabric_type_id = selectedFabricType;
    // editFinal.neck_design_id = selectedNeckDesign;
    // editFinal.dress_length = dressLength;
    // editFinal.dress_width = dresswidth;

    // const updatedEditSubProduct = editedColorData.map((colorData) => {
    //   const matchingSubProduct = editSubProduct.find((subProduct) => subProduct.sub_product_id === colorData.sub_product_id);
    //   if (matchingSubProduct) {
    //     return { ...matchingSubProduct, ...colorData };
    //   }
    //   return colorData;
    // });
    // editFinal.sub_product = editFinal.sub_product.map((subProduct) => {
    //   const matchingUpdatedSubProduct = updatedEditSubProduct.find(
    //     (updatedSubProduct) => updatedSubProduct.sub_product_id === subProduct.sub_product_id
    //   );

    //   if (matchingUpdatedSubProduct) {
    //     return { ...matchingUpdatedSubProduct };
    //   }

    //   return subProduct;
    // });

    // console.log('Updated editFinal.sub_product:', editFinal);

    // try {
    //   const response = await fetch(Apipath["UpdateProduct"] + editFinal.product_id, {
    //     method: 'PUT',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(editFinal),
    //   });

    //   const result = await response.json();
    //   console.log('Update result:', result);
    //   if (result.error_code == "9999") {
    //     try {
    //       setGridDisplay('block')
    //       setAddDisplay("None")

    //     } catch (error) {
    //       console.log("Error", error);
    //     }
    //   }

    // } catch (error) {
    //   console.error('Error updating product:', error);
    // }
    try {
      console.log(editProductIdRef.current);
      let validate = await productUpdateValidation();
      if (validate) {
        const postData = {
          product_name: productNameRef.current,
          description: productDescriptionRef.current,
          neck_design_id: selectedNeckDesignRef.current,
          category_id: selectedCategoryRef.current,
          sub_Category_id: selectedSubCategoryRef.current,
          product_type_id: selectedProductTypeRef.current,
          occasion_id: selectedOccasionRef.current,
          sleeve_Pattern_id: selectedSleevePatternRef.current,
          fabric_type_id: selectedFabricTypeRef.current,
          dress_length: dressLengthRef.current,
          dress_weight: dresswidthRef.current,
          fitting: "fitting",
          brand_id: selectedBrandIdRef.current,
          size_chart_image: sizeChartFileNmaeRef.current,
          product_url: productUrlRef.current,
        };
        // UpdateProductOnly
        axios({
          method: "put",
          url: Apipath["UpdateProductOnly"] + editProductIdRef.current,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: postData,
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              setGridDisplay("block");
              setAddDisplay("None");
              fetchData();
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleEditInputChange = (e, colorIndex, fieldName) => {
    const { value } = e.target;

    setEditedColorData((prevData) => {
      const updatedColorsData = prevData.map((colorData, index) => {
        if (index === colorIndex) {
          const updatedData = { ...colorData, [fieldName]: value };

          if (fieldName === "price" || fieldName === "cost_per_item") {
            updatedData.profit = updatedData.price - updatedData.cost_per_item;
            updatedData.margin = (
              ((updatedData.price - updatedData.cost_per_item) /
                updatedData.price) *
              100
            ).toFixed(2);
          }

          return updatedData;
        } else {
          return colorData;
        }
      });

      return updatedColorsData;
    });
  };

  const handleEdit = (colorData) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", colorData);
    setEditedColorData([colorData]);
    console.log(
      "j;asljfalsjflsakflsakfhhhhhhhhhhhhhhhhhhhhh",
      colorData.size_id
    );
    setSelectedEditSize(colorData.size_id);
    setImageList(colorData.images);
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData((prevFormData) => {
      const updatedColorsData = prevFormData.colorsData.filter(
        (data) => data.color !== colorToRemove
      );

      return {
        ...prevFormData,
        colorsData: updatedColorsData,
      };
    });
  };

  async function getCategroyDataList() {
    try {
      await fetch(Apipath["GetCategoryDropdownList"])
        .then((response) => response.json())
        .then((data) => setCategories(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  function categoryDropdownChange() {
    try {
      let filteredSubCategories = subCategoryDropDownListRef.current.filter(
        (subCategory) => subCategory.category_id === selectedCategoryRef.current
      );
      setSubCategories(filteredSubCategories);
    } catch (error) {
      console.log("Error", error);
    }
  }
  function subCategoryDropdownChange() {
    try {
      let filteredSubCategories = productTypeDropDownListRef.current.filter(
        (subCategory) =>
          subCategory.category_id === selectedCategoryRef.current &&
          subCategory.sub_Category_id === selectedSubCategoryRef.current
      );
      setProductType(filteredSubCategories);
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function getSubCategoryDataList() {
    try {
      await fetch(Apipath["GetSubCategoryDropdownList"])
        .then((response) => response.json())
        .then((data) => {
          setSubCategoryDropDownList(data.data);
          const filteredSubCategories = data.data.filter(
            (subCategory) =>
              subCategory.category_id === selectedCategoryRef.current
          );
          setSubCategories(filteredSubCategories);
        })
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function getProductTypeDataList() {
    try {
      await fetch(Apipath["ProductTypeDropdownList"])
        .then((response) => response.json())
        .then((data) => {
          setProductTypeDropDownList(data.data);
          const filteredSubCategories = data.data.filter(
            (subCategory) =>
              subCategory.category_id === selectedCategoryRef.current &&
              subCategory.sub_Category_id === selectedSubCategoryRef.current
          );
          setProductType(filteredSubCategories);
          // console.log('fffffffffffffffffffffffff', productType
          // )
        })
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function getOccasionDataList() {
    try {
      await fetch(Apipath["OccasionDropdownList"])
        .then((response) => response.json())
        .then((data) => setOccasion(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function getSleeveOatternDataList() {
    try {
      await fetch(Apipath["SleevePatternDropdownList"])
        .then((response) => response.json())
        .then((data) => setSleevePattern(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function getFabricTypeDataList() {
    try {
      await fetch(Apipath["FabricTypeDropdownList"])
        .then((response) => response.json())
        .then((data) => setFabricType(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function getNackDesignDataList() {
    try {
      await fetch(Apipath["NeckDesignDropdownList"])
        .then((response) => response.json())
        .then((data) => setNeckDesign(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function getProductSizedataList() {
    try {
      await fetch(Apipath["ProductSizeDropdownList"])
        .then((response) => response.json())
        .then((data) => setProductSize(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function getBrandDataList() {
    try {
      await fetch(Apipath["GetBrandDropdownList"])
        .then((response) => response.json())
        .then((data) => setBrandList(data.data))
        .catch((error) => console.error("Error fetching categories:", error));
    } catch (error) {
      console.log("Error", error);
    }
  }

  function bactBtn() {
    try {
      setGridDisplay("block");
      setAddDisplay("None");
    } catch (error) {
      console.log("Error", error);
    }
  }

  function defaultValue() {
    try {
      setGridDisplay("block");
      setAddDisplay("None");
      let f_color = [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
        "Purple",
        "Black",
        "White",
        "Brown",
        "Gray",
        "Pink",
      ];
      setFamilyColorList(f_color);
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function addBtn() {
    try {
      setGridDisplay("None");
      setAddDisplay("block");
      setButtonName("Save");
      setHeaderTiltle("Add");
      setEditProduct(false);
      await clearData();
    } catch (error) {
      console.log("Error", error);
    }
  }
  const fetchData = async () => {
    try {
      if (window.FetchData) {
        window.FetchData.cancel();
      }
      window.FetchData = axios.CancelToken.source();

      const postData = {
        search: searchInputRef.current,
        limit: skipCountRef.current,
        skip_count:
          skipCountRef.current * currentPageRef.current - skipCountRef.current,
        category_id: selectFilterCategoryIdRef.current,
        sub_Category_id: selectFilterSubCategoryIdRef.current,
        product_type_id: selectFilterProducttypeIdRef.current,
      };

      const response = await axios.post(Apipath["GetProductList"], postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cancelToken: window.FetchData.token,
      });

      if (response.data.error_code === "9999") {
        if (response.data.data[0].data.length > 0) {
          setAllProducts(response.data.data[0].data);
          setTotalPageCount(
            Math.ceil(
              response.data.data[0].pagination[0].total / limitCountRef.current
            )
          );
        } else {
          setAllProducts([]);
          setTotalPageCount(0);
        }
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  function handlePageClick(e) {
    try {
      let value = e.selected + 1;
      if (currentPageRef.current != value) {
        setCurrentPage(value);
        fetchData();
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const categoryFilterDropdownOnChange = async () => {
    try {
      const selectedCategoryId = document.getElementById(
        "filter_category_dropdown"
      ).value;
      setSelectFilterCategoryId(selectedCategoryId);

      const filtersubcategory = subCategoryList.filter(
        (cat) => cat.category_id === selectedCategoryId
      );
      await setFilterSubCategoryDropDownList(filtersubcategory);
      const filterProductType = productTypeDropDownListRef.current.filter(
        (subCategory) =>
          subCategory.category_id === selectFilterCategoryIdRef.current &&
          subCategory.sub_Category_id === selectFilterSubCategoryIdRef.current
      );
      setProductTypeFilterList(filterProductType);
      setSelectFilterSubCategoryId("0");
      setSelectFilterProducttypeId("0");
      setCurrentPage(1);
      fetchData();
    } catch (error) {
      console.log("Error", error);
    }
  };
  async function filterSubCategoryChange() {
    try {
      setSelectFilterSubCategoryId(
        document.getElementById("filter_sub_category_dropdown").value
      );
      const filterProductType = productTypeDropDownListRef.current.filter(
        (subCategory) =>
          subCategory.category_id === selectFilterCategoryIdRef.current &&
          subCategory.sub_Category_id === selectFilterSubCategoryIdRef.current
      );
      await setProductTypeFilterList(filterProductType);
      setSelectFilterProducttypeId("0");
      setCurrentPage(1);
      fetchData();
    } catch (error) {
      console.log("Error", error);
    }
  }
  const init = async () => {
    try {
      await defaultValue();
      await categoryDropdown();
      await getSubCategoryDropDown();
      await fetchData();
      await getCategroyDataList();
      await getSubCategoryDataList();
      await getProductTypeDataList();
      await getOccasionDataList();
      await getSleeveOatternDataList();
      await getFabricTypeDataList();
      await getNackDesignDataList();
      await getProductSizedataList();
      await getBrandDataList();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const categoryDropdown = async () => {
    try {
      const response = await axios.get(Apipath["GetCategoryDropdownList"], {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.error_code === "9999") {
        setCategoryDropdownList(response.data.data);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategoryDropDown = async () => {
    try {
      const response = await axios.get(Apipath["GetSubCategoryDropdownList"], {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.error_code === "9999") {
        const subCategories = response.data.data;
        setSubCategoryList(subCategories);

        const filtersubcategory = subCategories.filter(
          (cat) => cat.category_id === selectFilterCategoryId
        );
        setFilterSubCategoryDropDownList(filtersubcategory);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.log(error);
    }
  };

  function selectedColorOnChange(selectedColor) {
    try {
      let colorData = [];
      colorData = selectedColorListRef.current;
      if (!colorData.includes(selectedColor)) {
        colorData.push(selectedColor);
        setSelectedColorList(colorData);
        setSelectedColorList((item) => [...item]);
        // console.log(selectedColorListRef.current);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  function colorSelectOnClick(color) {
    try {
      setSelectedProductColor(color);
      setSizeNotSelectedErrMsg("");
      if (headerTiltleRef.current == "Edit") {
        let filter = editSubProductRef.current[0].filter((product) => {
          return product.color == selectedProductColorRef.current;
        });
        setImageList(filter[0].images);
        setFamilyColor(filter[0].color_family);
        let filter1 = JSON.parse(JSON.stringify(filter));
        // setEditedColorData()
      } else {
        let formDataIndex = JSON.parse(
          JSON.stringify(formDataRef.current.colorsData)
        ).findIndex((product) => {
          return product.color == selectedProductColorRef.current;
        });
        if (formDataIndex != -1) {
          let filterData = JSON.parse(
            JSON.stringify(formDataRef.current.colorsData)
          ).filter((product) => {
            return product.color == selectedProductColorRef.current;
          });
          let filterDataStingfly = JSON.parse(JSON.stringify(filterData));
          let sizeArray1 = [];
          filterDataStingfly.forEach((subProduct, index) => {
            if (subProduct.size != "") {
              sizeArray1.push(subProduct.size);
            }
          });
          setSelectedSizeList(sizeArray1);
          let productarray = [];
          filterDataStingfly.forEach((subProduct, index) => {
            if (productarray.length == 0) {
              let sizearray = [];
              sizearray.push(subProduct.size);
              productarray.push(subProduct);
              productarray[0].size = sizearray;
            } else {
              let formDataIndex1 = productarray.findIndex((product) => {
                return (
                  product.price == subProduct.price &&
                  product.quantity == subProduct.quantity &&
                  product.cost == subProduct.cost &&
                  product.expense == subProduct.expense
                );
              });
              if (formDataIndex1 != -1) {
                let sizearray = [];
                sizearray = productarray[formDataIndex1].size;
                sizearray.push(subProduct.size);
                productarray[formDataIndex1].size = sizearray;
              } else {
                let sizearray = [];
                productarray.push(subProduct);
                sizearray = productarray[productarray.length - 1].size;
                productarray[productarray.length - 1].size = sizearray;
              }
            }
          });
          // setProductSizeData.colorsData(colorsData:productarray);
          setProductSizeData(() => ({
            colorsData: productarray,
          }));
          setImageList(filterDataStingfly[0].images);
        } else {
          setProductSizeData([]);
          setImageList([]);
          setFamilyColor("");
          setSelectedSizeList([]);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  function removeColor(color) {
    try {
      let colorData = [];
      colorData = selectedColorListRef.current;
      var index1 = colorData.indexOf(color);
      if (index1 != -1) {
        colorData.splice(index1, 1);
        setSelectedColorList(colorData);
        setSelectedColorList((item) => [...item]);
      }
      let filterData = JSON.parse(
        JSON.stringify(formDataRef.current.colorsData)
      ).filter((product) => {
        return product.color != color;
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        colorsData: filterData,
      }));
      // console.log(JSON.parse(JSON.stringify(formDataRef.current.colorsData)));
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function deleteProductImage(fileName) {
    try {
      if (imageListRef.current.length > 1) {
        let imageArray = imageListRef.current;
        let index = imageArray.indexOf(fileName);
        await axios({
          method: "delete",
          url: Apipath["DeleteImage"] + fileName,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              imageArray.splice(index, 1);
              setImageList(imageArray);
              setFormData((prevFormData) => ({
                ...prevFormData,
                colorsData: prevFormData.colorsData.map((colorData, index) =>
                  colorData.color == selectedProductColorRef.current
                    ? { ...colorData, images: imageListRef.current }
                    : colorData
                ),
              }));
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } else {
      }
    } catch (error) {}
  }
  async function clearData() {
    try {
      setErrorMsgText("");
      setProductName("");
      setProductDescription("");
      setSelectedCategory("0");
      await getSubCategoryDataList();
      setSubSelectedCategory("0");
      await getProductTypeDataList();
      setSelectedProductType("0");
      setSelectedOccasion("0");
      setSelectedNeckDesign("0");
      setSelectedFabricType("");
      setSelectedSleevePattern("0");
      setDressLength("0");
      setDressLength("0");
      setSelectedBrandId("0");
      setsizeChartFileNmae("");
      setSelectedColorList([]);
      setImageList([]);
      setDressLength(0);
      setDressWidth(0);
      setProductSizeData({ colorsData: [] });
      setFormData({ colorsData: [] });
      setEditSubProduct([]);
      setSelectedColors([]);
      setSelectedSizeList([]);
      setSizeNotSelectedErrMsg("");
      setNoSizeValue(false);
      setNoSizeErrMsg("");
      setErrorColorList([]);
      document.getElementById("size_chart").value("");
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function fileUpload(event) {
    try {
      setErrorMsgText("");
      const files = event.target.files;
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      if (sizeChartFileNmaeRef.current != "") {
        await axios({
          method: "delete",
          url: Apipath["DeleteImage"] + sizeChartFileNmaeRef.current,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log("Error", error);
          });
      }
      await fetch(Apipath["ImageUpload"], {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error_code == "9999") {
            setsizeChartFileNmae(data.data[0]);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error", error);
    }
  }

  function editSubProductBtn(supProduct) {
    try {
      supProduct["update_Quantity"] = 0;
      setSelectedSubProduct(supProduct);
      seteditModelShow(true);
    } catch (error) {
      console.log("Error", error);
    }
  }
  function closeEditmModel() {
    try {
      seteditModelShow(false);
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function deleteSupProductImage(fileName) {
    try {
      if (selectedSubProductRef.current.images.length > 1) {
        let imageArray = selectedSubProductRef.current.images;
        let index = imageArray.indexOf(fileName);
        await axios({
          method: "delete",
          url: Apipath["DeleteImage"] + fileName,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              imageArray.splice(index, 1);
              setSelectedSubProduct({
                ...selectedSubProduct,
                images: imageArray,
              });
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function editFileUpload(event) {
    try {
      const files = event.target.files;
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      await fetch(Apipath["ImageUpload"], {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error_code == "9999") {
            let imageArray = [];
            imageArray = selectedSubProductRef.current.images.concat(data.data);
            setSelectedSubProduct({
              ...selectedSubProduct,
              images: imageArray,
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error", error);
    }
  }
  function updateSubProductBtn() {
    try {
      document.getElementById("model_update_btn").style.display = "none";
      document.getElementById("loder_btn").style.display = "block";
      let postData = {
        sub_product_id: selectedSubProductRef.current.sub_product_id,
        images: selectedSubProductRef.current.images,
        price: parseInt(selectedSubProductRef.current.price),
        quantity: parseInt(selectedSubProductRef.current.quantity),
        total_quantity: parseInt(selectedSubProductRef.current.update_Quantity),
        cost_per_item: parseInt(selectedSubProductRef.current.cost_per_item),
        margin: parseFloat(
          (
            ((selectedSubProductRef.current.price -
              selectedSubProductRef.current.cost_per_item) /
              selectedSubProductRef.current.price) *
            100
          ).toFixed(2)
        ),
        profit: parseInt(
          selectedSubProductRef.current.price -
            selectedSubProductRef.current.cost_per_item
        ),
      };
      axios({
        method: "post",
        url: Apipath["UpdateSupProduct"],
        headers: {
          "Content-Type": "application/json",
        },
        data: postData,
      })
        .then(function (response) {
          document.getElementById("model_update_btn").style.display = "block";
          document.getElementById("loder_btn").style.display = "none";
          if (response.data.error_code == "9999") {
            seteditModelShow(false);
            setShowPopup(false);
            fetchData();
          } else if (response.data.error_code == "9998") {
            setErrorMsgText(response.data.message);
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  }
  function addSubProductBtn() {
    try {
      setSubProductSelectedColorList([]);
      setSubProductSelectedColor("");
      setSubProductImageList([]);
      setAddslecedSizeList([]);
      setAddSubProductList([]);
      setAddSelectedSubProductList([]);
      setAddSizeNotSelecteErrMsg("");
      setAddErrorColorList([]);
      setAddSubModelErrorMsg("");
      setAddFamilyColor("");
      setAddSubProducetModelShow(true);
    } catch (error) {
      console.log("Error", error);
    }
  }
  function closeAddSubProductModel() {
    try {
      setAddSubProducetModelShow(false);
    } catch (error) {
      console.log("Error", error);
    }
  }
  function addColorChoose(updatedColor) {
    try {
      const newColor = updatedColor.hex;
      setSubProductSelectedColor(newColor);
    } catch (error) {
      console.log("Error", error);
    }
  }
  function addColorSelected(selectedColor) {
    try {
      let colorData = [];
      colorData = subProductSelectedColorListRef.current;
      if (!colorData.includes(selectedColor)) {
        colorData.push(selectedColor);
        setSubProductSelectedColorList(colorData);
        setSubProductSelectedColorList((item) => [...item]);
        // console.log(selectedColorListRef.current);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  function addRemoveColor(color) {
    try {
      let colorData = [];
      colorData = subProductSelectedColorListRef.current;
      var index1 = colorData.indexOf(color);
      if (index1 != -1) {
        colorData.splice(index1, 1);
        setSubProductSelectedColorList(colorData);
        setSubProductSelectedColorList((item) => [...item]);
      }
      let filterData = addSubProductListRef.current.colorsData.filter(
        (product) => {
          return product.color != color;
        }
      );
      setAddSubProductList((prevFormData) => ({
        ...prevFormData,
        colorsData: filterData,
      }));
    } catch (error) {
      console.log("Error", error);
    }
  }

  function addColorChecked(color) {
    try {
      setSubProductCheckedColor(color);
      var filterData1 = [];
      if (addSubProductListRef.current.length > 0) {
        filterData1 = JSON.stringify(addSubProductListRef.current).filter(
          (product) => {
            return product.color == color;
          }
        );
      }

      if (selectedProductRef.current.sub_product.length > 0) {
        let filterData = selectedProductRef.current.sub_product.filter(
          (product) => {
            return product.color == color;
          }
        );
        if (filterData.length > 0) {
          let filterDataStingfly = JSON.parse(JSON.stringify(filterData));
          let sizeArray = [];
          filterData.forEach((subProduct, index) => {
            sizeArray.push(subProduct.size_id);
          });
          setSubProductImageList(filterData[0].images);
          setAddFamilyColor(filterData[0].color_family);
          setAddslecedSizeList(addslecedSizeListRef.current.concat(sizeArray));
          setAlredySelectedSizeList(
            alredySelectedSizeListRef.current.concat(sizeArray)
          );

          if (filterData1.length > 0) {
            let filterData1Stingfly = JSON.parse(JSON.stringify(filterData1));
            let sizeArray1 = [];
            filterData1.forEach((subProduct, index) => {
              sizeArray1.push(subProduct.size);
            });
            setAddslecedSizeList(
              addslecedSizeListRef.current.concat(sizeArray1)
            );
          }
          addProductFileUploadChange();
        } else if (filterData1.length > 0) {
          let filterData1Stingfly = JSON.parse(JSON.stringify(filterData1));
          let sizeArray1 = [];
          filterData1.forEach((subProduct, index) => {
            sizeArray1.push(subProduct.size);
          });
          setAddslecedSizeList(addslecedSizeListRef.current.concat(sizeArray1));
        } else {
          if (filterData1.length > 0) {
            let filterData1Stingfly = JSON.parse(JSON.stringify(filterData1));
            let productarray = [];
            filterData1Stingfly.forEach((subProduct, index) => {
              if (productarray.length == 0) {
                let sizearray = [];
                sizearray.push(subProduct.size);
                productarray.push(subProduct);
                productarray[0].size = sizearray;
              } else {
                let formDataIndex1 = productarray.findIndex((product) => {
                  return (
                    product.price == subProduct.price &&
                    product.quantity == subProduct.quantity &&
                    product.cost == subProduct.cost &&
                    product.expense == subProduct.expense
                  );
                });
                if (formDataIndex1 != -1) {
                  let sizearray = [];
                  sizearray = productarray[formDataIndex1].size;
                  sizearray.push(subProduct.size);
                  productarray[formDataIndex1].size = sizearray;
                } else {
                  let sizearray = [];
                  productarray.push(subProduct);
                  sizearray = productarray[productarray.length - 1].size;
                  sizearray.push(subProduct.size);
                  productarray[productarray.length - 1].size = sizearray;
                }
              }
            });
            // setProductSizeData.colorsData(colorsData:productarray);
            setAddSelectedSubProductList(productarray);
            setSubProductImageList(filterData1Stingfly[0].images);
          } else {
            setAddSelectedSubProductList([]);
            setSubProductImageList([]);
            setAddFamilyColor("");
          }
        }

        if (filterData.length == 0 && filterData1.length == 0) {
          setAddslecedSizeList([]);
        }
        if (filterData.length == 0) {
          setAlredySelectedSizeList([]);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function addProductFileUpload(event) {
    try {
      if (subProductCheckedColorRef.current != "") {
        const files = event.target.files;
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });

        const response = await fetch(Apipath["ImageUpload"], {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        setSelectedImages(result.data);
        setSelectedFiles(result.data);
        let image_list = [];
        result.data.forEach((fileNmae) => {
          image_list.push(fileNmae);
        });
        let array = subProductImageListRef.current.concat(image_list);
        setSubProductImageList(array);
        addProductFileUploadChange();
      }
    } catch (error) {
      console.error(error);
    }
  }
  function addProductFileUploadChange() {
    try {
      let formDataIndex = addSubProductListRef.current.findIndex((product) => {
        return product.color == subProductCheckedColorRef.current;
      });
      if (formDataIndex != -1) {
        setAddSubProductList(
          addSubProductListRef.current.map((colorData, index) =>
            colorData.color == subProductCheckedColorRef.current
              ? { ...colorData, images: subProductImageListRef.current }
              : colorData
          )
        );
      } else {
        setAddSelectedSubProductList((addSelectedSubProductList) => [
          ...addSelectedSubProductList,
          {
            color: subProductCheckedColorRef.current,
            images: subProductImageListRef.current,
            color_family: "",
            size: [],
            price: 0,
            quantity: 0,
            cost: 0,
            margin: 0,
            profit: 0,
            expense: 0,
          },
        ]);
        setAddSubProductList((addSubProductList) => [
          ...addSubProductList,

          {
            color: subProductCheckedColorRef.current,
            images: subProductImageListRef.current,
            color_family: "",
            size: "",
            price: 0,
            quantity: 0,
            cost: 0,
            margin: 0,
            profit: 0,
            expense: 0,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function addFamilyColorOnChange() {
    try {
      setAddSubProductList(
        addSubProductListRef.current.map((colorData, index) =>
          colorData.color == subProductCheckedColorRef.current
            ? { ...colorData, color_family: addFamilyColorRef.current }
            : colorData
        )
      );
      setAddSelectedSubProductList(
        addSelectedSubProductListRef.current.map((colorData, index) =>
          colorData.color == subProductCheckedColorRef.current
            ? { ...colorData, color_family: addFamilyColorRef.current }
            : colorData
        )
      );
    } catch (error) {
      console.error("error ", error);
    }
  }
  async function deleteaddProductImage(fileName) {
    try {
      if (subProductImageListRef.current.length > 1) {
        let imageArray = subProductImageListRef.current;
        let index = imageArray.indexOf(fileName);
        await axios({
          method: "delete",
          url: Apipath["DeleteImage"] + fileName,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              imageArray.splice(index, 1);

              setSubProductImageList(imageArray);
              setAddSubProductList(
                addSubProductListRef.current.map((colorData, index) =>
                  colorData.color == subProductCheckedColorRef.current
                    ? { ...colorData, images: subProductImageListRef.current }
                    : colorData
                )
              );
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  function addProductAddSize() {
    setAddSelectedSubProductList((addSelectedSubProductList) => [
      ...addSelectedSubProductList,
      {
        color: subProductCheckedColorRef.current,
        images: subProductImageListRef.current,
        color_family: addFamilyColorRef.current,
        size: [],
        price: 0,
        quantity: 0,
        cost: 0,
        margin: 0,
        profit: 0,
        expense: 0,
      },
    ]);

    setAddSubProductList((addSubProductList) => [
      ...addSubProductList,

      {
        color: subProductCheckedColorRef.current,
        images: subProductImageListRef.current,
        color_family: addFamilyColorRef.current,
        size: "",
        price: 0,
        quantity: 0,
        cost: 0,
        margin: 0,
        profit: 0,
        expense: 0,
      },
    ]);
  }
  function addProductInputChange(e, colorIndex, fieldName) {
    const { value } = e.target;
    // let filterdata =JSON.parse(JSON.stringify(formDataRef.current.colorsData))
    setAddSubModelErrorMsg("");
    setAddErrorColorList([]);
    let chcekArray = [];
    let chcekSizeArray = [];
    chcekSizeArray = chcekSizeArray.concat(
      addSelectedSubProductListRef.current[colorIndex].size
    );
    if ("size" == fieldName) {
      let sizeArray = [];
      setAddSizeNotSelecteErrMsg("");
      sizeArray = sizeArray.concat(
        addSelectedSubProductListRef.current[colorIndex].size
      );
      var index1 = sizeArray.indexOf(value);
      if (index1 != -1) {
        sizeArray.splice(index1, 1);
        if (sizeArray.length > 0) {
          setAddSubProductList(
            addSubProductListRef.current.filter(
              (item) =>
                item.color == subProductCheckedColorRef.current &&
                item.size != value
            )
          );
        } else {
          setAddSubProductList(
            addSubProductListRef.current.map((colorData, index) =>
              colorData.color == subProductCheckedColorRef.current
                ? { ...colorData, size: "" }
                : colorData
            )
          );
        }
      } else {
        sizeArray.push(value);
        chcekArray = addSubProductListRef.current.filter((product) => {
          return (
            product.color == subProductCheckedColorRef.current &&
            product.size == value
          );
        });
      }
      if (chcekArray.length == 0) {
        setAddSelectedSubProductList(
          addSelectedSubProductListRef.current.map((colorData, index) =>
            index === colorIndex
              ? { ...colorData, [fieldName]: sizeArray }
              : colorData
          )
        );
        let sizeArray1 = [];
        sizeArray1 = sizeArray1.concat(
          addSelectedSubProductListRef.current[colorIndex].size
        );
        sizeArray1.forEach((size, index) => {
          let formDataIndex = addSubProductListRef.current.findIndex(
            (product) => {
              return (
                product.color == subProductCheckedColorRef.current &&
                product.size == ""
              );
            }
          );

          if (formDataIndex != -1) {
            setAddSubProductList(
              addSubProductListRef.current.map((colorData, index) =>
                index == formDataIndex
                  ? { ...colorData, [fieldName]: size }
                  : colorData
              )
            );
          } else {
            let formDataIndex1 = addSubProductListRef.current.findIndex(
              (product) => {
                return (
                  product.color == subProductCheckedColorRef.current &&
                  product.size == size
                );
              }
            );
            if (formDataIndex1 != -1) {
              setAddSubProductList(
                addSubProductListRef.current.map((colorData, index) =>
                  index == formDataIndex1
                    ? { ...colorData, [fieldName]: size }
                    : colorData
                )
              );
            } else {
              setAddSubProductList((addSubProductList) => [
                ...addSubProductList,

                {
                  color: subProductCheckedColorRef.current,
                  images: subProductImageListRef.current,
                  size: size,
                  color_family: addFamilyColorRef.current,
                  price: 0,
                  quantity: 0,
                  cost: 0,
                  margin: 0,
                  profit: 0,
                  expense: 0,
                },
              ]);
            }
          }
        });
      }
    } else {
      if (chcekSizeArray.length > 0 || selectedProduct.no_size) {
        setAddSelectedSubProductList(
          addSelectedSubProductListRef.current.map((colorData, index) =>
            index === colorIndex
              ? { ...colorData, [fieldName]: value }
              : colorData
          )
        );
        let sizeArray2 = [];
        sizeArray2 = sizeArray2.concat(
          addSelectedSubProductListRef.current[colorIndex].size
        );
        if (sizeArray2.length > 0) {
          sizeArray2.forEach((size, index) => {
            let formDataIndex2 = addSubProductListRef.current.findIndex(
              (product) => {
                return (
                  product.color == subProductCheckedColorRef.current &&
                  product.size == size
                );
              }
            );
            setAddSubProductList(
              addSubProductListRef.current.map((colorData, index) =>
                index === formDataIndex2
                  ? { ...colorData, [fieldName]: value }
                  : colorData
              )
            );
          });
        } else {
          setAddSubProductList(
            addSubProductListRef.current.map((colorData, index) =>
              index === colorIndex
                ? { ...colorData, [fieldName]: value }
                : colorData
            )
          );
        }
      } else {
        setAddSizeNotSelecteErrMsg("Please Select any one of the Product Size");
      }
    }
    let filterData = JSON.parse(
      JSON.stringify(addSubProductListRef.current)
    ).filter((product) => {
      return product.color == subProductCheckedColorRef.current;
    });
    let sizeArray2 = [];
    filterData.forEach((product, index) => {
      sizeArray2.push(product.size);
    });
    setAddslecedSizeList(sizeArray2);
  }
  async function addSubProductSaveBtn() {
    try {
      // console.log(addSubProductListRef.current)
      // console.log(selectedProductRef.current.product_id);

      let validate = await addSubproductValidation();
      if (selectedProductRef.current.no_size == 0) {
        let filterData = JSON.parse(
          JSON.stringify(addSubProductListRef.current)
        ).filter((data) => {
          return data.size != "";
        });
        setAddSubProductList(filterData);
      }

      if (validate) {
        document.getElementById("model_save_btn").style.display = "none";
        document.getElementById("add_loder_btn").style.display = "block";
        const postData = {
          sub_product: addSubProductListRef.current.map((group) => ({
            sub_product_id: "0",
            product_id: selectedProductRef.current.product_id,
            size_id: group.size,
            color_family: group.color_family,
            color: group.color,
            images: group.images,
            price: parseFloat(group.price),
            quantity: parseInt(group.quantity),
            total_quantity: parseInt(group.quantity),
            cost_per_item: parseFloat(group.cost),
            profit: parseFloat(group.price - (group.cost + group.expense)),
            // ((parseInt(colorData.price) -
            //   (parseInt(colorData.cost) +
            //     parseInt(colorData.expense))) /
            //   parseInt(colorData.price)) *
            // 100).toFixed(2)
            margin: parseInt(
              ((group.price - (group.cost + group.expense)) / group.price) * 100
            ),
            expense: parseFloat(group.expense),
            is_active: 1,
            is_delete: 1,
            create_by: "CUS001",
            update_by: "CUS001",
            created_date: new Date()
              .toLocaleString("en-ZA")
              .replace(",", "")
              .replace(/\//g, "-"),
            updated_date: new Date()
              .toLocaleString("en-ZA")
              .replace(",", "")
              .replace(/\//g, "-"),
          })),
        };
        console.log(addSubProductListRef.current);
        axios({
          method: "post",
          url: Apipath["AddSubProduct"],
          headers: {
            "Content-Type": "application/json",
          },
          data: postData,
        })
          .then(function (response) {
            document.getElementById("model_save_btn").style.display = "block";
            document.getElementById("add_loder_btn").style.display = "none";
            if (response.data.error_code == "9999") {
              setAddSubProducetModelShow(false);
              setShowPopup(false);
              fetchData();
            } else if (response.data.error_code == "9998") {
              setErrorMsgText(response.data.message);
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async function addSubproductValidation() {
    try {
      let validate = await addSubproductListValidation();
      if (addSubProductListRef.current.length > 0 && validate) {
        setAddSubModelErrorMsg("Please Enter Required Field");
        return false;
      } else {
        return true;
      }
    } catch (error) {}
  }
  function addSubproductListValidation() {
    try {
      let colorArray = [];
      subProductSelectedColorListRef.current.forEach((colorData) => {
        let filterData = JSON.stringify(addSubProductListRef.current).filter(
          (data) => {
            return data.color == colorData;
          }
        );
        let count = 0;
        filterData.forEach((subProduct, index) => {
          if (
            subProduct.price == 0 ||
            subProduct.quantity == 0 ||
            subProduct.cost == 0 ||
            subProduct.expense == 0 ||
            (selectedProductRef.current.no_size == 0 && subProduct.size == 0) ||
            subProduct.color_family == ""
          ) {
            count = count + 1;
          }
        });
        if (count != 0 && productSizeRef.current.length >= filterData.length) {
          colorArray.push(colorData);
        }
      });
      setAddErrorColorList(colorArray);
      if (colorArray.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  }
  function deleteBtn(Data, value) {
    try {
      if (value == "product_dlt") {
        setDeleteType(value);
        setDelteProductId(Data.product_id);
        setSuccessModelMsg("Are You Sure To Delete The Product ?");
        setShowSeccessModel(true);
      } else if (value == "sub_product_dlt") {
        setDeleteType(value);
        setDelteProductId(Data.sub_product_id);
        setSuccessModelMsg("Are You Sure To Delete The Sub Product ?");
        setShowSeccessModel(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  function delteProduct() {
    try {
      if (deleteTypeRef.current == "product_dlt") {
        axios({
          method: "put",
          url: Apipath["DeleteProduct"] + delteProductIdRef.current,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              setShowSeccessModel(false);
              fetchData();
            } else if (response.data.error_code == "9998") {
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } else {
        axios({
          method: "put",
          url: Apipath["DeleteSubProduct"] + delteProductIdRef.current,
          headers: {
            // 'Authorization': `bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.error_code == "9999") {
              setShowSeccessModel(false);
              fetchData();
            } else if (response.data.error_code == "9998") {
            } else {
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  function sucessModelClose() {
    try {
      setShowSeccessModel(false);
    } catch (error) {
      console.log("error", error);
    }
  }
  function activeOnChange(is_active, id) {
    try {
      let user_data = JSON.parse(sessionStorage.getItem("admin_detatils"));
      let postData = {
        is_active: is_active == 1 ? 0 : 1,
        update_by: user_data[0].user_id,
        updated_date: new Date()
          .toLocaleString("en-ZA")
          .replace(",", "")
          .replace(/\//g, "-"),
      };
      axios({
        method: "put",
        url: Apipath["UpdateProductIsActive"] + id,
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: postData,
      })
        .then(function (response) {
          if (response.data.error_code == "9999") {
            fetchData();
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <Fragment>
      <div className="w-100">
        <div className="card W-100 pb-3 " style={{ display: gridDisplay }}>
          <div className="card-header">Product</div>
          <div className="table_card my-3 mx-auto">
            <div className="row mt-3 justify-content-end">
              <div className="row justify-content-end align-items-end">
                <div className="mt-1 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <div className="align-items-center input_div">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="input_box"
                      id="search"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        setCurrentPage(1);
                        fetchData();
                      }}
                    />
                    <img
                      src={searchicon}
                      className="inputlogo"
                      alt="Search Icon"
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-end align-items-end">
                <div className="mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                  <label className="label_text">Category </label>
                  <select
                    name="cars"
                    id="filter_category_dropdown"
                    className="input_tag"
                    value={selectFilterCategoryId}
                    onChange={categoryFilterDropdownOnChange}
                  >
                    {categoryDropdownList.length > 0 ? (
                      <option value="0">Please select</option>
                    ) : (
                      <option value="0">No Data Found</option>
                    )}
                    {categoryDropdownList.map((item, index) => (
                      <option key={index} value={item.category_id}>
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <label className="label_text">Sub Category</label>
                  <select
                    name="cars"
                    id="filter_sub_category_dropdown"
                    className="input_tag"
                    value={selectFilterSubCategoryId}
                    onChange={(e) => {
                      filterSubCategoryChange();
                    }}
                  >
                    {filterSubCategoryDropDownList.length > 0 ? (
                      <option value="0">Please select</option>
                    ) : (
                      <option value="0">No Data Found</option>
                    )}
                    {filterSubCategoryDropDownList.map((item, index) => (
                      <option key={index} value={item.sub_Category_id}>
                        {item.sub_category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-1 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <label className="label_text">Product Type</label>
                  <select
                    name="cars"
                    id="filter_product_type"
                    className="input_tag"
                    value={selectFilterProducttypeId}
                    onChange={(e) => {
                      setSelectFilterProducttypeId(e.target.value);
                      setCurrentPage(1);
                      fetchData();
                    }}
                  >
                    {productTypeFilterList.length > 0 ? (
                      <option value="0">Please select</option>
                    ) : (
                      <option value="0">No Data Found</option>
                    )}
                    {productTypeFilterList.map((item, index) => (
                      <option key={index} value={item.product_type_id}>
                        {item.product_type_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6 mt-1 col-md-3 col-lg-2 col-xl-2 text-end">
                  <button className="addBtn" onClick={() => addBtn()}>
                    Add<img src={addicon} className="action_icon ms-2"></img>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="table-responsive mt-2"
              style={{ height: "60vh", overflowY: "scroll" }}
            >
              <table className="w-100">
                <thead>
                  <tr className="thead_border">
                    <th>Preview</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Product Type</th>
                    <th>Total Qty</th>
                    <th>Available Qty</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AllProducts.map(
                    (product, index) => (
                      console.log("product", product),
                      (
                        <tr key={product.product_id}>
                          <td>
                            <img
                              key={index}
                              src={
                                Apipath["GetImage"] +
                                product?.sub_product[0]?.images[0]
                              }
                              alt={`Selected Image ${index + 1}`}
                              style={{
                                height: "20px",
                                width: "20px",
                                marginRight: "10px",
                              }}
                            />
                          </td>
                          <td>{product.product_id}</td>
                          <td title={product.product_name}>
                            {product.product_name}
                          </td>
                          <td
                            title={
                              product.category.length > 0
                                ? product.category[0].category_name
                                : ""
                            }
                          >
                            {product.category.length > 0
                              ? product.category[0].category_name
                              : ""}
                          </td>
                          <td
                            title={
                              product.sub_category.length > 0
                                ? product.sub_category[0].sub_category_name
                                : ""
                            }
                          >
                            {product.sub_category.length > 0
                              ? product.sub_category[0].sub_category_name
                              : ""}
                          </td>
                          <td
                            title={
                              product.product_type.length > 0
                                ? product.product_type[0].product_type_name
                                : ""
                            }
                          >
                            {product.product_type.length > 0
                              ? product.product_type[0].product_type_name
                              : ""}
                          </td>

                          <td>{product.overall_quantity}</td>
                          <td>{product.available_quantity}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={product.is_active == 1 ? true : false}
                              onClick={() =>
                                activeOnChange(
                                  product.is_active,
                                  product.product_id
                                )
                              }
                            />
                          </td>
                          <td>
                            <div className="d-flex justify-content-around align-items-center gap-2">
                              <img
                                src={edit}
                                onClick={() => editBtn(product)}
                                alt="Edit"
                                className="action_icon"
                              />
                              <img
                                src={deleteimage}
                                alt="Delete"
                                className="action_icon"
                                onClick={() =>
                                  deleteBtn(product, "product_dlt")
                                }
                              />
                              <img
                                src={openeye}
                                alt="View"
                                className="action_icon"
                                style={{ width: "30px", cursor: "pointer" }}
                                onClick={() => openDetailsPopup(product)}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
              {showPopup && (
                <ProductDetailsPopup
                  product={selectedProduct}
                  onClose={closeDetailsPopup}
                  modelShow={showPopup}
                  modelSubProductEditBtn={editSubProductBtn}
                  addBtn={addSubProductBtn}
                  subProductDeleteBtn={deleteBtn}
                />
              )}
              {editModelShow && (
                <EditSubProductModel
                  subProduct={selectedSubProduct}
                  onClose={closeEditmModel}
                  modelShow={editModelShow}
                  deleteModelSubProductImage={deleteSupProductImage}
                  fileUpload={editFileUpload}
                  setVariable={setSelectedSubProduct}
                  saveBtn={updateSubProductBtn}
                />
              )}
              {addSubProducetModelShow && (
                <AddSubProductModel
                  modelShow={addSubProducetModelShow}
                  onClose={closeAddSubProductModel}
                  colorList={subProductSelectedColorList}
                  color={subProductSelectedColor}
                  imageList={subProductImageList}
                  colorChoose={addColorChoose}
                  colorSelected={addColorSelected}
                  colorChecked={addColorChecked}
                  subProductList={addSelectedSubProductList}
                  selectedSize={addslecedSizeList}
                  productSizeList={productSize}
                  productImageUpload={addProductFileUpload}
                  deleteProductImage={deleteaddProductImage}
                  addProductSize={addProductAddSize}
                  productInputChange={addProductInputChange}
                  alredySizeList={alredySelectedSizeList}
                  saveBtn={addSubProductSaveBtn}
                  selectedNoSize={selectedProduct.no_size}
                  sizeErrMsg={addSizeNotSelecteErrMsg}
                  removeAddColor={addRemoveColor}
                  errMsg={addSubModelErrorMsg}
                  errColorList={addErrorColorList}
                  subFamilColorList={familyColorList}
                  subFamilyColor={addFamilyColor}
                  setSubFamilyColo={setAddFamilyColor}
                  subfamilyColorOnChange={addFamilyColorOnChange}
                />
              )}
            </div>
            {showSuccesseModel && (
              <SuccsessModel
                show={showSuccesseModel}
                message={successModelMsg}
                functionName={delteProduct}
                colseModel={sucessModelClose}
              />
            )}
            {totalPageCount > 0 && (
              <div className="d-flex justify-content-end align-items-center mt-3">
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
                  previousLabel={"<"}
                  nextLabel={">"}
                  renderOnZeroPageCount={null}
                  // forcePage={currentPage - 1}
                  // disabledClassName={'disabled'}
                />
              </div>
            )}
          </div>
        </div>

        <div className="card W-100 pb-3 " style={{ display: addDisplay }}>
          <div className="card-header d-flex gap-3 align-items-center">
            <img
              src={bactBtnIcon}
              className="back_btn"
              onClick={() => bactBtn()}
            ></img>
            Add Product
          </div>
          <div className="table_card my-3 mx-auto">
            <div className="row mt-3 ">
              <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                <div className="row">
                  <div className="col-sm-12">
                    <label className="label_text">
                      Product Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="input_tag"
                      id="product_name"
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setErrorMsgText("");
                      }}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label className="label_text">
                      Category <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="select_tag"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setErrorMsgText("");
                        categoryDropdownChange();
                        subCategoryDropdownChange();
                      }}
                    >
                      <option value="0">Select</option>
                      {categories.map((category) => (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-6">
                <label className="label_text">Description</label>
                <div>
                  <textarea
                    className="select_tag"
                    value={productDescription}
                    rows="4"
                    cols="50"
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-2 ">
              <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-4">
                <label className="label_text">Sub Category </label>
                <select
                  name="subcategory"
                  id="sub_category"
                  className="select_tag"
                  value={selectedSubCategory}
                  onChange={(e) => {
                    setSubSelectedCategory(e.target.value);
                    setErrorMsgText("");
                    subCategoryDropdownChange();
                  }}
                >
                  <option value="0">Select</option>
                  {subCategories.map((subCategory) => (
                    <option
                      key={subCategory.sub_Category_id}
                      value={subCategory.sub_Category_id}
                    >
                      {subCategory.sub_category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-4">
                <label className="label_text">
                  Product Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="subcategory"
                  id="product_type"
                  className="select_tag"
                  value={selectedProductType}
                  onChange={(e) => {
                    setSelectedProductType(e.target.value);
                    setErrorMsgText("");
                  }}
                >
                  <option value="0">Select</option>
                  {productType.map((subCategory) => (
                    <option
                      key={subCategory.sub_Category_id}
                      value={subCategory.product_type_id}
                    >
                      {subCategory.product_type_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-12 mt-1 col-md-8 col-lg-6 col-xl-4">
                <label className="label_text" for="producturl">
                  Product URL
                </label>
                <input
                  className="input_tag"
                  type="url"
                  id="producturl"
                  name="producturl"
                  onChange={(e) => setProductUrl(e.target.value)}
                />
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Occasion</label>
                <select
                  name="occasion"
                  id="occasion"
                  className="select_tag"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                >
                  <option value="0">Select</option>
                  {occasion.map((occasion) => (
                    <option
                      key={occasion.occasion_id}
                      value={occasion.occasion_id}
                    >
                      {occasion.occasion_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Sleeve Pattern</label>
                <select
                  name="sleevePattern"
                  id="sleevePattern"
                  className="select_tag"
                  value={selectedSleevePattern}
                  onChange={(e) => setSelectedSleevePattern(e.target.value)}
                >
                  <option value="0">Select</option>
                  {sleevePattern.map((sleevePattern) => (
                    <option
                      key={sleevePattern.sleeve_pattern_id}
                      value={sleevePattern.sleeve_pattern_id}
                    >
                      {sleevePattern.sleeve_pattern_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Fabric Type</label>
                <select
                  name="fabricType"
                  id="fabricType"
                  className="select_tag"
                  value={selectedFabricType}
                  onChange={(e) => setSelectedFabricType(e.target.value)}
                >
                  <option value="0">Select</option>
                  {fabricType.map((fabricType) => (
                    <option
                      key={fabricType.fabric_id}
                      value={fabricType.fabric_id}
                    >
                      {fabricType.fabric_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Dress Length</label>
                <input
                  type="number"
                  className="input_tag"
                  min={0}
                  value={dressLength}
                  onChange={(e) => setDressLength(e.target.value)}
                />{" "}
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">
                  Dress weight (Kg) <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  type="number"
                  className="input_tag"
                  id="dress_weight"
                  value={dresswidth}
                  min={0}
                  onChange={(e) => {
                    setDressWidth(e.target.value);
                    setErrorMsgText("");
                  }}
                />{" "}
              </div>

              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Neck Designs</label>
                <select
                  name="neckDesign"
                  id="neckDesign"
                  className="select_tag"
                  value={selectedNeckDesign}
                  onChange={(e) => setSelectedNeckDesign(e.target.value)}
                >
                  <option value="0">Select</option>
                  {neckDesign.map((neckDesign) => (
                    <option
                      key={neckDesign.neck_design_id}
                      value={neckDesign.neck_design_id}
                    >
                      {neckDesign.neck_design_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                <label className="label_text">Brand</label>
                <select
                  name="neckDesign"
                  id="neckDesign"
                  className="select_tag"
                  value={selectedBrandId}
                  onChange={(e) => setSelectedBrandId(e.target.value)}
                >
                  {brandList.length > 0 ? (
                    <option value="0">Please select</option>
                  ) : (
                    <option value="0">No Data Found</option>
                  )}
                  {brandList.map((item, index) => {
                    return (
                      <option value={item.brand_id}>{item.brand_name}</option>
                    );
                  })}
                </select>
              </div>
              <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4 ">
                <label className="label_text">Size Chart Upload</label>
                <input
                  id="size_chart"
                  type="file"
                  accept="image/*"
                  onChange={(e) => fileUpload(e)}
                />
              </div>
              {!editProduct && (
                <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4 d-flex align-items-center gap-3">
                  {noSizeErrMsg != "" && (
                    <div className="errormsg">{noSizeErrMsg}</div>
                  )}
                  <label className="label_text">No Size</label>
                  <input
                    type="checkbox"
                    checked={noSizeValue}
                    onChange={() => {
                      noSizeOnChange();
                    }}
                  />
                </div>
              )}
            </div>
            {!editProduct && (
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 mt-1 col-md-8 col-lg-4 col-xl-4">
                    <label className="label_text">Color Selection</label>
                    <div className="input_tag">
                      <SketchPicker
                        color={color}
                        onChange={handleColorChange}
                        disableAlpha={true}
                        disabled={!isCurrentColorComplete()}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4 col-xl-4">
                    <label className="label_text">Selected Color</label>
                    <div className="selected_colors_container">
                      {selectedColors.map((selectedColor, index) => (
                        <div
                          key={index}
                          className="color_card"
                          style={{
                            backgroundColor: selectedColor,
                            width: "100px",
                            height: "100px",
                            marginTop: "5px",
                            marginLeft: "20px",
                            border: " 2px solid black",
                          }}
                          onClick={() => selectedColorOnChange(selectedColor)}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4 col-xl-4">
                    <label className="label_text">Final Colors</label>
                    <div>
                      {selectedColorList.length > 0 &&
                        selectedColorList.map((colorData, index) => (
                          <div key={index}>
                            <div
                              style={{ height: "40px" }}
                              className="d-flex mt-2 justify-content-between align-items-center"
                            >
                              <div
                                className="color_card"
                                style={{
                                  backgroundColor: colorData,
                                  width: "80%",
                                  height: "100%",
                                  border: "2px solid black",
                                }}
                              ></div>
                              <span>
                                <input
                                  type="radio"
                                  id="css"
                                  name="fav_language"
                                  value="CSS"
                                  style={{ height: "18px", width: "18px" }}
                                  onClick={() => colorSelectOnClick(colorData)}
                                />
                              </span>
                              <img
                                src={closeIcon}
                                className="color_romvoe_icon"
                                onClick={() => removeColor(colorData)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!editProduct && (
              <div className="row mt-2">
                <div className="col-sm-12 mt-1 col-md-8 col-lg-8 col-xl-8">
                  <label className="label_text">File Upload</label>
                  <div className="input_tag d-flex justify-content-between file_upload">
                    <input
                      type="file"
                      id="file_upload"
                      style={{ width: "0px" }}
                      onChange={handleFileChange}
                      multiple
                      accept="image/*, image/gif"
                    />
                    <div className="product_image_list_div">
                      {imageList.map((fileName, index) => (
                        <div className="product_image_div">
                          <img
                            className="product_image"
                            key={index}
                            src={Apipath["GetImage"] + fileName}
                            alt={`Selected Image ${index + 1}`}
                          />
                          <img
                            src={closeIcon}
                            className="product_close_icon"
                            onClick={() => deleteProductImage(fileName)}
                          />
                        </div>
                      ))}
                    </div>
                    <label
                      htmlFor="file_upload"
                      style={{ width: "25px", height: "50px" }}
                    >
                      <img
                        src={uploadIcon}
                        style={{
                          height: "20%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        alt="Upload Icon"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            {productSizeData.colorsData &&
              productSizeData.colorsData.length > 0 && (
                <div className="row">
                  <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                    <label className="label_text">
                      Color Family <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="occasion"
                      id="occasion"
                      className="select_tag"
                      value={familyColor}
                      onChange={(e) => {
                        setFamilyColor(e.target.value);
                        familyColorOnChange();
                      }}
                    >
                      <option value="">Select</option>
                      {familyColorList.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

            <div className="row mt-2">
              {sizeNotSelectedErrMsg && (
                <div className="errormsg">{sizeNotSelectedErrMsg}</div>
              )}
              {productSizeData.colorsData &&
                productSizeData.colorsData.length > 0 &&
                productSizeData.colorsData.map((colorData, index) => (
                  <div key={index}>
                    {!noSizeValue && (
                      <div
                        className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4"
                        style={{ width: "fit-content" }}
                      >
                        <label className="label_text">
                          Size <span style={{ color: "red" }}>*</span>
                        </label>
                        <div
                          className="d-flex justify-content-between align-items-center input_tag"
                          style={{ padding: "20px 15px" }}
                        >
                          {productSize.map((productSize, formIndex) => (
                            <div
                              className="radio_div"
                              style={{ paddingLeft: "40px" }}
                              key={productSize.size_id}
                            >
                              <label>{productSize.size_Name}</label>
                              <input
                                type="checkbox"
                                name={`size_${formIndex}`}
                                checked={colorData.size.includes(
                                  productSize.size_id
                                )}
                                // disabled={}
                                onChange={() => {
                                  handleInputChange(
                                    {
                                      target: { value: productSize.size_id },
                                    },
                                    index,
                                    "size"
                                  );
                                  setSelectedSize(productSize.size_id);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">
                          Price <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.price}
                          onChange={(e) => handleInputChange(e, index, "price")}
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">
                          Quantity <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.quantity}
                          onChange={(e) =>
                            handleInputChange(e, index, "quantity")
                          }
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">
                          Cost Per Item <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.cost}
                          onChange={(e) => handleInputChange(e, index, "cost")}
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Profit</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={
                            parseInt(colorData.price) -
                            (parseInt(colorData.cost) +
                              parseInt(colorData.expense))
                          }
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Margin (%)</label>
                        <input
                          type="text"
                          className="input_tag"
                          // value={(
                          //   ((colorData.price - colorData.cost) /
                          //     colorData.price) *
                          //   100
                          // ).toFixed(2)}
                          value={(
                            ((parseInt(colorData.price) -
                              (parseInt(colorData.cost) +
                                parseInt(colorData.expense))) /
                              parseInt(colorData.price)) *
                            100
                          ).toFixed(2)}
                          disabled
                        />
                      </div>
                      {/* <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                      <label className="label_text">Expenses</label>
                      <input
                        type="text"
                        className="input_tag"
                        value={colorData.price - colorData.cost}
                        disabled
                      />
                    </div> */}
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Expenses</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.expense}
                          onChange={(e) =>
                            handleInputChange(e, index, "expense")
                          }
                        />
                      </div>
                      <div className="row  mt-3  ">
                        {selectedSizeList.length < productSize.length &&
                          colorData.size.length > 0 &&
                          index == productSizeData.colorsData.length - 1 && (
                            <div className="col-xl-6">
                              <div className="row">
                                <div className="col">
                                  <button
                                    className="addBtn"
                                    onClick={AddAnotherSize}
                                  >
                                    {" "}
                                    Add Another Size{" "}
                                  </button>
                                </div>
                                {/* <div className='col'>
         <button className='addBtn' onClick={ChangeNextColor}> Change Next Color </button>
       </div> */}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}

              {editedColorData &&
                editedColorData.map((colorData, index) => (
                  <div key={index}>
                    <div
                      className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4"
                      style={{ width: "fit-content" }}
                    >
                      <label className="label_text">Size</label>
                      <div
                        className="d-flex justify-content-between align-items-center input_tag"
                        style={{ padding: "20px 15px" }}
                      >
                        {productSize.map((productSize, formIndex) => (
                          <div
                            className="radio_div"
                            style={{ paddingLeft: "40px" }}
                            key={productSize._id}
                          >
                            <label>{productSize.size_Name}</label>
                            <input
                              type="radio"
                              name={`size_${formIndex}`}
                              checked={productSize.size_id === selectedEditSize}
                              // onChange={() => {
                              //   handleEditInputChange({ target: { value: productSize._id } }, index, 'size_id');
                              //   setSelectedEditSize(productSize.size_id);
                              // }}
                            />
                          </div>
                        ))}
                      </div>

                      <div
                        key={index}
                        className="color_card"
                        style={{
                          backgroundColor: colorData.color,
                          height: "40px",
                        }}
                      >
                        {/* <span style={{ marginLeft: '280px', cursor: 'pointer' }} onClick={() => handleRemoveColor(colorData.color)}>
  <img
src={edit}
className='action_icon'
style={{ marginRight: '15px', marginTop: '10px' }}
onClick={() => handleEdit(colorData)}
/>    
<img src={deleteimage} style={{ marginTop: '10px' }} className="action_icon" alt="Delete Icon" />
  </span> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Price</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.price}
                          onChange={(e) =>
                            handleEditInputChange(e, index, "price")
                          }
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Quantity</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.quantity}
                          onChange={(e) =>
                            handleEditInputChange(e, index, "quantity")
                          }
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Update Quantity</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.updateQuantity}
                          onChange={(e) =>
                            handleEditInputChange(e, index, "updatequantity")
                          }
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Cost Per Item</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.cost_per_item}
                          onChange={(e) =>
                            handleEditInputChange(e, index, "cost_per_item")
                          }
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Profit</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={colorData.price - colorData.cost_per_item}
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mt-3 col-md-6 col-lg-4 col-xl-4">
                        <label className="label_text">Margin (%)</label>
                        <input
                          type="text"
                          className="input_tag"
                          value={(
                            ((colorData.price - colorData.cost_per_item) /
                              colorData.price) *
                            100
                          ).toFixed(2)}
                          disabled
                        />
                      </div>
                      <div className="row  mt-3  ">
                        <div className="col-xl-6"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="row justify-content-end mt-3">
              <div
                className="mb-2 d-flex justify-content-end"
                style={{ padding: "2px 8px" }}
              >
                {errorMsgText != "" && errorColorList.length == 0 && (
                  <div className="errormsg">{errorMsgText}</div>
                )}
                {errorMsgText != "" && errorColorList.length > 0 && (
                  <div className="errormsg">
                    <div className="d-flex gap-3">
                      {errorColorList.map((colorData, index) => (
                        <div
                          className="error_color_cart"
                          style={{ backgroundColor: colorData }}
                        ></div>
                      ))}
                    </div>
                    {errorMsgText}
                  </div>
                )}
              </div>

              <div className="col-xl-2">
                <button
                  className="addBtn"
                  onClick={editProduct ? handleupdate : handleSave}
                >
                  {editProduct ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Product;
