import React,{Component} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {hideModal} from '../_actions/home';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {connect} from 'react-redux';
import axios from 'axios';
import './component.css'

class Login extends Component{
 constructor(props){
   super(props);
   this.state={
    showEye1: 'inline',
    showEye2: 'none',
    hidepass: 'password',
    noticeMesage: ''
   }
 }

 handleLoginBtn = event =>{
  event.preventDefault();
  if ((document.getElementById('username').value === "")|| 
     (document.getElementById('password').value === "")){
      this.setState({
        noticeMesage:'Username and password cannot be empty'
      })
       
  }else{
    const user = {
      username: document.getElementById('username').value ,
      password: document.getElementById('password').value 
    }
    axios.post('http://localhost:5000/api/v1/login',user)
    .then(res=>{
      if(res.data[0]['token']){
        localStorage.setItem('token', res.data[0]['token']);
        window.location = '/';
      }else if(res.data[0]['message']){
        this.setState({
          noticeMesage:'Invalid username or password'
        })
      }else{
        this.setState({
          noticeMesage:'Cannot connect to server'
        })
      }
    })
  } 
 }

 handleCloseBtn = () =>{
  this.setState({
    noticeMesage:''
  })
  this.props.hideModal()
 }
  
 render(){

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={this.props.modal}
        onClose={this.handleCloseBtn }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.props.modal}>
          <div className='modal'>
            <div className='modal-close'>
              <div className='modal-login-notice'>
                <h2>{this.state.noticeMesage}</h2>
              </div>
              <button className='modal-close-btn' onClick={this.handleCloseBtn }>X</button>
            </div>
            <div className='modal-title'>
              <h1>LOGIN</h1>
             <div>
                <div style={{width:'100%'}}>
                  <input id='username' className='modal-input' placeholder='Username'/>
                </div>
                <div>
                  <input id='password' className='modal-input' placeholder='Password' type={this.state.hidepass}/>
                  <VisibilityOffIcon 
                    fontSize="small"
                    onClick={()=> this.setState({showEye1:"none", showEye2: "inline",hidepass: 'text'} )}
                    style={{display:this.state.showEye1}}
                  />
                  <VisibilityIcon 
                    fontSize="small"
                    onClick={()=> this.setState({showEye1:"inline", showEye2: "none",hidepass: 'password'} )}
                    style={{display:this.state.showEye2}}
                  />
                </div>
                <div className='modal-login'>
                  <button onClick={this.handleLoginBtn} className='modal-login-btn'>Login</button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);