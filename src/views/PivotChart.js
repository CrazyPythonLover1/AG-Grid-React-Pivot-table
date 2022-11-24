import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { GridChartsModule } from "@ag-grid-enterprise/charts";

import '../App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

const PivotChart = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    
    const [columnDefs, setColumnDefs] = useState([
        { field: 'country', rowGroup: true, },
        { field: 'age',  maxWidth: 90, rowGroup: true, chartDataType: 'category'},
        { field: 'athlete', chartDataType: 'category'},
        { field: 'bronze', aggFunc: 'sum', },
        { field: 'date', chartDataType: 'excluded'},
        { field: 'gold', aggFunc: 'sum', chartDataType: 'series'  },
        { field: 'silver', aggFunc: 'sum', },
        { field: 'sport',},
        { field: 'total',},
        { field: 'year',  maxWidth: 90, rowGroup: true, enableRowGroup: true, enablePivot: true},
        { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
    ])
  
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        pivot: true,
        sortable:true,
        filter: true,
        flex: 1,
      minWidth: 100,
      editable: true,
        
    }));

    const autoGroupColumnDef = {
        // enabled sorting on Row Group Columns only 
        sortable: true,        
    };
    // also applies to the 'multipleColumns' display type 
    const groupDisplayType = 'singleColumn';

    
    // adds subtotals
    const groupIncludeFooter = true;
    // includes grand total
    const groupIncludeTotalFooter = true;

    const treeData = true;

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

      
    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json') // row-data
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);
      console.log(rowData)

      const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
          .then((resp) => resp.json())
          .then((data) => setRowData(data));
      }, []);


      // Example using Grid's API
    const buttonListener = useCallback( e => {
        console.log(gridRef)
        gridRef?.current?.api?.deselectAll();
    }, []);
 

    const enableCharts = true;
    const enableRangeSelection = true;

    return (
        <div style={{margin: "40px auto 40px auto", width: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button onClick={buttonListener}>Push Me for removing the selection </button>

            <div className='ag-theme-alpine' style={{height: 400, width: '100%', marginTop: '40px' }}>
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
                    groupDisplayType={groupDisplayType}

                    groupIncludeFooter={groupIncludeFooter}
                    groupIncludeTotalFooter={groupIncludeTotalFooter}

                    // treeData={treeData}

                    enableCharts={enableCharts} 
                    enableRangeSelection={enableRangeSelection}
                    suppressMultiRangeSelection={true}

                    // user created chart 
                    processCellForClipboard={processCellForClipboard}
                    processCellFromClipboard={processCellFromClipboard}
                    onGridReady={onGridReady}
                    onRangeSelectionChanged={onRangeSelectionChanged}

                >
                </AgGridReact>
            </div>
        </div>
        
    )
}

export default PivotChart;