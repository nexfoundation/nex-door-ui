<template>
  <div>
    <div
      v-if="state.errorMessage"
      class="alert alert-error"
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


      <div class="form-control w-full max-w-xs">
        <label
          for="picture"
          class="label cursor-pointer"
        >
          <span class="label-text">
            個人頭像
          </span>
        </label>
        <Field
          v-slot="{ handleChange, handleBlur }"
          name="pictureFile"
          rules="maxFileSize"
        >
          <input
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            class="file-input file-input-bordered w-full max-w-xs"
            @change="handleChange"
            @blur="handleBlur"
          >
        </Field>
        <label class="label">
          <span class="label-text-alt text-error"><ErrorMessage name="pictureFile" /></span>
        </label>
      </div>

      <BaseInput
        id="website"
        label="個人網站 Website"
        name="website"
        placeholder="https://example.com"
      />
      <BaseInput
        id="linkedin"
        label="LinkedIn"
        name="linkedin"
        placeholder="https://www.linkedin.com/in/profile/"
      />
      <BaseInput
        id="facebook"
        label="Facebook"
        name="facebook"
        placeholder="https://www.facebook.com/profile"
      />
      <BaseInput
        id="instagram"
        label="Instagram"
        name="instagram"
        placeholder="https://www.instagram.com/profile"
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
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { inject, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import VueMultiselect from 'vue-multiselect'
import { ErrorMessage, Field, Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

import { UserAttributes } from '../constants'
import BaseInput from './base/BaseInput'
import BaseSelect from './base/BaseSelect'
import BaseTextarea from './base/BaseTextarea'

defineRule('required', required)
defineRule('maxFileSize', value => {
  if (value?.size > 1024*1024*5) { // 5mb
    return '頭像圖片尺寸不能超過 5MB'
  }
  return true
})

const store = useStore()
const router = useRouter()

const appServiceEndpoint = inject('appServiceEndpoint')


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
  [UserAttributes.ACCEPT_MENTORING]: acceptMentoring,
  [UserAttributes.CALENDLY_URL]: calendlyUrl,
  [UserAttributes.TAGS]: tags,
  [UserAttributes.LINKEDIN]: linkedIn,
  [UserAttributes.FACEBOOK]: facebook,
  [UserAttributes.INSTAGRAM]: instagram,
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
  linkedIn: linkedIn || '',
  facebook: facebook || '',
  instagram: instagram || '',
}

async function onSubmit(values) {
  const data = {
    name: values.name,
    picture: values.picture,
    profile: values.profile,
    website: values.website,
    [UserAttributes.ACCEPT_MENTORING]: values.acceptMentoring,
    [UserAttributes.TAGS]: JSON.stringify(values.tags),
    [UserAttributes.CALENDLY_URL]: values.calendlyUrl,
    // [UserAttributes.LINKEDIN]: values.linkedIn,
    // [UserAttributes.FACEBOOK]: values.facebook,
    // [UserAttributes.INSTAGRAM]: values.instagram,
  }


  if (values.pictureFile) {
    const file = values.pictureFile

    try {
      const url = `${appServiceEndpoint}user/${username}/picture/${file.name}`
      await axios({
        method: 'put',
        maxBodyLength: file.size,
        url,
        headers: {
          'Content-Type': file.type
        },
        data: file
      })
      data.picture = url

    } catch (err) {
      console.error(err)
      state.errorMessage = err
      return
    }
  }

  try {
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