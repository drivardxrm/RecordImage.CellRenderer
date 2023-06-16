import * as React from 'react';
import { Link } from "@fluentui/react-components"
import { usePcfContext } from "../services/PcfContext"
import { useStyles } from '../styles/Styles';
import { iRecordImageProps } from './RecordImageApp';

const RecordLink = ({entityname,recordid,name}:iRecordImageProps): JSX.Element => {

    const pcfcontext = usePcfContext()
    const styles = useStyles();
    return(
      <Link 
        key={'recordlink-' + recordid}
        className={styles.link}
        onClick={() => {pcfcontext.openRecord(entityname,recordid)}}
      >
        {name}
      </Link>
    )
}

export default RecordLink
