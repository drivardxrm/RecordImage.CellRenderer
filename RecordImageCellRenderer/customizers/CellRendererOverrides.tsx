import * as React from 'react';
import { CellRendererProps, GetRendererParams, RECID } from '../types';
import { IPcfContextServiceProps, PcfContextService } from '../services/PcfContextService';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PcfContextProvider } from '../services/PcfContext';
import RecordLink from '../component/RecordLink';
import { Link } from '@fluentui/react-components';
import RecordImage from '../component/RecordImage';
import { useStyles } from '../styles/Styles';


// export const cellRendererOverrides: CellRendererOverrides = {
//     ["Text"]: (props, col) => {
//         // Render all text cells in green font
//         return <Label style={{ color: 'green' }}>{props.formattedValue}</Label>
//     }
// }




//defining a closure, to be able to use webAPI and the cache
export const generateCellRendererOverrides = 
(pcfContextServiceProps: IPcfContextServiceProps) => {  
  return  {       
    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {             
        const {columnIndex, colDefs, rowData } = rendererParams;         
        const columnName = colDefs[columnIndex].name; 
        console.log(pcfContextServiceProps.instanceid + '-' + columnName)    
        if(columnName !== "driv_name"){  // Apply Only for primaryname column
            //apply the functionality only for the dummy column
            //by returning null, the default renderer will be applied
            return null;
        }

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

        const pcfContextService = new PcfContextService(pcfContextServiceProps);


        const recordid = rowData?.[RECID]
        console.log('recordid-' + recordid)
        const styles = useStyles();
        return (
            
            <QueryClientProvider client={queryClient}>
                <PcfContextProvider pcfcontext={pcfContextService}>
                    <div className={styles.stackHorizontal}>
                        <RecordImage id={recordid!} name={props.formattedValue!}></RecordImage>
                        <RecordLink id={recordid!} name={props.formattedValue!}></RecordLink>
                    </div>
                </PcfContextProvider>  
            </QueryClientProvider>
        )
    }        
  }  
}