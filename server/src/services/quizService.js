const Quiz = require('../models/Quiz');
const { getDbStatus } = require('../config/db');

// Seed quizzes identical to the UI mockups
const initialQuizzes = [
  {
    _id: 'quiz_sports_1',
    title: 'Sports & Physical Health',
    description: 'Test your understanding of sports, active living, fitness routines, and athletic records.',
    category: 'Sports',
    icon: 'trophy',
    difficulty: 'Medium',
    timeLimitMinutes: 10,
    creatorName: 'Arjun Kumar',
    questions: [
      {
        _id: 'q_sp_1',
        questionText: 'Which sport is known as the "king of sports" worldwide?',
        options: ['Cricket', 'Association Football (Soccer)', 'Basketball', 'Tennis'],
        correctAnswer: 'Association Football (Soccer)',
        explanation: 'Soccer is played by over 250 million players in over 200 countries.',
      },
      {
        _id: 'q_sp_2',
        questionText: 'How many players are on the field for one team in a standard cricket match?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '11',
        explanation: 'Each cricket team consists of 11 active players on the pitch.',
      },
      {
        _id: 'q_sp_3',
        questionText: 'In the Olympic Games, what do the five rings represent?',
        options: ['Five sports', 'Five original continents', 'Five Olympic values', 'Five Greek gods'],
        correctAnswer: 'Five original continents',
        explanation: 'The five rings represent the five inhabited continents united by Olympism.',
      },
      {
        _id: 'q_sp_4',
        questionText: 'How long is a standard marathon race?',
        options: ['21.1 km', '35.5 km', '42.195 km', '50 km'],
        correctAnswer: '42.195 km',
        explanation: 'A full marathon is officially 42.195 kilometers (26 miles 385 yards).',
      },
      {
        _id: 'q_sp_5',
        questionText: 'Which Grand Slam tennis tournament is played on grass courts?',
        options: ['Australian Open', 'French Open', 'Wimbledon', 'US Open'],
        correctAnswer: 'Wimbledon',
        explanation: 'Wimbledon held in London is the only Grand Slam played on traditional grass.',
      },
      {
        _id: 'q_sp_6',
        questionText: 'HAVE YOU PRACTICED SPORT OR ANY PHYSICAL ACTIVITY OUT OF YOUR WORKING HOURS AT LEAST 30 MIN OR MORE DURING THE LAST MONTH?',
        options: [
          '3 times or more per week',
          '1 or 2 times per week',
          'Less than 4 times per month',
          'I don’t practise sport during the month',
        ],
        correctAnswer: '3 times or more per week',
        explanation: 'The WHO recommends at least 150 minutes of moderate physical activity weekly for optimal cardio health.',
      },
      {
        _id: 'q_sp_7',
        questionText: 'In basketball, how many points is a shot made from beyond the three-point arc worth?',
        options: ['1 point', '2 points', '3 points', '4 points'],
        correctAnswer: '3 points',
        explanation: 'Any successful field goal attempt from outside the 3-point line awards 3 points.',
      },
      {
        _id: 'q_sp_8',
        questionText: 'Which country won the inaugural FIFA World Cup tournament in 1930?',
        options: ['Brazil', 'Uruguay', 'Italy', 'Argentina'],
        correctAnswer: 'Uruguay',
        explanation: 'Uruguay hosted and won the first FIFA World Cup, defeating Argentina 4-2 in the final.',
      },
      {
        _id: 'q_sp_9',
        questionText: 'What is the highest possible break in a standard game of Snooker without fouls?',
        options: ['100', '147', '155', '180'],
        correctAnswer: '147',
        explanation: 'A maximum break is 147, made by potting 15 reds with 15 blacks, then all six colors.',
      },
      {
        _id: 'q_sp_10',
        questionText: 'What is the term for scoring three consecutive strikes in bowling?',
        options: ['Hat trick', 'Turkey', 'Eagle', 'Spare'],
        correctAnswer: 'Turkey',
        explanation: 'In ten-pin bowling, three consecutive strikes in a single game is known as a Turkey.',
      },
    ],
  },
  {
    _id: 'quiz_gk_2',
    title: 'General Knowledge',
    description: 'Explore fascinating facts about world geography, global milestones, discoveries, and heritage.',
    category: 'General Knowledge',
    icon: 'globe',
    difficulty: 'Easy',
    timeLimitMinutes: 10,
    creatorName: 'Priya Sharma',
    questions: [
      {
        _id: 'q_gk_1',
        questionText: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
        explanation: 'The Pacific Ocean covers more than 30% of the Earth’s surface.',
      },
      {
        _id: 'q_gk_2',
        questionText: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'South Korea', 'Thailand'],
        correctAnswer: 'Japan',
        explanation: 'Nihon/Nippon in Japanese literally means "sun origin".',
      },
      {
        _id: 'q_gk_3',
        questionText: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 'Canberra',
        explanation: 'Canberra was chosen as the capital in 1908 as a compromise between Sydney and Melbourne.',
      },
      {
        _id: 'q_gk_4',
        questionText: 'Which is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 'Nile River',
        explanation: 'The Nile is traditionally considered the longest river at approx 6,650 km.',
      },
      {
        _id: 'q_gk_5',
        questionText: 'What currency is used in Japan?',
        options: ['Won', 'Yuan', 'Yen', 'Ringgit'],
        correctAnswer: 'Yen',
        explanation: 'The official Japanese currency is the Yen (JPY).',
      },
      {
        _id: 'q_gk_6',
        questionText: 'How many continents are there on Earth?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        explanation: 'Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
      },
      {
        _id: 'q_gk_7',
        questionText: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        explanation: 'Mars appears reddish due to iron oxide (rust) on its surface.',
      },
      {
        _id: 'q_gk_8',
        questionText: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
        explanation: 'Leonardo da Vinci painted the Mona Lisa during the Italian Renaissance.',
      },
      {
        _id: 'q_gk_9',
        questionText: 'What is the highest mountain peak in the world?',
        options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
        correctAnswer: 'Mount Everest',
        explanation: 'Mount Everest stands at 8,848.86 meters above sea level.',
      },
      {
        _id: 'q_gk_10',
        questionText: 'Which animal is known as the Ship of the Desert?',
        options: ['Horse', 'Camel', 'Elephant', 'Llama'],
        correctAnswer: 'Camel',
        explanation: 'Camels can travel long distances across arid deserts without food or water.',
      },
    ],
  },
  {
    _id: 'quiz_sci_3',
    title: 'Science Basics',
    description: 'Dive into fundamental physics, chemistry, biology concepts and laws of nature.',
    category: 'Science Basics',
    icon: 'atom',
    difficulty: 'Medium',
    timeLimitMinutes: 15,
    creatorName: 'Rahul Verma',
    questions: [
      {
        _id: 'q_sc_1',
        questionText: 'What chemical element has the symbol "O"?',
        options: ['Osmium', 'Oxygen', 'Ozone', 'Oxide'],
        correctAnswer: 'Oxygen',
        explanation: 'Oxygen is atomic number 8 with the symbol O.',
      },
      {
        _id: 'q_sc_2',
        questionText: 'What is the powerhouse of the biological cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswer: 'Mitochondria',
        explanation: 'Mitochondria produce ATP, the cellular energy currency.',
      },
      {
        _id: 'q_sc_3',
        questionText: 'At what temperature Celsius does pure water freeze at standard atmospheric pressure?',
        options: ['0°C', '-4°C', '32°C', '100°C'],
        correctAnswer: '0°C',
        explanation: 'Pure water freezes at 0 degrees Celsius.',
      },
      {
        _id: 'q_sc_4',
        questionText: 'What is the speed of light in a vacuum approximately?',
        options: ['30,000 km/s', '150,000 km/s', '300,000 km/s', '3,000,000 km/s'],
        correctAnswer: '300,000 km/s',
        explanation: 'Light travels at approximately 299,792 kilometers per second in vacuum.',
      },
      {
        _id: 'q_sc_5',
        questionText: 'Which gas do plants absorb during photosynthesis?',
        options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Argon'],
        correctAnswer: 'Carbon dioxide',
        explanation: 'Plants absorb CO2 and release oxygen during photosynthesis.',
      },
      {
        _id: 'q_sc_6',
        questionText: 'What is the pH level of pure distilled water?',
        options: ['5', '7', '9', '14'],
        correctAnswer: '7',
        explanation: 'A pH of 7 represents a neutral solution.',
      },
      {
        _id: 'q_sc_7',
        questionText: 'What force keeps the planets in orbit around the Sun?',
        options: ['Electromagnetism', 'Frictional force', 'Gravitational force', 'Centrifugal force'],
        correctAnswer: 'Gravitational force',
        explanation: 'Gravity is the attractive force between masses.',
      },
      {
        _id: 'q_sc_8',
        questionText: 'Which human organ produces insulin?',
        options: ['Liver', 'Kidney', 'Pancreas', 'Stomach'],
        correctAnswer: 'Pancreas',
        explanation: 'The beta cells of the pancreas secrete insulin to regulate blood glucose.',
      },
      {
        _id: 'q_sc_9',
        questionText: 'What type of eclipse occurs when the Moon passes directly between the Sun and Earth?',
        options: ['Lunar eclipse', 'Solar eclipse', 'Stellar eclipse', 'Planetary transit'],
        correctAnswer: 'Solar eclipse',
        explanation: 'A solar eclipse casts the Moon’s shadow onto the Earth.',
      },
      {
        _id: 'q_sc_10',
        questionText: 'Which subatomic particle carries a negative electrical charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Positron'],
        correctAnswer: 'Electron',
        explanation: 'Electrons orbit the nucleus and have a charge of -1.',
      },
      {
        _id: 'q_sc_11',
        questionText: 'What is the most abundant gas in Earth’s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 'Nitrogen',
        explanation: 'Nitrogen accounts for roughly 78% of Earth’s atmosphere.',
      },
      {
        _id: 'q_sc_12',
        questionText: 'Sound waves cannot travel through which of the following?',
        options: ['Water', 'Steel', 'Air', 'Vacuum'],
        correctAnswer: 'Vacuum',
        explanation: 'Sound requires a material medium to propagate mechanical vibrations.',
      },
      {
        _id: 'q_sc_13',
        questionText: 'What is the chemical formula for ordinary table salt?',
        options: ['NaCl', 'KCl', 'CaCl2', 'NaHCO3'],
        correctAnswer: 'NaCl',
        explanation: 'Table salt is Sodium Chloride (NaCl).',
      },
      {
        _id: 'q_sc_14',
        questionText: 'Which vitamin is synthesized in human skin upon exposure to sunlight?',
        options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 'Vitamin D',
        explanation: 'UVB radiation stimulates Vitamin D3 synthesis in the skin.',
      },
      {
        _id: 'q_sc_15',
        questionText: 'What is the hardest naturally occurring mineral on Earth?',
        options: ['Quartz', 'Diamond', 'Topaz', 'Corundum'],
        correctAnswer: 'Diamond',
        explanation: 'Diamond is 10 on the Mohs hardness scale.',
      },
    ],
  },
  {
    _id: 'quiz_math_4',
    title: 'Mathematics',
    description: 'Sharpen your mental math, arithmetic, algebra, geometry, and logic skills.',
    category: 'Mathematics',
    icon: 'calculator',
    difficulty: 'Medium',
    timeLimitMinutes: 12,
    creatorName: 'Ananya Gupta',
    questions: [
      {
        _id: 'q_m_1',
        questionText: 'What is the value of 15 × 8 + 25?',
        options: ['120', '135', '145', '150'],
        correctAnswer: '145',
        explanation: '15 × 8 = 120; 120 + 25 = 145.',
      },
      {
        _id: 'q_m_2',
        questionText: 'What is the square root of 144?',
        options: ['11', '12', '13', '14'],
        correctAnswer: '12',
        explanation: '12 × 12 = 144.',
      },
      {
        _id: 'q_m_3',
        questionText: 'What is the sum of interior angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: '180°',
        explanation: 'The angles of any Euclidean triangle always sum to 180°.',
      },
      {
        _id: 'q_m_4',
        questionText: 'If 3x + 9 = 24, what is the value of x?',
        options: ['3', '5', '6', '7'],
        correctAnswer: '5',
        explanation: '3x = 24 - 9 = 15 => x = 5.',
      },
      {
        _id: 'q_m_5',
        questionText: 'What is the prime number immediately following 29?',
        options: ['31', '33', '35', '37'],
        correctAnswer: '31',
        explanation: '31 has only two factors: 1 and itself.',
      },
      {
        _id: 'q_m_6',
        questionText: 'What is 20% of 350?',
        options: ['50', '65', '70', '80'],
        correctAnswer: '70',
        explanation: '350 × 0.20 = 70.',
      },
      {
        _id: 'q_m_7',
        questionText: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
        options: ['26 cm', '40 cm', '13 cm', '30 cm'],
        correctAnswer: '26 cm',
        explanation: '2 × (8 + 5) = 2 × 13 = 26 cm.',
      },
      {
        _id: 'q_m_8',
        questionText: 'What is the value of 2 to the power of 6 (2⁶)?',
        options: ['32', '64', '128', '256'],
        correctAnswer: '64',
        explanation: '2⁶ = 64.',
      },
      {
        _id: 'q_m_9',
        questionText: 'What is the area of a circle with radius 7 (taking π ≈ 22/7)?',
        options: ['44', '88', '154', '196'],
        correctAnswer: '154',
        explanation: 'Area = π × r² = (22/7) × 49 = 154.',
      },
      {
        _id: 'q_m_10',
        questionText: 'What is the median of the dataset: [3, 7, 8, 12, 14]?',
        options: ['7', '8', '8.8', '12'],
        correctAnswer: '8',
        explanation: 'The middle value in sorted order is 8.',
      },
      {
        _id: 'q_m_11',
        questionText: 'How many degrees are in a full circular rotation?',
        options: ['180°', '270°', '360°', '400°'],
        correctAnswer: '360°',
        explanation: 'A circle encompasses 360 degrees.',
      },
      {
        _id: 'q_m_12',
        questionText: 'What is the factorial of 5 (5!)?',
        options: ['60', '100', '120', '720'],
        correctAnswer: '120',
        explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
      },
    ],
  },
  {
    _id: 'quiz_hist_5',
    title: 'History',
    description: 'Travel through pivotal ancient, medieval, and modern historical events and figures.',
    category: 'History',
    icon: 'book',
    difficulty: 'Hard',
    timeLimitMinutes: 10,
    creatorName: 'Karan Mehta',
    questions: [
      {
        _id: 'q_h_1',
        questionText: 'In which year did World War II officially conclude?',
        options: ['1943', '1944', '1945', '1948'],
        correctAnswer: '1945',
        explanation: 'World War II ended in 1945 following the surrender of Axis powers.',
      },
      {
        _id: 'q_h_2',
        questionText: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Abraham Lincoln'],
        correctAnswer: 'George Washington',
        explanation: 'George Washington served as the 1st president from 1789 to 1797.',
      },
      {
        _id: 'q_h_3',
        questionText: 'The ancient city of Rome was built on the banks of which river?',
        options: ['Tiber River', 'Danube River', 'Po River', 'Rhine River'],
        correctAnswer: 'Tiber River',
        explanation: 'Rome developed beside the Tiber River in central Italy.',
      },
      {
        _id: 'q_h_4',
        questionText: 'Which Egyptian pharaoh’s tomb was discovered intact by Howard Carter in 1922?',
        options: ['Ramesses II', 'Tutankhamun', 'Akhenaten', 'Thutmose III'],
        correctAnswer: 'Tutankhamun',
        explanation: 'Howard Carter discovered King Tutankhamun’s golden tomb in the Valley of the Kings.',
      },
      {
        _id: 'q_h_5',
        questionText: 'In what year did India gain independence from British rule?',
        options: ['1942', '1945', '1947', '1950'],
        correctAnswer: '1947',
        explanation: 'India won its independence on August 15, 1947.',
      },
      {
        _id: 'q_h_6',
        questionText: 'The Renaissance began primarily in which European country?',
        options: ['France', 'Germany', 'Italy', 'England'],
        correctAnswer: 'Italy',
        explanation: 'The Renaissance began in Italian city-states like Florence during the 14th century.',
      },
      {
        _id: 'q_h_7',
        questionText: 'Who was the first emperor of unified China (Qin Dynasty)?',
        options: ['Qin Shi Huang', 'Han Wudi', 'Kublai Khan', 'Sun Yat-sen'],
        correctAnswer: 'Qin Shi Huang',
        explanation: 'Qin Shi Huang united the warring states in 221 BC and created the Terracotta Army.',
      },
      {
        _id: 'q_h_8',
        questionText: 'The Magna Carta was signed in England in which year?',
        options: ['1066', '1215', '1492', '1588'],
        correctAnswer: '1215',
        explanation: 'King John signed the Magna Carta at Runnymede in June 1215.',
      },
      {
        _id: 'q_h_9',
        questionText: 'Who led the famous March to the Sea during the American Civil War?',
        options: ['Ulysses S. Grant', 'Robert E. Lee', 'William Tecumseh Sherman', 'Stonewall Jackson'],
        correctAnswer: 'William Tecumseh Sherman',
        explanation: 'General Sherman led the Union march through Georgia in 1864.',
      },
      {
        _id: 'q_h_10',
        questionText: 'Which wall fell in November 1989, symbolizing the end of the Cold War?',
        options: ['Hadrian’s Wall', 'Berlin Wall', 'Great Wall of China', 'Western Wall'],
        correctAnswer: 'Berlin Wall',
        explanation: 'The fall of the Berlin Wall opened the border between East and West Germany.',
      },
    ],
  },
  {
    _id: 'quiz_cs_6',
    title: 'Computer Science',
    description: 'Test your knowledge on algorithms, web technologies, databases, networking, and programming.',
    category: 'Computer Science',
    icon: 'laptop',
    difficulty: 'Medium',
    timeLimitMinutes: 15,
    creatorName: 'Sneha Patel',
    questions: [
      {
        _id: 'q_cs_1',
        questionText: 'What does "HTML" stand for?',
        options: [
          'HyperText Markup Language',
          'HighText Modern Language',
          'HyperTransfer Machine Logic',
          'Home Tool Markup Language',
        ],
        correctAnswer: 'HyperText Markup Language',
        explanation: 'HTML is the standard markup language for documents designed to be displayed in a web browser.',
      },
      {
        _id: 'q_cs_2',
        questionText: 'Which data structure follows the Last In, First Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 'Stack',
        explanation: 'A stack operates on LIFO (e.g. push and pop).',
      },
      {
        _id: 'q_cs_3',
        questionText: 'What is the average time complexity of searching in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        explanation: 'Each comparison cuts the search space in half in a balanced BST.',
      },
      {
        _id: 'q_cs_4',
        questionText: 'Which protocol is standard for secure communication over the web?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
        correctAnswer: 'HTTPS',
        explanation: 'HTTPS uses TLS/SSL to encrypt HTTP communications.',
      },
      {
        _id: 'q_cs_5',
        questionText: 'Which programming language is predominantly used for React frontend development?',
        options: ['Python', 'JavaScript / TypeScript', 'C++', 'Ruby'],
        correctAnswer: 'JavaScript / TypeScript',
        explanation: 'React is an open-source JavaScript library developed by Meta.',
      },
      {
        _id: 'q_cs_6',
        questionText: 'What does "SQL" stand for?',
        options: [
          'Structured Query Language',
          'Simple Quick Logic',
          'Sequential Question Layout',
          'Standard Quality Language',
        ],
        correctAnswer: 'Structured Query Language',
        explanation: 'SQL is the domain-specific language used in relational databases.',
      },
      {
        _id: 'q_cs_7',
        questionText: 'Which HTTP status code signifies a successful request?',
        options: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Internal Error'],
        correctAnswer: '200 OK',
        explanation: '200 OK indicates that the request has succeeded.',
      },
      {
        _id: 'q_cs_8',
        questionText: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Sheet Styling', 'Colorful System Styles'],
        correctAnswer: 'Cascading Style Sheets',
        explanation: 'CSS defines how HTML elements are to be styled and displayed.',
      },
      {
        _id: 'q_cs_9',
        questionText: 'Which of the following is a non-relational (NoSQL) document database?',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle DB'],
        correctAnswer: 'MongoDB',
        explanation: 'MongoDB is a document-oriented NoSQL database storing JSON-like BSON documents.',
      },
      {
        _id: 'q_cs_10',
        questionText: 'What is git primarily used for?',
        options: ['Database management', 'Distributed version control', 'Cloud deployment', 'Image editing'],
        correctAnswer: 'Distributed version control',
        explanation: 'Git tracks changes in source code during software development.',
      },
      {
        _id: 'q_cs_11',
        questionText: 'In computer memory, how many bits make up one byte?',
        options: ['4', '8', '16', '32'],
        correctAnswer: '8',
        explanation: '1 byte = 8 bits.',
      },
      {
        _id: 'q_cs_12',
        questionText: 'What is the role of DNS in computer networks?',
        options: [
          'Translates human domain names to IP addresses',
          'Directly powers firewall filtering',
          'Compresses video streaming packets',
          'Generates Wi-Fi passwords',
        ],
        correctAnswer: 'Translates human domain names to IP addresses',
        explanation: 'Domain Name System translates domain names into numerical IP addresses.',
      },
      {
        _id: 'q_cs_13',
        questionText: 'Which keyword in JavaScript declares a block-scoped variable that can be reassigned?',
        options: ['const', 'let', 'var', 'static'],
        correctAnswer: 'let',
        explanation: 'let provides block scoping and allows reassignment.',
      },
      {
        _id: 'q_cs_14',
        questionText: 'Which algorithm is famous for finding the shortest path in a weighted graph with non-negative edges?',
        options: ['Dijkstra’s Algorithm', 'Kruskal’s Algorithm', 'Binary Search', 'Bubble Sort'],
        correctAnswer: 'Dijkstra’s Algorithm',
        explanation: 'Dijkstra’s algorithm finds the shortest paths from a single source node.',
      },
      {
        _id: 'q_cs_15',
        questionText: 'What does "API" stand for?',
        options: [
          'Application Programming Interface',
          'Automated Program Integration',
          'Applied Protocol Internet',
          'Active Page Identifier',
        ],
        correctAnswer: 'Application Programming Interface',
        explanation: 'APIs allow different software programs to communicate with each other.',
      },
    ],
  },
  {
    _id: 'quiz_eng_7',
    title: 'English Grammar',
    description: 'Master parts of speech, vocabulary, idioms, sentence structures, and punctuation.',
    category: 'English Grammar',
    icon: 'text',
    difficulty: 'Easy',
    timeLimitMinutes: 12,
    creatorName: 'Riya Singh',
    questions: [
      {
        _id: 'q_eg_1',
        questionText: 'Which word in the sentence is an adjective: "The quick brown fox jumps over the lazy dog"?',
        options: ['fox', 'jumps', 'quick', 'over'],
        correctAnswer: 'quick',
        explanation: '"quick" and "lazy" describe nouns (fox and dog), making them adjectives.',
      },
      {
        _id: 'q_eg_2',
        questionText: 'Choose the correct word: "Neither of the candidates _____ qualified for the job."',
        options: ['is', 'are', 'were', 'have been'],
        correctAnswer: 'is',
        explanation: '"Neither" is singular, so it takes the singular verb "is".',
      },
      {
        _id: 'q_eg_3',
        questionText: 'What is the antonym of the word "Abundant"?',
        options: ['Plentiful', 'Scarce', 'Generous', 'Substantial'],
        correctAnswer: 'Scarce',
        explanation: '"Scarce" means in short supply, opposite of abundant.',
      },
      {
        _id: 'q_eg_4',
        questionText: 'Identify the conjunction in this sentence: "She wanted to go to the park, but it began to rain."',
        options: ['wanted', 'park', 'but', 'rain'],
        correctAnswer: 'but',
        explanation: '"but" connects the two independent clauses.',
      },
      {
        _id: 'q_eg_5',
        questionText: 'What is the past participle of the verb "swim"?',
        options: ['swam', 'swum', 'swimming', 'swimmed'],
        correctAnswer: 'swum',
        explanation: 'The forms are: swim (present), swam (past), swum (past participle).',
      },
      {
        _id: 'q_eg_6',
        questionText: 'Choose the sentence with correct punctuation:',
        options: [
          'Its raining outside so take you’re umbrella.',
          'It’s raining outside, so take your umbrella.',
          'Its raining outside so take your umbrella.',
          'It’s raining outside so take you’re umbrella.',
        ],
        correctAnswer: 'It’s raining outside, so take your umbrella.',
        explanation: '"It’s" is the contraction for "it is", and "your" is possessive.',
      },
      {
        _id: 'q_eg_7',
        questionText: 'What figure of speech is: "The stars danced playfully in the moonlit sky"?',
        options: ['Metaphor', 'Personification', 'Hyperbole', 'Simile'],
        correctAnswer: 'Personification',
        explanation: 'Giving human traits (dancing playfully) to non-human things (stars) is personification.',
      },
      {
        _id: 'q_eg_8',
        questionText: 'Which of the following is a collective noun?',
        options: ['Flock', 'Bird', 'Feather', 'Singing'],
        correctAnswer: 'Flock',
        explanation: '"Flock" denotes a group or collection of birds or sheep.',
      },
      {
        _id: 'q_eg_9',
        questionText: 'Select the adverb in the sentence: "She sang beautifully at the concert."',
        options: ['She', 'sang', 'beautifully', 'concert'],
        correctAnswer: 'beautifully',
        explanation: '"beautifully" describes the manner of the action "sang".',
      },
      {
        _id: 'q_eg_10',
        questionText: 'What does the idiom "piece of cake" mean?',
        options: ['A birthday gift', 'Something very easy to do', 'A slice of dessert', 'An expensive purchase'],
        correctAnswer: 'Something very easy to do',
        explanation: '"A piece of cake" refers to a task that requires little effort.',
      },
      {
        _id: 'q_eg_11',
        questionText: 'Which pronoun is reflective?',
        options: ['Him', 'He', 'Himself', 'His'],
        correctAnswer: 'Himself',
        explanation: 'Reflexive pronouns end in -self or -selves.',
      },
      {
        _id: 'q_eg_12',
        questionText: 'Choose the correct homophone: "I have no idea _____ coat this is."',
        options: ['whose', 'who’s', 'whos', 'whois'],
        correctAnswer: 'whose',
        explanation: '"Whose" indicates possession.',
      },
    ],
  },
  {
    _id: 'quiz_ca_8',
    title: 'Current Affairs',
    description: 'Stay updated on contemporary international summits, environment, space, and tech developments.',
    category: 'Current Affairs',
    icon: 'news',
    difficulty: 'Medium',
    timeLimitMinutes: 15,
    creatorName: 'Neha Jain',
    questions: [
      {
        _id: 'q_ca_1',
        questionText: 'Which space agency successfully landed the Chandrayaan-3 mission near the Moon’s south pole?',
        options: ['NASA', 'ESA', 'ISRO', 'JAXA'],
        correctAnswer: 'ISRO',
        explanation: 'ISRO made history with the successful soft landing of Chandrayaan-3 in August 2023.',
      },
      {
        _id: 'q_ca_2',
        questionText: 'What global climate agreement was adopted in Paris to combat global warming?',
        options: ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Geneva Convention'],
        correctAnswer: 'Paris Agreement',
        explanation: 'The Paris Agreement aims to keep global temperature rise well below 2°C.',
      },
      {
        _id: 'q_ca_3',
        questionText: 'Which international organization publishes the World Economic Outlook report?',
        options: ['World Bank', 'International Monetary Fund (IMF)', 'United Nations', 'WTO'],
        correctAnswer: 'International Monetary Fund (IMF)',
        explanation: 'The IMF releases the WEO biannually.',
      },
      {
        _id: 'q_ca_4',
        questionText: 'What is the main goal of the Sustainable Development Goals (SDGs) target year 2030?',
        options: ['Ending global poverty and protecting the planet', 'Establishing space colonies', 'Replacing currencies', 'Eliminating all fossil fuels by 2025'],
        correctAnswer: 'Ending global poverty and protecting the planet',
        explanation: 'The 17 UN SDGs address global challenges to achieve a sustainable future.',
      },
      {
        _id: 'q_ca_5',
        questionText: 'Which renewable energy source has seen rapid global expansion due to photovoltaic cells?',
        options: ['Solar power', 'Geothermal energy', 'Nuclear fission', 'Tidal energy'],
        correctAnswer: 'Solar power',
        explanation: 'Photovoltaic cells directly convert sunlight into electricity.',
      },
      {
        _id: 'q_ca_6',
        questionText: 'Which country hosted the G20 Leaders Summit under the theme "Vasudhaiva Kutumbakam" (One Earth, One Family, One Future)?',
        options: ['India', 'Brazil', 'Indonesia', 'South Africa'],
        correctAnswer: 'India',
        explanation: 'India held the G20 Presidency in 2023 in New Delhi.',
      },
      {
        _id: 'q_ca_7',
        questionText: 'What does "COP" stand for in the context of UN Climate Summits?',
        options: ['Conference of the Parties', 'Council on Pollution', 'Committee of Presidents', 'Convention of Protection'],
        correctAnswer: 'Conference of the Parties',
        explanation: 'COP is the supreme decision-making body of the UNFCCC.',
      },
      {
        _id: 'q_ca_8',
        questionText: 'Which artificial intelligence company developed ChatGPT?',
        options: ['OpenAI', 'DeepMind', 'Meta', 'Anthropic'],
        correctAnswer: 'OpenAI',
        explanation: 'OpenAI released ChatGPT in late 2022, accelerating generative AI adoption.',
      },
      {
        _id: 'q_ca_9',
        questionText: 'Where is the permanent headquarters of the United Nations situated?',
        options: ['Geneva, Switzerland', 'New York City, USA', 'Vienna, Austria', 'Brussels, Belgium'],
        correctAnswer: 'New York City, USA',
        explanation: 'The UN Headquarters has been in New York City since 1952.',
      },
      {
        _id: 'q_ca_10',
        questionText: 'What term describes an economy that minimizes waste and makes the most of resources?',
        options: ['Circular Economy', 'Command Economy', 'Traditional Economy', 'Linear Economy'],
        correctAnswer: 'Circular Economy',
        explanation: 'A circular economy emphasizes reuse, repair, remanufacturing, and recycling.',
      },
      {
        _id: 'q_ca_11',
        questionText: 'What is the James Webb Space Telescope primarily designed to observe?',
        options: ['Infrared astronomy', 'Radio frequencies', 'Gamma-ray bursts', 'Sonar signals'],
        correctAnswer: 'Infrared astronomy',
        explanation: 'JWST observes the cosmos primarily in infrared light.',
      },
      {
        _id: 'q_ca_12',
        questionText: 'Which bloc expanded by inviting new members during the 15th Summit in Johannesburg?',
        options: ['BRICS', 'G7', 'NATO', 'ASEAN'],
        correctAnswer: 'BRICS',
        explanation: 'BRICS invited multiple countries to expand the multilateral forum.',
      },
      {
        _id: 'q_ca_13',
        questionText: 'Which international treaty protects the ozone layer by phasing out CFCs?',
        options: ['Montreal Protocol', 'Kyoto Protocol', 'Paris Accord', 'Basel Convention'],
        correctAnswer: 'Montreal Protocol',
        explanation: 'The Montreal Protocol of 1987 is universally ratified and highly successful.',
      },
      {
        _id: 'q_ca_14',
        questionText: 'What is the official currency of the Eurozone?',
        options: ['Pound Sterling', 'Euro', 'Swiss Franc', 'Krone'],
        correctAnswer: 'Euro',
        explanation: 'The Euro is used across member states of the European Eurozone.',
      },
      {
        _id: 'q_ca_15',
        questionText: 'What Nobel Prize category was established in memory of Alfred Nobel by Sweden’s Central Bank?',
        options: ['Economic Sciences', 'Literature', 'Peace', 'Physiology'],
        correctAnswer: 'Economic Sciences',
        explanation: 'The Sveriges Riksbank Prize in Economic Sciences was established in 1968.',
      },
    ],
  },
];

