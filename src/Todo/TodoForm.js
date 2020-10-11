import React, { useState,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tab,Tabs ,Button,TextField } from '@material-ui/core';
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
  }));

TodoForm.propTypes={
    filter:PropTypes.string,
    onAdd:PropTypes.func,
    passResults:PropTypes.func,
}  

function TodoForm(props) {
    const classes = useStyles();
    const [todo,settodo]=useState('');
    const textInput = useRef();

   
    function handleChange(e){       
        settodo(e.target.value);
    }

    function changeHandler(e,newValue){
        props.passResults(newValue)
    }

    function addToList(e){
        e.preventDefault();
        if(textInput.current.value.trim()!==''){
            props.onAdd(todo);
            settodo('');
            textInput.current.focus();
        }
        else{
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
                                onChange={(e)=>handleChange(e)}/>
                    <Button variant='outlined' 
                            style={{marginLeft:'5px'}}
                            className={classes.input} 
                            type='submit'
                            color='secondary'>Add</Button>        
                </form>
            </div>
            <div className='col-md-2'></div>
            <div className='col-md-4'>
                <Paper className={classes.root}>
                    <Tabs indicatorColor="secondary"
                          textColor="secondary"
                          value={props.filter}
                          onChange={changeHandler}>
                        <Tab style={{ minWidth: 70,outline:'none'}} value='all' label="All" />
                        <Tab style={{ minWidth: 70,outline:'none'}} value='false' label="Pending" />
                        <Tab style={{ minWidth: 70,outline:'none'}} value='true' label="Done" />
                    </Tabs>
                </Paper>
            </div>
        </div>
    </div>
  );
}


export default TodoForm;