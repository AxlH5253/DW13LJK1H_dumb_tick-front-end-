import React,{Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getCategories} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import SearchIcon from '@material-ui/icons/Search';
import './Category.css'

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
         const { data, isLoading, error } = this.props.home;

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
            <div className='category'>
            <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'40px',background:'#dfe8f2'}}>
              <div style={{width:'20%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px'}}>
                <input onChange={this.handleOnChage} className='category-body-top-search-input' placeholder='Search Events'
                      onKeyUp={this.handleKeyUp}>
                </input> 
                <button className='category-body-top-search-button'  onClick ={() =>{window.location = this.state.queryValue}}>
                      <SearchIcon/>
                </button>
              </div>
            </div>
            <div className='category-body-bottom'>
              { data.map((item,index)=>
             
              <div key={index} className='category-body-bottom-content' onClick={()=>(window.location=`/detailCategory/${item.id}`)}>
                {item.name}
              </div>
              )}    
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