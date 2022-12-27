import userLayout from '../../views/users/Layout'
import AllUser from '../../views/users/AllUser'
import CreateUser from '../../views/users/CreateUser'
import EditUser from '../../views/users/EditUser'
import DetailsUser from '../../views/users/DetailsUser'

export default {
    path: 'user',
    component: userLayout,
    props: {role_permissions: ['super_admin']},
    children: [{
            path: '',
            name: 'AllUser',
            component: AllUser,
        },
        {
            path: 'create',
            name: 'CreateUser',
            component: CreateUser,
        },
        {
            path: 'edit/:id',
            name: 'EditUser',
            component: EditUser,
        },
        {
            path: 'details/:id',
            name: 'DetailsUser',
            component: DetailsUser,
        },
    ],

};
