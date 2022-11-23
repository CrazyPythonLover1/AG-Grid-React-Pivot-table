import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { GridChartsModule } from "@ag-grid-enterprise/charts";

// ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule]);

import '../App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PivotChart = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    
    const [columnDefs, setColumnDefs] = useState([
        { field: 'country', rowGroup: true, },
        { field: 'age', rowGroup: true, chartDataType: 'category'},
        { field: 'athlete', chartDataType: 'category'},
        { field: 'bronze', aggFunc: 'sum', },
        { field: 'date', chartDataType: 'excluded'},
        { field: 'gold', aggFunc: 'sum', chartDataType: 'series'  },
        { field: 'silver', aggFunc: 'sum', },
        { field: 'sport',},
        { field: 'total',},
        { field: 'year', rowGroup: true,},
        { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
    ])
  
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        pivot: true,
        sortable:true,
        filter: true,
        
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

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json') // row-data
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
      }, []);
      console.log(rowData)
      // Example using Grid's API
    const buttonListener = useCallback( e => {
        console.log(gridRef)
        gridRef?.current?.api?.deselectAll();
    }, []);
 

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

                >
                </AgGridReact>
            </div>
        </div>
        
    )
}

export default PivotChart;