// Memory store for quizzes
let memoryQuizzes = [...initialQuizzes];

const getAllQuizzes = async ({ search = '', category = '' } = {}) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (category && category !== 'All' && category !== 'All Categories') {
      query.category = category;
    }
    return await Quiz.find(query).sort({ createdAt: -1 });
  }

  // Fallback memory store
  let filtered = [...memoryQuizzes];
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (q) => q.title.toLowerCase().includes(s) || (q.description && q.description.toLowerCase().includes(s))
    );
  }
  if (category && category !== 'All' && category !== 'All Categories') {
    filtered = filtered.filter((q) => q.category.toLowerCase() === category.toLowerCase());
  }

  return filtered;
};

const getQuizById = async (id) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    return await Quiz.findById(id);
  }

  return memoryQuizzes.find((q) => String(q._id) === String(id));
};

const createQuiz = async (quizData, user) => {
  const dbStatus = getDbStatus();

  const formattedData = {
    ...quizData,
    createdBy: user ? user._id : null,
    creatorName: user ? user.name : quizData.creatorName || 'Community Author',
    createdAt: new Date().toISOString(),
  };

  if (dbStatus.isConnected) {
    return await Quiz.create(formattedData);
  }

  const newQuiz = {
    _id: `quiz_${Date.now()}`,
    ...formattedData,
  };
  memoryQuizzes.unshift(newQuiz);
  return newQuiz;
};

const updateQuiz = async (id, quizData, user) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const quiz = await Quiz.findById(id);
    if (!quiz) return null;
    Object.assign(quiz, quizData);
    return await quiz.save();
  }

  const idx = memoryQuizzes.findIndex((q) => String(q._id) === String(id));
  if (idx === -1) return null;

  memoryQuizzes[idx] = {
    ...memoryQuizzes[idx],
    ...quizData,
    updatedAt: new Date().toISOString(),
  };
  return memoryQuizzes[idx];
};

const deleteQuiz = async (id) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    return await Quiz.findByIdAndDelete(id);
  }

  const idx = memoryQuizzes.findIndex((q) => String(q._id) === String(id));
  if (idx === -1) return false;
  memoryQuizzes.splice(idx, 1);
  return true;
};

module.exports = {
  initialQuizzes,
  memoryQuizzes,
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
