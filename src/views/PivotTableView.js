import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Webix from '../webix';
import * as webix from 'webix/webix.js';
import ReactDOM from 'react-dom';
/* eslint no-undef: 0 */  // --> OFF 
/* eslint no-unused-expressions: 0 */  // --> OFF
// import '../codebase/webix/webix.js';
/* eslint no-unused-expressions: 0 */  // --> OFF
// import '../codebase/pivot.js'

// function getForm(save) {
//     return {
//         view:"pivot", 
//         width:900, 
//         structure: {
//             rows: ["form", "name"],
//             columns: ["year"],
//             values: [{ name: "oil", operation: ["min", "sum"] }],
//           }
//     };
// }

// const ui = {
//     view: "pivot",
//     url: "https://docs.webix.com/pivot-backend/",
//     structure: {
//       rows: ["form", "name"],
//       columns: ["year"],
//       values: [{ name: "oil", operation: ["min", "sum"] }],
//     }
// };
// const value = 123;

// function getUI(select){
//     return {
//       view:"pivot", scroll:false, width:400, autoheight:true, select:true, 
//     //     columns:[
//     //     { id:"name", fillspace:1 },
//     //     { id:"email", fillspace:1 },
//     //     { id:"age", width: 50 }
//     //   ],
//         url: "https://docs.webix.com/pivot-backend/",
//         mode: "chart",
//         structure: {
//             groupBy: "year",
//             rows: ["form", "name"],
//             values: [{ name: "oil", operation: ["min", "sum"] }],
//         },
//     //   on:{
//     //     onAfterSelect:function(id){
//     //       select(id);
//     //     }
//     //   }
//     };
//   }

const PivotTableView = ({ data, select }) => {
  console.log(webix)
  
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./codebase/webix/webix.js";
        script.async = true;
        document.head.appendChild(script);
      return () => {
          document.head.removeChild(script);
        }
      }, []);
    
      useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "./codebase/pivot.js";
        script1.async = true;
        document.head.appendChild(script1);
      return () => {
          document.head.removeChild(script1);
        }
      }, []);

      // useEffect(() => {
      //   const div = document.createElement('div');
      //   webix.ui(
      //     this.props.ui, 
      //     ReactDOM.findDOMNode(this.refs.root)
      //   );
      // })

    return (
        // <Webix ui={getUI(select)} data={data} />
        <>
        {/* <Helmet>
            <script>
                {
                  webix.ui({
                    view:"form", 
                    id:"log_form",
                    width:300,
                    margin: 100,
                    elements:[
                        { view:"text", label:"Email", name:"email"},
                        { view:"text", type:"password", label:"Password", name:"password"},
                        { margin:5, cols:[
                            { view:"button", value:"Login" , css:"webix_primary"},
                            { view:"button", value:"Cancel"}
                        ]}
                    ]
                  })
                }
                
            </script>
            
        </Helmet> */}


        <Helmet>
            <script>
              {
                webix.ui({
                  view:"menu",
                  id:"my_menu",
                  subMenuPos:"right",
                  layout:"y",
                  data:[ //menu data
                      { value:"Translate...", submenu:["English", "Slavic...", "German"]},
                      { $template:"Separator" },
                      { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
                      { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
                      { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
                      { value:"Post...", submenu:[ "Facebook", "Google+", "Twitter" ]},
                  ],
                  type:{
                      subsign:true,
                      height:50
                  }           
                })
              }
            </script>
        </Helmet>
        </>
    )
}

export default PivotTableView;