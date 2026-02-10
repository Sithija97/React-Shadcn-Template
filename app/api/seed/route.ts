import { connectDB } from "@/mongodb/db";
import { Post, IPostBase } from "@/mongodb/models/post";
import { NextResponse } from "next/server";

const botUsers = [
  {
    userId: "bot-ada",
    userImage: "https://i.pravatar.cc/150?img=5",
    firstName: "Ada",
    lastName: "Lovelace",
  },
  {
    userId: "bot-alan",
    userImage: "https://i.pravatar.cc/150?img=12",
    firstName: "Alan",
    lastName: "Turing",
  },
  {
    userId: "bot-grace",
    userImage: "https://i.pravatar.cc/150?img=32",
    firstName: "Grace",
    lastName: "Hopper",
  },
  {
    userId: "bot-katherine",
    userImage: "https://i.pravatar.cc/150?img=45",
    firstName: "Katherine",
    lastName: "Johnson",
  },
];

const basePostTexts: string[] = [
  "React tip: keep server data and UI state separate. It makes caching and revalidation much simpler. I also document where the source of truth lives so the team stays aligned.",
  "Next.js routing feels magical until you need observability. Add request IDs early; your logs will thank you. I usually wire this into middleware and carry it to the client.",
  "Interview prep: practice explaining trade-offs, not just solutions. Signal your decision process with constraints, risks, and why you chose one path. It shows seniority fast.",
  "JavaScript performance: avoid needless re-renders by memoizing expensive selectors, not whole components. Measure before and after so you can prove impact.",
  "Built a small design system starter. Tokens first, components second, docs always. It keeps the UI consistent without slowing product work.",
  "If your API is slow, profile the database before the network. 80% of my wins are query indexes. A single missing index can look like a full-stack problem.",
  "Next.js App Router lesson: fetch in server components by default, and opt into client only when needed. This keeps bundles lean and hydration cheap.",
  "React 19: actions reduce boilerplate, but keep your error boundaries close to forms. I also track optimistic updates so UX stays crisp under latency.",
  "System design prep: start with constraints, then choose patterns. It keeps the solution grounded. A good design is often a boring one that scales.",
  "Accessibility wins: keyboard-only navigation is the fastest quality signal in UI reviews. If you can tab the app confidently, you are already ahead.",
  "Recruiters: include salary bands. Candidates respond faster and you save cycles. It also builds trust before the first call.",
  "Interview prep: build a 20-minute story bank for your projects, with impact metrics. Practice telling it in 60 seconds and in 10 minutes.",
  "TypeScript: when in doubt, model data at the boundary and keep the core minimal. It prevents type sprawl and makes refactors safer.",
  "Next.js caching: tag your fetches and revalidate by tag for clean, predictable updates. It beats manual cache busting every time.",
  "React forms: keep validation synchronous for UX; reserve async checks for submit. Users should not wait for every keystroke.",
  "Hot tech: RAG is useful, but careful with grounding. Retrieval quality beats prompt size. I audit sources before shipping answers.",
  "UI performance: measure CLS and LCP on real devices. Emulators hide real pain. A mid-tier Android phone is the best QA tool.",
  "Interview prep: practice follow-up questions. Senior signals show up in the second layer. Explain why you would monitor a system, not just build it.",
  "Node.js: prefer `AbortController` to cancel work; it keeps resource usage sane under load. It also makes timeouts a first-class feature.",
  "Next.js + Edge: use middleware sparingly; every request pays the cost. I keep it thin and move logic to route handlers.",
  "React tip: colocate component tests with stories; it keeps design and behavior in sync. Designers can review behavior in Storybook faster.",
  "Recruitment: detailed job posts reduce noise. Vague roles attract mismatched applicants. A clear tech stack filters better than a generic list.",
  "JavaScript: move heavy calculations off the main thread with Web Workers when possible. It keeps the UI responsive during spikes.",
  "Interview prep: draw the architecture. Visual communication is part of the job. A clear diagram can save five minutes of talking.",
  "Front-end tooling: Vite is fast, but Next.js handles the hard parts of production. I still use Vite for small tools and demos.",
  "Next.js images: remote patterns save headaches. Set them once and move on. Image optimization is a big win for perceived speed.",
  "Testing: high-value tests live at integration boundaries, not in internal helpers. If a test does not fail when it should, it is noise.",
  "DevOps: treat observability as a feature. Dashboards are part of the product. My rule is every deploy should move a metric.",
  "React: prefer composition over prop drilling; it keeps mental load low. Small wrappers beat huge component APIs.",
  "Interview prep: time-box your solution. Finish a good plan before chasing perfect code. It shows you can work under constraints.",
  "API design: version with behavior changes, not data shape. It helps clients adapt. Compatibility is a product decision.",
  "Next.js: `revalidatePath` is powerful, but document why each revalidation exists. Future you will need to know when it fires.",
  "React UI: build empty states early. They drive clarity in data contracts. Your API will be better because of it.",
  "JavaScript: strict equality saves hours of debugging. Make it muscle memory. I lint for it and never look back.",
  "Recruiters: highlight must-have vs nice-to-have. It broadens qualified applicants. It also reduces self-selection bias.",
  "Interview prep: use STAR, but add the technical context. It shows depth. A story without architecture details feels thin.",
  "TypeScript: prefer `unknown` over `any` and refine with small helpers. It forces you to model data honestly.",
  "Next.js: server actions simplify forms, but keep an audit trail for mutations. Logs and analytics matter for debugging.",
  "React: if a hook has three responsibilities, split it into two. It makes testing easier and reduces re-renders.",
  "Security: sanitize user-generated content before storage, not just before render. It keeps your data clean and safer to reuse.",
  "Career tip: keep a weekly brag doc. It makes reviews and resumes easy. You will forget wins if you do not write them down.",
  "Interview prep: practice explaining why you rejected alternatives. It shows judgment, not just output. Hiring teams value that.",
  "Modern JS: optional chaining is great, but avoid hiding nulls you need to fix. Silent failures become expensive later.",
  "Next.js: app layout is a contract. Keep it stable and you avoid rerenders. It also keeps streaming behavior predictable.",
  "React: use transitions for non-urgent updates; it keeps typing responsive. I reserve them for search results and filters.",
  "Hot tech: AI copilots help, but read the generated code before shipping. The quickest bugs are the ones you never accepted.",
  "Recruitment: fast feedback loops reduce drop-off. Two-day response beats two-week silence. Candidates remember speed.",
  "Interview prep: do a mock with someone outside your stack. It builds clarity. If they understand you, the panel will too.",
  "API performance: compress JSON, but profile CPU overhead if traffic is high. It is a trade-off between bandwidth and compute.",
  "Next.js: route handlers should be thin. Put logic in lib and keep handlers clean. It keeps tests simple and reuse high.",
  "React: use `key` changes sparingly; remounting is expensive. Keep local state stable unless you truly need a reset.",
  "JavaScript: be explicit with `Number()` in parsing. Avoid implicit coercion bugs. Your future self will thank you.",
  "TypeScript: keep your domain types small and composable. It makes refactors faster and safer.",
  "Interview prep: practice answering \"Tell me about a time you disagreed\" with empathy and data. Show how you resolved it, not just that you were right.",
  "Cloud: pick one cloud feature and learn it deeply. Breadth comes later. Depth is what helps you debug at 3 a.m.",
  "Next.js: cache invalidation is a product decision as much as a tech one. Be clear about freshness requirements with stakeholders.",
  "React: build component APIs for future usage, not just the first case. A little foresight prevents breaking changes.",
  "JavaScript: use `Intl` for formatting; it beats hand-rolled strings. It also keeps localization consistent.",
  "Recruitment: inclusive language in postings improves diversity in the funnel. Small wording shifts make a difference.",
  "Interview prep: keep a checklist for system design: scale, data, failure modes. If you can name trade-offs, you can lead.",
  "Testing: flaky tests are worse than no tests. Fix or delete. Trust in CI is non-negotiable.",
  "Next.js: optimize images early; it gives the biggest perceived speed win. A faster LCP changes how the app feels.",
  "React: keep CSS layout decisions close to components to avoid cascade surprises. It reduces regressions during refactors.",
  "Hot tech: multi-modal AI is cool, but your data quality still matters most. Bad inputs still produce bad outputs.",
  "JavaScript: avoid deep cloning in hot paths; normalize state instead. It reduces memory churn and GC spikes.",
  "Interview prep: set a timer and practice whiteboarding in 25-minute sprints. You will learn where you stall.",
  "DevOps: blue-green deploys are simple insurance when you can afford it. They make rollbacks boring, which is good.",
  "Next.js: use `notFound()` for missing data, not ad-hoc redirects. The intent is clearer and the UX is consistent.",
  "React: server components are not a silver bullet; pick them for data-bound views. Use client components where interactivity is real.",
  "Recruitment: clear take-home instructions reduce candidate anxiety. If the rules are clear, performance is better.",
  "TypeScript: use `satisfies` for config objects to keep types strict but flexible. It keeps inference and guardrails together.",
  "JavaScript: prefer `map` and `filter` for clarity, but measure in hot loops. Clean code is great until it is slow.",
  "Interview prep: practice reviewing a pull request live. It shows practical skill. Talk about readability, not just correctness.",
  "Next.js: route groups keep URLs clean while organizing your app structure. It saves future you a reorganization.",
  "React: avoid prop drilling with context, but keep contexts small and specific. One giant context creates hidden coupling.",
  "Hot tech: vector databases shine when you model metadata thoughtfully. Index design is half the product.",
  "Recruitment: transparent timelines help candidates plan and stay engaged. Uncertainty leads to drop-off.",
  "JavaScript: use `Promise.allSettled` when failures are expected, not `Promise.all`. It keeps your workflows resilient.",
  "Interview prep: know the trade-offs of REST vs GraphQL vs RPC. Focus on latency, caching, and team fit.",
  "Next.js: `generateMetadata` should be fast; it runs more often than you think. Cache aggressively and keep it lean.",
  "React: stable references with `useCallback` matter most for memoized children. Measure before adding it everywhere.",
  "TypeScript: keep runtime validation in sync with types using a single source. Drifts become production bugs.",
  "AI tools: use lint and tests to validate. Autocomplete is not correctness. Guardrails still matter.",
  "Recruitment: share the interview structure upfront; it reduces bias and stress. Clarity improves candidate experience.",
  "Career tip: write a short tech memo weekly. It sharpens your communication. The habit compounds over time.",
  "JavaScript: prefer `URL` for parsing; string splits are fragile. Built-ins are safer and more readable.",
  "Next.js: use `headers()` and `cookies()` on the server for personalization. Keep it deterministic for caching.",
  "React: keep event handlers thin; move logic into helpers for testability. It keeps components readable.",
  "Interview prep: practice debugging a small bug live; it happens in real interviews. Narrate your thinking clearly.",
  "Cloud: cost awareness is a skill. Add budgets and alerts early. It is easier than cutting costs later.",
];

