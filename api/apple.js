export default {
  async getAll (data = {}) {
    const { $axios } = $nuxt
    try {
      const res = await $axios.$get('/search', {
        params: {
          term: encodeURIComponent(data.search),
          enitity: 'music'
        }
      })
      console.log(res)
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
