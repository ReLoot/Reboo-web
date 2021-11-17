<template>
  <div class="roadMap">
    <div class="container">
      <h2>Roadmap</h2>
      <article>
        <p>{{$t('roadmap.desc1')}} </p>
        <p>{{$t('roadmap.desc2')}}</p>
      </article>

      <div class="roadMap--tb_wrap">
        <!-- thead -->
        <div class="roadMap--thead">
          <cus-divider-ein dStyle="blue" />
          <el-row class="roadMap--thead_row">
            <el-col 
              class="roadMap--thead_cell"
              v-for="(item, key) in navs" 
              :key="`navs_idx_${key}`"
              :sm="cellSapce[key]"
              :xs="cellSapce[key]"
            >
              {{$t(item)}}
            </el-col>
          </el-row>
          <cus-divider-ein dStyle="blue" />
        </div>
        <!-- tbody -->
        <div class="roadMap--tbody">
          <template v-for="(item, ridx) in dataList">
            <div class="roadMap--tbody_row" :key="`dl_row_${ridx}`">
              <el-row >
                <el-col :sm="4" :xs="4">
                  <div class="roadMap--tbody_ctn" :style="{color: `${item.color}`}">
                    {{item.version}}
                  </div>
                </el-col>
                <el-col :sm="4" :xs="4">
                  <div class="roadMap--tbody_ctn">
                    {{$t(item.commuConstruct)}}
                  </div>
                </el-col>
                <el-col :sm="4" :xs="4">
                  <div class="roadMap--tbody_ctn">
                    {{$t(item.spaceConstruct)}}
                  </div>
                </el-col>
                <el-col :sm="6" :xs="6">
                  <div class="roadMap--tbody_ctn">
                    {{$t(item.play)}}
                  </div>
                </el-col>
                <el-col :sm="6" :xs="6">
                  <div class="roadMap--tbody_ctn">
                    {{$t(item.system)}}
                  </div>
                </el-col>
              </el-row>
              <cus-divider-ein dStyle="blue" />
            </div>
          </template>
        </div>
      </div>

      <div class="roadMap--extr">
        <p>{{$t('roadmap.extr')}}</p>
        <cus-btn-ein 
          class="rb"
          bg="/image/roadmap/btn_1.png"
          @click.native="link"
        >{{$t('roadmap.extrBtn')}}</cus-btn-ein>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: ['roadmap.thCell1','roadmap.thCell2','roadmap.thCell3','roadmap.thCell4','roadmap.thCell5'],
      cellSapce: [4,4,4,6,6],
      dataList: [{
        version: 'S1',
        commuConstruct: 'roadmap.tr1Cell2',
        spaceConstruct: 'roadmap.tr1Cell3',
        play: 'roadmap.tr1Cell4',
        system: 'roadmap.tr1Cell5',
        color: '#AFCAD4'
      },{
        version: 'S2',
        commuConstruct: 'roadmap.tr2Cell2',
        spaceConstruct: 'roadmap.tr2Cell3',
        play: 'roadmap.tr2Cell4',
        system: 'roadmap.tr2Cell5',
        color: '#13ABFF'
      },{
        version: 'S3',
        commuConstruct: 'roadmap.tr3Cell2',
        spaceConstruct: 'roadmap.tr3Cell3',
        play: 'roadmap.tr3Cell4',
        system: 'roadmap.tr3Cell5',
        color: '#D6BD35'
      },{
        version: 'S4',
        commuConstruct: 'roadmap.tr4Cell2',
        spaceConstruct: 'roadmap.tr4Cell3',
        play: 'roadmap.tr4Cell4',
        system: 'roadmap.tr4Cell5',
        color: '#E24E75'
      }]
    }
  },
  methods: {
    link() {
      this.$message(this.$t('token.altr'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 206px;
}

$rb: (
  $--page-xs-width: (fontsize: 14px),
  $--page-sm-width: (fontsize: 16px),
  $--page-md-width: (fontsize: 18px),
  $--page-lg-width: (fontsize: 20px),
);
@include b(roadMap) {
  background: url(/image/roadmap/banner.jpg) no-repeat center/cover;
  h2 {
    font-size: 70px;
    line-height: 100%;
    font-family: OrbitronBlack;
    text-align: center;
    color: #D0E6EE;
    margin-bottom: 35px;
  }

  article {
    line-height: 150%;
    width: 780px;
    max-width: 100%;
    padding: 0 20px;
    text-align: center;
    margin: 0 auto 40px;
    font-family: OrbitronRegular;
  }

  @include e(tb) {
    @include m(wrap) {
      min-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      margin-bottom: 70px;
    }
  }

  @include e(thead) {
    // width: 1340px;
    margin-left: auto;
    margin-right: auto;
    @include m(row) {
      margin: 5px 12px;
      background-color: rgba(71,179,247,0.4);
    }
    @include m(cell) {
      font-size: 15px;
      text-align: center;
      height: 70px;
      line-height: 70px;
      white-space: nowrap;
      word-wrap: break-word;
    }
  }

  @include e(tbody) {
    // width: 1340px;
    margin-left: auto;
    margin-right: auto;
    @include m(row) {
      .el-row{
        padding: 52px 0;
        text-align: center;
      }
      .el-col {
        border-left: 2px solid rgba(71,179,247,0.4);
        position: relative;
        // height: 1em;
        height: 60px;
        font-size: 15px;
        opacity: 0.7;
        &:first-child {
          border-left: 0 none;
          font-family: OrbitronBlack;
          font-size: 36px;
        }
      }
    }

    @include m(ctn) {
      @include pacenter();
      font-size: inherit;
      max-width: 100%;
      line-height: 150%;
      width: 250px;
    }
  }

  @include e(extr) {
    text-align: center;
    p {
      margin: 0 auto 50px;
      font-family: OrbitronRegular;
      text-align: center;
      max-width: 85%;
      line-height: 150%;
    }
    .rb {
      @include mediaAdapt($rb);
      font-family: OrbitronRegular;
      // font-size: 28px;
      width: 378px;
      height: 77px;
    }
  }
}

</style>