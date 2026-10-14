import { SubjectItem, TopicItem, LessonData, NotesData, GameData } from '../types/index.ts';

export const ALL_CLASSES = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

export const SUBJECTS: SubjectItem[] = [
  {
    id: 'math',
    name: 'Mathematics',
    tamilName: 'கணிதம்',
    hindiName: 'गणित',
    icon: 'Calculator',
    color: 'from-blue-500 to-indigo-600',
    minClass: 1,
    maxClass: 12,
  },
  {
    id: 'science',
    name: 'General Science',
    tamilName: 'அறிவியல்',
    hindiName: 'विज्ञान',
    icon: 'FlaskConical',
    color: 'from-emerald-500 to-teal-600',
    minClass: 1,
    maxClass: 8,
  },
  {
    id: 'physics',
    name: 'Physics',
    tamilName: 'இயற்பியல்',
    hindiName: 'भौतिकी',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    minClass: 9,
    maxClass: 12,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    tamilName: 'வேதியியல்',
    hindiName: 'रसायन विज्ञान',
    icon: 'Atom',
    color: 'from-rose-500 to-pink-600',
    minClass: 9,
    maxClass: 12,
  },
  {
    id: 'biology',
    name: 'Biology',
    tamilName: 'உயிரியல்',
    hindiName: 'जीव विज्ञान',
    icon: 'Dna',
    color: 'from-lime-500 to-green-600',
    minClass: 9,
    maxClass: 12,
  },
  {
    id: 'social',
    name: 'Social Studies & Geography',
    tamilName: 'சமூக அறிவியல்',
    hindiName: 'सामाजिक विज्ञान',
    icon: 'Globe',
    color: 'from-cyan-500 to-blue-600',
    minClass: 1,
    maxClass: 10,
  },
  {
    id: 'english',
    name: 'English Grammar & Skills',
    tamilName: 'ஆங்கிலம்',
    hindiName: 'अंग्रेजी',
    icon: 'BookOpen',
    color: 'from-purple-500 to-violet-600',
    minClass: 1,
    maxClass: 12,
  },
  {
    id: 'tamil',
    name: 'Tamil Language & Literature',
    tamilName: 'தமிழ் மொழி',
    hindiName: 'तमिल भाषा',
    icon: 'Feather',
    color: 'from-red-500 to-amber-600',
    minClass: 1,
    maxClass: 12,
  },
  {
    id: 'cs',
    name: 'Computer Science',
    tamilName: 'கணினி அறிவியல்',
    hindiName: 'कंप्यूटर विज्ञान',
    icon: 'Cpu',
    color: 'from-sky-500 to-blue-700',
    minClass: 6,
    maxClass: 12,
  },
];

export const TOPICS: TopicItem[] = [
  // Science / Physics
  {
    id: 'electric-circuits',
    subjectId: 'science',
    title: 'Electric Circuits & Current Flow',
    tamilTitle: 'மின்சுற்றுகள் மற்றும் மின்னோட்டம்',
    hindiTitle: 'विद्युत परिपथ और धारा प्रवाह',
    chapter: 'Chapter 12: Electricity',
    description: 'Understand how batteries push electrons through a closed loop to light up bulbs.',
    minClass: 6,
    maxClass: 10,
    diagramType: 'circuit',
  },
  {
    id: 'photosynthesis',
    subjectId: 'science',
    title: 'Plant Photosynthesis & Food Making',
    tamilTitle: 'தாவரங்களில் ஒளிச்சேர்க்கை முறை',
    hindiTitle: 'पौधों में प्रकाश संश्लेषण',
    chapter: 'Chapter 1: Nutrition in Plants',
    description: 'Explore how sunlight, water, and CO2 combine inside chloroplasts to create glucose and oxygen.',
    minClass: 4,
    maxClass: 9,
    diagramType: 'photosynthesis',
  },
  {
    id: 'fractions-basics',
    subjectId: 'math',
    title: 'Understanding Fractions & Equal Parts',
    tamilTitle: 'பின்னங்கள் மற்றும் சமமான பாகங்கள்',
    hindiTitle: 'भिन्न और बराबर हिस्से',
    chapter: 'Chapter 2: Fractions and Decimals',
    description: 'Master numerator, denominator, and equivalent fractions with visual pie models.',
    minClass: 3,
    maxClass: 7,
    diagramType: 'fractions',
  },
  {
    id: 'newtons-laws',
    subjectId: 'physics',
    title: "Newton's Second Law of Motion (F = m × a)",
    tamilTitle: 'நியூட்டனின் இரண்டாம் இயக்க விதி',
    hindiTitle: 'न्यूटन का दूसरा गति नियम',
    chapter: 'Chapter 9: Force and Laws of Motion',
    description: 'Discover how unbalanced force accelerates a mass with real vector arrow simulations.',
    minClass: 9,
    maxClass: 12,
    diagramType: 'force_motion',
  },
  {
    id: 'cell-structure',
    subjectId: 'biology',
    title: 'Cell Structure: The Basic Unit of Life',
    tamilTitle: 'செல்லின் அமைப்பு மற்றும் உறுப்புகள்',
    hindiTitle: 'कोशिका की संरचना',
    chapter: 'Chapter 8: Cell Structure & Functions',
    description: 'Tour the cell membrane, nucleus, mitochondria (powerhouse), and plant cell wall.',
    minClass: 8,
    maxClass: 12,
    diagramType: 'cell',
  },
  {
    id: 'solar-system',
    subjectId: 'social',
    title: 'The Solar System & Earth Rotation',
    tamilTitle: 'சூரிய குடும்பம் மற்றும் பூமியின் இயக்கம்',
    hindiTitle: 'सौरमंडल और पृथ्वी की गतियां',
    chapter: 'Geography Chapter 1: The Earth in Solar System',
    description: 'Learn why we experience day and night as Earth orbits the sun on its tilted axis.',
    minClass: 3,
    maxClass: 8,
    diagramType: 'solar_system',
  },
  {
    id: 'circulatory-system',
    subjectId: 'biology',
    title: 'Human Heart & Blood Circulation',
    tamilTitle: 'மனித இதயமும் இரத்த ஓட்டமும்',
    hindiTitle: 'मानव हृदय और रक्त परिसंचरण',
    chapter: 'Chapter 6: Life Processes',
    description: 'Track how oxygen-rich and oxygen-poor blood pump through the four chambers of the heart.',
    minClass: 7,
    maxClass: 11,
    diagramType: 'heart_circulation',
  },
  {
    id: 'geometry-triangles',
    subjectId: 'math',
    title: 'Pythagorean Theorem & Right Triangles',
    tamilTitle: 'பித்தாகரஸ் தேற்றம் மற்றும் முக்கோணங்கள்',
    hindiTitle: 'पाइथागोरस प्रमेय और समकोण त्रिभुज',
    chapter: 'Chapter 7: Triangles & Coordinate Geometry',
    description: 'Prove that a² + b² = c² through geometric square areas and step-by-step calculations.',
    minClass: 7,
    maxClass: 10,
    diagramType: 'geometry',
  },
  {
    id: 'chemical-bonding',
    subjectId: 'chemistry',
    title: 'Chemical Bonding: Covalent & Ionic Bonds',
    tamilTitle: 'வேதியியல் பிணைப்புகள்: சகப்பிணைப்பு மற்றும் அயனிப் பிணைப்பு',
    hindiTitle: 'रासायनिक आबंधन: सहसंयोजक और आयनिक बंध',
    chapter: 'Chapter 4: Chemical Bonding & Molecular Structure',
    description: 'See how atoms share or transfer valence electrons to reach stable octet configurations.',
    minClass: 9,
    maxClass: 12,
    diagramType: 'chemical_bonding',
  },
  {
    id: 'english-grammar-tenses',
    subjectId: 'english',
    title: 'Mastering English Tenses & Active Voice',
    tamilTitle: 'ஆங்கில காலங்கள் மற்றும் வாக்கிய அமைப்பு',
    hindiTitle: 'अंग्रेजी काल और वाक्य रचना',
    chapter: 'Unit 3: Functional Grammar & Syntax',
    description: 'Learn past, present, and future forms with real conversation examples and practical sentences.',
    minClass: 4,
    maxClass: 12,
    diagramType: 'concept_diagram',
  },
  {
    id: 'tamil-ilakkanam',
    subjectId: 'tamil',
    title: 'தமிழ் இலக்கணம்: பெயர்ச்சொல் & வினைச்சொல்',
    tamilTitle: 'தமிழ் இலக்கணம்: பெயர்ச்சொல் & வினைச்சொல்',
    hindiTitle: 'तमिल व्याकरण: संज्ञा और क्रिया',
    chapter: 'இயல் 2: அடிப்படை இலக்கணம்',
    description: 'சொற்களின் வகைகள், அறுவகை பெயர்ச்சொற்கள் மற்றும் வாக்கியங்களில் அவற்றின் பயன்பாடுகள்.',
    minClass: 3,
    maxClass: 10,
    diagramType: 'concept_diagram',
  },
  {
    id: 'cs-algorithms',
    subjectId: 'cs',
    title: 'Algorithms & Flowchart Logic',
    tamilTitle: 'வழிமுறை நெறிமுறைகள் மற்றும் பாய்வுப் படங்கள்',
    hindiTitle: 'एल्गोरिदम और फ्लोचार्ट तर्क',
    chapter: 'Chapter 1: Computational Thinking',
    description: 'Understand input, decision branches, loops, and outputs to solve real problems step by step.',
    minClass: 6,
    maxClass: 12,
    diagramType: 'concept_diagram',
  },
  {
    id: 'binary-search',
    subjectId: 'cs',
    title: 'Binary Search Algorithm & Divide and Conquer',
    tamilTitle: 'பைனரி தேடல் நெறிமுறை (Binary Search)',
    hindiTitle: 'बाइनरी सर्च एल्गोरिदम (Binary Search)',
    chapter: 'Chapter 4: Searching & Sorting Algorithms',
    description: 'Find elements in O(log n) time by halving the sorted search interval at each step.',
    minClass: 6,
    maxClass: 12,
    diagramType: 'concept_diagram',
  },
];

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export function getSubjectsForClass(classStr: string): SubjectItem[] {
  const match = classStr.match(/\d+/);
  const classNum = match ? parseInt(match[0], 10) : 7;
  return SUBJECTS.filter((s) => classNum >= s.minClass && classNum <= s.maxClass);
}

export function getTopicsForClassAndSubject(classStr: string, subjectId: string): TopicItem[] {
  const match = classStr.match(/\d+/);
  const classNum = match ? parseInt(match[0], 10) : 7;
  return TOPICS.filter(
    (t) => t.subjectId === subjectId && classNum >= t.minClass && classNum <= t.maxClass
  );
}

export interface TopicDomainConfig {
  diagramType: 'circuit' | 'photosynthesis' | 'fractions' | 'force_motion' | 'solar_system' | 'cell' | 'heart_circulation' | 'geometry' | 'chemical_bonding' | 'concept_diagram';
  formula: string;
  labels: { ta: string[]; en: string[]; hi: string[] };
  steps: { ta: string[]; en: string[]; hi: string[] };
  highlight: { ta: string; en: string; hi: string };
  practicalExample: { ta: string; en: string; hi: string };
  summaryPoint: { ta: string; en: string; hi: string };
}

