import React,{Component} from 'react';
import {hideModal} from '../_actions/home';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import './component.css'

class EditProfile extends Component{
 constructor(props){
   super(props);
   this.state={
    hidepass: 'password',
    imgUrl: '',
    borderUsername: '1px solid black',
    borderPassword: '1px solid black',
    borderEmail: '1px solid black',
    borderPhone: '1px solid black',
    errorMessage: '',
    userData:[],
    redirect: false
   }
 }

 componentDidMount() {
  if(!localStorage.getItem('token')){
   this.setState({redirect:true})
  }else{
    let token = localStorage.getItem('token')
    axios.defaults.headers['Authorization'] = 'Bearer ' + token
    axios.post('https://dumb-tick-app.herokuapp.com/api/v1/profile')
    .then(res => {
        this.setState({ userData : res.data})
        if(this.state.imgUrl === ''){
          this.setState({imgUrl:this.state.userData[0].img})
        }
    })
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
    this.setState({imgUrl:this.state.userData[0].img})
  }
}

handleOnClickBtnRegister = () =>{
     if(document.getElementById('pass').value!== this.state.userData[0].password){
      this.setState({errorMessage:'Old password wrong'})
      this.setState({borderPassword:'1px solid red'})
    }else{
      let username = ''
      let email = ''
      let phoneNumber = ''
      let password = ''

      if(document.getElementById('cpass').value === ''){
        password = this.state.userData[0].password
      }else{
        password = document.getElementById('cpass').value
      }

      if(document.getElementById('username').value === ''){
        username = this.state.userData[0].username
      }else{
        username = document.getElementById('username').value
      }

      if(document.getElementById('email').value === ''){
        email = this.state.userData[0].email
      }else{
        email = document.getElementById('email').value
      }

      if(document.getElementById('phone').value === ''){
        phoneNumber = this.state.userData[0].phonrNumber
      }else{
        phoneNumber = document.getElementById('phone').value
      }

      const dataUser ={
        name : username,
        username : username,
        password : password,
        email : email,
        phoneNumber: phoneNumber,
        img : this.state.imgUrl
      }
      axios.put('https://dumb-tick-app.herokuapp.com/api/v1/updateuser',dataUser)
      .then(res=>{
        this.setState({redirect:true})
      })
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

  if(this.state.redirect){
    this.setState({redirect:false}) 
    return(
      <>
       <Redirect  to='/profile'/> 
      </>
    )

  }

  return (
    <div>
      <div className='register'>
          <h1>Edit Profile</h1>
          <h3 style={{color:'red',position:'absolute',top:'13ex',left:'13ex'}}>{this.state.errorMessage}</h3>
          {this.state.userData.map((item,index)=>
          <div key={index} className='register-page-parrent'>
              <div className='register-page-child-st'>
                  <div className='register-page-box'>
                    <input id='username' style={{border:this.state.borderUsername}}
                     className='register-page-box-input'
                     onChange={this.handleOnChangeInput}
                     placeholder={item.username} />
                  </div>
                  
                  <div className='register-page-box'>
                    <div>
                        <input id='email' className='register-page-box-input' 
                        style={{border:this.state.borderEmail}}
                        onChange={this.handleOnChangeInput}
                        type='email' 
                        placeholder={item.email}/>
                    </div>
                    <div>
                        <input id='phone' className='register-page-box-input' 
                        style={{border:this.state.borderPhone}}
                        onChange={this.handleOnChangeInput}
                        type='number' 
                        placeholder= {item.phonrNumber} />
                    </div>
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
                        type={this.state.hidepass} placeholder='Old password' />
                    </div>
                    <div>
                        <input id='cpass' className='register-page-box-input' 
                        type={this.state.hidepass} 
                        onChange={this.handleOnChangeInput}
                        style={{border:this.state.borderPassword}}
                        placeholder='New password'/>
                    </div>
                  </div>
              </div>
              <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head' style={{height:'165px',paddingBottom:'30px'}}>
                      <div className='register-page-botom-body-img-body'>
                          <img className='register-page-botom-body-img' src={this.state.imgUrl} alt="Remy Sharp"/>
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input id='img'
                    className='register-page-box-input' 
                    style={{border:'1px solid black',marginBottom:'10px'}}
                    onChange={this.handleOnChangeImageUrl} 
                    placeholder='Paste image link in here'/>
                  </div>
                  <div className='register-page-botom-body-btn' style={{height:'150px',width:'100%'}}>
                      <button style={{fontSize:'20px', width:'30%'}} className='register-page-botom-btn' onClick={this.handleOnClickBtnRegister}>Save</button>
                  </div>
              </div>
          </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);