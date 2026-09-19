import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Article from '../models/Article.js';
import Challenge from '../models/Challenge.js';
import Achievement from '../models/Achievement.js';
import Reward from '../models/Reward.js';
import User from '../models/User.js';

dotenv.config();

const initialUsers = [
  {
    name: 'System Admin',
    email: 'admin@nextgen-sec.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SystemAdmin',
    bio: 'Cybersecurity Operations & Security Lead',
    xp: 2500,
    level: 10,
    streak: 14,
  },
  {
    name: 'Alex Vance',
    email: 'alex.vance@nextgen-sec.com',
    password: 'user123',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexVance',
    bio: 'Junior Security Researcher & SOC Apprentice',
    xp: 450,
    level: 3,
    streak: 5,
  },
];

const initialCategories = [
  { name: 'Network Security', slug: 'network-security', description: 'Firewalls, IDS/IPS, VPNs, packet analysis and architecture', icon: 'Network' },
  { name: 'Web Security', slug: 'web-security', description: 'OWASP Top 10, XSS, SQLi, CSRF, auth vulnerabilities', icon: 'Globe' },
  { name: 'Cryptography', slug: 'cryptography', description: 'Symmetric/asymmetric encryption, hashing, PKI, digital signatures', icon: 'Key' },
  { name: 'Defensive Security', slug: 'defensive-security', description: 'SIEM, log analysis, threat hunting, incident response', icon: 'Shield' },
  { name: 'Offensive Security', slug: 'offensive-security', description: 'Penetration testing, exploitation, privilege escalation', icon: 'Terminal' },
  { name: 'Cloud Security', slug: 'cloud-security', description: 'IAM, AWS/Azure hardening, container security, zero trust', icon: 'Cloud' },
];

const initialArticles = [
  {
    title: 'Understanding OWASP Top 10 Security Risks',
    slug: 'understanding-owasp-top-10',
    category: 'Web Security',
    difficulty: 'Beginner',
    readTime: '8 min read',
    xpReward: 50,
    excerpt: 'Comprehensive deep dive into Injection, Broken Auth, Sensitive Data Exposure and modern mitigations.',
    content: `## What is the OWASP Top 10?
The Open Web Application Security Project (OWASP) Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks facing web applications today.

### 1. Broken Access Control
Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data.

### 2. Cryptographic Failures
Focuses on failures related to cryptography which often leads to sensitive data exposure or system compromise.

### 3. Injection
Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.

### Remediation Strategies
- Enforce strict parameterization on database queries.
- Implement robust input validation & output encoding.
- Enforce multi-factor authentication (MFA) and secure session cookies.`,
    tags: ['OWASP', 'Web', 'Security'],
    author: 'CyberLearning Team',
  },
  {
    title: 'Introduction to Modern Cryptography & Hashing',
    slug: 'intro-to-cryptography-hashing',
    category: 'Cryptography',
    difficulty: 'Beginner',
    readTime: '10 min read',
    xpReward: 60,
    excerpt: 'Explore symmetric encryption, asymmetric key pairs (RSA/ECC), and cryptographic hash functions.',
    content: `## Hashing vs Encryption
Cryptography forms the backbone of digital security. Understanding the core difference between hashing and encryption is essential for modern security engineers.

### Cryptographic Hash Functions
Hash functions such as SHA-256 and Argon2 are one-way mathematical algorithms that transform arbitrary input data into a fixed-length string.

### Symmetric Encryption
Uses the exact same secret key for both encryption and decryption (e.g., AES-256-GCM).

### Asymmetric Encryption
Uses a public key for encryption and a private key for decryption (e.g., RSA, ECC).`,
    tags: ['Crypto', 'SHA256', 'AES'],
    author: 'Dr. Sarah Connor',
  },
  {
    title: 'Wireshark Packet Analysis & Network Forensics',
    slug: 'wireshark-packet-analysis',
    category: 'Network Security',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    xpReward: 75,
    excerpt: 'Master PCAP inspection, display filters, TCP handshake analysis, and malware traffic extraction.',
    content: `## Packet Capture Fundamentals
Wireshark is the world's foremost network protocol analyzer. It lets you see what is happening on your network at a microscopic level.

### Key Display Filters
- \`ip.addr == 192.168.1.1\`
- \`tcp.flags.syn == 1 && tcp.flags.ack == 0\`
- \`http.request.method == "POST"\`

### Analyzing TCP Handshakes
A standard 3-way handshake consists of SYN, SYN-ACK, and ACK packets. Missing ACK packets often indicate port scanning or SYN flood attacks.`,
    tags: ['Wireshark', 'PCAP', 'Network'],
    author: 'Alex Vance',
  },
  {
    title: 'Incident Response & SIEM Log Correlation',
    slug: 'incident-response-siem-logs',
    category: 'Defensive Security',
    difficulty: 'Intermediate',
    readTime: '15 min read',
    xpReward: 80,
    excerpt: 'Learn PICERL incident response phases and build detection rules in Splunk / Elastic Security.',
    content: `## The PICERL Framework
1. **Preparation:** Hardening assets and setting up logging.
2. **Identification:** Detecting anomalous behavior via SIEM alerts.
3. **Containment:** Isolating infected endpoints from the subnet.
4. **Eradication:** Removing malware artifacts and persistent backdoors.
5. **Recovery:** Restoring services safely.
6. **Lessons Learned:** Updating playbooks.`,
    tags: ['SIEM', 'SOC', 'Incident Response'],
    author: 'Elena Rostova',
  },
];

