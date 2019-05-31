import React from 'react';
import { Empty } from 'antd';

export const Error404 = () => {
    return (
        <div className="text-center">
            <h1>Sorry, route not found</h1>
            <Empty />
        </div>
    );
}