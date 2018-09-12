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

    const eligibleInput = new Set(["n", "o", "f", "a"]);

    const handleOnKeyUp = (e) => {
      console.log(e.currentTarget.value);
    };

    const getHeaders = () => {
      return "<thead><tr><th scope=\"col\">#</th><th scope=\"col\">Answer</th></tr></thead>";
    };

    const getRow = (index) => {
      const row = $("<tr><th scope=\"row\">" + index + "</th><td><input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"\" aria-describedby=\"basic-addon2\"></td></tr>");
      row.find("input").keyup((e) => handleOnKeyUp(e, index));
      return row;
    };

    const getRows = (start, rowNum) => {
      const rows = [];
      for(let i = 0; i < rowNum; i++) {
        rows.push(getRow(start + i));
      }
      return rows;
    };

    const getTable = (start, config) => {
      const table = $("<table></table>");
      table.append(getHeaders());
      const tbody = $("<tbody></tbody>");
      const rows = getRows(start, config.rowNum);
      tbody.append(rows);
      table.append(tbody);
      return table;
    };

    const getTables = () => {
      let start = 1;
      return tableConfig.map((config) => {
        const table = getTable(start, config);
        start += config.rowNum;
        return table;
      });
    };

    const tables = getTables();
    container.append(tables);
  }
)();