const initialChallenges = [
  {
    title: 'SQL Injection Flag Extraction',
    description: 'An vulnerable login form is leaking user hash values. Bypass the authentication filter using SQLi and extract the secret admin flag.',
    category: 'Web Security',
    difficulty: 'Easy',
    type: 'flag',
    xpReward: 100,
    flagSolution: 'FLAG{SQLi_3xpL01t_Master}',
    hint: 'Try standard OR 1=1 payload in the username parameter: admin\' OR \'1\'=\'1',
  },
  {
    title: 'Wireshark PCAP HTTP Traffic Analysis',
    description: 'Which HTTP method was used by the attacker to exfiltrate database records according to the captured PCAP file?',
    category: 'Network Security',
    difficulty: 'Easy',
    type: 'mcq',
    xpReward: 75,
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctOption: 1,
    hint: 'Look for requests sending payload data in the HTTP body.',
  },
  {
    title: 'Cracking MD5 Password Hashes',
    description: 'Identify the plain-text password corresponding to the MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99',
    category: 'Cryptography',
    difficulty: 'Medium',
    type: 'flag',
    xpReward: 125,
    flagSolution: 'password',
    hint: 'This is the most common default password hash in rainbow tables.',
  },
  {
    title: 'Defensive Incident Scenario: Ransomware Outbreak',
    description: 'A workstation reports encrypted files with .locked extension and abnormal outbound SMB connections to 10.0.0.45. What is the immediate first incident response step?',
    category: 'Defensive Security',
    difficulty: 'Medium',
    type: 'mcq',
    xpReward: 150,
    options: [
      'Reformat the hard drive immediately',
      'Isolate the compromised machine from the network',
      'Pay the ransom to retrieve decryption keys',
      'Email all employees warning them about phish'
    ],
    correctOption: 1,
    hint: 'Containment is crucial to prevent lateral movement of malware.',
  },
];

