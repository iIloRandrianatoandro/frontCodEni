import { createBrowserRouter } from 'react-router-dom'
import Residence from '@/routes/Judgement/Create/components/Residence/Residence'
import {
    Dashboard,
    Login,
    Root,
    Judgement,
    Create,
    History,
} from '@/routes'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import { Role } from '@/features/admin/types'



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
                        path: 'create/residence-crt/:citizenId',
                        element: <Residence />,
                    },
                    {
                        path: 'history',
                        element: <History />,
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
        element: <Login />,
    },
])

export default router
