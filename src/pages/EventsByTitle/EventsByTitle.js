import React,{Component} from 'react';
import {Link,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {getEventByTitle} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import './EventsByTitle.css';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Content extends Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getEventByTitle(this.props.match.params.title);
    }

    render(){
        const { data, isLoading,error } = this.props.getEventTitle;

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
                  <div className='event-title-body'><h2>Search result for the title '{this.props.match.params.title}'</h2></div>
                  </div>
                  {data.slice(0,Math.ceil(data.length/3)).map((item,index)=>
                   <div key={item.id} className="event-body-content" onClick={()=>window.location=`/detailEvent/${item.id}`}>
                   <img className="event-body-content-img" src={item.img}></img>
                   <div style={{display:'flex',width:'80%',alignItems:'center',justifyContent:'space-between',marginBottom:'0px',paddingTop:'5px'}}>
                     <div>{new Intl.DateTimeFormat('en-GB', { 
                             year: 'numeric', 
                             month: 'long', 
                             day: '2-digit' 
                         }).format(new Date(item.startAt))} at {item.startAt.substring(11,16)}</div>
                     <div><FavoriteIcon/></div>
                   </div>
                   <h4>{item.title}</h4>
                   <div className="event-body-content-description">
                     {item.description.substring(0,50)+' . . .'}
                   </div>
               </div>
                    )}
                </div>
            )
          }
    }
}

const mapStateToProps = state => {
    return {
      getEventTitle: state.getEventTitle
    };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      getEventByTitle:(title)=>dispatch(getEventByTitle(title))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));