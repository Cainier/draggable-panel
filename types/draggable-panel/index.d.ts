export interface ChartItem {
    id: number | string
    width: number
    height: number
    x: number
    y: number
}

export interface Position {
    x: number
    y: number
}

export interface Style {
    [name: string]: any
}

export interface Props {
    width: number
    height: number
    data: ChartItem []
    chartMinWidth: number | undefined
    chartMinHeight: number | undefined
    padding: number | undefined
    lock: boolean | undefined
    canvasStyle: Style | undefined
    chartStyle: Style | undefined
    scaleMin: number | undefined
    scaleMax: number | undefined
}

export interface Slots {

}

export interface Events {

}

export interface Refs {

}
