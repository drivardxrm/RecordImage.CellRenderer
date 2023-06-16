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

      <div className={styles.stackHorizontal}>
        {!!primaryimage &&   // Dont render the image part if not defined on the entity
          <RecordImage entityname={entityname} recordid={recordid!} name={name} />
        }  
        <RecordLink entityname={entityname} recordid={recordid!} name={name} />
      </div>

    )
}

export default RecordImageApp
