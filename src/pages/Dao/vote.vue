<template>
  <div class="dao--vote">
    <!-- detail -->
    <!-- <router-link :to="{name: 'dao_list'}">tetttt</router-link> -->
    <el-row :gutter="30" v-if="voteData">
      <el-col :sm="15">
        <section class="vote">
          <h2 class="vote--hd">
            {{voteData.name}}
          </h2>
          <div class="vote--hd_tags">
            <label 
s              :class="{started: voteData.state==2, ended: voteData.state==3, unstart: voteData.state==4}"
            >
              <span v-if="voteData.state==2">{{$t('vote.status.started')}}</span>
              <span v-if="voteData.state==3" >{{$t('vote.status.ended')}}</span>
              <span v-if="voteData.state==4" >{{$t('vote.status.unstart')}}</span>
            </label>
          </div>
          <article class="vote--desc" v-html="voteData.content"></article>
        </section>

        <!-- vote -->
        <dao-block class="vote" v-if="voteData.state == 2 || voteData.state == 4">
          <div slot="hd">{{$t('vote.detail.block2Title')}}</div>
          <ul class="vote--options">
            <li 
              v-for="(item, idx) in voteData.attributes" 
              :class="{active: optionIdx == item.attribute_id}"
              :key="`vote_options_${idx}`" 
              @click="optionSelect(item.attribute_id)">
              {{item.name}}
            </li>
            <cus-btn-ein
              class="vote--options_btn"
              :disabled="voteData.join_state||loadingWarden.includes('voteStore') || voteData.state == 4"
              @click.native="voting"
            >
              <span v-if="loadingWarden.includes('voteStore') || loadingWarden.includes('voteDetail')">Loading...</span>
              <span v-else-if="voteData.join_state==0">{{$t('vote.detail.btn')}}</span>
              <span v-else>{{$t('vote.detail.btn2')}}</span>
            </cus-btn-ein>
          </ul>
        </dao-block> 

        <!-- record -->
        <dao-block class="vote" v-if="voteData.state == 2 || voteData.state == 3">
          <div slot="hd">{{$t('vote.detail.block3Title')}}<span>{{totalAmount}}</span></div>
          <div class="vote--record" v-if="recordList && recordList.length > 0">
            <template v-for="(item, idx) in recordList">
              <el-row :key="`dsaf_${idx}`" >
                <el-col :xs="7" :sm="7">{{item.eth_address | addressFormat}}</el-col>
                <el-col :xs="10" :sm="10" :style="{textAlign: 'center'}" >{{item.name}}</el-col>
                <el-col :xs="7" :sm="7" :style="{textAlign: 'right'}" >{{item.vote_vbn_complete}} VBN</el-col>
              </el-row>
            </template>
            <div class="vote--record_btm">
              <el-pagination
                layout="prev, pager, next"
                :current-page="recordPageOptions.page"
                :page-size="recordPageOptions.page_size"
                :total="recordPageOptions.total" 
                @current-change="getVoteRecords"  
              />
            </div>
          </div>
          <cus-nodata v-else />
        </dao-block> 

      </el-col>
      <el-col :sm="9">
        <!-- creator infomation -->
        <dao-block class="vote">
          <div slot="hd">{{$t('vote.detail.block4Title')}}</div>
          <div class="vote--infomation">
            <template v-for="(item, idx) in creator" >
              <el-row :key="`info_${idx}`">
                <el-col :xs="8" :sm="8" class="name" >{{$t(`vote.${idx}`)}}</el-col>
                <el-col :xs="16" :sm="16" >{{item}}</el-col>
              </el-row>
            </template>
          </div>
        </dao-block>
        <!-- creator infomation -->
        <dao-block class="vote" v-if="voteData">
          <div slot="hd">{{$t('vote.detail.block5Title')}}</div>
          <div class="vote--progress">
            <template v-for="(item, idx) in voteData.attributes">
              <cus-progress 
                class="pg" 
                :key="`progeress_item_${idx}`" 
                :label="item.name" 
                :progress="item.vote_vbn_complete/totalAmount || 0" 
                :append="item.vote_vbn_complete"
              />
            </template>
          </div>
        </dao-block>
      </el-col>
    </el-row>
    <cus-nodata v-else />
  </div>
</template>

