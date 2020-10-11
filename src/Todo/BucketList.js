import React from 'react';
import './../list.css';
import {Divider,Chip,ListItemSecondaryAction,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor:'grey',
    },
    }));

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

function BucketList(props) {
    const classes=useStyles();
    var bucketId = parseInt(props.bucketId);
    var bucketitems =props.bucket;

    function chooseBucket(e){
        props.chooseBucket(e.currentTarget.dataset.id);
    }

    return(
        <div className='row'>
            <div className='container sidebar-form-list'>
                <div className='sidebar-form-list'>                  
                    { 
                        bucketitems.map((item,i)=>{ 
                            return(  
                                  <div>
                                    <a href='#' key={i} data-id={i} value={i} className={(i === bucketId )? 'list-group-item active' : 'list-group-item'} onClick={chooseBucket}>
                                        <span>{item.name} </span>
                                        <ListItemSecondaryAction>
                                            <Chip color='secondary' edge='end' className='chip' label={item.items.length}></Chip>
                                        </ListItemSecondaryAction>
                                    </a>
                                    <Divider variant='middle' className={classes.root} />
                                    </div>
                                )
                            }
                        )}
                </div>
            </div>
        </div>
    )
}

export default BucketList; 

