// ── Users ──────────────────────────────────────────────────────────────────
export const users = [
  { id: 1,  name: "Aarav Sharma",    email: "aarav.sharma@gmail.com",    city: "Delhi",     joined: "2024-01-10", plan: "Monthly",   status: "Active" },
  { id: 2,  name: "Priya Patel",     email: "priya.patel@gmail.com",     city: "Mumbai",    joined: "2024-02-14", plan: "Quarterly", status: "Active" },
  { id: 3,  name: "Rohan Verma",     email: "rohan.verma@gmail.com",     city: "Pune",      joined: "2024-03-05", plan: "Monthly",   status: "Inactive" },
  { id: 4,  name: "Sneha Iyer",      email: "sneha.iyer@gmail.com",      city: "Chennai",   joined: "2024-03-20", plan: "Annual",    status: "Active" },
  { id: 5,  name: "Karan Mehta",     email: "karan.mehta@gmail.com",     city: "Bangalore", joined: "2024-04-01", plan: "Monthly",   status: "Active" },
  { id: 6,  name: "Ananya Singh",    email: "ananya.singh@gmail.com",    city: "Hyderabad", joined: "2024-04-15", plan: "Quarterly", status: "Active" },
  { id: 7,  name: "Vikram Nair",     email: "vikram.nair@gmail.com",     city: "Kochi",     joined: "2024-05-02", plan: "Monthly",   status: "Inactive" },
  { id: 8,  name: "Pooja Gupta",     email: "pooja.gupta@gmail.com",     city: "Jaipur",    joined: "2024-05-18", plan: "Annual",    status: "Active" },
  { id: 9,  name: "Arjun Reddy",     email: "arjun.reddy@gmail.com",     city: "Hyderabad", joined: "2024-06-07", plan: "Monthly",   status: "Active" },
  { id: 10, name: "Meera Joshi",     email: "meera.joshi@gmail.com",     city: "Pune",      joined: "2024-06-22", plan: "Quarterly", status: "Active" },
  { id: 11, name: "Rahul Kapoor",    email: "rahul.kapoor@gmail.com",    city: "Delhi",     joined: "2024-07-10", plan: "Monthly",   status: "Active" },
  { id: 12, name: "Divya Menon",     email: "divya.menon@gmail.com",     city: "Chennai",   joined: "2024-07-25", plan: "Annual",    status: "Inactive" },
  { id: 13, name: "Nikhil Desai",    email: "nikhil.desai@gmail.com",    city: "Mumbai",    joined: "2024-08-03", plan: "Monthly",   status: "Active" },
  { id: 14, name: "Kavya Pillai",    email: "kavya.pillai@gmail.com",    city: "Bangalore", joined: "2024-08-19", plan: "Quarterly", status: "Active" },
  { id: 15, name: "Siddharth Rao",   email: "siddharth.rao@gmail.com",   city: "Nagpur",    joined: "2024-09-01", plan: "Monthly",   status: "Active" },
];

// ── Orders ─────────────────────────────────────────────────────────────────
export const orders = [
  { id: 1,  service: "Strength Training", customer: "Aarav Sharma",    date: "2026-04-22", amount: 1802, status: "Completed", days: 10, city: "Delhi" },
  { id: 2,  service: "Zumba",             customer: "Priya Patel",     date: "2026-04-17", amount: 125,  status: "Completed", days: 5,  city: "Mumbai" },
  { id: 3,  service: "Yoga",              customer: "Rohan Verma",     date: "2026-04-16", amount: 900,  status: "Pending",   days: 8,  city: "Pune" },
  { id: 4,  service: "CrossFit",          customer: "Sneha Iyer",      date: "2026-04-10", amount: 1500, status: "Completed", days: 12, city: "Chennai" },
  { id: 5,  service: "Pilates",           customer: "Karan Mehta",     date: "2026-04-08", amount: 700,  status: "Completed", days: 6,  city: "Bangalore" },
  { id: 6,  service: "Zumba",             customer: "Ananya Singh",    date: "2026-04-05", amount: 125,  status: "Pending",   days: 5,  city: "Hyderabad" },
  { id: 7,  service: "Strength Training", customer: "Vikram Nair",     date: "2026-03-28", amount: 1802, status: "Completed", days: 10, city: "Kochi" },
  { id: 8,  service: "Swimming",          customer: "Pooja Gupta",     date: "2026-03-20", amount: 1200, status: "Completed", days: 15, city: "Jaipur" },
  { id: 9,  service: "Cycling",           customer: "Arjun Reddy",     date: "2026-03-15", amount: 600,  status: "Pending",   days: 7,  city: "Hyderabad" },
  { id: 10, service: "Yoga",              customer: "Meera Joshi",     date: "2026-03-10", amount: 900,  status: "Completed", days: 8,  city: "Pune" },
  { id: 11, service: "CrossFit",          customer: "Rahul Kapoor",    date: "2026-03-05", amount: 1500, status: "Completed", days: 12, city: "Delhi" },
  { id: 12, service: "Pilates",           customer: "Divya Menon",     date: "2026-02-28", amount: 700,  status: "Cancelled", days: 6,  city: "Chennai" },
  { id: 13, service: "Zumba",             customer: "Nikhil Desai",    date: "2026-02-20", amount: 125,  status: "Completed", days: 5,  city: "Mumbai" },
  { id: 14, service: "Strength Training", customer: "Kavya Pillai",    date: "2026-02-14", amount: 1802, status: "Completed", days: 10, city: "Bangalore" },
  { id: 15, service: "Swimming",          customer: "Siddharth Rao",   date: "2026-02-10", amount: 1200, status: "Pending",   days: 15, city: "Nagpur" },
  { id: 16, service: "Cycling",           customer: "Aarav Sharma",    date: "2026-01-30", amount: 600,  status: "Completed", days: 7,  city: "Delhi" },
  { id: 17, service: "Yoga",              customer: "Priya Patel",     date: "2026-01-22", amount: 900,  status: "Completed", days: 8,  city: "Mumbai" },
  { id: 18, service: "Zumba",             customer: "Sneha Iyer",      date: "2026-01-15", amount: 125,  status: "Completed", days: 5,  city: "Chennai" },
];

