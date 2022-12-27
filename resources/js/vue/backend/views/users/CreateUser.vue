<template>
    <div class="conatiner">
        <div class="card">
            <div class="card-header">
                <h4>
                    Create
                </h4>
                <div class="btns">
                    <router-link :to="{name:'AllUser'}" class="btn rounded-pill btn-outline-warning">
                        <i class="fa fa-arrow-left me-5px"></i>
                        Back
                    </router-link>
                </div>
            </div>
            <div class="card-body text-nowrap">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <form ref="form">
                            <div class="form-group d-grid gap-1 mb-2">
                                <label for="" class="text-capitalize">Name</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group d-grid gap-1 mb-2">
                                <label for="" class="text-capitalize">Email</label>
                                <input type="text" class="form-control">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card-footer text-center">
                <button @click.prevent="form_submit" class="btn btn-outline-info">
                    <i class="fa fa-upload"></i>
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created: function(){

    },
    methods: {
        form_submit: function(){
            console.log(this.$refs.form);
        }
    }
}
</script>

<style>

</style>
