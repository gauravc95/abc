"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (document.getElementById('cd-chart')) {
  var _defineProperty = function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _classCallCheck = function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var _possibleConstructorReturn = function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
  };

  var _inherits = function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _Recharts = Recharts,
      AreaChart = _Recharts.AreaChart,
      Area = _Recharts.Area,
      XAxis = _Recharts.XAxis,
      YAxis = _Recharts.YAxis,
      CartesianGrid = _Recharts.CartesianGrid,
      ResponsiveContainer = _Recharts.ResponsiveContainer,
      Legend = _Recharts.Legend,
      Label = _Recharts.Label,
      Text = _Recharts.Text;
  var data = [{
    month: 'Apr',
    "1-5": 80,
    "6-10": 25,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'May',
    "1-5": 35,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Jun',
    "1-5": 37,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Jul',
    "1-5": 27,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Aug',
    "1-5": 39,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Sep',
    "1-5": 25,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Oct',
    "1-5": 23,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }, {
    month: 'Nov',
    "1-5": 27,
    "6-10": 20,
    "11-20": 10,
    "21-50": 8,
    "50+": 4
  }];

  var RankingsChart = function (_React$Component) {
    _inherits(RankingsChart, _React$Component);

    function RankingsChart() {
      _classCallCheck(this, RankingsChart);

      return _possibleConstructorReturn(this, (RankingsChart.__proto__ || Object.getPrototypeOf(RankingsChart)).apply(this, arguments));
    }

    _createClass(RankingsChart, [{
      key: "render",
      value: function render() {
        var _React$createElement, _React$createElement2, _React$createElement3, _React$createElement4, _React$createElement5;

        var values = data.map(function (item) {
          return {
            month: item.month
          };
        });
        return React.createElement("div", {
          className: "cd-chart"
        }, React.createElement("div", {
          className: "cd-chart__header"
        }), React.createElement(ResponsiveContainer, {
          width: "100%",
          height: 235
        }, React.createElement(AreaChart, {
          data: data,
          margin: {
            top: 30,
            right: 20,
            left: 20,
            bottom: 0
          }
        }, React.createElement("text", {
          x: "20",
          y: "20",
          style: {
            fontSize: 12,
            fill: "#9b9b9b"
          }
        }, "Income"), React.createElement(Legend, {
          iconType: "circle",
          align: "left",
          margin: {
            top: 20,
            left: 0,
            right: 100,
            bottom: 0
          },
          iconSize: "10",
          layout: "vertical",
          verticalAlign: "top"
        }), React.createElement(CartesianGrid, {
          strokeDasharray: "3 3"
        }), React.createElement(XAxis, {
          dataKey: "month",
          tick: {
            fill: "#9b9b9b",
            strokeWidth: 0,
            fontSize: 12
          },
          tickLine: {
            stroke: "#31373d",
            strokeWidth: 1
          }
        }), React.createElement(YAxis, {
          tick: {
            fill: "#9b9b9b",
            strokeWidth: 0,
            fontSize: 12
          },
          tickLine: {
            stroke: "#31373d",
            strokeWidth: 1
          }
        }, React.createElement(Label, {
          value: "Total income",
          angle: -90,
          position: "top",
          offset: -80,
          style: {
            fontSize: 12,
            fill: '#9b9b9b'
          }
        })), React.createElement(Area, (_React$createElement = {
          dataKey: "1-5",
          stroke: "transparent"
        }, _defineProperty(_React$createElement, "stroke", "#1eb2ba"), _defineProperty(_React$createElement, "fill", "#1eb2ba"), _React$createElement)), React.createElement(Area, (_React$createElement2 = {
          dataKey: "6-10",
          stroke: "transparent"
        }, _defineProperty(_React$createElement2, "stroke", "#45b063"), _defineProperty(_React$createElement2, "fill", "#45b063"), _React$createElement2)), React.createElement(Area, (_React$createElement3 = {
          dataKey: "11-20",
          stroke: "transparent"
        }, _defineProperty(_React$createElement3, "stroke", "#ccad52"), _defineProperty(_React$createElement3, "fill", "#ccad52"), _React$createElement3)), React.createElement(Area, (_React$createElement4 = {
          dataKey: "21-50",
          stroke: "transparent"
        }, _defineProperty(_React$createElement4, "stroke", "#cc8100"), _defineProperty(_React$createElement4, "fill", "#cc8100"), _React$createElement4)), React.createElement(Area, (_React$createElement5 = {
          dataKey: "50+",
          stroke: "transparent"
        }, _defineProperty(_React$createElement5, "stroke", "#ff6f00"), _defineProperty(_React$createElement5, "fill", "#ff6f00"), _React$createElement5)))));
      }
    }]);

    return RankingsChart;
  }(React.Component);

  ;
  ReactDOM.render(React.createElement(RankingsChart, null), document.getElementById('cd-chart'));
}
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";
"use strict";