import React,{Component} from 'react';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from "react-router-dom";

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
          let token = localStorage.getItem('token')
          axios.defaults.headers['Authorization'] = 'Bearer ' + token
          axios.post('http://localhost:5000/api/v1/profile')
          .then(res => {
              this.setState({ userData : res.data})
          })
        }
    }
    render(){
        return(
            <div style={{width:'91%',height:'550px',padding:'60px',display:'flex',alignItems:'center',flexDirection:'column'}}>
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
                <div style={{width:'80%',height:'80%'}}>
                    <h1>Favorite</h1>
                </div>    
            </div>
        )
    }
}

export default Profile