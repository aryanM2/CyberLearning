export const currentUser = {
  id: "u_101",
  name: "Alex Vance",
  username: "vance_sec",
  email: "alex.vance@nextgen-sec.com",
  role: "user", // "user" or "admin"
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  level: 5,
  title: "Security Researcher",
  xp: 2450,
  nextLevelXp: 3500,
  streakDays: 7,
  articlesReadCount: 18,
  challengesCompletedCount: 12,
  achievementsCount: 8,
  rank: 4,
  bio: "Cybersecurity enthusiast exploring penetration testing, reverse engineering, and threat hunting.",
  joinedDate: "2026-01-15",
};

export const adminUser = {
  id: "u_999",
  name: "Sarah Connor",
  username: "admin_sarah",
  email: "admin@nextgen-sec.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  level: 25,
  title: "Chief Information Security Officer",
  xp: 45000,
};

export const categories = [
  { id: "cat_1", name: "Network Security", icon: "Wifi", slug: "network-security" },
  { id: "cat_2", name: "Web Application Security", icon: "Globe", slug: "web-security" },
  { id: "cat_3", name: "Cryptography", icon: "Lock", slug: "cryptography" },
  { id: "cat_4", name: "Ethical Hacking", icon: "Terminal", slug: "ethical-hacking" },
  { id: "cat_5", name: "Incident Response", icon: "ShieldAlert", slug: "incident-response" },
];

export const articles = [
  {
    id: "art_1",
    title: "Understanding SQL Injection (SQLi) Vulnerabilities & Remediation",
    description: "Learn how malicious SQL queries manipulate database logic and how to prevent SQLi using parameterized queries.",
    category: "Web Application Security",
    difficulty: "Beginner",
    readingTime: "8 min read",
    xpReward: 150,
    author: "Elena Rostova",
    publishedDate: "2026-08-01",
    read: true,
    featured: true,
    tags: ["SQLi", "OWASP Top 10", "Web Sec"],
    content: `
# Understanding SQL Injection (SQLi)

SQL Injection remains one of the most critical web application security flaws on the OWASP Top 10 list. It occurs when untrusted user input is directly concatenated into a database query string.

## How SQL Injection Works

Imagine a login query structured like this:

\`\`\`sql
SELECT * FROM users WHERE username = '$user_input' AND password = '$password_input';
\`\`\`

If an attacker inputs \`admin' --\` into the username field, the resulting SQL query becomes:

\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '...';
\`\`\`

The \`--\` character comments out the password verification clause, allowing the attacker to bypass authentication without knowing the password.

## Remediation & Best Practices

1. **Use Parameterized Queries (Prepared Statements):**
Always separate SQL code from input data.
\`\`\`javascript
// Secure parameterized query
const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
await db.query(query, [username, password]);
\`\`\`

2. **Input Sanitization & Validation:** Enforce strict allow-lists for expected user input types.
3. **Principle of Least Privilege:** Ensure the database user account only has required permissions.
    `,
  },
  {
    id: "art_2",
    title: "Demystifying Cross-Site Scripting (XSS): Stored, Reflected, & DOM-Based",
    description: "Deep dive into XSS attack vectors, session hijacking risks, and modern Content Security Policy (CSP) defenses.",
    category: "Web Application Security",
    difficulty: "Intermediate",
    readingTime: "12 min read",
    xpReward: 250,
    author: "Marcus Chen",
    publishedDate: "2026-08-05",
    read: true,
    featured: true,
    tags: ["XSS", "Frontend Security", "CSP"],
    content: `
# Demystifying Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a web page without proper validation or escaping.

## Types of XSS

1. **Reflected XSS:** The script payload is reflected off a web server in an immediate response (e.g. search query parameters).
2. **Stored XSS:** The payload is permanently stored on a target server (e.g. database comment section) and served to subsequent users.
3. **DOM-Based XSS:** The vulnerability exists in client-side code where JavaScript executes untrusted user input.

## Defense Mechanisms

- Context-aware Output Encoding (e.g. HTML entity encoding).
- HTTP-Only Cookies to prevent session token theft via \`document.cookie\`.
- Enforcing strong Content Security Policy (CSP) headers.
    `,
  },
  {
    id: "art_3",
    title: "Fundamentals of Public Key Infrastructure (PKI) & TLS Handshakes",
    description: "Explore how asymmetric cryptography, digital certificates, and modern TLS 1.3 keep web communication confidential.",
    category: "Cryptography",
    difficulty: "Intermediate",
    readingTime: "10 min read",
    xpReward: 200,
    author: "Dr. Aris Thorne",
    publishedDate: "2026-07-28",
    read: false,
    featured: false,
    tags: ["TLS", "RSA", "ECC", "Encryption"],
    content: `
# Fundamentals of PKI and TLS Handshakes

Public Key Infrastructure (PKI) forms the trust backbone of the modern internet.

## The TLS 1.3 Handshake

Modern TLS 1.3 reduces the cryptographic handshake to a single round-trip (1-RTT):

1. **ClientHello:** Client sends supported cipher suites and key share parameters.
2. **ServerHello:** Server selects cipher suite, sends server key share, certificate, and digital signature.
3. **Symmetric Encryption:** Both parties compute shared session keys via Elliptic Curve Diffie-Hellman (ECDHE).
    `,
  },
  {
    id: "art_4",
    title: "Zero Trust Architecture: Never Trust, Always Verify",
    description: "Shift away from traditional perimeter security models to strict identity verification and micro-segmentation.",
    category: "Network Security",
    difficulty: "Advanced",
    readingTime: "15 min read",
    xpReward: 350,
    author: "Samantha Vance",
    publishedDate: "2026-08-08",
    read: false,
    featured: false,
    tags: ["Zero Trust", "IAM", "Microsegmentation"],
    content: `
# Zero Trust Architecture Principles

Zero Trust operates on the assumption that threat actors already exist both inside and outside enterprise network boundaries.

## Core Pillars
1. Explicit Verification
2. Least Privilege Access
3. Assume Breach
    `,
  },
];

