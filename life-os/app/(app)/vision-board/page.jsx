'use client';

import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';
import { dimNamesVision } from '../../../lib/data';

export default function VisionBoardPage() {
  const { state, update } = useLifeOSState();
  const view = state.visionView || 'edit';
  const createdDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  function onUpload(slotId, file) {
    const reader = new FileReader();
    reader.onload = () => {
      update((s) => ({ visionImages: { ...s.visionImages, [slotId]: reader.result } }));
    };
    reader.readAsDataURL(file);
  }

  function onOneLinerChange(slotId, value) {
    update((s) => ({ oneLiners: { ...s.oneLiners, [slotId]: value } }));
  }

  function compileBoard() {
    update({ visionView: 'poster' });
  }

  function backToEdit() {
    update({ visionView: 'edit' });
  }

  function downloadBoard() {
    const el = document.getElementById('vision-poster');
    if (!el) return;
    const run = () => {
      window.htmlToImage.toPng(el, { pixelRatio: 2 }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `vision-board-${state.visionYear}.png`;
        link.href = dataUrl;
        link.click();
      });
    };
    if (window.htmlToImage) {
      run();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js';
    s.onload = run;
    document.head.appendChild(s);
  }

  if (view === 'poster') {
    return (
      <div>
        <div style={sx('display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;')}>
          <div onClick={backToEdit} style={sx('font-size:13px; color:oklch(45% 0.01 90); cursor:pointer;')}>← Back to edit</div>
          <div onClick={downloadBoard} style={sx('background:oklch(50% 0.13 255); color:white; font-size:14px; font-weight:600; padding:10px 20px; border-radius:9px; cursor:pointer;')}>
            Download Poster (PNG)
          </div>
        </div>
        <div id="vision-poster" style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:16px; padding:36px; max-width:1100px;')}>
          <div style={sx('text-align:center; margin-bottom:26px;')}>
            <div style={sx('font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:oklch(50% 0.1 255); font-weight:700;')}>Life Operating System</div>
            <h1 style={sx('font-size:34px; font-weight:700; letter-spacing:-0.02em; margin:6px 0 4px;')}>{state.visionYear} Vision Board</h1>
            <div style={sx('font-size:13px; color:oklch(45% 0.01 90);')}>Created {createdDate} · Jordan Ellis</div>
          </div>
          <div style={sx('display:grid; grid-template-columns:repeat(4,1fr); gap:14px;')}>
            {dimNamesVision.map((name, i) => {
              const slotId = `vb-${i}`;
              const image = state.visionImages[slotId] || '';
              const oneLiner = state.oneLiners[slotId] || '';
              return (
                <div key={slotId} style={sx('border-radius:12px; overflow:hidden; position:relative; background:oklch(95% 0.008 90);')}>
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      background: image ? `url(${image}) center/cover` : 'oklch(93% 0.008 90)',
                    }}
                  />
                  <div style={sx('padding:8px 10px;')}>
                    <div style={sx('font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:oklch(50% 0.1 255);')}>{name}</div>
                    <div style={sx('font-size:12px; color:oklch(35% 0.015 90); margin-top:2px; line-height:1.3;')}>{oneLiner || '—'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={sx('display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:6px;')}>
        <div>
          <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0;')}>Vision Board</h1>
          <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:6px 0 0;')}>
            Add an image and a one-line intention for each of the 12 life dimensions, then compile them into a single
            poster.
          </p>
        </div>
        <div style={sx('display:flex; align-items:center; gap:10px;')}>
          <label style={sx('font-size:13px; color:oklch(45% 0.01 90);')}>Vision Year</label>
          <input
            value={state.visionYear}
            onChange={(e) => update({ visionYear: e.target.value })}
            style={sx('width:80px; font-size:14px; font-weight:600; border:1px solid oklch(85% 0.01 90); border-radius:7px; padding:7px 10px;')}
          />
        </div>
      </div>

      <div style={sx('display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:24px;')}>
        {dimNamesVision.map((name, i) => {
          const slotId = `vb-${i}`;
          const image = state.visionImages[slotId] || '';
          const oneLiner = state.oneLiners[slotId] || '';
          return (
            <div key={slotId} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:14px; display:flex; flex-direction:column; gap:10px;')}>
              <div style={sx('font-size:13px; font-weight:700;')}>{name}</div>
              <label
                style={{
                  width: '100%',
                  height: '140px',
                  borderRadius: '8px',
                  border: '1px dashed oklch(80% 0.01 90)',
                  background: image ? `url(${image}) center/cover` : 'oklch(96% 0.006 90)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {!image ? (
                  <div style={sx('font-size:12px; color:oklch(50% 0.01 90); text-align:center; padding:0 10px;')}>Click to upload an image</div>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (f) onUpload(slotId, f);
                  }}
                  style={{ display: 'none' }}
                />
              </label>
              <input
                value={oneLiner}
                onChange={(e) => onOneLinerChange(slotId, e.target.value)}
                placeholder="One-line intention for this area..."
                style={sx('font-size:13px; border:1px solid oklch(88% 0.01 90); border-radius:7px; padding:8px 10px;')}
              />
            </div>
          );
        })}
      </div>

      <div onClick={compileBoard} style={sx('display:inline-block; margin-top:26px; background:oklch(50% 0.13 255); color:white; font-size:14px; font-weight:600; padding:12px 26px; border-radius:9px; cursor:pointer;')}>
        Compile Vision Board
      </div>
    </div>
  );
}
