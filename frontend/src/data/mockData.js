export const INITIAL_PARTNERS = [
  {
    id: 'partner-1',
    name: 'Lego Content Partner',
    logo: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80',
    contractType: 'Revenue Share',
    revSharePercentage: 70,
    totalSeries: 4,
    activeEpisodes: 84,
    totalEarnings: 845200,
    pendingPayout: 124500,
    payoutStatus: 'Pending',
    contactEmail: 'partner@legomedia.in',
    contactPhone: '+91 98200 11223',
    joinedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 'partner-2',
    name: 'Red Chillies OTT Labs',
    logo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=120&auto=format&fit=crop&q=80',
    contractType: 'Revenue Share',
    revSharePercentage: 65,
    totalSeries: 6,
    activeEpisodes: 140,
    totalEarnings: 1420900,
    pendingPayout: 310000,
    payoutStatus: 'Pending',
    contactEmail: 'business@redchillies.com',
    contactPhone: '+91 98110 99887',
    joinedDate: '2023-11-20',
    status: 'active'
  },
  {
    id: 'partner-3',
    name: 'Pocket Cinema Originals',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    contractType: 'Co-Production',
    revSharePercentage: 60,
    totalSeries: 8,
    activeEpisodes: 220,
    totalEarnings: 980400,
    pendingPayout: 85000,
    payoutStatus: 'Paid',
    contactEmail: 'creators@pocketcinema.tv',
    contactPhone: '+91 97665 44332',
    joinedDate: '2024-02-01',
    status: 'active'
  },
  {
    id: 'partner-4',
    name: 'Starlight Vertical Studios',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=120&auto=format&fit=crop&q=80',
    contractType: 'Fixed License',
    revSharePercentage: 50,
    totalSeries: 3,
    activeEpisodes: 60,
    totalEarnings: 450000,
    pendingPayout: 0,
    payoutStatus: 'Paid',
    contactEmail: 'accounts@starlight.co',
    contactPhone: '+91 98234 56789',
    joinedDate: '2024-03-10',
    status: 'active'
  }
];

