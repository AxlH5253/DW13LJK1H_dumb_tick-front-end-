import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getCategories} from '../../_actions/home';
import {Redirect} from "react-router-dom";
import './AddEvent.css';

class Register extends Component{
 constructor(props){
   super(props);
   this.state={
    title: '1px solid black',
    category: '1px solid black',
    price: '1px solid black',
    address: '1px solid black',
    startAt: '1px solid black',
    endAt: '1px solid black',
    imgUrl: '1px solid black',
    mapUrl: '1px solid black',
    description: '1px solid black',
    errorMessage: '',
    mapUrlLink:'',
    imgUrlLink:'',
    redirect:false
   }
 }

 componentDidMount() {
  if(!localStorage.getItem('token')){
   this.setState({redirect:true})
  }
  this.props.getCategories();
}

handleAddEventBtn(){
  if((document.getElementById('title').value === '')||
  (document.getElementById('category').value === 0)||
  (document.getElementById('price').value === '')||
  (document.getElementById('address').value === '')||
  (document.getElementById('startAt').value === '')||
  (document.getElementById('endAt').value === '')||
  (document.getElementById('imgUrl').value === '')||
  (document.getElementById('mapUrl').value === '')||
  (document.getElementById('description').value === '')){

  this.setState({errorMessage:'All data must be filled in'})

  if(document.getElementById('title').value === ''){
    this.setState({title:'1px solid red'})
  }
  if(document.getElementById('category').value === 0){
    this.setState({category:'1px solid red'})
  }
  if(document.getElementById('address').value === ''){
    this.setState({address:'1px solid red'})
  }
  if(document.getElementById('price').value === ''){
    this.setState({price:'1px solid red'})
  }
  if(document.getElementById('startAt').value === ''){
    this.setState({startAt:'1px solid red'})
  }
  if(document.getElementById('endAt').value === ''){
    this.setState({endAt:'1px solid red'})
  }
  if(document.getElementById('imgUrl').value === ''){
    this.setState({imgUrl:'1px solid red'})
  }
  if(document.getElementById('mapUrl').value === ''){
    this.setState({mapUrl:'1px solid red'})
  }
  if(document.getElementById('description').value === ''){
    this.setState({description:'1px solid red'})
  }
  window.scrollTo(1, 1);
}else{
  const dataEvent ={
    title : document.getElementById('title').value,
    categoryId : document.getElementById('category').value,
    price : document.getElementById('price').value,
    address : document.getElementById('address').value,
    startTime: document.getElementById('startAt').value,
    endTime: document.getElementById('endAt').value,
    img : this.state.imgUrlLink,
    urlMaps : this.state.mapUrlLink,
    description : document.getElementById('description').value
  }

  axios.post('https://dumb-tick-app.herokuapp.com/api/v1/event',dataEvent)
  .then(res=>{
    if(res.data[0].id){
      this.setState({redirect:true})
    }else{
      this.setState({errorMessage:'Cannot connect to server'})
      window.scrollTo(1, 1);
    }
  })
}
}

handleOnChangeInput = () =>{
  this.setState({errorMessage:''})

  this.setState({title:'1px solid black'})
  this.setState({category:'1px solid black'})
  this.setState({price:'1px solid black'})
  this.setState({address:'1px solid black'})
  this.setState({startAt:'1px solid black'})
  this.setState({endAt:'1px solid black'})
  this.setState({imgUrl:'1px solid black'})
  this.setState({mapUrl:'1px solid black'})
  this.setState({description:'1px solid black'})
}

handleOnChangeUrlMap = (event)=>{
  this.setState({mapUrlLink: event.target.value})
  this.handleOnChangeInput()
}

handleOnChangeUrlImg = (event) =>{
  this.setState({imgUrlLink: event.target.value})
  this.handleOnChangeInput()
}
  
