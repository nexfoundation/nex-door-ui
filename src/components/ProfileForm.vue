<template>
  <div>
    <div v-if="state.errorMessage" class="alert alert-error" role="alert">
      {{ state.errorMessage }}
    </div>
    <Form v-slot="{ meta, isSubmitting }" :initial-values="formValues" @submit="onSubmit">
      <div class="container shadow rounded-lg bordered bg-white p-9 space-y-3 [&>*]:w-full w-[520px] ">
        <h1 class="leading-normal self-stretch text-lg leading-tight font-bold">在此進行註冊或編輯資料</h1>

        <h2 class="py-0 px-1 font-medium mt-5">1. 基本資料</h2>
        <BaseInput name="username" label="用戶名稱" disabled data-required />
        <BaseInput name="email" label="Email" disabled data-required />
        <BaseInput id="name" label="名稱" name="name" placeholder="名稱" rules="required" data-required />
        <!-- TODO: experience field -->
        <BaseSelect id="countryCode" placeholder="選取國家" name="countryCode" label="所在國家" :options="countryOptions"
          data-required />
        <!-- avatar -->
        <div class="form-control mb-3">
          <label for="picture" class="label cursor-pointer ">
            <span class="label-text">
              個人頭像
            </span>
          </label>
          <Field v-slot="{ handleChange, handleBlur }" name="pictureFile" rules="maxFileSize">
            <input id="picture" type="file" accept="image/png, image/jpeg" class="file-input file-input-bordered  "
              @change="handleChange" @blur="handleBlur">
          </Field>
          <label class="label">
            <span class="label-text-alt text-error">
              <ErrorMessage name="pictureFile" />
            </span>
          </label>
        </div>

        <h2 class="py-0 px-1 leading-normal font-medium mt-5">2. 詳細資料</h2>
        <span>分享更多個人資訊，讓大家了解你！</span>
        <BaseInput id="linkedIn" label="LinkedIn" name="linkedIn" placeholder="https://www.linkedin.com/in/profile/"
          rules="validLinkedIn" />
        <BaseInput id="website" label="個人網站/blog" name="website" placeholder="https://www.portfolio.com" />
        <div class="form-control">
          <label class="label">
            <span class="label-text">諮詢類別</span>
          </label>
          <Field v-slot="{ field }" name="tags">
            <VueMultiselect v-bind="field" v-model="field.value" :options="state.options" :multiple="true"
              :close-on-select="false" placeholder="選取你可以提供諮詢的項目" />
            </Field>
            <BaseTextarea id="profileBio" name="profile" label="個人簡介 Bio" :rows="5" placeholder="中英文皆可，建議300字以內" />
        </div>
        <!-- # May can use zoneinfo attribute instead -->

        <h2 class="leading-normal font-medium !mt-5">3. 可預約時段</h2>
        <span>讓大家知道你的諮詢時段，請記得定期更新！</span>
        <BaseSelect id="acceptMentoring" name="acceptMentoring" label="是否開放預約諮詢" help-text="*若選否，您的資料將不被公開" data-required
          :options="[{ value: '0', text: '否' }, { value: '1', text: '是' }]" />
        <BaseInput id="timezone" label="所在時區" name="timezone" placeholder="例：美東夏日時間(EST)" />
        <BaseInput id="available_time" label="開放預約時間" name="available_time" placeholder="例：一月／週一到週五／16:00-19:00" />

        <button type="submit" class="btn btn-primary !mt-5 rounded-[6.25rem] disabled:bg-[#EEE] disabled:text-[#666666]" :disabled="!meta.valid || isSubmitting">
          更新
        </button>
      </div>
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
  if (value?.size > 1024 * 1024 * 5) { // 5MB
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
