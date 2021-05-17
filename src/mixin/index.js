import store from '@/store'
export default {
  methods: {
    checkPermission(pointsName) {
      return store.getters.roles && store.getters.roles.points.includes(pointsName)
    }
  }
}