export const challenges = [
  {
    id: "chal_1",
    title: "Bypass the Broken Auth Portal",
    description: "Examine a simulated authentication script suffering from flawed conditional logic and retrieve the hidden admin flag.",
    category: "Web Application Security",
    difficulty: "Easy",
    xp: 200,
    estimatedTime: "15 mins",
    completed: true,
    instructions: "Analyze the provided authentication snippet. Identify the logic flaw that allows authentication bypass and input the secret flag parameter.",
    taskSnippet: `
function authenticateUser(user, password) {
  if (user === "admin" || password.length === 0) {
    // BUG: Missing strict check!
    return { status: 200, flag: "FLAG{L0G1C_BYP4SS_SUCCESS}" };
  }
  return { status: 401, error: "Invalid credentials" };
}
    `,
    question: "What is the flag revealed upon bypassing the login routine?",
    correctAnswer: "FLAG{L0G1C_BYP4SS_SUCCESS}",
  },
  {
    id: "chal_2",
    title: "Crack the Base64 & Rot13 Cipher Chain",
    description: "Decode a multi-layer encrypted string extracted from an intercepted C2 network packet.",
    category: "Cryptography",
    difficulty: "Easy",
    xp: 150,
    estimatedTime: "10 mins",
    completed: true,
    instructions: "The ciphertext string 'UkVWRVJTRV9GTEFH' is encoded in Base64. Decode it to uncover the plain string payload.",
    question: "Enter the decoded plaintext string:",
    correctAnswer: "REVERSE_FLAG",
  },
  {
    id: "chal_3",
    title: "Identify the Command Injection Payload",
    description: "Analyze web server request logs to pinpoint the malicious OS command injection vector used by an attacker.",
    category: "Ethical Hacking",
    difficulty: "Medium",
    xp: 350,
    estimatedTime: "25 mins",
    completed: false,
    instructions: "Given the endpoint /api/ping?host=127.0.0.1; cat /etc/passwd, identify the command injected after the host address.",
    taskSnippet: `GET /api/ping?host=127.0.0.1%3B%20cat%20%2Fetc%2Fpasswd HTTP/1.1`,
    question: "Which Linux terminal command did the attacker append?",
    correctAnswer: "cat /etc/passwd",
  },
  {
    id: "chal_4",
    title: "SQLi Blind Extraction Challenge",
    description: "Craft a boolean-based blind SQL injection payload to extract the administrator password hash digit by digit.",
    category: "Web Application Security",
    difficulty: "Hard",
    xp: 500,
    estimatedTime: "40 mins",
    completed: false,
    instructions: "Find the SQL clause required to test character matches against the admin password field.",
    question: "What flag is stored in the secret table?",
    correctAnswer: "FLAG{BL1ND_SQLI_M4ST3R}",
  },
];

