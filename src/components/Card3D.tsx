'use client';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

function drawHeartECG(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.08;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const s = size;
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.85, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.85, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - s * 0.35, y + s * 0.55);
  ctx.lineTo(x - s * 0.18, y + s * 0.55);
  ctx.lineTo(x - s * 0.1, y + s * 0.3);
  ctx.lineTo(x, y + s * 0.75);
  ctx.lineTo(x + s * 0.1, y + s * 0.4);
  ctx.lineTo(x + s * 0.2, y + s * 0.55);
  ctx.lineTo(x + s * 0.35, y + s * 0.55);
  ctx.stroke();
  ctx.restore();
}

function drawQRCode(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellCount = 21;
  const cellSize = size / cellCount;
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,0,1,0],
    [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0],
    [1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0],
    [0,0,1,1,0,0,0,1,0,1,1,0,0,1,0,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,0,0],
  ];
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - 4, y - 4, size + 8, size + 8);
  ctx.fillStyle = '#000000';
  for (let row = 0; row < cellCount; row++) {
    for (let col = 0; col < cellCount; col++) {
      if (pattern[row][col] === 1) {
        ctx.fillRect(x + col * cellSize, y + row * cellSize, cellSize, cellSize);
      }
    }
  }
  ctx.restore();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function FrontCanvas({ brandName, tagline }: { brandName: string; tagline: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = 2;
    canvas.width = 674 * dpr;
    canvas.height = 420 * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const W = 674, H = 420;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#1a8080');
    grad.addColorStop(0.45, '#0d5060');
    grad.addColorStop(1, '#0a1f3a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const hl = ctx.createRadialGradient(200, 120, 10, 200, 120, 280);
    hl.addColorStop(0, 'rgba(100,220,200,0.18)');
    hl.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hl;
    ctx.fillRect(0, 0, W, H);

    // Tricolor waves
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(380, H); ctx.bezierCurveTo(420, 370, 480, 390, 540, 340);
    ctx.bezierCurveTo(580, 310, 620, 330, W, 290); ctx.lineTo(W, H); ctx.closePath();
    ctx.fillStyle = '#FF9933'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(410, H); ctx.bezierCurveTo(450, 362, 510, 382, 570, 330);
    ctx.bezierCurveTo(610, 300, 645, 322, W, 278); ctx.lineTo(W, 290);
    ctx.bezierCurveTo(620, 330, 580, 310, 540, 340);
    ctx.bezierCurveTo(480, 390, 420, 370, 380, H); ctx.closePath();
    ctx.fillStyle = '#ffffff'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(440, H); ctx.bezierCurveTo(480, 354, 540, 374, 600, 320);
    ctx.bezierCurveTo(630, 296, 658, 314, W, 266); ctx.lineTo(W, 278);
    ctx.bezierCurveTo(645, 322, 610, 300, 570, 330);
    ctx.bezierCurveTo(510, 382, 450, 362, 410, H); ctx.closePath();
    ctx.fillStyle = '#138808'; ctx.fill();
    ctx.restore();

    // NFC icon top-right
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(630, 52, 14 + i * 14, -Math.PI * 0.55, Math.PI * 0.55);
      ctx.stroke();
    }
    ctx.restore();

    drawHeartECG(ctx, 175, 130, 60, '#ffffff');

    ctx.save();
    ctx.font = 'bold 52px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(brandName, 252, 185);
    ctx.restore();

    ctx.save();
    ctx.font = '28px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.textAlign = 'center';
    ctx.fillText(tagline, 337, 235);
    ctx.restore();

    drawQRCode(ctx, 50, 268, 120);
  }, [brandName, tagline]);

  return <canvas ref={canvasRef} width={1348} height={840} style={{ width: '100%', height: '100%', display: 'block', borderRadius: '12px' }} />;
}

