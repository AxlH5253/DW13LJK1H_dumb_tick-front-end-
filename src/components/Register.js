import React,{Component} from 'react';
import {hideModal} from '../_actions/home';
import {connect} from 'react-redux';
import axios from 'axios';
import './component.css'

class Register extends Component{
 constructor(props){
   super(props);
   this.state={
    showEye1: 'inline',
    showEye2: 'none',
    hidepass: 'password',
    noticeMesage: ''
   }
 }
  
 render(){

  return (
    <div>
      <div className='register'>
          <h1>Create new account</h1>
          <div className='register-page-parrent'>
              <div className='register-page-child-st'>
                  <div className='register-page-box'>
                    <input className='register-page-box-input' placeholder='Username' />
                  </div>
                  <div className='register-page-box'>
                    <div style={{width:'60%',marginBottom:'15px', display:'flex',alignItems:'center'}}>
                        <div>Show Password</div>
                        <input type='checkbox'/>
                    </div>
                    <div>
                        <input className='register-page-box-input' placeholder='Password' />
                    </div>
                    <div>
                        <input className='register-page-box-input' placeholder='Confirm password'/>
                    </div>
                  </div>
                  <div className='register-page-box'>
                    <div>
                        <input className='register-page-box-input' placeholder='Email'/>
                    </div>
                    <div>
                        <input className='register-page-box-input' placeholder='Phone number'/>
                    </div>
                  </div>
              </div>
              <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div className='register-page-botom-body-img-body'>
                          <img className='register-page-botom-body-img' src='http://www.orientjphysicalsciences.org/images/user.jpg'/>
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input className='register-page-box-input' placeholder='Paste image link in here'/>
                  </div>
                  <div className='register-page-botom-body-btn'>
                      <button className='register-page-botom-btn'>Create Account</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    hideModal: () => dispatch(hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);