<template>
  <div class="dao--all">
    <ul v-if="dataList && dataList.length > 0"> 
      <template v-for="item in dataList">
        <router-link tag="li" :to="{path: `/dao/v${item.id}`}" class="vote--list" :key="`vote_list_${item.id}`">
          <div class="vote--list_top">
            <div class="creator">
              <em class="avatar"></em>
              <span>Vibranium Created</span>
            </div>
            <label 
              class="vote--list_tag"
              :class="{started: item.state == 2, ended: item.state == 3, unstart: item.state == 4}"
            >
              <span v-if="item.state==2">{{$t('vote.status.started')}}</span>
              <span v-if="item.state==3" >{{$t('vote.status.ended')}}</span>
              <span v-if="item.state==4" >{{$t('vote.status.unstart')}}</span>
            </label>
          </div>
          <h3 class="vote--list_title">{{item.name}}</h3>
          <article class="vote--list_ctn">{{item.content}}</article>
          <div class="vote--list_bottom">
            <div v-if="item.state == 2">
              <label> End Time: </label>
              <span>{{item.endDate}}</span>  
            </div>
            <div v-if="item.state == 3 && item.attributes && item.attributes[0]">
              <i class="el-icon-check"></i>
              <label class="optionsName">{{item.attributes[0].name}}</label>
              <span>-</span>
              <span>{{item.attributes[0].vote_vbn_complete }}</span>
              <span>VBN</span>
            </div>
          </div>
        </router-link>
      </template>
      <el-pagination
        layout="prev, pager, next"
        :current-page="pageOption.page"
        :page-size="pageOption.page_size"
        :total="pageOption.total"
        :hide-on-single-page="true"
        @current-change="getData"  
      />
    </ul>
    <cus-nodata v-else />
  </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      'account': 'account'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden',
      authentication: 'authentication',
    })
  },
  created() {
    this.getData()
  },
  data() {
    return {
      dataList: null,
      pageOption: {},
      serverTime: ''
    }
  },
  watch: {
    '$i18n.locale'(n) {
      this.getData()
    },
  },
  methods: {
    async getData(page) {
      if(this.loadingWarden.includes('voteList')) return false
      const page_ = page?page:1
      try {
        const res = await this.$http('voteList', {eth_address:this.account, page:page_, state:1})
        if(res && res.code == 200) {
          // this.dataList = res.data.list
          this.serverTime = res.data.current_time
          this.pageOption = {...res.data.page}
          this.dataList = this.dataListManager(res.data.list)
        }
      } catch (err) {
        console.log(err)
      }
    },
    dataListManager(arr) {
      arr.forEach(item => {
        // console.log(item)
        const st = this.serverTime
        item.endDate = moment(item.end_time*1000).format('MMMM Do YYYY, h:mm:ss a')
      })
      return arr
    },
    pageOptionsManager(options) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(vote) {

  @include e(list) {
    padding: 30px 50px;
    border: 1px solid $--color-white-04;
    background-color: $--color-bg-block;
    margin-bottom: 20px;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    cursor: pointer;
    &:hover {
      background-color: $--color-white-01;
      border-color: $--color-primary;
    }
    @include m(top) {
      position: relative;
      margin-bottom: 15px;
      .avatar {
        height: 30px;
        width: 30px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        background-color: $--color-black;
        margin-right: 12px;
      }
      span {
        font-size: 14px;
        vertical-align: middle;
      }
    }

    @include m(tag) {
      position: absolute;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      top: 50%;
      right: 0;
      padding: 12px 22px;
      line-height: 100%;
      background-color: rgba(#97A8BD, 0.5);
      color: $--color-white;
      &.started {
        background-color: rgba($--color-primary-dark, 0.5);
        color: $--color-primary;
      }
      &.unstart {
        background-color: rgba(#725B2D, 0.5);
        color: #E8A92D;
      }
    }

    @include m(title) {
      font-size: 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 15px;
    }

    @include m(ctn) {
      font-size: 14px;
      line-height: 150%;
      margin-bottom: 24px;
      min-height: 3em;
      word-break: break-all;
    }

    @include m(bottom) {
      font-size: 14px;
      i {
        height: 1em;
        width: 1em;
        background: $--color-aqua;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 5px;
        color: $--color-black;
      }
      label {
        display: inline-block;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $--color-white-04;
        padding: 0 2px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        white-space: nowrap;
        padding: 0 2px;
      }
    }
  }

}
</style>