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

                {this.state.menuItems.map(menuItem =>
                        <div key={menuItem.hotdog_id} className="mb-3">

                                <h6>{menuItem.hotdog_name}</h6>
                               
                        </div>
                )}

            </div>
        );
    }
}


export default Orders;
