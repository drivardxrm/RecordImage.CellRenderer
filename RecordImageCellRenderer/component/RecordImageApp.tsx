import * as React from 'react';
import { useRecordImage } from "../hooks/useRecordImage"
import { useStyles } from '../styles/Styles';
import RecordImage from './RecordImage';
import RecordLink from './RecordLink';



export interface iRecordImageProps{
  recordid: string
  name: string
  columnname? : string
}

const RecordImageApp = ({recordid,name}:iRecordImageProps):JSX.Element => {

    const styles = useStyles();
    return(

      <div className={styles.stackHorizontal}>
        <RecordImage recordid={recordid!} name={name} />
        <RecordLink recordid={recordid!} name={name} />
      </div>

    )
}

export default RecordImageApp
