<template>
  <div>
    <van-field :label="label"
               :placeholder="placeholder"
               :type="type"
               v-model="content"/>
  </div>
</template>

<script>
  export default {
    name: "LoginText",
    data() {
      return {
        content: ''
      }
    },
    props: ['label','placeholder','rule','type'],
    methods: {
      handlerulg() {
        const rule = new RegExp(this.rule)
        if (rule.test(this.content)){
          this.$emit('inputChange', this.content)
        }
      }
    },
    watch: {
      content() {
        this.handlerulg()
      }
    }

  }
</script>

<style scoped>

</style>