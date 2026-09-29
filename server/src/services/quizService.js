const Quiz = require('../models/Quiz');
const { getDbStatus } = require('../config/db');

// Seed quizzes identical to the UI mockups
const initialQuizzes = [
  {
    _id: 'quiz_js_basics',
    title: 'JavaScript Basics',
    description: 'Master core JavaScript concepts: variables, data types, closures, arrays, promises, and web development fundamentals.',
    category: 'Computer Science',
    icon: 'laptop',
    difficulty: 'Easy',
    timeLimitMinutes: 15,
    creatorName: 'Rahul Verma',
    questions: [
      {
        _id: 'q_js_1',
        questionText: 'What is JavaScript?',
        options: ['Programming language', 'Database', 'Operating system', 'Browser'],
        correctAnswer: 'Programming language',
        explanation: 'JavaScript is a programming language primarily used to add interactivity and dynamic behavior to web pages.',
        quickExplanation: 'JavaScript is a programming language, while MongoDB is a database system.',
        concept: 'Web Development → JavaScript',
      },
      {
        _id: 'q_js_2',
        questionText: 'Which keyword in modern JavaScript declares a block-scoped variable that can be reassigned?',
        options: ['var', 'let', 'const', 'global'],
        correctAnswer: 'let',
        explanation: 'The "let" keyword declares block-scoped variables that can be reassigned, introduced in ES6.',
        quickExplanation: '"const" prevents reassignment, whereas "let" allows you to reassign new values within the same block scope.',
        concept: 'JavaScript → Variables & Scope',
      },
      {
        _id: 'q_js_3',
        questionText: 'What is the return value of typeof null in JavaScript?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 'object',
        explanation: 'In JavaScript, typeof null returns "object", which is a historical bug in the language implementation preserved for backward compatibility.',
        quickExplanation: 'While null is a primitive type, typeof incorrectly reports "object". Use value === null to test for null.',
        concept: 'JavaScript → Data Types & Type Coercion',
      },
      {
        _id: 'q_js_4',
        questionText: 'Which array method adds an element to the end of an array?',
        options: ['pop()', 'push()', 'shift()', 'unshift()'],
        correctAnswer: 'push()',
        explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.',
        quickExplanation: 'push() adds to the end, pop() removes from the end, unshift() adds to the beginning, and shift() removes from the beginning.',
        concept: 'JavaScript → Array Methods',
      },
      {
        _id: 'q_js_5',
        questionText: 'What does the strict equality operator (===) compare?',
        options: ['Values only with type conversion', 'Both value and type without conversion', 'Object memory references only', 'String representations'],
        correctAnswer: 'Both value and type without conversion',
        explanation: 'Strict equality (===) verifies that both the type and the value of both operands are identical without implicit coercion.',
        quickExplanation: '== performs type coercion (e.g. 5 == "5" is true), whereas === returns false unless types also match.',
        concept: 'JavaScript → Operators & Comparison',
      },
      {
        _id: 'q_js_6',
        questionText: 'What is a closure in JavaScript?',
        options: [
          'A function bundled together with references to its surrounding lexical environment',
          'A method to close browser tabs programmatically',
          'A syntax error indicating an unclosed brace',
          'A database connection pool terminate method',
        ],
        correctAnswer: 'A function bundled together with references to its surrounding lexical environment',
        explanation: 'A closure gives a function access to its outer scope even after the outer function has executed and returned.',
        quickExplanation: 'Closures preserve variables from the parent lexical environment across asynchronous and deferred executions.',
        concept: 'JavaScript → Functions & Closures',
      },
      {
        _id: 'q_js_7',
        questionText: 'Which method converts a JavaScript object into a JSON string?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.objectify()', 'JSON.encode()'],
        correctAnswer: 'JSON.stringify()',
        explanation: 'JSON.stringify() serializes a JavaScript object into a JSON-formatted string.',
        quickExplanation: 'JSON.parse() converts a JSON string into an object, while JSON.stringify() converts an object to a string.',
        concept: 'Web Development → JSON & Data Serialization',
      },
      {
        _id: 'q_js_8',
        questionText: 'What is the purpose of the Promise object in JavaScript?',
        options: [
          'To represent the eventual completion or failure of an asynchronous operation',
          'To prevent memory leaks in event listeners',
          'To enforce strong typing at runtime',
          'To encrypt user credentials stored in local storage',
        ],
        correctAnswer: 'To represent the eventual completion or failure of an asynchronous operation',
        explanation: 'A Promise represents a proxy for a value not necessarily known when created, handling asynchronous callbacks cleanly.',
        quickExplanation: 'Promises manage asynchronous workflows with .then(), .catch(), and modern async/await syntax.',
        concept: 'Asynchronous Programming → Promises & Event Loop',
      },
      {
        _id: 'q_js_9',
        questionText: 'Which function schedules code execution after a specified delay in milliseconds?',
        options: ['setInterval()', 'setTimeout()', 'setDelay()', 'requestWait()'],
        correctAnswer: 'setTimeout()',
        explanation: 'setTimeout() calls a function or executes a code snippet after a specified delay.',
        quickExplanation: 'setTimeout() runs once after the delay, while setInterval() repeats continuously until cleared.',
        concept: 'Web Development → Timers & Web APIs',
      },
      {
        _id: 'q_js_10',
        questionText: 'What does NaN stand for and represent in JavaScript?',
        options: [
          'Not a Number (a numeric property representing an unrepresentable value)',
          'Negative Array Node',
          'Null and Non-existent',
          'Network Access Node',
        ],
        correctAnswer: 'Not a Number (a numeric property representing an unrepresentable value)',
        explanation: 'NaN represents a computational error resulting from an undefined or unrepresentable calculation. Interestingly, typeof NaN is "number".',
        quickExplanation: 'Operations like "abc" / 2 evaluate to NaN. Use Number.isNaN() to safely test for it.',
        concept: 'JavaScript → Numbers & Primitives',
      },
      {
        _id: 'q_js_11',
        questionText: 'Which array method creates a new array populated with the results of calling a provided function on every element?',
        options: ['forEach()', 'filter()', 'map()', 'reduce()'],
        correctAnswer: 'map()',
        explanation: 'map() transforms each element and returns a brand-new array of equal length.',
        quickExplanation: 'forEach() executes side effects without returning a new array; map() always returns a new transformed array.',
        concept: 'Functional Programming → Array Transformations',
      },
      {
        _id: 'q_js_12',
        questionText: 'What is the Document Object Model (DOM)?',
        options: [
          'A programming interface representing HTML/XML documents as a node tree',
          'A database management protocol for web browsers',
          'The styling engine of CSS stylesheets',
          'A cloud hosting server container',
        ],
        correctAnswer: 'A programming interface representing HTML/XML documents as a node tree',
        explanation: 'The DOM represents the page so that programs like JavaScript can manipulate document structure, style, and content.',
        quickExplanation: 'The DOM is the browser’s tree representation of HTML elements accessible via document.querySelector, etc.',
        concept: 'Web Development → DOM Manipulation',
      },
      {
        _id: 'q_js_13',
        questionText: 'What does async/await accomplish in modern JavaScript?',
        options: [
          'Enables writing asynchronous promise-based code in a synchronous, readable style',
          'Runs JavaScript code on multiple CPU threads concurrently in background',
          'Automatically minifies and compiles scripts for production',
          'Caches network responses in the browser cache storage',
        ],
        correctAnswer: 'Enables writing asynchronous promise-based code in a synchronous, readable style',
        explanation: 'async/await is syntactic sugar over Promises, making asynchronous code cleaner to write and easier to debug with try/catch.',
        quickExplanation: 'await pauses execution of the async function until the Promise settles, avoiding nested callback chains.',
        concept: 'Asynchronous Programming → Async / Await',
      },
    ],
  },
  {
    _id: 'quiz_dbms_funds',
    title: 'DBMS Fundamentals',
    description: 'Understand relational schemas, SQL, ACID transactions, normalization, indexing, and NoSQL architecture.',
    category: 'Computer Science',
    icon: 'database',
    difficulty: 'Medium',
    timeLimitMinutes: 12,
    creatorName: 'Rahul Verma',
    questions: [
      {
        _id: 'q_db_1',
        questionText: 'What does the "A" in ACID database transactions stand for?',
        options: ['Atomicity', 'Availability', 'Accuracy', 'Authentication'],
        correctAnswer: 'Atomicity',
        explanation: 'Atomicity ensures that all transaction operations succeed completely or are entirely rolled back.',
        quickExplanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
        concept: 'Databases → ACID Transactions',
      },
      {
        _id: 'q_db_2',
        questionText: 'Which SQL constraint uniquely identifies each record in a database table?',
        options: ['Foreign Key', 'Primary Key', 'Check Constraint', 'Unique Default'],
        correctAnswer: 'Primary Key',
        explanation: 'A Primary Key uniquely identifies each row and cannot contain NULL values.',
        quickExplanation: 'Primary Keys uniquely identify rows, while Foreign Keys link rows across related tables.',
        concept: 'Databases → Keys & Relational Schema',
      },
      {
        _id: 'q_db_3',
        questionText: 'What is the primary benefit of creating database indexes?',
        options: [
          'Speeds up data retrieval and query execution',
          'Reduces disk storage footprint',
          'Encrypts sensitive table rows',
          'Eliminates duplicate values automatically',
        ],
        correctAnswer: 'Speeds up data retrieval and query execution',
        explanation: 'Indexes create fast search data structures (like B-trees) that drastically reduce query search time.',
        quickExplanation: 'Indexes speed up read operations (SELECT) at the cost of slightly slower write operations (INSERT/UPDATE).',
        concept: 'Databases → Indexing & Performance',
      },
      {
        _id: 'q_db_4',
        questionText: 'Which normal form requires eliminating partial dependency of non-prime attributes on composite keys?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
        correctAnswer: 'Second Normal Form (2NF)',
        explanation: '2NF requires the table to be in 1NF and have no partial dependency on any candidate key.',
        quickExplanation: '1NF removes repeating groups, 2NF removes partial key dependencies, and 3NF removes transitive dependencies.',
        concept: 'Databases → Database Normalization',
      },
      {
        _id: 'q_db_5',
        questionText: 'Which type of database is MongoDB classified as?',
        options: ['Relational RDBMS', 'Document-oriented NoSQL', 'Graph Database', 'Key-Value Memory Cache'],
        correctAnswer: 'Document-oriented NoSQL',
        explanation: 'MongoDB stores data in flexible, JSON-like BSON documents grouped into collections.',
        quickExplanation: 'Relational databases use tables and SQL, while MongoDB is a NoSQL document database.',
        concept: 'Databases → NoSQL & Document Stores',
      },
    ],
  },
  {
    _id: 'quiz_cn_funds',
    title: 'Computer Networks',
    description: 'Explore OSI layers, TCP/UDP protocols, IP routing, HTTP/HTTPS security, and network architecture.',
    category: 'Computer Science',
    icon: 'wifi',
    difficulty: 'Medium',
    timeLimitMinutes: 12,
    creatorName: 'Rahul Verma',
    questions: [
      {
        _id: 'q_cn_1',
        questionText: 'Which layer of the OSI model is responsible for end-to-end reliable transmission and flow control?',
        options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Session Layer'],
        correctAnswer: 'Transport Layer',
        explanation: 'The Transport Layer (Layer 4) handles end-to-end communication, error recovery, and flow control (e.g. TCP).',
        quickExplanation: 'Network layer handles IP routing, while Transport layer manages host-to-host ports and reliability.',
        concept: 'Computer Networks → OSI Model',
      },
      {
        _id: 'q_cn_2',
        questionText: 'What is the main difference between TCP and UDP?',
        options: [
          'TCP is connection-oriented and reliable; UDP is connectionless and lightweight',
          'UDP provides guaranteed packet delivery; TCP drops packets silently',
          'TCP operates at Layer 7; UDP operates at Layer 2',
          'TCP is only used for wireless devices; UDP is for wired networks',
        ],
        correctAnswer: 'TCP is connection-oriented and reliable; UDP is connectionless and lightweight',
        explanation: 'TCP uses a 3-way handshake and packet acknowledgments for reliability, while UDP prioritizes speed with minimal overhead.',
        quickExplanation: 'TCP guarantees delivery (used in HTTP, emails), while UDP is best for real-time gaming and audio/video streaming.',
        concept: 'Computer Networks → TCP vs UDP',
      },
      {
        _id: 'q_cn_3',
        questionText: 'What is the standard port number for HTTPS secure web traffic?',
        options: ['80', '443', '8080', '22'],
        correctAnswer: '443',
        explanation: 'Port 443 is the standard port for HTTPS encrypted with TLS/SSL. Port 80 is for unencrypted HTTP.',
        quickExplanation: 'Port 80 is HTTP, Port 443 is HTTPS, Port 22 is SSH, and Port 21 is FTP.',
        concept: 'Computer Networks → Ports & Protocols',
      },
      {
        _id: 'q_cn_4',
        questionText: 'What mechanism translates private IP addresses on a local LAN to a single public IP address?',
        options: ['NAT (Network Address Translation)', 'DHCP', 'ARP', 'BGP'],
        correctAnswer: 'NAT (Network Address Translation)',
        explanation: 'NAT allows multiple devices in a local private network to share a single public IP address.',
        quickExplanation: 'NAT conserves IPv4 addresses and shields internal local devices behind a router gateway.',
        concept: 'Computer Networks → IP Addressing & NAT',
      },
      {
        _id: 'q_cn_5',
        questionText: 'Which protocol automatically assigns dynamic IP addresses to devices joining a network?',
        options: ['DNS', 'DHCP', 'ICMP', 'SMTP'],
        correctAnswer: 'DHCP',
        explanation: 'Dynamic Host Configuration Protocol (DHCP) automatically provides an IP address, subnet mask, and gateway to client devices.',
        quickExplanation: 'DNS translates names to IPs; DHCP assigns those IP addresses to network devices.',
        concept: 'Computer Networks → Network Configuration & DHCP',
      },
    ],
  },
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

