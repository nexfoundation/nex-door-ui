<template>
  <div class="container ">

    <div class="headings">
      <h1 text-align="left">關於 NEX Door</h1>
      <h2>串連世界各地的專家 解決各種疑難雜症</h2>
    </div>
    <!-- <hr /> -->

    <card>
      <p>
        NEX Door
        是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。讓台灣人陪著台灣人在國際路上打開第一扇門或衝刺最後一哩路。
      </p>
      <p>
        「今日的路人是明日的引路人」，延續 Give and Take
        的精神，讓我們啟動正向迴圈，幫助更多台灣人走向世界，讓回家的路變得更好。
      </p>
    </card>

    <hr />

    <article class="container-fluid " aria-busy="true" v-if="loading"></article>
    <!-- <progress value="25" max="100" v-if="loading" indeterminate="true"></progress> -->
    <div class="">
      <article class=" col-sm-4 col-md-2" v-for="user in users" :key="user.id">
        <!-- <article class=" col-md-8 "> -->

          <div class="card-body" :set="(user_attributes = getAttribute(user['Attributes']))">
            <div class="media">
            <img :src="
              'https://www.gravatar.com/avatar/' +
              user_attributes['picture'] +
              '?s=80'
            " class="mr-3" />
            <div class="media-body">
              <h5 class="mt-0">{{ user_attributes["name"] }}</h5>
              {{ user_attributes["custom:tags"] }}
            </div>
          </div>
          <hr />
          <div class="grid">
            <button :href="user_attributes['custom:calendy_url']" :disabled="!user_attributes['custom:calendy_url']"
              class="btn btn-success">預約</button>
              <button :data-username="user_attributes['name']" :data-userpicture="user_attributes['picture']"
              :data-userid="user_attributes['sub']" @click="showIntroModal">關於我</button>
            </div>
            <!-- {{ user['Username'] }} -->
            <p class="card-text" :id="'about-' + user_attributes['sub']">
              {{ user_attributes["profile"] }}
            </p>
            <!--code>{{ user['Attributes'] }}</code-->
          </div>
        <!-- </article> -->
      </article>
    </div>

    <b-modal ref="my-modal" id="modal" title="關於我">
      <div class="media">
        <img :src="
          'https://www.gravatar.com/avatar/' +
          modalCurrentUser['picture'] +
          '?s=80'
        " class="mr-3" />
        <div class="media-body">
          <h5 class="mt-0">{{ modalCurrentUser["name"] }}</h5>
        </div>
      </div>
      <hr />
      <pre class="intro">{{ intro }}</pre>
    </b-modal>
  </div>
</template>

<script>
import { API } from "aws-amplify";
// import {  } from "pi";
export default {
  name: "home",
  created() {
    this.loading = true
    // this.$vm.indeterminate-progress.indeterminate = true
    this.getData();
  },
  data() {
    return {
      users: undefined,
      intro: "",
      modalCurrentUser: { name: "", picture: "" },
      loading: false
    };
  },
  methods: {
    showIntroModal(e) {
      let userid = e.currentTarget.getAttribute("data-userid");

      this.modalCurrentUser["name"] =
        e.currentTarget.getAttribute("data-username");
      this.modalCurrentUser["picture"] =
        e.currentTarget.getAttribute("data-userpicture");

      this.intro = document.getElementById("about-" + userid).innerHTML;

      this.$refs["my-modal"].show();
    },
    getAttribute(user_attributes) {
      let attributes = {};
      for (let i of user_attributes) {
        attributes[i["Name"]] = i["Value"];
      }


      this.loading = false
      return attributes;
    },
    getData() {
      const apiName = "ServiceEndpoint";
      const path = "/query";
      const myInit = {
        // OPTIONAL
        headers: {}, // OPTIONAL
      };

      API.get(apiName, path, myInit)
        .then((response) => {
          this.users = response;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
