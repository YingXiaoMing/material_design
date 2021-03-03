import { Text, TextMenu, XLineUi, YLineUi, QrCodeUi, LineMenu, BarCodeUi, XTable, BarCodeMenu, QrCodeMenu, TableMenu, RectangleUi, LabelBox, InputMenu } from './index'
export default [
  {
    id: 'TextBox',
    component: Text
  },
  {
    id: 'TextMenu',
    component: TextMenu
  },
  {
    id: 'LabelBox',
    component: LabelBox
  },
  {
    id: 'InputMenu',
    component: InputMenu
  },
  {
    id: 'H.Line',
    component: XLineUi
  },
  {
    id: 'V.Line',
    component: YLineUi
  },
  {
    id: 'QRCodeBox',
    component: QrCodeUi
  },
  {
    id: 'LineMenu',
    component: LineMenu
  },
  {
    id: 'BarCode',
    component: BarCodeUi
  },
  {
    id: 'Grid',
    component: XTable
  },
  {
    id: 'BarCodeMenu',
    component: BarCodeMenu
  },
  {
    id: 'QrCodeMenu',
    component: QrCodeMenu
  },
  {
    id: 'TableMenu',
    component: TableMenu
  }
  // {
  //   id: 'RectangleUi',
  //   component: RectangleUi
  // }
]
