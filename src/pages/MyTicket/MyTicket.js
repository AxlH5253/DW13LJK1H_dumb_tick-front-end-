import React,{Component} from 'react';
import axios from 'axios';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Redirect} from "react-router-dom";

class MyTicket extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderData:[],
            redirect:false
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('token')){
         this.setState({redirect:true})
        }else{
          let token = localStorage.getItem('token')
          axios.defaults.headers['Authorization'] = 'Bearer ' + token
          axios.post('https://dumb-tick-app.herokuapp.com/api/v1/ticket')
          .then(res => {
              this.setState({ orderData : res.data})
          })
        }
    }

    render(){

        if(this.state.redirect){
            this.setState({redirect:false}) 
            return(
              <>
               <Redirect  to={{pathname: `/`}}/> 
              </>
            )

          }

          if(this.state.orderData<=0){
            return(
                <div style={{width:'91%',height:'100px',padding:'60px'}}>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <div style={{width:'66.5%'}}><h1>You don't have any ticket</h1></div>
                    </div>
                </div>
            )
        }

        return(
            <div style={{width:'91%',height:'700px',padding:'60px'}}>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <div style={{width:'66.5%'}}><h1>Payment</h1></div>
            </div>
            
            {this.state.orderData.map((item,index) => 
            <div key={index}>
              <div style={{width:'100%',height:'400px', display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'40px'}}>
                  <div style={{width:'60%',background:'white',height:'80%', border:'40px solid #041426'}}>
                      
                      <div style={{background:'#bdbbb5',height:'20%',width:'98%',paddingLeft:'15px'}}>
                          <h2 style={{padding:'0px',margin:'0px'}}>{item.user.username.charAt(0).toUpperCase() + item.user.username.slice(1)}</h2>
                          <h4 style={{padding:'0px',margin:'0px'}}>ID User: {item.user.id}</h4>
                      </div>

                      <div style={{height:'80%',width:'100%',display:'flex'}}>
                          <div style={{height:'100%',width:'70%',paddingLeft:'15px'}}>
                              <h1>{item.event.title}</h1>
                              <p> 
                                  &nbsp;{new Intl.DateTimeFormat('en-GB', { 
                                          year: 'numeric', 
                                          month: 'long', 
                                          day: '2-digit' 
                                  }).format(new Date(item.event.startAt))} at {item.event.startAt.substring(11,16)}</p>
                              <div style={{display:'flex',alignItems:'center'}}><LocationOnIcon/>&nbsp;{item.event.address}</div>
                          </div>
                          <div style={{height:'100%',width:'30%',display:'flex',justifyContent:'cener',alignItems:'center'}}>
                              <img style={{width:'80%',height:'70%'}} src='https://upload.wikimedia.org/wikipedia/commons/5/5b/Qrcode_wikipedia.jpg' alt="Remy Sharp"/>
                          </div>
                      </div>
                      
                  </div>
              </div>
              </div>
              )}

          </div>
        )
    }
}

export default MyTicket