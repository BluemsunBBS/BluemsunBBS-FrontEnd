import { HeartOutlined, LockOutlined, MobileOutlined, IdcardOutlined, UserOutlined, WeiboOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormRadio, ProFormText, } from '@ant-design/pro-components';
import { Button, Divider, message, Space, Tabs, notification } from 'antd';
import { useState } from 'react';
import logoUrl from "./../../img/logo.jpg";
import bgcUrl from "./../../img/bgc.jpg";
import './Log.css'
import './../../utils/http.js'
import { http } from './../../utils/http.js';

const logourl = logoUrl;
const bgcurl = bgcUrl;
const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
const regis = {
    username:'',
    nickname:'',
    realname:'',
    gender:'',
    phone:'',
    password:''
}
const log = {
    username:'',
    password:''
}

const openNotification = (msg, des) => {
    notification.error({
        message: msg,
        description: des
    });
};

export default () => {
    const [loginType, setLoginType] = useState('login');
    return (<div style={{ backgroundColor: 'white', height: 'calc(100vh - 48px)', margin: -24 ,width:'1230px',textAlign:'center',marginLeft:100}}>
      <LoginFormPage backgroundImageUrl={bgcurl} logo={logourl} title="BluemsunBBS" subTitle="全东师最大的技术交流论坛" width='800px'
          actions={<div style={{
                // display: 'flex',
                // width:'2000px',
                // justifyContent: 'center',
                // alignItems: 'center',
                // flexDirection: 'column',
            }}>
            {/* <Divider plain>
              <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
                其他登录方式
              </span>
            </Divider> }
            { <Space align="center" size={24}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid #D4D8DD',
                borderRadius: '50%',
            }}>
            <AlipayOutlined style={Object.assign(Object.assign({}, iconStyles), { color: '#1677FF' })}/>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid #D4D8DD',
                borderRadius: '50%',
            }}>
                <TaobaoOutlined style={Object.assign(Object.assign({}, iconStyles), { color: '#FF6A10' })}/>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid #D4D8DD',
                borderRadius: '50%',
            }}>
                <WeiboOutlined style={Object.assign(Object.assign({}, iconStyles), { color: '#333333' })}/>
              </div>
            </Space> */}
          </div>}
          onFinish={async (arg)=>{
            //注册口
            if(arg.logusername == undefined){
                var res = await http.post("/account/register", regis);
                if(res.code == 2){
                    openNotification("注册失败", res.msg);
                } else {
                    localStorage.setItem("token",res.data);
                }
            }
            else{
                var res = await http.post("/account/login", log);
                if(res.code == 2){
                    openNotification("登录失败", res.msg);
                } else {
                    localStorage.setItem("token",res.data);
                }
            }
          }}
          >
        <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
          <Tabs.TabPane key={'account'} tab={'注册'}/>
          <Tabs.TabPane key={'login'} tab={'登录'}/>
        </Tabs>
        
        {loginType === 'account' && (<>
            <ProFormText name="username" fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    regis.username = e.target.value;
                    console.log(regis);
                }
            }} placeholder={'请输入用户名'} rules={[
                {
                    required: true,
                    message: '请输入用户名!',
                },
            ]}/>
            <ProFormText name="nickname" fieldProps={{
                size: 'large',
                prefix: <HeartOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    regis.nickname = e.target.value;
                    console.log(regis);
                }
            }} placeholder={'请输入一个喜欢的昵称'} rules={[
                {
                    required: true,
                    message: '请输入昵称！',
                },
            ]}/>
            <ProFormText name="realname" fieldProps={{
                size: 'large',
                prefix: <IdcardOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    regis.realname = e.target.value;
                    console.log(regis);
                }
            }} placeholder={'请输入您的真实姓名'} rules={[
                {
                    required: true,
                    message: '请输入姓名！',
                },
            ]}/>
            <ProFormRadio.Group
            name="radio-button"
            radioType="button"
            fieldProps={{
                onChange:function(e){
                    regis.gender = e.target.value;
                    console.log(regis);
                }
            }}
            options={[
              {
                label: 'I am a male',
                value: 'male',
              },
              {
                label: 'I am a female',
                value: 'female',
              },
            ]}
          />
            
            
            <ProFormText fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    regis.phone = e.target.value;
                    console.log(regis);
                }
            }} name="mobile" placeholder={'请输入手机号'} rules={[
                {
                    required: true,
                    message: '请输入手机号！',
                },
                {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                },
            ]}/>
            <ProFormText.Password name="password" fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    regis.password = e.target.value;
                    console.log(regis);
                }
            }} placeholder={'请输入密码'} rules={[
                {
                    required: true,
                    message: '请输入密码！',
                },
            ]}/>
            <ProFormText.Password name="repassword" fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
            }} placeholder={'请再次确认你的密码'} rules={[
                {
                    required: true,
                    message: '请输入密码！',
                },
            ]}/>
          </>)}
        {loginType === 'login' && (<>
            <ProFormText name="logusername" fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    log.username = e.target.value;
                    console.log(log);
                }
            }} placeholder={'请输入用户名'} rules={[
                {
                    required: true,
                    message: '请输入用户名!',
                },
            ]}/>
            <ProFormText.Password name="logpassword" fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
                onChange:function(e){
                    log.password = e.target.value;
                    console.log(log);
                }
            }} placeholder={'请输入密码'} rules={[
                {
                    required: true,
                    message: '请输入密码！',
                },
            ]}/>
          </>)}
      </LoginFormPage>
    </div>);
};
