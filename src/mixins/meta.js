export default {
  watch: {
		siteConfig (v) {
			if (v) document.title = v.siteTitle ? v.siteTitle : ''
		}
  },

  mounted () {
    this.setMeta()
  },

  methods: {
    setMeta () {
			let title = this.siteConfig && this.siteConfig.siteTitle
			if (typeof document === 'undefined') return
			if (title) document.title = title
    }
  }
}
