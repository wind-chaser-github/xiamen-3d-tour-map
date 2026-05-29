import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Billboard, Html, Line, Center } from '@react-three/drei';
import * as THREE from 'three';
import { geoMercator } from 'd3-geo';
import { provinceLogos, cityLogos, spotsData, getFallbackSpots } from '../data/travelData';

// --- 3D 卡通手绘地标模型组件 (Toy Models) ---

// 1. 中式古塔 (代表：古刹、泉州开元寺等)
function ToyPagoda({ color = "#d97706" }) {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      <mesh castShadow position={[0, 0, 0.1]}>
        <cylinderGeometry args={[1.2, 1.3, 0.3, 6]} />
        <meshStandardMaterial color="#78716c" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.9, 1.1, 1.2, 6]} />
        <meshStandardMaterial color="#f5f5f4" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0, 1.5]}>
        <coneGeometry args={[1.4, 0.4, 6]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0, 2.2]}>
        <cylinderGeometry args={[0.7, 0.9, 1.0, 6]} />
        <meshStandardMaterial color="#f5f5f4" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0, 2.8]}>
        <coneGeometry args={[1.1, 0.35, 6]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0, 3.5]}>
        <coneGeometry args={[0.5, 1.2, 6]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// 2. 中式古典凉亭/牌楼 (代表：福州三坊七巷等)
function ToyPavilion({ color = "#e23a3a" }) {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      <mesh castShadow position={[0, 0, 0.1]}>
        <boxGeometry args={[2.0, 2.0, 0.2]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
      </mesh>
      {[-0.7, 0.7].map((x) => 
        [-0.7, 0.7].map((y) => (
          <mesh key={`${x}-${y}`} castShadow position={[x, y, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1.6, 8]} />
            <meshStandardMaterial color="#991b1b" roughness={0.4} />
          </mesh>
        ))
      )}
      <mesh castShadow position={[0, 0, 1.8]}>
        <boxGeometry args={[1.7, 1.7, 0.15]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0, 2.4]}>
        <coneGeometry args={[1.6, 1.0, 4]} rotation={[0, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#065f46" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 0, 3.0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 3. 翠绿手绘小山丘 (代表：武夷山、自然风景)
function ToyMountain() {
  return (
    <group scale={[0.2, 0.2, 0.2]}>
      <mesh castShadow position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1.2, 2.4, 4]} />
        <meshStandardMaterial color="#047857" roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow position={[0.7, -0.4, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.8, 1.6, 4]} />
        <meshStandardMaterial color="#059669" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-0.4, 0.5, 0.3]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color="#065f46" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 4. 水乡小帆船 (代表：湖泊风景、海湾)
function ToyBoat() {
  return (
    <group scale={[0.18, 0.18, 0.18]} rotation={[0, 0, Math.PI / 6]}>
      <mesh castShadow position={[0, 0, 0.2]}>
        <boxGeometry args={[1.8, 0.7, 0.35]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.35, 1.1]}>
        <coneGeometry args={[0.6, 1.2, 3]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#fafafa" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 5. 蓝色海岛风车 (代表：平潭风车、霞浦海景)
function ToyWindmill() {
  const bladeRef = useRef();
  
  useFrame((_, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <group scale={[0.16, 0.16, 0.16]}>
      <mesh castShadow position={[0, 0, 0.2]}>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0, 1.3]}>
        <cylinderGeometry args={[0.5, 0.8, 1.8, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0, 2.2]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>
      <group ref={bladeRef} position={[0, 0.52, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.2, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {[0, 120, 240].map((deg) => (
          <group key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[0.12, 1.6, 0.02]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// 6. 客家土楼 (代表：龙岩、漳州土楼)
function ToyTulou() {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      {/* 土楼环形外墙 */}
      <mesh castShadow position={[0, 0, 0.5]}>
        <cylinderGeometry args={[1.2, 1.2, 1.0, 32, 1, true]} />
        <meshStandardMaterial color="#c29d70" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* 内部地面 */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
      {/* 环形瓦片楼顶 */}
      <mesh castShadow position={[0, 0, 1.0]}>
        <cylinderGeometry args={[1.35, 0.8, 0.25, 32]} />
        <meshStandardMaterial color="#374151" roughness={0.4} />
      </mesh>
      {/* 大门 */}
      <mesh position={[0, -1.15, 0.35]}>
        <boxGeometry args={[0.4, 0.2, 0.5]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
    </group>
  );
}

// 7. 海滩与椰树 (代表：东山岛、平潭、湄洲岛等海岛)
function ToyBeach() {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      <mesh castShadow position={[0, 0, 0.05]}>
        <cylinderGeometry args={[1.5, 1.6, 0.1, 16]} />
        <meshStandardMaterial color="#fef08a" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, -0.6, 0.06]}>
        <cylinderGeometry args={[0.8, 0.9, 0.08, 12]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh castShadow position={[-0.4, 0.2, 0.6]} rotation={[0.1, 0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {[-0.2, 0, 0.2].map((rx) =>
        [-0.2, 0.2].map((ry) => (
          <mesh key={`${rx}-${ry}`} castShadow position={[-0.4 + rx, 0.2 + ry, 1.2]} rotation={[rx, ry, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

// 8. 经典石拱桥/古桥 (代表：洛阳桥等)
function ToyBridge() {
  return (
    <group scale={[0.16, 0.16, 0.16]} rotation={[0, 0, Math.PI / 4]}>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#a5f3fc" roughness={0.2} transparent opacity={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0, 0.5]}>
        <boxGeometry args={[1.8, 0.6, 0.7]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.8, 16]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

// 9. 3D 迷你万里长城 (代表：北京、华北长城)
function ToyGreatWall() {
  return (
    <group scale={[0.14, 0.14, 0.14]}>
      {/* 烽火台 1 */}
      <mesh castShadow position={[-1.2, 0, 0.4]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#8b8c8d" roughness={0.8} />
      </mesh>
      {/* 烽火台 2 */}
      <mesh castShadow position={[1.2, 0, 0.4]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#8b8c8d" roughness={0.8} />
      </mesh>
      {/* 连接城墙 */}
      <mesh castShadow position={[0, 0, 0.2]}>
        <boxGeometry args={[2.0, 0.4, 0.5]} />
        <meshStandardMaterial color="#a0a1a2" roughness={0.9} />
      </mesh>
      {/* 城垛 */}
      <mesh castShadow position={[0, 0.16, 0.5]}>
        <boxGeometry args={[1.8, 0.08, 0.15]} />
        <meshStandardMaterial color="#78797a" />
      </mesh>
    </group>
  );
}

// 10. 3D 迷你可爱熊猫 (代表：四川大熊猫)
function ToyPanda() {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      {/* 身体 */}
      <mesh castShadow position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* 头部 */}
      <mesh castShadow position={[0, 0, 1.0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* 左耳 */}
      <mesh castShadow position={[-0.38, 0, 1.4]} rotation={[0, Math.PI/6, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>
      {/* 右耳 */}
      <mesh castShadow position={[0.38, 0, 1.4]} rotation={[0, -Math.PI/6, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>
      {/* 四肢（拟物黑色方块/椭圆） */}
      <mesh position={[-0.35, -0.2, 0.2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.35, -0.2, 0.2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* 绿竹子 */}
      <mesh position={[0.25, 0.3, 0.6]} rotation={[0, 0, Math.PI/8]}>
        <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 11. 3D 迷你雪山群 (代表：喜马拉雅、西藏雪峰)
function ToySnowMountain() {
  return (
    <group scale={[0.18, 0.18, 0.18]}>
      {/* 主峰 (下半段岩石，上半段雪) */}
      <mesh castShadow position={[0, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1.0, 2.0, 4]} />
        <meshStandardMaterial color="#78716c" roughness={0.9} flatShading />
      </mesh>
      {/* 主峰雪顶 */}
      <mesh position={[0, 0, 1.51]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.5, 1.0, 4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} flatShading />
      </mesh>
      {/* 侧峰 */}
      <mesh castShadow position={[-0.6, -0.3, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.7, 1.3, 4]} />
        <meshStandardMaterial color="#87807a" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-0.6, -0.3, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.35, 0.65, 4]} />
        <meshStandardMaterial color="#f5f5f4" roughness={0.5} flatShading />
      </mesh>
    </group>
  );
}

// 12. 3D 迷你草原蒙古包 (代表：内蒙古大草原)
function ToyYurt() {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      {/* 包身围墙 */}
      <mesh castShadow position={[0, 0, 0.3]}>
        <cylinderGeometry args={[1.1, 1.15, 0.6, 16]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>
      {/* 包顶红边圆锥 */}
      <mesh castShadow position={[0, 0, 0.8]}>
        <coneGeometry args={[1.25, 0.5, 16]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#ef4444" roughness={0.5} />
      </mesh>
      {/* 顶天窗 */}
      <mesh position={[0, 0, 1.05]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} />
      </mesh>
    </group>
  );
}

// 13. 3D 迷你丝路骆驼 (代表：甘肃河西走廊)
function ToyCamel() {
  return (
    <group scale={[0.14, 0.14, 0.14]} rotation={[0, 0, -Math.PI/6]}>
      {/* 身体 */}
      <mesh castShadow position={[0, 0, 0.4]}>
        <boxGeometry args={[1.0, 0.4, 0.45]} />
        <meshStandardMaterial color="#d97706" roughness={0.9} />
      </mesh>
      {/* 双驼峰 */}
      <mesh castShadow position={[-0.2, 0, 0.72]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#b45309" />
      </mesh>
      <mesh castShadow position={[0.2, 0, 0.72]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#b45309" />
      </mesh>
      {/* 脖子与头 */}
      <mesh castShadow position={[0.5, 0, 0.7]} rotation={[0, -Math.PI/6, 0]}>
        <boxGeometry args={[0.2, 0.22, 0.7]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
    </group>
  );
}

// 14. 3D 迷你北国雪松 (代表：东北林海雪原)
function ToySnowPine() {
  return (
    <group scale={[0.16, 0.16, 0.16]}>
      {/* 树干 */}
      <mesh position={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 6]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      {/* 三层雪松针 (纯白色覆雪效果) */}
      <mesh castShadow position={[0, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.8, 0.7, 5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0, 1.0]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.6, 0.6, 5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.8} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0, 1.35]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.4, 0.4, 5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

// 卡通模型分配渲染 (扩充更多旅游景点专属模型)
const ToyRenderer = React.memo(function ToyRenderer({ type, logo, theme, toyType }) {
  const chosenType = toyType || "";
  
  if (chosenType === "tulou" || logo === "🏰") return <ToyTulou />;
  if (chosenType === "mountain" || type?.includes("山") || logo === "⛰️" || logo === "🧗") return <ToyMountain />;
  if (chosenType === "beach" || logo === "🏝️" || logo === "🐚" || logo === "🏖️" || type?.includes("海岛") || type?.includes("滩涂")) return <ToyBeach />;
  if (chosenType === "boat" || type?.includes("溪") || type?.includes("游船") || type?.includes("湖") || type?.includes("海") || logo === "⛵" || logo === "🛶" || logo === "🚢" || logo === "🐬") return <ToyBoat />;
  if (chosenType === "bridge" || type?.includes("桥") || logo === "🌉") return <ToyBridge />;
  if (chosenType === "windmill" || logo === "🦀") return <ToyWindmill />;
  if (chosenType === "pagoda" || type?.includes("塔") || type?.includes("寺") || type?.includes("庙") || logo === "⛩️" || logo === "🕍" || logo === "🛎️" || logo === "🏛️" || logo === "🛕") {
    return <ToyPagoda color={theme} />;
  }
  // 对于没有专属模型的，我们返回 null，不渲染任何庞大的 3D 占位模型，避免遮挡底图上精美的手绘建筑！
  return null;
});


// 辅助函数：根据省份特色，获取其核心的人文、风景、历史印章简称与特色标志
function getProvinceCulturalWatermark(name) {
  const clean = name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '');
  
  const watermarks = {
    "福建": { text: "闽", emoji: "🍵", color: "#059669" }, // 福建：闽茶
    "四川": { text: "蜀", emoji: "🐼", color: "#10b981" }, // 四川：蜀猫
    "陕西": { text: "秦", emoji: "⚔️", color: "#b45309" }, // 陕西：兵俑
    "江苏": { text: "苏", emoji: "🪭", color: "#06b6d4" }, // 江苏：苏园
    "浙江": { text: "浙", emoji: "⛵", color: "#14b8a6" }, // 浙江：西湖
    "北京": { text: "京", emoji: "⛩️", color: "#ef4444" }, // 北京：紫禁
    "广东": { text: "粤", emoji: "🦁", color: "#e11d48" }, // 广东：醒狮
    "湖北": { text: "楚", emoji: "🏢", color: "#0284c7" }, // 湖北：黄鹤
    "湖南": { text: "湘", emoji: "🌶️", color: "#f43f5e" }, // 湖南：湘辣
    "河南": { text: "豫", emoji: "🥋", color: "#ea580c" }, // 河南：中原
    "山东": { text: "鲁", emoji: "🏔️", color: "#4f46e5" }, // 山东：泰山
    "安徽": { text: "徽", emoji: "⛰️", color: "#0d9488" }, // 安徽：徽黄
    "江西": { text: "赣", emoji: "🏺", color: "#10b981" }, // 江西：景德
    "云南": { text: "滇", emoji: "🌸", color: "#ec4899" }, // 云南：花卉
    "贵州": { text: "黔", emoji: "🌊", color: "#0891b2" }, // 贵州：奇瀑
    "西藏": { text: "藏", emoji: "🏔️", color: "#f43f5e" }, // 西藏：日光
    "青海": { text: "青", emoji: "💧", color: "#2563eb" }, // 青海：镜面
    "甘肃": { text: "陇", emoji: "🐫", color: "#d97706" }, // 甘肃：丝绸
    "新疆": { text: "疆", emoji: "🍇", color: "#eab308" }, // 新疆：葡萄
    "内蒙古": { text: "蒙", emoji: "⛺", color: "#10b981" }, // 内蒙古：草庐
    "黑龙江": { text: "黑", emoji: "❄️", color: "#7dd3fc" }, // 东北：冰雪
    "吉林": { text: "吉", emoji: "❄️", color: "#38bdf8" }, // 东北：雾凇
    "辽宁": { text: "辽", emoji: "🏭", color: "#6b7280" }, // 东北：辽盛
    "河北": { text: "冀", emoji: "🏯", color: "#f59e0b" }, // 华北：承德
    "山西": { text: "晋", emoji: "🕍", color: "#d97706" }, // 华北：晋商
    "海南": { text: "琼", emoji: "🌴", color: "#f59e0b" }, // 南海：海岛
    "台湾": { text: "台", emoji: "⛰️", color: "#14b8a6" }  // 台湾：阿里
  };
  
  return watermarks[clean] || { text: clean.substring(0, 1), emoji: "🗺️", color: "#845e3c" };
}

// 辅助函数：为中国大图中的每一个省份绘制其专属的满版人文/风景底纹图案，彻底消灭“千省一面”的纯色背景
function drawProvinceBackgroundPattern(ctx, name, isHovered) {
  const clean = name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '');
  ctx.save();
  
  // 极淡的水印底纹透明度，Hover 时稍微明显一些
  ctx.globalAlpha = isHovered ? 0.16 : 0.08;
  
  if (clean === "四川") {
    // 四川：茂密竹林叶脉底纹
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 1.0;
    for (let i = 20; i < 256; i += 60) {
      for (let j = 20; j < 256; j += 60) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.quadraticCurveTo(i + 15, j - 20, i + 30, j);
        ctx.quadraticCurveTo(i + 15, j + 20, i, j);
        ctx.stroke();
      }
    }
  } else if (clean === "福建") {
    // 福建：武夷茶叶脉与海丝波浪底纹
    ctx.strokeStyle = '#0d9488';
    ctx.lineWidth = 0.8;
    for (let y = 25; y < 256; y += 45) {
      ctx.beginPath();
      for (let x = 10; x < 256; x += 30) {
        ctx.arc(x, y, 12, Math.PI, 0, false);
      }
      ctx.stroke();
    }
  } else if (clean === "北京") {
    // 北京：皇家红墙与复古窗棂木格格栅底纹
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let i = 20; i < 256; i += 30) {
      ctx.moveTo(i, 0); ctx.lineTo(i, 256);
      ctx.moveTo(0, i); ctx.lineTo(256, i);
    }
    ctx.stroke();
  } else if (clean === "陕西") {
    // 陕西：青铜饕餮器物方折回纹底纹
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 1.0;
    for (let i = 15; i < 256; i += 50) {
      for (let j = 15; j < 256; j += 50) {
        ctx.beginPath();
        ctx.moveTo(i, j); ctx.lineTo(i + 20, j); ctx.lineTo(i + 20, j + 20); ctx.lineTo(i + 5, j + 20); ctx.lineTo(i + 5, j + 8); ctx.lineTo(i + 14, j + 8);
        ctx.stroke();
      }
    }
  } else if (clean === "浙江") {
    // 浙江：西湖涟漪与水波曲线底纹
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 0.8;
    for (let y = 20; y < 256; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(64, y - 10, 192, y + 10, 256, y);
      ctx.stroke();
    }
  } else if (clean === "江苏") {
    // 江苏：江南古典漏窗格纹底纹
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 0.8;
    for (let i = 30; i < 256; i += 60) {
      for (let j = 30; j < 256; j += 60) {
        ctx.beginPath();
        ctx.moveTo(i - 15, j - 25); ctx.lineTo(i + 15, j - 25); ctx.lineTo(i + 25, j - 15); ctx.lineTo(i + 25, j + 15); ctx.lineTo(i + 15, j + 25); ctx.lineTo(i - 15, j + 25); ctx.lineTo(i - 25, j + 15); ctx.lineTo(i - 25, j - 15); ctx.closePath();
        ctx.stroke();
      }
    }
  } else if (clean === "新疆") {
    // 新疆：吐鲁番串串葡萄与藤蔓底纹
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 0.8;
    for (let y = 30; y < 256; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.quadraticCurveTo(128, y - 20, 256, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
      for (let x = 40; x < 256; x += 60) {
        ctx.beginPath();
        ctx.arc(x, y - 4, 3.5, 0, Math.PI*2);
        ctx.arc(x + 5, y, 3.5, 0, Math.PI*2);
        ctx.fill();
      }
    }
  } else if (["黑龙江", "吉林", "辽宁"].includes(clean)) {
    // 东北：冰雪冰晶六角雪花底纹
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 0.8;
    for (let i = 40; i < 256; i += 70) {
      for (let j = 40; j < 256; j += 70) {
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
          ctx.moveTo(i, j);
          ctx.lineTo(i + Math.cos(angle) * 10, j + Math.sin(angle) * 10);
        }
        ctx.stroke();
      }
    }
  } else if (clean === "海南") {
    // 海南：热带椰树扇状叶脉底纹
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 0.8;
    for (let i = 50; i < 256; i += 80) {
      const cy = i;
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.moveTo(i, cy);
        ctx.quadraticCurveTo(i + Math.cos(angle)*12, cy + Math.sin(angle)*12 - 4, i + Math.cos(angle)*24, cy + Math.sin(angle)*24);
      }
      ctx.stroke();
    }
  } else {
    // 其他省份：通用写意祥云纹底纹
    ctx.strokeStyle = 'rgba(139, 92, 26, 0.15)';
    ctx.lineWidth = 0.8;
    for (let i = 25; i < 256; i += 50) {
      for (let j = 25; j < 256; j += 50) {
        ctx.beginPath();
        ctx.arc(i, j, 8, 0, Math.PI, true);
        ctx.stroke();
      }
    }
  }
  
  ctx.restore();
}

// 辅助函数：绘制各省在全国大图上独立特行的人文/风景精美彩绘微缩插图
function drawProvinceWatercolorSketch(ctx, name) {
  const clean = name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '');
  ctx.save();
  
  // 统一平铺定位在左侧中下部，与右侧印章拉开错落美
  ctx.translate(75, 95);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (clean === "四川") {
    // 四川：画一只抱着绿竹啃的黑白大熊猫与青绿山头
    ctx.beginPath();
    ctx.moveTo(-15, 15); ctx.quadraticCurveTo(0, -10, 15, 15);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(4, 120, 87, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 熊猫大头
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath(); ctx.arc(0, 5, 10, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(31, 41, 55, 0.2)'; ctx.lineWidth = 0.8; ctx.stroke();
    // 熊猫黑耳与眼圈
    ctx.fillStyle = 'rgba(31, 41, 55, 0.7)';
    ctx.beginPath();
    ctx.arc(-8, -3, 3, 0, Math.PI*2);
    ctx.arc(8, -3, 3, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-4, 4, 2.5, 1.8, Math.PI/6, 0, Math.PI*2);
    ctx.ellipse(4, 4, 2.5, 1.8, -Math.PI/6, 0, Math.PI*2);
    ctx.fill();
  } else if (clean === "福建") {
    // 福建：画一个朱红夯土客家土楼和青绿茶山
    ctx.beginPath();
    ctx.moveTo(-15, 15); ctx.quadraticCurveTo(0, -10, 15, 15);
    ctx.fillStyle = 'rgba(13, 148, 136, 0.15)'; ctx.fill();
    ctx.strokeStyle = 'rgba(13, 148, 136, 0.25)'; ctx.stroke();

    // 土楼圆环
    ctx.fillStyle = 'rgba(180, 83, 9, 0.15)';
    ctx.beginPath(); ctx.ellipse(15, 10, 15, 8, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.35)'; ctx.lineWidth = 1.0; ctx.stroke();
    ctx.fillStyle = 'rgba(55, 65, 81, 0.3)';
    ctx.beginPath(); ctx.ellipse(15, 7, 16, 3, 0, 0, Math.PI*2); ctx.fill();
  } else if (clean === "北京") {
    // 北京：长城烽火台与红柱蓝顶祈年殿
    ctx.strokeStyle = 'rgba(107, 114, 128, 0.3)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-20, 15); ctx.quadraticCurveTo(0, 0, 20, 10);
    ctx.stroke();
    ctx.fillStyle = 'rgba(243, 244, 246, 0.9)';
    ctx.beginPath(); ctx.rect(-5, 0, 10, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.4)'; ctx.lineWidth = 0.8; ctx.stroke();
  } else if (clean === "陕西") {
    // 陕西：写意秦佣军阵铜马车
    ctx.fillStyle = 'rgba(120, 113, 108, 0.2)';
    ctx.beginPath(); ctx.rect(-10, 4, 18, 9); ctx.fill();
    ctx.strokeStyle = 'rgba(68, 64, 60, 0.35)'; ctx.lineWidth = 1.0; ctx.stroke();
    ctx.beginPath(); ctx.arc(-14, 8, 5, 0, Math.PI*2); ctx.stroke();
  } else if (clean === "浙江") {
    // 浙江：西湖烟雨与扁舟
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-15, 12); ctx.quadraticCurveTo(0, 8, 15, 12);
    ctx.stroke();
    // 小舟
    ctx.fillStyle = 'rgba(120, 53, 15, 0.25)';
    ctx.beginPath();
    ctx.moveTo(-5, 14); ctx.lineTo(10, 14); ctx.lineTo(13, 10); ctx.lineTo(-8, 10); ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (clean === "江苏") {
    // 江苏：水乡小石桥与粉墙黛瓦马头墙
    ctx.strokeStyle = 'rgba(107, 114, 128, 0.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(-10, 15, 8, Math.PI, 0); ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath(); ctx.rect(5, 0, 16, 12); ctx.fill();
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)'; ctx.stroke();
    ctx.fillStyle = 'rgba(17, 24, 39, 0.4)';
    ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(13, -6); ctx.lineTo(24, 0); ctx.closePath(); ctx.fill();
  } else {
    // 其他省份：写意国风山峦脉络
    ctx.beginPath();
    ctx.moveTo(-20, 15); ctx.lineTo(-5, 0); ctx.lineTo(5, 8); ctx.lineTo(20, -4);
    ctx.strokeStyle = 'rgba(120, 113, 108, 0.22)'; ctx.lineWidth = 1.2; ctx.stroke();
  }

  ctx.restore();
}

// 辅助函数：将古典名句诗词以淡水墨毛笔字排版在 Canvas 地块贴图上
function drawProvincePoetry(ctx, name, isHovered) {
  const clean = name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '');
  
  const poetries = {
    "四川": "蜀道之难，难于上青天",
    "陕西": "大唐遗风，雁塔晨钟",
    "北京": "燕山雪花，紫禁风华",
    "江苏": "姑苏城外，钟声客船",
    "浙江": "欲把西湖，比之西子",
    "福建": "武夷岩茶，海丝福船",
    "广东": "日啖荔枝，岭南佳客",
    "湖北": "昔人已去，黄鹤空留",
    "云南": "彩云之南，四季长春",
    "山东": "齐鲁大地，岱宗独尊",
    "河南": "中原逐鹿，少林威名"
  };

  const text = poetries[clean];
  if (!text) return;

  ctx.save();
  ctx.fillStyle = isHovered ? "rgba(124, 104, 84, 0.45)" : "rgba(124, 104, 84, 0.18)";
  ctx.font = 'italic bold 12px "KaiTi", "STKaiti", "SimSun", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 218);
  ctx.restore();
}

// 辅助函数：绘制逼真的手绘晕染水彩纹理贴图，融入省份核心人文图案水印
function createWatercolorTexture(baseColor, isHovered, name) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  // 1. 铺设微黄宣纸底色
  ctx.fillStyle = '#fdfbf7';
  ctx.fillRect(0, 0, 256, 256);
  
  // 2. 径向水彩渲染：中心颜色极淡极润，边缘渐变到各省专属底色
  const grad = ctx.createRadialGradient(128, 128, 15, 128, 128, 125);
  grad.addColorStop(0, '#fefdfb'); // 极浅纸心
  grad.addColorStop(0.5, baseColor); // 各省专属代表底色
  
  // 修复“变黄”Bug：Hover 时仅仅温和提亮，而不硬编码扎眼的明黄色！
  const edgeColor = isHovered ? lightenColor(baseColor, 12) : darkenColor(baseColor, -15);
  grad.addColorStop(1, edgeColor);
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  
  // 3. 绘制每个省份独一无二的满版人文背景底纹图案（解决“千省一面”纯色问题）
  if (name) {
    drawProvinceBackgroundPattern(ctx, name, isHovered);
  }
  
  // 4. 绘制省份历史、人文专属红泥印章水印，彻底解决“纯色无图案”痛点
  const mark = getProvinceCulturalWatermark(name);
  if (mark && name) {
    ctx.save();
    ctx.globalAlpha = isHovered ? 0.15 : 0.08;
    
    // 4.1 绘制双线复古印章框
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(175, 95, 36, 0, Math.PI * 2); // 偏右上方，与左边手绘图错开
    ctx.stroke();
    
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(175, 95, 31, 0, Math.PI * 2);
    ctx.stroke();
    
    // 4.2 绘制毛笔字简称 (使用隶书/楷体古典字体)
    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 32px "KaiTi", "STKaiti", "SimSun", "Microsoft YaHei", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mark.text, 175, 92);
    
    // 4.3 将标志性风景人文 Emoji 渲染在印章下方，增添童趣与标识度
    ctx.font = '20px "Arial", sans-serif';
    ctx.fillText(mark.emoji, 175, 142);
    
    ctx.restore();
  }
  
  // 5. 绘制手绘简笔人文彩绘插图与诗词，赋予灵魂！
  if (name) {
    drawProvinceWatercolorSketch(ctx, name);
    drawProvincePoetry(ctx, name, isHovered);
  }
  
  // 6. 附带浅淡的等高线手绘网格细点，极其拟物精致
  ctx.strokeStyle = 'rgba(133, 107, 84, 0.05)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let i = 12; i < 256; i += 32) {
    ctx.moveTo(i, 0); ctx.lineTo(i, 256);
    ctx.moveTo(0, i); ctx.lineTo(256, i);
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 辅助温和提亮颜色的函数
function lightenColor(hex, percent) {
  let col = hex.replace("#", "");
  let num = parseInt(col, 16);
  let r = (num >> 16);
  let g = ((num >> 8) & 0x00FF);
  let b = (num & 0x0000FF);
  r = Math.min(255, Math.max(0, r + percent));
  g = Math.min(255, Math.max(0, g + percent));
  b = Math.min(255, Math.max(0, b + percent));
  return "#" + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
}

// 修复版的颜色加深/变浅函数，确保 100% 保持原有色相，绝不变紫、变灰
function darkenColor(hex, percent) {
  let col = hex.replace("#", "");
  let num = parseInt(col, 16);
  let r = (num >> 16);
  let g = ((num >> 8) & 0x00FF);
  let b = (num & 0x0000FF);
  r = Math.min(255, Math.max(0, r + percent));
  g = Math.min(255, Math.max(0, g + percent));
  b = Math.min(255, Math.max(0, b + percent));
  return "#" + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
}

// 拟物手绘微型小森林绿树组件 (用于点缀版图空旷处)
function MiniTree({ position }) {
  return (
    <group position={position} scale={[0.065, 0.065, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.0, 5]} />
        <meshStandardMaterial color="#6b5440" roughness={1.0} />
      </mesh>
      <mesh castShadow position={[0, 0.8, 0]}>
        <coneGeometry args={[0.9, 1.3, 5]} />
        <meshStandardMaterial color="#355e3b" roughness={1.0} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.4, 0]}>
        <coneGeometry args={[0.7, 0.9, 5]} />
        <meshStandardMaterial color="#4c7e54" roughness={1.0} flatShading />
      </mesh>
    </group>
  );
}

// 祥云/水墨云雾生成纹理函数
function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // 绘制淡雅半透明的云团渐变
  const grad = ctx.createRadialGradient(64, 64, 5, 64, 64, 60);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
  grad.addColorStop(0.5, 'rgba(242, 238, 228, 0.25)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 祥云飘动图层组件
function CloudLayer() {
  const clouds = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      pos: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, 3.2 + Math.random() * 1.0),
      scale: 2.2 + Math.random() * 2.5,
      speed: 0.12 + Math.random() * 0.18
    }));
  }, []);

  return (
    <group>
      {clouds.map((cloud) => (
        <SingleCloud key={cloud.id} cloud={cloud} />
      ))}
    </group>
  );
}

function SingleCloud({ cloud }) {
  const ref = useRef();
  const tex = useMemo(() => createCloudTexture(), []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x += 0.004 * cloud.speed;
      ref.current.position.y += 0.002 * cloud.speed;
      if (ref.current.position.x > 8.0) ref.current.position.x = -8.0;
      if (ref.current.position.y > 8.0) ref.current.position.y = -8.0;
      ref.current.position.z = cloud.pos.z + Math.sin(state.clock.getElapsedTime() * 0.4 + cloud.id) * 0.08;
    }
  });

  return (
    <mesh ref={ref} position={cloud.pos}>
      <planeGeometry args={[cloud.scale, cloud.scale]} />
      <meshBasicMaterial map={tex} transparent opacity={0.65} depthWrite={false} />
    </mesh>
  );
}

// 飞翔的 3D 仙鹤/白鹭组件
function FlyingCrane({ startPos, speed, radius, height }) {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const angle = t * speed * 0.12;
      groupRef.current.position.x = startPos.x + Math.cos(angle) * radius;
      groupRef.current.position.y = startPos.y + Math.sin(angle) * radius;
      groupRef.current.position.z = height + Math.sin(t * 0.6) * 0.15;
      groupRef.current.rotation.z = angle + Math.PI / 2;
    }
    if (leftWingRef.current && rightWingRef.current) {
      const flap = Math.sin(t * 4.5) * 0.35;
      leftWingRef.current.rotation.y = flap;
      rightWingRef.current.rotation.y = -flap;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <coneGeometry args={[0.06, 0.35, 4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0.015]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} />
      </mesh>
      <group position={[-0.04, 0, 0]} ref={leftWingRef}>
        <mesh position={[-0.18, 0, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <boxGeometry args={[0.35, 0.12, 0.008]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[-0.38, -0.01, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <boxGeometry args={[0.08, 0.09, 0.008]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>
      </group>
      <group position={[0.04, 0, 0]} ref={rightWingRef}>
        <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 10]}>
          <boxGeometry args={[0.35, 0.12, 0.008]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0.38, -0.01, 0]} rotation={[0, 0, Math.PI / 10]}>
          <boxGeometry args={[0.08, 0.09, 0.008]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function CranesLayer() {
  return (
    <group>
      <FlyingCrane startPos={new THREE.Vector2(-1.5, 0.5)} speed={1.1} radius={4.0} height={3.8} />
      <FlyingCrane startPos={new THREE.Vector2(2.0, -1.5)} speed={0.8} radius={5.2} height={4.6} />
    </group>
  );
}

// --- 3D 行政地块网格组件 ---
const GeoBlock = React.memo(function GeoBlock({
  data,
  bbox,
  depth,
  glowColor,
  name,
  onClickBlock,
  viewLevel,
  globalHanddrawnMap,
  fujianHanddrawnMap,
  xiamenHanddrawnMap,
  projection,
  chinaProjection,
  chinaBbox,
  adcode,
  xiamenBbox
}) {
  const groupRef = useRef();
  const vector3 = useRef(new THREE.Vector3(1, 1, 1));
  const [hovered, setHovered] = useState(false);

  const [shapes, shapeGeometry] = useMemo(() => {
    const shapes = data.points.map(pArr => new THREE.Shape(pArr));
    const shapeGeometry = new THREE.ShapeGeometry(shapes);
    return [shapes, shapeGeometry];
  }, [data.points]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(vector3.current, 0.15);
    }
  });

  // 精密防误触：记录鼠标按下位置与时间戳
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);

  // 动态厚度设计 (三大地理阶梯)，让全国大图在 3D 旋转时错落有致，极富视觉冲击力
  const blockDepth = useMemo(() => {
    if (viewLevel !== 'china') return depth;
    const cleanName = name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '');
    
    // 第一阶梯：高海拔高原区 (西藏、青海) -> 最厚
    if (["西藏", "青海"].includes(cleanName)) return 2.0;
    // 第二阶梯：中海拔高原与盆地 (新疆、内蒙古、甘肃、四川、陕西、贵州、云南、山西、宁夏、重庆) -> 中等厚度
    if (["新疆", "内蒙古", "甘肃", "四川", "陕西", "贵州", "云南", "山西", "宁夏", "重庆"].includes(cleanName)) return 1.25;
    // 第三阶梯：低海拔平原与丘陵 -> 浅厚度
    return 0.6;
  }, [viewLevel, name, depth]);

  // 根据省份人文底蕴，全国大地图视角下，分发精心挑选的专属人文地色调，彻底打碎大面积单色块沉闷
  const blockColor = useMemo(() => {
    const provinceKey = data.adcode ? String(data.adcode).substring(0, 2) : "";
    
    // 35-福建茶绿, 32-江苏水蓝灰, 61-陕西古赭, 11-北京朱砂红, 33-浙江天青蓝, 51-四川竹翠
    if (provinceKey === "35") return "#c5e4ce"; 
    if (provinceKey === "32") return "#cfdbd5"; 
    if (provinceKey === "61") return "#e7d6c1"; 
    if (provinceKey === "11") return "#f3d7d7"; 
    if (provinceKey === "33") return "#c8dfeb"; 
    if (provinceKey === "51") return "#cce5d3"; 
    if (provinceKey === "65") return "#f6dfb2"; // 新疆：瓜果暖金黄
    if (provinceKey === "54") return "#e0f2fe"; // 西藏：雪域日光蓝
    if (provinceKey === "15") return "#dcfce7"; // 内蒙古：草原嫩绿
    if (provinceKey === "46") return "#bae6fd"; // 海南：南沙椰林碧蓝
    if (provinceKey === "53") return "#fce7f3"; // 云南：七彩滇南粉
    if (["23", "22", "21"].includes(provinceKey)) return "#f1f5f9"; // 东北三省：冰雪亮白
    if (provinceKey === "44") return "#fee2e2"; // 广东：醒狮红墙暖橙
    if (provinceKey === "45") return "#d1fae5"; // 广西：山水翠绿
    
    // 羊皮纸宣纸黄 (通用底板暖色)
    return "#e9e4d3";
  }, [data.adcode, name]);

  // 1. 缓存动态水彩晕边网格纹理，确保流畅的高画质渲染 (仅在省市地图下作为底板)
  const watercolorTexture = useMemo(() => {
    return createWatercolorTexture(blockColor, hovered, name);
  }, [blockColor, hovered, name]);

  // 2. 核心突破：对 ExtrudeGeometry 重新进行全局投影 UV 计算，实现手绘画卷拼图效果！
  const projectedGeometry = useMemo(() => {
    const geom = new THREE.ExtrudeGeometry(shapes, { depth: blockDepth, bevelEnabled: false });
    
    // 如果是福建省省级视角，我们应当使用福建省的高清插画底图，不需要做全国地图逆投影，直接按福建省 bbox 进行 UV 映射，拼装出高清细节！
    if (viewLevel === 'province' && adcode === '350000' && bbox) {
      const posAttr = geom.attributes.position;
      const uvAttr = geom.attributes.uv;
      const width = bbox.max.x - bbox.min.x;
      const height = bbox.max.y - bbox.min.y;
      
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        
        const u = (x - bbox.min.x) / (width || 1);
        const v = (y - bbox.min.y) / (height || 1);
        
        uvAttr.setXY(i, u, v);
      }
      uvAttr.needsUpdate = true;
    }
    // 如果是厦门市市级视角，对所有 6 个区都统一应用精准膨胀的 xiamenBbox 映射，以形成无缝的整幅厦门手绘底图，并杜绝同安翔安纯色断层
    else if (viewLevel === 'city' && adcode === '350200') {
      const activeBbox = (xiamenBbox && xiamenBbox.min.x !== Infinity) ? xiamenBbox : bbox;
      
      const posAttr = geom.attributes.position;
      const uvAttr = geom.attributes.uv;
      const width = activeBbox.max.x - activeBbox.min.x;
      const height = activeBbox.max.y - activeBbox.min.y;
      
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        
        const u = (x - activeBbox.min.x) / (width || 1);
        const v = (y - activeBbox.min.y) / (height || 1);
        
        uvAttr.setXY(i, u, v);
      }
      uvAttr.needsUpdate = true;
    }
    // 如果是其他省级视角，我们利用逆投影将省级局部坐标还原为经纬度，再用全国投影算得大底图上的 UV 坐标，完美投影拼接！
    else if (viewLevel === 'province' && projection && chinaProjection && chinaBbox) {
      const posAttr = geom.attributes.position;
      const uvAttr = geom.attributes.uv;
      const width = chinaBbox.max.x - chinaBbox.min.x;
      const height = chinaBbox.max.y - chinaBbox.min.y;
      
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        
        // 逆投影还原为经纬度，注意在 Shape 里 Y 轴取了反 (y = -projectedY)
        const coord = projection.invert([x, -y]);
        if (coord) {
          const [cx, cy] = chinaProjection(coord);
          const u = (cx - chinaBbox.min.x) / (width || 1);
          const v = (-cy - chinaBbox.min.y) / (height || 1);
          uvAttr.setXY(i, u, v);
        }
      }
      uvAttr.needsUpdate = true;
    } else if (viewLevel === 'china' && bbox) {
      // 全国视角下直接按全国 bbox 映射
      const posAttr = geom.attributes.position;
      const uvAttr = geom.attributes.uv;
      const width = bbox.max.x - bbox.min.x;
      const height = bbox.max.y - bbox.min.y;
      
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        
        const u = (x - bbox.min.x) / (width || 1);
        const v = (y - bbox.min.y) / (height || 1);
        
        uvAttr.setXY(i, u, v);
      }
      uvAttr.needsUpdate = true;
    }
    
    return geom;
  }, [shapes, blockDepth, bbox, viewLevel, projection, chinaProjection, chinaBbox, adcode, xiamenBbox, data.adcode]);

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.set(1, 1, 1.25); // Hover 时上抬浮起，极富立体动感！
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        vector3.current.set(1, 1, 1.0);
        document.body.style.cursor = "auto";
        setHovered(false);
      }}
      onPointerDown={(e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY };
        pointerDownTime.current = Date.now();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        const dx = e.clientX - pointerDownPos.current.x;
        const dy = e.clientY - pointerDownPos.current.y;
        const dt = Date.now() - pointerDownTime.current;
        // 精密防抖判定：若拖拽平移距离大于 4 像素或按住时长超过 220 毫秒，则视为旋转相机，完全不触发下钻！
        if (Math.sqrt(dx * dx + dy * dy) > 4 || dt > 220) return;
        onClickBlock(data);
      }}
    >
      {/* 3D 陆地地块 */}
      <mesh castShadow receiveShadow geometry={projectedGeometry}>
        <meshStandardMaterial
          transparent
          attach="material-0"
          color="#ffffff" // 必须 be 白色，才能原汁原味展示大底图的丰富彩画纹理！
          map={
            viewLevel === 'china'
              ? globalHanddrawnMap
              : (viewLevel === 'province' && adcode === '350000'
                ? fujianHanddrawnMap
                : (viewLevel === 'city' && adcode === '350200'
                  ? xiamenHanddrawnMap // 所有 6 个地市区块共同拼接厦门高清手绘画卷，防止出现纯色断层
                  : (viewLevel === 'province'
                    ? globalHanddrawnMap
                    : watercolorTexture)))
          }
          roughness={1.0}
          side={THREE.DoubleSide}
        />
        <meshStandardMaterial
          transparent
          attach="material-1"
          color="#5c4533" // 木刻底座边框
          roughness={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* 手绘感深褐色描边线 */}
      <lineSegments position={[0, 0, blockDepth + 0.015]} raycast={() => null}>
        <edgesGeometry args={[shapeGeometry]} />
        <lineBasicMaterial transparent color={hovered ? "#ffaa00" : "#5d4b3b"} linewidth={1.8} opacity={hovered ? 0.95 : 0.4} />
      </lineSegments>

      {/* 省地图页面只展示城市名称，不再叠加低模装饰。 */}
      {viewLevel === 'province' && (
        <group position={[data.center.x, data.center.y, blockDepth + 1.25]}>
          <Billboard>
            <Html center style={{ pointerEvents: 'auto' }}>
              <div 
                id={`city-marker-${name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickBlock(data);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  background: '#ffffff',
                  border: '1.2px solid #d4c5b3',
                  borderRadius: '10px',
                  padding: '2.5px 7px',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  color: '#473a2e',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 3px 8px rgba(93, 75, 59, 0.15)',
                  userSelect: 'none',
                  transform: hovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.15s',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '10.5px' }}>📍</span>
                <span style={{ fontSize: '9px', color: '#5d4b3b' }}>
                  {name.replace(/(市|地区|自治州|盟)$/, '')}
                </span>
              </div>
            </Html>
          </Billboard>
        </group>
      )}

      {/* 海报同款：在全国大地图视角下，渲染精美圆角白色定位标 (白底暗金边，带阴影效果) */}
      {viewLevel === 'china' && (
        <group position={[data.center.x, data.center.y, blockDepth + 0.08]}>
          <Billboard>
            <Html center style={{ pointerEvents: 'auto' }}>
              <div 
                id={`province-marker-${name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickBlock(data);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  background: '#ffffff',
                  border: '1.2px solid #d4c5b3',
                  borderRadius: '12px',
                  padding: '3px 8px',
                  fontSize: '9.5px',
                  fontWeight: 'bold',
                  color: '#473a2e',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 3px 8px rgba(93, 75, 59, 0.15)',
                  userSelect: 'none',
                  transform: hovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.15s, border-color 0.15s',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '11px' }}>
                  {provinceLogos[name]?.logo || provinceLogos[name + "省"]?.logo || "📍"}
                </span>
                <span style={{ fontSize: '9px', color: '#5d4b3b' }}>
                  {name.replace(/(省|市|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区)$/, '')}
                </span>
              </div>
            </Html>
          </Billboard>
        </group>
      )}
    </group>
  );
});

// 全国主要研学著名景点数据配置 (常态化轻量标注，Hover 时触发精美弹窗介绍)
const chinaKeySpots = [
  { id: "sp-1", name: "八达岭长城", logo: "🧱", coords: [116.017, 40.358], desc: "明代万里长城的雄伟代表，山岭起伏，城脊蜿蜒，气势磅礴。" },
  { id: "sp-2", name: "故宫博物院", logo: "⛩️", coords: [116.397, 39.917], desc: "世界现存最大完整的皇家木建宫殿群，红墙黄瓦，底蕴极深。" },
  { id: "sp-3", name: "九寨沟", logo: "🌲", coords: [103.921, 33.262], desc: "高原群海叠瀑，彩林交相辉映，享有‘人间童话世界’之美誉。" },
  { id: "sp-4", name: "峨眉金顶", logo: "🧗", coords: [103.333, 29.525], desc: "佛教四大名山之一，金顶佛光与十方普贤造像极其宏伟庄严。" },
  { id: "sp-5", name: "鼓浪屿", logo: "🏝️", coords: [118.067, 24.444], desc: "海风悠扬的万国建筑群，钢琴之岛，音乐底蕴与欧式风情交融。" },
  { id: "sp-6", name: "武夷山", logo: "⛰️", coords: [117.986, 27.653], desc: "双遗产名山，九曲溪竹筏漂流山水如画，大红袍茶祖岩香远播。" },
  { id: "sp-7", name: "秦始皇兵马俑", logo: "⚔️", coords: [109.278, 34.384], desc: "地下战车与陶俑军阵威武磅礴，揭秘两千年前大秦雄风。" },
  { id: "sp-8", name: "杭州西湖", logo: "⛵", coords: [120.149, 30.245], desc: "苏堤春晓，断桥残雪，三潭印月，水墨江南的终极山水写意。" },
  { id: "sp-9", name: "布达拉宫", logo: "🕍", coords: [91.117, 29.658], desc: "耸立于日光红山之上的藏式宫殿群，红白耀眼，雄浑圣洁。" },
  { id: "sp-10", name: "呼伦贝尔大草原", logo: "⛺", coords: [119.761, 49.214], desc: "天高地迥的绿色牧场，骏马奔腾，牛羊点点，风吹草低见古包。" },
  { id: "sp-11", name: "敦煌莫高窟", logo: "🐫", coords: [94.802, 40.042], desc: "丝绸之路上的璀璨明珠，拥有世界上现存规模最大、内容最丰富的佛教石窟壁画与彩塑。" },
  { id: "sp-12", name: "三亚天涯海角", logo: "🌴", coords: [109.345, 18.292], desc: "海天一色，巨石临风，记录着千百年来沧海桑田的真挚誓言。" }
];

export default function TravelGeoMap({
  adcode = "100000",
  viewLevel = "china",
  baseColor = "#faf7ee",
  glowColor = "#ff7700",
  depth = 0.8,
  onSelectRegion,
  onSelectSpot,
  activeSpot = null
}) {
  const [geoData, setGeoData] = useState(null);
  const [overallBoundary, setOverallBoundary] = useState(null);

  // 2. 投影配置 (提升到顶部以防止 ReferenceError)
  const projection = useMemo(() => {
    if (!geoData || !geoData.features || geoData.features.length === 0) return null;
    
    let center = [104.195, 35.861]; 
    let scale = 60;

    if (viewLevel === 'china') {
      center = [104.195, 35.861];
      scale = 42;
    } else {
      let sumLon = 0;
      let sumLat = 0;
      let count = 0;
      
      geoData.features.forEach(f => {
        const cent = f.properties.centroid || f.properties.center;
        if (cent && cent[0] && cent[1]) {
          sumLon += cent[0];
          sumLat += cent[1];
          count++;
        }
      });

      if (count > 0) {
        center = [sumLon / count, sumLat / count];
      }
      scale = viewLevel === 'province' ? 350 : 1500;
    }

    return geoMercator().center(center).scale(scale).translate([0, 0]);
  }, [geoData, viewLevel]);

  const groupRef = useRef();

  const { camera, size } = useThree();
  const [hoveredKeySpot, setHoveredKeySpot] = useState(null);

  // 省份城市卡片的 2D 屏幕坐标 Ref（实时更新，不触发 re-render）
  const cityScreenPosRef = useRef({});

  // 加载全局国风旅游插画底图贴图，各省拼图共享同一张画卷
  const globalHanddrawnMap = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL || '/'}china_handdrawn_tourism_map.png`
  );
  // 加载福建省专属高清插画底图，解决省级视角地块拉伸模糊的痛点
  const fujianHanddrawnMap = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL || '/'}fujian_handdrawn_tourism_map.png`
  );
  // 加载厦门市专属高清插画底图，解决市级视角拉伸模糊问题
  const xiamenHanddrawnMap = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL || '/'}xiamen_handdrawn_tourism_map.png`
  );
  useEffect(() => {
    if (globalHanddrawnMap) {
      globalHanddrawnMap.wrapS = THREE.ClampToEdgeWrapping;
      globalHanddrawnMap.wrapT = THREE.ClampToEdgeWrapping;
      globalHanddrawnMap.minFilter = THREE.LinearFilter;
    }
    if (fujianHanddrawnMap) {
      fujianHanddrawnMap.wrapS = THREE.ClampToEdgeWrapping;
      fujianHanddrawnMap.wrapT = THREE.ClampToEdgeWrapping;
      fujianHanddrawnMap.minFilter = THREE.LinearFilter;
    }
    if (xiamenHanddrawnMap) {
      xiamenHanddrawnMap.wrapS = THREE.ClampToEdgeWrapping;
      xiamenHanddrawnMap.wrapT = THREE.ClampToEdgeWrapping;
      xiamenHanddrawnMap.minFilter = THREE.LinearFilter;
    }
  }, [globalHanddrawnMap, fujianHanddrawnMap, xiamenHanddrawnMap]);

  // 1.1 始终在顶层构建固定的全国大图投影与 bbox，用于在下钻省级地图时对地块进行无缝底图重映射
  const chinaProjection = useMemo(() => {
    return geoMercator().center([104.195, 35.861]).scale(42).translate([0, 0]);
  }, []);

  const chinaBbox = useMemo(() => {
    const bbox = new THREE.Box2();
    const toV2 = (coord) => {
      const [x, y] = chinaProjection(coord);
      return new THREE.Vector2(x, -y);
    };
    // 依据中国极点经纬度进行投影，计算出恒定的中国地图边界包围盒
    bbox.expandByPoint(toV2([73.66, 3.85]));   // 最西, 最南
    bbox.expandByPoint(toV2([135.08, 53.55])); // 最东, 最北
    return bbox;
  }, [chinaProjection]);


  // 计算全国核心著名景点的 3D 投影坐标位置，用于渲染小地标
  const keySpots = useMemo(() => {
    return chinaKeySpots.map(spot => {
      const [x, y] = chinaProjection(spot.coords);
      return {
        ...spot,
        position: new THREE.Vector3(x, -y, depth + 0.35)
      };
    });
  }, [chinaProjection, depth]);

  // 1. 加载 GeoJSON 边界数据
  useEffect(() => {
    setGeoData(null);
    setOverallBoundary(null);

    const base = import.meta.env.BASE_URL || '/';
    const localGeoUrl = (code, suffix = '') => `${base}geo/${code}${suffix}.json`;
    const loadGeoJson = async (code, suffix = '') => {
      const url = localGeoUrl(code, suffix);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Missing local GeoJSON ${url}: ${res.status}`);
      return await res.json();
    };

    loadGeoJson(adcode, '_full')
      .then(data => setGeoData(data))
      .catch(() => {
        loadGeoJson(adcode)
          .then(data => setGeoData(data))
          .catch(console.error);
      });

    loadGeoJson(adcode)
      .then(data => setOverallBoundary(data))
      .catch(console.error);
  }, [adcode, viewLevel]);

  // 投影配置已提升至组件顶部

  // 3. 构建多边形数据
  const { regions, bbox, boundaryShapes, xiamenBbox } = useMemo(() => {
    if (!geoData || !projection) return { regions: [], bbox: new THREE.Box2(), boundaryShapes: [], xiamenBbox: new THREE.Box2() };
    const regions = [];
    const extraRegions = [];
    const bbox = new THREE.Box2();
    const xiamenBbox = new THREE.Box2();

    const toV2 = (coord) => {
      const [x, y] = projection(coord);
      const projected = new THREE.Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    geoData.features.forEach((feature) => {
      let centroid = feature.properties.centroid || feature.properties.center;
      if (!centroid) {
        if (feature.geometry.type === 'Polygon') {
          centroid = feature.geometry.coordinates[0]?.[0];
        } else if (feature.geometry.type === 'MultiPolygon') {
          centroid = feature.geometry.coordinates[0]?.[0]?.[0];
        }
      }
      if (!centroid) return;
      
      const [x, y] = projection(centroid);
      const cleanedPoints = [];

      // 投影变换
      const toV2Local = (coord) => {
        const [cx, cy] = projection(coord);
        return new THREE.Vector2(cx, -cy);
      };

      const processRing = (ringPoints, featureName) => {
        if (ringPoints.length < 3) return;
        const projectedPoints = ringPoints.map(toV2Local);
        
        // 计算该多边形环在 3D 投影平面下的 2D 包围盒面积
        const ringBox = new THREE.Box2();
        projectedPoints.forEach(p => ringBox.expandByPoint(p));
        const sizeVec = new THREE.Vector2();
        ringBox.getSize(sizeVec);
        const area = sizeVec.x * sizeVec.y;
        const ringCenter = new THREE.Vector2();
        ringBox.getCenter(ringCenter);
        
        // 核心突破：过滤掉海面极小多边形礁石，避免其被 ExtrudeGeometry 拉伸为乱七八糟的 3D 立柱/漂浮形状。
        // 厦门市级视角只保留 6 个行政区主地块与鼓浪屿，避免翔安外海细碎岛礁被挤出成漂浮物。
        // 在省级视角过滤小于 0.015；在全国视角过滤小于 0.01。
        let minArea = 0.01;
        if (viewLevel === 'city') minArea = 0.025;
        else if (viewLevel === 'province') minArea = 0.015;

        const keepXiamenIsland =
          viewLevel === 'city' &&
          adcode === '350200' &&
          featureName === '思明区' &&
          area >= 0.18 &&
          area <= 0.4 &&
          ringCenter.x < -0.6 &&
          ringCenter.y < -3.6;

        const keepXiamenMainDistrict =
          viewLevel === 'city' &&
          adcode === '350200' &&
          area >= 5.0;

        const keepRing =
          viewLevel === 'city' && adcode === '350200'
            ? (keepXiamenMainDistrict || keepXiamenIsland)
            : area >= minArea;
        
        if (keepRing) {
          const displayPoints =
            viewLevel === 'city' && adcode === '350200'
              ? projectedPoints.map(p => p.clone().lerp(ringCenter, 0.018))
              : projectedPoints;

          // 仅对被保留地块的顶点扩张整体 bbox
          displayPoints.forEach(p => bbox.expandByPoint(p));
          if (keepXiamenIsland) {
            const [gulangyuX, gulangyuY] = projection([118.0645, 24.447]);
            extraRegions.push({
              name: "鼓浪屿",
              adcode: "350203-gulangyu",
              center: new THREE.Vector3(gulangyuX, -gulangyuY, 0),
              points: [displayPoints],
            });
            return;
          }
          cleanedPoints.push(displayPoints);
        }
      };

      if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach(poly1 => {
          poly1.forEach(poly2 => {
            processRing(poly2, feature.properties.name);
          });
        });
      } else if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach(poly1 => {
          processRing(poly1, feature.properties.name);
        });
      }

      if (cleanedPoints.length > 0) {
        regions.push({
          name: feature.properties.name,
          adcode: feature.properties.adcode,
          center: new THREE.Vector3(x, -y, 0),
          points: cleanedPoints,
        });
      }
    });
    regions.push(...extraRegions);

    if (viewLevel === 'city' && adcode === '350200') {
      for (let i = regions.length - 1; i >= 0; i--) {
        if (regions[i].adcode === "350203-gulangyu") regions.splice(i, 1);
      }

      const [gulangyuX, gulangyuYRaw] = projection([118.0648, 24.4432]);
      const gulangyuY = -gulangyuYRaw;
      const gulangyuPoints = Array.from({ length: 36 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 36;
        const wobble = 1 + Math.sin(angle * 3) * 0.08 + Math.cos(angle * 5) * 0.04;
        return new THREE.Vector2(
          gulangyuX + Math.cos(angle) * 0.36 * wobble,
          gulangyuY + Math.sin(angle) * 0.24 * wobble
        );
      });

      gulangyuPoints.forEach(p => bbox.expandByPoint(p));
      regions.push({
        name: "鼓浪屿",
        adcode: "350203-gulangyu",
        center: new THREE.Vector3(gulangyuX, gulangyuY, 0),
        points: [gulangyuPoints],
      });
    }

    let boundaryShapes = [];
    if (overallBoundary && overallBoundary.features) {
      overallBoundary.features.forEach((feature) => {
        const processRing = (ringPoints) => {
          if (ringPoints.length < 3) return;
          const v2Points = ringPoints.map(toV2);
          
          // 计算该多边形环在 3D 投影平面下的 2D 包围盒面积
          const ringBox = new THREE.Box2();
          v2Points.forEach(p => ringBox.expandByPoint(p));
          const sizeVec = new THREE.Vector2();
          ringBox.getSize(sizeVec);
          const area = sizeVec.x * sizeVec.y;
          
          const minArea = viewLevel === 'china' ? 0.25 : 0.04;
          if (area >= minArea) {
            boundaryShapes.push(new THREE.Shape(v2Points));
          }
        };

        if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach(poly1 => {
            poly1.forEach(poly2 => {
              processRing(poly2);
            });
          });
        } else if (feature.geometry.type === 'Polygon') {
          feature.geometry.coordinates.forEach(poly1 => {
            processRing(poly1);
          });
        }
      });
    }

    // 精细对齐：若是厦门层级，我们将 xiamenBbox 复制为包含全市所有行政区的整体 bbox，并安全防御判断非 Infinity。
    // 在其边缘进行 6.5% 的等比膨胀外扩，以与整幅厦门手绘底图实现像素级精确物理重合，彻底免除同安区和翔安区的越界纯色和偏离对齐。
    if (viewLevel === 'city' && adcode === '350200' && bbox.min.x !== Infinity && bbox.min.x !== -Infinity) {
      xiamenBbox.copy(bbox);
      const sizeVec = new THREE.Vector2();
      bbox.getSize(sizeVec);
      
      xiamenBbox.min.x -= sizeVec.x * 0.065;
      xiamenBbox.max.x += sizeVec.x * 0.065;
      xiamenBbox.min.y -= sizeVec.y * 0.065;
      xiamenBbox.max.y += sizeVec.y * 0.065;
    }

    return { regions, bbox, boundaryShapes, xiamenBbox };
  }, [geoData, projection, overallBoundary, adcode, viewLevel]);

  // 4. 计算地级市在省地图两侧挂牌的排版数据 (复现游学手绘连线图章排版！)
  // 4. 计算地级市在省地图两侧挂牌的排版数据 (复现游学手绘连线图章排版！)
  const sidebarCards = useMemo(() => {
    if (viewLevel !== 'province' || regions.length === 0 || !bbox) return [];
    
    // 1. 基于所有地市 X 轴坐标的中位数进行严格的左右均衡对等分流，防止分流不均拥挤在单侧
    const sortedByX = [...regions].sort((a, b) => a.center.x - b.center.x);
    const midIndex = Math.floor(sortedByX.length / 2);
    const midX = sortedByX[midIndex]?.center.x || 0;

    const leftRegions = regions.filter(r => r.center.x <= midX).sort((a, b) => b.center.y - a.center.y);
    const rightRegions = regions.filter(r => r.center.x > midX).sort((a, b) => b.center.y - a.center.y);

    // 2. 极大扩展卡片垂直（Y 轴）可用摆放区间，留出足够的空余区域进行大间距对齐
    const minY = bbox.min.y - 7.5; // 大幅扩张下边缘
    const maxY = bbox.max.y + 7.5; // 大幅扩张上边缘
    const height = maxY - minY;

    // 3. 垂直均匀平铺对齐算法
    const computePositions = (list) => {
      if (list.length === 0) return [];
      const cardGap = 3.0; // 3D 空间卡片之间加大垂直安全间距（防 HTML 像素大小遮挡）
      const totalHeightNeeded = (list.length - 1) * cardGap;
      const center = (minY + maxY) / 2;
      
      let startY = center + totalHeightNeeded / 2;
      if (totalHeightNeeded > height) {
        // 高度实在不够时等间距平摊
        const step = height / (list.length - 1 || 1);
        return list.map((_, i) => maxY - i * step);
      } else {
        // 在宽绰的高度区间里以 cardGap 间距中心对齐
        return list.map((_, i) => startY - i * cardGap);
      }
    };

    const leftYPositions = computePositions(leftRegions);
    const rightYPositions = computePositions(rightRegions);

    const cards = [];

    // 处理左侧卡片
    leftRegions.forEach((region, i) => {
      const cleanName = region.name.replace(/(市|地区|自治州|盟)$/, '');
      const logoData = cityLogos[region.name] || cityLogos[cleanName];
      const detailLabel = logoData ? logoData.label : "核心地标景区";
      const themeColor = logoData ? logoData.themeColor : "#d97706";

      const targetX = bbox.min.x - 7.0; // 往左侧更宽处推开，防止遮挡省地块
      const targetY = leftYPositions[i];

      cards.push({
        id: `sidebar-${region.adcode}`,
        name: cleanName,
        regionData: region,
        label: detailLabel,
        color: themeColor,
        isLeft: true,
        linePoints: [
          new THREE.Vector3(region.center.x, region.center.y, depth + 0.1), 
          new THREE.Vector3((region.center.x + targetX) / 2, region.center.y, depth + 0.3), 
          new THREE.Vector3(targetX + 1.0, targetY, depth + 0.2)
        ],
        cardPos: new THREE.Vector3(targetX, targetY, depth + 0.2)
      });
    });

    // 处理右侧卡片
    rightRegions.forEach((region, i) => {
      const cleanName = region.name.replace(/(市|地区|自治州|盟)$/, '');
      const logoData = cityLogos[region.name] || cityLogos[cleanName];
      const detailLabel = logoData ? logoData.label : "核心地标景区";
      const themeColor = logoData ? logoData.themeColor : "#d97706";

      const targetX = bbox.max.x + 7.0; // 往右侧更宽处推开
      const targetY = rightYPositions[i];

      cards.push({
        id: `sidebar-${region.adcode}`,
        name: cleanName,
        regionData: region,
        label: detailLabel,
        color: themeColor,
        isLeft: false,
        linePoints: [
          new THREE.Vector3(region.center.x, region.center.y, depth + 0.1), 
          new THREE.Vector3((region.center.x + targetX) / 2, region.center.y, depth + 0.3), 
          new THREE.Vector3(targetX - 1.0, targetY, depth + 0.2)
        ],
        cardPos: new THREE.Vector3(targetX, targetY, depth + 0.2)
      });
    });

    return cards;
  }, [regions, viewLevel, bbox, depth]);

  // 5. 景点数据 (用于市级地图)
  const spots = useMemo(() => {
    if (!projection || viewLevel !== 'city') return [];
    
    const rawSpots = spotsData[adcode] || getFallbackSpots(adcode, {
      x: (bbox.min.x + bbox.max.x) / 2,
      y: (bbox.min.y + bbox.max.y) / 2
    });

    const processedSpots = rawSpots.map((spot, i) => {
      let position;
      if (spot.coordinates) {
        const [lon, lat] = spot.coordinates;
        const [x, y] = projection([lon, lat]);
        position = new THREE.Vector3(x, -y, depth);
      } else {
        const center = new THREE.Vector3(
          (bbox.min.x + bbox.max.x) / 2,
          (bbox.min.y + bbox.max.y) / 2,
          depth
        );
        position = center.clone().add(new THREE.Vector3(spot.offset[0], spot.offset[1], 0));
      }
      return { 
        ...spot, 
        id: `${adcode}-spot-${i}`, 
        position,
        theme: spot.theme || "#d97706"
      };
    });

    // 厦门演示依赖真实经纬度呈现鼓浪屿等景点位置，禁用自动排斥，避免点位被推离岛屿和海岸线。
    if (adcode !== '350200') {
      // 粒子物理模型防重叠排斥算法 (迭代 30 次以分散密集景点)
      const minDistance = 1.5; // 景点间的最小 3D 距离
      const len = processedSpots.length;
      for (let k = 0; k < 30; k++) {
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const s1 = processedSpots[i];
            const s2 = processedSpots[j];

            const dx = s2.position.x - s1.position.x;
            const dy = s2.position.y - s1.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < minDistance) {
              const overlap = minDistance - dist;
              // 避免除以 0 导致坐标失效，加入微弱的随机扰动
              const forceX = (dist === 0 ? (Math.random() - 0.5) * 0.1 : dx / dist) * overlap * 0.5;
              const forceY = (dist === 0 ? (Math.random() - 0.5) * 0.1 : dy / dist) * overlap * 0.5;

              s1.position.x -= forceX;
              s1.position.y -= forceY;
              s2.position.x += forceX;
              s2.position.y += forceY;
            }
          }
        }
      }
    }

    return processedSpots;
  }, [adcode, viewLevel, projection, bbox, depth]);

  // 6. 3D 浮动摆动动画与 2D SVG 牵引线实时投影计算
  const tempVRef = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    // 省级地图：每帧将 3D 城市坐标投影为 2D 屏幕坐标，直接操作 SVG DOM 更新牵引线
    if (viewLevel === 'province' && sidebarCards.length > 0) {
      const canvasEl = state.gl.domElement;
      const canvasRect = canvasEl.getBoundingClientRect();

      sidebarCards.forEach((card) => {
        tempVRef.set(card.regionData.center.x, card.regionData.center.y, depth + 0.1);
        if (groupRef.current) {
          groupRef.current.localToWorld(tempVRef);
        }
        tempVRef.project(camera);

        const px = (tempVRef.x * 0.5 + 0.5) * canvasRect.width;
        const py = (-(tempVRef.y * 0.5) + 0.5) * canvasRect.height;

        const svgLine = document.getElementById(`svg-line-${card.id}`);
        const cardDOM = document.getElementById(`card-2d-${card.id}`);

        if (svgLine && cardDOM) {
          const cardRect = cardDOM.getBoundingClientRect();
          const cx_abs = card.isLeft
            ? (cardRect.right - canvasRect.left)
            : (cardRect.left - canvasRect.left);
          const cy_abs = cardRect.top - canvasRect.top + cardRect.height / 2;

          const cpx = card.isLeft
            ? px + (cx_abs - px) * 0.3
            : px + (cx_abs - px) * 0.7;
          const cpy = (py + cy_abs) / 2;
          const pathD = `M ${px.toFixed(1)} ${py.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${cx_abs.toFixed(1)} ${cy_abs.toFixed(1)}`;
          svgLine.setAttribute('d', pathD);
        }
      });
    }
  });

  if (!geoData || !projection) {
    return (
      <Center>
        <Html center>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: "#856b54",
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            <div className="travel-spinner" style={{
              width: '35px',
              height: '35px',
              border: '3px solid rgba(133, 107, 84, 0.2)',
              borderTop: '3px solid #856b54',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginBottom: '10px'
            }} />
            <span>正在展开亲子手绘旅游画卷...</span>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </Html>
      </Center>
    );
  }
  return (
    <Center top>
      <group 
        ref={groupRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={[1, 1, 1]}
      >
        {/* 全国视角下：著名景点常态化标注（仅显示名称，Hover 时弹出详情卡） */}
        {viewLevel === 'china' && keySpots.map((spot) => (
          <group key={spot.id} position={[spot.position.x, spot.position.y, spot.position.z]}>
            <Billboard>
              <Html center style={{ pointerEvents: 'auto' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    background: hoveredKeySpot?.id === spot.id ? '#fef3c7' : 'rgba(255,253,248,0.92)',
                    border: hoveredKeySpot?.id === spot.id ? '1.2px solid #d97706' : '1px solid #c4b49e',
                    borderRadius: '20px',
                    padding: '2px 7px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: '#4a3520',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 6px rgba(93,75,59,0.12)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s',
                    transform: hoveredKeySpot?.id === spot.id ? 'scale(1.1)' : 'scale(1)',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoveredKeySpot(spot)}
                  onMouseLeave={() => setHoveredKeySpot(null)}
                >
                  <span style={{ fontSize: '10px' }}>{spot.logo}</span>
                  <span>{spot.name}</span>

                  {hoveredKeySpot?.id === spot.id && (
                    <div style={{
                      position: 'absolute',
                      bottom: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '185px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: '#fdfbf7',
                      border: '1.5px solid #d4c5b3',
                      borderTop: '3px solid #d97706',
                      boxShadow: '0 8px 20px rgba(93,75,59,0.22)',
                      zIndex: 999,
                      pointerEvents: 'none',
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#d97706', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '13px' }}>{spot.logo}</span>
                        <span>{spot.name}</span>
                      </div>
                      <div style={{ fontSize: '9px', color: '#5d4b3b', lineHeight: '1.45', textAlign: 'justify' }}>
                        {spot.desc}
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '-7px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderTop: '7px solid #d4c5b3',
                      }} />
                    </div>
                  )}
                </div>
              </Html>
            </Billboard>
          </group>
        ))}

        {/* A. 渲染手绘草木绿 3D 行政地块 */}
        {regions.map((region, idx) => (
          <GeoBlock
            key={region.adcode || (region.name + idx)}
            data={region}
            bbox={bbox}
            depth={depth}
            glowColor={glowColor}
            name={region.name}
            onClickBlock={onSelectRegion}
            viewLevel={viewLevel}
            globalHanddrawnMap={globalHanddrawnMap}
            fujianHanddrawnMap={fujianHanddrawnMap}
            xiamenHanddrawnMap={xiamenHanddrawnMap}
            projection={projection}
            chinaProjection={chinaProjection}
            chinaBbox={chinaBbox}
            adcode={adcode}
            xiamenBbox={xiamenBbox}
          />
        ))}

        {/* B. 手绘复古实木底座 */}
        {boundaryShapes && boundaryShapes.length > 0 && (
          <group position={[0, 0, -0.4]}>
            {boundaryShapes.map((shape, i) => (
              <mesh key={`boundary-${i}`} receiveShadow>
                <extrudeGeometry args={[shape, { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 }]} />
                <meshStandardMaterial color="#403024" roughness={0.9} metalness={0.1} />
              </mesh>
            ))}
            <lineSegments position={[0, 0, 0.415]}>
              <edgesGeometry args={[new THREE.ShapeGeometry(boundaryShapes)]} />
              <lineBasicMaterial color="#d4af37" linewidth={1.5} opacity={0.4} />
            </lineSegments>
          </group>
        )}

        {/* C. 终极防遮挡：省级视角用 Html fullscreen 2D 全屏 DOM 覆盖层渲染游学海报挂牌 */}
        {viewLevel === 'province' && sidebarCards.length > 0 && (
          <Html fullscreen style={{ pointerEvents: 'none', overflow: 'hidden' }}>
            {/* SVG 牵引线层：pointer-events 穿透，useFrame 实时更新路径 d 属性 */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              {sidebarCards.map((card) => (
                <path
                  key={card.id}
                  id={`svg-line-${card.id}`}
                  d="M 0 0"
                  fill="none"
                  stroke={card.color}
                  strokeWidth="1.8"
                  strokeDasharray="5,3"
                  opacity="0.7"
                />
              ))}
            </svg>

            {/* 左侧卡片 Flex 列：2D 垂直均分，绝不遮挡 */}
            <div style={{
              position: 'absolute',
              left: '6px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              pointerEvents: 'auto',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}>
              {sidebarCards.filter(c => c.isLeft).map((card) => (
                <div
                  key={card.id}
                  id={`card-2d-${card.id}`}
                  onClick={() => onSelectRegion(card.regionData)}
                  style={{
                    width: '125px',
                    padding: '7px 9px',
                    borderRadius: '9px',
                    background: 'rgba(253,251,247,0.95)',
                    border: '1.5px solid #d4c5b3',
                    borderLeft: `4px solid ${card.color}`,
                    boxShadow: '0 3px 9px rgba(93,75,59,0.12)',
                    color: '#473a2e',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04) translateX(2px)';
                    e.currentTarget.style.boxShadow = `0 5px 14px ${card.color}33`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 3px 9px rgba(93,75,59,0.12)';
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: card.color, display: 'flex', alignItems: 'center', gap: '3px', borderBottom: '1px solid #e5dac9', paddingBottom: '3px' }}>
                    <span>📍</span><span>{card.name}</span>
                  </div>
                  <div style={{ fontSize: '8px', color: '#7c6854', lineHeight: '1.35', whiteSpace: 'pre-line' }}>{card.label}</div>
                  <div style={{ fontSize: '6.5px', color: '#a37a5a', textAlign: 'right', fontWeight: 'bold' }}>飞入 →</div>
                </div>
              ))}
            </div>

            {/* 右侧卡片 Flex 列 */}
            <div style={{
              position: 'absolute',
              right: '6px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-end',
              pointerEvents: 'auto',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}>
              {sidebarCards.filter(c => !c.isLeft).map((card) => (
                <div
                  key={card.id}
                  id={`card-2d-${card.id}`}
                  onClick={() => onSelectRegion(card.regionData)}
                  style={{
                    width: '125px',
                    padding: '7px 9px',
                    borderRadius: '9px',
                    background: 'rgba(253,251,247,0.95)',
                    border: '1.5px solid #d4c5b3',
                    borderRight: `4px solid ${card.color}`,
                    boxShadow: '0 3px 9px rgba(93,75,59,0.12)',
                    color: '#473a2e',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04) translateX(-2px)';
                    e.currentTarget.style.boxShadow = `0 5px 14px ${card.color}33`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 3px 9px rgba(93,75,59,0.12)';
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: card.color, display: 'flex', alignItems: 'center', gap: '3px', borderBottom: '1px solid #e5dac9', paddingBottom: '3px' }}>
                    <span>📍</span><span>{card.name}</span>
                  </div>
                  <div style={{ fontSize: '8px', color: '#7c6854', lineHeight: '1.35', whiteSpace: 'pre-line' }}>{card.label}</div>
                  <div style={{ fontSize: '6.5px', color: '#a37a5a', textAlign: 'left', fontWeight: 'bold' }}>← 飞入</div>
                </div>
              ))}
            </div>
          </Html>
        )}

        {/* D. 市级景点信息层：只保留文字卡片，不渲染底盘或低模建筑。 */}
        {viewLevel === 'city' && (
          <group name="spots-group">
            {spots.map((spot) => {
              const isSelected = activeSpot?.name === spot.name;
              const spotColor = spot.theme || "#ff7700";
              return (
                <group 
                  key={spot.id} 
                  name={`spot-node-${spot.id}`} 
                  position={[spot.position.x, spot.position.y, spot.position.z]}
                >
                  <mesh position={[0, 0, 0.08]} raycast={() => null}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                    <meshBasicMaterial color={spotColor} depthTest={false} />
                  </mesh>
                  <Line
                    points={[
                      [0, 0, 0.14],
                      [0, 0, 1.42]
                    ]}
                    color={spotColor}
                    lineWidth={1.2}
                    transparent
                    opacity={0.85}
                    raycast={() => null}
                  />

                  {/* 固定标签卡片：用引线连回地图落点 */}
                  <group name={`card-${spot.id}`} position={[0, 0, 1.6]}>
                    <Billboard>
                      <Html center style={{ pointerEvents: 'auto', zIndex: isSelected ? 99999 : 9999 }} zIndexRange={isSelected ? [10000, 100000] : [1000, 9999]}>
                        {isSelected ? (
                          // 选中状态：大屏豪华景点图文介绍卡
                          <div style={{
                            width: '280px',
                            padding: '16px',
                            borderRadius: '12px',
                            background: '#fdfbf7',
                            border: `2.5px solid ${spotColor}`,
                            boxShadow: `0 8px 20px ${spotColor}55`,
                            color: '#473a2e',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            transition: 'all 0.3s ease-in-out',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            userSelect: 'none',
                            zIndex: 99999
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyComposite: 'space-between', gap: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '18px' }}>{spot.logo}</span>
                                <span style={{
                                  fontWeight: 'bold',
                                  fontSize: '13px',
                                  color: spotColor,
                                  whiteSpace: 'nowrap'
                                }}>{spot.name}</span>
                              </div>
                              {spot.grade && (
                                <span style={{
                                  fontSize: '8px',
                                  background: spotColor,
                                  color: '#fff',
                                  padding: '1px 4px',
                                  borderRadius: '3px',
                                  fontWeight: 'bold',
                                  transform: 'scale(0.85)',
                                  display: 'inline-block'
                                }}>{spot.grade.replace('AAAAA', '5A').replace('AAAA', '4A')}</span>
                              )}
                            </div>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              fontSize: '11px',
                            }}>
                              <div style={{
                                width: '100%',
                                height: '90px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                background: '#f5efe6'
                              }}>
                                <img
                                  src={spot.img}
                                  alt={spot.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => {
                                    // 降级为本地手绘地图贴图，绝对可靠，且非常漂亮，防止 Unsplash 加载超时或 DNS 拦截返回代码
                                    e.target.src = `${import.meta.env.BASE_URL || '/'}xiamen_handdrawn_tourism_map.png`;
                                    e.target.onerror = null; // 防死循环
                                  }}
                                />
                              </div>
                              <div style={{ color: spotColor, fontWeight: 'bold' }}>{spot.type}</div>
                              <div style={{ color: '#5d4b3b', lineHeight: '1.4', textAlign: 'justify' }}>
                                {spot.desc}
                              </div>
                              <div style={{ borderTop: '1.5px dashed #d4c5b3', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px', color: '#7c6854', fontSize: '10px' }}>
                                <div>✨ <strong>核心特色：</strong>{spot.feature}</div>
                                <div>📅 <strong>推荐时节：</strong>{spot.season}</div>
                              </div>
                              <div style={{
                                display: 'flex',
                                justifyContent: spot.name === "鼓浪屿" ? 'space-between' : 'flex-end',
                                alignItems: 'center',
                                marginTop: '4px',
                                borderTop: '1px solid #e5dac9',
                                paddingTop: '4px'
                              }}>
                                {spot.name === "鼓浪屿" && (
                                  <a
                                    href="http://115.190.164.187:9000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      fontSize: '9px',
                                      color: '#0284c7',
                                      cursor: 'pointer',
                                      fontWeight: 'bold',
                                      textDecoration: 'none'
                                    }}
                                  >
                                    开始游览
                                  </a>
                                )}
                                <div 
                                  style={{
                                    textAlign: 'right',
                                    fontSize: '9px',
                                    color: '#845e3c',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectSpot(null); // 点击关闭详情
                                  }}
                                >
                                  收起详情 ✕
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // 未选中状态：超精致极窄单行贴纸路标 (防重叠拥挤)
                          <div 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '20px',
                              background: '#fdfbf7',
                              border: '1.2px solid #845e3c',
                              boxShadow: '0 3px 8px rgba(93, 75, 59, 0.15)',
                              color: '#473a2e',
                              whiteSpace: 'nowrap',
                              cursor: 'pointer',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              fontSize: '9.5px',
                              fontWeight: 'bold',
                              userSelect: 'none',
                              transition: 'transform 0.15s, border-color 0.15s',
                              transform: 'scale(0.9)',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = 'scale(0.98)';
                              e.currentTarget.style.borderColor = spotColor;
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'scale(0.9)';
                              e.currentTarget.style.borderColor = '#845e3c';
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectSpot(spot); // 点击探索
                            }}
                          >
                            <span>{spot.logo}</span>
                            <span>{spot.name}</span>
                            {spot.grade && (
                              <span style={{
                                fontSize: '7px',
                                background: '#b45309',
                                color: '#fff',
                                padding: '0px 3px',
                                borderRadius: '3px',
                                transform: 'scale(0.85)',
                                display: 'inline-block',
                                marginLeft: '2px'
                              }}>{spot.grade.replace('AAAAA', '5A').replace('AAAA', '4A')}</span>
                            )}
                          </div>
                        )}
                      </Html>
                    </Billboard>
                  </group>
                </group>
              );
            })}
          </group>
        )}
      </group>
    </Center>
  );
}
