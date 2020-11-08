import React, {Component} from 'react';
import Button from 'antd/lib/button';

import TaskList from "./taskList";


class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {summary: "Check box", priority: true, ready: false, select: true},
                {summary: "Check flowers", priority: false, ready: false, select: false},
                {summary: "Do task", priority: false, ready: false, select: false}
            ],
            active: false,
            selectedElementsAvailable: false,
            selectedElementsNumber: 0
        }
        this.toggleClass = this.toggleClass.bind(this);
        this.prioritySetter = this.prioritySetter.bind(this);
        this.taskReady = this.taskReady.bind(this);
        this.delTask = this.delTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.pickOutTask = this.pickOutTask.bind(this);
        this.delPickOutTasks = this.delPickOutTasks.bind(this);
    }

    componentDidMount() {
        const taskList = JSON.parse(localStorage.getItem('task'));
        taskList.map((elem)=> elem.select = false)
        if (taskList && taskList.length) {
            this.stateSetter(taskList);
        }
    }

    pickOutTask(el) {
        let taskList = this.getList();
        const elIndex = this.indexSearcher(el)
        if(elIndex !== -1) {
            taskList[elIndex].select = !taskList[elIndex].select;
        }
        this.stateSetter(taskList);
        let counter = 0;
        taskList.map((element)=> {
            if (element.select) {
                counter++;
                this.setState({selectedElementsAvailable: true})
            }
        })
        if(counter === 0) {
            this.setState({selectedElementsAvailable: false})
        }
    }

    delPickOutTasks() {
        let taskList = this.getList();
        let listMask = taskList;

        if(this.state.selectedElementsAvailable) {
                for(let i = 0; i < taskList.length; i++) {
                    if(taskList[i].select) {
                        let index = listMask.findIndex(item => item.summary === taskList[i].summary)
                        listMask.splice(index, 1);
                        i--;
                    }
                }
                this.stateSetter(listMask);
        }

        this.setState({selectedElementsAvailable: false})
    }

    addTask() {
        let text = document.querySelector(".add__task-value").value;
        if(text.length === 0) {
            text = "Default task"
        }
        let obj = {
            summary: text,
            priority: false,
            ready: false,
            select: false
        }
        setTimeout(()=> text = "", 2000)
        let taskList = this.getList();
        let newState = [...taskList, obj];
        this.stateSetter(newState)
    }

    delTask(el) {
        let taskList = this.getList();
        const elIndex = this.indexSearcher(el)
        if(elIndex !== -1) {
            taskList.splice(elIndex, 1)
        }
        this.stateSetter(taskList);
    }

    getList() {
        let taskList = JSON.parse(localStorage.getItem('task'));
        if( taskList === null) {
            taskList = this.state.tasks;
        }
        return taskList;
    }

    indexSearcher(el) {
        const list = this.getList()
        return list.findIndex(item => item.summary === el.summary);
    }

    taskReady(el) {
        let taskList = this.getList();
        const elIndex = this.indexSearcher(el)
        if(elIndex !== -1) {
            taskList[elIndex].ready = !taskList[elIndex].ready;
        }
        this.stateSetter(taskList);
    }

    stateSetter(elements) {
        this.setState({tasks: elements}, () => {
            localStorage.setItem('task', JSON.stringify([...this.state.tasks]));
        });
    }

    prioritySetter(el) {
        let taskList = this.getList();
        const elIndex = this.indexSearcher(el);
        if(elIndex !== -1) {
            taskList[elIndex].priority = !taskList[elIndex].priority;
        }
        this.stateSetter(taskList);
    }

    toggleClass() {
        const currentButtonState = this.state.active;
        this.setState({active: !currentButtonState})
    }

    render() {
        return (
            <div className="content">
                <div className="menu">
                    <div onClick={this.delPickOutTasks} className={this.state.selectedElementsAvailable?"delElements available":"delElements"}/>
                    <span className="app__name"> Website todo </span>
                </div>
                <div className="task__board">
                    <div className="task__board-list">
                        <TaskList taskList={this.state.tasks}
                                  prioritySetter={this.prioritySetter}
                                  taskReady={this.taskReady}
                                  delTask={this.delTask}
                                  state={this.state}
                                  addTask={this.addTask}
                                  pickOutTask={this.pickOutTask}/>
                    </div>
                    <Button className={this.state.active ? 'add__button active': "add__button"} type="primary" onClick={this.toggleClass}> { (this.state.active)?"Cancel":"+ New task" } </Button>
                </div>
            </div>
        );
    }
}

export default TaskBoard;