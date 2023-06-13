import * as React from 'react';
import { Image } from "@fluentui/react-components"
import { useRecordImage } from "../hooks/useRecordImage"
import { useStyles } from '../styles/Styles';
import { iRecordImageProps } from './RecordImageApp';




const RecordImage = ({recordid,name}:iRecordImageProps) => {

    const styles = useStyles();
    const {imagesrc, isError,isLoading} = useRecordImage(recordid)
    if (isLoading || isError) {
      return null
    } 
    else {
      return(
        <Image
          alt={name + ' image'}
          className={styles.image}
          key={'recordimage-' + recordid}
          shape={"rounded"}
          src={imagesrc}
          height={24}
          width={24}
        />
      )
    }
}

export default RecordImage
