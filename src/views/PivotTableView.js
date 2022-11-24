// ------ Webix ----------


// import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import Webix from '../webix';
// import * as webix from 'webix/webix.js';
// import ReactDOM from 'react-dom';
// /* eslint no-undef: 0 */  // --> OFF 
// /* eslint no-unused-expressions: 0 */  // --> OFF
// // import '../codebase/webix/webix.js';
// /* eslint no-unused-expressions: 0 */  // --> OFF
// // import '../codebase/pivot.js'

// // function getForm(save) {
// //     return {
// //         view:"pivot", 
// //         width:900, 
// //         structure: {
// //             rows: ["form", "name"],
// //             columns: ["year"],
// //             values: [{ name: "oil", operation: ["min", "sum"] }],
// //           }
// //     };
// // }

// // const ui = {
// //     view: "pivot",
// //     url: "https://docs.webix.com/pivot-backend/",
// //     structure: {
// //       rows: ["form", "name"],
// //       columns: ["year"],
// //       values: [{ name: "oil", operation: ["min", "sum"] }],
// //     }
// // };
// // const value = 123;

// // function getUI(select){
// //     return {
// //       view:"pivot", scroll:false, width:400, autoheight:true, select:true, 
// //     //     columns:[
// //     //     { id:"name", fillspace:1 },
// //     //     { id:"email", fillspace:1 },
// //     //     { id:"age", width: 50 }
// //     //   ],
// //         url: "https://docs.webix.com/pivot-backend/",
// //         mode: "chart",
// //         structure: {
// //             groupBy: "year",
// //             rows: ["form", "name"],
// //             values: [{ name: "oil", operation: ["min", "sum"] }],
// //         },
// //     //   on:{
// //     //     onAfterSelect:function(id){
// //     //       select(id);
// //     //     }
// //     //   }
// //     };
// //   }

// const PivotTableView = ({ data, select }) => {
//   console.log(webix)
  
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = "./codebase/webix/webix.js";
//         script.async = true;
//         document.head.appendChild(script);
//       return () => {
//           document.head.removeChild(script);
//         }
//       }, []);
    
//       useEffect(() => {
//         const script1 = document.createElement('script');
//         script1.src = "./codebase/pivot.js";
//         script1.async = true;
//         document.head.appendChild(script1);
//       return () => {
//           document.head.removeChild(script1);
//         }
//       }, []);

//       // useEffect(() => {
//       //   const div = document.createElement('div');
//       //   webix.ui(
//       //     this.props.ui, 
//       //     ReactDOM.findDOMNode(this.refs.root)
//       //   );
//       // })

//     return (
//         // <Webix ui={getUI(select)} data={data} />
//         <>
//         {/* <Helmet>
//             <script>
//                 {
//                   webix.ui({
//                     view:"form", 
//                     id:"log_form",
//                     width:300,
//                     margin: 100,
//                     elements:[
//                         { view:"text", label:"Email", name:"email"},
//                         { view:"text", type:"password", label:"Password", name:"password"},
//                         { margin:5, cols:[
//                             { view:"button", value:"Login" , css:"webix_primary"},
//                             { view:"button", value:"Cancel"}
//                         ]}
//                     ]
//                   })
//                 }
                
//             </script>
            
//         </Helmet> */}


//         <Helmet>
//             <script>
//               {
//                 webix.ui({
//                   view:"menu",
//                   id:"my_menu",
//                   subMenuPos:"right",
//                   layout:"y",
//                   data:[ //menu data
//                       { value:"Translate...", submenu:["English", "Slavic...", "German"]},
//                       { $template:"Separator" },
//                       { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
//                       { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
//                       { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
//                       { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
//                   ],
//                   type:{
//                       subsign:true,
//                       height:50
//                   }           
//                 })
//               }
//             </script>
//         </Helmet>
//         </>
//     )
// }

// export default PivotTableView;

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'year', rowGroup: true, enableRowGroup: true, enablePivot: true },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 250,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onBtNormal = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(false);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);

  const onBtPivotMode = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);

  const onBtFullPivot = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', pivot: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);
  
  const processCellForClipboard = useCallback((params) => {
    if (
      params.column.getColId() === 'athlete' &&
      params.value &&
      params.value.toUpperCase
    ) {
      return params.value.toUpperCase();
    }
    return params.value;
}, []);

const processCellFromClipboard = useCallback((params) => {
    if (
      params.column.getColId() === 'athlete' &&
      params.value &&
      params.value.toLowerCase
    ) {
      return params.value.toLowerCase();
    }
    return params.value;
}, []);

const onRangeSelectionChanged = useCallback((event) => {
    var lbRangeCount = document.querySelector('#lbRangeCount');
    var lbEagerSum = document.querySelector('#lbEagerSum');
    var lbLazySum = document.querySelector('#lbLazySum');
    var cellRanges = gridRef.current.api.getCellRanges();
    // if no selection, clear all the results and do nothing more
    if (!cellRanges || cellRanges.length === 0) {
      lbRangeCount.innerHTML = '0';
      lbEagerSum.innerHTML = '-';
      lbLazySum.innerHTML = '-';
      return;
    }
    // set range count to the number of ranges selected
    lbRangeCount.innerHTML = cellRanges.length + '';
    var sum = 0;
    var api = gridRef.current.api;
    if (cellRanges) {
      cellRanges.forEach(function (range) {
        // get starting and ending row, remember rowEnd could be before rowStart
        var startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
        for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
          range.columns.forEach(function (column) {
            var rowModel = api.getModel();
            var rowNode = rowModel.getRow(rowIndex);
            var value = api.getValue(column, rowNode);
            if (typeof value === 'number') {
              sum += value;
            }
          });
        }
      });
    }
    lbEagerSum.innerHTML = sum + '';
    if (event.started) {
      lbLazySum.innerHTML = '?';
    }
    if (event.finished) {
      lbLazySum.innerHTML = sum + '';
    }
  }, []);


  const enableCharts = true;
  const enableRangeSelection = true;

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtNormal}>1 - Grouping Active</button>
          <button onClick={onBtPivotMode}>
            2 - Grouping Active with Pivot Mode
          </button>
          <button onClick={onBtFullPivot}>
            3 - Grouping Active with Pivot Mode and Pivot Active
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef} // Default Column Properties
            rowSelection='multiple'
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted

            // Pivot 
            rowGroupPanelShow="always"

            autoGroupColumnDef={autoGroupColumnDef}
            // groupDisplayType={groupDisplayType}

            // groupIncludeFooter={groupIncludeFooter}
            // groupIncludeTotalFooter={groupIncludeTotalFooter}

            // treeData={treeData}

            enableCharts={enableCharts} 
            enableRangeSelection={enableRangeSelection}
            suppressMultiRangeSelection={true}

            // user created chart 
            processCellForClipboard={processCellForClipboard}
            processCellFromClipboard={processCellFromClipboard}
            onGridReady={onGridReady}
            onRangeSelectionChanged={onRangeSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default GridExample;