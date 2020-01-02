import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect } from "react-redux";
import {showModal} from '../../_actions/home';
import Avatar from '@material-ui/core/Avatar';

import Login from '../../components/Login';

import axios from 'axios';
import './Header.css';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Header extends Component{
    constructor() {
        super();
        this.state = {
          queryValue: '',
          showMenu: 'none',
          showAvatar:'none',
          showBtn:'inline',
          name:'',
          img:''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
          this.setState({showAvatar:'block',showBtnLogin:'none'})
          let token = localStorage.getItem('token')
          axios.defaults.headers['Authorization'] = 'Bearer ' + token
          axios.post('http://localhost:5000/api/v1/profile')
          .then(res => {
              this.setState({ name : res.data[0].username.charAt(0).toUpperCase()+ res.data[0].username.slice(1), img:res.data[0].img});
           })
        }else{
            this.setState({showAvatar:'none',showBtnLogin:'inline'})
        }
    }

    handleDropDownMenu = () => {
      if(this.state.showMenu === 'none'){
          this.setState({ showMenu : 'block'});
      }else{
          this.setState({ showMenu : 'none'});
      }
      
    };

    render(){
        
        return(
            <>
            <div className='header-body-top'>
                  <Login/>
                  
                  <div style={{width:'30%',display:'flex',justifyContent:'center',color:'white'}}>
                  <Link style={{color:'white',textDecoration:'none'}} to='/'><h1>Dumb-Tick</h1> </Link>
                  </div>
              
                <div className='header-body-top-login-body'>
                  <button className='header-body-top-login-button' onClick={()=>window.location='/register'} style={{display:this.state.showBtnLogin}}>Register</button>
                  <button className='header-body-top-login-button' onClick={this.props.showModal} style={{display:this.state.showBtnLogin}}>Login</button>
                  <div>

                  <div onClick={this.handleDropDownMenu} style={{color:'white',display:'flex',alignItems:'center',cursor:'pointer'}}>
                    <h3 style={{marginRight:'10px'}}>{this.state.name}</h3>
                    <Avatar 
                      style={{display:this.state.showAvatar}}
                      className="header-dropdown-profil" 
                      alt="Remy Sharp" 
                      src={this.state.img}
                    />
                  </div>
                  </div>
                 
                </div>
                <div style={{display: this.state.showMenu}}>
                  <MenuProfil/>
                </div>
            </div>
            </>
        )
    }
}

class MenuProfil extends Component{

  constructor(props){
      super(props);
      this.state = { 
          name:'',
          img:''
      }
  }

  componentDidMount(){
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token')
          axios.defaults.headers['Authorization'] = 'Bearer ' + token
          axios.post('http://localhost:5000/api/v1/profile')
          .then(res => {
              this.setState({ name : res.data[0].username.charAt(0).toUpperCase()+ res.data[0].username.slice(1), img:res.data[0].img});
            })
      }
  }

  signOut = () =>{
      localStorage.clear();
      window.location = '/'
  }
  render(){
      return(
      <>
      <div className="header-dropdown-profil-content">
          <div className='header-dropdown-profil-content-ul'>
            <div className='header-dropdown-profil-content-li'>
              <Avatar style={{marginRight:'20px'}} alt="Remy Sharp" 
              src={this.state.img}/> 
              {this.state.name}
            </div>
          </div>
          
          <div className='header-dropdown-profil-content-ul'>
            <div className='header-dropdown-profil-content-li'><ConfirmationNumberIcon style={{marginRight:'20px'}}/>My Ticket</div>
            <div className='header-dropdown-profil-content-li'><PaymentIcon style={{marginRight:'20px'}}/> Payment</div>
            <Link to='/addevent' className='header-dropdown-profil-content-li'><AddCircleIcon style={{marginRight:'20px'}}/> Add Event</Link>
          </div>

          <div className='header-dropdown-profil-content-ul'>
            <div className='header-dropdown-profil-content-li' onClick={()=>this.signOut()}
            ><ExitToAppIcon style={{marginRight:'20px'}}/>  Sign Out</div>
          </div>
      </div>
      </>
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
      showModal: () => dispatch(showModal()),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Header);