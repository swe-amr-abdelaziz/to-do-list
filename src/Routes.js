import { createBrowserRouter } from 'react-router-dom';

import Root from './Pages/Root/Root';
import Error from './Pages/Error/Error';
import ToDoList from './Pages/ToDoList/ToDoList';
import ToDoDetails from './Pages/ToDoDetails/ToDoDetails';
import ToDoCreate from './Pages/ToDoCreate/ToDoCreate';
import ToDoEdit from './Pages/ToDoEdit/ToDoEdit';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <ToDoList />
            },
            {
                path: "to-do-list",
                element: <ToDoList />
            },
            {
                path: "to-do-list/:id",
                element: <ToDoDetails />
            },
            {
                path: "create-to-do",
                element: <ToDoCreate />
            },
            {
                path: "edit-to-do/:id",
                element: <ToDoEdit />
            },
        ]
    }
]);

export default Routes;