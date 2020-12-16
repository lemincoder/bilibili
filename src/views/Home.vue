<template>
  <div id="home">
    <NavBar/>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false">
          <div class="detailparent">
            <cover class="detailitem"
                   :detailitem="categoryitem"
                   v-for="(categoryitem,categoryindex) in item.list"
                   :key="categoryindex"/>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import Cover from "./Cover";

  export default {
    name: "Home",
    data() {
      return {
        active: 0,
        category: []
      }
    },
    components: {
      NavBar,
      Cover
    },
    methods: {
      async selectCategory() {
        const res = await this.$http.get('/category')
        this.changeCategory(res.data)
      },
      changeCategory(data) {
        const category1 = data.map((item,index) => {
          item.list = []
          item.page = 0
          item.pagesize = 10
          item.finished = false
          item.loading = false
          return item
        })
        this.category = category1
        this.selectArticle()
      },
      async selectArticle() {
        const categoryItem = this.categoryItem()
        const res = await this.$http.get('/detail/' + categoryItem._id,{
          params: {
            page: categoryItem.page,
            pagesize : categoryItem.pagesize
          }
        })
        categoryItem.list.push(...res.data)
        categoryItem.loading = false
        if (res.data.length < categoryItem.pagesize) {
          categoryItem.finished = true
        }
      },
      categoryItem() {
        const categoryItem = this.category[this.active]
        return categoryItem
      },
      onLoad() {
        const categoryitem = this.categoryItem()
        categoryitem.page += 1
        setTimeout(() => {
          this.selectArticle()
        }, 1000)
      }
    },
    watch: {
      active() {
        this.selectArticle()
      }
    },
    created() {
      this.selectCategory()
    },
  }
</script>

<style scoped lang="less">
  #home {
   background-color: #fff;
  }
.detailparent{
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
    margin: 5px 0;
  }
}
</style>