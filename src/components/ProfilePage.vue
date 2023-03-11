<template>
  <div class="container my-20">
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <h1 class="text-5xl font-bold leading-relaxed">
      歡迎回來！
    </h1>
    <p>在這裡你可以編輯你的個人資料，以讓更多人更加了解你！</p>

    <form @submit.prevent>
      <div class="form-control">
        <label class="label">
          <span class="label-text">用戶名稱 Username</span>
        </label>
        <base-input v-model="form.username" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <base-input v-model="form.email" />
      </div>
      <div class="form-control">
        <label
          for="inputName"
          class="label"
        >
          <span class="label-text">名稱 Name (必填)</span>
        </label>
        <base-input
          id="inputName"
          v-model="form.name"
          placeholder="Name"
          required
        />
      </div>
      <div class="form-control">
        <label
          for="inputProfilePhoto"
          class="label"
        >
          <span
            class="label-text tooltip"
            data-tip="輸入 Gravatar 的用戶號碼 - https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          >個人頭像 Photo (Gravatar)</span>
        </label>
        <base-input
          v-model="form.picture"
          placeholder="205e460b479e2e5b48aec07710c08d50"
        />
        <span class="help-block" />
      </div>
      <div class="form-control">
        <label
          for="inputWebsite"
          class="label"
        >
          <span class="label-text">個人網站 Website</span>
        </label>
        <base-input
          id="inputWebsite"
          v-model="form.website"
          placeholder="https://example.com"
        />
      </div>
      <div class="form-control">
        <label
          for="inputCalendly"
          class="label"
        >
          <span class="label-text">開放其他人向你諮詢 Accept Mentoring</span>
        </label>
        <select
          id="inputAcceptMentoring"
          v-model="form.acceptMentoring"
          class="select select-bordered w-full max-w-xs"
        >
          <option :value="'0'">
            No
          </option>
          <option :value="'1'">
            Yes
          </option>
        </select>
      </div>
      <div class="form-control">
        <label
          for="inputCalendly"
          class="label"
        >
          <span class="label-text">個人預約連結 (<a
            class="link"
            href="https://calendly.com/"
          >Calendly</a>)</span>
        </label>
        <base-input
          id="inputCalendly"
          v-model="form.calendlyUrl"
          placeholder="https://calendly.com/<username>"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">諮詢類別 Tags</span>
        </label>
        <VueTagsInput
          v-model="form.tag"
          :tags="form.tags"
          :autocomplete-items="availableMentoringTags"
          @tags-changed="newTags => form.tags = newTags"
        >
          <template #auto-complete>
            <strong>選擇你可以提供的諮詢項目</strong>
          </template>
          />
        </vuetagsinput>
      </div>
      <div class="form-control">
        <label
          for="inputProfileBio"
          class="label"
        >
          <span class="label-text">個人簡介 Bio</span>
        </label>
        <textarea
          id="inputProfileBio"
          v-model="form.profile"
          class="textarea textarea-bordered max-w-md"
          rows="5"
        />
      </div>
      <ValidateBtn
        :form-array="[form.name]"
        :disabled="isSubmitting"
        class="mt-4"
        @click="updateAttribute"
      >
        Update
      </ValidateBtn>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import VueTagsInput from '@sipec/vue3-tags-input';
import BaseInput from './base/BaseInput.vue';
import ValidateBtn from './base/BaseValidateBtn.vue'

// helper functions for converting tag values to VueTagsInput format
const cleanupTagValue = t => t.text;
const wrapTagValue = t => ( { text: t });

export default {
	name: 'ProfilePage',
	components: {
        VueTagsInput,
        BaseInput,
        ValidateBtn,
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
	async created() {
        try {
            const user = await Auth.currentAuthenticatedUser();
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
                tags: tags ? JSON.parse(tags).map(wrapTagValue) : [],
                username,
                website: website || '',
            }

		} catch (err) {
			console.error(err)
		}
	},
	methods: {
		async updateAttribute() {
            this.isSubmitting = true;
			try {
                const data = {
                    name: this.form.name,
                    picture: this.form.picture,
                    profile: this.form.profile,
                    website: this.form.website,
					'custom:accept_mentoring': this.form.acceptMentoring,
					'custom:tags': JSON.stringify(this.form.tags.map(cleanupTagValue)),
					'custom:calendy_url': this.form.calendlyUrl,
                }

                await Auth.updateUserAttributes(this.user, data)

                // Refresh local current user session and state
                const user = await Auth.currentAuthenticatedUser({ bypassCache: true })
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
