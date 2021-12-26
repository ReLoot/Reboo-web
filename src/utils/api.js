const baseUrl = '/api'
const baseUrl2 = '/vib'
// const baseUrl = ''
export default {
    open_tool_box: {url: baseUrl+'/mystery_box/open/miner', methods: 'post'},       // @params: "token_id":"11021", "account":"0x0D215180F5bf565c8892F829D9180C2b3B18f776"
    open_land_box: {url: baseUrl+'/mystery_box/open/land', methods: 'post'},        // @params: "token_id":"11021", "account":"0x0D215180F5bf565c8892F829D9180C2b3B18f776"
    info_tool: {url: baseUrl+'/metadata/miner', methods: 'get'},                    // @params: token_id=1111,
    info_land: {url: baseUrl+'/metadata/land', methods: 'get'},                     // @params: token_id=1111,

    login: {url: baseUrl2+'/v1/user/login', methods:'post'},
    user_info: {url: baseUrl2+'/v1/user/info', methods:'get'},
    subscribe: {url: baseUrl2+'/v1/user/subscribe', methods:'post'},
    bind_email: {url: baseUrl2+'/v1/user/bind_email', methods:'post'},
    getEmailCode: {url: baseUrl2+'/v1/verification/code', methods:'get'},
    get_game_id: {url: baseUrl2+'/v1/user/game_id', methods: 'post'},
    whiteList: {url: baseUrl2+'/v1/address/in_whitelist', methods: 'get'},
    boxCount: {url: baseUrl2+'/v1/transaction/box_daily_count', methods: 'get'},            // box count
    boxPurchase: {url: baseUrl2+'/v1/transaction/box_purchase', methods: 'post'},           // box buy
    // re/user/reserve_status
    reserveStatus: {url: baseUrl2+'/v1/user/reserve_status', methods: 'get'},
    reserveApply: {url: baseUrl2+'/v1/user/reserve', methods: 'post'},
    receiveNFT: {url: baseUrl2+'/v1/transaction/receive_nft', methods: 'post'},
    
    getUsefulBuildingCard: {url: baseUrl2+'/v1/integrate/buildings', methods: 'get'},
    // integrate: {url: baseUrl2+'/v1/integrate', methods: 'post'}
    integrate: {url: baseUrl2+'/v1/integrate/integrate', methods: 'post'},
    integrateResult: {url: baseUrl2+'/v1/integrate/result', methods: 'get'},
    integrateCards: {url: `${baseUrl2}/v1/integrate/integrated_cards`, methods: 'get'},
    integrateRecords: {url: `${baseUrl2}/v1/integrate/records`, methods: 'get'},
    /* vote */
    voteList: {url: baseUrl2+'/v1/vote/list', methods:'post'},              // @params: page | state: 1, 2, 3
    voteDetail: {url: `${baseUrl2}/v1/vote/detail`, methods:'post'},        // @params: topic_id
    voteRecord: {url: `${baseUrl2}/v1/vote/records`, methods:'post'},       // @params: topic_id | page
    voteStore: {url: `${baseUrl2}/v1/vote/store`, methods:'post'},          // @params: topic_id | attribute_id
}
