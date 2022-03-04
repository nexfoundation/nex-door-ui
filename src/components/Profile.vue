<template>
    <div class='container'>
        <h1>Yo, {{ username }}</h1>
        <p>Amplify your apps. Build on a flexible, scalable, and reliable serverless backend.</p>
        <code>{{ user_attributes }}</code>
        <div id='profile-form'>
            <form>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" :value="user_attributes['email']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" placeholder="Name" :value="user_attributes['name']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputProfilePhoto" class="col-sm-2 col-form-label">Profile photo (Gravatar)</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputProfilePhoto" placeholder="205e460b479e2e5b48aec07710c08d50" :value="user_attributes['picture']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputWebsite" class="col-sm-2 col-form-label">Website</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputWebsite" placeholder="https://example.com" :value="user_attributes['website']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputCalendy" class="col-sm-2 col-form-label">Calendy</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputCalendy" placeholder="https://calendly.com/<username>" :value="user_attributes['custom:calendy_url']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputProfileBio">Bio</label>
                    <textarea class="form-control" id="inputProfileBio" rows="3" v-model="user_attributes['profile']"></textarea>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button class="btn btn-primary" v-on:click="updateAttribute">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        async beforeCreate() {
            try {
                let user = await this.$Amplify.Auth.currentAuthenticatedUser()
                let { attributes } = user

                console.log(attributes)
                this.user_attributes = attributes
            } catch (err) {
                console.log('error: ', err)
            }
        },
        data() {
            return {
                user_attributes: undefined
            }
        },
        computed: {
            username() {
                return this.$store.state.user.username
            }
        },
        methods: {
            async updateAttribute() {
                try {
                    let user = await this.$Amplify.Auth.currentAuthenticatedUser()
                    let result = await this.$Amplify.Auth.updateUserAttributes(user, {
                        'name': document.getElementById("inputName").value,
                        'picture': document.getElementById("inputProfilePhoto").value,
                        'profile': document.getElementById("inputProfileBio").value,
                        'website': document.getElementById("inputWebsite").value,
                        'custom:calendy_url': document.getElementById("inputCalendy").value
                    })

                    console.log(result)

                    // Refresh local current user session and state
                    user = await this.$Amplify.Auth.currentAuthenticatedUser({ bypassCache: true })
                    this.$store.dispatch('setUser', user)
                    this.$router.push('home')
                } catch (err) {
                    console.log('error: ', err)
                }
            }
        }
    }
</script>

<style scoped>
    #profile-form {
        width: 100%;
    }
    .container {
        padding-top: 80px;
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
    .container textarea {
        text-align: left;
    }
</style>
