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
                        <tr v-for="i in 11" :key="i">
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
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false"><i class="ti ti-dots-vertical"></i></button>
                                    <div class="dropdown-menu" style="">
                                        <a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-pencil me-1"></i> Edit</a>
                                        <a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-trash me-1"></i> Delete</a>
                                    </div>
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
