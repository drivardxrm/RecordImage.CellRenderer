import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from '../types';
import { PcfContextService } from '../services/PcfContextService';
import RecordImageCellApp from '../component/RecordImageCellApp';

//defining a closure, to be able to use webAPI and the cache
export const generateCellRendererOverrides = 
(pcfContextService: PcfContextService) => {  
  return  {       
    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
        const {columnIndex, colDefs, rowData } = rendererParams;         
        const isPrimary = colDefs[columnIndex].isPrimary;
        
        // Renders only for the PrimaryName of the entity
        if(!isPrimary){
            return null;
        } 

        // Depending on pagetype, get the entityname
        const pageType = (pcfContextService.context as any).factory._customControlProperties.pageType

        const entityname = pageType == 'EntityList' ?  
            (pcfContextService.context as any).page?.entityTypeName :
            (pcfContextService.context as any).factory?._customControlProperties?.descriptor?.Parameters?.TargetEntityType 

        // If entityname is not defined, Fail gracefully
        if(entityname == null){
            return null
        }

        const recordid = rowData?.[RECID]

        
        return (
            <RecordImageCellApp 
                entityname={entityname} 
                recordid={recordid!} 
                name={props.formattedValue!} 
                startEditing={props.startEditing}
                pcfContextService={pcfContextService}
            />
            
        )
    },
    ["Lookup"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
        const {columnIndex, colDefs, rowData } = rendererParams;         
        const columnName = colDefs[columnIndex].name;
        
        // Extract the entityname and recordid from dynamic property (columnName)
        type ObjectKey = keyof typeof rowData;
        const columnNameProperty = columnName as ObjectKey;
        
        const lookup = rowData?.[columnNameProperty] as any
        if(lookup == null){
            return null
        }
        const entityname = lookup.etn
        const recordid = lookup.id.guid
    
        return (
            <RecordImageCellApp 
                entityname={entityname} 
                recordid={recordid} 
                name={props.formattedValue!} 
                startEditing={props.startEditing}
                pcfContextService={pcfContextService}
            />
            
        )
    }        
  }  
}