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
        label="用戶名稱"
        disabled
      />

      <BaseInput
        name="email"
        label="Email"
        disabled
      />

      <BaseInput
        id="name"
        label="名稱 (必填)"
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
        label="個人網站"
        name="website"
        placeholder="https://example.com"
      />
      <BaseInput
        id="linkedIn"
        label="LinkedIn"
        name="linkedIn"
        placeholder="https://www.linkedin.com/in/profile/"
        rules="validLinkedIn"
      />
      <BaseInput
        id="facebook"
        label="Facebook"
        name="facebook"
        placeholder="https://www.facebook.com/profile"
        rules="validFacebook"
      />
      <BaseInput
        id="instagram"
        label="Instagram"
        name="instagram"
        placeholder="https://www.instagram.com/profile"
        rules="validInstagram"
      />
      <BaseSelect
        id="acceptMentoring"
        name="acceptMentoring"
        label="開放其他人向你諮詢"
        help-text="若選「否」，您的資料將不會顯示在首頁"
        :options="[{ value: '0', text: '否' }, { value: '1', text: '是' }]"
      />

      <BaseSelect
        id="countryCode"
        help-text=""
        name="countryCode"
        label="國家"
        :options="countryOptions"
      />

      <!-- 這版先不用 Calendly -->
      <!-- <BaseInput
        id="calendlyUrl"
        name="calendlyUrl"
        label="個人預約連結"
        placeholder="https://calendly.com/<username>"
      > 
        <template #helpText>
          若選擇不提供 Calendly 連結，我們將提供您的 Email 給預約者跟您預約。
          <a
            class="link"
            href="https://calendly.com/"
          >Calendly 連結可從這申請</a>
        </template>
      </BaseInput> -->

      <!-- # May can use zoneinfo attribute instead -->
      <BaseInput
        id="timezone"
        label="時區"
        name="timezone"
        placeholder="UTC+8"
        rules="validTimezone"
      />

      <BaseInput
        id="available_time"
        label="開放預約時間"
        name="available_time"
        placeholder="Every Fri-Sat, 7-8 PM, 1st week of each month"
        rules="required"
      />

      <div class="form-control w-full max-w-md">
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
        class="btn btn-primary mt-2"
        :disabled="!meta.valid || isSubmitting"
      >
        更新
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

import jsonData from "../assets/country-iso-code-tw.json";

defineRule('required', required)
defineRule('maxFileSize', value => {
  if (value?.size > 1024*1024*5) { // 5mb
    return '頭像圖片尺寸不能超過 5MB'
  }
  return true
})
defineRule('validLinkedIn', value => {
  if (!value) {
    return true;
  }

  if (!value.startsWith('https://www.linkedin.com/in/')) {
    return 'LinkedIn 網址不正確'
  }
  return true
})
defineRule('validFacebook', value => {
  if (!value) {
    return true;
  }

  if (!value?.startsWith('https://www.facebook.com/')) {
    return 'Facebook 網址不正確'
  }
  return true
})
defineRule('validInstagram', value => {
  if (!value) {
    return true;
  }

  if (!value?.startsWith('https://www.instagram.com/')) {
    return 'Instagram 網址不正確'
  }
  return true
})

defineRule('validTimezone', value => {
  const regex = /^UTC([+-]\d{1,2})$/;
  if (!value) {
    return true;
  }

  if (!regex.test(value.trim())) {
    return '時區格式不正確';
  }

  return true;
})

const store = useStore()
const router = useRouter()

const appUserPictureServiceEndpoint = inject('appUserPictureServiceEndpoint')

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
    '海外留學',
  ],
})
// process country list
const countryOptions = Object.entries(jsonData.countries).map(
  ([key, value]) => ({
    value: key,
    text: value,
  })
);

const { username } = state.user
const {
  email,
  name,
  picture,
  profile,
  website,
  [UserAttributes.ACCEPT_MENTORING]: acceptMentoring,
  // [UserAttributes.CALENDLY_URL]: calendlyUrl,
  [UserAttributes.TAGS]: tags,
  [UserAttributes.LINKEDIN]: linkedIn,
  [UserAttributes.FACEBOOK]: facebook,
  [UserAttributes.INSTAGRAM]: instagram,
  [UserAttributes.COUNTRY_CODE]: countryCode,
  [UserAttributes.TIMEZONE]: timezone,
  [UserAttributes.AVAILABLE_TIME]: available_time,
} = state.user.attributes;

const formValues = {
  acceptMentoring: acceptMentoring || "0",
  // calendlyUrl: calendlyUrl || "",
  email: email || "",
  name: name || "",
  picture: picture || "",
  profile: profile || "",
  tags: tags ? JSON.parse(tags) : [],
  countryCode: countryCode || "",
  username,
  website: website || "",
  linkedIn: linkedIn || "",
  facebook: facebook || "",
  instagram: instagram || "",
  timezone: timezone || "",
  available_time: available_time || "",
};

async function onSubmit(values) {
  const data = {
    name: values.name,
    picture: values.picture,
    profile: values.profile,
    website: values.website,
    [UserAttributes.ACCEPT_MENTORING]: values.acceptMentoring,
    [UserAttributes.TAGS]: JSON.stringify(values.tags),
    [UserAttributes.COUNTRY_CODE]: values.countryCode,
    // [UserAttributes.CALENDLY_URL]: values.calendlyUrl,
    [UserAttributes.LINKEDIN]: values.linkedIn,
    [UserAttributes.FACEBOOK]: values.facebook,
    [UserAttributes.INSTAGRAM]: values.instagram,
    [UserAttributes.AVAILABLE_TIME]: values.available_time.trim(),
    [UserAttributes.TIMEZONE]: values.timezone.trim(),
  }


  if (values.pictureFile) {
    const file = values.pictureFile

    try {
      const url = `${appUserPictureServiceEndpoint}user/${username}/picture/${file.name}`
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
