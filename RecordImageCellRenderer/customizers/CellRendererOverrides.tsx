import * as React from 'react';
import { CellRendererOverrides, CellRendererProps, GetRendererParams, RECID } from '../types';
import { Label } from '@fluentui/react-components';
import { PcfContextService } from '../services/PcfContextService';


// export const cellRendererOverrides: CellRendererOverrides = {
//     ["Text"]: (props, col) => {
//         // Render all text cells in green font
//         return <Label style={{ color: 'green' }}>{props.formattedValue}</Label>
//     }
// }

//defining a closure, to be able to use webAPI and the cache
export const generateCellRendererOverrides = 
(pcfContextService: PcfContextService) => {  
  return  {       
    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
      const {columnIndex, colDefs, rowData } = rendererParams;         
      const columnName = colDefs[columnIndex].name;     
      if(columnName !== "driv_name"){  // Apply Only for primaryname column
        //apply the functionality only for the dummy column
        //by returning null, the default renderer will be applied
        return null;
      }
      const parentId = rowData?.[RECID]; 
      return <div>{pcfContextService.entityname}:{parentId}</div>
      //return <People parentId={parentId} webAPI={webAPI} peopleCache={peopleCache}/>
      }        
  }  
}