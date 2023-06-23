import { makeStyles } from '@fluentui/react-components';
import { NONAME } from 'dns';

export const useStyles = makeStyles({
  image: {  
    position : 'relative',
    height: '24px',
    minWidth : '24px',
    display : 'flex',
    alignItems: 'center'
    
  },
  link: {  
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgb(0, 120, 212)',
    textDecorationLine: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '22px',
    boxSizing: 'border-box',
    display: 'block',
    maxWidth: '100%',
    verticalAlign: 'middle',
    width: 'fit-content',
  
  },

  stack: {  
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 'auto',
    height: '100%',
    boxSizing: 'border-box',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '10px',
    paddingRight: '10px',
    

    '> :not(:last-child)': {
       marginRight: '5px',
    }
  },

  stackitem: {  
    flexBasis: 'auto',
    width: 'auto',
    height: 'auto',
    flexShrink: 1
    // marginLeft: '5px',
    // marginTop: '5px',
    // '> :not(:last-child)': {
    //   marginRight: '5px',
    // }
  },


});