const getAllQuizzes = async ({ search = '', category = '', user = null } = {}) => {
  const dbStatus = getDbStatus();
  const userEmail = user?.email ? user.email.trim().toLowerCase() : '';
  const userIdStr = user?._id ? String(user._id) : '';
  const userName = user?.name ? user.name.trim() : '';

  const filterQuizForUser = (q) => {
    const isPublic = q.isPublic !== false;
    const assignedEmails = (q.assignedEmails || []).map((e) => String(e).trim().toLowerCase());
    const hasAssignedList = assignedEmails.length > 0;

    // If completely public with no specific student whitelist, anyone can see
    if (isPublic && !hasAssignedList) {
      return true;
    }

    // If restricted/assigned: only creator or specifically assigned user can see
    if (!user) return false;

    const isCreator =
      (q.createdBy && String(q.createdBy) === userIdStr) ||
      (userName && q.creatorName && q.creatorName.toLowerCase() === userName.toLowerCase());

    const isAssigned = userEmail && assignedEmails.includes(userEmail);

    return isCreator || isAssigned;
  };

  const decorateQuiz = (q) => {
    const raw = typeof q.toObject === 'function' ? q.toObject() : { ...q };
    const assignedEmails = (raw.assignedEmails || []).map((e) => String(e).trim().toLowerCase());
    const now = new Date();

    const isAssignedToMe = Boolean(userEmail && assignedEmails.includes(userEmail));
    const isCreator = Boolean(
      user &&
        ((raw.createdBy && String(raw.createdBy) === userIdStr) ||
          (userName && raw.creatorName && raw.creatorName.toLowerCase() === userName.toLowerCase()))
    );

    const startTime = raw.examStartTime ? new Date(raw.examStartTime) : null;
    const endTime = raw.examEndTime ? new Date(raw.examEndTime) : null;

    const isUpcomingExam = Boolean(startTime && startTime > now);
    const isExpiredExam = Boolean(endTime && endTime < now);
    const isActiveExamWindow = Boolean((!startTime || startTime <= now) && (!endTime || endTime >= now));

    return {
      ...raw,
      isAssignedToMe,
      isCreator,
      isUpcomingExam,
      isExpiredExam,
      isActiveExamWindow,
    };
  };

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

    const allDbQuizzes = await Quiz.find(query).sort({ createdAt: -1 });
    return allDbQuizzes.filter(filterQuizForUser).map(decorateQuiz);
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

  return filtered.filter(filterQuizForUser).map(decorateQuiz);
};

