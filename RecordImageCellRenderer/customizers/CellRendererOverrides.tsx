import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from '../types';
import { IPcfContextServiceProps, PcfContextService } from '../services/PcfContextService';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PcfContextProvider } from '../services/PcfContext';
import RecordImageApp from '../component/RecordImageApp';



const queryClient = new QueryClient({
    queryCache: new QueryCache(), // creates a new querycahe for each instance of the control on a page
    defaultOptions: {
    queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false
        // IMPORTANT otherwise data will be refreshed everytime the focus on the PCF is lost and regained
        // https://react-query.tanstack.com/guides/window-focus-refetching#_top
    }
    }
})

//defining a closure, to be able to use webAPI and the cache
export const generateCellRendererOverrides = 
(pcfContextServiceProps: IPcfContextServiceProps) => {  
  return  {       
    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
        const {columnIndex, colDefs, rowData } = rendererParams;         
        const columnName = colDefs[columnIndex].name;
        
        // Renders only for the PrimaryName of the entity
        if(columnName !== pcfContextServiceProps.primarynamefield){
            return null;
        } 

        const pcfContextService = new PcfContextService(pcfContextServiceProps);
        const recordid = rowData?.[RECID]

        return (
            
            <QueryClientProvider client={queryClient}>
                <PcfContextProvider pcfcontext={pcfContextService}>
                    <RecordImageApp recordid={recordid!} name={props.formattedValue!} columnname={columnName} />
                </PcfContextProvider>  
            </QueryClientProvider>
        )
    }        
  }  
}