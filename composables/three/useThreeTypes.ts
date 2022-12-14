
/**
 * THREE.js 的types載入集合
 * 專門讓外面個個元件取用，不必再import
 */
import * as THREE from "three";
import { MaterialEnum } from '@/types/three'
export default function useThreeTypes() {
  return {
    //enum
    MaterialEnum,
  };
}