const extraSentences: string[] = [
  "I keep a short checklist so the idea turns into a repeatable habit.",
  "The best teams I have worked with share these lessons in postmortems.",
  "If you can explain it simply, you can usually build it cleanly.",
  "I try to pair this with small experiments to validate the impact.",
  "This one change tends to reduce bugs and speed up reviews.",
  "A little documentation here saves a lot of Slack messages later.",
  "It also helps new hires ramp faster without shadowing for weeks.",
  "When time is tight, this is still the first thing I do.",
  "I have seen this approach win in startups and at larger teams.",
  "If you adopt this, measure the outcome and share the numbers.",
];

const postTexts: string[] = basePostTexts.map(
  (text, index) => `${text} ${extraSentences[index % extraSentences.length]}`,
);


const baseTimeMs = Date.now() - 1000 * 60 * 60 * 24 * 30; // 30 days ago
const seedPosts: (IPostBase & { createdAt: Date; updatedAt: Date })[] =
  postTexts.map((text, index) => {
    const createdAt = new Date(baseTimeMs + index * 1000 * 60 * 60 * 6);
    return {
      user: botUsers[index % botUsers.length],
      text,
      ...(index % 5 < 3
        ? { imageUrl: `https://picsum.photos/seed/tech-${index + 1}/1200/800` }
        : {}),
      createdAt,
      updatedAt: createdAt,
    };
  });

