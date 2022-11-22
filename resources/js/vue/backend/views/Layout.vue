<template>
    <div>
        <h1>
            header
            <ul>
                <li>
                    <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'settingProfile' }">settingProfile</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'settingPassword' }">settingPassword</router-link>
                </li>
            </ul>
        </h1>
        <router-view></router-view>
        <h1>footer</h1>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>
