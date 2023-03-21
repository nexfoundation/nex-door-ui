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


      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">諮詢類別</span>
        </label>
        <Field
          v-slot="{ field }"
          name="tags"
        >
          <VueMultiselect
            v-bind="field"
            v-model="field.value"
            :options="state.options"
            :multiple="true"
            :close-on-select="false"
            placeholder="選擇你可以提供的諮詢項目"
          />
        </Field>
      </div>

      <BaseTextarea
        id="profileBio"
        name="profile"
        label="個人簡介 Bio"
        :rows="5"
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
import VueMultiselect from 'vue-multiselect'
import { Field, Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import BaseInput from './base/BaseInput'
import BaseSelect from './base/BaseSelect'
import BaseTextarea from './base/BaseTextarea'

defineRule('required', required)

const store = useStore()
const router = useRouter()


const state = reactive({
  user: await Auth.currentAuthenticatedUser(),
  options: [
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
  errorMessage: '',
})

const { username } = state.user
const {
  email,
  name,
  picture,
  profile,
  website,
  'custom:accept_mentoring': acceptMentoring,
  'custom:calendly_url': calendlyUrl,
  'custom:tags': tags,
} = state.user.attributes

const formValues = {
  acceptMentoring: acceptMentoring || '0',
  calendlyUrl: calendlyUrl || '',
  email: email || '',
  name: name || '',
  picture: picture || '',
  profile: profile || '',
  tags: tags ? JSON.parse(tags) : [],
  username,
  website: website || '',
}

async function onSubmit(values) {
  try {
    const data = {
      name: values.name,
      picture: values.picture,
      profile: values.profile,
      website: values.website,
      'custom:accept_mentoring': values.acceptMentoring,
      'custom:tags': JSON.stringify(values.tags),
      'custom:calendy_url': values.calendlyUrl,
    }

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