const getQuizById = async (id, user = null) => {
  const dbStatus = getDbStatus();
  let quiz = null;

  if (dbStatus.isConnected) {
    quiz = await Quiz.findById(id);
  } else {
    quiz = memoryQuizzes.find((q) => String(q._id) === String(id));
  }

  if (!quiz) return null;

  const raw = typeof quiz.toObject === 'function' ? quiz.toObject() : { ...quiz };
  const userEmail = user?.email ? user.email.trim().toLowerCase() : '';
  const userIdStr = user?._id ? String(user._id) : '';
  const userName = user?.name ? user.name.trim() : '';

  const assignedEmails = (raw.assignedEmails || []).map((e) => String(e).trim().toLowerCase());
  const hasAssignedList = assignedEmails.length > 0;
  const isPublic = raw.isPublic !== false;

  const isCreator = Boolean(
    user &&
      ((raw.createdBy && String(raw.createdBy) === userIdStr) ||
        (userName && raw.creatorName && raw.creatorName.toLowerCase() === userName.toLowerCase()))
  );
  const isAssignedToMe = Boolean(userEmail && assignedEmails.includes(userEmail));

  // If private or assigned, enforce access authorization
  if ((!isPublic || hasAssignedList) && !isCreator && !isAssignedToMe) {
    const error = new Error('Access Restricted: You are not assigned to this private exam.');
    error.status = 403;
    throw error;
  }

  const now = new Date();
  const startTime = raw.examStartTime ? new Date(raw.examStartTime) : null;
  const endTime = raw.examEndTime ? new Date(raw.examEndTime) : null;

  return {
    ...raw,
    isAssignedToMe,
    isCreator,
    isUpcomingExam: Boolean(startTime && startTime > now),
    isExpiredExam: Boolean(endTime && endTime < now),
    isActiveExamWindow: Boolean((!startTime || startTime <= now) && (!endTime || endTime >= now)),
  };
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

const deleteQuiz = async (id, user) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const quiz = await Quiz.findById(id);
    if (!quiz) return null;

    // Protection for default demo quizzes
    if (initialQuizzes.some(iq => iq.title.toLowerCase() === quiz.title.toLowerCase()) && !quiz.createdBy) {
      const err = new Error('Default baseline system quizzes cannot be deleted.');
      err.status = 403;
      throw err;
    }

    // Permission check: if quiz has createdBy and user is supplied
    if (user && quiz.createdBy && String(quiz.createdBy) !== String(user._id) && quiz.creatorName !== user.name) {
      const err = new Error('You do not have permission to delete this quiz.');
      err.status = 403;
      throw err;
    }

    return await Quiz.findByIdAndDelete(id);
  }

  const idx = memoryQuizzes.findIndex((q) => String(q._id) === String(id));
  if (idx === -1) return false;
  
  const mQuiz = memoryQuizzes[idx];
  if (user && mQuiz.createdBy && String(mQuiz.createdBy) !== String(user._id) && mQuiz.creatorName !== user.name) {
    const err = new Error('You do not have permission to delete this quiz.');
    err.status = 403;
    throw err;
  }

  memoryQuizzes.splice(idx, 1);
  return true;
};

const seedQuizzes = async () => {
  const dbStatus = getDbStatus();
  if (!dbStatus.isConnected) return;

  try {
    for (const q of initialQuizzes) {
      const existing = await Quiz.findOne({ title: q.title });
      if (!existing) {
        const { _id, questions, ...quizToSeed } = q;
        const cleanQuestions = (questions || []).map((qu) => {
          const { _id: qId, ...quRest } = qu;
          return quRest;
        });
        await Quiz.create({
          ...quizToSeed,
          questions: cleanQuestions,
        });
        console.log(`🌱 Seeded quiz: ${q.title}`);
      }
    }
  } catch (err) {
    console.warn('Quiz seed notice:', err.message);
  }
};

module.exports = {
  initialQuizzes,
  memoryQuizzes,
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  seedQuizzes,
};
