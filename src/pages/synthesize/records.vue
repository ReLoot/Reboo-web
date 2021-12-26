<template>
  <div class="synt">
    <div 
      class="synt--records"
    >
      <el-table
        v-if="tableData && tableData.length > 0"
        :data="tableData"
        :empty-text="`No Data`"
      >
        <el-table-column fixed :label="$t('synt.records.tbItem1')" prop="tx_hash" width="180"></el-table-column>
        <el-table-column :label="$t('synt.records.tbItem2')" prop="card_id" align="center"></el-table-column>
        <el-table-column :label="$t('synt.records.tbItem3')" prop="card_ids" align="center"></el-table-column>
        <el-table-column :label="$t('synt.records.tbItem4')" prop="type" width="120" align="center"></el-table-column>
        <el-table-column :label="$t('synt.records.tbItem5')" prop="result" align="center"></el-table-column>
        <el-table-column :label="$t('synt.records.tbItem6')" prop="create_at" width="180" align="center"></el-table-column>
      </el-table>
      <cus-nodata v-else />
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('user', {
      account: 'account',
    }),
  },
  data() {
    return {
      tableData: null
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    async getRecords() {
      try {
        const res = await this.$http('integrateRecords', {eth_address: this.account})
        if(res && res.data) {
          let dataList = this.dataFormal(res.data)
          this.tableData = dataList
        }
      } catch(err) {
        console.error(err)
      }
    },
    dataFormal(data) {
      data.forEach(item => {
        item.card_id = item.card_id.replace(/(\d*.)/, '#$1')
        item.card_ids = item.card_ids.replace(/(\d*.)/g, '#$1')
        item.type = item.type == 1?this.$t('synt.records.type1'):this.$t('synt.records.type2')
        item.result = item.result == 1?this.$t('synt.records.state1'):this.$t('synt.records.state2')
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/custom.scss';
@include b(synt) {
  @include e(records) {
    .el-col {
      margin-bottom: 20px;
    }

    .el-table {
      margin-top: 20px;
      width: 100%;
    }
  }
}

</style>