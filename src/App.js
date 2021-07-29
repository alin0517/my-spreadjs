import React,{Suspense} from 'react';
import {Layout} from 'antd'
import './App.less'
import IndexFooter from './components/footer'; 
import IndexSider from './components/sider'; 
import { Switch,Route,HashRouter, Redirect} from 'react-router-dom';


const PureSpread = React.lazy(() => import('./components/pureSpread'))
const SpreadDesigner = React.lazy(() => import('./components/designer'))
const {Content,Header} = Layout



const App = () => (
  <Layout className="app">
     <IndexSider/>
     <Layout>
        <Content className="index-content">
          <HashRouter>
              <Switch>
                <Suspense fallback={<div>loading...</div>}>
                  <Route exact path="/" component={PureSpread}/>
                  <Route exact path="/designer" component={SpreadDesigner}/>    
                </Suspense>
              </Switch>
          </HashRouter>
        </Content>
        <IndexFooter/>
     </Layout>
  </Layout>
)
  


export default App;