function BackCanvas({ brandName, tagline, fields, btnLine1, btnLine2, features, helpTitle, helpEmail }: {
  brandName: string; tagline: string;
  fields: { label: string; value: string; valueColor: string }[];
  btnLine1: string; btnLine2: string;
  features: { title: string; desc: string; fy: number }[];
  helpTitle: string; helpEmail: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = 2;
    canvas.width = 674 * dpr;
    canvas.height = 420 * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const W = 674, H = 420;

    ctx.fillStyle = '#0d1f3c';
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(180, 210, 10, 180, 210, 320);
    glow.addColorStop(0, 'rgba(20,80,100,0.5)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(340, 20); ctx.lineTo(340, 400); ctx.stroke();
    ctx.restore();

    drawHeartECG(ctx, 32, 22, 32, '#ffffff');
    ctx.save();
    ctx.font = 'bold 26px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(brandName, 76, 46);
    ctx.restore();

    ctx.save();
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText(tagline, 76, 68);
    ctx.restore();

    let fieldY = 118;
    fields.forEach(({ label, value, valueColor }) => {
      ctx.save();
      ctx.font = '15px Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText(label, 28, fieldY);
      ctx.fillStyle = valueColor;
      ctx.fillText(`: ${value}`, 168, fieldY);
      ctx.restore();
      fieldY += 30;
    });

    const btnX = 28, btnY = 318, btnW = 292, btnH = 52;
    ctx.save();
    ctx.fillStyle = '#1a5c50';
    roundRect(ctx, btnX, btnY, btnW, btnH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2; ctx.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(btnX + 26, btnY + btnH / 2, 7 + i * 7, -Math.PI * 0.6, Math.PI * 0.6);
      ctx.stroke();
    }
    ctx.font = '13px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(btnLine1, btnX + btnW / 2 + 8, btnY + 20);
    ctx.fillText(btnLine2, btnX + btnW / 2 + 8, btnY + 38);
    ctx.restore();

    features.forEach(({ title, desc, fy }: { title: string; desc: string; fy: number }) => {
      ctx.save();
      ctx.fillStyle = '#1a4a5a';
      ctx.beginPath();
      ctx.arc(378, fy + 16, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#4dd8c0';
      ctx.lineWidth = 2;
      if (title === 'Secure') {
        ctx.beginPath();
        ctx.moveTo(378, fy + 4); ctx.lineTo(370, fy + 8); ctx.lineTo(370, fy + 18);
        ctx.arc(378, fy + 18, 8, Math.PI, 0);
        ctx.lineTo(386, fy + 8); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.arc(378, fy + 16, 3, 0, Math.PI * 2); ctx.stroke();
      } else if (title === 'Private') {
        ctx.beginPath(); ctx.arc(378, fy + 10, 6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(378, fy + 26, 10, Math.PI, 0); ctx.stroke();
      } else {
        ctx.strokeRect(370, fy + 6, 16, 20);
        ctx.beginPath();
        ctx.moveTo(374, fy + 6); ctx.lineTo(374, fy + 2);
        ctx.lineTo(382, fy + 2); ctx.lineTo(382, fy + 6); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(378, fy + 11); ctx.lineTo(378, fy + 20);
        ctx.moveTo(374, fy + 16); ctx.lineTo(382, fy + 16); ctx.stroke();
      }

      ctx.font = 'bold 15px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText(title, 410, fy + 12);
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      desc.split('\n').forEach((line, i) => ctx.fillText(line, 410, fy + 28 + i * 16));
      ctx.restore();
    });

    ctx.save();
    ctx.fillStyle = '#1a4a5a';
    ctx.beginPath(); ctx.arc(365, 352, 16, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4dd8c0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(365, 350, 7, Math.PI, 0); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(358, 350); ctx.lineTo(358, 355);
    ctx.arc(359, 355, 2, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(372, 350); ctx.lineTo(372, 355);
    ctx.arc(371, 355, 2, 0, Math.PI); ctx.stroke();
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#4dd8c0'; ctx.textAlign = 'left';
    ctx.fillText(helpTitle, 390, 348);
    ctx.font = '12px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText(helpEmail, 390, 366);
    ctx.restore();
  }, [brandName, tagline, fields, btnLine1, btnLine2, features, helpTitle, helpEmail]);

  return <canvas ref={canvasRef} width={1348} height={840} style={{ width: '100%', height: '100%', display: 'block', borderRadius: '12px' }} />;
}

export default function Card3D() {
  const { t } = useLanguage();
  const [rotY, setRotY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(true);
  const [showFront, setShowFront] = useState(true);
  const dragStart = useRef<{ x: number; rotY: number } | null>(null);
  const rafRef = useRef<number>(0);
  const lastTime = useRef<number>(0);

  // Track when front side is visible
  useEffect(() => {
    const normalized = ((rotY % 360) + 360) % 360;
    setShowFront(normalized < 90 || normalized > 270);
  }, [rotY]);

  const showBack = !showFront;

  useEffect(() => {
    if (!auto) return;
    const animate = (time: number) => {
      const delta = lastTime.current ? (time - lastTime.current) / 1000 : 0;
      lastTime.current = time;
      setRotY(r => r + delta * 40);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [auto]);

  const onMouseDown = (e: React.MouseEvent) => {
    setAuto(false);
    setDragging(true);
    dragStart.current = { x: e.clientX, rotY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    setRotY(dragStart.current.rotY + dx * 0.5);
  };
  const onMouseUp = () => {
    setDragging(false);
    setAuto(true); lastTime.current = 0;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setAuto(false);
    setDragging(true);
    dragStart.current = { x: e.touches[0].clientX, rotY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !dragStart.current) return;
    setRotY(dragStart.current.rotY + (e.touches[0].clientX - dragStart.current.x) * 0.5);
  };

  const lineItems = [
    { label: t('card3d.swasthtapId'), sub: t('card3d.swasthtapIdSub'), icon: 'id' },
    { label: t('card3d.name'), sub: t('card3d.nameSub'), icon: 'person' },
    { label: t('card3d.dob'), sub: t('card3d.dobSub'), icon: 'calendar' },
  ];

  const backLineItems = [
    { label: t('card3d.bloodGroup'), sub: t('card3d.bloodGroupSub'), icon: 'drop' },
    { label: t('card3d.emergencyContact'), sub: t('card3d.emergencyContactSub'), icon: 'phone' },
    { label: t('card3d.medicalConditions'), sub: t('card3d.medicalConditionsSub'), icon: 'medical' },
    { label: t('card3d.currentMedications'), sub: t('card3d.currentMedicationsSub'), icon: 'pill' },
    { label: t('card3d.preferredHospital'), sub: t('card3d.preferredHospitalSub'), icon: 'hospital' },
    { label: t('card3d.consentPreferences'), sub: t('card3d.consentPreferencesSub'), icon: 'shield' },
    { label: t('card3d.cardMetadata'), sub: t('card3d.cardMetadataSub'), icon: 'card' },
  ];

  const backFields = [
    { label: t('card3d.swasthtapId'), value: 'STP 1234 5678 9012', valueColor: '#4dd8c0' },
    { label: t('card3d.name'), value: 'Rahul Sharma', valueColor: '#ffffff' },
    { label: t('card3d.dob'), value: '15/08/1990', valueColor: '#ffffff' },
    { label: t('card3d.bloodGroup'), value: 'O+', valueColor: '#ffffff' },
    { label: t('card3d.emergencyContact'), value: '98765 43210', valueColor: '#ffffff' },
  ];

  const backFeatures = [
    { title: t('card3d.secure'), desc: t('card3d.secureDesc'), fy: 58 },
    { title: t('card3d.private'), desc: t('card3d.privateDesc'), fy: 162 },
    { title: t('card3d.portable'), desc: t('card3d.portableDesc'), fy: 258 },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIsMounted(true);
    const mqWide = window.matchMedia('(min-width: 740px)');
    setIsWideScreen(mqWide.matches);
    const handlerWide = (e: MediaQueryListEvent) => setIsWideScreen(e.matches);
    mqWide.addEventListener('change', handlerWide);

    const mqMd = window.matchMedia('(min-width: 768px)');
    setIsTabletOrDesktop(mqMd.matches);
    const handlerMd = (e: MediaQueryListEvent) => setIsTabletOrDesktop(e.matches);
    mqMd.addEventListener('change', handlerMd);

    const handleResize = () => {
      const isTwoCol = window.innerWidth >= 1024;
      const factor = isTwoCol ? 0.52 : 0.85;
      const colWidth = Math.min(window.innerWidth * factor, 920);
      const newScale = Math.min(1, Math.max(0.45, colWidth / 1000));
      setScale(newScale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      mqWide.removeEventListener('change', handlerWide);
      mqMd.removeEventListener('change', handlerMd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fixed values only used for annotation panel sizing
  const cardMaxW = 720;
  const cardH = cardMaxW / 1.6;
  const lineAreaW = 480;
  const showAnnotations = isMounted && isWideScreen;

  // Responsive card width: scales down linearly with screen width/height, transitioning seamlessly at 740px
  let cardWidth = 'clamp(180px, min(65vw, 42vh), 340px)'; // Mobile default
  if (showAnnotations) {
    cardWidth = '520px'; // Wide viewports (scaled by the container transform scale)
  } else if (isMounted && isTabletOrDesktop) {
    cardWidth = 'clamp(200px, min(22vw, 35vh), 360px)'; // Tablet fallback
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        transform: showAnnotations ? `scale(${scale})` : undefined,
        transformOrigin: 'center center',
      }}>
        {/* Card */}
        <div
          style={{ width: cardWidth, aspectRatio: '1.6/1', perspective: 900, cursor: dragging ? 'grabbing' : 'grab', zIndex: 2, flexShrink: 0, minWidth: 0 }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          <div style={{
            width: '100%', height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotY}deg)`,
            transition: dragging ? 'none' : undefined,
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            position: 'relative',
          }}>
            {/* Front */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, overflow: 'hidden' }}>
              <FrontCanvas brandName={t('common.swasthyaTap')} tagline={t('card3d.tagline')} />
            </div>
            {/* Back */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 16, overflow: 'hidden', transform: 'rotateY(180deg)' }}>
              <BackCanvas
                brandName={t('common.swasthyaTap')}
                tagline={t('card3d.tagline')}
                fields={backFields}
                btnLine1={t('card3d.btnLine1')}
                btnLine2={t('card3d.btnLine2')}
                features={backFeatures}
                helpTitle={t('card3d.helpTitle')}
                helpEmail={t('card3d.helpEmail')}
              />
            </div>
          </div>
        </div>

        {/* Animated NFC Lines + Labels (right of card) — hidden below xl */}
        {showAnnotations && <div style={{
          marginLeft: 0,
          position: 'relative',
          width: lineAreaW,
          height: cardH,
          flexShrink: 0,
          pointerEvents: 'none',
          opacity: showFront ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, #166534, #15803d)',
            borderRadius: 14,
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 6,
            boxShadow: '0 4px 20px rgba(22,101,52,0.35)',
            opacity: showFront ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
            zIndex: 3,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                <path d="M12.91 4.1a16.07 16.07 0 0 1 0 15.8" />
                <path d="M16.37 2a20.4 20.4 0 0 1 0 20" />
              </svg>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
                {t('card3d.nfcEnabledTitle').split('\n').map((line, i) => <span key={i}>{line}{i === 0 ? <br/> : null}</span>)}
              </span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, lineHeight: 1.3 }}>
              {t('card3d.nfcEnabledSub').split('\n').map((line, i) => <span key={i}>{line}{i === 0 ? <br/> : null}</span>)}
            </span>
          </div>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${lineAreaW} ${cardH}`}
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          >
            <line
              x1="0" y1={cardH / 2} x2="8" y2={cardH / 2}
              stroke="#16a34a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset={showFront ? 0 : 40}
              opacity={showFront ? 0.8 : 0}
              style={{ transition: `stroke-dashoffset 0.5s ease, opacity 0.3s ease` }}
            />
            <polygon
              points={`8,${cardH / 2 - 5} 14,${cardH / 2} 8,${cardH / 2 + 5}`}
              fill="#16a34a"
              opacity={showFront ? 0.8 : 0}
              style={{ transition: `opacity 0.3s ease 0.3s` }}
            />
          </svg>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${lineAreaW} ${cardH}`}
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 4 }}
          >
            <circle cx="195" cy={cardH / 2} r="7" fill="#16a34a"
              opacity={showFront ? 0.9 : 0}
              style={{ transition: `opacity 0.3s ease 0.4s` }}
            />
            <circle cx="195" cy={cardH / 2} r="3.5" fill="white"
              opacity={showFront ? 1 : 0}
              style={{ transition: `opacity 0.3s ease 0.5s` }}
            />
            {lineItems.map((item, i) => {
              const targetY = 35 + i * ((cardH - 70) / (lineItems.length - 1));
              const originY = cardH / 2;
              const endX = 235;
              return (
                <g key={i}>
                  <path
                     d={`M 195 ${originY} C 210 ${originY}, 220 ${targetY}, ${endX} ${targetY}`}
                     stroke="#16a34a"
                     strokeWidth="2.5"
                     strokeDasharray="200"
                     strokeDashoffset={showFront ? 0 : 200}
                     strokeLinecap="round"
                     opacity={showFront ? 0.8 : 0}
                     style={{
                       transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.15}s, opacity 0.3s ease ${0.3 + i * 0.15}s`,
                     }}
                  />
                  <path
                     d={`M 195 ${originY} C 210 ${originY}, 220 ${targetY}, ${endX} ${targetY}`}
                     stroke="#16a34a"
                     strokeWidth="6"
                     strokeDasharray="200"
                     strokeDashoffset={showFront ? 0 : 200}
                     strokeLinecap="round"
                     opacity={showFront ? 0.12 : 0}
                     style={{
                       transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.15}s, opacity 0.3s ease ${0.3 + i * 0.15}s`,
                     }}
                  />
                </g>
              );
            })}
          </svg>
          {lineItems.map((item, i) => {
            const targetY = 35 + i * ((cardH - 70) / (lineItems.length - 1));
            return (
              <div
                key={`label-${i}`}
                style={{
                  position: 'absolute',
                  left: 240,
                  top: targetY - 16,
                  opacity: showFront ? 1 : 0,
                  transform: showFront ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.4s ease ${0.5 + i * 0.12}s, transform 0.4s ease ${0.5 + i * 0.12}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(34,197,94,0.15)', border: '1.5px solid rgba(22,101,52,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(34,197,94,0.15)',
                }}>
                  <NFCLineIcon type={item.icon} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#0f2b1e', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: 10, color: '#374a3e', lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>}

        {/* Animated NFC Lines + Labels (RIGHT of card, shown when back is visible) */}
        {showAnnotations && <div style={{
          marginLeft: -lineAreaW,
          position: 'relative',
          width: lineAreaW,
          height: cardH,
          flexShrink: 0,
          pointerEvents: 'none',
          opacity: showBack ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 3,
        }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${lineAreaW} ${cardH}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {backLineItems.map((item, i) => {
              const targetY = 35 + i * ((cardH - 70) / (backLineItems.length - 1));
              const originY = cardH / 2;
              return (
                <g key={`back-${i}`}>
                  <path
                    d={`M 0 ${originY} C 50 ${originY}, 65 ${targetY}, 130 ${targetY}`}
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeDasharray="250"
                    strokeDashoffset={showBack ? 0 : 250}
                    strokeLinecap="round"
                    opacity={showBack ? 0.8 : 0}
                    style={{
                      transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s, opacity 0.3s ease ${i * 0.08}s`,
                    }}
                  />
                  <path
                    d={`M 0 ${originY} C 50 ${originY}, 65 ${targetY}, 130 ${targetY}`}
                    stroke="#0d9488"
                    strokeWidth="6"
                    strokeDasharray="250"
                    strokeDashoffset={showBack ? 0 : 250}
                    strokeLinecap="round"
                    opacity={showBack ? 0.15 : 0}
                    style={{
                      transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s, opacity 0.3s ease ${i * 0.08}s`,
                    }}
                  />
                  <circle cx="0" cy={originY} r="4" fill="#0d9488"
                    opacity={showBack ? 0.7 : 0}
                    style={{ transition: `opacity 0.3s ease ${i * 0.08}s` }}
                  />
                  <circle cx="130" cy={targetY} r="5" fill="#0d9488"
                    style={{
                      opacity: showBack ? 1 : 0,
                      transition: `opacity 0.3s ease ${0.3 + i * 0.08}s`,
                    }}
                  >
                    <animate attributeName="r" values="4;6.5;4" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                  <circle cx="130" cy={targetY} r="10" fill="none" stroke="#0d9488" strokeWidth="1.5"
                    style={{
                      opacity: showBack ? 0.4 : 0,
                      transition: `opacity 0.3s ease ${0.4 + i * 0.08}s`,
                    }}
                  >
                    <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                  </circle>
                </g>
              );
            })}
          </svg>
          {/* Labels */}
          {backLineItems.map((item, i) => {
            const targetY = 35 + i * ((cardH - 70) / (backLineItems.length - 1));
            return (
              <div
                key={`back-label-${i}`}
                style={{
                  position: 'absolute',
                  left: 145,
                  top: targetY - 16,
                  opacity: showBack ? 1 : 0,
                  transform: showBack ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.4s ease ${0.3 + i * 0.08}s, transform 0.4s ease ${0.3 + i * 0.08}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(77,216,192,0.15)', border: '1.5px solid rgba(20,83,69,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(77,216,192,0.15)',
                }}>
                  <BackLineIcon type={item.icon} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0c2a2a', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#2d4a4a', lineHeight: 1.3 }}>{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>}
      </div>
    </div>
  );
}

function NFCLineIcon({ type }: { type: string }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#166534', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'id':
      return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M15 8h3M15 12h3M15 16h3"/></svg>;
    case 'person':
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>;
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'drop':
      return <svg {...props}><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z"/></svg>;
    case 'phone':
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68a2 2 0 0 1 1.72 2.03z"/></svg>;
    default:
      return null;
  }
}

function BackLineIcon({ type }: { type: string }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#145345', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'drop':
      return <svg {...props}><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z"/></svg>;
    case 'phone':
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68a2 2 0 0 1 1.72 2.03z"/></svg>;
    case 'medical':
      return <svg {...props}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'allergy':
      return <svg {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9l.01 0M15 9l-.01 0"/></svg>;
    case 'pill':
      return <svg {...props}><rect x="3" y="10" width="18" height="8" rx="4" transform="rotate(-45 12 14)"/><path d="M12 7.5l-4.5 4.5"/></svg>;
    case 'doctor':
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/><path d="M12 12v3"/></svg>;
    case 'hospital':
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8h0M15 8h0M9 12h6M12 9v6"/></svg>;
    case 'document':
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>;
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'card':
      return <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>;
    default:
      return null;
  }
}
