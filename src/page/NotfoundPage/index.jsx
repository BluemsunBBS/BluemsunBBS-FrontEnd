import './index.css';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function NotfoundPage() {

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry，未找到网页。"
            extra={
                <Link to={"/"}>
                    <Button type="primary">返回主页</Button>
                </Link>
            }
        />
    )
}

export default NotfoundPage;