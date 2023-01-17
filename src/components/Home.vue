<template>
    <div class='container'>

        <h1>關於 NEX Door</h1>
        <span>串連世界各地的專家 解決各種疑難雜症</span>

        <hr>

        <blockquote>
            <p>NEX Door 是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。讓台灣人陪著台灣人在國際路上打開第一扇門或衝刺最後一哩路。</p>
            <p>「今日的路人是明日的引路人」，延續 Give and Take 的精神，讓我們啟動正向迴圈，幫助更多台灣人走向世界，讓回家的路變得更好。</p>
        </blockquote>

        <hr>

        <div class="card-columns">
            <div class="card" v-for="user in users" :key="user.id">
                <div class="card-body" :set="user_attributes = getAttribute(user['Attributes'])">
                    <div class="media">
                        <img :src="'https://www.gravatar.com/avatar/' + user_attributes['picture'] + '?s=80'" class="mr-3">
                        <div class="media-body">
                            <h5 class="mt-0">{{ user_attributes['name'] }} </h5>
                            {{ user_attributes['custom:tags'] }}
                        </div>
                    </div>
                    <hr>
                    <p>
                        <a :href="user_attributes['custom:calendy_url']" :disabled="! user_attributes['custom:calendy_url']" class="btn btn-success">預約</a>
                        &nbsp;
                        <b-button :data-username="user_attributes['name']" 
								:data-userpicture="user_attributes['picture']" 
								:data-userid="user_attributes['sub']" 
								:data-userUrl="user_attributes['website']"
								@click="showIntroModal">關於我</b-button>
                    </p>
                    <!-- {{ user['Username'] }} -->
                    <p class="card-text" :id="'about-' + user_attributes['sub']">{{ user_attributes['profile'] }}</p>
                    <!--code>{{ user['Attributes'] }}</code-->
                </div>
            </div>
        </div>

        <b-modal ref="my-modal" id="modal" title="關於我">
            <div class="media">
                <img :src="'https://www.gravatar.com/avatar/' + modalCurrentUser['picture'] + '?s=80'" class="mr-3">
                <div class="media-body">
                    <h5 class="mt-0">{{ modalCurrentUser['name'] }} </h5>
					<p>網站:<a :href="modalCurrentUser['website']">{{ modalCurrentUser['website'] }}</a></p>
                </div>
            </div>
            <hr>
            <!-- <pre class="intro">{{ intro }}</pre> -->
            <pre class="intro">
				<!-- <p v-for="(str, idx) in this.intro" :key="idx">{{str}}</p> -->
				<intro-text v-for="(str, idx) in this.intro" :key="idx" :str="str"/>
			</pre>
        </b-modal>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
import IntroText from './IntroText';
export default {
    name: 'home',
    created() {
        this.getData()
	},
	components: {
		IntroText
	},
    data () {
        // return { users: undefined, intro: '', modalCurrentUser: {'name': '', 'picture': '', website: ''} }
        return { users: undefined, intro: [], modalCurrentUser: {'name': '', 'picture': '', website: ''} }
	},
    methods: {
        showIntroModal(e) {
			console.log(e.currentTarget)
			// console.log(website)
            let userid = e.currentTarget.getAttribute('data-userid')

            this.modalCurrentUser['name'] = e.currentTarget.getAttribute('data-username')
            this.modalCurrentUser['picture'] = e.currentTarget.getAttribute('data-userpicture')
			this.modalCurrentUser['website'] = e.currentTarget.getAttribute('data-userUrl')

			// this.intro = document.getElementById('about-' + userid).innerHTML
			this.intro = document.getElementById('about-' + userid).innerHTML.split('\n')
			this.$refs['my-modal'].show()

			console.log(e.currentTarget)
        },
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
    .card-text {
        height: 4.6em;
        width: 15em;
        overflow: hidden;
    }
    pre.intro {
        text-align: left;
    }
</style>