export const INITIAL_SERIES = [
  {
    id: 'series-1',
    title: 'Squid Game 3',
    slug: 'squid-game-3',
    coverVertical: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    genre: ['Romantic', 'Thriller', 'Survival', 'High Stakes'],
    description: '456 desperate people deep in debt are taken to a secret island to compete in lethal playground games for a multi-billion won prize. But the newest edition has deadly emotional twists.',
    totalEpisodes: 30,
    publishedEpisodesCount: 10,
    releaseYear: 2025,
    rating: 4.9,
    ageRating: '18+',
    trendingRank: 1,
    isFeatured: true,
    isNewRelease: true,
    isPopular: true,
    partnerId: 'partner-1',
    partnerName: 'Lego Content Partner',
    partnerLogo: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80',
    status: 'published',
    viewsCount: 954000,
    revenueTotal: 684000,
    director: 'Hwang Dong-hyuk (Vertical Cut)',
    cast: ['Lee Jung-jae', 'Lee Byung-hun', 'Wi Ha-jun'],
    episodes: [
      {
        id: 'ep-1-1',
        seriesId: 'series-1',
        epNumber: 1,
        title: 'Red Light, Green Light 2.0',
        synopsis: '456 desperate contestants wake up in the infamous dormitory. The stakes are instantly fatal.',
        durationSeconds: 138,
        durationFormatted: '02:18',
        thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        isFree: true,
        costInCoins: 0,
        views: 450000,
        likes: 38200,
        shares: 12400,
        status: 'published',
        publishedAt: '2025-01-10'
      },
      {
        id: 'ep-1-2',
        seriesId: 'series-1',
        epNumber: 2,
        title: 'The Golden Umbrella Choice',
        synopsis: 'Contestants face the sugar honeycomb carving challenge with unexpected time penalties.',
        durationSeconds: 184,
        durationFormatted: '03:04',
        thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        isFree: true,
        costInCoins: 0,
        views: 310000,
        likes: 29000,
        shares: 8900,
        status: 'published',
        publishedAt: '2025-01-11'
      },
      {
        id: 'ep-1-3',
        seriesId: 'series-1',
        epNumber: 3,
        title: 'Midnight Dormitory Riot',
        synopsis: 'Lights go out and alliances form under the ruthless night curfew.',
        durationSeconds: 195,
        durationFormatted: '03:15',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        isFree: false,
        costInCoins: 5,
        views: 220000,
        likes: 21500,
        shares: 5400,
        status: 'published',
        publishedAt: '2025-01-12'
      },
      {
        id: 'ep-1-4',
        seriesId: 'series-1',
        epNumber: 4,
        title: 'Tug of War on the Skybridge',
        synopsis: 'A brutal test of strength and strategy 100 feet in the air.',
        durationSeconds: 210,
        durationFormatted: '03:30',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        isFree: false,
        costInCoins: 5,
        views: 185000,
        likes: 19800,
        shares: 4300,
        status: 'published',
        publishedAt: '2025-01-13'
      },
      {
        id: 'ep-1-5',
        seriesId: 'series-1',
        epNumber: 5,
        title: 'The Glass Stepping Steels',
        synopsis: 'Normal vs tempered glass. Every step could be your final descent.',
        durationSeconds: 240,
        durationFormatted: '04:00',
        thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        isFree: false,
        costInCoins: 5,
        views: 160000,
        likes: 17400,
        shares: 3800,
        status: 'published',
        publishedAt: '2025-01-14'
      }
    ]
  },
  {
    id: 'series-2',
    title: 'Shadows of Enigma',
    slug: 'shadows-of-enigma',
    coverVertical: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    genre: ['Crime', 'Mafia', 'Period Drama', 'Suspense'],
    description: 'In 1920s London underground syndicates, an undercover detective risks his family identity to dismantle the Shelby syndicate from inside.',
    totalEpisodes: 24,
    publishedEpisodesCount: 16,
    releaseYear: 2024,
    rating: 4.8,
    ageRating: '16+',
    trendingRank: 2,
    isFeatured: true,
    isNewRelease: false,
    isPopular: true,
    partnerId: 'partner-2',
    partnerName: 'Red Chillies OTT Labs',
    status: 'published',
    viewsCount: 780000,
    revenueTotal: 520000,
    director: 'Steven Knight (Vertical Cut)',
    cast: ['Cillian M.', 'Tom H.', 'Anya T.'],
    episodes: []
  },
  {
    id: 'series-3',
    title: 'The Final Clue',
    slug: 'the-final-clue',
    coverVertical: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    genre: ['Mystery', 'Detective', 'Noir', 'Psychological'],
    description: 'A missing billionaire, a burnt pocket watch, and three suspect heirs in a locked countryside mansion.',
    totalEpisodes: 18,
    publishedEpisodesCount: 12,
    releaseYear: 2025,
    rating: 4.7,
    ageRating: '13+',
    trendingRank: 3,
    isFeatured: true,
    isNewRelease: false,
    isPopular: true,
    partnerId: 'partner-3',
    partnerName: 'Pocket Cinema Originals',
    status: 'published',
    viewsCount: 620000,
    revenueTotal: 390000,
    director: 'Guy Ritchie Labs',
    cast: ['Robert D.', 'Jude L.'],
    episodes: []
  },
  {
    id: 'series-4',
    title: 'Sherlock Holmes: The Silent City',
    slug: 'sherlock-holmes-silent-city',
    coverVertical: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
    genre: ['Detective', 'Investigation', 'Classic'],
    description: 'Baker Street comes alive in vertical 9:16 cinematography as Holmes decodes London’s biggest heist.',
    totalEpisodes: 12,
    publishedEpisodesCount: 8,
    releaseYear: 2025,
    rating: 4.9,
    ageRating: '13+',
    isFeatured: false,
    isNewRelease: true,
    isPopular: true,
    partnerId: 'partner-1',
    partnerName: 'Lego Content Partner',
    status: 'published',
    viewsCount: 430000,
    revenueTotal: 290000,
    director: 'Arthur Conan Studio',
    cast: ['Benedict C.', 'Martin F.'],
    episodes: []
  },
  {
    id: 'series-5',
    title: 'Custody: 48 Hours',
    slug: 'custody-48-hours',
    coverVertical: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&auto=format&fit=crop&q=80',
    genre: ['Police Procedural', 'Action', 'Thriller'],
    description: 'A constable must escort a key witness to the supreme court while being hunted by corrupt task force officers.',
    totalEpisodes: 15,
    publishedEpisodesCount: 15,
    releaseYear: 2024,
    rating: 4.6,
    ageRating: '16+',
    isFeatured: false,
    isNewRelease: true,
    isPopular: false,
    partnerId: 'partner-2',
    partnerName: 'Red Chillies OTT Labs',
    status: 'published',
    viewsCount: 380000,
    revenueTotal: 245000,
    director: 'Venkat P.',
    cast: ['Naga Chaitanya', 'Krithi Shetty', 'Arvind Swami'],
    episodes: []
  },
  {
    id: 'series-6',
    title: 'Salute',
    slug: 'salute',
    coverVertical: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    genre: ['Crime Investigation', 'Drama'],
    description: 'An idealistic SI on voluntary leave unravels an unsolved framing case that stains his brother’s honor.',
    totalEpisodes: 20,
    publishedEpisodesCount: 10,
    releaseYear: 2024,
    rating: 4.8,
    ageRating: '16+',
    isFeatured: false,
    isNewRelease: true,
    isPopular: true,
    partnerId: 'partner-3',
    partnerName: 'Pocket Cinema Originals',
    status: 'published',
    viewsCount: 510000,
    revenueTotal: 340000,
    director: 'Rosshan Andrrews',
    cast: ['Dulquer Salmaan', 'Diana Penty', 'Manoj K. Jayan'],
    episodes: []
  },
  {
    id: 'series-7',
    title: 'Cold Case: The Skull',
    slug: 'cold-case-the-skull',
    coverVertical: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    genre: ['Supernatural Thriller', 'Horror', 'Mystery'],
    description: 'An ACP investigates a murder through forensic science while a paranormal researcher approaches it with occult rituals.',
    totalEpisodes: 16,
    publishedEpisodesCount: 16,
    releaseYear: 2024,
    rating: 4.7,
    ageRating: '18+',
    isFeatured: false,
    isNewRelease: false,
    isPopular: true,
    partnerId: 'partner-4',
    partnerName: 'Starlight Vertical Studios',
    status: 'published',
    viewsCount: 490000,
    revenueTotal: 310000,
    director: 'Tanu Balak',
    cast: ['Prithviraj Sukumaran', 'Aditi Balan', 'Lakshmi Priyaa'],
    episodes: []
  },
  {
    id: 'series-8',
    title: 'Youth Blindfold',
    slug: 'youth-blindfold',
    coverVertical: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    bannerHorizontal: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    genre: ['Psychological', 'Youth Drama', 'Romance'],
    description: 'Three medical students explore sensory deprivation experiments that uncover forbidden memories and hidden obsessions.',
    totalEpisodes: 14,
    publishedEpisodesCount: 14,
    releaseYear: 2025,
    rating: 4.6,
    ageRating: '18+',
    isFeatured: false,
    isNewRelease: false,
    isPopular: true,
    partnerId: 'partner-2',
    partnerName: 'Red Chillies OTT Labs',
    status: 'published',
    viewsCount: 360000,
    revenueTotal: 220000,
    director: 'Maya Rao',
    cast: ['Arjun Mathur', 'Sobhita Dhulipala'],
    episodes: []
  }
];

