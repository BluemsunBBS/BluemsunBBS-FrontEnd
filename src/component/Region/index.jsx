import './index.css'
import url from './../../img/1.jpg'

function Region(){
    var regionImg = url;
    return(
        <div className='regionBox'>
            {/* 吧的介绍 */}
            <div className='topBox'>
                <img src={regionImg} className='regionImg'/>
                <span className='regionTitle'>
                    <span className='text1'>冯国忠吧</span><span className='text2'>创建于2022年10月20日</span>
                    <div className='text3'>这是一个非常喜欢提问的老师的贴吧，至于有多喜欢，可以去问问mww和wyy</div>
                    <div className='text4'>2022年10月20日16：14更新</div>
                </span>
            </div>
            {/* 吧内搜索 */}
            <div className='searchBox1'>
                <span className='block'>文章</span>
                <span className='block1'>板块信息</span>
                <span className='block1'>联系管理员</span>
                <input type="text" className='search'></input><span className='btn1'>吧内搜索</span>
            </div>
        </div>
    )
}
export default Region;