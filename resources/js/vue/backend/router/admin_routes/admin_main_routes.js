import AdminDashboard from "../../views/AdminDashboard.vue"
import AdminLayout from "../../views/AdminLayout.vue"
import test from "./sub_routes/test";
export default {
    path: "/admin",
    component: AdminLayout,
    children: [
        {
            path: "",
            name: "AdminDashboard",
            component: AdminDashboard,
        },
        test,
    ],
};
