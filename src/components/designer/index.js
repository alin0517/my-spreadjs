import React, { Component } from 'react'
import '@grapecity/spread-sheets-designer-resources-cn';
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"
import '@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css'
import {Designer} from '@grapecity/spread-sheets-designer-react';
import * as designerGC from '@grapecity/spread-sheets-designer';
import { message } from 'antd';
import './designer.less'
import axios from 'axios';

                        

export default class SpreadDesigner extends Component {
    constructor(props){
        super(props)
        this.designer = null
        this.state = {
            config: designerGC.Spread.Sheets.Designer.DefaultConfig
        }
    }
    designerInitial = (designer) => {
        this.designer = designer
    }
    updateDesignerConfig = () => {
      let newConfig = JSON.parse(JSON.stringify(this.state.config))  
      //去掉文件tab
      newConfig.fileMenu = undefined
      //新增操作tab
      newConfig = this.updateDefaultConfig(newConfig)
      this.setState({config: newConfig})
    }

    updateDefaultConfig = (newConfig) => {
        let customerRibbon = {
            id: 'operate',
            text: '操作',
            buttonGroups:[
                {
                    label: "文件操作",
                    thumbnailClass:'ribbon-thumbnail-spreadsettings',
                    commandGroup:{
                        children:[
                            {
                                direction: 'vertical',
                                commands: ["loadTemplate","updateTemplate"],
                            },{
                                direction: 'vertical',
                                commands: ['loadTemplate']
                            },{
                                type: 'separator'
                            },{
                                direction: 'vertical',
                                commands: ["updateTemplate"]
                            }
                        ]
                    }
                }
            ]
        }
        let loadTemplateCommand = {
            iconClass: 'ribbon-button-download',
            text: '加载',
            //bigButton: true,
            commandName: 'loadTemplate',
            execute: this.loadTemplate,
        }
        let updateTemplateCommand = {
            iconClass: 'ribbon-button-upload',
            text: '更新/上传',
            //bigButton: true,
            commandName: 'updateTemplate',
            execute: this.updateTemplate
        }
        newConfig.ribbon.push(customerRibbon)
        newConfig.commandMap = {
            loadTemplate: loadTemplateCommand,
            updateTemplate: updateTemplateCommand,
        }
        return newConfig
    }

    loadTemplate = async() => {
        let spread = this.designer.getWorkbook()
        let formData = new FormData()
        formData.append('fileName','test')
        let result = await axios.post('spread/loadTemplate',formData,{responseType: 'json'})
        if(result.status == 200){
            spread.fromJSON(result.data)
            message.success('加载成功',1)
        }else{
            message.warn('加载失败',1)
        }
        
    }
    updateTemplate = async () => {
        //上传、更新文件
        let spread = this.designer.getWorkbook()
        let spreadJSON = JSON.stringify(spread.toJSON())
        let formData = new FormData()
        formData.append('jsonString',spreadJSON)
        formData.append('fileName','test')
        let result = await axios.post('spread/updateTemplate',formData)
        message.success(result.data,1)
    }

    componentDidUpdate(){
        document.getElementsByClassName("gc-ribbon-bar")[0].classList.add("collapsed")
    }


    componentDidMount(){
        this.updateDesignerConfig()
    }
    render() {
        const {config} = this.state
        return (
            <Designer 
                styleInfo={{
                height: '100%',
                }}
                designerInitialized = {this.designerInitial}
                config={config}
            />
        )
    }
}
