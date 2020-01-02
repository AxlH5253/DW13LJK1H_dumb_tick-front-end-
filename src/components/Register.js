import React,{Component} from 'react';
import {hideModal} from '../_actions/home';
import {connect} from 'react-redux';
import axios from 'axios';
import './component.css'

class Register extends Component{
 constructor(props){
   super(props);
   this.state={
    hidepass: 'password',
    imgUrl: 'http://www.orientjphysicalsciences.org/images/user.jpg',
    borderUsername: '1px solid black',
    borderPassword: '1px solid black',
    borderEmail: '1px solid black',
    borderPhone: '1px solid black',
    errorMessage: ''
   }
 }

 componentDidMount() {
  if(localStorage.getItem('token')){
   window.location = '/';
  }
}

handleShowPassword = ()=>{
  if(this.state.hidepass === 'password'){
    this.setState({hidepass:'text'})
  }else{
    this.setState({hidepass:'password'})
  }
}

handleOnChangeImageUrl = (event) =>{
  this.setState({imgUrl:event.target.value})
  if(event.target.value === ''){
    this.setState({imgUrl:'http://www.orientjphysicalsciences.org/images/user.jpg'})
  }
}

handleOnClickBtnRegister = () =>{
  if((document.getElementById('username').value === '')||
     (document.getElementById('pass').value === '')||
     (document.getElementById('email').value === '')||
     (document.getElementById('phone').value === '')){
      
      this.setState({errorMessage:'All data must be filled in'})
      
      if(document.getElementById('username').value === ''){
        this.setState({borderUsername:'1px solid red'})
      }
      if(document.getElementById('pass').value === ''){
        this.setState({borderPassword:'1px solid red'})
      }
      if(document.getElementById('email').value === ''){
        this.setState({borderEmail:'1px solid red'})
      }
      if(document.getElementById('phone').value === ''){
        this.setState({borderPhone:'1px solid red'})
      }
    }else if(document.getElementById('pass')!== document.getElementById('cpass') ){
      this.setState({errorMessage:'The password confirmation must be the same as the password'})
      this.setState({borderPassword:'1px solid red'})
    }
}

handleOnChangeInput = () =>{
  this.setState({errorMessage:''})
  this.setState({borderUsername:'1px solid black'})
  this.setState({borderPassword:'1px solid black'})
  this.setState({borderEmail:'1px solid black'})
  this.setState({borderPhone:'1px solid black'})
}
  
 render(){

  return (
    <div>
      <div className='register'>
          <h1>Create new account</h1>
          <h3 style={{color:'red',position:'absolute',top:'13ex',left:'13ex'}}>{this.state.errorMessage}</h3>
          <div className='register-page-parrent'>
              <div className='register-page-child-st'>
                  <div className='register-page-box'>
                    <input id='username' style={{border:this.state.borderUsername}}
                     className='register-page-box-input'
                     onChange={this.handleOnChangeInput}
                     placeholder='Username' />
                  </div>
                  <div className='register-page-box'>
                    <div style={{width:'60%',marginBottom:'15px', display:'flex',alignItems:'center'}}>
                        <div>Show Password</div>
                        <input type='checkbox' onChange={this.handleShowPassword} />
                    </div>
                    <div>
                        <input id='pass' style={{border:this.state.borderPassword}}
                        onChange={this.handleOnChangeInput} 
                        className='register-page-box-input' 
                        type={this.state.hidepass} placeholder='Password' />
                    </div>
                    <div>
                        <input id='cpass' className='register-page-box-input' 
                        type={this.state.hidepass} 
                        onChange={this.handleOnChangeInput}
                        style={{border:this.state.borderPassword}}
                        placeholder='Confirm password'/>
                    </div>
                  </div>
                  <div className='register-page-box'>
                    <div>
                        <input id='email' className='register-page-box-input' 
                        style={{border:this.state.borderEmail}}
                        onChange={this.handleOnChangeInput}
                        type='email' 
                        placeholder='Email'/>
                    </div>
                    <div>
                        <input id='phone' className='register-page-box-input' 
                        style={{border:this.state.borderPhone}}
                        onChange={this.handleOnChangeInput}
                        type='number' 
                        placeholder='Phone number'/>
                    </div>
                  </div>
              </div>
              <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div className='register-page-botom-body-img-body'>
                          <img className='register-page-botom-body-img' src={this.state.imgUrl}/>
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input className='register-page-box-input' 
                    style={{border:'1px solid black'}}
                    onChange={this.handleOnChangeImageUrl} 
                    placeholder='Paste image link in here'/>
                  </div>
                  <div className='register-page-botom-body-btn'>
                      <button className='register-page-botom-btn' onClick={this.handleOnClickBtnRegister}>Create Account</button>
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