export const INITIAL_PLANS = [
  {
    id: 'plan-1',
    name: 'Watch Ad Free',
    badge: 'Most Popular',
    price: 5,
    originalPrice: 15,
    durationDays: 1,
    description: 'Go Ad-Free for just ₹5 - Enjoy Series for next 7 Days without interruptions',
    features: [
      '100% Zero Video Ads',
      'Full 1080p Full HD Vertical Stream',
      'Instant Next-Episode Autoplay',
      'No Auto-Debit / No recurring fees',
      'Valid for 7 Days on this Series'
    ],
    isAdFree: true,
    hasLimitedAds: false,
    isMostPopular: true,
    isBestExperience: true,
    isActive: true,
    autoDebitSupported: false,
    subscribersCount: 48920
  },
  {
    id: 'plan-2',
    name: 'Watch with Limited Ads',
    badge: 'Saver Pass',
    price: 3,
    originalPrice: 10,
    durationDays: 1,
    description: 'Continue Watching with Minimal Short Ads for just ₹3',
    features: [
      'Limited 5-second bumper ads only',
      '720p HD Quality',
      'Unlock Next 5 Locked Episodes',
      'No auto-debit requirement'
    ],
    isAdFree: false,
    hasLimitedAds: true,
    isMostPopular: false,
    isBestExperience: false,
    isActive: true,
    autoDebitSupported: false,
    subscribersCount: 31200
  },
  {
    id: 'plan-3',
    name: '7-Day All-Series Pass',
    badge: 'Binge Special',
    price: 29,
    originalPrice: 79,
    durationDays: 7,
    description: 'Unlock ALL series on Storiyan for a whole week ad-free',
    features: [
      'Unlimited access to all 50+ series',
      'Ad-Free Ultra HD stream',
      'Early access to new weekly releases',
      'VIP badge in comments & reactions'
    ],
    isAdFree: true,
    hasLimitedAds: false,
    isMostPopular: false,
    isBestExperience: false,
    isActive: true,
    autoDebitSupported: true,
    subscribersCount: 14500
  },
  {
    id: 'plan-4',
    name: 'Monthly VIP Master Pass',
    badge: 'Ultimate Value',
    price: 99,
    originalPrice: 199,
    durationDays: 30,
    description: '30 Days of limitless vertical drama streaming + 100 bonus creator coins',
    features: [
      'Unlimited viewing across all series',
      'Download episodes for offline watch',
      '100 Bonus Coins for creator gifts',
      'Priority customer support'
    ],
    isAdFree: true,
    hasLimitedAds: false,
    isMostPopular: false,
    isBestExperience: false,
    isActive: true,
    autoDebitSupported: true,
    subscribersCount: 8920
  }
];

