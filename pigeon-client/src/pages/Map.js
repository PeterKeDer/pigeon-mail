
import React from 'react';
import { connect } from 'react-redux';



class Map extends React.Component {
    componentWillMount() {

        // Load shit
    }

    render() {
        return (

            <div>
                <div >
                    <h1>Campaigns</h1>

                </div>

            </div >
        );
    }
}

const mapStateToProps = state => ({ state });

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(Map);