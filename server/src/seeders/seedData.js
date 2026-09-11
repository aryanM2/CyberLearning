import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Article from '../models/Article.js';
import Challenge from '../models/Challenge.js';

dotenv.config();

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

    console.log('[Seeder] Database seeding completed successfully.');
    if (process.argv[1].endsWith('seedData.js')) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seeder Error]', error.message);
    if (process.argv[1].endsWith('seedData.js')) {
      process.exit(1);
    }
  }
};

if (process.argv[1].endsWith('seedData.js')) {
  seedDB();
}
