import React from 'react';
import Webix from '../webix';

function getForm(save) {
    return {
        view:"form", 
        width:400, 
        elements:[
          { view:"text", name:"name", label:"Name", placeholder:"Type your full name here"},
          { view:"text", name:"email", label:"Email"},
          { view:"slider", name:"age", label:"Age", value:"25"},
          { cols:[
            {}, { view:"button", value:"Save", click:function(){
              if (save)
                save(this.getFormView().getValues());
            }}
          ]}
        ]
    };
    
}

const FormView = ({ data, save }) => {

    return (
        <div style={{margin: '40px'}}>
            <Webix ui={getForm(save)} data={data}/>
        </div>
    )

}

export default FormView;