import {
    EyeOutlined,
    HeartOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import style from './style.module.css'

const App = () => (
    <div className={style.root}>
        <Space>
            <EyeOutlined />1
            <HeartOutlined />1
            <MessageOutlined />1
        </Space>
    </div>
    
);
export default App;