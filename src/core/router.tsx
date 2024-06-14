import { createBrowserRouter } from 'react-router-dom'
import Residence from '@/routes/Judgement/Create/components/Residence/Residence'
import {
    Dashboard,
    Login,
    Root,
    Judgement,
    Create,
    Update,
    Details,
    History,
    List,
} from '@/routes'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import { Role } from '@/features/admin/types'
import { Launch } from '@/routes/Judgement/Launch'
import { Examinate } from '@/routes/Judgement/Examinate'
import Fruitless from '@/routes/Judgement/Fruitless/Fruitless'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,

        children: [
            {
                element: (
                    // <PrivateRoute roles={[Role.ADMIN, Role.CENTRAL]}>
                    <Dashboard />
                    // </PrivateRoute>
                ),
                index: true,
            },
            {
                path: 'judgement',
                children: [
                    {
                        element: <Judgement />,
                        index: true,
                    },
                    {
                        path: 'create',
                        element: <Create />,
                    },
                    {
                        path: 'update/:judgementRequestId',
                        element: <Update />,
                    },
                    {
                        path: 'details/:judgementRequestId',
                        element: <Details />,
                    },
                    {
                        path: 'list',
                        element: <List />,
                    },
                    {
                        path: 'history',
                        element: <History />,
                    },
                    {
                        path: 'launch/:judgementRequestId',
                        element: <Launch />,
                    },
                    {
                        path: 'examinate/:judgementRequestId',
                        element: <Examinate />,
                    },
                    {
                        path: 'fruitlessSearch/:judgementRequestId',
                        element: <Fruitless />,
                    },
                ],
            },

            // {
            //     path: 'admin',
            //     children: [
            //         {
            //             element: (
            //                 // <PrivateRoute roles={[Role.ADMIN]}>
            //                 //     <Admin />
            //                 // </PrivateRoute>
            //             ),
            //             index: true,
            //         },
            //     ],
            // },
        ],
    },
    {
        path: '/login',
        element: <Residence />,
    },
])

export default router
