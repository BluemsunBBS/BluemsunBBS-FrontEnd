import { Carousel } from 'antd';
import React from 'react';
import './index.css'

const contentStyle1 = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  width:'1000px',
  textAlign: 'center',
  // backgroundColor:'#7952b3',
  backgroundImage: `url('http://bbs.wyy.ink:8080/images/61257dd01d4f4d06b8934c4e8ef04d13.jpg')`,
};
const contentStyle2 = {
  height: '400px',
  width:'1000px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  // backgroundColor:'#7952b3',
  backgroundImage: `url('http://bbs.wyy.ink:8080/images/659e4d70b4d84f88bbb70016d0cd1f8a.jpg')`,
};
const contentStyle3 = {
  height: '400px',
  width:'1000px',
  color: '#fff',
  // lineHeight: '400px',
  textAlign: 'center',
  // backgroundColor:'#7952b3',
  backgroundImage: `url('http://bbs.wyy.ink:8080/images/1717829d5375493b9a8b16980ecf98d4.jpg')`,
};
const contentStyle4 = {
  height: '400px',
  width:'1000px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  // backgroundColor:'#7952b3',
  backgroundImage: `url('http://bbs.wyy.ink:8080/images/61257dd01d4f4d06b8934c4e8ef04d13.jpg')`,
};
const Carou = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle1}></h3>
    </div>
    <div>
      <h3 style={contentStyle2}></h3>
    </div>
    <div>
      <h3 style={contentStyle3}></h3>
    </div>
    <div>
      <h3 style={contentStyle4}></h3>
    </div>
  </Carousel>
);
export default Carou;