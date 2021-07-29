import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React ,{Component} from 'react';
import {FileOutlined ,DesktopOutlined} from "@ant-design/icons"
import "./sider.less"


class IndexSider extends Component {
   state = {
        collapsed: false
    }
    onCollapse = collapsed=> {this.setState({collapsed})}
    handleMenuChange = (e) => {
        window.location.href = window.location.origin + '/#' + e.key
    }
    render() {
        const {collapsed} = this.state;
        

        return(
            <Sider className= "index-sider" collapsible collapsed = {collapsed} onCollapse = {this.onCollapse}>
                <div className ="logo">Day1</div>
                <Menu theme = "dark" defaultSelectedKeys={['/']} mode= "inline" onClick={this.handleMenuChange}> 
                    <Menu.Item key="/" icon={<FileOutlined />}>SpreadJs</Menu.Item>
                    <Menu.Item key="/designer" icon={<DesktopOutlined />}>Designer</Menu.Item>
                </Menu>

            </Sider>
        )
    }
}

export default IndexSider