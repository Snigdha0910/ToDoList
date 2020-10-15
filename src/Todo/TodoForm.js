import React, { useState,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tab,Tabs ,Button,TextField,Typography } from '@material-ui/core';
import './../list.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
       flexGrow: 1
    },
    input:{
        height: 40
    },
    tabRoot: {
        maxWidth: 50,
      },
    errorName:{
        color: 'red',
        fontWeight: 'bold',
        fontSize:12,
    },
  }));

TodoForm.propTypes={
    filter:PropTypes.string,
    onAdd:PropTypes.func,
    passResults:PropTypes.func,
}  

function lengthCheck(value){
    if(value.trim().length > 10) return true;
    return false;  
}


function TodoForm(props) {
    const classes = useStyles();
    const [todo,settodo]=useState('');
    const textInput = useRef();
    const [error,setError]=useState('');

    function handleChange(e){       
        settodo(e.target.value);
    }

    function changeHandler(e,newValue){
        props.passResults(newValue)
    }

    function addToList(e){
        e.preventDefault();
        if(textInput.current.value.trim()!== ''){
            if(lengthCheck(textInput.current.value)){
                setError('*Maximum characters allowed are 10');
            }
            else{
                setError('');
                props.onAdd(todo);    
            }
            settodo('');
            textInput.current.focus();
        }
        else{
            settodo('');
            textInput.current.focus();
        } 
    }
    
  return (
    <div>
         <div className='row'>
            <div className='col-md-6'>
                <form onSubmit={addToList}> 
                
                    <TextField InputProps={{className: classes.input}} 
                                InputLabelProps={{shrink: true}}
                                variant='outlined' 
                                color='secondary'
                                label='Add task in bucket'
                                inputRef={textInput} 
                                value={todo} 
                                placeholder='Max 10 characters !'
                                onChange={(e)=>handleChange(e)}/>
                    <Button variant='outlined' 
                            style={{marginLeft:'5px'}}
                            className={classes.input} 
                            type='submit'
                            color='secondary'>Add</Button> 
                    <Typography classes={{root:classes.errorName}}>{error}</Typography>       
                </form> 
            </div>
            <div className='col-md-2'></div>

            <div className='col-md-4'>
                <Paper className={classes.root}>
                    <Tabs indicatorColor="secondary"
                          textColor="secondary"
                          value={props.filter}
                          onChange={changeHandler}>
                        <Tab style={{ minWidth: 70,outline:'none',textTransform:'lowercase'}} value='all' label="All" />
                        <Tab style={{ minWidth: 70,outline:'none',textTransform:'lowercase'}} value='false' label="Pending" />
                        <Tab style={{ minWidth: 70,outline:'none',textTransform:'lowercase'}} value='true' label="Done" />
                    </Tabs>
                </Paper>
            </div>
        </div>
  
    </div>
  );
}


export default TodoForm;