export const achievements = [
  {
    id: "ach_1",
    title: "First Steps",
    description: "Read your first cybersecurity article.",
    icon: "BookOpen",
    unlocked: true,
    unlockedDate: "2026-01-16",
    progress: "1 / 1",
    xpBonus: 100,
  },
  {
    id: "ach_2",
    title: "Code Breaker",
    description: "Successfully complete 5 cybersecurity challenges.",
    icon: "Key",
    unlocked: true,
    unlockedDate: "2026-02-01",
    progress: "5 / 5",
    xpBonus: 250,
  },
  {
    id: "ach_3",
    title: "7-Day Streak Master",
    description: "Maintain an active daily learning streak for 7 consecutive days.",
    icon: "Flame",
    unlocked: true,
    unlockedDate: "2026-08-11",
    progress: "7 / 7",
    xpBonus: 300,
  },
  {
    id: "ach_4",
    title: "Security Scholar",
    description: "Read 25 cybersecurity articles across all categories.",
    icon: "GraduationCap",
    unlocked: false,
    unlockedDate: null,
    progress: "18 / 25",
    xpBonus: 500,
  },
  {
    id: "ach_5",
    title: "Ethical Hacker Elite",
    description: "Complete 10 Hard difficulty cybersecurity challenges.",
    icon: "ShieldAlert",
    unlocked: false,
    unlockedDate: null,
    progress: "2 / 10",
    xpBonus: 1000,
  },
  {
    id: "ach_6",
    title: "Top 5 Contender",
    description: "Reach the Top 5 position on the global XP Leaderboard.",
    icon: "Trophy",
    unlocked: true,
    unlockedDate: "2026-08-10",
    progress: "Rank #4",
    xpBonus: 750,
  },
];

export const leaderboardData = [
  { rank: 1, name: "Cypher_Ghost", username: "cypher_ghost", level: 12, xp: 8950, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80", streak: 28 },
  { rank: 2, name: "ByteSentinel", username: "sentinel_99", level: 9, xp: 6400, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80", streak: 14 },
  { rank: 3, name: "N7_Shepard", username: "n7_shepard", level: 7, xp: 4120, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80", streak: 19 },
  { rank: 4, name: "Alex Vance (You)", username: "vance_sec", level: 5, xp: 2450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", streak: 7, isCurrentUser: true },
  { rank: 5, name: "ZeroCool_99", username: "zerocool", level: 4, xp: 2100, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80", streak: 3 },
  { rank: 6, name: "AcidBurn", username: "acid_burn", level: 4, xp: 1980, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", streak: 5 },
  { rank: 7, name: "K3rn3l_P4n1c", username: "kernel_panic", level: 3, xp: 1450, avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=80", streak: 2 },
];

export const rewards = [
  {
    id: "rew_1",
    name: "Wireless Noise-Canceling Headphones",
    description: "High-grade gaming/work headphones with active noise cancellation and clear mic.",
    xpCost: 5000,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    category: "Hardware",
  },
  {
    id: "rew_2",
    name: "NextGen Sec Limited Edition Hoodie",
    description: "Premium cyber-black hoodie with embroidered NextGen Securities emblem.",
    xpCost: 2500,
    quantity: 15,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "rew_3",
    name: "Certified Ethical Hacker (CEH) Exam Voucher",
    description: "100% covered exam voucher code for official EC-Council CEH certification.",
    xpCost: 10000,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80",
    category: "Certifications",
  },
  {
    id: "rew_4",
    name: "Cybersecurity Desk Mat & RGB Mousepad",
    description: "Extra large anti-slip water-resistant LED desk mat with custom terminal print.",
    xpCost: 1500,
    quantity: 20,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400&auto=format&fit=crop&q=80",
    category: "Accessories",
  },
];

export const adminStats = {
  totalUsers: 1420,
  activeUsers: 890,
  totalArticles: 48,
  totalChallenges: 36,
  totalXpAwarded: 1845000,
  challengesCompleted: 5820,
  rewardsRedeemed: 142,
  userGrowthData: [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 420 },
    { month: "Mar", users: 680 },
    { month: "Apr", users: 910 },
    { month: "May", users: 1150 },
    { month: "Jun", users: 1420 },
  ],
  xpDistribution: [
    { category: "Web Sec", xp: 520000 },
    { category: "Network", xp: 380000 },
    { category: "Crypto", xp: 310000 },
    { category: "Ethical Hacking", xp: 440000 },
    { category: "Incident Resp", xp: 195000 },
  ],
};

export const activityLogs = [
  { id: "act_1", action: "Completed Challenge", title: "Bypass the Broken Auth Portal", xp: 200, timestamp: "2 hours ago" },
  { id: "act_2", action: "Read Article", title: "Demystifying Cross-Site Scripting (XSS)", xp: 250, timestamp: "Yesterday" },
  { id: "act_3", action: "Unlocked Achievement", title: "7-Day Streak Master", xp: 300, timestamp: "Yesterday" },
  { id: "act_4", action: "Daily Check-in", title: "Maintained 7-Day Streak", xp: 50, timestamp: "Today" },
];