const initialAchievements = [
  {
    title: 'First Step into Cyber',
    description: 'Read your first cybersecurity article',
    icon: 'BookOpen',
    category: 'Learning',
    xpReward: 50,
    requirementType: 'articles_read',
    requirementThreshold: 1,
  },
  {
    title: 'Avid Reader',
    description: 'Read 5 cybersecurity articles',
    icon: 'Award',
    category: 'Learning',
    xpReward: 150,
    requirementType: 'articles_read',
    requirementThreshold: 5,
  },
  {
    title: 'Lab Breaker',
    description: 'Solve your first cybersecurity lab challenge',
    icon: 'Terminal',
    category: 'Challenges',
    xpReward: 100,
    requirementType: 'challenges_solved',
    requirementThreshold: 1,
  },
  {
    title: 'Security Operator',
    description: 'Solve 5 lab challenges',
    icon: 'Shield',
    category: 'Challenges',
    xpReward: 250,
    requirementType: 'challenges_solved',
    requirementThreshold: 5,
  },
  {
    title: 'Streak Starter',
    description: 'Maintain a 3-day active streak',
    icon: 'Flame',
    category: 'Streak',
    xpReward: 100,
    requirementType: 'streak_days',
    requirementThreshold: 3,
  },
  {
    title: 'XP Pioneer',
    description: 'Accumulate 500 total XP',
    icon: 'Zap',
    category: 'XP',
    xpReward: 200,
    requirementType: 'total_xp',
    requirementThreshold: 500,
  },
];

const initialRewards = [
  {
    title: '$15 HackTheBox Gift Voucher',
    description: 'Voucher valid for HTB VIP subscription or lab credits.',
    icon: 'Gift',
    xpCost: 300,
    category: 'Voucher',
    stock: 15,
    codeFormat: 'HTB-CYBER-XXXX-9921',
  },
  {
    title: 'CyberLearning Official Sticker Pack',
    description: 'Limited edition holographic cybersecurity laptop stickers.',
    icon: 'Package',
    xpCost: 200,
    category: 'Merch',
    stock: 50,
    codeFormat: 'STK-PACK-2026',
  },
  {
    title: 'CyberOps Exclusive Black Hoodie',
    description: 'Premium embroidered security analyst hoodie (Sizes M, L, XL).',
    icon: 'Shirt',
    xpCost: 1000,
    category: 'Merch',
    stock: 5,
    codeFormat: 'HOODIE-RED-XXXX-001',
  },
  {
    title: 'CompTIA Security+ Exam Discount Coupon',
    description: '20% off voucher for CompTIA Security+ SY0-701 certification exam.',
    icon: 'Award',
    xpCost: 800,
    category: 'Certification',
    stock: 10,
    codeFormat: 'COMPTIA-20OFF-SEC701',
  },
];

export const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cyberlearning');
    console.log('[Seeder] Connected to MongoDB');

    // Seed Categories
    for (const cat of initialCategories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }
    console.log(`[Seeder] Seeded ${initialCategories.length} categories.`);

    // Seed Articles
    for (const art of initialArticles) {
      await Article.findOneAndUpdate({ slug: art.slug }, art, { upsert: true, new: true });
    }
    console.log(`[Seeder] Seeded ${initialArticles.length} articles.`);

    // Seed Challenges
    for (const ch of initialChallenges) {
      await Challenge.findOneAndUpdate({ title: ch.title }, ch, { upsert: true, new: true });
    }
    console.log(`[Seeder] Seeded ${initialChallenges.length} challenges.`);

    // Seed Achievements
    for (const ach of initialAchievements) {
      await Achievement.findOneAndUpdate({ title: ach.title }, ach, { upsert: true, new: true });
    }
    console.log(`[Seeder] Seeded ${initialAchievements.length} achievements.`);

    // Seed Rewards
    for (const rw of initialRewards) {
      await Reward.findOneAndUpdate({ title: rw.title }, rw, { upsert: true, new: true });
    }
    console.log(`[Seeder] Seeded ${initialRewards.length} rewards.`);

    // Seed Users
    for (const u of initialUsers) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        await User.create(u);
      }
    }
    console.log(`[Seeder] Seeded ${initialUsers.length} default users.`);

    console.log('[Seeder] Database seeding completed successfully.');
    if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seeder Error]', error.message);
    if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
      process.exit(1);
    }
  }
};

if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  seedDB();
}

