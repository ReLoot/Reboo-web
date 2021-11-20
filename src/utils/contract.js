import Vue from 'vue'
import {landContractClass, buildingContractClass} from '@/utils/contract_cards'
import {nftContractClass} from '@/utils/contract_nft'
import {idoContractClass} from '@/utils/contract_ido'

Vue.prototype.$landContract = new landContractClass()
Vue.prototype.$buildingContract = new buildingContractClass()
Vue.prototype.$nftContract = new nftContractClass()
Vue.prototype.$idoContract = new idoContractClass()