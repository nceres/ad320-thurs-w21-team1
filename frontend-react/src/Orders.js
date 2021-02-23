import React, {Component} from 'react';


class Orders extends React.Component {

    state = { menuItems: [], disabled_id: 1 }



    componentDidMount() {
        fetch("/orders")
            .then(res => res.json( ) )
            .then(menuItems => this.setState({menuItems}))
            .then(ignored => console.log(this.state));
    
        }


    render() {

        return (
            <div>

                <h1>Orders</h1>
    <hr style={{margin: "0"}}/>

                <div style={styles}><h6>Order No.</h6></div>
                <div style={styles}><h6>Location</h6></div>
                <div style={styles}><h6>Name</h6></div>
                <div style={styles}><h6>Item</h6></div>
                <div style={styles}><h6>Quantity</h6></div>

    <hr style={{margin: "0"}}/> <br/> 
                {this.state.menuItems.map(menuItem =>
                        <div key={menuItem.index} className="mb-3">

                                <div style={styles}>{menuItem.Hotdog}</div>
                                <div style={styles}>{menuItem.Quantity}</div>
                               
                        </div>
                )}

            </div>
        );
    }
}

// CSS in JS
const styles = {
    display: "inline-block",
    width: "20%"
 }

export default Orders;
