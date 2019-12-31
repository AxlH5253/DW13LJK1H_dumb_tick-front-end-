import React,{Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getCategories} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import SearchIcon from '@material-ui/icons/Search';
import './Header.css'

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
          queryValue: ''
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    handleOnChage = event => {
        this.setState({queryValue:`/eventbytitle/${event.target.value}`})
    }

    handleKeyUp = event =>{
      if (event.keyCode === 13){
        window.location = this.state.queryValue
      }
    }
    render(){
         const { data, isLoading, isPost, error } = this.props.home;

        if (isLoading) {
            return (
              <div>
               <SkeletonLoader />
              </div>
            );
        }
      
          if (error) {
            return (
              <div>
                <h1>There's an unknown error occured</h1>
              </div>
            );
          }
        return(
            <>
            <div className='header-body-top'>
                
                  <div style={{width:'30%',display:'flex',justifyContent:'center',color:'white'}}>
                  <Link style={{color:'white',textDecoration:'none'}} to='/'><h1>Dumb-Tick</h1> </Link>
                  </div>
              
                <div className='header-body-top-login-body'>
                  <button className='header-body-top-login-button'>Login</button>
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
      getCategories: () => dispatch(getCategories())
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Header);