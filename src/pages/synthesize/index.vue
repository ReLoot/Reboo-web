<template>
  <div class="synt">
    <div class="container">
      <el-row class="synt--hd">
        <el-col >
          <ul class="synt--hd_tabs">
            <li 
              v-for="item in tabs" 
              :key="`synt_tabs_${item.type}`" 
              @click="$router.push({name: item.type})"
              :class="{'active': $route.name == item.type}"
            >{{ $t(item.txt) }}</li>
          </ul>
        </el-col>
      </el-row>
      <cus-divider-ein dStyle="white" />
      
      <synt-table v-if="$route.name == 'synths_table'" />
      <synt-cards v-if="$route.name == 'synths_cards'" />
      <synt-records v-if="$route.name == 'synths_records'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {integContractClass} from '@/utils/contract_integrate'
import syntTable from './table.vue'
import syntCards from './cards.vue'
import syntRecords from './records.vue'

export default {
  components:{syntTable, syntCards, syntRecords},
  computed: {
    ...mapGetters('user', {
      account: 'account',
      unsetBuildingCard: 'unsetBuildingCard'
    }),
    ...mapGetters('common', {
      loadingWarden: 'loadingWarden',
      authentication: 'authentication',
    }),
  },
  data(){
    return {
      tabs: [{
        txt: 'synt.syntNavItem1',
        type: 'synths_table',
      },{
        txt: 'synt.syntNavItem2',
        type: 'synths_cards',
      },{
        txt: 'synt.syntNavItem3',
        type: 'synths_records',
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'synthesize.scss';
.container {
  @include mediaAdapt($navHeight);
}
</style>