 render(){
  const {data} = this.props.home;

  if(this.state.redirect){
    this.setState({redirect:false})
    return <Redirect  to={{pathname: `/`}}/>
  }

  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h1>Add new event</h1>
          <h3 style={{color:'red',position:'absolute',top:'13ex',left:'13ex'}}>{this.state.errorMessage}</h3>

          <div className='register-page-parrent'>
              <div className='register-page-child-st'>
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    id='title'
                    onChange={this.handleOnChangeInput}
                    style={{border:this.state.title,width:'100%',height: '50px',fontSize:'30px',paddingLeft:'20px',borderRadius:'5px'}} 
                    placeholder='Title'/>
                  </div>

                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <select
                    id='category'
                    onChange={this.handleOnChangeInput}
                    style={{paddingLeft:'20px',border:this.state.category,width:'104%',height: '50px',outline:'none',fontSize:'30px',borderRadius:'5px'}}>
                       <option value={0}>Select category</option>
                      {data.map((item)=>
                        <option key={item.id} value={item.id}>{item.name}</option>
                      )}
                    </select>
                  </div>

                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    id='price'
                    onChange={this.handleOnChangeInput}
                    style={{border:this.state.price,width:'100%',height: '50px',fontSize:'30px',borderRadius:'5px',paddingLeft:'20px'}} 
                    placeholder='Price' type='number'/>
                  </div>
                  
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <input
                    id='address'
                    onChange={this.handleOnChangeInput}
                    style={{border:this.state.address,width:'100%',height: '100px',fontSize:'30px' ,borderRadius:'5px',paddingLeft:'20px'}} 
                    placeholder='Address'/>
                  </div>

                </div>

                <div className='register-page-child-st'>
                 
                        
                  <div style={{ width:'83.5%'}}>
                    <h1>Start at</h1>
                    <input
                    id='startAt'
                    onChange={this.handleOnChangeInput}
                    style={{border:this.state.startAt,width:'100%',height: '50px',fontSize:'30px',borderRadius:'5px',paddingLeft:'20px'}} 
                    placeholder='Start at' type='datetime-local'/>
                  </div>

                  
                  <div style={{ width:'83.5%',marginTop:'10px'}}>
                    <h1>End at</h1>
                    <input
                    id='endAt'
                    onChange={this.handleOnChangeInput}
                    style={{border:this.state.endAt,width:'100%',height: '50px',fontSize:'30px',borderRadius:'5px',paddingLeft:'20px'}} 
                    placeholder='End at' type='datetime-local'/>
                  </div>
                  <div style={{bakcground:'red',height:'60px', width:'100px'}}/>
                </div>
                
          </div>

          <div className='register-page-parrent'>
          <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div style={{width:'80%',height:'100%',border:'1px solid black'}}>
                          <img style={{width:'100%', height:'100%'}} src={this.state.imgUrlLink} alt="Remy Sharp"></img>
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input 
                    id='imgUrl'
                    onChange={this.handleOnChangeUrlImg}
                    className='register-page-box-input' 
                    style={{border:this.state.imgUrl}} 
                    placeholder="Paste event's image url in here"/>
                  </div>
              </div>
                <div className='register-page-botom-body'>
                  <div className='register-page-botom-body-head'>
                      <div style={{width:'80%',height:'100%',border:'1px solid black'}}>
                        <iframe title='location' src={this.state.mapUrlLink} style={{width:'100%',height:'100%'}}></iframe>
                      </div>
                     
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <input 
                    id='mapUrl'
                    onChange={this.handleOnChangeUrlMap}
                    className='register-page-box-input' 
                    style={{border:this.state.mapUrl}} 
                    placeholder="Paste event's maps url in here"/>
                  </div>
              </div>
          </div>

          <div className='register-page-parrent' style={{border:'none'}}>
           
            <div style={{ width:'83.5%',marginTop:'10px'}}>
                <textarea
                id='description'
                onChange={this.handleOnChangeInput}
                style={{border:this.state.description,width:'100%',height: '350px',fontSize:'20px',
                borderRadius:'5px',marginLeft:'63px',marginTop:'10px',outline:'none',padding:'30px'}} 
                placeholder=' Event Description'/>
            </div>
          </div>

            <div className='register-page-botom-body-btn'>
              <button className='register-page-botom-btn' onClick={()=>this.handleAddEventBtn()}>Add event</button>
            </div>    
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);