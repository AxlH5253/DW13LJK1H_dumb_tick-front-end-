import React,{Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getEvenToday} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import './Event.css';

class Event extends Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getEvenToday();
    }

    render(){
         const { data, isLoading, isPost, error } = this.props.getEvent;

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
                <div className='event-title-body'><h2>Today's Events</h2></div>
              </div>
              {data.slice(0,Math.ceil(data.length/3)).map((item,index)=>
              <div key={index} className='event-body'>
                  {data.slice(index*3,(index+1)*3).map((item)=>
                  <div key={item.id} className="event-body-content" onClick={()=>window.location=`/detailEvent/${item.id}`}>
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
        getEvent: state.getEvent
    };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      getEvenToday:() => dispatch(getEvenToday())
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Event);