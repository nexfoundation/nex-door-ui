<template>
  <div>
    <div
      v-if="state.errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ state.errorMessage }}
    </div>
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
        id="picture"
        name="picture"
        label="個人頭像 Photo (Gravatar)"
        placeholder="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      >
        <template #label>
          個人頭像 Photo (<a
            class="link"
            href="https://www.gravatar.com/"
          >Gravatar</a>)
        </template>
      </BaseInput>

      <BaseInput
        id="website"
        label="個人網站 Website"
        name="website"
        placeholder="https://example.com"
      />
      <BaseSelect
        id="acceptMentoring"
        name="acceptMentoring"
        label="開放其他人向你諮詢 Accept Mentoring"
        :options="[{ value: '0', text: 'No' }, { value: '1', text: 'Yes' }]"
      />

      <BaseInput
        id="calendlyUrl"
        name="calendlyUrl"
        label="個人預約連結 (Calendly)"
        placeholder="https://calendly.com/<username>"
      >
        <template #label>
          個人預約連結 (<a
            class="link"
            href="https://calendly.com/"
          >Calendly</a>)
        </template>
      </BaseInput>

      <!-- <div class="form-control">
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
      </div> -->
      <BaseTextarea
        id="profileBio"
        name="profile"
        label="個人簡介 Bio"
        rows="5"
      />
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!meta.valid || isSubmitting"
      >
        Update
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
// import VueTagsInput from '@sipec/vue3-tags-input'
import BaseInput from './base/BaseInput'
import BaseSelect from './base/BaseSelect'
import BaseTextarea from './base/BaseTextarea'

defineRule('required', required)

const store = useStore()
const router = useRouter()



// helper functions for converting tag values to VueTagsInput format
// const cleanupTagValue = t => t.text;
// const wrapTagValue = t => ( { text: t });

const state = reactive({
  user: await Auth.currentAuthenticatedUser(),
  errorMessage: '',
})

const { username } = state.user;
const {
  email,
  name,
  picture,
  profile,
  website,
  'custom:accept_mentoring': acceptMentoring,
  'custom:calendly_url': calendlyUrl,
  // 'custom:tags': tags,
} = state.user.attributes;

const formValues = {
  acceptMentoring: acceptMentoring || '0',
  calendlyUrl: calendlyUrl || '',
  email: email || '',
  name: name || '',
  picture: picture || '',
  profile: profile || '',
  tag: '',
  // tags: tags ? JSON.parse(tags).map(wrapTagValue) : [],
  username,
  website: website || '',
}

// const availableMentoringTags = reactive([
//   { text: '稅務簽證' },
//   { text: '職涯發展' },
//   { text: '商業創業' },
//   { text: '租屋買房' },
//   { text: '旅行生活' },
//   { text: '人生相談' },
//   { text: '興趣分享' },
//   { text: '設計美學' },
//   { text: '海外婚姻' },
// ])

async function onSubmit(values) {

  try {
    const data = {
      name: values.name,
      picture: values.picture,
      profile: values.profile,
      website: values.website,
      'custom:accept_mentoring': values.acceptMentoring,
      // 'custom:tags': JSON.stringify(values.tags.map(cleanupTagValue)),
      'custom:calendy_url': values.calendlyUrl,
    }

    // const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(state.user, data)

    // Refresh local current user session and state
    store.dispatch('setUser', await Auth.currentAuthenticatedUser({ bypassCache: true }))
    router.push('/')
  } catch (err) {
    console.error(err)
    state.errorMessage = err
  }
}
</script>