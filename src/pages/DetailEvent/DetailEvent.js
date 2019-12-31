import React, { Component } from 'react';
import {Link,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {getDetailEvt} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import './DetailEvent.css'
import EventIcon from '@material-ui/icons/Event';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class DetailEvent extends Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getDetailEvt(this.props.match.params.id);
    }

    render(){
        const { data,isLoading, error } = this.props.getEventDetail;

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
                <div className='detail-event'>
                    {data.map((item,index)=>
                    <div key={index}>
                        <div className='detail-event-body-top'>
                            <div className='detail-event-body-top-img'>
                                <img className='detail-event-body-top-img-image' src={item.img}></img>
                            </div>
                            <div className='detail-event-body-top-child-st'>
                                <div className='detail-event-body-bottom-child-st-box'> 
                                    <div className='detail-event-body-bottom-child-st-box-child-st'>
                                        <h2>{item.title}</h2>
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-child-nd' >
                                        <h4>Rp.{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
                                    </div>
                                </div>
                                <div className='detail-event-body-bottom-child-st-box-2-child-st'>
                                    <h3>{item.category.name}</h3>
                                </div>
                            </div>
                            <div className='detail-event-body-top-child-nd'>
                                <div style={{marginLeft:'40px'}}>
                                    <h4 className='detail-event-time-title'>Date & Time</h4>
                                    <div className='detail-event-body-bottom-child-st-box-2-child-st-time'>
                                        <EventIcon/> 
                                        &nbsp;{new Intl.DateTimeFormat('en-GB', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: '2-digit' 
                                        }).format(new Date(item.startAt))} -  
                                        &nbsp;{new Intl.DateTimeFormat('en-GB', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: '2-digit' 
                                        }).format(new Date(item.endAt))}
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-2-child-st-time'>
                                        <AccessTimeIcon/>  
                                        &nbsp;{item.startAt.substring(11,16)} - 
                                        &nbsp;{item.endAt.substring(11,16)}
                                    </div>
                                </div>

                                <div style={{marginLeft:'40px'}}>
                                    <h4 className='detail-event-time-title'>Contact Person</h4>
                                    <div className='detail-event-body-bottom-child-st-box-2-child-st-time'>
                                        <PersonIcon/> 
                                        &nbsp; {item.createdBy.username.charAt(0).toUpperCase() + item.createdBy.username.slice(1)}
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-2-child-st-time'>
                                        <PhoneIcon/>  
                                        &nbsp; {item.createdBy.phonrNumber}
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-2-child-st-time'>
                                        <MailOutlineIcon/>  
                                        &nbsp; {item.createdBy.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='detail-event-body-bottom'>
                            <div className='detail-event-body-bottom-child-st'>
                                <div className='detail-event-body-bottom-child-nd'>
                                    <div className='detail-event-body-bottom-child-st-box-child-st'>
                                        <h2>Description</h2>
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-child-st'>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className='detail-event-body-bottom-child-rd'>
                                    <div className='detail-event-body-bottom-child-st-box-child-st'>
                                        <h2>Location</h2>
                                    </div>
                                    <div className='detail-event-body-bottom-child-st-box-child-st'>
                                        <p>{item.address}</p>
                                    </div>
                                    <div style={{marginLeft:'40px',height:'250px'}}>
                                        <iframe style={{width:'90%',height:'100%',border:'2px solid black'}} src={item.urlMaps}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                    
                </>
            )
    }
}

const mapStateToProps = state => {
    return {
        getEventDetail: state.getEventDetail
    };
  };

  const mapDispatchToProps = dispatch => {
    return { 
        getDetailEvt:(evtId) => dispatch(getDetailEvt(evtId))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailEvent));