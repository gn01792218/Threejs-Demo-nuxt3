export enum MaterialEnum {
    MeshBasicMaterial, 
    MeshStandardMaterial,
}

//基本
export interface Position3D {
    x: number,
    y: number,
    z: number
}

//幾何物件屬性
export interface SphereGeometryProperty{
    radius:number,
    widthSegments:number,
    heightSegments:number
}
export interface RingGeometryProperty{
    innerRadius:number,
    outerRadius:number,
    theatSegments:number, //數值越高，環形外框越圓滑
    phiSegments:number  //數值越高，環形平面的段數越多
}