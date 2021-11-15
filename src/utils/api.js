const baseUrl = '/api'
const baseUrl2 = '/vib'
// const baseUrl = ''
export default {
    open_tool_box: {url: baseUrl+'/mystery_box/open/miner', methods: 'post'},    // "token_id":"11021", "account":"0x0D215180F5bf565c8892F829D9180C2b3B18f776"
    open_land_box: {url: baseUrl+'/mystery_box/open/land', methods: 'post'},    // "token_id":"11021", "account":"0x0D215180F5bf565c8892F829D9180C2b3B18f776"
    info_tool: {url: baseUrl+'/metadata/miner', methods: 'get'},                // token_id=1111,
    info_land: {url: baseUrl+'/metadata/land', methods: 'get'},                // token_id=1111,
    // info_tool: {url: baseUrl+'/metadata/miner', methods: 'post'},                // token_id=1111,
    // info_land: {url: baseUrl+'/metadata/land', methods: 'post'},                // token_id=1111,

    login: {url: baseUrl2+'/v1/user/login', methods:'post'},
    user_info: {url: baseUrl2+'/v1/user/info', methods:'get'},
    subscribe: {url: baseUrl2+'/v1/user/subscribe', methods:'post'},
    bind_email: {url: baseUrl2+'/v1/user/bind_email', methods:'post'},
    getEmailCode: {url: baseUrl2+'/v1/verification/code', methods:'get'},
}
