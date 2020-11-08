import React from 'react';
import Form from "antd/es/form/Form";
import {Input} from "antd";

function TaskList({taskList, prioritySetter, taskReady, delTask, state, addTask, pickOutTask}) {
    const elements = taskList.map((element) => {
        if(!element.ready) {
            return (
                <li className={element.select?"task select":"task"}>
                    <span className="select__button" onClick={()=> pickOutTask(element)}/>
                    <div onClick={()=> prioritySetter(element)} className={element.priority ? "priority high" : "priority"}/>
                    {element.summary}
                    <div className="task__buttons">
                        <img onClick={()=> taskReady(element)} src={'./assets/images/ready.png'} alt="ready"/>
                        <img onClick={()=> delTask(element)} src={'./assets/images/delete.png'} alt="delete"/>
                    </div>
                </li>
            )
        }

        return (
            <li className="ready__task task">
                {element.summary}
                <div className="task__buttons">
                    <img onClick={()=> taskReady(element)} src={'./assets/images/refresh.png'} alt="refresh"/>
                    <img src={'./assets/images/delete.png'} alt="delete"/>
                </div>
            </li>
        )

    });
    return (
        <ul>
            {elements}
            <Form className={state.active ? 'add__task-form active': "add__task-form"}>
                <Input className="add__task-value"/>
                <img onClick={()=> {addTask()}} className="accept" src={'./assets/images/checked.png'} alt=""/>
            </Form>
        </ul>
    )

}

export default TaskList;