export const INITIAL_SUBSCRIBED_USERS = [
  {
    id: 'sub-101',
    userId: 'usr-1',
    userName: 'Aarav Sharma',
    userPhone: '+91 98765 43210',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-1',
    planName: 'Watch Ad Free (₹5)',
    amountPaid: 5,
    paymentMethod: 'PhonePe',
    startDate: '2025-02-28',
    expiryDate: '2025-03-07',
    status: 'active',
    autoDebit: false
  },
  {
    id: 'sub-102',
    userId: 'usr-2',
    userName: 'Priya Patel',
    userPhone: '+91 98221 54321',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-1',
    planName: 'Watch Ad Free (₹5)',
    amountPaid: 5,
    paymentMethod: 'UPI',
    startDate: '2025-03-01',
    expiryDate: '2025-03-08',
    status: 'active',
    autoDebit: false
  },
  {
    id: 'sub-103',
    userId: 'usr-3',
    userName: 'Rohan Deshmukh',
    userPhone: '+91 97665 11223',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-3',
    planName: '7-Day All-Series Pass (₹29)',
    amountPaid: 29,
    paymentMethod: 'PhonePe',
    startDate: '2025-02-27',
    expiryDate: '2025-03-06',
    status: 'active',
    autoDebit: true
  },
  {
    id: 'sub-104',
    userId: 'usr-4',
    userName: 'Ananya Verma',
    userPhone: '+91 99100 88776',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-4',
    planName: 'Monthly VIP Master Pass (₹99)',
    amountPaid: 99,
    paymentMethod: 'GooglePay',
    startDate: '2025-02-15',
    expiryDate: '2025-03-17',
    status: 'active',
    autoDebit: true
  },
  {
    id: 'sub-105',
    userId: 'usr-5',
    userName: 'Vikramaditya Roy',
    userPhone: '+91 98450 67890',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-2',
    planName: 'Watch with Limited Ads (₹3)',
    amountPaid: 3,
    paymentMethod: 'Paytm',
    startDate: '2025-03-02',
    expiryDate: '2025-03-03',
    status: 'active',
    autoDebit: false
  },
  {
    id: 'sub-106',
    userId: 'usr-6',
    userName: 'Sneha Kapoor',
    userPhone: '+91 97112 33445',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    planId: 'plan-1',
    planName: 'Watch Ad Free (₹5)',
    amountPaid: 5,
    paymentMethod: 'PhonePe',
    startDate: '2025-02-25',
    expiryDate: '2025-03-04',
    status: 'expiring_soon',
    autoDebit: false
  }
];

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    tier: '₹5 Ad-Free VIP',
    walletCoins: 45,
    totalSpent: 125,
    watchTimeMinutes: 480,
    savedSeriesIds: ['series-1', 'series-2'],
    historyCount: 18,
    status: 'active',
    joinedDate: '2024-12-05',
    lastActive: '2 mins ago',
    deviceInfo: 'iPhone 15 Pro / iOS 17.4',
    ipAddress: '49.36.120.88 (Mumbai, IN)'
  },
  {
    id: 'usr-2',
    name: 'Priya Patel',
    phone: '+91 98221 54321',
    email: 'priya.patel@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    tier: '₹5 Ad-Free VIP',
    walletCoins: 20,
    totalSpent: 85,
    watchTimeMinutes: 340,
    savedSeriesIds: ['series-1', 'series-3'],
    historyCount: 12,
    status: 'active',
    joinedDate: '2025-01-02',
    lastActive: '10 mins ago',
    deviceInfo: 'Samsung S24 Ultra / Android 14',
    ipAddress: '103.21.144.12 (Ahmedabad, IN)'
  },
  {
    id: 'usr-3',
    name: 'Rohan Deshmukh',
    phone: '+91 97665 11223',
    email: 'rohan.desh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    tier: '7-Day Pass',
    walletCoins: 110,
    totalSpent: 320,
    watchTimeMinutes: 940,
    savedSeriesIds: ['series-1', 'series-2', 'series-4', 'series-6'],
    historyCount: 42,
    status: 'active',
    joinedDate: '2024-10-18',
    lastActive: 'Just now',
    deviceInfo: 'OnePlus 12 / OxygenOS 14',
    ipAddress: '157.34.89.201 (Pune, IN)'
  },
  {
    id: 'usr-4',
    name: 'Ananya Verma',
    phone: '+91 99100 88776',
    email: 'ananya.v@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    tier: 'Monthly VIP',
    walletCoins: 250,
    totalSpent: 540,
    watchTimeMinutes: 1420,
    savedSeriesIds: ['series-1', 'series-2', 'series-5'],
    historyCount: 65,
    status: 'active',
    joinedDate: '2024-08-12',
    lastActive: '1 hour ago',
    deviceInfo: 'iPhone 14 / iOS 17.2',
    ipAddress: '122.161.50.4 (New Delhi, IN)'
  },
  {
    id: 'usr-5',
    name: 'Vikramaditya Roy',
    phone: '+91 98450 67890',
    email: 'vikram.roy@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tier: '₹3 Pass',
    walletCoins: 0,
    totalSpent: 18,
    watchTimeMinutes: 110,
    savedSeriesIds: ['series-1'],
    historyCount: 5,
    status: 'active',
    joinedDate: '2025-02-20',
    lastActive: '5 hours ago',
    deviceInfo: 'Redmi Note 13 / HyperOS',
    ipAddress: '115.111.90.33 (Bengaluru, IN)'
  },
  {
    id: 'usr-6',
    name: 'Sneha Kapoor',
    phone: '+91 97112 33445',
    email: 'sneha.k@hotmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    tier: '₹5 Ad-Free VIP',
    walletCoins: 15,
    totalSpent: 65,
    watchTimeMinutes: 290,
    savedSeriesIds: ['series-2', 'series-7'],
    historyCount: 14,
    status: 'active',
    joinedDate: '2025-01-14',
    lastActive: '3 hours ago',
    deviceInfo: 'Vivo X100 / FuntouchOS 14',
    ipAddress: '106.215.8.44 (Chandigarh, IN)'
  },
  {
    id: 'usr-7',
    name: 'Karan Malhotra (Flagged)',
    phone: '+91 98200 00099',
    email: 'bot_karan@tempmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    tier: 'Free User',
    walletCoins: 0,
    totalSpent: 0,
    watchTimeMinutes: 15,
    savedSeriesIds: [],
    historyCount: 2,
    status: 'banned',
    joinedDate: '2025-02-28',
    lastActive: '2 days ago',
    deviceInfo: 'Emulated Device / Android 9',
    ipAddress: '185.220.101.5 (Tor Exit Node)'
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'txn-1001',
    orderId: 'ORD_ST_889211',
    userId: 'usr-1',
    userName: 'Aarav Sharma',
    userPhone: '+91 98765 43210',
    type: 'Plan Purchase',
    planOrItem: 'Watch Ad Free (₹5)',
    amount: 5,
    gateway: 'PhonePe',
    paymentStatus: 'SUCCESS',
    timestamp: '2025-03-03 15:42:10'
  },
  {
    id: 'txn-1002',
    orderId: 'ORD_ST_889210',
    userId: 'usr-2',
    userName: 'Priya Patel',
    userPhone: '+91 98221 54321',
    type: 'Plan Purchase',
    planOrItem: 'Watch Ad Free (₹5)',
    amount: 5,
    gateway: 'UPI',
    paymentStatus: 'SUCCESS',
    timestamp: '2025-03-03 15:38:45'
  },
  {
    id: 'txn-1003',
    orderId: 'ORD_ST_889209',
    userId: 'usr-3',
    userName: 'Rohan Deshmukh',
    userPhone: '+91 97665 11223',
    type: 'Plan Purchase',
    planOrItem: '7-Day All-Series Pass (₹29)',
    amount: 29,
    gateway: 'PhonePe',
    paymentStatus: 'SUCCESS',
    timestamp: '2025-03-03 15:20:12'
  },
  {
    id: 'txn-1004',
    orderId: 'ORD_ST_889208',
    userId: 'usr-5',
    userName: 'Vikramaditya Roy',
    userPhone: '+91 98450 67890',
    type: 'Plan Purchase',
    planOrItem: 'Watch with Limited Ads (₹3)',
    amount: 3,
    gateway: 'Paytm',
    paymentStatus: 'SUCCESS',
    timestamp: '2025-03-03 14:55:00'
  },
  {
    id: 'txn-1005',
    orderId: 'ORD_ST_889207',
    userId: 'usr-4',
    userName: 'Ananya Verma',
    userPhone: '+91 99100 88776',
    type: 'Coin Pack',
    planOrItem: '100 Bonus Coins Pack (₹49)',
    amount: 49,
    gateway: 'GooglePay',
    paymentStatus: 'SUCCESS',
    timestamp: '2025-03-03 14:12:30'
  },
  {
    id: 'txn-1006',
    orderId: 'ORD_ST_889206',
    userId: 'usr-8',
    userName: 'Deepak Chopra',
    userPhone: '+91 98330 11990',
    type: 'Plan Purchase',
    planOrItem: 'Watch Ad Free (₹5)',
    amount: 5,
    gateway: 'PhonePe',
    paymentStatus: 'FAILED',
    timestamp: '2025-03-03 13:40:18'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '🔥 Squid Game Season 3: Episode 4 is OUT!',
    body: 'Tug of War on the Skybridge is now live! Watch ad-free for just ₹5 on Storiyan.',
    audience: 'All Users',
    targetRoute: '/series/squid-game-3/ep-4',
    seriesId: 'series-1',
    mediaUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
    sentAt: '2025-03-03 12:00 PM',
    status: 'sent',
    totalDelivered: 142000,
    openRate: 28.4,
    clickRate: 14.8
  },
  {
    id: 'notif-2',
    title: '⏳ Your ₹5 Ad-Free Pass expires tonight!',
    body: 'Binge the finale of Shadows of Enigma before your pass ends. Tap to extend.',
    audience: 'Active Subscribers',
    targetRoute: '/subscription-plans',
    sentAt: '2025-03-02 08:30 PM',
    status: 'sent',
    totalDelivered: 38400,
    openRate: 41.2,
    clickRate: 22.6
  },
  {
    id: 'notif-3',
    title: '🎬 New Crime Series: Sherlock Holmes London 1920',
    body: 'Step into Baker Street in high-definition vertical video. Ep 1 is 100% free!',
    audience: 'Free Drop-Off Users',
    targetRoute: '/series/sherlock-holmes-silent-city',
    seriesId: 'series-4',
    scheduledAt: '2025-03-04 06:00 PM',
    status: 'scheduled',
    totalDelivered: 0,
    openRate: 0,
    clickRate: 0
  }
];

