import React, { Component } from "react";
import axios, { all } from "axios";
import Chart from "react-apexcharts";
import "../../assets/scss/pages/pagescustom.scss";
import Apipath from "../../config/apipath";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CommonFunction from "../../config/common_func";

class Revenue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ProductTypeNames: [],
      clickbt: null,
      teststate: null,
      from_date: "",
      to_date: "",
      new_donut_options: null,
      revenue_expense_Option: null,
      revenue_expense_series: null,
      profit_by_category: null,
      profit_by_month: null,
      selectedValue: "all",
      total_quantities: 0,
      total_price: 0,
      profit_total_price: 0,
      total_products_sold: 0,
      total_expenses: 0,
      openChart: false,
      selectedDonutIndex: null,

      selectedYear: "",
      selectedQuarter: "",
      selectedMonth: "",
      quartersList: [
        { value: 1, label: "Quarter 1", months: ["01", "02", "03"] },
        { value: 2, label: "Quarter 2", months: ["04", "05", "06"] },
        { value: 3, label: "Quarter 3", months: ["07", "08", "09"] },
        { value: 4, label: "Quarter 4", months: ["10", "11", "12"] },
      ],
      monthList: [
        {
          month: "January",
          value: 1,
          quarterId: 1,
        },
        {
          month: "February",
          value: 2,
          quarterId: 1,
        },
        {
          month: "March",
          value: 3,
          quarterId: 1,
        },
        {
          month: "April",
          value: 4,
          quarterId: 2,
        },
        {
          month: "May",
          value: 5,
          quarterId: 2,
        },
        {
          month: "June",
          value: 6,
          quarterId: 2,
        },
        {
          month: "July",
          value: 7,
          quarterId: 3,
        },
        {
          month: "August",
          value: 8,
          quarterId: 3,
        },
        {
          month: "September",
          value: 9,
          quarterId: 3,
        },
        {
          month: "October",
          value: 10,
          quarterId: 4,
        },
        {
          month: "November",
          value: 11,
          quarterId: 4,
        },
        {
          month: "December",
          value: 12,
          quarterId: 4,
        },
      ],
      currentQuarter: null,

      donutOptions: {
        chart: {
          type: "donut",
          width: "100%",
        },
        labels: ["Sales", "Expenses", "Profits"],
        title: {
          text: "Revenue",
        },
        legend: {
          show: true,
          onItemClick: {
            toggleDataSeries: true,
          },
        },
        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const selectedDonutIndex = config.dataPointIndex; // Get the index of the selected donut segment
              this.setState((prevState) => ({
                openChart:
                  prevState.selectedDonutIndex !== selectedDonutIndex
                    ? true
                    : !prevState.openChart, // Toggle the openChart state if it's a different segment than the previous one
                selectedDonutIndex: selectedDonutIndex, // Update the selectedDonutIndex state
              }));
            },
          },
        },
      },
      donutSeries: [44, 55, 41],
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    try {
      this.getRevenueItem();
      this.getAmountByProduct();
      this.getAmountByCategory();
      this.getQuantityOfProducts();
      this.getTotalProfit();
      this.getProfitForCategories();
      this.getTotalQuantity();
      this.getProductsSold();
      this.getTotalExpenses();
      this.getProfitByMonth();
      this.getProfitByProduct();
      this.getActualCost();
      this.getSellingCost();
      this.getProductTypeName();
    } catch (error) {
      console.log(error);
    }
  };

  getTotalQuantity = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetTotalQuantity"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              total_quantities: response.data.data[0].total_quantity,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProfitByProduct = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetProfitByProduct"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              profit_by_product: response.data.data[0].profit_by_products,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProductTypeName = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetProductTypeName"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          )
           {
            _this.setState({
              ProductTypeNames: response.data.data
            });
            console.log(response.data.data);
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getActualCost = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetActualCost"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              actual_costs: response.data.data[0].actual_cost,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getSellingCost = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetSellingCost"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              selling_costs: response.data.data[0].selling_cost,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProductsSold = () => {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetProductsSold"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              total_products_sold: response.data.data[0].total_quantity,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getRevenueItem(from_date = "", to_date = "") {
    let _this = this;
    this.setState({ total_price: 0 });
    try {
      let postData = {
        from_date: from_date,
        to_date: to_date,
      };
      axios({
        method: "post",
        url: Apipath["GetRevenueItems"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: postData,
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({ total_price: response.data.data[0].total_sales });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getAmountByProduct() {
    let productNameList = [];
    let productTotalList_sold = [];
    let productTotalList_avialable = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetAmountByProduct"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            response.data.data.forEach((item) => {
              productNameList.push(item.product_type_name);
              productTotalList_avialable.push(item.total_sub_product_price);
              productTotalList_sold.push(item.total_order_details_price);
            });

            let _revenue_expense_Option = {
              dataLabels: {
                enabled: false,
              },
              title: {
                text: "Amount on Available Product Type",
              },
              chart: {
                id: "revenue-expense-chart",
                stacked: false,
                height: 350,
                type: "bar", // Changed to "bar" to support multiple columns
              },
              stroke: {
                width: [0, 0], // Setting the stroke width for both bar columns
              },
              xaxis: {
                categories: productNameList,
              },
              yaxis: [
                {
                  title: {
                    text: "Amount",
                  },
                  labels: {
                    formatter: function (value) {
                      if (value >= 1000) {
                        return value / 1000 + "k";
                      }
                      return value;
                    },
                  },
                },
              ],
            };

            let _revenue_expense_series = [
              {
                name: "Prod_Available",
                type: "bar",
                data: productTotalList_avialable,
              },
              {
                name: "Prod_Sold",
                type: "bar",
                data: productTotalList_sold, // Assuming this array holds the expense data
              },
            ];
            // console.log(_revenue_expense_Option);
            // console.log(_revenue_expense_series);

            _this.setState({
              revenue_expense_Option: _revenue_expense_Option,
              revenue_expense_series: _revenue_expense_series,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getAmountByCategory() {
    let CategoryNameList = [];
    let CategoryTotalList = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetAmountByCategory"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            response.data.data.forEach((item) => {
              CategoryTotalList.push(item.total_sales);
              CategoryNameList.push(item.product_type_name);
            });

            let _teststate = {
              series: [
                {
                  data: CategoryTotalList,
                },
              ],
              options: {
                chart: {
                  type: "bar",
                  height: 380,
                  width: "100%",
                },

                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    borderRadiusApplication: "end",
                    horizontal: true,
                  },
                },
                title: {
                  text: "Sales on Product Type",
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: CategoryNameList,
                  labels: {
                    formatter: function (value) {
                      if (value >= 1000) {
                        return value / 1000 + "k";
                      }
                      return value;
                    },
                  },
                },
              },
              // responsive: [
              //   {
              //     breakpoint: 2000,
              //     options:{
              //       plotOptions:{
              //         bar:{
              //           horizontal: false
              //         }
              //       },
              //     }
              //   }
              // ],
            };

            _this.setState({ teststate: _teststate });
            // console.log("FGG ", _teststate);
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getQuantityOfProducts() {
    let QuantityTotalList_available = [];
    let QuantityTotalList_sold = [];
    let QuantityNameList = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetQuantityOfProducts"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            // console.log(" response.data.data",response.data.data)
            response.data.data.forEach((item) => {
              QuantityTotalList_available.push(item.quantity_available);
              QuantityTotalList_sold.push(item.quantity_sold);
              QuantityNameList.push(item.product_type_name);
            });

            let _new_donut_options = {
              chart: {
                type: "bar",
                // width: '100%',
                height: 500,
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: QuantityNameList, // Set product type names on x-axis
              },
              title: {
                text: "Quantity By Product Type",
              },
              yaxis: {
                labels: {
                  formatter: function (value) {
                    if (value >= 1000) {
                      return value / 1000 + "k";
                    }
                    return value;
                  },
                },
              },
              new_donut_series: [
                {
                  name: "Qnt_Sold",
                  data: QuantityTotalList_sold, // Quantities sold
                },
                {
                  name: "Qnt_Available",
                  data: QuantityTotalList_available, // Quantities available
                },
              ],
            };
            _this.setState({ new_donut_options: _new_donut_options });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getTotalProfit() {
    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetTotalProfit"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          // debugger
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              profit_total_price: response.data.data[0].total_profit,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getProfitForCategories() {
    let CategoryNameList = [];
    let CategoryTotalList = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetProfitForCategories"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            response.data.data.forEach((item) => {
              // console.log("i ",item);
              CategoryTotalList.push(item.profit);
              CategoryNameList.push(item.product_type_name);
            });

            // console.log(CategoryTotalList);
            // console.log(CategoryNameList);

            let _profit_by_category = {
              option: {
                chart: {
                  type: "bar",
                  height: 350,
                },
                title: {
                  text: "Profit By Product Type", 
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    borderRadiusApplication: "end",
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: CategoryNameList,
                  labels: {
                    formatter: function (value) {
                      if (value >= 1000) {
                        return value / 1000 + "k";
                      }
                      return value;
                    },
                  },
                },
              },

              series: [
                {
                  data: CategoryTotalList,
                },
              ],
            };
            _this.setState({ profit_by_category: _profit_by_category });
            // console.log(_profit_by_category);
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getTotalExpenses() {
    let tot_sales = [];
    let tot_profit = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetTotalExpenses"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            _this.setState({
              total_expenses: response.data.data[0].tot_expense,
            });
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getProfitByMonth() {
    let ProfitbyMonthList = [];
    let OrderedDateList = [];

    let _this = this;
    try {
      axios({
        method: "get",
        url: Apipath["GetProfitByMonth"],
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (
            response &&
            response.data.error_code == "9999" &&
            response.data.data.length > 0
          ) {
            response.data.data.forEach((item) => {
              ProfitbyMonthList.push(item.total_profit);
              console.log(ProfitbyMonthList);
              OrderedDateList.push(item.ordered_date);
              console.log(OrderedDateList);
            });

            let _profit_by_month = {
              options: {
                chart: {
                  type: "bar",
                  height: 350,
                },
                title: {
                  text: "Profit By Month",
                  color: "#ffff",
                },
                plotOptions: {
                  bar: {
                    colors: {
                      ranges: [
                        {
                          from: -100,
                          to: -46,
                          color: "#F15B46",
                        },
                        {
                          from: -45,
                          to: 0,
                          color: "#FEB019",
                        },
                      ],
                    },
                    columnWidth: "70%",
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                yaxis: {
                  title: {
                    text: "Growth",
                  },
                  labels: {
                    formatter: function (y) {
                      if (y > 1000) {
                        y = y / 1000 + "k";
                      }
                      return y;
                    },
                  },
                },
                // labels: {
                //   formatter: function (value) {
                //     if (value >= 1000) {
                //       return value / 1000 + "k";
                //     }
                //     return value;
                //   },
                // },
                xaxis: {
                  // type: 'datetime',
                  categories: OrderedDateList,
                  labels: {
                    rotate: -90,
                  },
                },
              },
              series: [
                {
                  name: "Cash Flow",
                  data: ProfitbyMonthList,
                },
              ],
            };
            _this.setState({ profit_by_month: _profit_by_month });
            // console.log(_profit_by_month);
          } else {
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // Function to generate bar series data based on the selected donut segment
  generateBarSeriesData(selectedDonutIndex) {
    // Example implementation - Replace this with your actual data generation logic
    const seriesData = [
      [20, 31, 25, 41, 59, 72, 89, 101, 168],
      [30, 21, 45, 61, 39, 52, 79, 111, 128],
      [40, 51, 15, 71, 29, 92, 99, 81, 48],
    ];
    return [
      {
        name: `Series ${selectedDonutIndex + 1}`, // Use the selected donut index to label the series
        data: seriesData[selectedDonutIndex],
      },
    ];
  }

  componentDidUpdate(prevProps, prevState) {
    // Update the bar chart series when the selectedDonutIndex changes
    if (prevState.selectedDonutIndex !== this.state.selectedDonutIndex) {
      const barSeriesData = this.generateBarSeriesData(
        this.state.selectedDonutIndex
      );
      this.setState({
        barSeries: barSeriesData,
      });
    }
  }

  filterChange = (type_id, e) => {
    try {
      let from_date = "";
      let to_date = "";

      switch (type_id) {
        case 1:
          this.setState({ selectedYear: e.target.value });
          from_date = `${e.target.value}-01-01`;
          to_date = `${e.target.value}-12-31`;
          var date = new Date();

          if (date.getFullYear() == e.target.value) {
            this.setState({
              currentQuarter: Math.floor((date.getMonth() + 3) / 3),
            });
          } else {
            this.setState({
              currentQuarter: 4,
            });
          }

          break;

        case 2:
        case 3:
          let quarter = e.target.value;

          if (type_id == 2) {
            this.setState({ selectedQuarter: e.target.value });
          } else if (type_id == 3) {
            this.setState({ selectedMonth: e.target.value });
          }
          const quarterStartMonths = [0, 3, 6, 9]; // Months corresponding to the start of each quarter
          const quarterStartMonth = quarterStartMonths[quarter - 1];
          const startDate = new Date(
            this.state.selectedYear,
            quarterStartMonth,
            1
          );
          const endDate = new Date(
            this.state.selectedYear,
            quarterStartMonth + 3,
            0
          );
          endDate.setHours(23, 59, 59, 999);
          from_date = startDate.toISOString().split("T")[0];
          to_date = endDate.toISOString().split("T")[0];
          break;
      }

      this.getRevenueItem(from_date, to_date);
    } catch (e) {
      console.log(e);
    }
  };
  clickbt(data) {
    // console.log("dataaaa",data)
    this.setState({ selectedYear: "" });
    this.setState({ selectedQuarter: "" });
    this.setState({ selectedMonth: "" });
  }
  render() {
    console.log(this.state);
    const {
      selectedYear,
      selectedQuarter,
      selectedMonth,
      quartersList,
      monthList,
      currentQuarter,
    } = this.state;

    return (
      <div style={{ padding: "0px" }}>
        <div className="container parent_container">
          <div className="row dashboard_filter">
            <div className="col-lg-3">
              <h2>Dashboard</h2>
            </div>
            <div className="col-lg-7">
              <div className="row year_filters">
                <div className="col-lg-3">
                  <select
                    value={selectedYear}
                    onChange={(e) => this.filterChange(1, e)}
                  >
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <select
                    value={selectedQuarter}
                    onChange={(e) => this.filterChange(2, e)}
                    disabled={!selectedYear}
                  >
                    <option value="">Quarter</option>

                    {quartersList.map((quarter) => {
                      return (
                        <>
                          {quarter.value <= currentQuarter && (
                            <option key={quarter.value} value={quarter.value}>
                              {quarter.label}
                            </option>
                          )}
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-3">
                  <select
                    value={selectedMonth}
                    onChange={(e) => this.filterChange(3, e)}
                    disabled={!selectedQuarter}
                  >
                    <option value="">Month</option>
                    {monthList.map((item) => {
                      return (
                        item.quarterId == selectedQuarter && (
                          <option key={item.value} value={item.value}>
                            {item.month}
                          </option>
                        )
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-3">
                  <button id="clear" onClick={() => this.clickbt("clear")}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <select id="dropdown">
                <option value="all">Region</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <select id="dropdown">
                <option value="product_type">Product Type</option>
                {/* <option value="all">All</option> */}
                {this.state.ProductTypeNames.map(option => ( 
                  <option key = {option.value} value = {option.value}>{option.product_type_name}</option>
                  // <option key = {option} value = {option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row card_filter">
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(this.state.total_price)}
              </h3>
              <p>Total Sales</p>
            </div>
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(
                  this.state.total_quantities
                )}
              </h3>
              <p>Total Quantity</p>
            </div>
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(
                  this.state.profit_total_price
                )}
              </h3>
              <p>Total Profit</p>
            </div>
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(
                  this.state.total_products_sold
                )}
              </h3>
              <p>Products Sold</p>
            </div>
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(this.state.actual_costs)}
              </h3>
              <p>Total Actual Cost</p>
            </div>
            <div className="col-lg-2">
              <h3>
                {CommonFunction.formatCompactNumber(this.state.selling_costs)}
              </h3>
              <p>Total Selling Cost</p>
            </div>
          </div>
          <div className="row chart_filter_1">
            <div className="col-lg-4 chart border_base">
              <Chart
                options={this.state.donutOptions}
                series={[
                  this.state.total_price,
                  this.state.total_expenses,
                  this.state.profit_total_price,
                ]}
                type="donut"
                className="char-width"
              />
            </div>
            <div className="col-lg-4 chart border_base">
              {this.state.teststate != null && (
                <Chart
                  options={this.state.teststate.options}
                  series={this.state.teststate.series}
                  type="bar"
                  className="char-width"
                />
              )}
            </div>
            <div className="col-lg-4 chart ">
              {this.state.profit_by_month != null && (
                <Chart
                  options={this.state.profit_by_month.options}
                  series={this.state.profit_by_month.series}
                  type="bar"
                  className="char-width"
                />
              )}
            </div>
          </div>
          <div className="row chart_filter_1">
            <div className="col-lg-4 chart border_base">
              {this.state.new_donut_options != null && (
                <Chart
                  options={this.state.new_donut_options}
                  series={this.state.new_donut_options.new_donut_series}
                  type="bar"
                  className="char-width"
                />
              )}
            </div>
            <div className="col-lg-4 chart border_base">
              {this.state.revenue_expense_Option &&
                this.state.revenue_expense_series && (
                  <Chart
                    options={this.state.revenue_expense_Option}
                    series={this.state.revenue_expense_series}
                    type="bar"
                    className="char-width"
                  />
                )}
            </div>
            <div className="col-lg-4 chart ">
              {this.state.profit_by_category && (
                <Chart
                  options={this.state.profit_by_category.option}
                  series={this.state.profit_by_category.series}
                  type="bar"
                  className="char-width"
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className="donut container">
          <div class="row rev_topbargrid">
            <div class="col-lg-3 rev_dashboard">
              <h2>Dashboard</h2>
            </div>
            <div class="col-lg-5 rev_dashboard">
              <select
                value={selectedYear}
                onChange={(e) => this.filterChange(1, e)}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <select
                value={selectedQuarter}
                onChange={(e) => this.filterChange(2, e)}
                disabled={!selectedYear}
              >
                <option value="">Select Quarter</option>

                {quartersList.map((quarter) => {
                  return (
                    <>
                      {quarter.value <= currentQuarter && (
                        <option key={quarter.value} value={quarter.value}>
                          {quarter.label}
                        </option>
                      )}
                    </>
                  );
                })}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => this.filterChange(3, e)}
                disabled={!selectedQuarter}
              >
                <option value="">Select Month</option>
                {monthList.map((item) => {
                  return (
                    item.quarterId == selectedQuarter && (
                      <option key={item.value} value={item.value}>
                        {item.month}
                      </option>
                    )
                  );
                })}
              </select>
              <button id="clear" onClick={() => this.clickbt("clear")}>
                Clear
              </button>
            </div>
            <div class="col-lg-4 region_fliter">
              <p>Region</p>
              <div class="Col-lg-4">
                <select id="dropdown">
                  <option value="all">All</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>
          </div>

          <div class="container font_view">
            <div class="row m-0">
              <div class="col-lg-8 px-2">
                <div class="row m-0">
                  <div className="col-lg-3">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.total_price
                        )}
                      </h3>
                      <p>Total Sales</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.total_quantities
                        )}
                      </h3>
                      <p>Total Quantity</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.profit_total_price
                        )}
                      </h3>
                      <p>Total Profit</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.total_products_sold
                        )}
                      </h3>
                      <p>Products Sold</p>
                    </div>
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col-lg-6">
                    <div className="chart_rw_1">
                      <Chart
                        options={this.state.donutOptions}
                        series={[
                          this.state.total_price,
                          this.state.total_expenses,
                          this.state.profit_total_price,
                        ]}
                        type="donut"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div className="chart_rw_1">
                      {this.state.teststate != null && (
                        <Chart
                          options={this.state.teststate.options}
                          series={this.state.teststate.series}
                          type="bar"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                <div class="row m-0">
                  <div class="col-lg-6">
                    <div class="chart_rw_1">
                      {this.state.new_donut_options != null && (
                        <Chart
                          options={this.state.new_donut_options}
                          series={this.state.new_donut_options.new_donut_series}
                          type="donut"
                          className="char-width"
                        />
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="chart_rw_1">
                      {this.state.revenue_expense_Option &&
                        this.state.revenue_expense_series && (
                          <Chart
                            options={this.state.revenue_expense_Option}
                            series={this.state.revenue_expense_series}
                            type="bar"
                            className="char-width"
                          />
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 px-2">
                <div class="row m-0">
                  <div className="col-lg-6">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.total_products_sold
                        )}
                      </h3>
                      <p>Total Actual Cost</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card-view">
                      <h3>
                        {CommonFunction.formatCompactNumber(
                          this.state.total_products_sold
                        )}
                      </h3>
                      <p>Total Selling Cost</p>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="chart_rw_1">
                      {this.state.profit_by_month != null && (
                        <Chart
                          options={this.state.profit_by_month.options}
                          series={this.state.profit_by_month.series}
                          type="bar"
                          className="char-width"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col-lg-12">
                    <div class="chart_rw_1">
                      {this.state.profit_by_category && (
                        <Chart
                          options={this.state.profit_by_category.option}
                          series={this.state.profit_by_category.series}
                          type="bar"
                          className="char-width"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Revenue;
