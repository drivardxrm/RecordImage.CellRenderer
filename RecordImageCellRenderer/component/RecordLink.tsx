import * as React from 'react';
import { Link } from "@fluentui/react-components"
import { usePcfContext } from "../services/PcfContext"
import { useStyles } from '../styles/Styles';


export interface iRecordLinkProps{
  id: string;
  name: string;
}


const RecordLink = ({id,name}:iRecordLinkProps): JSX.Element => {

    const pcfcontext = usePcfContext()
    const styles = useStyles();
    return(
      <Link 
        key={'recordlink-' + id}
        className={styles.link}
        //appearance='subtle' 
        onClick={() => {pcfcontext.openRecord(pcfcontext.entityname,id)}}
      >
        {name}
      </Link>
    )
}

export default RecordLink
