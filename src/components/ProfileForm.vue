<template>
  <Form
    v-slot="{ meta, isSubmitting }"
    :initial-values="formValues"
    @submit="onSubmit"
  >
    <BaseInput
      name="username"
      label="用戶名稱 Username"
      disabled
    />


    <BaseInput
      name="email"
      label="Email"
      disabled
    />

    <BaseInput
      id="name"
      label="名稱 Name (必填)"
      name="name"
      placeholder="Name"
      required
      rules="required"
    />

    <BaseInput
      name="picture"
      label="個人頭像 Photo (Gravatar)"
      placeholder="205e460b479e2e5b48aec07710c08d50"
    />
    <!-- <span
        class="label-text tooltip"
        data-tip="輸入 Gravatar 的用戶號碼 - https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      >個人頭像 Photo (Gravatar)</span> -->

    <BaseInput
      id="website"
      label="個人網站 Website"
      name="website"
      placeholder="https://example.com"
    />
    <div class="form-control">
      <label
        for="inputCalendly"
        class="label"
      >
        <span class="label-text">開放其他人向你諮詢 Accept Mentoring</span>
      </label>
      <select
        id="cceptMentoring"
        v-model="acceptMentoring"
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


    <!-- <span class="label-text">個人預約連結 (<a
            class="link"
            href="https://calendly.com/"
          >Calendly</a>)</span> -->
    <BaseInput
      id="calendlyUrl"
      label="個人預約連結"
      name="calendlyUrl"
      placeholder="https://calendly.com/<username>"
    />

    <div class="form-control">
      <label class="label">
        <span class="label-text">諮詢類別 Tags</span>
      </label>
      <VueTagsInput
        v-model="tag"
        :tags="tags"
        :autocomplete-items="availableMentoringTags"
        @tags-changed="newTags => tags = newTags"
      >
        <template #auto-complete>
          <strong>選擇你可以提供的諮詢項目</strong>
        </template>
        />
      </vuetagsinput>
    </div>
    <div class="form-control">
      <label
        for="profileBio"
        class="label"
      >
        <span class="label-text">個人簡介 Bio</span>
      </label>
      <textarea
        id="profileBio"
        v-model="profile"
        class="textarea textarea-bordered max-w-md"
        rows="5"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      :disabled="!meta.valid || isSubmitting"
    >
      Update
    </button>
  </Form>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { reactive } from 'vue'
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import VueTagsInput from '@sipec/vue3-tags-input'
import BaseInput from './base/BaseInput'

const user = await Auth.currentAuthenticatedUser();


defineRule('required', required)

// helper functions for converting tag values to VueTagsInput format
const cleanupTagValue = t => t.text;
const wrapTagValue = t => ( { text: t });

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

const formValues = {
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

const availableMentoringTags = reactive([
  { text: '稅務簽證' },
  { text: '職涯發展' },
  { text: '商業創業' },
  { text: '租屋買房' },
  { text: '旅行生活' },
  { text: '人生相談' },
  { text: '興趣分享' },
  { text: '設計美學' },
  { text: '海外婚姻' },
])

async function onSubmit() {
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
  }
}
</script>