import React, {Component} from 'react';
import TaskBoard from "./taskBoard";

class MainPage extends Component {
    render() {
        return (
            <div className="background">
                <TaskBoard/>
            </div>
        );
    }
}

export default MainPage;