import * as React from 'react';
import { Image } from "@fluentui/react-components"
import { useRecordImage } from "../hooks/useRecordImage"
import { usePcfContext } from "../services/PcfContext"
import { useStyles } from '../styles/Styles';


export interface iRecordImageProps{
  id: string;
  name: string;
}

const RecordImage = ({id,name}:iRecordImageProps) => {

    const pcfcontext = usePcfContext()
    const styles = useStyles();
    const {imagesrc, isError,isLoading} = useRecordImage(pcfcontext.entityname, id)
    if (isLoading || isError || !imagesrc || imagesrc === '') {
      return <></>
    } 
    else {
      return(
        <Image
          alt={name + ' image'}
          className={styles.image}
          key={'recordimage-' + id}
          shape={"rounded"}
          src={imagesrc}
          height={24}
          width={24}
        />
      )
    }
}

export default RecordImage