export function getTopicDomainConfig(topicTitle: string, subject: string): TopicDomainConfig {
  const t = (topicTitle + ' ' + subject).toLowerCase();

  // 1. Plant Photosynthesis
  if (t.includes('photo') || t.includes('plant') || t.includes('ஒளிச்சேர்க்கை') || t.includes('தாவர') || t.includes('प्रकाश संश्लेषण')) {
    return {
      diagramType: 'photosynthesis',
      formula: '6CO₂ + 6H₂O + ஒளி ஆற்றல் → C₆H₁₂O₆ (குளுக்கோஸ்) + 6O₂',
      labels: {
        ta: ['சூரிய ஒளி (Sunlight)', 'பச்சையம் (Chlorophyll)', 'நீர் & கனிமங்கள் (H₂O)', 'கார்பன் டை ஆக்சைடு (CO₂)', 'ஆக்சிஜன் & குளுக்கோஸ் (O₂)'],
        en: ['Sunlight Energy', 'Chlorophyll in Chloroplasts', 'Water & Minerals (H2O)', 'Carbon Dioxide (CO2)', 'Oxygen & Glucose (C6H12O6)'],
        hi: ['सूर्य का प्रकाश', 'पर्णहरित (Chlorophyll)', 'जल और खनिज (H2O)', 'कार्बन डाइऑक्साइड (CO2)', 'ऑक्सीजन और ग्लूकोज']
      },
      steps: {
        ta: [
          'படி 1: வேர்கள் மண்ணிலிருந்து நீரை உறிஞ்சி இலைகளுக்கு அனுப்புகின்றன.',
          'படி 2: இலைத்துளைகள் (Stomata) வழியே காற்றில் உள்ள CO₂ உள்ளிழுக்கப்படுகிறது.',
          'படி 3: பச்சையம் சூரிய ஒளியைப் பிடித்து உணவாகவும் (Glucose) ஆக்சிஜனாகவும் மாற்றுகிறது.'
        ],
        en: [
          'Step 1: Roots absorb water and transport it through xylem to the leaves.',
          'Step 2: Stomata take in carbon dioxide from the surrounding atmosphere.',
          'Step 3: Chloroplasts use sunlight to synthesize glucose and release vital oxygen.'
        ],
        hi: [
          'चरण 1: जड़ें मिट्टी से पानी सोखकर पत्तियों तक पहुंचाती हैं।',
          'चरण 2: रंध्र (Stomata) वायुमंडल से CO2 ग्रहण करते हैं।',
          'चरण 3: क्लोरोप्लास्ट सूर्य के प्रकाश से भोजन (ग्लूकोज) और ऑक्सीजन बनाते हैं।'
        ]
      },
      highlight: {
        ta: 'ஒளிச்சேர்க்கை பூமியில் உள்ள அனைத்து உயிரினங்களுக்கும் உணவு மற்றும் ஆக்சிஜனை வழங்கும் தாய் வினையாகும்!',
        en: 'Photosynthesis is the fundamental biological process that generates Earth\'s oxygen and sustains all food chains!',
        hi: 'प्रकाश संश्लेषण पृथ्वी के सभी सजीवों के लिए भोजन और प्राणवायु (ऑक्सीजन) प्रदान करने वाली मुख्य प्रक्रिया है!'
      },
      practicalExample: {
        ta: 'வீட்டுத் தோட்டத்தில் உள்ள செடிகள் சூரிய ஒளியில் செழித்து வளர்வதும், மரத்தடியில் தூய குளிர் காற்று கிடைப்பதும் இதற்கு சான்றாகும்.',
        en: 'Healthy indoor plants absorbing indoor toxins and providing fresh oxygen during daytime sunshine.',
        hi: 'पेड़-पौधों द्वारा धूप में ताज़ा ऑक्सीजन छोड़ना और वातावरण को शुद्ध बनाए रखना।'
      },
      summaryPoint: {
        ta: 'தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவு தயாரிக்கின்றன; இதன் துணைப் பொருளாகவே நாம் சுவாசிக்கும் ஆக்சிஜன் கிடைக்கிறது.',
        en: 'Plants synthesize organic sugars from light and water, generating the oxygen essential for planetary life.',
        hi: 'पौधे धूप और पानी से भोजन बनाते हैं और हमें सांस लेने के लिए ऑक्सीजन प्रदान करते हैं।'
      }
    };
  }

  // 2. Fractions & Equal Parts
  if (t.includes('fraction') || t.includes('பின்னம்') || t.includes('भिन्न') || t.includes('part') || t.includes('பாகம்')) {
    return {
      diagramType: 'fractions',
      formula: 'பின்னம் = தொகுதி (Numerator) ÷ பகுதி (Denominator) | 1/2 + 1/4 = 3/4',
      labels: {
        ta: ['முழுப் பொருள் (Whole)', 'பகுதி (Denominator: மொத்த பாகங்கள்)', 'தொகுதி (Numerator: எடுக்கப்பட்ட பாகங்கள்)', 'சமமான பின்னங்கள் (Equivalent)'],
        en: ['Whole Unit', 'Denominator (Total Equal Parts)', 'Numerator (Selected Parts)', 'Equivalent Fractions'],
        hi: ['पूर्ण इकाई', 'हर (Denominator - कुल बराबर भाग)', 'अंश (Numerator - चुने हुए भाग)', 'समतुल्य भिन्न']
      },
      steps: {
        ta: [
          'படி 1: முழுப் பொருளை சமமான துண்டுகளாகப் பிரித்து மொத்த எண்ணிக்கையைக் கணக்கிடுக (பகுதி).',
          'படி 2: நீங்கள் தேர்ந்தெடுத்த அல்லது தேவைப்படும் துண்டுகளை எண்ணுக (தொகுதி).',
          'படி 3: பின்னத்தை தொகுதி/பகுதி வடிவில் எழுதி எளிய வடிவிற்குச் சுருக்குக.'
        ],
        en: [
          'Step 1: Divide the complete object into exactly equal portions to find the denominator.',
          'Step 2: Count the shaded or selected portions to determine the numerator.',
          'Step 3: Express as Numerator / Denominator and reduce to simplest terms.'
        ],
        hi: [
          'चरण 1: पूरी वस्तु को बराबर भागों में बांटें (हर - Denominator)।',
          'चरण 2: चुने गए या रंगे हुए भागों की गिनती करें (अंश - Numerator)।',
          'चरण 3: भिन्न को अंश/हर के रूप में लिखें और सरल करें।'
        ]
      },
      highlight: {
        ta: 'பின்னத்தில் அனைத்துப் பாகங்களும் கட்டாயம் சம அளவில் இருக்க வேண்டும்!',
        en: 'Fractions strictly represent equal subdivisions of a whole entity!',
        hi: 'भिन्न में प्रत्येक भाग का आकार पूर्णतः समान होना अनिवार्य है!'
      },
      practicalExample: {
        ta: 'ஒரு பீட்சா அல்லது தோசையை 4 சம துண்டுகளாக வெட்டி அதில் 2 துண்டுகளை சாப்பிட்டால் அது 2/4 = 1/2 ஆகும்.',
        en: 'Sharing an 8-slice pizza equally among friends: 4 slices equals 4/8 or exactly 1/2 of the pizza.',
        hi: 'एक सेब को 4 बराबर टुकड़ों में काटकर 2 टुकड़े खाना यानी 2/4 = 1/2 सेब खाना।'
      },
      summaryPoint: {
        ta: 'பின்னம் என்பது ஒரு முழுப் பொருளின் சமமான பாகங்களைக் குறிக்கும் துல்லிய கணிதக் குறியீடு.',
        en: 'A fraction is the mathematical representation of proportional division into equal parts.',
        hi: 'भिन्न किसी पूर्ण वस्तु के बराबर हिस्सों को व्यक्त करने का सटीक गणितीय तरीका है।'
      }
    };
  }

  // 3. Newton's Laws & Force / Motion
  if (t.includes('newton') || t.includes('force') || t.includes('motion') || t.includes('விசை') || t.includes('இயக்க') || t.includes('गति') || t.includes('बल')) {
    return {
      diagramType: 'force_motion',
      formula: 'F = m × a (விசை = நிறை × முடுக்கம் | Force = Mass × Acceleration)',
      labels: {
        ta: ['பொருளின் நிறை (Mass m in kg)', 'செலுத்தப்படும் விசை (Force F in N)', 'முடுக்கம் (Acceleration a in m/s²)', 'உராய்வு விசை (Friction)'],
        en: ['Object Mass (m in kg)', 'Applied Net Force (F in N)', 'Resulting Acceleration (a in m/s²)', 'Opposing Friction'],
        hi: ['द्रव्यमान (Mass m in kg)', 'आरोपित बल (Force F in N)', 'त्वरण (Acceleration a in m/s²)', 'घर्षण बल (Friction)']
      },
      steps: {
        ta: [
          'படி 1: பொருளின் நிறையை (kg) குறித்துக்கொள்க.',
          'படி 2: பொருளின் மீது செயல்படும் மொத்த நிகர விசையைக் (Net Force in Newton) கணக்கிடுக.',
          'படி 3: F = m × a சமன்பாட்டின் மூலம் முடுக்கத்தைக் (a = F / m) கணக்கிடுக.'
        ],
        en: [
          'Step 1: Identify the constant inertia/mass of the object in kilograms.',
          'Step 2: Measure the net unbalanced external force applied in Newtons.',
          'Step 3: Solve for acceleration using the relation a = F / m.'
        ],
        hi: [
          'चरण 1: वस्तु का द्रव्यमान (किलोग्राम में) ज्ञात करें।',
          'चरण 2: वस्तु पर लगने वाले कुल बाह्य बल (न्यूटन में) की गणना करें।',
          'चरण 3: सूत्र a = F / m का उपयोग करके त्वरण का मान निकालें।'
        ]
      },
      highlight: {
        ta: 'விசை அதிகமானால் முடுக்கம் அதிகரிக்கும்; நிறை அதிகமானால் முடுக்கம் குறையும்!',
        en: 'Acceleration is directly proportional to applied force and inversely proportional to object mass!',
        hi: 'बल बढ़ाने से त्वरण बढ़ता है, जबकि द्रव्यमान बढ़ाने से त्वरण घटता है!'
      },
      practicalExample: {
        ta: 'காலி தள்ளுவண்டியை எளிதில் தள்ளி வேகமாக ஓட்ட முடிகிறது, ஆனால் எடை நிறைந்த வண்டியைத் தள்ள அதிக விசை தேவைப்படுகிறது.',
        en: 'Pushing an empty supermarket cart accelerates rapidly with gentle force, while a loaded cart requires significantly greater push.',
        hi: 'खाली ट्रॉली को धक्का देना आसान होता है, जबकि सामान से भरी ट्रॉली को हिलाने के लिए अधिक बल चाहिए।'
      },
      summaryPoint: {
        ta: 'ஒரு பொருளின் வேக மாற்றத்திற்கு அதன் மீது செயல்படும் புற விசையே நேரடிக் காரணமாகும்.',
        en: 'Newton\'s Second Law mathematically quantifies the precise force required to change an object\'s velocity.',
        hi: 'न्यूटन का दूसरा नियम बताता है कि बल ही किसी वस्तु में गति परिवर्तन (त्वरण) उत्पन्न करता है।'
      }
    };
  }

  // 4. Solar System & Planetary Science
  if (t.includes('solar') || t.includes('planet') || t.includes('space') || t.includes('சூரிய') || t.includes('கோள்') || t.includes('सौर') || t.includes('ग्रह')) {
    return {
      diagramType: 'solar_system',
      formula: 'ஈர்ப்பு விசை (F = G(m₁m₂)/r²) & நீள்வட்ட சுற்றுப்பாதை (Elliptical Orbits)',
      labels: {
        ta: ['சூரியன் (மைய விண்மீன்)', 'உள் பாறை கோள்கள் (புதன், வெள்ளி, பூமி, செவ்வாய்)', 'வியாழன் & சனி (வாயுப் பெருங்கோள்கள்)', 'ஈர்ப்பு விசைப் பாதை'],
        en: ['Central Sun (Mass Source)', 'Terrestrial Inner Planets (Mercury, Venus, Earth, Mars)', 'Gas & Ice Giants (Jupiter, Saturn, Uranus, Neptune)', 'Gravitational Orbit Track'],
        hi: ['केंद्रीय सूर्य', 'आंतरिक चट्टानी ग्रह (बुध, शुक्र, पृथ्वी, मंगल)', 'गैसीय विशाल ग्रह (बृहस्पति, शनि)', 'गुरुत्वाकर्षण कक्षा']
      },
      steps: {
        ta: [
          'படி 1: சூரியனின் மாபெரும் நிறை உருவாக்கும் ஈர்ப்பு விசையைப் புரிந்து கொள்ளுதல்.',
          'படி 2: கோள்கள் தங்கள் குறிப்பிட்ட நீள்வட்டப் பாதைகளில் சுழல்வதைக் கவனித்தல்.',
          'படி 3: சூரியனுக்கு அருகிலுள்ள கோள்கள் வேகமாகச் சுற்றுவதையும், தொலைதூரக் கோள்கள் மெதுவாகச் சுற்றுவதையும் ஒப்பிடுதல்.'
        ],
        en: [
          'Step 1: Recognize the Sun\'s massive gravitational well as the focal anchor of planetary motion.',
          'Step 2: Observe each planet orbiting along its distinct elliptical Keplerian plane.',
          'Step 3: Contrast high orbital speeds of inner planets with the slow leisurely years of outer ice giants.'
        ],
        hi: [
          'चरण 1: सूर्य के विशाल गुरुत्वाकर्षण को समझें जो सभी ग्रहों को बांधे रखता है।',
          'चरण 2: प्रत्येक ग्रह को अपनी दीर्घवृत्ताकार कक्षा में गति करते देखें।',
          'चरण 3: सूर्य के पास वाले ग्रहों की तीव्र गति और दूर के ग्रहों की धीमी गति की तुलना करें।'
        ]
      },
      highlight: {
        ta: 'சூரியக் குடும்பத்தின் 99.8% நிறை சூரியனிடமே குவிந்துள்ளது!',
        en: 'The Sun contains over 99.8% of the total mass of our entire solar system!',
        hi: 'सौरमंडल का 99.8% से अधिक द्रव्यमान अकेले सूर्य में समाहित है!'
      },
      practicalExample: {
        ta: 'பூமி சூரியனை ஒருமுறை சுற்றி வர 365.25 நாட்கள் ஆவதால் நமக்கு வருடங்களும் பருவ காலங்களும் ஏற்படுகின்றன.',
        en: 'Earth\'s 365-day orbital revolution around the Sun creates our cyclical seasons and climate calendar.',
        hi: 'पृथ्वी के सूर्य के चारों ओर एक चक्कर पूरा करने से हमारा एक वर्ष बनता है।'
      },
      summaryPoint: {
        ta: 'சூரியக் குடும்பம் என்பது ஈர்ப்பு விசை சமநிலையால் இயங்கும் ஒரு அற்புத அண்டவெளி அமைப்பாகும்.',
        en: 'Our solar system is a beautifully balanced gravitational clockwork orbiting our mother star.',
        hi: 'हमारा सौरमंडल गुरुत्वाकर्षण बल के सटीक संतुलन पर चलने वाली एक अद्भुत खगोलीय व्यवस्था है।'
      }
    };
  }

  // 5. Cell Biology
  if (t.includes('cell') || t.includes('செல்') || t.includes('உயிரணு') || t.includes('कोशिका') || t.includes('mitochondria')) {
    return {
      diagramType: 'cell',
      formula: 'செல்லின் ஆற்றல் மையம் = மைட்டோகாண்ட்ரியா (ATP மூலக்கூறு உற்பத்தி)',
      labels: {
        ta: ['உட்கரு (Nucleus - கட்டுப்பாட்டு மையம்)', 'மைட்டோகாண்ட்ரியா (Mitochondria - ஆற்றல் உலை)', 'செல் சவ்வு (Cell Membrane - பாதுகாப்பு அரண்)', 'சைட்டோபிளாசம் (Cytoplasm)'],
        en: ['Nucleus (Genetic Control Center)', 'Mitochondria (ATP Powerhouse)', 'Cell Membrane (Selective Barrier)', 'Cytoplasm (Internal Matrix)'],
        hi: ['केंद्रक (Nucleus - नियंत्रण केंद्र)', 'माइटोकॉन्ड्रिया (पावरहाउस - ATP उत्पादक)', 'कोशिका झिल्ली (सुरक्षात्मक आवरण)', 'कोशिका द्रव्य (Cytoplasm)']
      },
      steps: {
        ta: [
          'படி 1: செல்லின் எல்லைச் சுவரான செல் சவ்வின் வழியே சத்துக்கள் உள்ளே செல்வதை அறிதல்.',
          'படி 2: உட்கருவில் உள்ள DNA கொடுக்கும் கட்டளைகளை கவனித்தல்.',
          'படி 3: மைட்டோகாண்ட்ரியா உணவை செரித்து ATP ஆற்றலாக மாற்றுவதைக் கவனித்தல்.'
        ],
        en: [
          'Step 1: Nutrients cross the selectively permeable cell membrane.',
          'Step 2: The central nucleus directs all protein synthesis via cellular instructions.',
          'Step 3: Mitochondria metabolize glucose into active ATP chemical fuel units.'
        ],
        hi: [
          'चरण 1: पोषक तत्व कोशिका झिल्ली से होकर कोशिका के अंदर प्रवेश करते हैं।',
          'चरण 2: केंद्रक (Nucleus) कोशिका की सभी जैविक गतिविधियों को नियंत्रित करता है।',
          'चरण 3: माइटोकॉन्ड्रिया भोजन को उपयोग करने योग्य रासायनिक ऊर्जा (ATP) में बदलता है।'
        ]
      },
      highlight: {
        ta: 'செல் என்பது பூமியில் உள்ள அனைத்து உயிரினங்களின் அடிப்படை கட்டமைப்பு மற்றும் செயல்பாட்டு அலகு ஆகும்!',
        en: 'The biological cell is the irreducible structural and functional unit of all living organisms!',
        hi: 'कोशिका सभी सजीव प्राणियों की सबसे छोटी संरचनात्मक और कार्यात्मक इकाई है!'
      },
      practicalExample: {
        ta: 'நமது தோலில் கீறல் விழுந்தால் செல்கள் பிரிந்து புதிய செல்களை உருவாக்கி சில நாட்களில் காயத்தை ஆற்றுகின்றன.',
        en: 'When your skin gets a scratch, healthy cells multiply via mitosis to regenerate tissue within days.',
        hi: 'चोट लगने पर कोशिकाओं का विभाजन होकर त्वचा का स्वतः ठीक हो जाना।'
      },
      summaryPoint: {
        ta: 'ஒவ்வொரு உயிரினமும் செல்களின் கூட்டு இயக்கத்தாலேயே உயிர்வாழ்கிறது.',
        en: 'All complex living vitality emerges from the harmonious biochemical machinery of single cells.',
        hi: 'सभी सजीवों का अस्तित्व कोशिकाओं के समन्वित कार्य पर निर्भर करता है।'
      }
    };
  }
  // 6. Circulatory System & Human Heart
  if (
    t.includes('heart') ||
    t.includes('circulation') ||
    t.includes('blood') ||
    t.includes('இதயம்') ||
    t.includes('இரத்த') ||
    t.includes('हृदय') ||
    t.includes('रक्त')
  ) {
    return {
      diagramType: 'heart_circulation',
      formula: 'இதயத் துடிப்பு = நிமிடத்திற்கு 70-72 முறை | இரட்டை இரத்த ஓட்டம் (Double Circulation)',
      labels: {
        ta: [
          'வலது ஏட்ரியம் (அசுத்த இரத்தம்)',
          'வலது வென்ட்ரிக்கிள்',
          'இடது ஏட்ரியம் (தூய இரத்தம்)',
          'இடது வென்ட்ரிக்கிள் (பெருந்தமனிக்கு பாய்ச்சுதல்)'
        ],
        en: [
          'Right Atrium (Deoxygenated Inflow)',
          'Right Ventricle (Pulmonary Push)',
          'Left Atrium (Oxygenated Inflow)',
          'Left Ventricle & High-Pressure Aorta'
        ],
        hi: [
          'दायां आलिंद (अशुद्ध रक्त)',
          'दायां निलय (फेफड़ों की ओर)',
          'बायां आलिंद (शुद्ध रक्त)',
          'बायां निलय (महाधमनी की ओर)'
        ]
      },
      steps: {
        ta: [
          'படி 1: உடலில் இருந்து CO₂ கலந்த அசுத்த இரத்தம் வலது இதய அறைக்கு வருகிறது.',
          'படி 2: இரத்தம் நுரையீரலுக்குச் சென்று CO₂-வை வெளியேற்றி ஆக்சிஜனைப் பெறுகிறது.',
          'படி 3: ஆக்சிஜன் நிறைந்த தூய இரத்தம் இடது வென்ட்ரிக்கிள் வழியாக உடலின் அனைத்து பாகங்களுக்கும் பீறிட்டுப் பாய்கிறது.'
        ],
        en: [
          'Step 1: Oxygen-depleted venous blood returns into the right atrium and ventricle.',
          'Step 2: The pulmonary circuit pumps blood into lungs for gas exchange to re-oxygenate.',
          'Step 3: The muscular left ventricle powers fresh oxygen-rich blood out through the aorta to all organs.'
        ],
        hi: [
          'चरण 1: शरीर से ऑक्सीजन रहित अशुद्ध रक्त दाएं आलिंद में आता है।',
          'चरण 2: रक्त फेफड़ों में जाकर कार्बन डाइऑक्साइड छोड़ता है और ताज़ा ऑक्सीजन लेता है।',
          'चरण 3: शुद्ध रक्त बाएं निलय द्वारा पूरे शरीर में मजबूती से पंप किया जाता है।'
        ]
      },
      highlight: {
        ta: 'மனித இதயம் ஒரு தசை பம்ப் ஆகும்; இது ஒரு நாளில் சுமார் ஒரு லட்சம் முறை துடிக்கிறது!',
        en: 'The human heart pumps roughly 2,000 gallons of blood every day without taking a single second of rest!',
        hi: 'मानव हृदय एक शक्तिशाली मांसपेशीय पंप है जो दिनभर में लगभग 100,000 बार धड़कता है!'
      },
      practicalExample: {
        ta: 'நாம் ஓடும்போது தசைகளுக்கு அதிக ஆக்சிஜன் தேவைப்படுவதால் இதயத் துடிப்பு இயல்பாகவே வேகமாகிறது.',
        en: 'When sprinting, your muscles signal for oxygen, causing your pulse to safely accelerate to supply extra blood.',
        hi: 'दौड़ने या व्यायाम करने पर मांसपेशियों की मांग पूरी करने के लिए दिल तेजी से धड़कने लगता है।'
      },
      summaryPoint: {
        ta: 'இரத்த ஓட்ட மண்டலம் உடலின் அனைத்து செல்களுக்கும் உயிர் வாழத் தேவையான ஆக்சிஜனையும் உணவையும் தடையின்றி வழங்குகிறது.',
        en: 'The circulatory system maintains internal homeostasis by delivering vital oxygen and clearing metabolic waste.',
        hi: 'रक्त परिसंचरण तंत्र शरीर के हर अंग तक जीवन रक्षक ऑक्सीजन और पोषक तत्व पहुंचाता है।'
      }
    };
  }
  // 7. Geometry & Angles
  if (t.includes('geometry') || t.includes('triangle') || t.includes('angle') || t.includes('வடிவியல்') || t.includes('கோணம்') || t.includes('முக்கோணம்') || t.includes('ज्यामिति') || t.includes('कोण')) {
    return {
      diagramType: 'geometry',
      formula: 'முக்கோணத்தின் பரப்பளவு = 1/2 × b × h | பிதாகரஸ்: a² + b² = c²',
      labels: {
        ta: ['அடிப்பக்கம் (Base: b)', 'செங்குத்து உயரம் (Height: h)', 'செங்கோணம் (Right Angle: 90°)', 'கர்ணம் (Hypotenuse: c)'],
        en: ['Base Dimension (b)', 'Perpendicular Altitude (h)', 'Right Angle Junction (90°)', 'Hypotenuse (c)'],
        hi: ['आधार (Base b)', 'लंब ऊंचाई (Height h)', 'समकोण (90°)', 'कर्ण (Hypotenuse c)']
      },
      steps: {
        ta: [
          'படி 1: கொடுக்கப்பட்ட உருவத்தின் அடிப்பக்கத்தையும் உயரத்தையும் அளவிட்டு குறித்துக்கொள்க.',
          'படி 2: பரப்பளவு சூத்திரத்தில் (Area = 1/2 × b × h) மதிப்புகளைப் பிரதியிடுக.',
          'படி 3: கணக்கீட்டை முடித்து சதுர அலகுகளில் (cm² அல்லது m²) விடையை எழுதுக.'
        ],
        en: [
          'Step 1: Identify baseline dimension b and perpendicular perpendicular drop h.',
          'Step 2: Substitute directly into the universal polygonal formula: Area = 1/2 * b * h.',
          'Step 3: Calculate the product and append square metric units (cm² or m²).'
        ],
        hi: [
          'चरण 1: आकृति के आधार (b) और लंबवत ऊंचाई (h) की माप ज्ञात करें।',
          'चरण 2: क्षेत्रफल के सूत्र (1/2 × आधार × ऊंचाई) में मान रखें।',
          'चरण 3: गुणा करके सही वर्ग इकाई (cm² या m²) में उत्तर लिखें।'
        ]
      },
      highlight: {
        ta: 'ஒரு முக்கோணத்தின் மூன்று கோணங்களின் கூடுதல் எப்போதும் 180° ஆகும்!',
        en: 'The interior angles of any planar Euclidean triangle always sum up to exactly 180 degrees!',
        hi: 'किसी भी त्रिभुज के तीनों अंतःकोणों का योग हमेशा 180 अंश (180°) होता है!'
      },
      practicalExample: {
        ta: 'வீட்டின் கூரைகள், பாலங்கள் மற்றும் கோபுரங்கள் முக்கோண அமைப்பில் கட்டப்படுவதால்தான் அவை வலுவாக நிற்கின்றன.',
        en: 'Engineers construct bridge trusses and roof supports as triangles because the triangle is nature\'s most rigid geometric shape.',
        hi: 'पुलों और छतों के निर्माण में त्रिभुजाकार संरचना का उपयोग किया जाता है ताकि वे सबसे अधिक मजबूत रहें।'
      },
      summaryPoint: {
        ta: 'வடிவியல் என்பது நாம் வாழும் இடங்களின் வடிவங்களையும் அளவுகளையும் துல்லியமாகக் கணக்கிட உதவும் கலை.',
        en: 'Geometry provides the mathematical blueprints for measuring and constructing physical spaces.',
        hi: 'ज्यामिति हमें भौतिक आकृतियों और दूरियों को सटीक रूप से मापने और समझने का माध्यम देती है।'
      }
    };
  }

  // 8. Chemical Bonding & Molecular Science
  if (t.includes('chemical') || t.includes('bond') || t.includes('atom') || t.includes('molecule') || t.includes('வேதியியல்') || t.includes('பிணைப்பு') || t.includes('रसायन') || t.includes('परमाणु')) {
    return {
      diagramType: 'chemical_bonding',
      formula: 'H₂ + O → H₂O (எலக்ட்ரான் பகிர்வு சகப்பிணைப்பு / Covalent Bond)',
      labels: {
        ta: ['அணுக்கரு (புரோட்டான் + நியூட்ரான்)', 'வேலன்ஸ் எலக்ட்ரான்கள் (வெளிக்கூடு)', 'பகிர்ந்துகொள்ளப்பட்ட எலக்ட்ரான் ஜோடி', 'நிலையான மூலக்கூறு'],
        en: ['Atomic Nuclei (Protons + Neutrons)', 'Outer Valence Shell Electrons', 'Shared Electron Pair Cloud', 'Stable Molecular Octet'],
        hi: ['परमाणु नाभिक', 'संयोजी इलेक्ट्रॉन (Valence Electrons)', 'साझा इलेक्ट्रॉन युग्म', 'स्थिर अणु संरचना']
      },
      steps: {
        ta: [
          'படி 1: இணையும் தனிமங்களின் வெளிக்கூட்டில் உள்ள வேலன்ஸ் எலக்ட்ரான்களைக் கணக்கிடுக.',
          'படி 2: அஷ்டக விதியை (Octet Rule) அடைய எலக்ட்ரான்களைப் பகிர்கின்றனவா அல்லது பரிமாறுகின்றனவா எனக் கவனிக்க.',
          'படி 3: உருவான வலிமையான மூலக்கூறுப் பிணைப்பை பெயரிட்டு வரைக.'
        ],
        en: [
          'Step 1: Count valence electrons in the outer energy orbitals of each reactant atom.',
          'Step 2: Observe electron sharing (covalent) or complete electron transfer (ionic) to satisfy the octet rule.',
          'Step 3: Characterize the resulting low-energy, highly stable molecular bond.'
        ],
        hi: [
          'चरण 1: प्रत्येक परमाणु की बाहरी कक्षा में उपस्थित संयोजी इलेक्ट्रॉनों की संख्या देखें।',
          'चरण 2: अष्टक नियम पूरा करने के लिए इलेक्ट्रॉनों के साझा (सहसंयोजक) या स्थानांतरण (आयनिक) का अवलोकन करें।',
          'चरण 3: स्थिर अणु बनने की प्रक्रिया को समझें।'
        ]
      },
      highlight: {
        ta: 'அணுக்கள் தங்களின் வெளிக்கூட்டில் 8 எலக்ட்ரான்களைப் பெற்று நிலையான அமைப்பை அடையவே பிணைப்பை உருவாக்குகின்றன!',
        en: 'Atoms bond to achieve low-energy electronic stability matching inert noble gases (Octet rule)!',
        hi: 'परमाणु अक्रिय गैसों जैसी स्थिरता प्राप्त करने के लिए अपनी बाहरी कक्षा में 8 इलेक्ट्रॉन पूरा करते हैं!'
      },
      practicalExample: {
        ta: 'இரண்டு ஹைட்ரஜன் அணுக்களும் ஒரு ஆக்ஸிஜன் அணுவும் எலக்ட்ரான்களைப் பகிர்ந்து கொண்டுதான் உயிர் தரும் நீரானது (H₂O) உருவாகிறது.',
        en: 'Two hydrogen atoms sharing electrons with one oxygen atom creates the liquid water (H2O) that covers our earth.',
        hi: 'हाइड्रोजन और ऑक्सीजन के बीच सहसंयोजक बंध बनने से ही पीने का पानी (H2O) तैयार होता है।'
      },
      summaryPoint: {
        ta: 'வேதியியல் பிணைப்புகளே அணுக்களை இணைத்து நாம் காணும் அனைத்து பருப்பொருட்களையும் உருவாக்குகின்றன.',
        en: 'Chemical bonds are the fundamental electrostatic glue of all matter in the universe.',
        hi: 'रासायनिक बंध ही परमाणुओं को आपस में जोड़कर दुनिया के सभी पदार्थों का निर्माण करते हैं।'
      }
    };
  }

  // 9. Electric Circuits (Default for electricity / circuits)
  if (t.includes('circuit') || t.includes('electric') || t.includes('current') || t.includes('volt') || t.includes('மின்சுற்று') || t.includes('மின்னோட்டம்') || t.includes('विद्युत')) {
    return {
      diagramType: 'circuit',
      formula: 'V = I × R (ஓம் விதி / Ohm\'s Law: மின்னழுத்தம் = மின்னோட்டம் × மின்தடை)',
      labels: {
        ta: ['மின்கலம் (Battery 9V - ஆற்றல் மூலம்)', 'சுவிட்ச் (Switch - மூடிய நிலை)', 'மின்தடை (Resistor 100Ω)', 'மின்விளக்கு (LED Indicator)'],
        en: ['DC Voltage Battery (9V)', 'Conductive Closed Switch', 'Current-Limiting Resistor (100Ω)', 'Illuminated LED Indicator'],
        hi: ['बैटरी (9V - ऊर्जा स्रोत)', 'बंद स्विच (चालक स्थिति)', 'प्रतिरोधक (100Ω)', 'प्रदीप्त बल्ब (LED)']
      },
      steps: {
        ta: [
          'படி 1: மின்கலம் கம்பியில் உள்ள எலக்ட்ரான்களுக்கு மின்னழுத்த அழுத்தத்தை (Voltage) வழங்குகிறது.',
          'படி 2: சுவிட்ச் மூடப்படும் போது தடையில்லாத முழுமையான மூடிய பாதை (Closed Loop) உருவாகிறது.',
          'படி 3: எலக்ட்ரான்கள் சீராகப் பாய்ந்து மின்விளக்கை ஒளிரச் செய்து வேலையை முடிக்கின்றன.'
        ],
        en: [
          'Step 1: Chemical energy in the battery establishes an electric potential gradient across the conductors.',
          'Step 2: Closing the switch closes the loop, allowing free conduction electrons to drift continuously.',
          'Step 3: Electron current passes through the resistive filament, dissipating energy as visible light.'
        ],
        hi: [
          'चरण 1: बैटरी तारों में इलेक्ट्रॉनों पर विद्युत दबाव (वोल्टेज) डालती है।',
          'चरण 2: स्विच बंद होने पर एक अखंड बंद परिपथ (Closed Loop) बनता है।',
          'चरण 3: इलेक्ट्रॉन धारा के प्रवाह से बल्ब जल उठता है।'
        ]
      },
      highlight: {
        ta: 'மின்சுற்று மூடியிருந்தால் மட்டுமே மின்னோட்டம் பாயும்; கம்பி அறுந்தால் உடனடியாக மின்சாரம் நின்றுவிடும்!',
        en: 'Electric current strictly requires a complete unbroken continuous loop to sustain electron flow!',
        hi: 'धारा केवल बंद परिपथ में ही बह सकती है; तार टूटने या स्विच खुलने पर प्रवाह तुरंत रुक जाता है!'
      },
      practicalExample: {
        ta: 'வீட்டில் சுவிட்சைப் போட்டதும் மின்விசிறி சுழல்வதும், விளக்கு எரிவதும் மூடிய சுற்றின் நேரடி செயல்பாடாகும்.',
        en: 'Toggling the wall switch in your bedroom instantly closes the circuit to illuminate the overhead lights.',
        hi: 'कमरे में स्विच ऑन करते ही पंखा और लाइट जल उठना बंद परिपथ का प्रत्यक्ष उदाहरण है।'
      },
      summaryPoint: {
        ta: 'மின்சுற்று என்பது எலக்ட்ரான்களின் சீரான இயக்கத்தின் மூலம் ஆற்றலைப் பயனுள்ள வேலையாக மாற்றும் அமைப்பு.',
        en: 'An electrical circuit provides the guided conduit for transferring electrical energy into active useful work.',
        hi: 'विद्युत परिपथ ऊर्जा को तारों के माध्यम से उपकरणों तक पहुंचाकर उपयोगी कार्य कराता है।'
      }
    };
  }
  // 10. Binary Search & Divide and Conquer
  if (
    t.includes('binary') ||
    t.includes('search') ||
    t.includes('பைனரி') ||
    t.includes('बाइनरी')
  ) {
    return {
      diagramType: 'concept_diagram',
      formula: 'Mid = Low + (High - Low) / 2 | Time Complexity: O(log n)',
      labels: {
        ta: ['தொடக்க எல்லை (Low)', 'நடு எண் (Mid Index)', 'முடிவு எல்லை (High)', 'தேடப்படும் எண் (Target)'],
        en: ['Low Boundary [0]', 'Mid Element [(L+H)/2]', 'High Boundary [N-1]', 'Target Search Value'],
        hi: ['प्रारंभिक सीमा (Low)', 'मध्य तत्व (Mid Index)', 'अंतिम सीमा (High)', 'लक्षित संख्या (Target)']
      },
      steps: {
        ta: [
          'படி 1: வரிசைப்படுத்தப்பட்ட பட்டியலின் Low மற்றும் High எல்லைகளைக் குறித்து நடு எண்ணை (Mid) கணக்கிடவும்.',
          'படி 2: தேடும் எண் நடு எண்ணை விட சிறியதா அல்லது பெரியதா எனப் பார்த்து ஒரு பாதியை நீக்கவும்.',
          'படி 3: மீதமுள்ள பாதியில் இதே முறையைத் தொடர்ந்து O(log n) நேரத்தில் விடையைக் கண்டறியவும்.'
        ],
        en: [
          'Step 1: Identify the Low and High boundaries of the sorted list, then calculate the Mid index.',
          'Step 2: Compare target with Mid; eliminate the half of the list where the target cannot exist.',
          'Step 3: Repeat the process on the remaining half until the target is located in O(log n) time.',
        ],
        hi: [
          'चरण 1: क्रमबद्ध सूची के Low और High छोर तय करके मध्य तत्व (Mid) की गणना करें।',
          'चरण 2: लक्षित संख्या की तुलना Mid से करें और वह आधा हिस्सा छोड़ दें जहाँ संख्या नहीं हो सकती।',
          'चरण 3: शेष आधे हिस्से पर यही प्रक्रिया दोहराकर O(log n) समय में उत्तर प्राप्त करें।',
        ],
      },
      highlight: {
        ta: 'பைனரி தேடல் (Binary Search) எப்போதும் வரிசைப்படுத்தப்பட்ட பட்டியல்களில் மட்டுமே செயல்படும்; ஒவ்வொரு படியிலும் தேடல் பாதியாகக் குறைகிறது: O(log n)!',
        en: 'Binary Search strictly requires sorted data and cuts the search space in half at every step, running in O(log n) time!',
        hi: 'बाइनरी सर्च केवल क्रमबद्ध (Sorted) डेटा पर ही काम करता है और हर चरण में खोज क्षेत्र को आधा कर देता है: O(log n)!',
      },
      practicalExample: {
        ta: 'அகராதியில் ஒரு சொல்லைத் தேடும்போது புத்தகத்தை நடுவில் திறந்து பார்த்து முன்னா பின்னா எனத் தேடுவதைப் போன்றது!',
        en: 'Opening a dictionary directly to the middle to decide whether your target word comes before or after!',
        hi: 'डिक्शनरी में कोई शब्द खोजने के लिए उसे ठीक बीच से खोलकर आगे या पीछे का पन्ना पलटने जैसा!',
      },
      summaryPoint: {
        ta: 'பைனரி தேடல் லட்சக்கணக்கான தகவல்களிலிருந்து ஒரு சில ஒப்பீடுகளிலேயே தேவையானதை துல்லியமாகக் கண்டறியும் ஆற்றல் வாய்ந்தது.',
        en: 'Binary search efficiently finds elements among millions of records in just a handful of comparisons.',
        hi: 'बाइनरी सर्च लाखों डेटा में से भी केवल कुछ ही तुलनाओं में सही परिणाम ढूंढ निकालता है।',
      },
    };
  }
  // 11. General Dynamic Concept Diagram (For Computer Science, Languages, Social, General)
  return {
    diagramType: 'concept_diagram',
    formula: topicTitle ? `${topicTitle} - Core Principles & Governing Rules` : 'உள்ளீடு (Input) → செயலாக்கம் (Core Logic) → வெளிப்பாடு (Output)',
    labels: {
      ta: topicTitle
        ? [`${topicTitle} - அடிப்படைக் கருத்து`, 'செயல்முறை வழிமுறை', 'முக்கிய பயன்பாடு', 'பயிற்சித் தேர்வு']
        : ['அடிப்படை மூலம் (Core Source)', 'தொடர்பு வழிமுறை (Mechanism / Rule)', 'செயல்முறை இயக்கம் (Processing)', 'இறுதி வெளிப்பாடு (Outcome / Output)'],
      en: topicTitle
        ? [`${topicTitle} - Core Principle`, 'Governing Mechanism', 'Practical Application', 'Target Outcome']
        : ['Foundational Source', 'Governing Mechanism / Rules', 'Active Processing State', 'Measurable Output Result'],
      hi: topicTitle
        ? [`${topicTitle} - मूल अवधारणा`, 'प्रक्रिया और नियम', 'दैनिक उपयोग', 'अंतिम परिणाम']
        : ['मूल स्रोत (Source)', 'नियम और प्रक्रिया (Mechanism)', 'सक्रिय प्रसंस्करण (Processing)', 'अंतिम परिणाम (Output)'],
    },
    steps: {
      ta: [
        `படி 1: ${topicTitle || 'பாடம்'} பாடத்தின் அடிப்படைக் கருத்தையும் முதன்மைக் கூறுகளையும் அடையாளம் காணுதல்.`,
        'படி 2: கூறுகள் ஒன்றோடொன்று எவ்வாறு இணைந்து செயல்படுகின்றன என்பதை வரிசையாகக் கவனித்தல்.',
        'படி 3: தத்துவத்தை சொந்த வார்த்தைகளிலும் நடைமுறை உதாரணங்களிலும் பொருத்திப் பார்த்தல்.',
      ],
      en: [
        `Step 1: Identify the foundational entities and key terminology of ${topicTitle || 'the subject'}.`,
        'Step 2: Trace step-by-step how the principles and interactions govern the system.',
        'Step 3: Apply the conceptual framework to real-world applications and exam problems.',
      ],
      hi: [
        `चरण 1: ${topicTitle || 'विषय'} की मूल अवधारणा और मुख्य घटकों को पहचानें।`,
        'चरण 2: घटकों के बीच के संबंध और नियमों का क्रमबद्ध अध्ययन करें।',
        'चरण 3: सीखी गई बात को दैनिक जीवन के उदाहरणों से जोड़कर समझें।',
      ],
    },
    highlight: {
      ta: `${topicTitle || 'பாடம்'} பற்றிய அடிப்படைக் கருத்துகளைத் தெளிவாகப் புரிந்துகொண்டால் கற்றல் எப்போதும் நிலைத்திருக்கும்!`,
      en: `Mastering the core principles of ${topicTitle || 'this subject'} provides a clear, lasting understanding for all applications!`,
      hi: `${topicTitle || 'विषय'} के मूल सिद्धांतों को चरणबद्ध तरीके से समझना ही स्थायी ज्ञान की कुंजी है!`,
    },
    practicalExample: {
      ta: `நமது அன்றாடப் பணிகள் மற்றும் தொழில்நுட்பச் சாதனங்கள் அனைத்திலும் ${topicTitle || 'இக்கருத்து'} முக்கிய பங்கு வகிக்கிறது.`,
      en: `${topicTitle || 'This subject'} is reflected in real-world observations and practical everyday operations.`,
      hi: `दैनिक जीवन और पाठ्यपुस्तकों में ${topicTitle || 'इसका'} महत्वपूर्ण व्यावहारिक उपयोग होता है।`,
    },
    summaryPoint: {
      ta: `${topicTitle || 'பாடம்'} பாடத்தின் முக்கிய படிநிலைகளைப் புரிந்துகொள்வதன் மூலம் எந்த ஒரு கேள்விக்கும் சுலபமாக விடையளிக்கலாம்.`,
      en: `Structured understanding of ${topicTitle || 'this topic'} demystifies complex questions into clear, intuitive building blocks.`,
      hi: `${topicTitle || 'इस विषय'} की चरणबद्ध समझ से किसी भी प्रश्न को आसानी से हल किया जा सकता है।`,
    },
  };
}
// Built-in dynamic lesson generator: creates topic-specific, class-appropriate, language-accurate lessons
export function getFallbackLesson(
  topicTitle: string,
  subject: string,
  studentClass: string,
  language: string,
  topicItem?: TopicItem
): LessonData {
  const isTamil = (language || '').toLowerCase().includes('tamil');
  const isTanglish = (language || '').toLowerCase().includes('tanglish');
  const isHindi = (language || '').toLowerCase().includes('hindi');

  // Match topic item from curriculum if not passed directly
  const matched =
    topicItem ||
    TOPICS.find(
      (t) =>
        t.title.toLowerCase() === topicTitle.toLowerCase() ||
        t.tamilTitle === topicTitle ||
        t.hindiTitle === topicTitle ||
        t.id === topicTitle.toLowerCase().replace(/\s+/g, '-')
    );

  const cfg = getTopicDomainConfig(matched?.title || topicTitle, subject);

  // Compute localized topic titles
  const topicEn = matched?.title || topicTitle;
  const topicTa = matched?.tamilTitle || topicTitle;
  const topicHi = matched?.hindiTitle || topicTitle;

  const displayTitle = isTamil && !isTanglish
    ? (matched?.tamilTitle || topicTitle)
    : isTanglish
    ? (matched ? `${topicTa} (${topicEn})` : topicTitle)
    : isHindi
    ? (matched?.hindiTitle || topicTitle)
    : topicEn;

  // 1. TAMIL / TANGLISH CURRICULUM SCENES
  if (isTamil || isTanglish) {
    return {
      title: displayTitle,
      gradeLevel: studentClass,
      subject: subject,
      language: language,
      summary: `${topicTa} பற்றி ${studentClass} வகுப்பிற்குரிய எளிய செயல்முறை விளக்கங்களுடனும் நடைமுறை உதாரணங்களுடனும் கற்கும் பாடம்.`,
      scenes: [
        {
          id: 1,
          title: `வணக்கம் & பாட அறிமுகம்: ${topicTa}`,
          conceptKey: 'அறிமுகம் & தொடக்கம் (Introduction)',
          narration: isTanglish
            ? `Hello student! Welcome to LearnBuddy! இன்றைக்கு நாம் ${studentClass} வகுப்பிற்குரிய "${topicTa}" பற்றி ரொம்ப சுவாரசியமா step-by-step படிக்க போறோம். ${cfg.practicalExample.ta} என்பதை கவனித்திருக்கிறீர்களா? வாருங்கள், இதன் பின்னணியில் உள்ள அறிவியலை நேரடியாக ஆராய்வோம்!`
            : `வணக்கம் மாணவரே! LearnBuddy-க்கு அன்புடன் வரவேற்கிறேன். இன்று நாம் ${studentClass} வகுப்பிற்குரிய "${topicTa}" என்ற முக்கியமான பாடத்தை எளிய முறையில் கற்கப் போகிறோம். ${cfg.practicalExample.ta} வாருங்கள், இதன் அடிப்படைகளை கவனமாகப் புரிந்துகொள்வோம்!`,
          durationSeconds: 18,
          teacherEmotion: 'welcoming',
          visualType: 'diagram',
          visualData: {
            headline: `${topicTa} - பாடம் அறிமுகம்`,
            diagramType: cfg.diagramType,
            labels: cfg.labels.ta.slice(0, 3),
            steps: ['அறிமுகம் மற்றும் நோக்கம்', 'முக்கிய கூறுகள்', 'நடைமுறை பயன்பாடு'],
            highlight: cfg.highlight.ta,
            practicalExample: cfg.practicalExample.ta,
          },
        },
        {
          id: 2,
          title: 'அடிப்படைக் கோட்பாடு & முக்கிய உறுப்புகள்',
          conceptKey: 'அடிப்படைக் கருத்து (Core Concept)',
          narration: isTanglish
            ? `முதல்ல இதன் basic principle மற்றும் labeled parts புரிஞ்சிக்கலாம். திரையில் உள்ள வரைபடத்தை பாருங்க: ${cfg.labels.ta.slice(0, 3).join(', ')}. ${cfg.highlight.ta} இந்த உறுப்புகள் ஒவ்வொன்றும் எப்படி ஒன்றோடொன்று connect ஆகி work பண்ணுதுன்னு தொடர்ந்து பார்ப்போம்!`
            : `முதலாவதாக இதன் அடிப்படைக் கோட்பாட்டையும் முதன்மைக் கூறுகளையும் புரிந்து கொள்வோம். திரையில் உள்ள விளக்கப் படத்தைக் கவனியுங்கள்: ${cfg.labels.ta.slice(0, 3).join(', ')}. ${cfg.highlight.ta} இந்த கூறுகள் அனைத்தும் இணைந்து செயல்படும் விதத்தை அடுத்த படியில் தெளிவாகக் காண்போம்.`,
          durationSeconds: 20,
          teacherEmotion: 'explaining',
          visualType: 'diagram',
          visualData: {
            headline: 'கருத்து வரைபடம் & உறுப்புகள்',
            diagramType: cfg.diagramType,
            labels: cfg.labels.ta,
            steps: cfg.steps.ta,
            highlight: cfg.highlight.ta,
            practicalExample: cfg.practicalExample.ta,
          },
        },
        {
          id: 3,
          title: 'நேரடி ஊடாடும் செயல்முறை விளக்கம்',
          conceptKey: 'செயல்முறை மாதிரி (Demonstration)',
          narration: isTanglish
            ? `இப்போ ஒரு practical simulation பார்க்கலாம்! ${cfg.steps.ta.join(' பின்னர் ')}. அனைத்து உறுப்புகளும் சரியாக இணையும் போது செயல்முறை smooth-ஆ நடக்குது. Dynamic flow எப்படி இயங்குதுன்னு கவனிங்க!`
            : `இப்போது ஒரு நேரடி ஊடாடும் செயல்முறை மாதிரியைப் பார்ப்போம். ${cfg.steps.ta.join(' பின்னர் ')}. அனைத்துக் கூறுகளும் சரியாக இணையும் போது செயல்முறை தடையின்றி எவ்வாறு நிகழ்கிறது என்று திரையில் உள்ள இயங்குபடத்தில் பாருங்கள்!`,
          durationSeconds: 22,
          teacherEmotion: 'demonstrating',
          visualType: 'interactive_simulation',
          visualData: {
            headline: 'ஊடாடும் செயல்முறை மாதிரி (Interactive Simulation)',
            diagramType: cfg.diagramType,
            labels: cfg.labels.ta,
            steps: cfg.steps.ta,
            highlight: cfg.highlight.ta,
            practicalExample: cfg.practicalExample.ta,
          },
        },
        {
          id: 4,
          title: 'முக்கிய சூத்திரம், விதிகள் & கணக்கீடு',
          conceptKey: 'சூத்திரம் & தீர்வு (Formula & Steps)',
          narration: isTanglish
            ? `Exam-ல நல்ல mark வாங்க இந்த key formula மற்றும் விதி ரொம்ப முக்கியம்: ${cfg.formula || cfg.highlight.ta}. ${cfg.highlight.ta} கொடுக்கப்பட்ட அளவுகளை வைத்து step-by-step apply பண்ணி சரியான அலகுகளுடன் விடை காண பழகிக்கலாம்!`
            : `தேர்வில் முழு மதிப்பெண் பெற இந்த முக்கிய சூத்திரத்தையும் விதிகளையும் நினைவில் கொள்ள வேண்டும்: ${cfg.formula || cfg.highlight.ta}. ${cfg.highlight.ta} கொடுக்கப்பட்ட அளவுகளை இந்த விதிகளில் பிரதியிட்டு படிப்படியாக தீர்வு காண்போம்.`,
          durationSeconds: 20,
          teacherEmotion: 'explaining',
          visualType: 'step_calculation',
          visualData: {
            headline: 'முக்கிய சூத்திரம் & மாதிரி தீர்வு',
            diagramType: cfg.diagramType,
            formula: cfg.formula,
            labels: cfg.labels.ta.slice(0, 3),
            steps: cfg.steps.ta,
            highlight: cfg.highlight.ta,
            practicalExample: cfg.practicalExample.ta,
          },
        },
        {
          id: 5,
          title: 'பாடச் சுருக்கம் & Teach-Back தயாரிப்பு',
          conceptKey: 'பாடச் சுருக்கம் (Summary)',
          narration: isTanglish
            ? `Super! நாம ${topicTa} பற்றிய எல்லா முக்கியமான points-ஐயும் வெற்றிகரமா படிச்சாச்சு. ${cfg.summaryPoint.ta}. இப்போ திரையில் உள்ள படிகளை நிதானமா review பண்ணிட்டு, நீங்கள் கத்துக்கிட்டதை உங்க சொந்த வார்த்தைகள்ல எனக்கு Teach-Back பண்ண தயாரா?`
            : `மிக நன்று! நாம் இன்றைய பாடத்தின் (${topicTa}) அனைத்து முக்கிய கருத்துகளையும் முழுமையாகக் கற்று முடித்துவிட்டோம். ${cfg.summaryPoint.ta}. இப்பாடப் படிகளை முழுமையாகப் படித்து முடித்ததும், உங்கள் சொந்த வார்த்தைகளில் எனக்கு விளக்க Teach-Back பொத்தானைச் சொடுக்குங்கள்!`,
          durationSeconds: 18,
          teacherEmotion: 'celebrating',
          visualType: 'diagram',
          visualData: {
            headline: 'பாடச் சுருக்கம் & மீள்பார்வை',
            diagramType: cfg.diagramType,
            labels: cfg.labels.ta.slice(0, 3),
            steps: ['முக்கிய கூறுகளை நினைவில் நிறுத்துக', 'சொந்த வார்த்தைகளில் விவரிக்கத் தயாராகுங்கள்'],
            highlight: cfg.summaryPoint.ta,
            practicalExample: 'சுயமாக மற்றவர்களுக்கு கற்பிப்பதே ஒரு பாடத்தின் ஆழமான புரிதலை உறுதி செய்யும் சிறந்த வழியாகும்!',
          },
        },
      ],
    };
  }

  // 2. HINDI CURRICULUM SCENES
  if (isHindi) {
    return {
      title: displayTitle,
      gradeLevel: studentClass,
      subject: subject,
      language: language,
      summary: `${topicHi} पर आधारित ${studentClass} के लिए एक संपूर्ण, रोचक और संवादात्मक पाठ।`,
      scenes: [
        {
          id: 1,
          title: `स्वागत और विषय परिचय: ${topicHi}`,
          conceptKey: 'परिचय (Introduction)',
          narration: `नमस्ते छात्र! LearnBuddy में आपका हार्दिक स्वागत है। आज हम ${studentClass} के अंतर्गत "${topicHi}" को बहुत ही सरल और रोचक तरीके से सीखेंगे। ${cfg.practicalExample.hi} आइए इसे विस्तार से समझें!`,
          durationSeconds: 18,
          teacherEmotion: 'welcoming',
          visualType: 'diagram',
          visualData: {
            headline: `${topicHi} - परिचय`,
            diagramType: cfg.diagramType,
            labels: cfg.labels.hi.slice(0, 3),
            steps: ['उद्देश्य और परिचय', 'मुख्य घटक', 'दैनिक उपयोग'],
            highlight: cfg.highlight.hi,
            practicalExample: cfg.practicalExample.hi,
          },
        },
        {
          id: 2,
          title: 'मूल सिद्धांत और मुख्य घटक',
          conceptKey: 'मुख्य अवधारणा (Core Concept)',
          narration: `आइए सबसे पहले इसके मूल सिद्धांतों और मुख्य घटकों को समझें: ${cfg.labels.hi.slice(0, 3).join(', ')}। ${cfg.highlight.hi} स्क्रीन पर दिए गए चित्र को ध्यान से देखिए कि ये घटक कैसे कार्य करते हैं।`,
          durationSeconds: 20,
          teacherEmotion: 'explaining',
          visualType: 'diagram',
          visualData: {
            headline: 'अवधारणा आरेख और घटक',
            diagramType: cfg.diagramType,
            labels: cfg.labels.hi,
            steps: cfg.steps.hi,
            highlight: cfg.highlight.hi,
            practicalExample: cfg.practicalExample.hi,
          },
        },
        {
          id: 3,
          title: 'व्यावहारिक सिमुलेशन प्रदर्शन',
          conceptKey: 'प्रदर्शन (Demonstration)',
          narration: `अब इस व्यावहारिक सिमुलेशन को देखें। ${cfg.steps.hi.join(' इसके बाद, ')}। जब सभी तत्व सही तरीके से जुड़ते हैं, तो पूरी प्रक्रिया सुचारू रूप से कार्य करती है।`,
          durationSeconds: 22,
          teacherEmotion: 'demonstrating',
          visualType: 'interactive_simulation',
          visualData: {
            headline: 'इंटरएक्टिव सिमुलेशन',
            diagramType: cfg.diagramType,
            labels: cfg.labels.hi,
            steps: cfg.steps.hi,
            highlight: cfg.highlight.hi,
            practicalExample: cfg.practicalExample.hi,
          },
        },
        {
          id: 4,
          title: 'क्रमबद्ध सूत्र और गणना',
          conceptKey: 'सूत्र और हल (Formula & Steps)',
          narration: `परीक्षा में अच्छे अंक प्राप्त करने के लिए यह मुख्य सूत्र बहुत महत्वपूर्ण है: ${cfg.formula || cfg.highlight.hi}। ${cfg.highlight.hi} आइए इसे चरणबद्ध तरीके से समझें और सही इकाई के साथ हल करें।`,
          durationSeconds: 20,
          teacherEmotion: 'explaining',
          visualType: 'step_calculation',
          visualData: {
            headline: 'महत्वपूर्ण सूत्र और हल',
            diagramType: cfg.diagramType,
            formula: cfg.formula,
            labels: cfg.labels.hi.slice(0, 3),
            steps: cfg.steps.hi,
            highlight: cfg.highlight.hi,
            practicalExample: cfg.practicalExample.hi,
          },
        },
        {
          id: 5,
          title: 'पाठ सारांश और Teach-Back तैयारी',
          conceptKey: 'सारांश (Summary)',
          narration: `बहुत बढ़िया! आपने ${topicHi} के सभी मुख्य बिंदुओं को समझ लिया है: ${cfg.summaryPoint.hi}। स्क्रीन पर दिए गए बिंदुओं को शांति से पढ़ें और जब तैयार हों, तो Teach-Back बटन दबाकर अपने शब्दों में समझाएं!`,
          durationSeconds: 18,
          teacherEmotion: 'celebrating',
          visualType: 'diagram',
          visualData: {
            headline: 'पाठ सारांश और समीक्षा',
            diagramType: cfg.diagramType,
            labels: cfg.labels.hi.slice(0, 3),
            steps: ['मुख्य बातें याद रखें', 'अपने शब्दों में समझाने की तैयारी करें'],
            highlight: cfg.summaryPoint.hi,
            practicalExample: cfg.practicalExample.hi,
          },
        },
      ],
    };
  }

  // 3. STANDARD ENGLISH CURRICULUM SCENES
  return {
    title: topicEn,
    gradeLevel: studentClass,
    subject: subject,
    language: 'English',
    summary: `A personalized, visual, step-by-step lesson on ${topicEn} tailored for ${studentClass}.`,
    scenes: [
      {
        id: 1,
        title: `Welcome & Introduction: ${topicEn}`,
        conceptKey: 'Introduction & Real-World Hook',
        narration: `Hello and welcome to LearnBuddy! I am your AI teacher today, and we are going to explore "${topicEn}" for ${studentClass}. Have you ever wondered about this? ${cfg.practicalExample.en}. Let us dive into the fundamentals together!`,
        durationSeconds: 18,
        teacherEmotion: 'welcoming',
        visualType: 'diagram',
        visualData: {
          headline: `Understanding ${topicEn}`,
          diagramType: cfg.diagramType,
          labels: cfg.labels.en.slice(0, 3),
          steps: ['Observation', 'Questioning', 'Discovery'],
          highlight: cfg.highlight.en,
          practicalExample: cfg.practicalExample.en,
        },
      },
      {
        id: 2,
        title: 'Core Principles & Component Architecture',
        conceptKey: 'Fundamental Principles',
        narration: `Let us break down the fundamental rules and labeled components step by step: ${cfg.labels.en.slice(0, 3).join(', ')}. ${cfg.highlight.en} Notice how each part interacts with the other to make the whole system function.`,
        durationSeconds: 20,
        teacherEmotion: 'explaining',
        visualType: 'diagram',
        visualData: {
          headline: 'System Architecture & Labeled Components',
          diagramType: cfg.diagramType,
          labels: cfg.labels.en,
          steps: cfg.steps.en,
          highlight: cfg.highlight.en,
          practicalExample: cfg.practicalExample.en,
        },
      },
      {
        id: 3,
        title: 'Live Interactive Demonstration',
        conceptKey: 'Practical Demonstration',
        narration: `Now watch this practical demonstration. ${cfg.steps.en.join(' Next, ')}. When all conditions are met, the entire process flows smoothly. Notice the dynamic stream on your screen!`,
        durationSeconds: 22,
        teacherEmotion: 'demonstrating',
        visualType: 'interactive_simulation',
        visualData: {
          headline: 'Live Interactive Demonstration',
          diagramType: cfg.diagramType,
          labels: cfg.labels.en,
          steps: cfg.steps.en,
          highlight: cfg.highlight.en,
          practicalExample: cfg.practicalExample.en,
        },
      },
      {
        id: 4,
        title: 'Step-by-Step Formula & Calculation',
        conceptKey: 'Mathematical Rule & Application',
        narration: `Here is the essential formula and principle you need for your exams: ${cfg.formula || cfg.highlight.en}. ${cfg.highlight.en} Let us apply the steps carefully to solve problems with correct units!`,
        durationSeconds: 20,
        teacherEmotion: 'explaining',
        visualType: 'step_calculation',
        visualData: {
          headline: 'Formula Application & Step Solution',
          diagramType: cfg.diagramType,
          formula: cfg.formula,
          labels: cfg.labels.en.slice(0, 3),
          steps: cfg.steps.en,
          highlight: cfg.highlight.en,
          practicalExample: cfg.practicalExample.en,
        },
      },
      {
        id: 5,
        title: 'Summary Takeaways & Teach-Back Prep',
        conceptKey: 'Lesson Summary',
        narration: `Outstanding work! You have mastered the core principles of ${topicEn}. ${cfg.summaryPoint.en}. Take a moment to review the steps, and when you are ready, click "Start Teach-Back Session" to teach me what you learned!`,
        durationSeconds: 18,
        teacherEmotion: 'celebrating',
        visualType: 'diagram',
        visualData: {
          headline: 'Key Takeaways & Teach-Back Preparation',
          diagramType: cfg.diagramType,
          labels: cfg.labels.en.slice(0, 3),
          steps: ['Synthesize concepts', 'Express in your own words'],
          highlight: cfg.summaryPoint.en,
          practicalExample: 'Teaching someone else is the ultimate test of true understanding!',
        },
      },
    ],
  };
}

