<template>
    <div class="conatiner">
        <div class="card list_card">
            <div class="card-header">
                <h4>
                    Light Table head
                </h4>
                <div class="search">
                    <form action="#">
                        <input class="form-control" placeholder="search..." type="search">
                    </form>
                </div>
                <div class="btns">
                    <permission-button
                        :permission="'can_create'"
                        :to="'CreateUser'"
                        :classList="'btn rounded-pill btn-outline-info'">
                        <i class="fa fa-pencil me-5px"></i>
                        Create
                    </permission-button>
                </div>
            </div>
            <div class="table-responsive card-body text-nowrap">
                <table class="table table-hover table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th aria-label="id">Id</th>
                            <th>Project</th>
                            <th>Client</th>
                            <th>Users</th>
                            <th>Status</th>
                            <th aria-label="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        <tr v-for="i in 10" :key="i">
                            <td>{{ i }}</td>
                            <td>
                                <i class="fab fa-facebook-f text-info me-3"></i>
                                <strong>React Project</strong>
                            </td>
                            <td>Barry Hunter</td>
                            <td>
                                <!-- <img src="/avatar.jpg" style="height:30px;" alt="Avatar" class="rounded-circle" /> -->
                            </td>
                            <td><span class="badge bg-label-success me-1">Completed</span></td>
                            <td>
                                <div class="table_actions">
                                    <a href="#" class="btn btn-sm btn-outline-secondary">
                                        <i class="fa fa-gears"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="'#/'"
                                                :classList="''">
                                                <i class="fa text-secondary fa-eye"></i>
                                                Details
                                            </permission-button>
                                        </li>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="'#/'"
                                                :classList="''">
                                                <i class="fa text-warning fa-pencil"></i>
                                                Edit
                                            </permission-button>
                                        </li>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="'#/'"
                                                :classList="''">
                                                <i class="fa text-danger fa-trash"></i>
                                                Delete
                                            </permission-button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer py-1 border-top-0">
                <nav aria-label="Page navigation" class="d-inline-block">
                    <ul class="pagination mb-0">
                        <li class="page-item prev">
                            <a class="page-link waves-effect" href="javascript:void(0);"><i class="tf-icon fs-6 ti ti-chevrons-left"></i></a>
                        </li>
                        <li class="page-item">
                            <a class="page-link waves-effect" href="javascript:void(0);">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link waves-effect" href="javascript:void(0);">2</a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link waves-effect" href="javascript:void(0);">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link waves-effect" href="javascript:void(0);">4</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link waves-effect" href="javascript:void(0);">5</a>
                        </li>
                        <li class="page-item next">
                            <a class="page-link waves-effect" href="javascript:void(0);"><i class="tf-icon fs-6 ti ti-chevrons-right"></i></a>
                        </li>
                    </ul>
                </nav>
                <div class="show-limit d-inline-block">
                    <span>Limit:</span>
                    <select name="" id="">
                        <option v-for="i in [10,25,50,100]" :key="i" :value="i">
                            {{ i }}
                        </option>
                    </select>
                </div>
                <div class="show-limit d-inline-block">
                    <span>Total:</span>
                    <span>100</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PermissionButton from '../components/PermissionButton.vue'
export default {
    components: { PermissionButton },

}
</script>

<style>

</style>

PermissionButton
