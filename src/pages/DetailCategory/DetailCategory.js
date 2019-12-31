import React,{Component} from 'react';
import {Link,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {getEvenByCat} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import './DetailCategory.css';

class Event extends Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getEvenByCat(this.props.match.params.id);
    }

    render(){
         const { data, isLoading, error } = this.props.getEventByCategory;

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
         if(data){
        return(
            <div className='event'>
              <div className='event-title'>
                {data.slice(0,1).map((item)=>
                  <div key={item.id} className='event-title-body'><h2>Events Of Category {item.category.name}</h2></div>
                )}
              </div>
              {data.slice(0,Math.ceil(data.length/3)).map((item,index)=>
              <div key={index} className='event-body' onClick={()=>window.location=`/detailEvent/${item.id}`}>
                  {data.slice(index*3,(index+1)*3).map((item)=>
                  <div key={item.id} className="event-body-content">
                      <img className="event-body-content-img" src={item.img}></img>
                      <h4>{item.title}</h4>
                      <div className="event-body-content-description">
                        {item.description.substring(0,100)+' . . .'}
                      </div>
                  </div>
                   )}
                </div>
                )}
            </div>
        )
      }
    }
}

const mapStateToProps = state => {
    return {
      getEventByCategory: state.getEventByCategory
    };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      getEvenByCat:(categoryId) => dispatch(getEvenByCat(categoryId))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Event));