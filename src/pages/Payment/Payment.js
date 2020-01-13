import React,{Component} from 'react';
import './Payment.css';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class Payment extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgUrl:'',
            showImg:'none',
            inputBorder:'1px solid black',
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
          axios.post('https://dumb-tick-app.herokuapp.com/api/v1/orders')
          .then(res => {   
              this.setState({orderData:res.data})
        })

        }
    }

    handleChangeImgUrl = (event)=>{
        this.setState({imgUrl:event.target.value})
        if(event.target.value !== ''){
            this.setState({showImg:'block',inputBorder:'1px solid black'})
        }else{
            this.setState({showImg:'none',inputBorder:'1px solid red'})
        }
    }

    handleBtnConfirm = (id) =>{
        if(this.state.imgUrl===''){
            this.setState({inputBorder:'1px solid red'})
        }else{
            if(!localStorage.getItem('token')){
                this.setState({redirect:true})
            }else{
                let token = localStorage.getItem('token')
                axios.defaults.headers['Authorization'] = 'Bearer ' + token
                axios.put('https://dumb-tick-app.herokuapp.com/api/v1/order',{id:id})
                .then(res => {
                    window.location = '/payment';
                })
            }
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
                <div style={{width:'91%',height:'700px',padding:'60px'}}>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <div style={{width:'66.5%'}}><h1>You don't have any payment</h1></div>
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
                <div style={{width:'100%',height:'400px', display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{width:'60%',background:'white',height:'80%', border:'40px solid #041426'}}>
                        
                        <div style={{background:'#bdbbb5',height:'20%',width:'98%',paddingLeft:'15px'}}>
                            <h2 style={{padding:'0px',margin:'0px'}}>{item.user.username.charAt(0).toUpperCase() + item.user.username.slice(1)}</h2>
                            <h4 style={{padding:'0px',margin:'0px'}}>ID User: {item.user.id}</h4>
                        </div>

                        <div style={{height:'80%',width:'100%',display:'flex'}}>
                            <div style={{height:'100%',width:'70%',paddingLeft:'15px'}}>
                                <h1>{item.event.title}</h1>
                                <p> Time & Date :
                                    &nbsp;{new Intl.DateTimeFormat('en-GB', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: '2-digit' 
                                    }).format(new Date(item.event.startAt))} at {item.event.startAt.substring(11,16)}</p>
                                <div style={{display:'flex',alignItems:'center'}}>Location : {item.event.address}</div>
                            </div>
                            <div style={{height:'100%',width:'30%',display:'flex',justifyContent:'cener',alignItems:'center'}}>
                                <img style={{width:'80%',height:'70%'}} src='https://upload.wikimedia.org/wikipedia/commons/5/5b/Qrcode_wikipedia.jpg' alt="Remy Sharp" />
                            </div>
                        </div>
                        
                    </div>
                </div>
              
                <div style={{width:'100%',marginTop:'0px',height:'400px', display:'flex',justifyContent:'center',alignItems:'flex-start'}}>
                    <div style={{width:'66%',background:'white',height:'80%', border:'1px solid grey'}}>
                    <div style={{height:'100%',width:'96%',paddingLeft:'15px'}}>
                        <h1>Shoping Sumary</h1>
                        <div style={{paddingLeft:'20px', display:'flex',width:'30%',alignItems:'center',justifyContent:'space-between'}}>
                            <p>Total price ({item.quantity} item)</p>
                            <p>Rp.{(item.totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                        <p style={{paddingLeft:'20px'}}>Status : {item.status}</p>
                        <div style={{marginTop:'20px',width:'100%',height:'50%',display:'flex',justifyContent:'center'}}>
        
                            <div style={{width:'80%',height:'80%',display:item.btn}}>
                                <div style={{display:this.state.showImg,border:'1px solid black',marginLeft:'30px',width:'25%',height:'70%'}}>
                                    <img style={{width:'100%',height:'100%'}} src={this.state.imgUrl} alt="Remy Sharp" />
                                </div>
                                <input id='imgUrl' onChange={this.handleChangeImgUrl}
                                    style={{marginLeft:'20px',marginTop:'10px',outline:'none',border:this.state.inputBorder}}
                                />
                            </div>
                            <div style={{width:'25%',display:item.btn,justifyContent:'flex-end',alignItems:'center'}}>
                                <button onClick={() =>this.handleBtnConfirm(item.id)} className='payment-confirm-btn'>
                                Confirm
                            </button>
                            </div>

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

export default Payment