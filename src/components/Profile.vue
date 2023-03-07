<template>
    <div class="container my-20">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
        <h1 class="text-5xl font-bold leading-relaxed">歡迎回來！</h1>
        <p>在這裡你可以編輯你的個人資料，以讓更多人更加了解你！</p>

        <form @submit.prevent>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">用戶名稱 Username</span>
                </label>
                <input type="text" readonly class="input input-bordered input-disabled w-full max-w-xs" :value="form.username">
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="text" readonly class="input input-bordered input-disabled w-full max-w-xs" :value="form.email">
            </div>
            <div class="form-control">
                <label for="inputName" class="label">
                    <span class="label-text">名稱 Name (必填)</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs" id="inputName" placeholder="Name" v-model="form.name" required="required">
            </div>
            <div class="form-control">
                <label for="inputProfilePhoto" class="label">
                    <span class="label-text tooltip" data-tip="輸入 Gravatar 的用戶號碼 - https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50">個人頭像 Photo (Gravatar)</span>
                </label>
                    <input type="text" class="input input-bordered w-full max-w-xs" id="inputProfilePhoto" placeholder="205e460b479e2e5b48aec07710c08d50" v-model="form.picture">
                    <span class="help-block"></span>
            </div>
            <div class="form-control">
                <label for="inputWebsite" class="label">
                    <span class="label-text">個人網站 Website</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs" id="inputWebsite" placeholder="https://example.com" v-model="form.website">
            </div>
            <div class="form-control">
                <label for="inputCalendly" class="label">
                    <span class="label-text">開放其他人向你諮詢 Accept Mentoring</span>
                </label>
                <select class="select select-bordered w-full max-w-xs" id="inputAcceptMentoring" v-model="form.acceptMentoring">
                    <option :value="'0'">No</option>
                    <option :value="'1'">Yes</option>
                </select>
            </div>
            <div class="form-control">
                <label for="inputCalendly" class="label">
                    <span class="label-text">個人預約連結 (<a class="link" href="https://calendly.com/">Calendly</a>)</span>
                </label>
                <input type="text" class="input input-bordered w-full max-w-xs" id="inputCalendly" placeholder="https://calendly.com/<username>" v-model="form.calendlyUrl">
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">諮詢類別 Tags</span>
                </label>
                <vue-tags-input
                    v-model="form.tag"
                    :tags="form.tags"
                    :autocomplete-items="availableMentoringTags"
                    @tags-changed="newTags => form.tags = newTags"
                >
                    <template slot="autocomplete-header">
                        <strong>選擇你可以提供的諮詢項目</strong>
                    </template>
                </vue-tags-input>
            </div>
            <div class="form-control">
                <label for="inputProfileBio" class="label">
                    <span class="label-text">個人簡介 Bio</span>
                </label>
                <textarea class="textarea textarea-bordered max-w-md" id="inputProfileBio" rows="5" v-model="form.profile"></textarea>
            </div>
            <ValidateBtn
                :formArray="[form.name]"
                :disabled="isSubmitting"
                @click.native="updateAttribute"
                class="mt-4"
            >Update</ValidateBtn>
        </form>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ValidateBtn from './ValidateBtn.vue'

export default {
	name: 'profile',
	components: {
		VueTagsInput,
		ValidateBtn,
	},
	async created() {
        try {
            const user = await this.$Amplify.Auth.currentAuthenticatedUser();
            const { username } = user;
            const {
                email,
                name,
                picture,
                profile,
                website,
                'custom:accept_mentoring': acceptMentoring,
                'custom:calendly_url': calendlyUrl,
                'custom:tags': tags,
            } = user.attributes;

            this.user = user;
            this.form = {
                acceptMentoring: acceptMentoring || '0',
                calendlyUrl: calendlyUrl || '',
                email: email || '',
                name: name || '',
                picture: picture || '',
                profile: profile || '',
                tag: '',
                tags: JSON.parse(tags) || [],
                username,
                website: website || '',
            }

		} catch (err) {
			console.error(err)
		}
	},
	data() {
		return {
            user: {},
            form: {
                username: '',
                email: '',
                name: '',
                picture: '',
                website: '',
                acceptMentoring: 0,
                calendlyUrl: '',
                tag: '',
                tags: [],
                profile: '',
            },
			errorMessage: undefined,
			availableMentoringTags: [
				{ text: '稅務簽證' },
				{ text: '職涯發展' },
				{ text: '商業創業' },
				{ text: '租屋買房' },
				{ text: '旅行生活' },
				{ text: '人生相談' },
				{ text: '興趣分享' },
				{ text: '設計美學' },
				{ text: '海外婚姻' },
			],
            isSubmitting: false,
		}
	},
	methods: {
        parseTagValues() {
            return this.form.tags.map(t => t.text);
        },
		async updateAttribute() {
            this.isSubmitting = true;
			try {
                const data = {
                    name: this.form.name,
                    picture: this.form.picture,
                    profile: this.form.profile,
                    website: this.form.website,
					'custom:accept_mentoring': this.form.acceptMentoring,
					'custom:tags': JSON.stringify(this.form.tags),
					'custom:calendy_url': this.form.calendlyUrl,
                }

                await this.$Amplify.Auth.updateUserAttributes(this.user, data)

                // Refresh local current user session and state
                const user = await this.$Amplify.Auth.currentAuthenticatedUser({ bypassCache: true })
                this.$store.dispatch('setUser', user)
                this.$router.push('/')
			} catch (err) {
				console.error(err)
				this.errorMessage = err
                this.isSubmitting = false
			}
		}
	}
}
</script>
