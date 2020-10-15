import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import TodoForm from './Todo/TodoForm';
import TodoList from './Todo/TodoList';
import Bucket from './Todo/Bucket';
import BucketList from './Todo/BucketList';
import './list.css';


function App() {

  const [state,setState]=useState(
    {bucket:[
      {name:'Checklist 1',
      items:[],
      rename:false,
      }
    ],
    filter:['all'],
    selectedBucket:0,
  });

  function addItemToState(workItem){
    let item = {item:workItem,isComplete:false,isChecked:false,isEditable:false};
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[newState.selectedBucket].items.push(item);
    setState(newState);
  }

  function addItemToBucket(bucketList){
    let bucket = {name:bucketList,items:[],rename:false};
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket.push(bucket);
    setState(newState);
  }

  function removeItemFromList(index){
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[newState.selectedBucket].items.splice(index, 1); 
    setState(newState);
  }

  function changeEditModeinList(index){
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[newState.selectedBucket].items[index].isEditable = !newState.bucket[newState.selectedBucket].items[index].isEditable;
    setState(newState);
  }

  function changeEditModeinBucket(index){
    console.log(index);
    let newEdit = JSON.parse(JSON.stringify(state));
    newEdit.bucket[index].rename = !newEdit.bucket[index].rename;
    setState(newEdit);
    console.log('rename set in state')
  }
  
  function changeIsDone(check, index){ 
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[newState.selectedBucket].items[index].isComplete = check;
    newState.bucket[newState.selectedBucket].items[index].isChecked=!newState.bucket[newState.selectedBucket].items[index].isChecked;
    setState(newState);
  }

  function updateIteminState(item,index){
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[newState.selectedBucket].items[index].item = item;
    newState.bucket[newState.selectedBucket].items[index].isEditable=false;
    setState(newState);
  }

  function updateBucketinState(item,index){
    let newState = JSON.parse(JSON.stringify(state));
    newState.bucket[index].name = item;
    newState.bucket[index].rename=false;
    setState(newState);
  }

  function updateListonResults(value){
    let newState = JSON.parse(JSON.stringify(state));
    newState.filter[0] = value;
    setState(newState);
  }

  function setBucket(id){
    let newState = JSON.parse(JSON.stringify(state));
    newState.selectedBucket=id;
    setState(newState);
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='col-lg-4 '>
          <div className='sidebar'></div>
          <div>
            <Bucket addtoBucket={addItemToBucket}/>
            <BucketList bucketId ={state.selectedBucket} 
                        chooseBucket={setBucket} 
                        bucket={state.bucket} 
                        renameBucket={changeEditModeinBucket}
                        updateBucketinState={updateBucketinState}/>
          </div>   
        </div>
        <div className='col-lg-8'>
          <Header/>
          <TodoForm filter={state.filter[0]}
                    onAdd={addItemToState}
                    passResults={updateListonResults}/>
          <TodoList list={state.bucket[state.selectedBucket].items}
                    bucket={state.bucket}
                    bucketId ={state.selectedBucket}
                    filter={state.filter[0]} 
                    removeItem={removeItemFromList} 
                    changeDoneStatus ={changeIsDone}
                    changeEditMode={changeEditModeinList} 
                    updateIteminState={updateIteminState} />
        </div>
      </div>
    </div>
  );
}

export default App;
