import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {getCategories} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import SearchIcon from '@material-ui/icons/Search';
import './Category.css'

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
          queryValue: '',
          redirect: false
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
        this.setState({redirect:true})
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

          if(this.state.redirect){
            this.setState({redirect:false}) 
            return(
              <>
               <Redirect  to={{pathname: `${this.state.queryValue}`}}/> 
              </>
            )

          }
        return(
            <>
            <div className='category'>
            <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'40px',background:'#dfe8f2'}}>
              <div style={{width:'20%',border:'1px solid black',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px'}}>
                <input onChange={this.handleOnChage} className='category-body-top-search-input' placeholder='Search Events'
                      onKeyUp={this.handleKeyUp}>
                </input> 
                
                <Link className='category-body-top-search-button' 
                     style={{textDecoration:'none',color:'black'}} 
                     to={{pathname: `${this.state.queryValue}`}}>    
                      <SearchIcon/>
                </Link>
      
              </div>
            </div>
            <div className='category-body-bottom'>
              { data.map((item,index)=>

               <Link key={index} className='category-body-bottom-content' 
                     style={{textDecoration:'none',color:'black'}} 
                     to={{pathname: `/detailCategory/${item.id}`}}>    
                  {item.name}
               </Link>

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