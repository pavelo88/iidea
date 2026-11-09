// Constelación animada superpuesta a public/hero-vocacional.webp.
// viewBox 1920×680 = dimensiones reales del hero (min-h-[680px] en desktop).
// La imagen usa object-cover/center → crop_top = (1080-680)/2 = 200px.
// Coordenadas Y aquí = Y_original_imagen - 200.

// Coordenadas extraídas automáticamente de hero-vocacional.webp (1920x1080)
// Y aquí = Y_original - 200 (crop_top del object-cover en hero de 680px)
const NODES: [number, number][] = [
  [1057, 602], // 0
  [  67, 616], // 1
  [ 241, 418], // 2
  [ 119, 310], // 3
  [ 541, 491], // 4
  [1125, 387], // 5
  [ 436, 401], // 6
  [1371, 453], // 7
  [ 833, 604], // 8
  [1147, 437], // 9
  [1481, 142], // 10
  [1568, 634], // 11
  [1374,  54], // 12
  [ 179, 494], // 13
  [ 843, 680], // 14 (borde inferior)
  [1443, 540], // 15
  [1307, 251], // 16
  [ 689, 374], // 17
  [ 969, 558], // 18
  [1135, 218], // 19
  [  50, 421], // 20
  [1797, 167], // 21
];

// Aristas generadas por proximidad (<380px entre nodos)
const EDGES: [number, number][] = [
  [0,18],[0,9],[0,8],[1,13],[1,20],[1,2],[2,13],[2,3],[2,20],
  [3,20],[3,13],[3,6],[4,6],[4,17],[4,8],[5,9],[5,19],[5,16],
  [6,17],[6,13],[7,15],[7,16],[7,9],[8,14],[8,18],[8,17],[9,18],
  [9,19],[9,16],[10,12],[10,16],[10,21],[11,15],[12,16],[12,19],
  [13,20],[14,18],[14,17],[15,16],[16,19],[17,18],[18,19],
];

const css = `
  @keyframes hcPulse { 0%,100%{opacity:.55;transform:scale(.85)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes hcHalo  { 0%,100%{opacity:.2;transform:scale(.75)} 50%{opacity:.65;transform:scale(1.3)} }
  @keyframes hcLine  { 0%,100%{opacity:.15} 50%{opacity:.55} }
  .hc-node{transform-box:fill-box;transform-origin:center;animation:hcPulse 4.5s ease-in-out infinite}
  .hc-halo{transform-box:fill-box;transform-origin:center;animation:hcHalo 4.5s ease-in-out infinite}
  .hc-line{animation:hcLine 6s ease-in-out infinite}
  @media (prefers-reduced-motion: reduce){ .hc-node,.hc-halo,.hc-line{animation:none!important} }
`;

export function HeroConstellation() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1920 680"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <g stroke="#ffb733" strokeWidth="1.4" strokeLinecap="round" opacity={0.7}>
        {EDGES.map(([a, b], i) => (
          <line
            key={`e${i}`}
            className="hc-line"
            x1={NODES[a][0]} y1={NODES[a][1]}
            x2={NODES[b][0]} y2={NODES[b][1]}
            style={{ animationDelay: `${(i * 0.37) % 6}s` }}
          />
        ))}
      </g>
      {NODES.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r={6} fill="#ffb733" className="hc-halo"
            style={{ animationDelay: `${(i * 0.45) % 4.5}s` }} opacity={0.3} />
          <circle cx={x} cy={y} r={2.5} fill="#ffd27a" className="hc-node"
            style={{ animationDelay: `${(i * 0.45) % 4.5}s` }} />
        </g>
      ))}
    </svg>
  );
}
