import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {useSelector, useDispatch} from "react-redux";
import {Provider} from "react-redux";
import {getErrors} from "./store/errors";
import configureStore from "./store/store";
import {titleChanged, deletedTask, completeTask, getTasks, loadTasks, getTasksLoadingStatus, createTasks} from "./store/task";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getErrors());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(deletedTask(taskId));
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
                        <button onClick={() => changeTitle(el.id)}>Change title</button>
                        <button onClick={() => deleteTask(el.id)}>Delete task</button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => dispatch(createTasks())}>Create new task</button>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
