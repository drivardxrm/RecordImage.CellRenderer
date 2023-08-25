import * as React from 'react';
import { useStyles } from '../styles/Styles';
import RecordImage from './RecordImage';
import RecordLink from './RecordLink';
import { useMetadata } from '../hooks/useMetadata';
import { CellRendererProps } from '../types';



export interface iRecordImageProps{
  entityname:string
  recordid: string
  name: string
  columnname? : string
  cellrendererprops? : CellRendererProps
}

const RecordImageApp = ({entityname,recordid,name,cellrendererprops}:iRecordImageProps):JSX.Element => {

    const styles = useStyles();
    const {primaryimage, isError,isLoading} = useMetadata(entityname)
    if (isLoading || isError) {
      return <></>
    }

    const onCellClicked = (event?: React.MouseEvent<HTMLElement, MouseEvent> | MouseEvent) => {
      if(cellrendererprops?.startEditing) cellrendererprops.startEditing();               
    }

    return(

      <div className={styles.stack} onClick={onCellClicked}>
        {!!primaryimage &&   // image is only rendered if there is a primaryimage field defined on the table
          <div className={styles.stackitem}>
            <RecordImage entityname={entityname} recordid={recordid!} name={name} />
          </div>
        }
        <div className={styles.stackitem}>
          <RecordLink entityname={entityname} recordid={recordid!} name={name} />
        </div>  
        
      </div>

    )
}

export default RecordImageApp
