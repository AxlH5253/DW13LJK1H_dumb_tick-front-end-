import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getCategories} from '../../_actions/home';
import './AddEvent.css';

class Register extends Component{
 constructor(props){
   super(props);
   this.state={
   }
 }

 componentDidMount() {
  if(!localStorage.getItem('token')){
   window.location = '/';
  }
  this.props.getCategories();
}
  
 render(){
  const {data} = this.props.home;

  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h1>Add new event</h1>
          <h3 style={{color:'red',position:'absolute',top:'13ex',left:'13ex'}}>{this.state.errorMessage}</h3>

          <div className='register-page-parrent'>
              <div className='register-page-child-st'>
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    style={{border:'1px solid black',width:'100%',height: '50px',fontSize:'30px',paddingLeft:'20px',borderRadius:'5px'}}
                    onChange={this.handleOnChangeInput} 
                    placeholder='Title'/>
                  </div>

                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <select
                    style={{paddingLeft:'20px',border:'1px solid black',width:'104%',height: '50px',outline:'none',fontSize:'30px',borderRadius:'5px'}}
                    onChange={this.handleOnChangeInput}>
                      <option value='0'>Select category</option>
                      {data.map((item,index)=>
                        <option value={item.id}>{item.name}</option>
                      )}
                    </select>
                  </div>

                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    style={{border:'1px solid black',width:'100%',height: '50px',fontSize:'30px',borderRadius:'5px',paddingLeft:'20px'}}
                    onChange={this.handleOnChangeInput} 
                    placeholder='Price'/>
                  </div>
                  
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    style={{border:'1px solid black',width:'100%',height: '100px',fontSize:'30px' ,borderRadius:'5px',paddingLeft:'20px'}}
                    onChange={this.handleOnChangeInput} 
                    placeholder='Address'/>
                  </div>

                </div>

                <div className='register-page-child-st'>
                  
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <textarea
                    style={{border:'1px solid black',width:'100%',height: '350px',fontSize:'14px',
                    borderRadius:'5px',paddingLeft:'20px',outline:'none'}}
                    onChange={this.handleOnChangeInput} 
                    placeholder=' Event Description'/>
                  </div>

                </div>
                
          </div>

          <div className='register-page-parrent'>
          <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div style={{width:'80%',height:'100%',border:'1px solid black'}}>
                          
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input 
                    className='register-page-box-input' 
                    style={{border:'1px solid black'}} 
                    placeholder="Paste event's image in here"/>
                  </div>
              </div>
                <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div style={{width:'80%',height:'100%',border:'1px solid black'}}>
                          
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input 
                    className='register-page-box-input' 
                    style={{border:'1px solid black'}} 
                    placeholder="Paste event's maps url in here"/>
                  </div>
              </div>
          </div>
            <div className='register-page-botom-body-btn'>
              <button className='register-page-botom-btn' onClick={this.handleOnClickBtnRegister}>Add event</button>
            </div>    
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => {
    return {
        home: state.home
    };
};

const mapDispatchToProps = dispatch => {
    return { 
      getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);