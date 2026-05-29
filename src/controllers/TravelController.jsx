import React, { useState, useEffect, useRef } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';
import TravelGeoMap from '../components/TravelGeoMap';
import { provinceLogos, provinceIntros, cityIntros, travelStats } from '../data/travelData';

export default function TravelController() {
  const { camera, controls } = useThree();
  
  // 1. 下钻层级与历史栈状态
  const [viewLevel, setViewLevel] = useState("china");
  const [adcode, setAdcode] = useState("100000");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "中国", level: "china", adcode: "100000", camPos: [0, 18.2, 26], target: [0, 0, 0] }
  ]);
  const [activeSpot, setActiveSpot] = useState(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  // 2. 缓存上一级的相机位置，方便完美的“倒车”返回
  const lastCamState = useRef({
    position: new THREE.Vector3(0, 18.2, 26),
    target: new THREE.Vector3(0, 0, 0)
  });

  // 3. 镜头平滑飞入飞出函数 (GSAP)
  const flyTo = (targetPos, camPos, duration = 1.8) => {
    if (!camera) return;

    // 暂停 OrbitControls 的阻尼，防止飞行过程中冲突
    if (controls) controls.enabled = false;

    const tl = gsap.timeline({
      onComplete: () => {
        if (controls) {
          controls.target.set(targetPos[0], targetPos[1], targetPos[2]);
          controls.enabled = true;
        }
      }
    });

    // 动画平滑移动相机坐标
    tl.to(camera.position, {
      x: camPos[0],
      y: camPos[1],
      z: camPos[2],
      duration: duration,
      ease: "power3.inOut"
    }, 0);

    // 动画平滑移动控制器中心点
    if (controls) {
      tl.to(controls.target, {
        x: targetPos[0],
        y: targetPos[1],
        z: targetPos[2],
        duration: duration,
        ease: "power3.inOut"
      }, 0);
    }
  };

  // 4. 点击地图区块事件：执行下钻逻辑
  const handleSelectRegion = (region) => {
    const nextAdcode = String(region.adcode);
    
    // 如果已经在市级，就不再往下钻，直接提示已是最底层
    if (viewLevel === 'city') return;

    // 备份当前相机状态，用于返回
    if (controls) {
      lastCamState.current.position.copy(camera.position);
      lastCamState.current.target.copy(controls.target);
    }

    if (viewLevel === 'china') {
      // 从全国下钻到省份
      setViewLevel("province");
      setAdcode(nextAdcode);
      
      const newCrumb = {
        name: region.name,
        level: "province",
        adcode: nextAdcode,
        // 省份重新在 [0,0] 居中投影，相机进一步拉远，保持 +0.7 的 y/z 比例以避免极角跳动
        camPos: [0, 26.6, 38.0], 
        target: [0, 0, 0]
      };
      setBreadcrumbs([...breadcrumbs, newCrumb]);

      // 镜头飞向该省份零点
      flyTo(newCrumb.target, newCrumb.camPos);
    } else if (viewLevel === 'province') {
      // 从省份下钻到地级市
      setViewLevel("city");
      setAdcode(nextAdcode);
      
      const newCrumb = {
        name: region.name,
        level: "city",
        adcode: nextAdcode,
        // 地级市重新在 [0,0] 居中投影，进一步拉远，保持 +0.7 的 y/z 比例以防重载感觉
        camPos: [0, 28.0, 40.0],
        target: [0, 0, 0]
      };
      setBreadcrumbs([...breadcrumbs, newCrumb]);
      setActiveSpot(null); // 清空被选中的景点

      // 镜头极近距离飞入该城市零点
      flyTo(newCrumb.target, newCrumb.camPos);
    }
  };

  // 5. 点击面包屑导航或者双击返回
  const handleBackTo = (index) => {
    if (index === breadcrumbs.length - 1) return; // 点击当前层级无需操作
    
    const targetCrumb = breadcrumbs[index];
    const newCrumbs = breadcrumbs.slice(0, index + 1);
    
    setViewLevel(targetCrumb.level);
    setAdcode(targetCrumb.adcode);
    setBreadcrumbs(newCrumbs);
    setActiveSpot(null);

    // 平滑退回对应的相机视角
    flyTo(targetCrumb.target, targetCrumb.camPos);
  };

  // 双击空白处快速返回上一层级
  const handleDoubleClickEmpty = (e) => {
    if (e.target === e.currentTarget || e.pointerType === 'mouse') {
      if (breadcrumbs.length > 1) {
        handleBackTo(breadcrumbs.length - 2);
      }
    }
  };

  // 6. 点击景点
  const handleSelectSpot = (spot) => {
    setActiveSpot((activeSpot && spot && activeSpot.name === spot.name) ? null : spot);
    // 彻底移除点击景点自动飞入拉近相机的行为，防止 3D 模型在屏幕上无谓地自动放大，保持大屏体验稳定
  };

  // 7. 初始化相机位置
  useEffect(() => {
    camera.position.set(0, 18.2, 26);
    if (controls) {
      controls.target.set(0, 0, 0);
    }
  }, [camera, controls]);

  return (
    <>
      <Html fullscreen style={{ pointerEvents: 'none', zIndex: 10 }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        {/* A. 顶部导航与面包屑 (手绘木质宣纸版) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '12px',
          background: 'rgba(253, 251, 247, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #d4c5b3',
          boxShadow: '0 4px 15px rgba(93, 75, 59, 0.15)',
          pointerEvents: 'auto',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.adcode + idx}>
              {idx > 0 && <span style={{ color: 'rgba(212, 197, 179, 0.8)' }}>/</span>}
              <button
                onClick={() => handleBackTo(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: idx === breadcrumbs.length - 1 ? '#ff7700' : '#5d4b3b',
                  cursor: idx === breadcrumbs.length - 1 ? 'default' : 'pointer',
                  fontWeight: idx === breadcrumbs.length - 1 ? 'bold' : 'normal',
                  fontSize: '14px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseOver={(e) => {
                  if (idx !== breadcrumbs.length - 1) e.target.style.color = '#ff7700';
                }}
                onMouseOut={(e) => {
                  if (idx !== breadcrumbs.length - 1) e.target.style.color = '#5d4b3b';
                }}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* 顶部中央：海报级可爱手绘大标题 (仅在省级/市级展示) */}
        {viewLevel !== 'china' && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              color: '#473a2e',
              fontWeight: '900',
              textShadow: '1px 1px 0px #fdfbf7, 2.5px 2.5px 0px #d4c5b3',
              letterSpacing: '1.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <span>「</span>
              <span style={{ 
                color: '#fff', 
                background: '#b45309', 
                padding: '1px 12px', 
                borderRadius: '6px',
                fontSize: '21px',
                transform: 'rotate(-0.8deg)',
                display: 'inline-block',
                boxShadow: '0 3px 6px rgba(180, 83, 9, 0.2)'
              }}>
                {breadcrumbs[breadcrumbs.length - 1]?.level === 'province' 
                  ? (adcode === '350000' ? '八闽山海 · 清新福建' : `${breadcrumbs[breadcrumbs.length - 1]?.name}旅游大盘`) 
                  : (cityIntros[adcode] ? `${cityIntros[adcode].slogan}` : `${breadcrumbs[breadcrumbs.length - 1]?.name}导览`)
                }
              </span>
              <span>」三维人文研学沙盘</span>
            </h1>
          </div>
        )}

        {/* 左侧大屏文旅大数据看板 (手绘宣纸版) */}
        {(() => {
          const stats = travelStats[adcode] || travelStats["100000"];
          return (
            <div style={{
              position: 'absolute',
              top: '80px',
              left: leftPanelOpen ? '20px' : '-320px',
              width: '320px',
              padding: '18px',
              borderRadius: '16px',
              background: 'rgba(253, 251, 247, 0.96)',
              backdropFilter: 'blur(15px)',
              border: '1.5px solid #d4c5b3',
              boxShadow: '0 10px 25px rgba(93, 75, 59, 0.2)',
              color: '#473a2e',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              animation: 'fadeIn 0.5s ease-out',
              transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {/* 左侧收缩拉手 */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setLeftPanelOpen(!leftPanelOpen);
                }}
                style={{
                  position: 'absolute',
                  right: '-27px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '26px',
                  height: '65px',
                  background: '#fdfbf7',
                  border: '1.5px solid #d4c5b3',
                  borderLeft: 'none',
                  borderRadius: '0 8px 8px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#b45309',
                  boxShadow: '4px 0 10px rgba(93,75,59,0.1)',
                  fontWeight: 'bold',
                  userSelect: 'none'
                }}
              >
                {leftPanelOpen ? '◀' : '▶'}
              </div>

              <h3 style={{ margin: 0, fontSize: '15px', color: '#b45309', borderBottom: '1.5px solid #e5dac9', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📊</span> {stats.title}
              </h3>
              
              {/* 大盘主要指标数字 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: '#f5efe6', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e5dac9' }}>
                  <div style={{ fontSize: '9px', color: '#7c6854' }}>年度接待量</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#b45309', marginTop: '2px' }}>{stats.visitors}</div>
                </div>
                <div style={{ background: '#f5efe6', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e5dac9' }}>
                  <div style={{ fontSize: '9px', color: '#7c6854' }}>文旅总花费</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#b45309', marginTop: '2px' }}>{stats.revenue}</div>
                </div>
              </div>
              
              {/* 增长趋势指标 */}
              <div style={{ fontSize: '9px', color: '#5d4b3b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                <span>📈 同比增长率：<strong style={{ color: '#047857', fontSize: '10.5px' }}>{stats.growth}</strong></span>
                <span style={{ color: '#7c6854' }}>数据源：文旅厅官方</span>
              </div>

              {/* 热度排行榜图表 (sc-datav 风格) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#7c6854', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🔥</span> {viewLevel === 'city' ? "核心景区热度排行" : "下辖区域活跃度排行"}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '4px' }}>
                  {stats.hotRank.map((item, idx) => (
                    <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#473a2e' }}>
                        <span>{idx + 1}. {item.name}</span>
                        <span style={{ fontWeight: 'bold', color: '#ff7700' }}>{item.value} 分</span>
                      </div>
                      {/* 自制手绘风进度条 */}
                      <div style={{ width: '100%', height: '5px', background: '#e5dac9', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: item.bar, height: '100%', background: 'linear-gradient(90deg, #b45309, #ff7700)', borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 亲子出行偏好分布 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px dashed #d4c5b3', paddingTop: '10px', marginTop: '4px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 'bold', color: '#7c6854', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>🎯</span> 亲子游学偏好主题分布
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '2px' }}>
                  {stats.preference.map((pref) => (
                    <div key={pref.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px' }}>
                      <span style={{ color: '#5d4b3b' }}>🍀 {pref.name}</span>
                      <span style={{ color: '#b45309', fontWeight: 'bold', background: 'rgba(180, 83, 9, 0.08)', padding: '1px 5px', borderRadius: '4px' }}>{pref.ratio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* B. 右上角大屏信息看板 (宣纸手绘暖金配版) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: rightPanelOpen ? '20px' : '-340px',
          width: '340px',
          padding: '22px',
          borderRadius: '16px',
          background: 'rgba(253, 251, 247, 0.96)',
          backdropFilter: 'blur(15px)',
          border: '1.5px solid #d4c5b3',
          boxShadow: '0 10px 25px rgba(93, 75, 59, 0.2)',
          color: '#473a2e',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* 右侧收缩拉手 */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setRightPanelOpen(!rightPanelOpen);
            }}
            style={{
              position: 'absolute',
              left: '-27px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '26px',
              height: '65px',
              background: '#fdfbf7',
              border: '1.5px solid #d4c5b3',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              color: '#b45309',
              boxShadow: '-4px 0 10px rgba(93,75,59,0.1)',
              fontWeight: 'bold',
              userSelect: 'none'
            }}
          >
            {rightPanelOpen ? '▶' : '◀'}
          </div>

          <h2 style={{ margin: 0, fontSize: '18px', color: '#b45309', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🗺️</span> 3D 华夏旅游全息沙盘
          </h2>
          
          {/* 全国/省/市各级视角的详细介绍模块 */}
          {(() => {
            if (viewLevel === 'china') {
              return (
                <div style={{ fontSize: '11px', color: '#5d4b3b', lineHeight: '1.6', borderBottom: '1px solid #e5dac9', paddingBottom: '12px' }}>
                  <p style={{ margin: '0 0 8px 0', color: '#b45309', fontWeight: 'bold', fontSize: '12px' }}>🗺️ 华夏全景探索</p>
                  当前处于<strong>全国总览视角</strong>。请点击 3D 手绘版图上各个省份的专属旅游地标 Icon（如四川大熊猫 🐼、北京故宫 ⛩️、福建八闽茶韵 🍵 等）进行平滑飞入下钻，解锁该省份及地级市的专属全景导览与景点介绍。
                </div>
              );
            }

            if (viewLevel === 'province') {
              const intro = provinceIntros[adcode];
              if (intro) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid #e5dac9', paddingBottom: '12px' }}>
                     <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#b45309' }}>
                      🚩 {intro.name} · {intro.slogan}
                    </div>
                    <div style={{ fontSize: '11px', color: '#5d4b3b', lineHeight: '1.5', textAlign: 'justify' }}>
                      {intro.summary}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {intro.tags.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '9px', background: 'rgba(180, 83, 9, 0.08)', color: '#b45309', padding: '2px 6px', borderRadius: '4px', border: '0.5px solid rgba(180,83,9,0.2)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: '10px', color: '#4f46e5', background: 'rgba(79, 70, 229, 0.05)', padding: '6px 8px', borderRadius: '6px', border: '0.5px solid rgba(79, 70, 229, 0.15)' }}>
                      🧭 <strong>推荐线路：</strong>{intro.hotRoute}
                    </div>
                  </div>
                );
              }
            }

            if (viewLevel === 'city') {
              const cityIntro = cityIntros[adcode];
              if (cityIntro) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid #e5dac9', paddingBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ff7700' }}>
                      🏙️ {cityIntro.name} · {cityIntro.slogan}
                    </div>
                    <div style={{ fontSize: '11px', color: '#5d4b3b', lineHeight: '1.5', textAlign: 'justify' }}>
                      {cityIntro.summary}
                    </div>
                    <div style={{ fontSize: '10px', color: '#b45309', borderTop: '1px dashed #d4c5b3', paddingTop: '6px' }}>
                      🍲 <strong>特色美食/特产：</strong><br/>
                      <span style={{ color: '#473a2e', fontWeight: 'bold' }}>{cityIntro.specialty}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#047857' }}>
                      🎭 <strong>地方非遗/文化：</strong><br/>
                      <span style={{ color: '#473a2e', fontWeight: 'bold' }}>{cityIntro.culture}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#4f46e5', background: 'rgba(79, 70, 229, 0.05)', padding: '6px 8px', borderRadius: '6px', border: '0.5px solid rgba(79, 70, 229, 0.15)' }}>
                      💡 <strong>游玩出行建议：</strong><br/>
                      <span style={{ color: '#473a2e', fontWeight: 'bold' }}>{cityIntro.advise}</span>
                    </div>
                  </div>
                );
              }
            }

            return (
              <div style={{ fontSize: '11px', color: '#7c6854', lineHeight: '1.5', borderBottom: '1px dashed #d4c5b3', paddingBottom: '10px' }}>
                已进入未录入详细介绍的城市。请点击地块或景点图标展开全景导览。
              </div>
            );
          })()}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#7c6854' }}>三级地图下钻：</span>
              <span style={{ color: '#ff7700', fontWeight: 'bold' }}>已启用</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#7c6854' }}>全省核心景区投射：</span>
              <span style={{ color: '#ff7700', fontWeight: 'bold' }}>已覆盖</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#7c6854' }}>快捷返回操作：</span>
              <span style={{ color: '#5d4b3b' }}>双击空白处</span>
            </div>
          </div>
        </div>

        {/* C. 底部操作指引 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'rgba(253, 251, 247, 0.92)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #d4c5b3',
          boxShadow: '0 4px 10px rgba(93, 75, 59, 0.1)',
          color: '#5d4b3b',
          fontSize: '11px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          gap: '15px'
        }}>
          <span>🖱️ 左键拖拽：轻微倾斜视角</span>
          <span>🔍 滚轮缩放：放大缩小</span>
          <span>🖱️ 双击空白：快速返回</span>
        </div>
      </Html>

      {/* 4. 渲染核心 3D 地图网格 */}
      <mesh onDoubleClick={handleDoubleClickEmpty} raycast={() => null}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      
      <TravelGeoMap
        adcode={adcode}
        viewLevel={viewLevel}
        glowColor="#ffaa00"
        baseColor="#160e0a"
        depth={viewLevel === 'china' ? 0.8 : viewLevel === 'province' ? 0.6 : 0.4}
        onSelectRegion={handleSelectRegion}
        onSelectSpot={handleSelectSpot}
        activeSpot={activeSpot}
      />

      {/* 5. 相机控制器：放开极角和方位角锁定，恢复用户自由且丝滑的旋转操控体验，同时设置合理限制防穿底 */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={3}
        maxDistance={100}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
      <ContactShadows resolution={1024} scale={50} blur={2.5} opacity={0.65} far={20} color="#000000" position={[0, 0, -0.6]} />
    </>
  );
}
export { TravelController };
