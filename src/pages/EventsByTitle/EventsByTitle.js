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
        this.state = {
          favColor:[]
        }
    }

    componentDidMount() {
        this.props.getEventByTitle(this.props.match.params.title);
    }

    hendleOnClickFavorite = (i) => {
      const favColorTemp = this.state.favColor
      if(favColorTemp[i] === 'grey'){
        favColorTemp[i] = '#ED4A6A'
      }else{
        favColorTemp[i] = 'grey'
      }
      this.setState({favColor:favColorTemp})  
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
            const favColorTemp = []
            if(this.state.favColor.length < data.length){
              for (let i = 0;i<=data.length;i++){
                  favColorTemp.push('grey')
              }
              this.setState({favColor:favColorTemp})
            }

            return(
                <div className='event'>
                  <div className='event-title'>
                  <div className='event-title-body'><h2>Search result for the title '{this.props.match.params.title}'</h2></div>
                  </div>
                  {data.slice(0,Math.ceil(data.length/3)).map((item,index)=>
                    <div key={index} className='event-body'>
                        {data.slice(index*3,(index+1)*3).map((item,index)=>
                      <div key={item.id} className="event-body-content">

                      <Link style={{textDecoration:'none',color:'black'}} to={{pathname: `/detailEvent/${item.id}`}} >
                        <img className="event-body-content-img" src={item.img} alt="Remy Sharp"></img>
                      </Link>

                      <div style={{display:'flex',width:'80%',alignItems:'center',justifyContent:'space-between',marginBottom:'0px',paddingTop:'5px'}}>
                        <div>{new Intl.DateTimeFormat('en-GB', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: '2-digit' 
                            }).format(new Date(item.startAt))} at {item.startAt.substring(11,16)}</div>
                        <div>
                          <FavoriteIcon style={{color:this.state.favColor[index],fontSize:'30px',cursor:'pointer'}}
                                        onClick={()=>this.hendleOnClickFavorite(index)}/>
                        </div>
                      </div>
                      <Link style={{textDecoration:'none',color:'black'}} to={{pathname: `/detailEvent/${item.id}`}} >
                        <h4 className='event-content-title'>
                          {item.title}
                        </h4>
                      </Link>
                      <div className="event-body-content-description">
                        {item.description.substring(0,50)+' . . .'}
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
      getEventTitle: state.getEventTitle
    };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      getEventByTitle:(title)=>dispatch(getEventByTitle(title))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));