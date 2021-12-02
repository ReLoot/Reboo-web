<template>
  <div class="dataList">
    <div class="dataList--hd">
      <tabs-market :tabs="tabs" :tabIdx="listType" @trigger="tabsTrigger" />
    </div>

    <div class="dataList--bd">
        <el-row class="dataList--bd_list" :gutter="20" v-if="viewList.length > 0">
          <el-col 
            v-for="(item, idx) in viewList"
            :key="`land_list_${idx}`"
            :md="6" :sm="8" :xs="12"
          >
            <div class="dataList--bd_card blinebox ">
              <div class="inner">
                <h4 class="title">
                    {{$t(tabs[listType]['view'])}}
                </h4>
                <div class="element--wrap">
                  <em 
                    class="element--view" 
                    :class="{
                      'element--view_land': listType == 0,
                      'element--view_building': listType == 1
                    }"
                  />
                </div>
                <cus-btn-ein
                  class="card_btn"
                  @click.native="boxSelect(item)"
                >WAIT</cus-btn-ein>
              </div>
            </div>
          </el-col>
        </el-row>
        <cus-nodata v-else />

    </div>

    <!-- :before-close="handleClose" -->
    <el-dialog
      class="box--infocard"
      :visible.sync="boxDialogVisible"
      :append-to-body="true"
      @closed="boxDialogClose"
    >
      <div class="mainCtn">
        <h4>{{$t(cardTabs[listType])}} X1 </h4>
        <div class="anm">
          <img class="bg" :src="gifURL" />
          <em 
            class='cardItem' 
            :class="(listType==1?'tcq':'dk')+boxCardRank"
          >
          <span>#{{curItemID}}</span>
          </em>
        </div>
        <cus-btn-ein
          class="dialogBtn"
          @click.native="boxDialogVisible = false"
        >RECEIVE</cus-btn-ein>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tabsMarket from '@/components/tabs/tabs_market'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('user', {
      landBox: 'landBox',
      buildingBox: 'buildingBox',
    }),
  },
  components: {
    tabsMarket,
  },
  watch:{
    landBox(n) {
      if (n && this.listType == 0) 
        this.viewList = n
    },
    buildingBox: {
      immediate: true,
      handler(n, o) {
        if (n && this.listType == 1) 
          this.viewList = n
      },
    },
  },
  data(){
    return {
      listType: 0,     // land 0 \ building 1
      boxDialogVisible: false,
      curItemID: null,
      tabs: [{
        type: 'domain',
        view: 'market.boxType1',
      },{
        type: 'build',
        view: 'market.boxType2'
      }],
      cardTabs: [ 'market.cardType1','market.cardType2'],
      viewList: [],
      pageLoading: false,
      gifURL: '',
      boxCardRank: 1
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.listType == 0) 
        this.viewList = this.landBox
      else
        this.viewList = this.buildingBox
    })
  },
  methods: {
    tabsTrigger(cur) {
      this.listType = cur
      if (cur == 0) {
        this.viewList = this.landBox
      } else {
        this.viewList = this.buildingBox
      }
    },
    boxSelect(id) {
      if(this.pageLoading) return false
      this.pageLoading = true

      this.gifURL = this.listType==0?'/image/market/box_land.gif':'/image/market/box_building.gif'
      this.curItemID = id

      const contractObj = this.listType == 0 ? this.$landContract : this.$buildingContract
      // let id = this.curItemID
      this.pageLoading = true
      contractObj.openBox(id)
        .then(res => {
          this.boxDialogVisible = true
          if (res.data.rarity == 'SS')
            this.boxCardRank = 2
          else if (res.data.rarity == 'SSS')
            this.boxCardRank = 3
          else
            this.boxCardRank = 1

          this.pageLoading = false
          contractObj.classifyItem()

        }).catch(err => {
          this.pageLoading = false
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    boxDialogClose() {
      this.gifURL = ''
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
$cardBtn: (
  $--page-xs-width:(fontsize: 14px),
  $--page-sm-width:(fontsize: 16px),
  $--page-md-width:(fontsize: 16px),
  $--page-lg-width:(fontsize: 18px),
);
@include b(dataList) {
  @include e(hd) {
    margin: 20px 0 40px;
  }

  @include e(bd) {
    @include clearfix();
    .el-col {
      margin-bottom: 20px;
    }
    @include m(card) {
      width: 100%;
      max-width: 237px;
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transition: all 0.25s;
      transition: all 0.25s;
      box-shadow: 0 0 5px 1px rgba(0,0,0,0.2);
      margin-left: auto;
      margin-right: auto;
      &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 20px 1px rgba(0,0,0,0.5);
      }
      .inner {
        border-radius: 4px;
        padding-bottom: 142%;
        width: 100%;
        height: 0;
        position: relative;
        background: no-repeat center/cover;
        font-family: OrbitronRegular;
      }
      .title {
        @include plcenter();
        white-space: nowrap;
        width: 150px;
        height: 36px;
        line-height: 36px;
        top: 0;
        color: $--color-aqua;
        text-align: center
      }
    }
  }
}

@include b(element) {
  @include e(wrap) {
    position: absolute;
    left: 50%;
    top: 25.4%;
    width: 54%;
    margin-left: -27.5%;
  }
  @include e(view) {
    display: block;
    padding-bottom: 100%;
    width: 100%;
    background: no-repeat center/cover
  }
}

@include b(blinebox) {
  .inner {
    background-image: url(/image/market/box_card_bg.png) 
  }
  @include b(element) {
    @include e(view_land) {
      background-image: url(/image/box_domain.png)
    }
    @include e(view_building) {
      background-image: url(/image/box_build.png)
    }
  }
  .card_btn {
    @include mediaAdapt($cardBtn);
    -webkit-user-select: none;
    user-select: none;
    width: 80%;
    height: 13.1%;
    position: absolute;
    bottom: 6.5%;
    left: 50%;
    margin-left: -40%;
    background-color: #2D8A92;
    border: 2px solid #3DB5AE;

  }
}


@include b(box) {
  @include e(infocard) {
    ::v-deep .el-dialog {
      max-width: 86%;
      width: 413px;
      // height: 526px;
      background: url(/image/market/box_dialog_bg.png) no-repeat center/cover;
      &__close { display: none; }

      &__header { display: none; }

      &__body {
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        color: $--color-white;
        
        .mainCtn {
          width: 100%;
          padding-bottom: 127%;
          h4 {
            width: 100%;
            position: absolute;
            top: 22%;
            text-align: center;
            font-size: 20px;
            text-align: center;
          }
          img {
            width: calc(100% - 8px);
            margin: 0 4px;
          }
        }

        .anm {
          position: absolute;
          width: 100%;
          top: 30.4%;
          left: 0;
        }

        .cardItem {
          position: absolute;
          width: 40%;
          // height: 204px;
          padding-bottom: 49.4%;
          // margin-left: -82.5px;
          // margin-top: -102px;
          // margin-left: -82.5px;
          margin-left: -20%;
          margin-top: -24.7%;
          top: 50%;
          left: 50%;
          background: no-repeat center/cover;
          animation: cardScroll 3s ease-in-out 2s 1;
          animation-fill-mode:forwards;
          -webkit-transform-origin: center !important;
          transform-origin: center !important;
          opacity: 0;
          &.tcq1 {
            background-image:url(/image/market/tcq-1.png);
          }
          &.tcq2 {
            background-image:url(/image/market/tcq-2.png);
          }
          &.tcq3 {
            background-image:url(/image/market/tcq-3.png);
          }
          &.dk1 {
            background-image:url(/image/market/dk-1.png);
          }
          &.dk2 {
            background-image:url(/image/market/dk-2.png);
          }
          &.dk3 {
            background-image:url(/image/market/dk-3.png);
          }

          span {
            display: block;
            position: absolute;
            bottom: 15px;
            left: 0;
            width: 100%;
            font-size: 16px;
            text-align: center;
            font-family: OrbitronRegular;
          }
        }

        .dialogBtn {
          position: absolute;
          // bottom: 60px;
          // width: 182px;
          // height: 45px;
          width: 44%;
          height: 8.5%;
          bottom: 11.5%;
          left: 50%;
          // margin-left: -91px;
          margin-left: -22%;
          font-size: 16px;
          font-family: OrbitronRegular;
          background-color: #3DB5AE;
          border: 1px solid #2D8A92;
          border-radius: 2px;
        }

      }
    }
  }
}

@keyframes cardScroll {
  0% {
    transform: rotate(-720deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}
</style>