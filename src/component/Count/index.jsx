import { Avatar, Badge } from 'antd';
import React from 'react';
function Count(){
    return(
        <a href="#">
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
      </a>
    )
}
export default Count;