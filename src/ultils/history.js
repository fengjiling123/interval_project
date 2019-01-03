import createHistory from 'history/createBrowserHistory';

const history = createHistory({
    basename: '', // 基链接
    forceRefresh: false, // 是否强制刷新整个页面
    keyLength: 6, // location.key的长度
    getUserConfirmation: (message, callback) => { console.log(message, 111) } // 跳转拦截函数
});

export default history;
