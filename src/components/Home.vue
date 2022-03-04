<template>
    <div class='container'>
        <h1>Welcome to your App</h1>
        <p>Amplify your apps. Build on a flexible, scalable, and reliable serverless backend.</p>
        <div class="card-columns">
            <div class="card" v-for="user in users">
                <div class="card-body" :set="user_attributes = getAttribute(user['Attributes'])">
                    <div class="media">
                        <img :src="'https://www.gravatar.com/avatar/' + user_attributes['picture'] + '?s=80'" class="mr-3">
                        <div class="media-body">
                            <h5 class="mt-0">{{ user_attributes['name'] }} </h5>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </div>
                    </div>
                    <hr>
                    <p><a :href="user_attributes['custom:calendy_url']" :disabled="! user_attributes['custom:calendy_url']" class="btn btn-success">Make an appointment</a></p>
                    <p class="card-text">
                        {{ user['Username'] }}
                        {{ user_attributes['profile'] }}
                    </p>
                    <code>{{ user['Attributes'] }}</code>
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
        getAttribute(user_attributes) {
            let attributes = {};
            for(let i of user_attributes){
                attributes[i["Name"]] = i["Value"];
            }

            return attributes;
        },
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
