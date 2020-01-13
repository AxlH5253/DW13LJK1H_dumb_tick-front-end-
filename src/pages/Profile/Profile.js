import React,{Component} from 'react';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {getEvenToday} from '../../_actions/home';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { connect } from "react-redux";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData:[]
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('token')){
         window.location = '/';
        }else{
          this.props.getEvenToday();
          let token = localStorage.getItem('token')
          axios.defaults.headers['Authorization'] = 'Bearer ' + token
          axios.post('https://dumb-tick-app.herokuapp.com/api/v1/profile')
          .then(res => {
              this.setState({ userData : res.data})
          })
        }
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

        return(
            <div style={{width:'91%',height:'800px',padding:'60px',display:'flex',alignItems:'center',flexDirection:'column'}}>
                <div style={{width:'80%',height:'80%'}}>
                    {this.state.userData.map((item,index)=>
                    <div key={index} style={{width:'100%',height:'70px'}}>
                        <h1>Profile</h1>
                        <div style={{width:'100%',display:'flex'}}>
                            <div style={{width:'60%'}}>
                                <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <h2 style={{display:'flex',alignItems:'center'}}><PersonIcon/>&nbsp;&nbsp;{item.username}</h2>
                                    <Link to='/editprofile'>
                                    <button   style={{border:'none',outline:'none',
                                            height:'40px',width:'100px',borderRadius:'5px',background:'#041426',color:'white'}}>
                                            Edit Profile
                                    </button>
                                    </Link>
                                </div>
                                <h2 style={{display:'flex',alignItems:'center'}}><PhoneIcon/>&nbsp;&nbsp;{item.phonrNumber}</h2>
                                <h2 style={{display:'flex',alignItems:'center'}}><EmailIcon/>&nbsp;&nbsp;{item.email}</h2>
                            </div>
                            <div style={{width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <div style={{width:'200px',borderRadius:'100%',height:'200px',border:'1px solid black'}}>
                                    <img src={item.img}
                                         style={{height:'100%',width:'100%',borderRadius:'100%'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div style={{width:'100%',height:'90%',display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <h1>Favorite</h1>
                    {data.slice(0,Math.ceil(data.length/3)).map((item,index)=>
                    <div key={index} className='event-body' style={{background:'white'}}>
                        {data.slice(index*3,(index+1)*3).map((item)=>
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
                        )}
                        </div>    
                    </div>
        )
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

  export default connect(mapStateToProps, mapDispatchToProps)(Profile);