import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      name: null,
      description: null,
      targetValue: null,
      thumbnail: null
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.account.principal.user
    })
  },
  methods: {
    ...mapActions({
      create: 'api/post'
    }),
    onFileUpload (event) {
      this.thumbnail = event[0]
    },
    async submit () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('ownerId', this.user._id)
      formData.append('targetValue', this.targetValue)
      formData.append('file', this.thumbnail, this.thumbnail.name)

      await this.create({
        url: `/projects/create`,
        data: formData
      })
    }
  }
}