export function getFallbackNotes(topicTitle: string, subject: string, studentClass: string, language: string): NotesData {
  const isTamil = (language || '').toLowerCase().includes('tamil');
  const isHindi = (language || '').toLowerCase().includes('hindi');
  const cfg = getTopicDomainConfig(topicTitle, subject);

  if (isTamil) {
    return {
      topicTitle: topicTitle,
      gradeLevel: studentClass,
      subject: subject,
      simpleDefinition: `${topicTitle} என்பது ${subject} பாடத்தில் ${studentClass} மாணவர்களுக்கான முக்கிய அடிப்படை பாடக் கருத்து ஆகும். ${cfg.highlight.ta}`,
      mainConcepts: [
        {
          title: 'அடிப்படை தத்துவம் (Core Principle)',
          explanation: `பாடத்தின் முக்கிய விதிகளும் கூறுகளும்: ${cfg.labels.ta.join(', ')}.`,
          example: cfg.practicalExample.ta,
        },
        {
          title: 'முக்கிய விதி & சமன்பாடு (Key Rule & Formula)',
          explanation: `இப்பாடத்தில் நினைவில் கொள்ள வேண்டிய முக்கிய தொடர்பு: ${cfg.formula}.`,
          example: cfg.summaryPoint.ta,
        },
        {
          title: 'நடைமுறை பயன்பாடு (Everyday Application)',
          explanation: cfg.practicalExample.ta,
          example: 'அன்றாட வாழ்வில் நமது கூர்ந்து கவனிக்கும் பழக்கம் இதனை எளிதில் புரிந்துகொள்ள உதவும்.',
        },
      ],
      stepStepExplanation: cfg.steps.ta,
      stepByStepExplanation: cfg.steps.ta,
      importantTerms: cfg.labels.ta.map((l) => ({
        term: l.split('(')[0].trim(),
        meaning: l.includes('(') ? l.split('(')[1].replace(')', '').trim() : 'முக்கிய அறிவியல் கூறு',
      })),
      formulasAndRules: [
        {
          rule: 'அடிப்படை சூத்திரம் / சமன்பாடு',
          explanation: cfg.formula,
          workedExample: cfg.highlight.ta,
        },
      ],
      practicalEverydayExamples: [
        cfg.practicalExample.ta,
        'வகுப்பறை சோதனைகள் மற்றும் அன்றாட அறிவியல் நிகழ்வுகளில் இதன் பயன்பாடு.',
        'தேர்வுக்கான முக்கிய வினாக்களில் இதன் வரைபடமும் சமன்பாடும் கேட்கப்படும்.',
      ],
      revisionPoints: [
        cfg.highlight.ta,
        `முக்கிய சூத்திரம்: ${cfg.formula}`,
        'விளக்கப் படத்தின் அனைத்து பாகங்களையும் வரைந்து பயிற்சி செய்க.',
      ],
      shortSummary: `${topicTitle}: ${cfg.summaryPoint.ta}`,
      personalizedFocusNote: `மிகச் சிறப்பு! ${cfg.highlight.ta}`,
      practiceQuestions: [
        {
          question: `${topicTitle} பாடத்தின் முக்கிய விதி அல்லது சூத்திரம் என்ன?`,
          answer: cfg.formula,
          hint: 'பாடக் குறிப்புகளில் கொடுக்கப்பட்டுள்ள சூத்திரத்தைப் பார்க்கவும்.',
        },
        {
          question: `${topicTitle} நமது அன்றாட வாழ்வில் எங்கு பயன்படுகிறது?`,
          answer: cfg.practicalExample.ta,
          hint: 'நடைமுறை வாழ்க்கை உதாரணத்தை நினைவுகூர்க.',
        },
        {
          question: 'இப்பாடத்தின் வரைபடத்தில் உள்ள முக்கிய கூறுகள் யாவை?',
          answer: cfg.labels.ta.join(', '),
          hint: 'விளக்கப் படத்தின் பெயரிடப்பட்ட பாகங்கள்.',
        },
      ],
    };
  }

  if (isHindi) {
    return {
      topicTitle: topicTitle,
      gradeLevel: studentClass,
      subject: subject,
      simpleDefinition: `${topicTitle} एक महत्वपूर्ण वैज्ञानिक अवधारणा है जो समझाती है कि विभिन्न घटक मिलकर ऊर्जा और कार्य कैसे उत्पन्न करते हैं।`,
      mainConcepts: [
        {
          title: 'मूल सिद्धांत (Core Foundation)',
          explanation: 'प्रत्येक प्रणाली में ऊर्जा का स्रोत, प्रवाह का मार्ग और कार्य करने वाला उपकरण होता है।',
          example: 'जैसे पाइप में बहता पानी टरबाइन को घुमाता है।',
        },
        {
          title: 'बंद परिपथ का नियम (Continuity)',
          explanation: 'ऊर्जा के निरंतर प्रवाह के लिए मार्ग का पूर्ण और अखंड होना आवश्यक है।',
          example: 'स्विच ऑन करने पर बल्ब जलता है।',
        },
      ],
      stepStepExplanation: [
        'चरण 1: ऊर्जा स्रोत की पहचान करें।',
        'चरण 2: प्रवाह के मार्ग का निरीक्षण करें।',
        'चरण 3: प्रतिरोध का मान ज्ञात करें।',
        'चरण 4: सूत्र द्वारा सही उत्तर निकालें।',
      ],
      stepByStepExplanation: [
        'चरण 1: ऊर्जा स्रोत की पहचान करें।',
        'चरण 2: प्रवाह के मार्ग का निरीक्षण करें।',
        'चरण 3: प्रतिरोध का मान ज्ञात करें।',
        'चरण 4: सूत्र द्वारा सही उत्तर निकालें।',
      ],
      importantTerms: [
        { term: 'परिपथ (Circuit)', meaning: 'ऊर्जा प्रवाह का बंद मार्ग।' },
        { term: 'वोल्टेज (Voltage)', meaning: 'धारा को प्रवाहित करने वाला बल।' },
        { term: 'प्रतिरोध (Resistance)', meaning: 'प्रवाह में रुकावट डालने वाला गुण।' },
      ],
      formulasAndRules: [
        {
          rule: 'ओम का नियम (Ohm\'s Law)',
          explanation: 'V = I × R (वोल्टेज = धारा × प्रतिरोध)',
          workedExample: 'यदि V = 12V और R = 3Ω है, तो I = 12 / 3 = 4 एम्पीयर (A)।',
        },
      ],
      practicalEverydayExamples: [
        'घर में स्विच दबाकर पंखा या लाइट चलाना।',
        'मोबाइल फोन की बैटरी को चार्ज करना।',
      ],
      revisionPoints: [
        'हमेशा जांचें कि परिपथ खुला है या बंद।',
        'प्रत्येक उत्तर में सही मात्रक (SI Units) अवश्य लिखें।',
      ],
      shortSummary: `${topicTitle} हमें सिखाता है कि वैज्ञानिक प्रणालियां नियमों और सूत्रों के अनुसार संतुलित रूप से कार्य करती हैं।`,
      personalizedFocusNote: `शाबाश! परिपथ की निरंतरता को हमेशा याद रखें।`,
      practiceQuestions: [
        {
          question: 'यदि परिपथ टूट जाए तो क्या होगा?',
          answer: 'धारा का प्रवाह तुरंत बंद हो जाएगा।',
          hint: 'स्विच ऑफ करने की स्थिति सोचें।',
        },
        {
          question: 'परिपथ के तीन प्रमुख भाग कौन से हैं?',
          answer: 'स्रोत (बैटरी), चालक (तार), और भार (बल्ब)।',
          hint: 'बैटरी, तार और बल्ब।',
        },
      ],
    };
  }

  return {
    topicTitle: topicTitle,
    gradeLevel: studentClass,
    subject: subject,
    simpleDefinition: `${topicTitle} is a fundamental concept in ${subject} explaining how interconnected elements interact to produce measurable effects in our physical world.`,
    mainConcepts: [
      {
        title: 'Core Foundation',
        explanation: 'Every system has an input source, a transmission pathway, and a destination where useful work is accomplished.',
        example: 'Like water flowing through pipes to turn a turbine.',
      },
      {
        title: 'Closed Continuity Principle',
        explanation: 'For any dynamic flow (electricity, blood circulation, water cycles) to maintain stability, continuity must be preserved without interruptions.',
        example: 'A closed switch allows current to complete its circuit.',
      },
      {
        title: 'Cause and Effect Relationship',
        explanation: 'Changing an input parameter directly alters the observed output according to universal mathematical laws.',
        example: 'Doubling the applied force doubles the acceleration of an object.',
      },
    ],
    stepStepExplanation: [
      'Step 1: Identify the primary source supplying energy or materials.',
      'Step 2: Trace the conduit or medium carrying the flow.',
      'Step 3: Measure resistance or opposing forces in the pathway.',
      'Step 4: Calculate the resulting work output using standard formulas.',
    ],
    stepByStepExplanation: [
      'Step 1: Identify the primary source supplying energy or materials.',
      'Step 2: Trace the conduit or medium carrying the flow.',
      'Step 3: Measure resistance or opposing forces in the pathway.',
      'Step 4: Calculate the resulting work output using standard formulas.',
    ],
    importantTerms: [
      { term: 'Continuity', meaning: 'The state of an unbroken, continuous loop or sequence.' },
      { term: 'Equilibrium', meaning: 'A balanced state where opposing forces or rates cancel out.' },
      { term: 'Efficiency', meaning: 'The ratio of useful output energy to total input energy.' },
    ],
    formulasAndRules: [
      {
        rule: 'Standard Governing Equation',
        explanation: 'Relates applied potential to flow rate and impedance.',
        workedExample: 'Given Source = 12V, Resistance = 4Ω. Flow Rate = 12 / 4 = 3 Amperes.',
      },
    ],
    practicalEverydayExamples: [
      'Switching on ceiling fans and room lights at home.',
      'How water rises from roots to leaves in garden plants.',
      'Bicycle gears and pedals transferring kinetic energy to wheels.',
    ],
    revisionPoints: [
      'Always verify whether the system is open or closed before analyzing.',
      'Keep track of standard SI units in every calculation.',
      'Review the labeled diagrams before examinations for fast recall.',
    ],
    shortSummary: `${topicTitle} teaches us that nature and technology operate through balanced cycles and directional flows. Understanding the core equations enables us to predict behavior accurately.`,
    personalizedFocusNote: `Great job on your teach-back explanation! Make sure to remember that continuity is essential—whenever a pathway breaks, the entire cycle pauses.`,
    practiceQuestions: [
      {
        question: 'What happens when the pathway is interrupted or opened?',
        answer: 'The flow ceases immediately because continuity is broken.',
        hint: 'Think of what happens when you flip a light switch to OFF.',
      },
      {
        question: 'Name the three essential components needed for this process.',
        answer: 'Source (energy provider), Path (connecting medium), and Load (device doing work).',
        hint: 'Think of battery, wire, and bulb.',
      },
      {
        question: 'Why is it important to write the correct units in your solution?',
        answer: 'Units give physical meaning to numbers and prevent costly scientific errors.',
        hint: 'A number alone does not tell whether it is meters, seconds, or amperes.',
      },
    ],
  };
}