<script>
import moment from 'moment'
import daoBlock from './components/blocks'
import {addressFormat} from '@/utils/tools'
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
  filters: {
    addressFormat: addressFormat
  },
  components: {daoBlock},
  data() {
    return {
      voteData: null,
      voteOptions: [],
      creator: {
        creator: 'Vibranium',
        system: 'Vote',
        currency: 'VBN',
        start: '--',
        end: '--',
        total: '--'
      },
      recordList: null,
      recordPageOptions: {
        page: 1,
        page_size: 0,
        total: 0
      },
      totalAmount: 0,
      optionIdx: null
    }
  },
  watch: {
    '$i18n.locale'(n) {
      this.init()
    },
    'authentication'(n) {
      this.init()
    }
  },
  created() {
    if (!this.$route.params || !/\d/g.test(this.$route.params.pathMatch)) return false
    if(!this.authentication) return false

    this.init()
  },
  methods: {
    init() {
        this.getDetails()
        this.getVoteRecords()
    },
    async getDetails() {
      if(this.loadingWarden.includes('voteDetail')) return false
      try {
        const res = await this.$http('voteDetail', {eth_address:this.account, topic_id: parseInt(this.$route.params.pathMatch)})
        if(res.code == 200)
          if(res.data.attributes)
            res.data.attributes.forEach(item => { this.totalAmount += item.vote_vbn_complete })
          this.creator.total = this.totalAmount
          this.creator.start = moment(res.data.start_time*1000).format('MMMM Do YYYY, h:mm:ss a')
          this.creator.end = moment(res.data.end_time*1000).format('MMMM Do YYYY, h:mm:ss a')

          this.voteData = res.data
      } catch (err) {
        console.error(err)
      }
    },
    async getVoteRecords(page) {
      if(this.loadingWarden.includes('voteRecord')) return false
      let page_ = page?page:1
      try {
        const res = await this.$http('voteRecord', {eth_address:this.account, topic_id: parseInt(this.$route.params.pathMatch), page: page_})
        if(res.code == 200)
          this.recordList = res.data.list
          this.recordPageOptions = {...res.data.page}
      } catch (err) {
        console.error(err)
      }
    },
    optionSelect(idx) {
      if(this.voteData.state !== 2) return false
      this.optionIdx = idx
    },  
    async voting() {
      if (this.loadingWarden.includes('voteStore') || !this.optionIdx || this.voteData.join_state) return false
      try {
        await this.$http('voteStore', {eth_address: this.account, topic_id:parseInt(this.$route.params.pathMatch), attribute_id:this.optionIdx, })
        this.init()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(vote) {
  margin-bottom: 30px;
  @include e(hd) {
    margin-bottom: 28px;
    word-break: break-all;
    @include m(tags) {
      margin-bottom: 20px;
      label {
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
    }
  }

  @include e(desc) {
    color: $--color-white-04;
    margin-bottom: 50px;
    word-break: break-all;
  }

  @include e(options) {
    padding: 35px 35px 60px;
    $itemWidth: 85%;
    li {
      width: $itemWidth;
      padding: 10px 16px;
      line-height: 150%;
      font-size: 18px;
      text-align: center;
      margin: 0 auto 30px;
      border: 1px solid $--color-white-04;
      cursor: pointer;
      -webkit-transition: all 0.25s;
      transition: all 0.25s;
      &:hover, &.selected {
        border-color: $--color-aqua;
        color: $--color-aqua;
      }
      &.active {
        background-color: rgba($--color-black, 0.5);
        border-color: $--color-aqua;
      }
    }
    @include m(btn) {
      width: $itemWidth;
      height: 50px;
      line-height: 50px;
      background-color: #2D8A92;
      border: 2px solid #58DFD7;
      margin: 0 auto;
      display: block;
      font-size: 20px;
    }
  }

  @include e(record) {
    .el-col {
      padding: 14px 12px;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid $--color-white-04;
    }
    @include m(btm){
      padding: 8px 10px;
    }
  }
  
  @include e(infomation) {
    .el-col {
      padding: 8px 12px;
      font-size: 14px;
      &:last-child {
        text-align: right;
      }
      &.name {
        color: $--color-white-04;
      }
    }
  }

  @include e(progress) {
    padding: 20px;
    .pg {
      margin-bottom: 15px;
    }
  }

  
}
</style>