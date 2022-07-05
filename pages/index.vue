<template>
  <div class="ngm-nos-background">
    <div class="h-100 ngm-nos-logo">
      <img :src="require('~/assets/images/logo.svg')" alt="logo">
    </div>
    <form class="ngm-nos-search" @submit.prevent="onPush">
      <b-input ref="input" v-model="search" class="ngm-input mb-3" />
      <b-button variant="ngm" class="w-100" type="submit">
        Search
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: 'Artist / Album / Title'
    }
  },
  mounted () {
    this.$refs.input.$el.addEventListener('focus', this.inputFocus)
    this.$refs.input.$el.addEventListener('blur', this.inputBlur)
  },
  beforeDestroy () {
    this.$refs.input.$el.removeEventListener('focus', this.inputFocus)
    this.$refs.input.$el.removeEventListener('blur', this.inputBlur)
  },
  methods: {
    inputFocus () {
      if (this.search === 'Artist / Album / Title') {
        this.search = ''
      }
    },
    inputBlur () {
      if (this.search === '') {
        this.search = 'Artist / Album / Title'
      }
    },
    onPush () {
      this.$router.push({
        path: '/lists',
        query: {
          search: this.search
        }
      })
    }
  }
}
</script>