export const INITIAL_LEGAL_DOCS = [
  {
    id: 'doc-privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'March 1, 2025',
    isPublished: true,
    author: 'Legal & Compliance Team',
    contentMarkdown: `# Privacy Policy for Storiyan Vertical OTT

**Effective Date:** March 1, 2025

Welcome to **Storiyan** ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy.

### 1. Information We Collect
- **Account Information:** Mobile phone number for OTP verification, profile name, preferred avatar.
- **Payment & Transaction Details:** Orders processed securely via RBI-compliant gateways (PhonePe, UPI, Paytm). We do not store raw card CVV or banking credentials.
- **Usage & Streaming Data:** Episodes watched, video completion timestamps, playback resolution, bookmarks, and favorite genres to enhance personalized recommendations.

### 2. How We Use Your Information
- To authenticate your session and enable seamless vertical playback.
- To manage active micro-passes (e.g. ₹5 Ad-Free and ₹3 Saver passes).
- To prevent digital piracy, unauthorized stream extraction, and platform abuse.
- To send relevant push notifications regarding newly released episodes and expiring passes.

### 3. Data Protection & Security
All video stream handshakes use HTTPS with end-to-end tokenized CDN delivery. Payment transactions are processed with 256-bit SSL encryption.

### 4. Contact Us Regarding Privacy
If you have any questions or data deletion requests, email us at **privacy@storiyan.tv**.`
  },
  {
    id: 'doc-terms',
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    lastUpdated: 'February 20, 2025',
    isPublished: true,
    author: 'Chief Legal Officer',
    contentMarkdown: `# Terms & Conditions of Service

**Last Updated:** February 20, 2025

Please read these Terms carefully before using the Storiyan application and website services.

### 1. Micro-Passes & Subscription Licensing
- **Ad-Free Pass (₹5):** Grants ad-free access to the selected vertical drama series for 7 consecutive days from the timestamp of successful purchase.
- **Limited Ads Pass (₹3):** Grants unlocked access with short 5-second bumper ads.
- **No Automatic Debit Guarantee:** Standard ₹3 and ₹5 passes are single-charge non-recurring micro-transactions unless an explicit auto-renew subscription tier is chosen.

### 2. Intellectual Property Rights
All video assets, vertical scripts, background scores, and audio tracks hosted on Storiyan are the exclusive intellectual property of Storiyan Media Ltd. and its authorized Content Partner studios (e.g. Lego Media, Red Chillies OTT Labs). Screen recording, downloading for redistribution, or unauthorized mirroring will result in immediate permanent banning and legal prosecution.

### 3. Refunds & Cancellations
Due to the digital streaming nature of micro-passes, charges are non-refundable once video streaming of paywalled episodes has commenced, except in confirmed cases of double-billing or persistent CDN failure.`
  },
  {
    id: 'doc-about',
    slug: 'about-us',
    title: 'About Storiyan',
    lastUpdated: 'January 15, 2025',
    isPublished: true,
    author: 'Editorial Desk',
    contentMarkdown: `# About Storiyan - The Future of Vertical Storytelling

**Storiyan** is India's premier 9:16 mobile-first vertical drama and micro-episode OTT network. Built for the modern smartphone generation, we bring high-budget cinematic series directly to your fingertips in fast-paced 2 to 5-minute snackable episodes.

### Our Vision
To transform daily commuting, quick coffee breaks, and leisure moments into immersive storytelling adventures.

### What Makes Us Unique
- **Pure 9:16 Vertical Cinematography:** Shot natively for smartphone screens without annoying letterboxing or rotation.
- **Micro-Monetization Freedom:** No forced ₹499 monthly lock-ins. Pay just ₹3 or ₹5 for the series you love, whenever you want.
- **Elite Partner Studios:** Collaborating with world-class creators, indie directors, and production houses.`
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    category: 'Subscriptions & Passes',
    question: 'How does the ₹5 Watch Ad-Free pass work?',
    answer: 'The ₹5 Ad-Free pass gives you complete uninterrupted access to the selected series for 7 days. You will not see any video ads during playback, and your card/UPI will NOT be auto-debited recurringly.',
    order: 1,
    isActive: true
  },
  {
    id: 'faq-2',
    category: 'Subscriptions & Passes',
    question: 'What is the difference between the ₹3 and ₹5 pass?',
    answer: 'The ₹3 Limited Ads pass unlocks locked episodes with a brief 5-second sponsor bumper, while the ₹5 pass is 100% ad-free in full 1080p high definition.',
    order: 2,
    isActive: true
  },
  {
    id: 'faq-3',
    category: 'Playback & Streaming',
    question: 'Can I download vertical episodes for offline viewing?',
    answer: 'Offline downloads are supported on the 7-Day All-Series Pass and Monthly VIP Master tier directly through our mobile application.',
    order: 3,
    isActive: true
  },
  {
    id: 'faq-4',
    category: 'Wallet & Coins',
    question: 'How do I earn or buy Storiyan Coins?',
    answer: 'You can purchase coin bundles under the Wallet tab or earn daily check-in coins by watching free teaser episodes and sharing series with friends.',
    order: 4,
    isActive: true
  },
  {
    id: 'faq-5',
    category: 'Account & Security',
    question: 'How many devices can stream simultaneously on one account?',
    answer: 'You can log in on up to 2 mobile devices per registered mobile number.',
    order: 5,
    isActive: true
  }
];