export const POST = async (request: Request) => {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Seeding is only allowed in development." },
      { status: 403 },
    );
  }

  await connectDB();

  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "1";
  const botIds = botUsers.map((user) => user.userId);

  const existing = await Post.countDocuments();
  const existingBotPosts = await Post.countDocuments({
    "user.userId": { $in: botIds },
  });

  if (force) {
    await Post.deleteMany({ "user.userId": { $in: botIds } });
    await Post.insertMany(seedPosts);
    return NextResponse.json(
      {
        message: "Re-seeded demo posts.",
        count: seedPosts.length,
        existing,
      },
      { status: 201 },
    );
  }

  if (existing === 0 || existingBotPosts === 0) {
    await Post.insertMany(seedPosts);
    return NextResponse.json(
      {
        message: "Seeded demo posts.",
        count: seedPosts.length,
        existing,
      },
      { status: 201 },
    );
  }

  return NextResponse.json(
    {
      message: "Posts already exist. Skipping seed.",
      existing,
      existingBotPosts,
    },
    { status: 200 },
  );
};

export const DELETE = async () => {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Deleting seed posts is only allowed in development." },
      { status: 403 },
    );
  }

  await connectDB();

  const botIds = botUsers.map((user) => user.userId);
  const result = await Post.deleteMany({ "user.userId": { $in: botIds } });

  return NextResponse.json(
    {
      message: "Deleted demo posts.",
      deleted: result.deletedCount || 0,
    },
    { status: 200 },
  );
};
