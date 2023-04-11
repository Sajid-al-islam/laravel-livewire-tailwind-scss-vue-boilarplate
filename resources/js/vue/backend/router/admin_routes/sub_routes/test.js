import AdminTestLayout from '../../../views/admin/test/Layout'
import AdminTestPage1 from '../../../views/admin/test/Page1'
import AdminTestPage2 from '../../../views/admin/test/Page2'
export default {
    path: 'test',
    component: AdminTestLayout,
    props: {
        role_permissions: ['admin'],
        layout_title: 'Management',
    },
    children: [{
            path: '',
            name: 'AdminTestPage1',
            component: AdminTestPage1,
        },
        {
            path: 'test2',
            name: 'AdminTestPage2',
            component: AdminTestPage2,
        },
    ],
};
