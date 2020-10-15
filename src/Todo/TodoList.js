import React,{useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,Chip,ListItemSecondaryAction,IconButton,Button,TextField,Checkbox,FormControlLabel,Typography} from '@material-ui/core';
import './../list.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    errorName:{
        color:'red',
        fontSize:12,
        fontWeight:'bold',
    }
}));

TodoList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        item:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        isComplete:PropTypes.bool,
        isChecked:PropTypes.bool,
        isEditable:PropTypes.bool,
    })),
    bucket:PropTypes.array,
    filter: PropTypes.string,
}
function lengthCheck(val){
    if(val.trim().length > 10) return true;
    return false;  
}

function TodoList(props) {
    var markDone;
    const classes = useStyles();
    const [input,changeInput]=useState('');
    const [error,setError] = useState('');
    
    function changeEditMode(i,item){
        changeInput(item);
        props.changeEditMode(i);
    }

    function removeItem(i){
        props.removeItem(i);
    }

    function handleChange(e,i){
        e.preventDefault();
        var target= e.target;
        target.name === 'isComplete'? props.changeDoneStatus(target.checked,i) : changeInput(target.value);
    }

    function updateIteminState(i){
        if(input.trim().length && !lengthCheck(input)){
        props.updateIteminState(input,i);
        }
        else{
            if(lengthCheck(input)) setError('*Length Exceeded');
            else setError('*Field cannot be blank');
        }
    }

    var newList = props.list;
    var status = props.filter;
    switch (status){
        case 'false':
         newList = newList.filter(list => !list.isComplete)
         break;
         case 'true':
         newList = newList.filter(list => list.isComplete)
         break;
         default:  
         break;       
    };

  return (
        <List dense className={classes.root}>
        {!newList.length ? <div>
            <Typography style={{color:'grey'}}> ---- No items in list ---- </Typography></div>:
        <div>
          {
              newList.map((item,index) => {
              // eslint-disable-next-line
                    {markDone = item.isComplete ? 'line-through':'none'}
                    
                    return(
                        <ListItem button className='todo-list-item' key={index}> 
                            <div>
                                {
                                item.isEditable ?
                                <div>
                                    <TextField style={{float:'left'}} 
                                        value={input} 
                                        onChange={(e)=>handleChange(e,index)}
                                        color='secondary'/>
                                    <Typography classes={{root:classes.errorName}}>{error}</Typography>
                                    <ListItemSecondaryAction>
                                    <Button variant='outlined' 
                                            onClick={()=>changeEditMode(index)}>
                                                X
                                    </Button>
                                    <Button color="secondary" 
                                            variant="outlined"  
                                            style={{marginLeft:'5px'}} 
                                            onClick={()=>updateIteminState(index)}>
                                                OK
                                    </Button>
                                    </ListItemSecondaryAction>    
                                </div>:
                                <div> 
                                    <FormControlLabel control={<Checkbox value={item.item}
                                                                        id='todo-list' 
                                                                        name="isComplete" 
                                                                        onChange={(e)=> handleChange(e,index)} 
                                                                        checked={item.isChecked}
                                                                        iconStyle={{fill: 'grey'}}/>
                                                                }
                                                    label={item.item} style={{textDecoration:markDone}}/> 
                                    <ListItemSecondaryAction>
                                    <IconButton aria-label="delete" 
                                                onClick={()=>removeItem(index)}>
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                    <Chip label={'Rename'} style={{marginLeft:'5px'}} onClick={()=>changeEditMode(index,item.item)}/>
                                    </ListItemSecondaryAction>
                                </div>
                                }
                            </div>
                            </ListItem>     
                      );
                    }
          )}  
          </div>}
        </List>
  );
} 

export default TodoList;