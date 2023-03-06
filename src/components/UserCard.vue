<template>
  <div class="card card-bordered shadow-xl w-full">
    <div class="card-body">
      <div>
        <img :src="pictureUrl" class="mr-3">
        <div>
          <h5 class="mt-0">{{ name }} </h5>
          <div class="flex gap-2">
            <div class="badge" v-for="tag in tags" :key="tag">{{ tag }}</div>
          </div>
        </div>
      </div>
      <hr>
      <p>
        <button class="btn btn-primary mr-2"
          :disabled="!calendlyUrl"
          @click="openCalendly">預約</button>
        <button class="btn btn-secondary"
          :data-username="name"
          :data-userpicture="picture"
          :data-userid="id"
          :data-userUrl="website"
          @click="$('showIntroModal')">關於我</button>
      </p>
      <!-- {{ user['Username'] }} -->
      <p :id="`about-${sub}`">{{ profile }}</p>
      <!--code>{{ user['Attributes'] }}</code-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "user-card",
    props: ["user", "showIntroModal"],
    data() {
      const attributes = this.user.Attributes.reduce((result, a) => {
        result[a.Name] = a.Value;
        return result;
      }, {});

      return {
        attributes,
      };
    },
    computed: {
      id() {
        return this.attributes.sub;
      },
      pictureUrl() {
        return `https://www.gravatar.com/avatar/${this.attributes.picture}?s=80`;
      },
      name() {
        return this.attributes.name;
      },
      tags() {
        if (!this.attributes["custom:tags"]) {
          return;
        }

        return JSON.parse(this.attributes["custom:tags"]);
      },
      calendlyUrl() {
        if (!this.attributes["custom:calendy_url"]) {
          return;
        }
        return `https://calendly.com${this.attributes["custom:calendy_url"]}`;
      },
      website() {
        return this.attributes.website;
      },
      profile() {
        return this.attributes.profile;
      },
    },
    methods: {
      openCalendly() {
        window.open(this.calendlyUrl, "_blank");
      },
    },
  }
</script>