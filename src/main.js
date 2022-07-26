const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: "https://www.acfun.cn" },
    { logo: 'B', url: "https://www.bilibili.com" }
];
const simplifyUrl = (url) => {
    return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "")
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="iconpark-icon"><use href="#close-small"></use></svg>
                </div>
            </div>
        
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入以 https 或 http 开头的网址')
        if (url.indexOf('http') === 0) {
            siteList.push({
                logo: simplifyUrl(url)[0].toUpperCase(),
                url: url
            })
            localStorage.setItem('siteList', JSON.stringify(siteList))
            render()
        } else {
            window.alert('添加失败，请输入以 https 或 http 开头的网址')
        }
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})