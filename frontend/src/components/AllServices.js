import React, {Component} from 'react';
import axios from 'axios';
import NavBar from './NavBar';


export default class AllServices extends Component{

constructor(props) {
  super(props);

  

  this.state={
    arrayRes:[]   //this array is used to save posts when we use GET request      
  };

}

componentDidMount() {
  this.retrievePosts();
}

retrievePosts() {
  axios.get("/Res").then(res =>{
    if(res.data.success){
      this.setState({
        arrayRes:res.data.existingRes                
      });

      console.log(this.state.arrayRes);              
    }
  });
}

onDelete =(id) =>{

  axios.delete(`/Res/delete/${id}`).then((res) =>{
    alert("Delete Successfully");
    this.retrievePosts();
  });
}

filterData(arrayRes,searchKey){                      

  const result = arrayRes.filter((post) =>            
  post.Name.toLowerCase().includes(searchKey)||
  post.ID.toLowerCase().includes(searchKey)||
  post.Phone_No.toLowerCase().includes(searchKey)||
  post.Check_In.toLowerCase().includes(searchKey)||
  post.Check_Out.toLowerCase().includes(searchKey)||
  post.No_Of_Rooms.toLowerCase().includes(searchKey)||    
  post.Name.toUpperCase().includes(searchKey)||  
  post.ID.toUpperCase().includes(searchKey)|| 
  post.Phone_No.toUpperCase().includes(searchKey)||
  post.Check_In.toUpperCase().includes(searchKey)||
  post.Check_Out.toUpperCase().includes(searchKey)||
  post.No_Of_Rooms.toUpperCase().includes(searchKey)||
  post.Name.toUpperCase().includes(searchKey)||  
  post.ID.includes(searchKey)|| 
  post.Phone_No.includes(searchKey)||
  post.Check_In.includes(searchKey)||
  post.Check_Out.includes(searchKey)||
  post.No_Of_Rooms.includes(searchKey)
  
  )

  this.setState({arrayRes:result})                   
}



handleSearchArea = (e) =>{

  const searchKey= e.currentTarget.value;

  axios.get("/Res").then(res =>{
    if(res.data.success){
      
      this.filterData(res.data.existingRes,searchKey)
    }
  });
}

render() {
  return (
    
    <div className="container">
      <NavBar/>
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">

          <h4>Payment Approvals</h4>
        </div>
        <div className="col-lg-3 mt-2 mb-2">
          <input 
          className="form-control"
          type="search"
          placeholder="Search"
          name="searchQuery"
          onChange={this.handleSearchArea}>
            </input>
        </div>
      </div>
      <table className="table table-hover" style={{marginTop:'40px'}}>  
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Goods</th>
            <th scope="col">Quantity</th>
            <th scope="col">Cost</th>
            <th scope="col">Action</th>  
          </tr>
        </thead>

        <tbody>
          {this.state.arrayRes.map((arrayRes,index) =>(               
            <tr key={index}> 
              <th scope="row">{index+1}</th>
              <td>
                  <a href={`/service/${arrayRes._id}`} style={{textDecoration:'none'}}>       
                  {arrayRes.Name}                                                            
                  </a>
                  
              </td>
              <td>{arrayRes.ID} </td>                                       
              <td>{arrayRes.Phone_No}</td>

              <td>
                <a className="btn btn-warning" href={`/service/${arrayRes._id}`}>   
                  <i className="fas fa-edit"></i>&nbsp;Approve Payment
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(arrayRes._id)}>         
                  <i className="far fa-trash-alt"></i>&nbsp;Reject Payment
                </a>
                &nbsp;
                

              </td>

            </tr>

            ))}

        </tbody>
      </table>  
    </div>
  )
}
}