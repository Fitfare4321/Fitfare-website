import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollProgress from "@/components/ScrollProgress";
import top10 from "@/assets/top10-beginner.png";
import postWorkoutImg from "@/assets/Post-Workout Recipes.png";
import blogging from "@/assets/Blogging.jpg";
import overthinkImg from "@/assets/Overthink.png";
import aiTransform from "@/assets/AI-transform.jpg";
import periodImg from "@/assets/period-workout.jpg";
import weightGainImg from "@/assets/weight-gain.jpg";
import weightLossImg from "@/assets/weight-loss.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const Blog = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [api, setApi] = useState<CarouselApi>();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Determine active post from URL slug
  const active = slug || null;

  // Scroll to top when blog post changes (for faster mobile loading)
  useEffect(() => {
    if (active) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [active]);

  // Auto-scroll carousel (only when showing carousel, not individual post)
  useEffect(() => {
    if (!api || active) return; // Don't auto-scroll when viewing a post

    let interval: NodeJS.Timeout | null = null;

    const startAutoScroll = () => {
      if (interval) return;
      
      // Start immediately - no delay
      interval = setInterval(() => {
        if (!api) return;
        
        try {
          if (!api.canScrollNext()) {
            // Loop back to start smoothly
            api.scrollTo(0);
          } else {
            // Scroll to next slide
            api.scrollNext();
          }
        } catch (error) {
          console.error("Auto-scroll error:", error);
          // Restart on error
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
          startAutoScroll();
        }
      }, 4000); // Auto-scroll every 4 seconds
    };

    const stopAutoScroll = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    // Start auto-scroll immediately when API is ready
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [api, active]);

  const introParas = [
    "Because “I’ll start from Monday” has been going on since 2021.",
    "So you’ve decided to start your fitness journey. First of all — iconic. We love a main-character arc. ✨",
    "Second of all — relax. You don’t need a ₹10,000 gym outfit, pre-workout that tastes like battery acid, or the ability to deadlift a small car. You just need consistency, a little discipline… and maybe a good playlist.",
    "If you’re new to fitness and slightly confused by terms like “hypertrophy” and “progressive overload,” don’t worry. We’re keeping it simple, effective, and beginner-friendly.",
    "Here are 10 workouts that won’t destroy you on Day 1 but will definitely level you up.",
  ];

  const workouts = [
    {
      title: "Walking (Yes, It Counts. No, We’re Not Debating It.)",
      paras: [
        "If you think walking isn’t a “real workout,” please log out.",
        "Walking is the most underrated fat-loss, mood-boosting, overthinking-reducing activity ever invented. Start with 20–30 minutes daily. Play music. Call a friend. Pretend you’re in a movie montage.",
        "Consistency > intensity.",
      ],
    },
    {
      title: "Bodyweight Squats (Your Legs Will Remember This)",
      paras: [
        "Squats are the blueprint. They work your legs, glutes, and core — basically the lower-body Avengers.",
        "Stand shoulder-width apart, sit back like you’re about to sit on an invisible chair, and come back up. Start with 10–15 reps for 3 sets.",
        "Warning: Stairs may feel personal the next day.",
      ],
    },
    {
      title: "Push-Ups (Modified Is Still Valid, Queen/King)",
      paras: [
        "Can’t do a full push-up yet? That’s fine. Do knee push-ups or wall push-ups. Fitness isn’t a competition unless you’re competing with yesterday’s version of yourself.",
        "Push-ups strengthen your chest, shoulders, and arms — and low-key boost confidence too.",
      ],
    },
    {
      title: "Plank (The Longest 30 Seconds of Your Life)",
      paras: [
        "Plank looks easy until you’re 12 seconds in questioning your existence.",
        "Hold a straight body position on your forearms. Start with 20–30 seconds.",
        "Increase gradually. This builds core strength, improves posture, and helps you stop slouching like a shrimp.",
      ],
    },
    {
      title: "Glute Bridges (For the Booty & Back Pain Combo)",
      paras: [
        "Lie down, bend your knees, lift your hips up. Simple. Effective. Powerful.",
        "This move strengthens your glutes and protects your lower back — especially if you sit for 6+ hours pretending to study or work.",
      ],
    },
    {
      title: "Jumping Jacks (Channel Your School PT Energy)",
      paras: [
        "Remember PT class? This is that — but now you actually appreciate it.",
        "Jumping jacks are amazing for cardio. Do 30–60 seconds. They increase heart rate, improve stamina, and wake your body up instantly.",
      ],
    },
    {
      title: "Lunges (Balance, Strength & A Little Drama)",
      paras: [
        "Step forward, bend both knees, lower down. Repeat.",
        "Lunges work your legs and improve balance. Start slow. Don’t rush. If you wobble, it’s fine. Growth is unstable sometimes.",
      ],
    },
    {
      title: "Mountain Climbers (Controlled Chaos)",
      paras: [
        "Get into plank position and bring your knees forward one by one.",
        "This move builds core strength and gives cardio benefits. Start slow before you try going full-speed influencer mode.",
      ],
    },
    {
      title: "Yoga or Stretching (Your Body Deserves This)",
      paras: [
        "Flexibility is strength too. Stretching improves recovery, reduces soreness, and makes you feel calm.",
        "Try basic poses like Child’s Pose, Downward Dog, or simple hamstring stretches. Your future self will thank you.",
      ],
    },
    {
      title: "Light Dumbbell Exercises (Optional Upgrade)",
      paras: [
        "If you have access to light weights, try bicep curls, shoulder presses, and basic rows. Nothing heavy. Focus on form.",
        "Remember: lifting light with good form beats lifting heavy with ego.",
      ],
    },
  ];

  const howTo = [
    "5 minutes warm-up (walking or jumping jacks)",
    "4–5 exercises from the list above",
    "2–3 sets each",
    "20–30 minutes total",
  ];

  const post2Title = "Healthy Post-Workout Recipes to Speed Recovery";
  const post2Intro = [
    "Because surviving leg day deserves a reward — not just emotional damage.",
    "You just finished your workout. Your legs are shaking. Your arms feel like noodles. You’ve officially earned the right to sit dramatically on the floor and question your life choices.",
    "But here’s the thing — what you eat after your workout matters more than you think.",
    "Post-workout nutrition isn’t about “cheat meals” or random snacking. It’s about recovery. Your muscles need protein to repair, carbs to refill energy, and hydration to bring you back to life. Think of it as refueling your body instead of just feeding your cravings.",
    "And no, it doesn’t have to be boring boiled chicken and sadness.",
    "Let’s upgrade your recovery game.",
  ];

  const post2RuleTitle = "The Golden Rule of Post-Workout Eating";
  const post2RuleParas = [
    "After exercising, your body is basically saying:",
    "“Hey bestie, we just worked hard. Can we get some nutrients please?”",
    "Your muscles break down during workouts. Protein helps rebuild them stronger. Carbohydrates replenish glycogen (your energy storage), and healthy fats support overall recovery. The ideal window? Within 30–60 minutes after training.",
    "Now let’s talk recipes that are both nutritious and actually enjoyable.",
  ];

  const post2Recipes = [
    {
      title: "1. The Classic Protein Smoothie (But Make It Elite)",
      paras: [
        "If convenience had a personality, it would be a smoothie.",
        "Blend together a banana, a scoop of protein powder (whey or plant-based), peanut butter, oats, and almond milk. You get protein for muscle repair, carbs for energy, and healthy fats for sustained recovery — all in one glass.",
        "It’s quick. It’s filling. It makes you feel like you have your life together.",
        "Bonus tip: Add cocoa powder for a chocolate vibe. Recovery but make it aesthetic.",
      ],
    },
    {
      title: "2. Greek Yogurt Power Bowl",
      paras: [
        "This one is perfect if you want something light but powerful.",
        "Take a bowl of Greek yogurt (high in protein), add fresh fruits like berries or banana slices, sprinkle chia seeds, nuts, and a drizzle of honey.",
        "You get protein, antioxidants, healthy fats, and natural sugars to refuel your body. Plus, it looks Instagram-ready. We support beautiful nutrition.",
      ],
    },
    {
      title: "3. Paneer or Tofu Wrap (Desi Gains Activated)",
      paras: [
        "If smoothies aren’t your thing and you want something solid, this is your move.",
        "Stuff a whole wheat wrap with grilled paneer or tofu, sautéed veggies, and a little hummus or yogurt-based sauce. It’s balanced, satisfying, and high in protein.",
        "It feels like a meal, not a “fitness snack,” which means you won’t go hunting for chips 20 minutes later.",
      ],
    },
    {
      title: "4. Eggs & Toast Combo (Simple But Powerful)",
      paras: [
        "Eggs are literally nature’s protein capsules.",
        "Scrambled or boiled eggs paired with whole-grain toast and maybe some avocado give you protein plus good carbs. It’s simple, affordable, and effective.",
        "Sometimes the best recovery meals aren’t complicated. They’re consistent.",
      ],
    },
    {
      title: "5. Recovery Khichdi (Comfort Meets Science)",
      paras: [
        "Don’t underestimate traditional food.",
        "Moong dal khichdi is actually a recovery superstar — carbs from rice, protein from dal, easy digestion, and comforting warmth. Add some ghee for healthy fats, and you’ve got a balanced post-workout meal.",
        "Fitness doesn’t mean abandoning your culture. It means upgrading it smartly.",
      ],
    },
    {
      title: "6. Chicken & Rice Bowl (Gym Bro Approved — But Make It Balanced)",
      paras: [
        "Grilled chicken with rice and vegetables is popular for a reason. It works.",
        "Lean protein supports muscle repair. Rice restores glycogen. Veggies add fiber and micronutrients. Add a squeeze of lemon or a yogurt dip to level it up.",
        "Basic? Yes. Effective? Absolutely.",
      ],
    },
  ];

  const post2HydrationTitle = "Hydration: The Silent Hero";
  const post2HydrationParas = [
    "Let’s not forget water. Or coconut water if you’ve sweated like you were filming a survival documentary.",
    "Electrolytes matter. Dehydration slows recovery and makes fatigue worse. Drink enough fluids before and after your workout — your body needs it more than another iced coffee.",
  ];

  const post2AvoidTitle = "What to Avoid After a Workout?";
  const post2AvoidParas = [
    "This might hurt a little.",
    "Ultra-processed junk food right after training won’t help muscle recovery. Excess sugar spikes energy and crashes it later. Heavy fried food can slow digestion and leave you feeling sluggish.",
    "You worked hard. Don’t undo it in 10 minutes.",
  ];

  const post2GlowTitle = "The Real Glow-Up Is Recovery";
  const post2GlowParas = [
    "Here’s the truth: muscle isn’t built during the workout. It’s built during recovery.",
    "Your food choices after exercise determine how you feel tomorrow. Less soreness. Better performance. More energy. More consistency.",
    "You don’t need extreme diets. You need smart fueling.",
    "Eat balanced. Eat enough. Eat with intention.",
    "Your body showed up for you in that workout. Show up for it after. 💪",
  ];

  const post3Id = "why-workouts-better";
  const post3Title = "Why Workouts Are Better Than Overthinking?";
  const post3Intro = [
    "Because your mind doesn’t need another spiral. It needs movement.",
    "Let’s be honest.",
    "Your brain has two modes:",
    "Productive genius.",
    "2 a.m. overthinking machine replaying something you said in 2017.",
    "If you’ve ever laid in bed creating fake scenarios that will probably never happen, congratulations — you’re human. But here’s something nobody tells you enough: your brain was not designed to sit still all day and fight invisible battles. It was designed to move.",
    "And that’s where exercise comes in.",
    "Not as punishment.",
    "Not as “revenge body” culture.",
    "But as mental stability maintenance.",
  ];
  const post3OverthinkingTitle = "Your Brain on Overthinking:";
  const post3OverthinkingParas = [
    "When you overthink, your body doesn’t know the difference between a real threat and a “what if they secretly hate me” scenario. It activates stress hormones like cortisol. Your heart rate increases. Muscles tense. Sleep disappears. Mood drops.",
    "You’re basically triggering fight-or-flight… while sitting in your room scrolling Instagram.",
    "Iconic. But not sustainable.",
  ];
  const post3ExerciseTitle = "Your Brain on Exercise:";
  const post3ExerciseParas = [
    "Now here’s the plot twist.",
    "When you exercise, your brain releases endorphins (the natural mood boosters), dopamine (motivation chemical), and serotonin (the calm, stable one). These aren’t just fancy science words. They’re the reason you feel lighter, clearer, almost emotionally reset after a workout.",
    "Movement tells your nervous system:",
    "“We’re safe. We’re strong. We’re handling it.”",
    "That 20-minute walk?",
    "That quick workout?",
    "That random dance session in your room?",
    "It’s not “just fitness.” It’s chemical therapy.",
  ];
  const post3WhyTitle = "Why Movement Interrupts Mental Spirals";
  const post3WhyParas = [
    "Overthinking thrives in stillness.",
    "When your body is inactive, your mind has all the space to create drama. But the moment you move — whether it’s lifting weights, running, stretching, or even cleaning your room aggressively — your brain shifts focus.",
    "Your breathing changes.",
    "Your heart rate changes.",
    "Your thoughts slow down.",
    "It’s like force-closing 47 mental tabs at once.",
    "You don’t need to “solve” every thought. Sometimes you just need to outwalk it.",
  ];
  const post3ConfidenceTitle = "The Confidence Effect Is Real";
  const post3ConfidenceParas = [
    "Exercise doesn’t just change your body. It changes your self-perception.",
    "Every time you show up for a workout, you subconsciously tell yourself:",
    "“I can do hard things.”",
    "And that mindset spills into everything — presentations, exams, relationships, career goals. Physical strength builds emotional resilience. The gym isn’t just training muscles. It’s training discipline, patience, and self-trust.",
    "Overthinking weakens confidence. Action builds it.",
  ];
  const post3No90Title = "You Don’t Need a 90-Minute Hardcore Session";
  const post3No90Paras = [
    "This isn’t about becoming a fitness influencer overnight.",
    "Start small.",
    "A 15-minute walk.",
    "10 push-ups.",
    "Stretching before bed.",
    "Your brain doesn’t need intensity. It needs consistency.",
    "The goal isn’t exhaustion. It’s regulation.",
  ];
  const post3GlowTitle = "The Real Glow-Up Is Mental";
  const post3GlowParas = [
    "Here’s the part that hits different.",
    "Muscle is built during recovery.",
    "Peace is built during movement.",
    "You might start working out to “look better.”",
    "But you stay because you think clearer. Sleep better. React calmer. Stress less.",
    "And suddenly, the problems that felt overwhelming feel manageable.",
    "Not because they disappeared.",
    "But because you’re stronger.",
  ];
  const post3CallTitle = "So Next Time You Feel the Spiral Starting…";
  const post3CallParas = [
    "Before you text your friend for reassurance.",
    "Before you Google symptoms you probably don’t have.",
    "Before you replay that awkward conversation again.",
    "Move.",
    "Go outside.",
    "Do 20 squats.",
    "Walk around the block.",
    "Put on music and let your body exist.",
    "Your brain doesn’t need another argument.",
    "It needs circulation.",
    "Strong body. Stable mind.",
    "That’s the real upgrade. 💪🧠",
  ];

  const post4Id = "ai-personalized-2026";
  const post4Title = "How Is AI Transforming Personalized Fitness Plans in 2026?";
  const post4Intro = [
    "From “random YouTube workout” to “algorithm-approved glow-up.”",
    "Let’s rewind for a second.",
    "It’s 2020. You search “fat loss workout at home.”",
    "You pick the first video.",
    "You try it for three days.",
    "You quit because your knees hurt and you’re emotionally tired.",
    "Now fast forward to 2026.",
    "You open a fitness app. It already knows your sleep was trash, your steps were low, your stress is high, and your legs are still sore from yesterday. Instead of screaming “LET’S DO HIIT,” it calmly says, “Let’s do mobility and core today.”",
    "That, bestie, is AI in fitness.",
  ];
  const post4DeathTitle = "The Death of One-Size-Fits-All Workouts";
  const post4DeathParas = [
    "For years, fitness plans were generic.",
    "“Beginner.”",
    "“Intermediate.”",
    "“Advanced.”",
    "But here’s the problem: two beginners are never the same.",
    "One might be 19, athletic, and restarting training.",
    "Another might be 32, stressed, sleep-deprived, and sitting 9 hours a day.",
    "In 2026, AI doesn’t guess. It analyzes.",
    "It looks at:",
    "Age",
    "Body composition",
    "Activity levels",
    "Heart rate data",
    "Recovery patterns",
    "Sleep quality",
    "Even stress trends",
    "Then it builds a plan that adapts — not a static PDF you forget exists.",
  ];
  const post4NetflixTitle = "Your Workout Now Adjusts Like Netflix Recommendations";
  const post4NetflixParas = [
    "You know how Netflix suggests shows based on what you watch?",
    "AI fitness does the same thing.",
    "Skipped leg day twice?",
    "The system adjusts volume and intensity.",
    "Heart rate too high during cardio?",
    "It modifies your target zone.",
    "Not progressing in strength?",
    "It increases load strategically using progressive overload models.",
    "The plan evolves with you. It’s no longer “follow blindly.” It’s “respond intelligently.”",
    "Your fitness program now has main-character awareness.",
  ];
  const post4RealtimeTitle = "Real-Time Feedback Is the Real Plot Twist";
  const post4RealtimeParas = [
    "In 2026, AI doesn’t just plan your workout. It corrects you.",
    "Using motion sensors, camera-based posture analysis, and wearable tech, AI can detect:",
    "Poor squat depth",
    "Knee misalignment",
    "Back rounding during deadlifts",
    "Inconsistent tempo",
    "Instead of your friend saying, “Yeah that looks fine,” the algorithm says, “Lower your hips 2 cm.”",
    "Brutal. Accurate. Effective.",
    "This reduces injury risk and improves performance faster than guesswork ever could.",
  ];
  const post4RecoveryTitle = "Recovery Is Finally Getting the Attention It Deserves";
  const post4RecoveryParas = [
    "Old fitness mindset: “No pain, no gain.”",
    "2026 mindset: “No recovery, no progress.”",
    "AI tracks recovery metrics like:",
    "Resting heart rate",
    "Heart Rate Variability (HRV)",
    "Sleep cycles",
    "Muscle fatigue patterns",
    "If your nervous system is stressed, it automatically lowers intensity. If you’re fully recovered, it pushes you harder.",
    "It’s like having a coach who actually cares about your burnout levels.",
  ];
  const post4NutritionTitle = "Nutrition Is Now Data-Driven, Not Trend-Driven";
  const post4NutritionParas = [
    "No more random detox teas.",
    "AI-based nutrition systems calculate:",
    "Basal Metabolic Rate (BMR)",
    "Total Daily Energy Expenditure (TDEE)",
    "Macro distribution based on your goals",
    "Blood sugar trends (if integrated with wearables)",
    "Instead of “eat less,” it becomes “fuel smarter.”",
    "Fitness is no longer aesthetic guessing. It’s metabolic strategy.",
  ];
  const post4AaravTitle = "Story Time: Meet Aarav";
  const post4AaravParas = [
    "Aarav, 24, corporate job, sits 10 hours a day. He tries a high-intensity influencer program. Burns out in 2 weeks.",
    "Switches to an AI-powered personalized plan.",
    "The system notices:",
    "Low mobility",
    "Poor sleep",
    "Elevated stress markers",
    "Instead of pushing extreme workouts, it starts with:",
    "20-minute strength sessions",
    "Daily step goals",
    "Breathing protocols",
    "Progressive overload at controlled rates",
    "Three months later:",
    "Better posture",
    "Improved energy",
    "Visible strength gains",
    "Reduced anxiety",
    "Not because he worked harder.",
    "But because he trained smarter.",
  ];
  const post4EnhanceTitle = "AI Doesn’t Replace Coaches — It Enhances Them";
  const post4EnhanceParas = [
    "This isn’t about robots taking over gyms.",
    "It’s about:",
    "Smarter data",
    "Better tracking",
    "Fewer injuries",
    "More efficient progress",
    "AI handles analytics.",
    "Humans bring motivation, empathy, and experience.",
    "Together? Elite combo.",
  ];
  const post4PredictTitle = "The Bigger Shift: Fitness Is Becoming Predictive";
  const post4PredictParas = [
    "The most exciting part?",
    "AI is moving from reactive to predictive.",
    "Instead of:",
    "“You’re injured.”",
    "It’s becoming:",
    "“Based on movement data and fatigue trends, injury risk is rising. Reduce load by 10%.”",
    "Instead of:",
    "“Why am I plateauing?”",
    "It’s:",
    "“Muscle adaptation slowing. Increase volume next week.”",
    "That’s not just smart. That’s future-ready.",
  ];
  const post4MeaningTitle = "So What Does This Mean for You?";
  const post4MeaningParas = [
    "It means:",
    "No more random workouts",
    "No more guessing calories",
    "No more burnout cycles",
    "No more comparison traps",
    "Your fitness journey becomes customized, adaptive, and sustainable.",
    "AI in 2026 isn’t about replacing effort.",
    "It’s about directing it properly.",
    "Because working hard is good.",
    "But working intelligently?",
    "That’s unstoppable.",
    "Welcome to the era of algorithm-powered gains. 💪🤖",
  ];

  const post5Id = "period-workout";
  const post5Title = "Should You Work Out on Your Period? Here's What Science Says 🌸";
  const post5Intro = [
    "Spoiler: Your uterus is dramatic, not your entire body.",
    "Let's set the scene.",
    "It's Day 1. You wake up. Your lower back feels suspicious. Your stomach is negotiating violence. You look at your workout plan and whisper, \"Not today.\"",
    "And honestly? Fair.",
    "But here's the real question — should you completely skip workouts on your period, or is that just something we collectively assumed because cramps feel illegal?",
    "Science says: it depends on your body, not the calendar.",
  ];
  const post5HormonesTitle = "What the science actually says";
  const post5HormonesParas = [
    "During your period (the menstrual phase), estrogen and progesterone levels are at their lowest. That might sound scary, but it actually means your body is in a relatively \"neutral\" hormonal state. Some women even feel surprisingly strong during this phase. Research shows strength training performance doesn't automatically drop just because you're bleeding. Your muscles don't read your cycle tracker.",
    "What does change is energy, pain tolerance, and comfort.",
  ];
  const post5LightMoveTitle = "When light movement helps";
  const post5LightMoveParas = [
    "If you're experiencing mild cramps and low energy, light movement can actually help. Gentle cardio, walking, stretching, and yoga improve blood circulation, which may reduce cramping. Exercise also releases endorphins — your body's natural painkillers — which can boost mood and reduce discomfort. So yes, that 20-minute walk might do more for your sanity than lying in bed scrolling.",
  ];
  const post5RestTitle = "When rest is the right call";
  const post5RestParas = [
    "However, if your cramps are intense, you're dizzy, or you feel genuinely drained, pushing through a high-intensity workout isn't \"discipline.\" It's unnecessary stress. Your body is already managing hormonal shifts and shedding its uterine lining. It's allowed to ask for rest.",
  ];
  const post5ListenTitle = "Here's where the main-character energy comes in";
  const post5ListenParas = [
    "Working out on your period isn't about proving toughness. It's about listening intelligently.",
    "Some days you'll feel like doing squats. Some days you'll feel like doing child's pose and staring at the ceiling. Both are valid. The key is adjusting intensity, not abandoning movement completely (unless your body clearly says stop).",
    "The outdated \"no pain, no gain\" mindset doesn't apply here. Smart training means recognizing that recovery, hormones, and mental state all matter. Fitness is long-term consistency, not one heroic workout during cramps.",
  ];
  const post5WhyHardTitle = "So why does everything feel harder sometimes?";
  const post5WhyHardParas = [
    "It's not weakness. It's physiology.",
    "You might experience cramps due to prostaglandins (hormone-like chemicals that trigger uterine contractions). You might feel fatigue if iron levels are low. You might retain water, which makes you feel heavier and slower. That doesn't mean you lost progress overnight. It means your body is busy.",
  ];
  const post5HelpsTitle = "Now here's where exercise becomes surprisingly helpful";
  const post5HelpsParas = [
    "Light to moderate movement increases blood flow, releases endorphins, and reduces stress hormones. Translation: your mood improves, cramps may decrease, and your brain stops spiraling about everything at once. A 20-minute walk, slow cycling, Pilates, or yoga can genuinely feel like emotional first aid.",
  ];
  const post5DistressTitle = "But let's be clear — there's a difference between discomfort and distress";
  const post5DistressParas = [
    "If your cramps are mild and manageable, movement can help. If you feel dizzy, nauseous, or in severe pain, forcing a high-intensity session isn't empowering. It's ignoring your body's signals.",
    "Fitness isn't about fighting your biology. It's about understanding it.",
  ];
  const post5MentalTitle = "There's also the mental side nobody talks about enough";
  const post5MentalParas = [
    "Sometimes the hardest part isn't the workout — it's the guilt. The \"I skipped leg day because I'm on my period, am I lazy?\" narrative.",
    "You're not lazy. You're cyclical.",
    "Your energy isn't linear like a spreadsheet. It fluctuates. And training that respects those fluctuations is smarter, not softer.",
  ];
  const post5FlexTitle = "The real flex in 2026 isn't pushing through pain for aesthetic goals";
  const post5FlexParas = [
    "It's building a sustainable routine that works with your hormones, not against them.",
  ];
  const post5AdjustTitle = "So next time your period arrives like an uninvited guest";
  const post5AdjustParas = [
    "Don't cancel your entire fitness identity. Check in. Adjust. Move if it feels good. Rest if it doesn't.",
  ];
  const post5FinalTitle = "Your body isn't being dramatic";
  const post5FinalParas = [
    "It's being powerful. 🌸💪",
  ];

  const post6Id = "weight-gain-journey";
  const post6Title = "A Simple Weight Gain Journey";
  const post6Intro = [
    "Because “just eat more” is not a personality trait.",
    "Let's clear something up.",
    "Gaining weight sounds easy… until you're the person trying to do it.",
  ];
  const post6Section1Title = "The silent struggle of trying to gain weight";
  const post6Section1Paras = [
    "While the internet screams about fat loss, calorie deficits, and cutting carbs, there’s a silent group of us Googling, “How to gain weight fast without looking bloated?” and being told to “just eat more.”",
    "If it were that simple, we would’ve done it.",
    "My weight gain journey didn’t start with a crazy diet plan. It started with realizing that I was under-eating without noticing. Skipping breakfast. Drinking coffee instead of meals. Calling snacks “lunch.” And then wondering why nothing changed.",
  ];
  const post6Section2Title = "Lesson 1: Consistency over random overeating";
  const post6Section2Paras = [
    "The first lesson? Consistency beats random overeating.",
    "Instead of forcing huge meals, I focused on eating 4–5 structured meals daily. I added calorie-dense but nutritious foods — peanut butter, bananas, paneer, rice, eggs, smoothies.",
    "Not junk. Not oil-soaked “bulk food.” Real fuel.",
  ];
  const post6Section3Title = "Lesson 2: Strength training is non-negotiable";
  const post6Section3Paras = [
    "The second lesson? Strength training is non-negotiable.",
    "If you just eat more without training, you don’t gain the right kind of weight.",
    "Once I started lifting — even basic compound movements like squats, push-ups, and rows — my body finally had a reason to use those extra calories. Muscle growth replaced just “feeling heavy.”",
  ];
  const post6Section4Title = "Progress that actually feels real";
  const post6Section4Paras = [
    "And no, progress wasn’t dramatic.",
    "It was slow. 0.5 kg. Then 1 kg. Then clothes fitting differently. Then arms looking slightly fuller. Then friends saying, “You look healthier.”",
    "That word hit different.",
  ];
  const post6Section5Title = "The mindset shift";
  const post6Section5Paras = [
    "The biggest mindset shift was understanding that weight gain isn’t about stuffing yourself.",
    "It’s about structured eating, progressive overload, sleep, and patience.",
    "Your metabolism isn’t your enemy. It just needs a strategy.",
  ];
  const post6Section6Title = "It's more than just weight";
  const post6Section6Paras = [
    "Some days I felt bloated. Some days I felt frustrated. But showing up consistently — eating even when I wasn't super hungry, training even when motivation dipped — changed everything.",
    "Weight gain isn't talked about enough. It takes effort. It takes planning. It takes discipline.",
    "But it's possible.",
    "And when you finally feel stronger, more energetic, and confident in your own body — it's not just weight you've gained.",
    "It's self-trust. 💪",
  ];

  const post7Id = "weight-loss-journey";
  const post7Title = "My Simple Weight Loss Journey";
  const post7Intro = [
    "Or how I stopped \"starting from Monday\" every single week.",
    "Let me tell you a story.",
    "There was a time when I would eat one salad and suddenly believe I had unlocked a new personality. Healthy. Disciplined. Glowing. By 8 p.m., I was emotionally attached to a packet of chips because \"I deserved it.\"",
    "That cycle? Elite chaos.",
  ];
  const post7RealizationTitle = "The realization";
  const post7RealizationParas = [
    "My weight loss journey didn't begin with motivation. It began with realization. I wasn't gaining weight because my metabolism hated me. I was gaining weight because my habits were inconsistent. Skipping meals. Late-night snacking. Zero movement. Then random extreme diets that lasted exactly 4.5 days.",
  ];
  const post7ShiftTitle = "The biggest shift";
  const post7ShiftParas = [
    "The biggest shift wasn't cutting carbs or surviving on soup. It was understanding something very basic: weight loss is about a small, consistent calorie deficit — not starvation.",
    "Instead of dramatic changes, I made boring ones. I started eating structured meals. Protein in every meal. More vegetables. More water. Fewer mindless snacks. I didn't ban pizza. I just stopped pretending it was a daily food group.",
  ];
  const post7MovementTitle = "Then came movement";
  const post7MovementParas = [
    "Not punishment workouts. Not \"burn 1000 calories in 30 minutes\" YouTube videos. Just daily walks and basic strength training. Squats. Push-ups. Dumbbells. Progressive overload. Slow increases. No ego lifting.",
  ];
  const post7TwistTitle = "The plot twist";
  const post7TwistParas = [
    "And here's the plot twist — strength training changed everything. When you build muscle while losing fat, your body looks tighter, not just smaller. The scale moved slowly, but my clothes fit differently. My energy improved. My posture improved. Even my sleep improved.",
  ];
  const post7ProgressTitle = "Was it fast?";
  const post7ProgressParas = [
    "Was it fast? No.",
    "Did I get abs in 2 weeks? Absolutely not.",
    "But I lost 0.5 kg. Then another. Then another. And more importantly, I stopped losing and gaining the same 2 kg every month.",
  ];
  const post7MomentTitle = "The moment it clicked";
  const post7MomentParas = [
    "There was one specific moment I remember clearly. I walked past a mirror expecting to criticize myself — and instead I noticed progress. Not dramatic. Just real. My face looked less puffy. My shoulders looked defined. And for once, I didn't feel like I was \"trying.\" I was just consistent.",
    "That's when it clicked.",
  ];
  const post7SystemsTitle = "Weight loss is about systems";
  const post7SystemsParas = [
    "Weight loss isn't about suffering. It's about systems. Small calorie control. Strength training. Daily steps. Sleep. Patience.",
    "The crazy part? The less dramatic I made it, the better it worked.",
    "No detox tea.",
    "No starving.",
    "No villainizing rice.",
    "Just structure and showing up.",
  ];
  const post7FinalTitle = "The real glow-up";
  const post7FinalParas = [
    "If you're on your own weight loss journey, remember this: you don't need a new body. You need new habits.",
    "And habits aren't built in 7 days.",
    "They're built in the boring middle — the part where no one claps, but everything changes.",
    "That's the real glow-up. 💪",
  ];

  const post8Id = "fitfare-technology";
  const post8Title = "How FitFare Is Using Technology to Make Fitness Smarter (Not Harder) 💻💪";
  const post8Intro = [
    "Because guessing your workouts in 2026 is outdated behavior.",
    "Let's be honest.",
    "Most of us started our fitness journey with chaos.",
    "Random YouTube workouts.",
    "Copying someone else's split.",
    "Trying what a fitness influencer with 4 million followers does — even though they train full-time and you sit 8 hours a day.",
    "That era? Over.",
    "Welcome to smart fitness. Welcome to FitFare.",
  ];
  const post8PlanTitle = "From \"What Should I Do Today?\" to \"Here's Your Plan.\"";
  const post8PlanParas = [
    "One of the biggest problems in fitness isn't laziness. It's confusion.",
    "Should you do cardio?",
    "Strength?",
    "HIIT?",
    "Rest?",
    "FitFare removes the guesswork. Instead of giving you a generic workout template, technology allows your training to be structured, trackable, and adaptive.",
    "Your data becomes your strategy.",
    "Age, goals, activity levels, past workouts — everything feeds into a smarter recommendation system. So instead of randomly repeating the same exercises for weeks, your program evolves.",
    "And growth loves evolution.",
  ];
  const post8TrackingTitle = "Data Tracking = Progress You Can See";
  const post8TrackingParas = [
    "Motivation fades. Numbers don't lie.",
    "When you track workouts digitally — sets, reps, weights, duration — you stop relying on memory and start relying on metrics. FitFare helps users see patterns:",
    "Are you increasing strength?",
    "Are you consistent?",
    "Are you plateauing?",
    "Data-driven fitness means small improvements compound over time. A 2 kg increase this week. One extra rep next week. Slightly faster cardio pace the week after.",
    "Tiny upgrades. Massive results.",
  ];
  const post8RecoveryTitle = "Tech That Understands Recovery";
  const post8RecoveryParas = [
    "Old mindset: \"Push through.\"",
    "New mindset: \"Optimize.\"",
    "Smart fitness platforms now integrate recovery insights — sleep patterns, fatigue levels, training frequency. When you understand recovery, you reduce injury risk and improve long-term performance.",
    "FitFare isn't about burning out in 10 days. It's about sustainable performance.",
    "Because the real flex isn't extreme workouts.",
    "It's consistency for months.",
  ];
  const post8PersonalizedTitle = "Personalized Recommendations > Generic Advice";
  const post8PersonalizedParas = [
    "Fitness in 2026 isn't one-size-fits-all.",
    "A 19-year-old student and a 30-year-old corporate employee don't need the same plan. Lifestyle, stress, sleep, and metabolism all matter.",
    "Technology allows personalization at scale. Whether your goal is weight loss, muscle gain, endurance, or general health — your training can be aligned with your reality.",
    "Not someone else's highlight reel.",
  ];
  const post8VisionTitle = "The Bigger Vision: A Smarter Fitness Ecosystem";
  const post8VisionParas = [
    "FitFare isn't just about workouts. It's about creating an ecosystem where:",
    "Training is structured.",
    "Progress is measurable.",
    "Recovery is respected.",
    "And technology supports human goals.",
    "It's fitness backed by logic — not trends.",
    "Because in 2026, working hard is normal.",
    "Working smart? That's elite.",
    "And FitFare is building exactly that. 🚀",
  ];

  return (
    <div className={isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}>
      <ScrollProgress />
      <Navbar />

      {!active && (
      <section className="relative pt-28 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl border backdrop-blur-xl px-6 py-10 md:px-10 md:py-14 shadow-[0_18px_45px_rgba(15,23,42,0.45)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/70 border-slate-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Our Blogs
                </h1>
                <p className={`mt-2 text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Stories, guides, and tips to power your fitness.
                </p>
              </div>
              <div className="flex-1">
                <img
                  src={blogging}
                  alt="Our Blogs"
                  className="w-full rounded-2xl border object-cover"
                />
              </div>
            </div>

            <div ref={carouselRef}>
              <Carousel 
                className="mt-8" 
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                  duration: 20,
                }}
              >
              <CarouselContent>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href="/blog/top-10-beginner"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blog/top-10-beginner");
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={top10} alt="Top 10 Beginner Workouts" className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">Top 10 Beginner Workouts to Start Your Fitness Journey</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href="/blog/post-workout-recipes"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blog/post-workout-recipes");
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={postWorkoutImg} alt="Healthy Post-Workout Recipes" className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">Healthy Post-Workout Recipes to Speed Recovery</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post3Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post3Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                <img src={overthinkImg} alt="Why Workouts Are Better Than Overthinking?" className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post3Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post4Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post4Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={aiTransform} alt={post4Title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post4Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post5Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post5Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={periodImg} alt={post5Title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post5Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post6Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post6Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={weightGainImg} alt={post6Title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post6Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post7Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post7Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={weightLossImg} alt={post7Title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post7Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.a
                    href={`/blog/${post8Id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post8Id}`);
                    }}
                    className="group relative rounded-2xl overflow-hidden border block cursor-pointer"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src="/blue-background-logo.png" alt={post8Title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-white font-extrabold text-base">{post8Title}</div>
                    </div>
                  </motion.a>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious 
                className={`
                  ${isDark 
                    ? "bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700/90" 
                    : "bg-white/90 border-slate-300 text-slate-900 hover:bg-white shadow-lg"
                  }
                `}
              />
              <CarouselNext 
                className={`
                  ${isDark 
                    ? "bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700/90" 
                    : "bg-white/90 border-slate-300 text-slate-900 hover:bg-white shadow-lg"
                  }
                `}
              />
            </Carousel>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {active && (
      <section className="relative pt-20 md:pt-28 pb-20 px-4" key={active}>
        <div className="max-w-4xl mx-auto">
          {active === "top-10-beginner" && (
          <motion.article
            id="top-10-beginner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  Top 10 Beginner Workouts to Start Your Fitness Journey
                </h2>
              </div>
              <div className="flex-1">
                <img src={top10} alt="Top 10 Beginner Workouts" className="w-full rounded-2xl border object-cover" />
              </div>
            </div>
            <div className="space-y-3">
              {introParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {workouts.map((w, idx) => (
                <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{idx + 1}. {w.title}</h3>
                  <div className="space-y-2">
                    {w.paras.map((para, j) => (
                      <p key={j} className={isDark ? "text-slate-300" : "text-slate-700"}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">How to Start Without Overthinking It</h3>
              <p className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Here’s a simple beginner structure:</p>
              <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {howTo.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`mt-2 block w-2 h-2 rounded-full ${isDark ? "bg-white" : "bg-slate-900"}`} />
                    <span className={isDark ? "text-slate-200" : "text-slate-700"}>{h}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-3 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                That’s it. No overcomplicating. No “detox.” No extreme 7-day transformation nonsense.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">The Real Secret Nobody Talks About</h3>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>The first week feels exciting.</p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>The second week feels hard.</p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>The third week builds discipline.</p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>
                Fitness isn’t about motivation. It’s about showing up even when your brain says, “Let’s skip today.”
              </p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>You don’t need to be perfect. You just need to be consistent.</p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>Start small. Improve gradually. Celebrate progress.</p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>
                And remember — you’re not trying to look like someone else. You’re building your strongest version.
              </p>
              <p className={isDark ? "text-slate-300" : "text-slate-700"}>Now go start. Not Monday. Today. 💪</p>
            </div>
          </motion.article>
          )}

          {active === "post-workout-recipes" && (
          <motion.article
            id="post-workout-recipes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post2Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={postWorkoutImg} alt="Healthy Post-Workout Recipes" className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post2Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post2RuleTitle}</h3>
              {post2RuleParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {post2Recipes.map((r, i) => (
                <div key={i}>
                  <h4 className="text-lg md:text-xl font-bold mb-1">{r.title}</h4>
                  <div className="space-y-2">
                    {r.paras.map((p, j) => (
                      <p key={j} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post2HydrationTitle}</h3>
              {post2HydrationParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post2AvoidTitle}</h3>
              {post2AvoidParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post2GlowTitle}</h3>
              {post2GlowParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post3Id && (
          <motion.article
            id={post3Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post3Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={overthinkImg} alt={post3Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post3Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3OverthinkingTitle}</h3>
              {post3OverthinkingParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3ExerciseTitle}</h3>
              {post3ExerciseParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3WhyTitle}</h3>
              {post3WhyParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3ConfidenceTitle}</h3>
              {post3ConfidenceParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3No90Title}</h3>
              {post3No90Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3GlowTitle}</h3>
              {post3GlowParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post3CallTitle}</h3>
              {post3CallParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post4Id && (
          <motion.article
            id={post4Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post4Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={aiTransform} alt={post4Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post4Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4DeathTitle}</h3>
              {post4DeathParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4NetflixTitle}</h3>
              {post4NetflixParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4RealtimeTitle}</h3>
              {post4RealtimeParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4RecoveryTitle}</h3>
              {post4RecoveryParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4NutritionTitle}</h3>
              {post4NutritionParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4AaravTitle}</h3>
              {post4AaravParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4EnhanceTitle}</h3>
              {post4EnhanceParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4PredictTitle}</h3>
              {post4PredictParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post4MeaningTitle}</h3>
              {post4MeaningParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post5Id && (
          <motion.article
            id={post5Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post5Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={periodImg} alt={post5Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post5Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5HormonesTitle}</h3>
              {post5HormonesParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5LightMoveTitle}</h3>
              {post5LightMoveParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5RestTitle}</h3>
              {post5RestParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5ListenTitle}</h3>
              {post5ListenParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5WhyHardTitle}</h3>
              {post5WhyHardParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5HelpsTitle}</h3>
              {post5HelpsParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5DistressTitle}</h3>
              {post5DistressParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5MentalTitle}</h3>
              {post5MentalParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5FlexTitle}</h3>
              {post5FlexParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5AdjustTitle}</h3>
              {post5AdjustParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post5FinalTitle}</h3>
              {post5FinalParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post6Id && (
          <motion.article
            id={post6Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post6Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={weightGainImg} alt={post6Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post6Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section1Title}</h3>
              {post6Section1Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section2Title}</h3>
              {post6Section2Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section3Title}</h3>
              {post6Section3Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section4Title}</h3>
              {post6Section4Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section5Title}</h3>
              {post6Section5Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post6Section6Title}</h3>
              {post6Section6Paras.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post7Id && (
          <motion.article
            id={post7Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post7Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src={weightLossImg} alt={post7Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post7Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7RealizationTitle}</h3>
              {post7RealizationParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7ShiftTitle}</h3>
              {post7ShiftParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7MovementTitle}</h3>
              {post7MovementParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7TwistTitle}</h3>
              {post7TwistParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7ProgressTitle}</h3>
              {post7ProgressParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7MomentTitle}</h3>
              {post7MomentParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7SystemsTitle}</h3>
              {post7SystemsParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post7FinalTitle}</h3>
              {post7FinalParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}

          {active === post8Id && (
          <motion.article
            id={post8Id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl border backdrop-blur-xl px-4 py-6 md:px-10 md:py-12 shadow-[0_18px_45px_rgba(15,23,42,0.35)] ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="mb-4">
              <button
                onClick={() => navigate("/blog")}
                className={`text-sm font-semibold underline ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                ← Back to all blogs
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {post8Title}
                </h2>
              </div>
              <div className="flex-1">
                <img src="/blue-background-logo.png" alt={post8Title} className="w-full rounded-2xl border object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              {post8Intro.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post8PlanTitle}</h3>
              {post8PlanParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post8TrackingTitle}</h3>
              {post8TrackingParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post8RecoveryTitle}</h3>
              {post8RecoveryParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post8PersonalizedTitle}</h3>
              {post8PersonalizedParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{post8VisionTitle}</h3>
              {post8VisionParas.map((p, i) => (
                <p key={i} className={isDark ? "text-slate-300" : "text-slate-700"}>{p}</p>
              ))}
            </div>
          </motion.article>
          )}
        </div>
      </section>
      )}

      <FooterSection />
    </div>
  );
};

export default Blog;
