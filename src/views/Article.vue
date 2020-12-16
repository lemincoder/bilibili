<template>
  <div id="article" v-if="model">
    <nav-bar/>
    <div class="video">
      <video controls="controls" :src="model.content"></video>
    </div>
    <div class="videoinfo">
      <div class="videotitle" >
        <p>{{model.category.title}}</p>
        <p>{{model.name}}</p>
      </div>
      <div class="detailinfo">
        <span>{{model.userinfo.name}}</span>
        <span>12.1w人观看</span>
        <span>524条弹幕</span>
        <span>{{model.date}}</span>
      </div>
    </div>
    <div class="encourage">
      <p @click="collectionClick" :class="{collection: isCollection}">
        <span class="icon-star-full"></span>
        <span>收藏</span>
      </p>
      <p @click="scriptionClick" :class="{scription: isScription}">
        <span class="icon-bubble"></span>
        <span>关注</span>
      </p>
      <p>
        <span class="icon-redo2"></span>
        <span>分享</span>
      </p>
    </div>
    <div class="detailparent">
      <cover class="detailitem"
             :detailitem="categoryitem"
             v-for="(categoryitem,categoryindex) in commend"
             :key="categoryindex"/>
    </div>
    <comment-title @mainpublish="successPost" ref="commentIpt" :length="len"/>
    <comment @itemPublic="itemPublic" @publishClick="postChildClick" ref="comment" @commentlength="res => len = res"/>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import Cover from "./Cover";
  import CommentTitle from "../components/content/comment/CommentTitle";
  import Comment from "../components/content/comment/Comment";

  export default {
    name: "Article",
    components: {
      NavBar,
      Cover,
      CommentTitle,
      Comment
    },
    data() {
      return {
        model: null,
        commend: null,
        len: null,
        Postcom: {
          comment_content: '',
          comment_date: '',
          parent_id: null,
          article_id: null,
          comment_id: null
        },
        isCollection: null,
        isScription: null
      }
    },
    methods: {
      async articleitemData() {
        const res = await this.$http.get('/article/' + this.$route.params.id)
        this.model = res.data[0]
        if (this.model) {
          this.scriptionInit()
        }
      },
      async commendData() {
        const res = await  this.$http.get('/commend')
        this.commend = res.data
      },
      async successPost(content) {
        this.Postcom.comment_content = content
        let date = new Date()
        let m = date.getMonth() + 1;
        let d = date.getDate()
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        let str = m + '-' + d
        this.Postcom.comment_date = str
        this.Postcom.article_id = this.$route.params.id
        const res = await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.Postcom)
        this.$refs.comment.commentData()
        this.Postcom.parent_id = null
        this.$refs.commentIpt.clearContent()
        if (res.status == 200) {
          this.$msg.fail('评论发表成功')
        }
      },
      postChildClick(id) {
        this.Postcom.parent_id = id
        this.$refs.commentIpt.focusIpt()
      },
      itemPublic(id) {
        this.Postcom.parent_id = id
        this.$refs.commentIpt.focusIpt()
      },
      async collectionClick() {
        if (localStorage.getItem('token')) {
          const res = await this.$http.post('/collection/' + localStorage.getItem('id'), {
            article_id: this.$route.params.id
          })
          if (res.data.msg == '收藏成功') {
            this.isCollection = true
          }else {
            this.isCollection = false
          }
        }
        this.$msg.fail(res.data.msg)
      },
      async collectionInit() {
        if (localStorage.getItem('token')) {
          const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
            params: {
              article_id: this.$route.params.id
            }
          })
          this.isCollection = res.data.success
        }
      },
      async scriptionClick() {
        if (localStorage.getItem('token')) {
          const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), {
            sub_id: this.model.userid
          })
          if (res.data.msg == '关注成功') {
            this.isScription = true
          }else {
            this.isScription = false
          }
          this.$msg.fail(res.data.msg)
        }
      },
      async scriptionInit() {
        if (localStorage.getItem('token')) {
          const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
            params: {
              sub_id: this.model.userid
            }
          })
          this.isScription = res.data.success
        }
      }
    },
    created() {
      this.articleitemData()
      this.commendData()
      this.collectionInit()
    },
    watch: {
      $route() {
        this.articleitemData()
        this.commendData()
      }
    }
  }
</script>

<style scoped lang="less">
#article {
  background-color: white;
}
.video {
  width: 100%;
  >video {
    width: 100%;
  }
}
.videoinfo {
  margin-top: 8px;
  padding: 0px 5px;
  .videotitle {
    font-size: 15px;
    display: flex;
    align-items: center;
    p:first-child {
      font-size: 13px;
      padding: 2px 5px;
      background-color: #f4f4f4;
      border-radius: 5px;
      color: hotpink;
    }
  }
  >p:nth-child(2) {
    font-size: 12px;
    padding:5px 10px;
  }
  .detailinfo {
    margin-top: 10px;
    span {
      font-size: 12px;
      color: #aaaaaa;
      margin-right: 15px;
    }
    span:first-child {
      color: black;
      font-size: 13px;
    }
  }
}
  .encourage {
    display: flex;
    margin: 10px 0 0 20px;
    justify-content: space-between;
    .collection, .scription {
      color: hotpink;
    }
    p {
      display: flex;
      align-items: center;
      color: gray;
      font-size: 13px;
      margin-right: 20px;
      span:nth-child(1) {
        font-size: 21px;
        padding-right: 8px;
      }
    }
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