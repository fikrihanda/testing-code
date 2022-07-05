<template>
  <div class="ngm-s-content">
    <div class="d-flex">
      <b-link class="ml-auto ngm-bar-link" @click="$emit('close')">
        <fa-layers class="fa-fw">
          <fa :icon="['fas', 'xmark']" />
        </fa-layers>
      </b-link>
    </div>
    <div class="h-100 d-flex align-items-center">
      <form class="w-100" style="padding: 15px" @submit.prevent="onPush">
        <div class="text-center text-white" style="font-size: 20px; margin-bottom: 31px">
          Search
        </div>
        <b-input ref="input" v-model="search" class="ngm-input mb-3" />
        <b-button variant="ngm-2" class="w-100" type="submit">
          Search
        </b-button>
      </form>
    </div>
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
      this.search = 'Artist / Album / Title'
      this.$emit('close')
    }
  }
}
</script>
