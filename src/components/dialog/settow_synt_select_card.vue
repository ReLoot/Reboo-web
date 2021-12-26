<template>
  <dialog-set-two 
    :visible.sync="visible" 
    @closeHandler="viewClose"
    class="select_card_dialog"
    width="725px"
    styleTop="50%"
  >
    <div class="dialog--settwo_inner">
      <div class="synt--boxestb">
        <div class="synt--boxestb_rank">
          <div 
            v-for="(item, idx) in cardListRanks" 
            :key="`rank_${idx}`" 
            class="item" 
            :class="{active: currentRank == idx}"
            @click="tabSwitch(idx)"
          >{{item}}</div>
        </div>
        <div class="synt--boxestb_ctn">
          <el-scrollbar style="height: 100%; overflow-x:hidden;" >
            <el-row :gutter="20" v-if="viewList && viewList.length > 0">
              <el-col
                v-for="(item, idx) in viewList"
                :key="`card_item_${idx}`"
                :sm="6"
                :xs="12"
              >
                <a class="wrap" :class="{active: carr.includes(item.token_id)}" @click="cardSelect(item, idx)">
                  <i class="el-icon-check" />
                  <card-building :rank="item.rarity" :attributes="item.attributes" :id="String(item.token_id)" />
                </a>
              </el-col>
            </el-row>
            <cus-nodata v-else />
          </el-scrollbar>
        </div>
        <div class="synt--boxestb_btn">
          <cus-btn-ein 
            class="submit"
            bg="/image/market/btn_1.png"
            @click.native="select"
          >SELECT</cus-btn-ein>
        </div>
      </div>
    </div>
  </dialog-set-two>
</template>

<script>
import dialogSetTwo from './tmp/d_tmp_set_two'
import { mapGetters } from 'vuex'
import cardBuilding from '@/components/cards/card_building'

export default {
  components: {dialogSetTwo, cardBuilding},
  props: ['cardOptions'],
  computed: {
    ...mapGetters('user', {
      account: 'account',
      unsetBuildingCard: 'unsetBuildingCard'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden'
    }),
    ...mapGetters('dialog', {
      visible: 'SYNT_SELECT_CARD'
    }),
  },
  data() {
    return {
      cardListRanks: ['s','ss', 'sss'],
      currentRank: 0,
      currentIdx: null,
      type: '',
      viewList: [],
      carr: []
    }
  },
  methods: {
    viewOpen(type_) {
      this.$store.commit('dialog/SYNT_SELECT_CARD', true)
      this.type = type_
      this.carr = [...this.cardOptions]
      this.cardListFilter()
    },
    viewClose() {
      this.$store.commit('dialog/SYNT_SELECT_CARD', false)
    },
    cardSelect(item, idx) {
      if(this.carr.includes(item['token_id'])) {
        this.$set(this.carr, this.carr.indexOf(item['token_id']), null)
      }
      this.currentIdx = idx
      this.$set(this.carr, this.type, this.viewList[idx]['token_id'])
    },
    cardListFilter() {
      if(this.unsetBuildingCard) {
        this.viewList = this.unsetBuildingCard.filter(item => {
          return item.rarity.toLowerCase() == this.cardListRanks[this.currentRank].toLowerCase()
        })
      }
    },
    tabSwitch(idx) {
      this.currentRank = idx
      this.currentIdx = null
      this.cardListFilter()
    },
    select() {
      this.$emit('updateCardOption', this.carr);
      this.viewClose()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'dialog.scss';
$tab: (
  $--page-xs-width: (marginBottom: 20px),
  $--page-sm-width: (marginBottom: 23px),
  $--page-md-width: (marginBottom: 26px),
  $--page-lg-width: (marginBottom: 30px),
);
$tabItem: (
  $--page-xs-width: (fontsize: 14px),
  $--page-sm-width: (fontsize: 18px),
  $--page-md-width: (fontsize: 22px),
  $--page-lg-width: (fontsize: 26px),
);
$ctnHeight: (
  $--page-xs-width: (height: 300px),
  $--page-sm-width: (height: 330px),
  $--page-md-width: (height: 360px),
  $--page-lg-width: (height: 400px),
);
$btnHandler: (
  $--page-xs-width: ( fontsize: 12px),
  $--page-sm-width: ( fontsize: 13px),
  $--page-md-width: ( fontsize: 14px),
  $--page-lg-width: ( fontsize: 15px),
);
@include b(synt) {
  @include e(boxestb) {
    @include m(rank) {
      @include mediaAdapt($tab);
      text-align: center;
      -webkit-user-select: none;
      user-select: none;
      .item {
        @include mediaAdapt($tabItem);
        display: inline-block;
        margin: 0 0.5em;
        width: 2.8em;
        white-space: nowrap;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        &.active {
          border-color: $--color-aqua;
        }
      }
    }
    @include m(ctn) {
      @include mediaAdapt($ctnHeight);
      // height: 500px;
      padding: 0 10px;
      .el-row {
        width: 100%;
        padding: 5px;
      }
      .el-col {
        margin-bottom: 20px;
      }
      .wrap {
        position: relative;
        display: inline-block;
        width: 100%;
        cursor: pointer;
        i {
          display: none;
        }
        &.active {
          box-shadow: 0 0 0 2px $--color-aqua;
          i {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 14px;
            color: $--color-bg-page;
            z-index: 2;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background-color: $--color-aqua;
            font-weight: 800;
          }
      }
    }
  }

    @include m(btn) {
      text-align: center;
      .submit {
        @include mediaAdapt($btnHandler);
        font-family: OrbitronBlack;
        display: inline-block;
        width: 10.3em;
        height: 2.67em;
        margin-top: 3em
      }
    }
  }
}


::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
  margin-bottom: 0 !important;
}
</style>