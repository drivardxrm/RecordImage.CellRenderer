import * as React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PcfContextProvider } from '../services/PcfContext';
import { PcfContextService } from '../services/PcfContextService';
import RecordImageCell from './RecordImageCell';

export interface iRecordImageCellProps{
  entityname:string
  recordid: string
  name: string
  startEditing?: (editorInitValue?: unknown) => void;
  pcfContextService?: PcfContextService
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

const RecordImageCellApp = ({entityname,recordid,name,startEditing,pcfContextService}:iRecordImageCellProps):JSX.Element => {

    return(

      <QueryClientProvider client={queryClient}>
        <PcfContextProvider pcfcontext={pcfContextService!}>
            <RecordImageCell 
              entityname={entityname} 
              recordid={recordid} 
              name={name} 
              startEditing={startEditing}
            /> 
        </PcfContextProvider>  
    </QueryClientProvider>

    )
}

export default RecordImageCellApp
