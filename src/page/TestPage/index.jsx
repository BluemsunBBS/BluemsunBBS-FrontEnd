import { Menu } from 'antd';
import React, { useState } from 'react';

export default function TestPage() {
    const items = [
        {
            label: '123123',
            key: 'mail',
        }
    ];
    return (
        <div>
            <Menu mode="horizontal" items={items} />;
        </div>
        
    )
}