<template>
  <div class="position-relative">
    <div class="ngm-bar">
      <div class="w-25">
        <b-link class="ngm-bar-link" @click="float.color = true">
          <fa-layers class="fa-fw">
            <fa :icon="['fas', 'bars']" />
          </fa-layers>
        </b-link>
      </div>
      <div class="w-100 d-flex justify-content-center align-items-center">
        <img class="ngm-bar-img" :src="require('~/assets/images/ngmusic.svg')" alt="ngmusic">
      </div>
      <div class="w-25 d-flex">
        <b-link class="ngm-bar-link ml-auto" @click="float.searching = true">
          <fa-layers class="fa-fw">
            <fa :icon="['fas', 'magnifying-glass']" />
          </fa-layers>
        </b-link>
      </div>
    </div>
    <div class="ngm-content">
      <div class="ngm-result">
        Search result for :
        <span>
          {{ $route.query.search }}
        </span>
      </div>
      <template v-for="(v, i) in listsPagi">
        <div :key="i" class="ngm-music-item">
          <div class="ngm-music-item-img">
            <img :src="v.artworkUrl100" :alt="v.collectionName">
            <fa :icon="['far', 'circle-play']" class="icon" />
          </div>
          <div class="ngm-music-item-content">
            <div class="ngm-music-item-artis">
              {{ v.artistName }}
            </div>
            <div class="h-100 ngm-music-item-title">
              {{ v.trackCensoredName }}
            </div>
            <div class="d-flex">
              <div class="badge badge-ngm">
                {{ v.primaryGenreName }}
              </div>
              <div class="ml-auto ngm-music-item-price">
                <fa-layers>
                  <fa :icon="['far', 'circle']" />
                  <fa :icon="['fas', 'dollar-sign']" transform="shrink-6" />
                </fa-layers>
                {{ v.collectionPrice }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="text-center">
        <b-button v-if="showMore" variant="ngm-load-more" @click="loadMore">
          Load More
        </b-button>
      </div>
    </div>
    <searching v-if="float.searching" @close="float.searching = false" />
    <color v-if="float.color" @close="float.color = false" />
  </div>
</template>

<script>
import Apple from '~/api/apple'
import Searching from '~/components/searching'
import Color from '~/components/color'

export default {
  components: { Searching, Color },
  data () {
    return {
      offset: 4,
      lists: [],
      float: {
        searching: false,
        color: false
      }
    }
  },
  async fetch () {
    try {
      const { results } = await Apple.getAll({
        search: this.$route.query.search
      })
      this.lists = results
    } catch (err) {
      this.lists = []
    }
  },
  computed: {
    listsPagi () {
      const clone = _.cloneDeep(this.lists)
      const offset = (1 - 1) * this.offset
      return _.drop(clone, offset).slice(0, this.offset)
    },
    showMore () {
      return this.listsPagi.length !== this.lists.length
    },
    query () {
      return _.cloneDeep(this.$route.query)
    }
  },
  watch: {
    async query () {
      try {
        const { results } = await Apple.getAll({
          search: this.query.search
        })
        this.lists = results
      } catch (err) {
        this.lists = []
      }
    }
  },
  methods: {
    loadMore () {
      if (!this.showMore) { return }
      this.offset = this.offset + 4
    }
  }
}
</script>
