import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import { getUserInfo } from "../../utils/func";
import './setuserinfo.css'

import { BetaSchemaForm } from '@ant-design/pro-components';
import { Input } from 'antd';


const valueEnum = {
    all: { text: '全部', status: 'Default' },
    open: {
        text: '未解决',
        status: 'Error',
    },
    closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
    },
    processing: {
        text: '解决中',
        status: 'Processing',
    },
};
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        initialValue: '必填',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        initialValue: '必填',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    },
    {
        title: '状态',
        dataIndex: 'state',
        valueType: 'select',
        valueEnum,
        width: 'm',
        tooltip: '当title为disabled时状态无法选择',
        dependencies: ['title'],
        fieldProps: (form) => {
            if (form.getFieldValue('title') === 'disabled') {
                return {
                    disabled: true,
                    placeholder: 'disabled',
                };
            }
            else {
                return {
                    placeholder: 'normal',
                };
            }
        },
    },
    {
        title: '标签',
        dataIndex: 'labels',
        width: 'm',
        tooltip: '当title为必填时此项将为必填',
        dependencies: ['title'],
        formItemProps(form) {
            if (form.getFieldValue('title') === '必填') {
                return {
                    rules: [
                        {
                            required: true,
                        },
                    ],
                };
            }
            else {
                return {};
            }
        },
    },
    // {
    //     valueType: 'dependency',
    //     name: ['title'],
    //     columns: ({ title }) => {
    //         return title !== 'hidden'
    //             ? [
    //                 {
    //                     title: 'title为hidden时隐藏',
    //                     dataIndex: 'hidden',
    //                     valueType: 'date',
    //                     renderFormItem: () => {
    //                         return <Input />;
    //                     },
    //                 },
    //             ]
    //             : [];
    //     },
    // },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'createName',
        valueType: 'date',
    },
    {
        valueType: 'divider',
    },
];
export default () => {
    return (
        <div className="setUserInfoBox">
            <Nav nickname={getUserInfo("nickname")}/>
            <Search/>
            <BetaSchemaForm shouldUpdate={false} layoutType="Form" onFinish={async (values) => {
            console.log(values);
        }} columns={columns}/>
        </div>
    )

    

};