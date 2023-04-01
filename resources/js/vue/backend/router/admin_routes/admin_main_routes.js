import AdminDashboard from "../../views/AdminDashboard.vue"
import AdminLayout from "../../views/AdminLayout.vue"
export default {
    path: "/admin",
    component: AdminLayout,
    children: [
        {
            path: "",
            name: "AdminDashboard",
            component: AdminDashboard,
        },
    ],
};
