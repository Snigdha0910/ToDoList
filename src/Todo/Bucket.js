import React, { useState,useRef } from 'react';
import {TextField, Button,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ShoppingCart} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    input:{
        margin: theme.spacing(1),
        height: 40,
        backgroundColor:'white',
        borderRadius: 5,
    }, 
    root:{
        margin: theme.spacing(1),
        height: 40,
        fontFamily: "Roboto Condensed",  
    } , 
    textProps:{
        margin: theme.spacing(1),
        color:'grey',
        fontFamily: "Roboto Condensed", 
    } ,
    shoppingIcon:{
        color:'white',
    } ,
 
    }));

function Bucket(props) {
    const classes = useStyles();
    const [bucketList,setbucketlist]=useState('');
    const bucketInput = useRef();
    
    function handleChange(e){
        console.log(e.target.value);
       setbucketlist(e.target.value);
    }

    function addToBucket(e){
        e.preventDefault();
        if(bucketInput.current.value.trim()!==''){
            props.addtoBucket(bucketList);
            setbucketlist('');
            bucketInput.current.focus();
        }
        else{
            bucketInput.current.focus();
        } 
    }

    
  return (
    <div>
         <div className="row">
                <div className='sidebar-form'>
                    <span></span>
                    <div className='container'>
                        <form onSubmit={addToBucket}> 
                            <TextField InputProps={{className: classes.input}} 
                                        InputLabelProps={{shrink: true}}
                                        variant='outlined' 
                                        color='secondary'
                                        inputRef={bucketInput} value={bucketList} 
                                        onChange={handleChange}
                                        style={{marginLeft:'30px'}}
                                        placeholder="Add buckets"/>
                            <Button variant="contained" color="secondary" aria-label="add" className={classes.root} type='submit'>
                                Add
                            </Button>                   
                        </form>
                    </div>
                    <div className='container'>
                        <ShoppingCart style={{display:'inline-block'}}
                                      classes={{root:classes.shoppingIcon}}/>
                        <Typography style={{display:'inline-block'}} 
                                    classes={{root:classes.textProps}}>
                                Add buckets in here !
                        </Typography>
                    </div>
                </div>
             </div>
         </div>
  );
}

export default Bucket;