export const INITIAL_CONTACT_INQUIRIES = [
  {
    id: 'inq-1',
    ticketNumber: 'TKT-8921',
    userName: 'Kunal Singhania',
    userEmail: 'kunal.s@gmail.com',
    userPhone: '+91 98111 22334',
    category: 'Payment Issue',
    subject: 'PhonePe debited ₹5 but Squid Game Ep 4 still shows locked',
    message: 'I made a payment of ₹5 via PhonePe (UTR: 50493821990) around 15 minutes ago. Money was debited from my HDFC bank account, but episode 4 is still prompting for payment.',
    priority: 'high',
    status: 'open',
    submittedAt: '2025-03-03 14:50',
    replies: []
  },
  {
    id: 'inq-2',
    ticketNumber: 'TKT-8920',
    userName: 'Meera Nambiar',
    userEmail: 'meera.film@studio.in',
    userPhone: '+91 97455 66778',
    category: 'Partner Request',
    subject: 'Vertical Crime Thriller Pitch - 20 Episodes Ready for Distribution',
    message: 'We are an independent film production house based in Kochi. We have produced a 20-episode 9:16 thriller titled "Midnight Echoes". We would like to discuss a revenue share partnership with Storiyan.',
    priority: 'medium',
    status: 'in_progress',
    submittedAt: '2025-03-03 11:20',
    replies: [
      {
        id: 'rep-1',
        sender: 'Content Ops Team',
        role: 'Content Director',
        message: 'Hello Meera, thank you for reaching out! We would love to review your trailer and screeners. Please share the Google Drive link or Vimeo showcase.',
        timestamp: '2025-03-03 12:45'
      }
    ]
  },
  {
    id: 'inq-3',
    ticketNumber: 'TKT-8918',
    userName: 'Rajesh Kulkarni',
    userEmail: 'rajesh.k@rediffmail.com',
    userPhone: '+91 98200 44556',
    category: 'Video Playback',
    subject: 'Audio out of sync in Shadows of Enigma Ep 2',
    message: 'On OnePlus 11, the dialogues in Episode 2 are lagging by around 1 second after minute 01:30. Kindly check the audio encoding.',
    priority: 'medium',
    status: 'resolved',
    submittedAt: '2025-03-02 18:30',
    replies: [
      {
        id: 'rep-2',
        sender: 'Tech Operations',
        role: 'Support Agent',
        message: 'Hi Rajesh, our CDN team re-transcoded the audio stream for Ep 2 at 19:15. Please restart the app and it should play smoothly in sync. Thank you!',
        timestamp: '2025-03-02 19:30'
      }
    ]
  }
];

