import { makeStyles } from '@fluentui/react-components';
import { NONAME } from 'dns';

export const useStyles = makeStyles({
  image: {  
    // display: 'flex',
    // flexWrap: 'wrap',
    // width: 'fit-content',
    // height: 'fit-content',
    // boxSizing: 'border-box',
    // verticalAlign: 'middle',
  },
  link: {  
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgb(0, 120, 212)',
    textDecorationLine: 'none',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    display: 'block',
    maxWidth: '100%',
    verticalAlign: 'middle',
    width: 'fit-content',
  
  
    
    // ':hover': {
    //   textDecorationLine: 'none'
    // },
    // ':active': {
    //   textDecorationLine: 'none'
    // }
  },
  stackHorizontal: {  // overrides for horizontal stack
    display: 'flex',
    flexWrap: 'nowrap',
    width: 'fit-content',
    height: 'fit-content',
    boxSizing: 'border-box',
    flexDirection: 'row',
    marginLeft: '5px',
    '> :not(:last-child)': {
      marginRight: '12px',
    }
  },


});

