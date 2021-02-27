import React, { Component } from 'react';


class Admin extends React.Component {

    render() {
        return (
            
     
            <form>
                <label>
                <center>New Vendor Account<br /><br /></center>
                Vendor Name: <input type = "text" />
                Vendor Username: <input type = "text" /><br /><br />
                Vendor Role: <input type = "text" />
                Vendor Password: <input type = "password" /><br /><br />
                <input type = "button" value = "Submit" />
                </label>
            </form>
        )
    }
}
      
  
export default Admin;
