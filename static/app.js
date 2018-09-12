(
  function () {
    const container = $(".container");

    const tableConfig = [
      {
        rowNum: 10
      },
      {
        rowNum: 7,
        reverse: true
      },
      {
        rowNum: 7,
        reverse: true
      },
      {
        rowNum: 8
      },
      {
        rowNum: 4
      },
      {
        rowNum: 7
      },
      {
        rowNum: 9
      },
      {
        rowNum: 10
      }
    ];

    const optionConfig = [
      {
        label: "Never",
        name: "n"
      },
      {
        label: "Occasionally",
        name: "o"
      },
      {
        label: "Frequently",
        name: "f"
      },
      {
        label: "Always",
        name: "a"
      }
    ];

    const data = [];

    const getSubTotal = (index, reverse = false) => {
      if (!data[index] || !data[index].length) {
        return 0;
      }
      return data[index].reduce((current, name) => {
        const optionIndex = optionConfig.findIndex((config) => {
          return config.name === name;
        });
        if (optionIndex === -1) {
          return current;
        }
        return (reverse ? optionIndex + 1 : 4 - optionIndex) + current;
      }, 0);
    };

    const renderSubTotals = () => {
      tableConfig.forEach((config, index) => {
        const {
          reverse
        } = config || {};
        const subtotal = getSubTotal(index, reverse);
        $(".table" + index).text(subtotal);
      });
    };

    const getTotal = () => {
      let total = 0;
      tableConfig.forEach((config, index) => {
        const {
          reverse
        } = config || {};
        const subtotal = getSubTotal(index, reverse);
        total += subtotal;
      });
      return total;
    };

    const renderTotal = () => {
      const total = getTotal();
      $(".total").text(total);
    };

    const handleOnKeyUp = (e, rowNum, rowConfig, rowIndex) => {
      const rowIndexNum = tableConfig.indexOf(rowConfig);
      if (!data[rowIndexNum]) {
        data[rowIndexNum] = [];
      }
      data[rowIndexNum][rowIndex] = e.currentTarget.value;
      renderSubTotals();
      renderTotal();
    };

    const getHeaders = (tableNum) => {
      return "<thead><tr><th scope=\"col\">#</th><th scope=\"col\">Answer</th><th><span>Sub total:</span><span class=\"table" + tableNum +"\"></span></th></tr></thead>";
    };

    const getOption = (config, index, rowNum, rowConfig, rowIndex) => {
      const {
        name,
        label
      } = config || {};
      const id = `${name}-${rowNum}`;
      const option = $("<div class=\"col-md-2 mb-2\"><label for=\"" + id + "\">" + label + "</label><input type=\"radio\" class=\"form-control\" id=\"" + id + "\" placeholder=\"First name\" value=\"" + name + "\" name=" + rowNum + "></div>");
      option.find("input").change((e) => handleOnKeyUp(e, rowNum, rowConfig, rowIndex));
      return option;
    };

    const getOptions = (rowNum, rowIndex, rowConfig) => {
      return optionConfig.map((config, index) => {
        return getOption(config, index, rowNum, rowConfig, rowIndex);
      });
    };

    const getRow = (start, index, rowConfig) => {
      const rowNum = start + index;
      const row = $("<tr><th scope=\"row\">" + rowNum + "</th><td class=\"form-row\"></td><td></td></tr>");
      row.find(".form-row").append(getOptions(rowNum, index, rowConfig));
      return row;
    };

    const getRows = (start, config) => {
      const rows = [];
      const {
        rowNum = 0
      } = config || {};
      for(let i = 0; i < rowNum; i++) {
        rows.push(getRow(start, i, config));
      }
      return rows;
    };

    const getTable = (start, index, config) => {
      const table = $("<table class=\"table\"></table>");
      table.append(getHeaders(index));
      const tbody = $("<tbody></tbody>");
      const rows = getRows(start, config);
      tbody.append(rows);
      table.append(tbody);
      return table;
    };

    const getTables = () => {
      let start = 1;
      return tableConfig.map((config, index) => {
        const table = getTable(start, index, config);
        start += config.rowNum;
        return table;
      });
    };

    const tables = getTables();
    container.append(tables);
  }
)();
