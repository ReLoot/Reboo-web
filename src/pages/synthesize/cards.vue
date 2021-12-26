<template>
  <div class="synt">
    <el-row :gutter="20" class="synt--prize" v-if="dataList && dataList.length > 0" >
      <el-col v-for="item in dataList" :key="`synt_prz_card_${item.token_id}`" :xs="12" :sm="6" >
        <card-building
          :rank="item.rarity" 
          :attributes="item.attributes" 
          :id="item.token_id" 
        />
      </el-col>
    </el-row>
    <cus-nodata v-else />
  </div>
</template>

<script>
import cardBuilding from '@/components/cards/card_building'
import {mapGetters} from 'vuex'

export default {
  components: {cardBuilding},
  computed: {
    ...mapGetters('user', {
      account: 'account',
    }),
  },
  data() {
    return {
      dataList: null
    }
  },
  created() {
    // this.dataList = testData
    this.getCards()
  },
  methods: {
    async getCards() {
      try {
        const res = await this.$http('integrateCards', {eth_address: this.account})
        if(res && res.code == 200) {
          this.dataList = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(synt) {
  @include e(prize) {
    padding: 20px 0;
    .el-col {
      margin-bottom: 20px;
    }
  }
}

</style>