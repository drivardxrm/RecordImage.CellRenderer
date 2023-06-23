import * as React from 'react';
import { useRecordImage } from "../hooks/useRecordImage"
import { useStyles } from '../styles/Styles';
import RecordImage from './RecordImage';
import RecordLink from './RecordLink';
import { useMetadata } from '../hooks/useMetadata';



export interface iRecordImageProps{
  entityname:string
  recordid: string
  name: string
  columnname? : string
}

const RecordImageApp = ({entityname,recordid,name}:iRecordImageProps):JSX.Element => {

    const styles = useStyles();
    const {primaryimage, isError,isLoading} = useMetadata(entityname)
    if (isLoading || isError) {
      return <></>
    }
    return(

      <div className={styles.stack}>
        {!!primaryimage &&   // Dont render the image part if not defined on the entity
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