export const INITIAL_ADMIN_ROLES = [
  {
    id: 'adm-1',
    name: 'Vikram Sengupta',
    email: 'vikram.admin@storiyan.tv',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastLogin: 'Active Now',
    status: 'active',
    permissions: ['Full Access', 'Finance & Payouts', 'Content Management', 'User Ban/Unban', 'Legal CMS', 'Push Broadcasts']
  },
  {
    id: 'adm-2',
    name: 'Shalini Sen',
    email: 'shalini.content@storiyan.tv',
    role: 'Content Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    lastLogin: '1 hour ago',
    status: 'active',
    permissions: ['Series Upload', 'Episode Scheduling', 'Partner Approval', 'Trending Ranking']
  },
  {
    id: 'adm-3',
    name: 'Rajat Bhargava',
    email: 'rajat.finance@storiyan.tv',
    role: 'Finance Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastLogin: '3 hours ago',
    status: 'active',
    permissions: ['Transactions Ledger', 'Partner Payouts', 'Refund Processing', 'Price Plan Setup']
  },
  {
    id: 'adm-4',
    name: 'Tanvi Mehta',
    email: 'tanvi.support@storiyan.tv',
    role: 'Customer Support',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    lastLogin: '10 mins ago',
    status: 'active',
    permissions: ['Contact Inbox', 'User Search', 'FAQ Updates', 'Ticket Resolution']
  }
];