export function getFallbackGame(topicTitle: string, studentClass: string, language: string): GameData {
  const isTamil = (language || '').toLowerCase().includes('tamil');
  const isHindi = (language || '').toLowerCase().includes('hindi');
  const cfg = getTopicDomainConfig(topicTitle, '');

  if (isTamil) {
    return {
      gameTitle: `வினாடி வினா சவால்: ${topicTitle}`,
      instructions: 'உங்கள் புரிதலைச் சோதிக்கவும்! சரியான விடைகளைத் தேர்ந்தெடுத்து அதிக மதிப்பெண் பெறுங்கள்.',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: `${topicTitle} பாடத்தின் முக்கிய சமன்பாடு அல்லது விதி எது?`,
          options: shuffleArray([
            cfg.formula,
            'அளவு = 0 (மதிப்பற்றது)',
            'ஆற்றல் = முடிவிலி',
            'விதி = பொருந்தாது',
          ]),
          correctAnswer: cfg.formula,
          explanation: `இப்பாடத்தின் அடிப்படை தொடர்பானது: ${cfg.formula}`,
          hint: 'பாடக் குறிப்புகளில் உள்ள முக்கிய சமன்பாட்டைக் கவனியுங்கள்.',
        },
        {
          id: 'q2',
          type: 'mcq',
          question: `${topicTitle} பற்றிய மிகச் சரியான அறிவியல் உண்மை எது?`,
          options: shuffleArray([
            cfg.highlight.ta,
            'இப்பாடக் கருத்து அன்றாட வாழ்வில் பயன்படுவதில்லை',
            'இதற்கு எந்த ஒரு வரைபடமும் விதிகளும் தேவையில்லை',
            'எந்த விதியும் இல்லாமல் தானாக நிகழும்',
          ]),
          correctAnswer: cfg.highlight.ta,
          explanation: cfg.highlight.ta,
          hint: 'முக்கிய அறிவியல் கருத்தை நினைவுகூர்க.',
        },
        {
          id: 'q3',
          type: 'match',
          question: 'ஒவ்வொரு கூறுகளையும் அதன் செயல்பாட்டுடன் இணைக்கவும்:',
          pairs: [
            { left: cfg.labels.ta[0] || 'முக்கிய கூறு 1', right: 'ஆற்றல் மற்றும் செயல்பாட்டின் தொடக்க நிலை' },
            { left: cfg.labels.ta[1] || 'முக்கிய கூறு 2', right: 'இணைப்பு மற்றும் கடத்தும் பாதை' },
            { left: cfg.labels.ta[2] || 'முக்கிய கூறு 3', right: 'வெளிப்பாடு மற்றும் இறுதிப் பயன்' },
          ],
          explanation: 'ஒவ்வொரு கூறுகளும் இப்பாடத்தில் தனித்துவமான இன்றியமையாத பங்கினை ஆற்றுகின்றன.',
          hint: 'விளக்கப் படத்தின் பெயரிடப்பட்ட பாகங்களை இணையுங்கள்.',
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'கீழ்க்கண்டவற்றில் இப்பாடக் கருத்திற்கு மிகவும் பொருத்தமான நடைமுறை உதாரணம் எது?',
          options: shuffleArray([
            cfg.practicalExample.ta,
            'தொடர்பில்லாத உடைந்த பொருள்',
            'விளக்கமில்லாத வெறும் காகிதம்',
            'எந்த விதிகளும் இல்லாத செயல்',
          ]),
          correctAnswer: cfg.practicalExample.ta,
          explanation: cfg.practicalExample.ta,
          hint: 'பாடத்தின் நடைமுறை வாழ்க்கை உதாரணத்தை நினைவுகூர்க.',
        },
      ],
    };
  }

  if (isHindi) {
    return {
      gameTitle: `क्विज़ चुनौती: ${topicTitle}`,
      instructions: 'अपनी समझ का परीक्षण करें! सही उत्तर चुनें और ज्ञान बढ़ाएं।',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: `${topicTitle} से संबंधित मुख्य सूत्र या वैज्ञानिक नियम कौन सा है?`,
          options: shuffleArray([
            cfg.formula,
            'मान = 0 (शून्य)',
            'ऊर्जा = अनंत',
            'नियम = लागू नहीं होता',
          ]),
          correctAnswer: cfg.formula,
          explanation: `इस पाठ का मुख्य सिद्धांत / सूत्र है: ${cfg.formula}`,
          hint: 'पाठ के मुख्य सूत्र को याद करें।',
        },
        {
          id: 'q2',
          type: 'mcq',
          question: `${topicTitle} के बारे में सबसे सटीक वैज्ञानिक तथ्य क्या है?`,
          options: shuffleArray([
            cfg.highlight.hi,
            'इस अवधारणा का दैनिक जीवन में कोई उपयोग नहीं है',
            'इसके लिए किसी नियम या प्रक्रिया की आवश्यकता नहीं है',
            'यह बिना किसी कारण के स्वतः हो जाता है',
          ]),
          correctAnswer: cfg.highlight.hi,
          explanation: cfg.highlight.hi,
          hint: 'पाठ की मुख्य अवधारणा को याद करें।',
        },
        {
          id: 'q3',
          type: 'match',
          question: 'प्रत्येक घटक को उसके सही कार्य या भूमिका से सुमेलित करें:',
          pairs: [
            { left: cfg.labels.hi[0] || 'घटक 1', right: 'प्राथमिक अवस्था / मुख्य ऊर्जा स्रोत' },
            { left: cfg.labels.hi[1] || 'घटक 2', right: 'प्रक्रियात्मक मार्ग और संचालन' },
            { left: cfg.labels.hi[2] || 'घटक 3', right: 'अंतिम उत्पाद और परिणाम' },
          ],
          explanation: 'सभी घटक मिलकर इस पाठ की प्रक्रिया को पूरा करते हैं।',
          hint: 'आरेख के मुख्य भागों पर विचार करें।',
        },
        {
          id: 'q4',
          type: 'mcq',
          question: `दैनिक जीवन में ${topicTitle} का सबसे सटीक व्यावहारिक उदाहरण कौन सा है?`,
          options: shuffleArray([
            cfg.practicalExample.hi,
            'अप्रासंगिक टूटी हुई वस्तु',
            'बिना काम का खाली कागज',
            'बिना नियम की मनमानी क्रिया',
          ]),
          correctAnswer: cfg.practicalExample.hi,
          explanation: cfg.practicalExample.hi,
          hint: 'पाठ के दैनिक जीवन के उदाहरण को याद करें।',
        },
      ],
    };
  }

  return {
    gameTitle: `Quiz Challenge: ${topicTitle}`,
    instructions: 'Test your understanding! Pick the right answers and master the concepts.',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: `What is the primary formula, equation, or governing rule for ${topicTitle}?`,
        options: shuffleArray([
          cfg.formula,
          'Value = 0 (undefined)',
          'Energy = Infinity',
          'Rule = Not applicable',
        ]),
        correctAnswer: cfg.formula,
        explanation: `The foundational formula or governing rule is: ${cfg.formula}`,
        hint: 'Review the formula shown in your lesson notes.',
      },
      {
        id: 'q2',
        type: 'mcq',
        question: `Which of the following is the most scientifically accurate statement regarding ${topicTitle}?`,
        options: shuffleArray([
          cfg.highlight.en,
          'This concept has no practical application in the real world',
          'No mathematical or physical laws apply to this phenomenon',
          'It operates randomly without any governing principles',
        ]),
        correctAnswer: cfg.highlight.en,
        explanation: cfg.highlight.en,
        hint: 'Recall the core conceptual highlight from the lesson.',
      },
      {
        id: 'q3',
        type: 'match',
        question: 'Match each system component with its key functional role:',
        pairs: [
          { left: cfg.labels.en[0] || 'Primary Component', right: 'Primary Source / Entry Point' },
          { left: cfg.labels.en[1] || 'Mechanism Component', right: 'Core Channel / Processing Medium' },
          { left: cfg.labels.en[2] || 'Output Component', right: 'Functional Output / Target Transformation' },
        ],
        explanation: 'Each component plays a distinct, complementary role in the topic system.',
        hint: 'Pair each visual label with its corresponding role.',
      },
      {
        id: 'q4',
        type: 'mcq',
        question: `Which of the following is an authentic real-world example of ${topicTitle}?`,
        options: shuffleArray([
          cfg.practicalExample.en,
          'An unplugged, broken electrical appliance',
          'A blank sheet of unwritten paper',
          'A completely random event with no rules',
        ]),
        correctAnswer: cfg.practicalExample.en,
        explanation: cfg.practicalExample.en,
        hint: 'Think of everyday applications discussed in the lesson.',
      },
    ],
  };
}
