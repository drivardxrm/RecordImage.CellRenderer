import * as React from 'react'
import { Image } from "@fluentui/react-components"
import { useRecordImage } from "../hooks/useRecordImage"
import { useStyles } from '../styles/Styles'
import { iRecordImageCellProps } from './RecordImageCellApp'

const RecordImage = ({entityname,recordid,name}:iRecordImageCellProps):JSX.Element => {

    const styles = useStyles();
    const {imagesrc, isError,isLoading} = useRecordImage(entityname,recordid)
    if (isLoading || isError) {
      return <></>
    } 
    else {
      return(
        <Image
          alt={name + ' image'}
          className={styles.image}
          key={'recordimage-' + recordid}
          shape={"rounded"}
          src={imagesrc}
          height={32}
          width={32}
        />
      )
    }
}

export default RecordImage
