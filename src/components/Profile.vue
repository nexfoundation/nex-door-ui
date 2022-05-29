<template>
    <div class='container'>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
        <h1>歡迎回來！</h1>
        <p>在這裡你可以編輯你的個人資料，以讓更多人更加了解你！</p>
        <code>{{ user_attributes }}</code>
        <div id='profile-form'>
            <form>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">用戶名稱 Username</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" :value="username">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" :value="user_attributes['email']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label">名稱 Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" placeholder="Name" :value="user_attributes['name']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputProfilePhoto" class="col-sm-2 col-form-label">個人頭像 Photo (Gravatar)</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputProfilePhoto" placeholder="205e460b479e2e5b48aec07710c08d50" :value="user_attributes['picture']">
                        <span class="help-block">(請輸入 Gravatar 的用戶號碼 - https://www.gravatar.com/avatar/<strong>205e460b479e2e5b48aec07710c08d50</strong>)</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputWebsite" class="col-sm-2 col-form-label">個人網站 Website</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputWebsite" placeholder="https://example.com" :value="user_attributes['website']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputCalendy" class="col-sm-2 col-form-label">開放其他人向你諮詢 Accept Mentoring</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="inputAcceptMentoring">
                            <option value="0" :selected="user_attributes['custom:accept_mentoring'] == 0">No</option>
                            <option value="1" :selected="user_attributes['custom:accept_mentoring'] == 1">Yes</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputCalendy" class="col-sm-2 col-form-label">個人預約連結 (Calendy)</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputCalendy" placeholder="https://calendly.com/<username>" :value="user_attributes['custom:calendy_url']">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputCalendy" class="col-sm-2 col-form-label">諮詢類別 Tags</label>
                    <div class="col-sm-10">
                      {{ user_attributes['custom:tags'] }}
                      <div class="tag-input">
                        <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            :autocomplete-items="availableMentoringTags"
                            @tags-changed="newTags => tags = newTags"
                        >
                            <template slot="autocomplete-header">
                                <strong>選擇你可以提供的諮詢項目</strong>
                            </template>
                        </vue-tags-input>

                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputProfileBio">個人簡介 Bio</label>
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
    import VueTagsInput from '@johmun/vue-tags-input';
    export default {
        name: 'home',
        components: {
            VueTagsInput,
        },
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
                user_attributes: undefined,
                errorMessage: undefined,
                tag: '',
                tags: [],
                availableMentoringTags: [
                  '稅務簽證',
                  '職涯發展',
                  '商業創業',
                  '租屋買房',
                  '旅行生活',
                  '人生相談',
                  '興趣分享',
                  '設計美學',
                  '海外婚姻',
                ],
            }
        },
        computed: {
            username() {
                return this.$store.state.user.username
            }
        },
        methods: {
            serializeTags(tags) {
                let serializedResult = []
                tags.forEach((item) => {
                    serializedResult.push(item['text'])
                })

                return serializedResult
            },
            async updateAttribute() {
                try {
                    let user = await this.$Amplify.Auth.currentAuthenticatedUser()
                    let result = await this.$Amplify.Auth.updateUserAttributes(user, {
                        'name': document.getElementById("inputName").value,
                        'picture': document.getElementById("inputProfilePhoto").value,
                        'profile': document.getElementById("inputProfileBio").value,
                        'website': document.getElementById("inputWebsite").value,
                        'custom:accept_mentoring': document.getElementById("inputAcceptMentoring").value,
                        'custom:tags': JSON.stringify(this.serializeTags(this.tags)),
                        'custom:calendy_url': document.getElementById("inputCalendy").value
                    })

                    console.log(result)

                    // Refresh local current user session and state
                    user = await this.$Amplify.Auth.currentAuthenticatedUser({ bypassCache: true })
                    this.$store.dispatch('setUser', user)
                    this.$router.push('/')
                } catch (err) {
                    console.log('error: ', err)
                    this.errorMessage = err
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
