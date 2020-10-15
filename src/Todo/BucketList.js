import React,{useState} from 'react';
import './../list.css';
import {Divider,Chip,ListItemSecondaryAction,Button,List,ListItem, Typography,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor:'grey',
    },
    space:{
        margin: theme.spacing(0.5),
    },
    multilineColor: {
          color:'white',
        },
    errorName:{
            color: 'red',
            fontWeight: 'bold',
            fontSize:12,
        },
    }));


function BucketList(props) {
    const classes=useStyles();
    var bucketId = props.bucketId;
    var bucketitems =props.bucket;
    const [name,setName]=useState('');
    const [error,setError]=useState('');
    

    function chooseBucket(e){
        props.chooseBucket(e.currentTarget.dataset.id);
    }

    function renameBucket(i,name){
        setName(name);
        props.renameBucket(i);
    }

    function handleChange(e,i){
        e.preventDefault();
        setName(e.target.value);
    }

    function updateBucketinState(i){
        if(name.trim().length && !lengthCheck(name)){
            setError('');
            props.updateBucketinState(name,i);
            }
        else{
               if(lengthCheck(name)) {setError('*Length Exceeded');}
                else {setError('*Field cannot be blank');}
            }
    }

    function lengthCheck(value){
        if(value.trim().length > 15) return true;
        return false;  
    }

    return(
        <div className='row'>
            <div className='container sidebar-form-list'>
                <div className='sidebar-form-list'>                  
                    <List >{
                        bucketitems.map((item,i)=>{ 
                            return( 
                                <> 
                            <ListItem key={i}>
                                { 
                                item.rename ? 
                                <div>
                                    <TextField style={{float:'left'}} 
                                                color='secondary'
                                                value={name} 
                                                onChange={(e)=>handleChange(e,i)}
                                                InputProps={{
                                                    className: classes.multilineColor
                                    }}/>
                                    <Typography classes={{root:classes.errorName}}>{error}</Typography>   
                                    <ListItemSecondaryAction>
                                        <Button color="secondary"  variant='outlined' 
                                                onClick={()=>renameBucket(i)}>
                                                X
                                        </Button>
                                        <Button color="secondary" 
                                            variant="outlined"  
                                            style={{marginLeft:'5px'}} 
                                            onClick={()=>updateBucketinState(i)}>
                                                OK
                                         </Button>
                                    </ListItemSecondaryAction> 
                                </div>   
                            :
                                <div>
                                    <Typography key={i} data-id={i} value={item.item} onClick={chooseBucket}
                                        className={(i === bucketId )? 'list-group-item active' : 'list-group-item'}>{item.name}</Typography> 
                                    <ListItemSecondaryAction>      
                                        <Chip onClick={()=>renameBucket(i,item.name)} label='Edit'></Chip>
                                        <Chip color='secondary' edge='end' className='chip' label={item.items.length} ></Chip>
                                    </ListItemSecondaryAction> 
                                </div>
                                }
                             </ListItem>
                            <Divider variant='middle' className={classes.root} />
                            </>
                            )})}
                    </List>
                </div>
            </div>
        </div>
    )
}

BucketList.propTypes ={
    chooseBucket:PropTypes.func,
    bucket: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        items:PropTypes.arrayOf(
                PropTypes.shape({
                item:PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                  ]),
                isComplete:PropTypes.bool,
                isChecked:PropTypes.bool,
                isEditable:PropTypes.bool,
            }),    
        )
    }))

} 

export default BucketList; 