// ── Inbox Emails ───────────────────────────────────────────────────────────
export const emails = [
  { id: 1,  from: "FitFare",  subject: "Query about Strength Training timings",        preview: "Hi, I wanted to know the morning slot timings for Strength Training...", time: "9:30 AM",  date: "2026-05-21", read: false, starred: false, label: "Primary" },
  { id: 2,  from: "FitFare",  subject: "Zumba class schedule for next week",           preview: "Could you please share the updated Zumba schedule for next week?",      time: "10:15 AM", date: "2026-05-21", read: false, starred: true,  label: "Primary" },
  { id: 3,  from: "FitFare",  subject: "Membership renewal reminder",                  preview: "My membership is expiring soon, how do I renew it online?",             time: "11:00 AM", date: "2026-05-21", read: true,  starred: false, label: "Primary" },
  { id: 4,  from: "FitFare",  subject: "Yoga session feedback",                        preview: "The yoga session yesterday was amazing! The instructor was very helpful.", time: "1:45 PM", date: "2026-05-20", read: true,  starred: true,  label: "Primary" },
  { id: 5,  from: "FitFare",  subject: "CrossFit batch availability",                  preview: "Is there any evening CrossFit batch available on weekdays?",             time: "3:00 PM",  date: "2026-05-20", read: false, starred: false, label: "Primary" },
  { id: 6,  from: "FitFare",  subject: "Pilates class inquiry",                        preview: "I am interested in joining Pilates. What are the prerequisites?",        time: "4:30 PM",  date: "2026-05-20", read: true,  starred: false, label: "Social" },
  { id: 7,  from: "FitFare",  subject: "Swimming pool maintenance schedule",           preview: "When is the pool closed for maintenance this month?",                    time: "9:00 AM",  date: "2026-05-19", read: true,  starred: false, label: "Primary" },
  { id: 8,  from: "FitFare",  subject: "Personal trainer request",                     preview: "I would like to request a personal trainer for weight loss program.",     time: "10:45 AM", date: "2026-05-19", read: false, starred: true,  label: "Primary" },
  { id: 9,  from: "FitFare",  subject: "Cycling class timing change",                  preview: "I heard the cycling class timing has changed. Can you confirm?",          time: "2:15 PM",  date: "2026-05-19", read: true,  starred: false, label: "Primary" },
  { id: 10, from: "FitFare",  subject: "Diet plan consultation",                       preview: "Do you offer diet consultation along with gym membership?",               time: "5:00 PM",  date: "2026-05-18", read: false, starred: false, label: "Social" },
  { id: 11, from: "FitFare",  subject: "Locker facility availability",                 preview: "Are lockers available for daily use or only for members?",               time: "8:30 AM",  date: "2026-05-18", read: true,  starred: false, label: "Primary" },
  { id: 12, from: "FitFare",  subject: "Group fitness class registration",             preview: "How do I register for the group fitness class starting next Monday?",     time: "11:30 AM", date: "2026-05-18", read: false, starred: false, label: "Primary" },
  { id: 13, from: "FitFare",  subject: "Gym opening hours on holidays",                preview: "What are the gym timings during national holidays?",                      time: "1:00 PM",  date: "2026-05-17", read: true,  starred: true,  label: "Primary" },
  { id: 14, from: "FitFare",  subject: "Zumba instructor change notice",               preview: "I noticed a different instructor for Zumba today. Is this permanent?",   time: "3:45 PM",  date: "2026-05-17", read: false, starred: false, label: "Social" },
  { id: 15, from: "FitFare",  subject: "Annual membership discount query",             preview: "Is there any discount available on annual membership for students?",      time: "6:00 PM",  date: "2026-05-17", read: true,  starred: false, label: "Primary" },
  { id: 16, from: "FitFare",  subject: "Parking facility at the gym",                  preview: "Is there dedicated parking available for gym members?",                   time: "9:15 AM",  date: "2026-05-16", read: true,  starred: false, label: "Primary" },
  { id: 17, from: "FitFare",  subject: "Towel service availability",                   preview: "Do you provide towel service or should I bring my own?",                  time: "10:00 AM", date: "2026-05-16", read: false, starred: false, label: "Social" },
  { id: 18, from: "FitFare",  subject: "Strength Training equipment query",            preview: "Are there enough barbells and dumbbells for peak hour usage?",            time: "12:30 PM", date: "2026-05-16", read: true,  starred: true,  label: "Primary" },
  { id: 19, from: "FitFare",  subject: "FitFare app not loading",                      preview: "The FitFare app is not loading on my phone. Please help.",                time: "2:00 PM",  date: "2026-05-15", read: false, starred: false, label: "Primary" },
  { id: 20, from: "FitFare",  subject: "Request for invoice",                          preview: "Can you please send me the invoice for my last payment?",                 time: "4:00 PM",  date: "2026-05-15", read: true,  starred: false, label: "Primary" },
  { id: 21, from: "FitFare",  subject: "Yoga mat availability",                        preview: "Are yoga mats provided or should I bring my own?",                        time: "7:00 PM",  date: "2026-05-14", read: false, starred: false, label: "Social" },
  { id: 22, from: "FitFare",  subject: "Referral program details",                     preview: "I want to refer my friend. What are the referral benefits?",              time: "9:45 AM",  date: "2026-05-14", read: true,  starred: false, label: "Primary" },
  { id: 23, from: "FitFare",  subject: "Feedback on CrossFit session",                 preview: "The CrossFit session was intense and well-structured. Great job!",        time: "11:15 AM", date: "2026-05-13", read: true,  starred: true,  label: "Primary" },
  { id: 24, from: "FitFare",  subject: "Gym hygiene complaint",                        preview: "The changing rooms need more frequent cleaning. Please look into this.",  time: "3:30 PM",  date: "2026-05-13", read: false, starred: false, label: "Primary" },
  { id: 25, from: "FitFare",  subject: "Batch timing for morning Pilates",             preview: "Can you add a 6 AM Pilates batch? Many of us prefer early morning.",      time: "5:30 PM",  date: "2026-05-12", read: true,  starred: false, label: "Social" },
];

