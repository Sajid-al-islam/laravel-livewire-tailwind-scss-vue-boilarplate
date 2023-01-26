<template>
    <div class="conatiner">
        <div class="card list_card">
            <div class="card-header">
                <h4>
                    All Users
                    <small v-if="get_selected_users.length">
                        &nbsp; selected:
                        <b class="text-warning">
                            {{ get_selected_users.length }}
                        </b>
                        &nbsp;
                        <b @click="set_clear_selected_users()" class="text-danger cursor-pointer">clear</b>
                        &nbsp;
                        <b @click="set_show_selected(true)" class="text-success cursor-pointer">show</b>
                    </small>
                </h4>
                <div class="search">
                    <form action="#">
                        <input @keyup="set_users_search_key($event.target.value)" class="form-control border border-info" placeholder="search..." type="search">
                    </form>
                </div>
                <div class="btns d-flex gap-2 align-items-center">
                    <permission-button
                        :permission="'can_create'"
                        :to="'CreateUser'"
                        :classList="'btn rounded-pill btn-outline-info'">
                        <i class="fa fa-pencil me-5px"></i>
                        Create
                    </permission-button>
                    <div class="table_actions">
                        <a href="#" @click.prevent="()=>''" class="btn px-1 btn-outline-secondary">
                            <i class="fa fa-list"></i>
                        </a>
                        <ul>
                            <li>
                                <a href="" @click.prevent="export_all()">
                                    <i class="fa-regular fa-hand-point-right"></i>
                                    Export All
                                </a>
                            </li>
                            <li v-if="get_selected_users.length">
                                <a href="" @click.prevent="export_selected_csv()">
                                    <i class="fa-regular fa-hand-point-right"></i>
                                    Export Selected
                                </a>
                            </li>
                            <li>
                                <a href="" @click.prevent="()=>''">
                                    <i class="fa-regular fa-hand-point-right"></i>
                                    Import
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="table-responsive card-body text-nowrap">
                <table class="table table-hover table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th><input @click="set_select_all_users()" type="checkbox" class="form-check-input"></th>
                            <user-table-th :sort="true" :ariaLable="'id'" :tkey="'id'" :title="'ID'" />
                            <user-table-th :sort="true" :tkey="'photo'" :title="'Photo'" />
                            <user-table-th :sort="true" :tkey="'first_name'" :title="'Name'" />
                            <user-table-th :sort="true" :tkey="'email'" :title="'Email'" />
                            <user-table-th :sort="true" :tkey="'mobile_number'" :title="'Mobile NO'" />
                            <user-table-th :sort="true" :tkey="'status'" :title="'Status'" />
                            <th aria-label="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        <tr v-for="item in get_users.data" :key="item.id">
                            <td>
                                <input v-if="check_if_user_is_selected(item)" :data-id="item.id" checked @change="set_selected_users(item)" type="checkbox" class="form-check-input">
                                <input v-else @change="set_selected_users(item)" type="checkbox" class="form-check-input">
                            </td>
                            <td>{{ item.id }}</td>
                            <td>
                                <img :src="`${item.photo_url}`" style="height:30px;" alt="Avatar" class="rounded-circle" />
                            </td>
                            <td >
                                <span class="text-warning cursor_pointer" @click.prevent="set_user(item)">
                                    {{ item.first_name }} {{ item.last_name }}
                                </span>
                            </td>
                            <td>{{ item.email }}</td>
                            <td>
                                {{ item.mobile_number }}
                            </td>
                            <td>
                                <span v-if="item.status == 1" class="badge bg-label-success me-1">active</span>
                                <span v-if="item.status == 0" class="badge bg-label-success me-1">deactive</span>
                            </td>
                            <td>
                                <div class="table_actions">
                                    <a href="#" @click.prevent="()=>''" class="btn btn-sm btn-outline-secondary">
                                        <i class="fa fa-gears"></i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="" @click.prevent="set_user(item)">
                                                <i class="fa text-info fa-eye"></i>
                                                Quick View
                                            </a>
                                        </li>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="''"
                                                :classList="''">
                                                <i class="fa text-secondary fa-eye"></i>
                                                Details
                                            </permission-button>
                                        </li>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="''"
                                                :classList="''">
                                                <i class="fa text-warning fa-pencil"></i>
                                                Edit
                                            </permission-button>
                                        </li>
                                        <li>
                                            <permission-button
                                                :permission="'can_edit'"
                                                :to="''"
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
                <div class="d-inline-block">
                    <pagination :data="get_users" :limit="5" :size="'small'" :show-disabled="true" :align="'left'"
                        @pagination-change-page="set_users_page">
                        <span slot="prev-nav"><i class="fa fa-angle-left"></i> Previous</span>
                        <span slot="next-nav">Next <i class="fa fa-angle-right"></i></span>
                    </pagination>
                </div>
                <div class="show-limit d-inline-block">
                    <span>Limit:</span>
                    <select @change.prevent="set_users_paginate($event.target.value)">
                        <option v-for="i in [10,25,50,100]" :key="i" :value="i">
                            {{ i }}
                        </option>
                    </select>
                </div>
                <div class="show-limit d-inline-block">
                    <span>Total:</span>
                    <span>{{ get_users.total }}</span>
                </div>
            </div>
        </div>

        <details-user-canvas/>
        <selected-user-canvas/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import PermissionButton from '../components/PermissionButton.vue'
import UserTableTh from './components/UserTableTh.vue';
import DetailsUserCanvas from './DetailsUserCanvas.vue';
import SelectedUserCanvas from './SelectedUserCanvas.vue';
export default {
    components: { PermissionButton, UserTableTh, DetailsUserCanvas, SelectedUserCanvas },
    created: function(){
        this.fetch_users();
    },
    methods: {
        ...mapActions(['fetch_users']),
        ...mapMutations([
            'set_users_paginate',
            'set_users_page',
            'set_users_search_key',
            'set_users_orderByCol',
            'set_user',
            'set_selected_users',
            'set_select_all_users',
            'set_clear_selected_users',
            'check_if_user_is_selected',
            'set_show_selected',
            'export_all',
            'export_selected_csv',
        ]),

        check_if_user_is_selected: function(user){
            let check_index = this.get_selected_users.findIndex((i) => i.id == user.id);
            if(check_index >= 0){
                return true;
            }else{
                return false;
            }
        },
    },
    computed: {
        ...mapGetters([
            'get_users',
            'get_selected_users'
        ]),
    }
}
</script>

<style>

</style>

PermissionButton
