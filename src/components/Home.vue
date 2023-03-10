<template>
    <div class="container my-20">
        <article class="prose mx-auto my-12">
            <h1>關於 NEX Door</h1>
            <span>串連世界各地的專家 解決各種疑難雜症</span>
            <hr>
            <p>NEX Door 是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。讓台灣人陪著台灣人在國際路上打開第一扇門或衝刺最後一哩路。</p>
            <p>「今日的路人是明日的引路人」，延續 Give and Take 的精神，讓我們啟動正向迴圈，幫助更多台灣人走向世界，讓回家的路變得更好。</p>
            <hr>
        </article>


        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12" v-if="users">
            <HomeCard
                v-for="user in users"
                :key="user.id"
                :user="user"
                :show-intro-modal="showIntroModal"
            />
        </div>

        <div class="modal" ref="my-modal" id="modal" title="關於我">
            <div>
                <img :src="'https://www.gravatar.com/avatar/' + modalCurrentUser['picture'] + '?s=80'" class="mr-3">
                <div>
                    <h5 class="mt-0">{{ modalCurrentUser['name'] }} </h5>
					<p>網站:<a :href="modalCurrentUser['website']">{{ modalCurrentUser['website'] }}</a></p>
                </div>
            </div>
            <hr>
            <pre>
				<!-- <p v-for="(str, idx) in this.intro" :key="idx">{{str}}</p> -->
				<intro-text v-for="(str, idx) in this.intro" :key="idx" :str="str"/>
			</pre>
        </div>
    </div>
</template>

<script>
import { API } from 'aws-amplify';
import HomeCard from './HomeCard.vue';
export default {
    name: 'home',
    async created() {
        const apiName = 'ServiceEndpoint'
        const path = '/query'
        const myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
        };

        try {
            console.log('start fetching');
            const response = await API.get(apiName, path, myInit);
            this.users = response;
        } catch(error) {
            console.error(error);
        }
	},
	components: {
        HomeCard,
	},
    data() {
        return {
            users: undefined,
            intro: [],
            modalCurrentUser: {'name': '', 'picture': '', website: ''}
        }
    },
    methods: {
        showIntroModal(e) {
            const userid = e.currentTarget.getAttribute('data-userid')

            this.modalCurrentUser['name'] = e.currentTarget.getAttribute('data-username')
            this.modalCurrentUser['picture'] = e.currentTarget.getAttribute('data-userpicture')
			this.modalCurrentUser['website'] = e.currentTarget.getAttribute('data-userUrl')

			// this.intro = document.getElementById('about-' + userid).innerHTML
			this.intro = document.getElementById(`about-${userid}`).innerHTML.split('\n')
			this.$refs['my-modal'].show()
        },
    }
}
</script>
