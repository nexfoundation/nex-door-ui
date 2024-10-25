<template>
  <div ref="formContainer" class="card w-96 mx-auto shadow-xl">
    <div class="card-body">
      <h1 class="card-title">註冊</h1>
      <AuthSignUpFormCredential
        :error-message="state.errorMessage"
        @submit="signUp"
        @google-sign-in-error="state.errorMessage = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useI18n } from "../mixin/i18n";
import AuthSignUpFormCredential from "./AuthSignUpFormCredential.vue";
import { db, authForSignUp } from "../firebase-exports";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const emit = defineEmits(["sign-up-completed"]);

const { geti18nAuthenticationErrorMessage } = useI18n();

const $loading = useLoading();

const formContainer = ref(null);
const state = reactive({
  username: "",
  email: "",
  errorMessage: "",
});

async function signUp(form) {
  state.errorMessage = "";
  const loader = $loading.show({
    container: formContainer.value,
  });

  try {
    state.username = form.username;
    state.email = form.attributes.email;
    const userCredential = await createUserWithEmailAndPassword(
      authForSignUp,
      form.attributes.email,
      form.password,
    );
    const user = userCredential.user;
    await Promise.all([
      setDoc(doc(db, "userProfiles", user.uid), {
        uid: user.uid,
        email: user.email,
      }),
      sendEmailVerification(user),
    ]);
    emit("sign-up-completed");
  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message);
  } finally {
    loader.hide();
  }
}
</script>
