export interface DistrictPolygon {
  id: string;          // matches market_data.json district id
  name_ar: string;
  points: [number, number][];  // array of [x, y] pairs forming the polygon
  centroid: [number, number];  // [x, y] center point for node placement
  isCoastal: boolean;          // true for الشاطئ and الكورنيش
}

export interface CoastlinePath {
  d: string;
}

export const coastline: CoastlinePath = {
  // A jagged western coastline representing the Red Sea
  d: "M 0,0 L 40,50 L 20,120 L 60,180 L 30,250 L 70,320 L 40,400 L 80,480 L 50,550 L 90,600 L 0,600 Z"
};

export const districts: DistrictPolygon[] = [
  // COAStAL DISTRICTS (x 80-180)
  {
    id: "al_shatei",
    name_ar: "الشاطئ",
    isCoastal: true,
    points: [[100, 50], [180, 50], [185, 140], [95, 145]],
    centroid: [140, 95]
  },
  {
    id: "al_corniche",
    name_ar: "الكورنيش",
    isCoastal: true,
    points: [[95, 155], [185, 150], [190, 250], [105, 255]],
    centroid: [145, 205]
  },

  // NEAR-COAStAL (x 180-300)
  {
    id: "al_yasmine",
    name_ar: "الياسمين",
    isCoastal: false,
    points: [[195, 50], [290, 55], [295, 145], [200, 140]],
    centroid: [245, 95]
  },
  {
    id: "al_rawdah",
    name_ar: "الروضة",
    isCoastal: false,
    points: [[200, 155], [295, 160], [300, 250], [205, 245]],
    centroid: [250, 205]
  },

  // CENTRAL URBAN CORE (x 200-450)
  {
    id: "al_shamiyah",
    name_ar: "الشامية",
    isCoastal: false,
    points: [[210, 260], [315, 265], [310, 350], [205, 345]],
    centroid: [260, 305]
  },
  {
    id: "alkhalidiyah",
    name_ar: "الخالدية",
    isCoastal: false,
    points: [[325, 265], [430, 270], [435, 355], [320, 360]],
    centroid: [375, 315]
  },
  {
    id: "al_sharqiyah",
    name_ar: "الشرقية",
    isCoastal: false,
    points: [[320, 160], [420, 165], [425, 255], [315, 250]],
    centroid: [370, 205]
  },
  {
    id: "al_gharbiyah",
    name_ar: "الغربية",
    isCoastal: false,
    points: [[210, 360], [310, 365], [305, 450], [200, 445]],
    centroid: [255, 405]
  },
  {
    id: "as_souq",
    name_ar: "السوق",
    isCoastal: false,
    points: [[320, 370], [435, 365], [440, 460], [315, 465]],
    centroid: [380, 415]
  },
  {
    id: "al_nuzha",
    name_ar: "النزهة",
    isCoastal: false,
    points: [[205, 460], [310, 465], [300, 550], [195, 545]],
    centroid: [250, 505]
  },

  // EASTERN / OUTLYING (x 350-750)
  {
    id: "as_salam",
    name_ar: "السلام",
    isCoastal: false,
    points: [[440, 165], [550, 160], [545, 245], [435, 250]],
    centroid: [490, 205]
  },
  {
    id: "al_naamiyah",
    name_ar: "الناعمية",
    isCoastal: false,
    points: [[560, 160], [670, 155], [675, 240], [555, 245]],
    centroid: [615, 200]
  },
  {
    id: "an_nahdah",
    name_ar: "النهضة",
    isCoastal: false,
    points: [[450, 270], [560, 275], [555, 360], [445, 355]],
    centroid: [500, 315]
  },
  {
    id: "al_aziziyah",
    name_ar: "العزيزية",
    isCoastal: false,
    points: [[570, 275], [680, 280], [675, 365], [565, 360]],
    centroid: [625, 320]
  },
  {
    id: "al_rabwah",
    name_ar: "الربوة",
    isCoastal: false,
    points: [[450, 375], [565, 370], [570, 455], [445, 460]],
    centroid: [510, 415]
  },
  {
    id: "al_muhammadia",
    name_ar: "المحمدية",
    isCoastal: false,
    points: [[575, 375], [690, 380], [685, 465], [580, 460]],
    centroid: [635, 420]
  },
  {
    id: "quz",
    name_ar: "القوز",
    isCoastal: false,
    points: [[445, 475], [560, 480], [550, 560], [435, 555]],
    centroid: [500, 520]
  },
  {
    id: "al_waha",
    name_ar: "الواحة",
    isCoastal: false,
    points: [[570, 475], [685, 480], [675, 565], [560, 555]],
    centroid: [625, 520]
  },
  {
    id: "hali",
    name_ar: "حلي",
    isCoastal: false,
    points: [[690, 155], [780, 150], [785, 240], [685, 245]],
    centroid: [735, 200]
  },
  {
    id: "al_muzaylif",
    name_ar: "المظيلف",
    isCoastal: false,
    points: [[695, 255], [785, 250], [790, 340], [690, 345]],
    centroid: [740, 300]
  }
];
