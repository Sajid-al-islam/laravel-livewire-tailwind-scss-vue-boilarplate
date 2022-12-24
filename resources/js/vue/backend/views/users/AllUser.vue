<template>
    <div class="conatiner">
        <div class="card list_card">
            <div class="card-header">
                Light Table head
            </div>
            <div class="table-responsive card-body text-nowrap">
                <table class="table table-hover table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>Project</th>
                            <th>Client</th>
                            <th>Users</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        <tr v-for="i in 10" :key="i">
                            <td>
                                <i class="fab fa-facebook-f text-info me-3"></i>
                                <strong>React Project</strong>
                            </td>
                            <td>Barry Hunter</td>
                            <td>
                                <img src="/avatar.jpg" style="height:30px;" alt="Avatar" class="rounded-circle" />
                            </td>
                            <td><span class="badge bg-label-success me-1">Completed</span></td>
                            <td>
                                <div class="table_actions">
                                    <a href="#" class="btn btn-sm btn-outline-secondary">
                                        <i class="fa fa-gears"></i>
                                    </a>
                                    <ul>
                                        <li v-for="i in 5" :key="i">
                                            <a href="#/module/details/1" class="">
                                                <i class="fa text-primary fa-list"></i>
                                                module details
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer py-1">
                <nav aria-label="Page navigation">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