// ── Services ───────────────────────────────────────────────────────────────
export const services = [
  { id: 1, name: "Zumba",             category: "zumba",    price: 70,   image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { id: 2, name: "Strength Training", category: "Be fit",   price: 140,  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
  { id: 3, name: "Yoga",              category: "wellness", price: 90,   image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80" },
  { id: 4, name: "CrossFit",          category: "Be fit",   price: 150,  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { id: 5, name: "Pilates",           category: "wellness", price: 100,  image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80" },
  { id: 6, name: "Swimming",          category: "cardio",   price: 120,  image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80" },
  { id: 7, name: "Cycling",           category: "cardio",   price: 60,   image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 8, name: "Aerobics",          category: "cardio",   price: 80,   image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
];

// ── Team Members ───────────────────────────────────────────────────────────
export const teamMembers = [
  { id: 1, name: "Rajesh Kumar",    role: "Head Trainer",        email: "rajesh.kumar@fitfare.com",    phone: "9876543210", joined: "2023-01-15", avatar: "RK" },
  { id: 2, name: "Sunita Sharma",   role: "Zumba Instructor",    email: "sunita.sharma@fitfare.com",   phone: "9876543211", joined: "2023-03-10", avatar: "SS" },
  { id: 3, name: "Amit Tiwari",     role: "Yoga Instructor",     email: "amit.tiwari@fitfare.com",     phone: "9876543212", joined: "2023-05-20", avatar: "AT" },
  { id: 4, name: "Neha Kulkarni",   role: "Pilates Trainer",     email: "neha.kulkarni@fitfare.com",   phone: "9876543213", joined: "2023-07-01", avatar: "NK" },
  { id: 5, name: "Deepak Mishra",   role: "CrossFit Coach",      email: "deepak.mishra@fitfare.com",   phone: "9876543214", joined: "2023-08-15", avatar: "DM" },
  { id: 6, name: "Ritu Agarwal",    role: "Receptionist",        email: "ritu.agarwal@fitfare.com",    phone: "9876543215", joined: "2023-09-01", avatar: "RA" },
  { id: 7, name: "Suresh Pandey",   role: "Swimming Coach",      email: "suresh.pandey@fitfare.com",   phone: "9876543216", joined: "2024-01-10", avatar: "SP" },
  { id: 8, name: "Priti Saxena",    role: "Aerobics Instructor", email: "priti.saxena@fitfare.com",    phone: "9876543217", joined: "2024-02-20", avatar: "PS" },
];

// ── Reviews ────────────────────────────────────────────────────────────────
export const reviews = [
  { id: 1,  name: "Aarav Sharma",    rating: 5, service: "Strength Training", comment: "Excellent trainers and well-equipped gym. Highly recommend!",                    date: "2026-05-10" },
  { id: 2,  name: "Priya Patel",     rating: 4, service: "Zumba",             comment: "Zumba classes are super fun and energetic. Love the instructor!",                date: "2026-05-08" },
  { id: 3,  name: "Sneha Iyer",      rating: 5, service: "Yoga",              comment: "The yoga sessions are very calming and well-structured.",                        date: "2026-05-06" },
  { id: 4,  name: "Karan Mehta",     rating: 4, service: "CrossFit",          comment: "Intense workouts with great coaching. Saw results in 2 weeks!",                  date: "2026-05-04" },
  { id: 5,  name: "Ananya Singh",    rating: 5, service: "Pilates",           comment: "Best Pilates class in the city. Very professional environment.",                 date: "2026-05-02" },
  { id: 6,  name: "Vikram Nair",     rating: 3, service: "Swimming",          comment: "Pool is clean but timings could be more flexible.",                              date: "2026-04-30" },
  { id: 7,  name: "Pooja Gupta",     rating: 5, service: "Strength Training", comment: "Amazing experience! The personal trainer was very motivating.",                  date: "2026-04-28" },
  { id: 8,  name: "Arjun Reddy",     rating: 4, service: "Cycling",           comment: "Great cycling sessions. The instructor keeps the energy high throughout.",       date: "2026-04-25" },
  { id: 9,  name: "Meera Joshi",     rating: 5, service: "Yoga",              comment: "Peaceful and rejuvenating. The best way to start my mornings.",                  date: "2026-04-22" },
  { id: 10, name: "Rahul Kapoor",    rating: 4, service: "CrossFit",          comment: "Challenging but rewarding. The coaches are very supportive.",                    date: "2026-04-20" },
  { id: 11, name: "Nikhil Desai",    rating: 5, service: "Zumba",             comment: "So much fun! I look forward to every class. Great community.",                  date: "2026-04-18" },
  { id: 12, name: "Kavya Pillai",    rating: 4, service: "Aerobics",          comment: "High energy classes with great music. Really enjoy it.",                        date: "2026-04-15" },
  { id: 13, name: "Siddharth Rao",   rating: 3, service: "Swimming",          comment: "Good pool but needs more lanes during peak hours.",                              date: "2026-04-12" },
  { id: 14, name: "Divya Menon",     rating: 5, service: "Pilates",           comment: "Transformed my posture completely. Highly recommend to everyone.",               date: "2026-04-10" },
  { id: 15, name: "Rohan Verma",     rating: 4, service: "Strength Training", comment: "Good equipment and knowledgeable trainers. Worth every rupee.",                  date: "2026-04-08" },
];

// ── Sales Chart Data ───────────────────────────────────────────────────────
export const salesData = [
  { month: "Jan", grossSales: 18500, profit: 11100 },
  { month: "Feb", grossSales: 22000, profit: 13200 },
  { month: "Mar", grossSales: 19800, profit: 11880 },
  { month: "Apr", grossSales: 31200, profit: 18720 },
  { month: "May", grossSales: 27500, profit: 16500 },
];

// ── Gallery Images ─────────────────────────────────────────────────────────
export const galleryImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", label: "Gym Floor" },
  { id: 2, url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", label: "Zumba Class" },
  { id: 3, url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", label: "Yoga Session" },
  { id: 4, url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", label: "CrossFit" },
  { id: 5, url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80", label: "Pilates" },
  { id: 6, url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80", label: "Swimming Pool" },
  { id: 7, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", label: "Cycling" },
  { id: 8, url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80", label: "Aerobics" },
  { id: 9, url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80", label: "Weight Room" },
  { id: 10, url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80", label: "Cardio Zone" },
  { id: 11, url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", label: "Training Area" },
  { id: 12, url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80", label: "Stretching Zone" },
];
