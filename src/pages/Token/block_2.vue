<template>
  <div class="token--bk">
    <div class="container">
      <!-- token.bk2Hd -->
      <bk-title bg="/image/token/bk_2_hd.png" title="Token Function" color="#2CFFF3" />
      
      <el-row class="token--cards" :gutter="20">
        <el-col v-for="(item, idx) in cardList" :key="`tc_l_${idx}`" :md="12">
          <div class="token--cards_item" >
            <em :style="{backgroundImage: `url(${item.img})`}"></em>
            <div class="token--cards_ctn">
              <p>{{$t(item.desc)}}</p>
              <a>
                {{$t(item.linktxt)}}
                <i :style="{backgroundImage: 'url(/image/arr_r.png)'}"></i>
              </a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import bkTitle from '@/components/home/bk_title'
export default {
  components: {bkTitle},
  data(){
    return {
      cardList:[{
        desc: 'token.bk2Item1',
        linktxt: 'token.bk2Link1',
        link: '',
        img: '/image/token/litem_01.png'
      },{
        desc: 'token.bk2Item2',
        linktxt: 'token.bk2Link2',
        link: '',
        img: '/image/token/litem_02.png'
      },{
        desc: 'token.bk2Item3',
        linktxt: 'token.bk2Link3',
        link: '',
        img: '/image/token/litem_03.png'
      },{
        desc: 'token.bk2Item4',
        linktxt: 'token.bk2Link4',
        link: '',
        img: '/image/token/litem_04.png'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
.container {
  padding-top: 100px;
}

$itemList: (
  $--page-xs-width:(marginBottom: 30px),
  $--page-sm-width:(marginBottom: 35px),
  $--page-md-width:(marginBottom: 80px),
  $--page-lg-width:(marginBottom: 100px),
);
$itemEmList: (
  $--page-xs-width:(width: 125px, height: 125px, marginRight: 20px),
  $--page-sm-width:(width: 125px, height: 125px, marginRight: 25px),
  $--page-md-width:(width: 135px, height: 135px, marginRight: 25px),
  $--page-lg-width:(width: 155px, height: 155px, marginRight: 30px),
);

@include b(token) {
  @include e(cards) {
    // @include displayFlex();
    margin-top: 100px;
    @include m(item) {
      @include displayFlex();
      @include mediaAdapt($itemList);
      min-width: 580px;
      max-width: 100%;
      // min-width: 100%;
      // margin-bottom: 100px;
      em {
        @include mediaAdapt($itemEmList);
        // width: 155px;
        // height: 155px;
        display: block;
        margin-right: 30px;
        background: no-repeat center/cover;
      }
    }

    @include m(ctn) {
      position: relative;
      line-height: 125%;
      -webkit-flex: 1;
      flex: 1;
      a {
        position: absolute;
        bottom: 0;
        left: 0;
        color: $--color-aqua;
        cursor: pointer;
        &:hover {
          text-shadow: 0 0 10px $--color-aqua;
        }
      }
      i {
        display: inline-block;
        height: 17px;
        width: 7px;
        background: no-repeat center/cover;
        vertical-align: -2px;
      }
    }

  }
}

</style>