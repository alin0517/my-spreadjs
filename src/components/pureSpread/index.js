import { SpreadSheets } from "@grapecity/spread-sheets-react";
import { Component } from "react";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"
import { Button, message, Select, Upload } from "antd";
import { DownloadOutlined, PrinterOutlined, UploadOutlined } from "@ant-design/icons";
import {IO} from '@grapecity/spread-excelio';
import FileSaver from "file-saver";
import * as GC from '@grapecity/spread-sheets';
import "@grapecity/spread-sheets-print"
// import 'antd/dist/antd.css';
const {Option} = Select
export default class PureSpread extends Component{

    constructor (props) {
        super(props)
        this.spread = null;
        this.state = {
            fontFamily:null
        }
    }
    spreadInitial = (spread) => {
        this.spread = spread;
    }
    handleExportExcel = () => {
        let  execlJSON = this.spread.toJSON();
        let excelio = new IO();
        excelio.save(execlJSON,(blob)=> {
            FileSaver.saveAs(blob,'day1.xlsx')
        })
    }

    importExcel = (file) => {
        let excelio = new IO();
        excelio.open(file,(json)=>{
            this.spread.fromJSON(json, {
                incrementalLoading: {
                    loading: function (progress) {
                        // progress = progress * 100;
                        // loadingStatus.value = progress;
                    },
                    loaded: function () {
                    }
                }
            })
        },e=>{console.log(e)})
        return false;
    }
    handleFontChange = (newFont) => {
        let sheet = this.spread.getActiveSheet();
        let selections = sheet.getSelections();
        sheet.suspendPaint()
        selections.forEach((selection)=> {
            let range = sheet.getRange(selection.row, selection.col,selection.rowCount,selection.colCount);
            range.backColor('lightblue')
            for(let row=selection.row; row<selection.row+selection.rowCount; row++){
                for(let col=selection.col; col<selection.col+selection.colCount;col++){
                    let font = sheet.getCell(row,col).font()
                    let span = document.createElement("span")
                    span.style.font = font
                    span.style.fontFamily = newFont
                    sheet.getCell(row,col).font(span.style.font);
                    this.setState({fontFamily:newFont})
                }
            }
        })
        sheet.resumePaint()
    }

    componentDidMount() {
        this.spread.bind(GC.Spread.Sheets.Events.EnterCell,(e, info)=>{
            let sheet = info.sheet, row = info.row, col = info.col
            let font = sheet.getCell(row, col).font();
            let span = document.createElement("span");
            span.style.font = font;
            console.log(span.style);
            let fontFamily = span.style.fontFamily;
            this.setState({
                fontFamily
            })

        })
    }
    getContent = ()=> {
        let sheet = this.spread.getActiveSheet();
        let row = sheet.getActiveRowIndex();
        let col = sheet.getActiveColumnIndex();
        message.info(sheet.getText(row,col))
    }
    handlePrint = () =>{
        let sheet = this.spread.getActiveSheet();
        let printInfo = sheet.printInfo();
        printInfo.showGridLine(false);
        printInfo.showRowHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide);
        printInfo.showColumnHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide);
        this.spread.print()
    }
    render() {
        const props = {
            name:'file',
            showUploadList:false,
            accept:".xlsx",
            maxCount:1,
            beforeUpload:this.importExcel
        }
        return(
            <div className="container" style ={{height:'100%'}}> 
                <div className="buttons-div" style={{
                     height: '40px',
                     padding: '4px 0',
                     background: '#f0f2f5'
                 }}>
                     <Upload {...props}>
                     <Button size="small" icon={<UploadOutlined/>}>导入.xlsx文件</Button>
                     </Upload>
                     <Button icon={<DownloadOutlined/>} size="small" style={{marginLeft:'12px'}} type="primary" onClick={this.handleExportExcel}>导出Excel</Button>
                     <Select value={this.state.fontFamily}  size="small" placeholder="字体" style={{width: '120px',marginLeft:'12px'}} onChange={this.handleFontChange}>
                         <Option value="微软雅黑">微软雅黑</Option>
                         <Option value="Times New Roman">Times New Roman</Option>
                     </Select>
                     <Button type="primary" size="small" style={{marginLeft: '12px'}} onClick={this.getContent}>获取值</Button>
                     <Button icon={<PrinterOutlined/>} type= "primary" size="small" style={{marginLeft:'12px'}} onClick ={this.handlePrint}></Button>
                 </div>
                <div style={{
                     height: 'calc(100% - 48px)'
                 }}>  
                    <SpreadSheets workbookInitialized = {this.spreadInitial}/>
                </div>
            </div>

        )
    }
}