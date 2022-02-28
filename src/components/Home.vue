<template>
    <div class='container'>
        <h1>Welcome to your App</h1>
        <p>Amplify your apps. Build on a flexible, scalable, and reliable serverless backend.</p>
        <div class="card-columns">
            <div class="card" v-for="user in users">
                <div class="card-body">
                    <div class="media">
                        <img src="http://via.placeholder.com/64x64" class="mr-3">
                        <div class="media-body">
                            <h5 class="mt-0">{{ user['Username'] }}</h5>
                            Profile-1, Profile-2
                        </div>
                    </div>
                    <p class="card-text"><code>{{ JSON.stringify(user['Attributes']) }}</code></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
export default {
    name: 'home',
    created() {
        this.getData()
    },
    data () {
        return { users: undefined }
    },
    methods: {
        getData() {
            const apiName = 'ServiceEndpoint'
            const path = '/query'
            const myInit = { // OPTIONAL
                headers: {}, // OPTIONAL
            };

            API.get(apiName, path, myInit)
                .then(response => {
                    this.users = response
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }
}
</script>

<style scoped>
    .container {
        padding-top: 80px;
        /* width: 800px; */
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .container h1 {
        margin-bottom: 0px;
    }
    .container p {
        font-size: 18px;
        text-align: left;
    }
</style>
