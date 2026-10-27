export const marketData = {
  demand: 80000, // 公噸/年
  marketSize: 350, // 億元 (中間值)
  importDependency: 80, // %
  domesticSelfSufficiency: 20, // %
};

export const donutChartData = [
  { name: '進口白蝦', value: 80, volume: '6.4 萬噸', color: '#0d57d0' },
  { name: '國產白蝦', value: 20, volume: '1.6 萬噸', color: '#00bcbb' },
];

export const detailedDonutData = [
  { name: '台灣露天魚蝦混合池', value: 14, volume: '1.12 萬噸', color: '#0ea5e9', type: 'domestic' },
  { name: '台灣半露天網室養殖專養池', value: 3, volume: '0.24 萬噸', color: '#14b8a6', type: 'domestic' },
  { name: '台灣室內白蝦養殖場1.0版', value: 2.5, volume: '0.2 萬噸', color: '#10b981', type: 'domestic' },
  { name: '台灣室內白蝦養殖場2.0版(智養蝦)', value: 0.5, volume: '0.04 萬噸', color: '#00f5d4', type: 'domestic' },
  { name: '進口中南美洲 (宏都拉斯等)', value: 55, volume: '4.4 萬噸', color: '#1d4ed8', type: 'import' },
  { name: '進口東南亞 (泰國/越南等)', value: 25, volume: '2.0 萬噸', color: '#38bdf8', type: 'import' },
];

export const opportunityData = [
  { title: 'ESG 永續趨勢', description: '企業與消費者重視永續採購，永續養殖更受青睞。' },
  { title: '食安意識抬頭', description: '食安問題受關注，國產安心、可追溯成為市場首選。' },
  { title: 'AI 科技導入', description: 'AIoT 技術成熟，讓養殖更精準、更有效率。' },
  { title: '政策支持', description: '政府推動智慧農業與綠能政策，資源與補助持續投入。' },
  { title: '青年返鄉潮', description: '返鄉創業與第二收入成趨勢，智慧養殖是最佳選擇。' },
];
