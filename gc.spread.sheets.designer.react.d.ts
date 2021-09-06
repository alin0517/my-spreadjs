import * as React from 'react';
// @ts-ignore
import * as GC from '@grapecity/spread-sheets-designer';
import {Spread} from '@grapecity/spread-sheets';
import * as CSS from 'csstype';

export interface DesignerProp { 
    config ?:  GC.Spread.Sheets.Designer.IDesignerConfig;
    styleInfo : CSS.Properties;
    spreadOptions ?: Spread.Sheets.IWorkBookDefaultOptions;
}
export declare class Designer extends React.Component<DesignerProp, any> {
}

