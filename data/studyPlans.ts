import type { StudyPlan } from "./types";

// Every plan's `scope` mirrors the matching Assessment's real scope in `tests.ts`
// (itself transcribed from /course-docs and, for MAM2013S/MAM2014S, the concept
// briefings' chapter breakdown). Where a test's chapter split between Test 1 and
// Test 2 isn't stated anywhere in the source material (MAM2013S, MAM2014S), the
// split used here is a pacing estimate, not a confirmed fact — see the last scope
// item on each affected test in `tests.ts` and PROJECT_STATUS.md.
export const studyPlans: StudyPlan[] = [
  // ---------------------------------------------------------------------------
  // STA2005S — Linear Models
  // ---------------------------------------------------------------------------
  {
    id: "sta-test-1-plan",
    courseCode: "STA2005S",
    testId: "sta-test-1",
    scope: [
      "Multivariate normal distribution & quadratic forms",
      "The linear model & maximum likelihood estimation",
      "Gauss-Markov theorem",
      "Variable selection procedures",
      "Residual analysis & model diagnostics",
      "Bootstrapping",
      "Principal components",
    ],
    startDate: "2026-08-16",
    phases: [
      {
        date: "2026-08-16",
        focus: "Multivariate normal distribution & quadratic forms",
        tasks: [
          "Review the /concepts STA2005S cards on the MVN distribution, its linear transformations, and quadratic forms & the chi-square distribution",
          "Redo the Week 1 Q&A document's MVN/quadratic-form questions unaided",
          "Write out the MVN density and list which linear transformations preserve normality, from memory",
        ],
      },
      {
        date: "2026-08-18",
        focus: "The linear model & maximum likelihood estimation",
        tasks: [
          "Review the /concepts card \"The general linear model & maximum likelihood estimation\"",
          "Re-derive the MLE for the regression coefficients and error variance from the log-likelihood, without notes",
          "Work through STA2005S Notes.pdf §3's practice examples",
        ],
      },
      {
        date: "2026-08-20",
        focus: "Gauss-Markov theorem",
        tasks: [
          "Review the /concepts card \"The Gauss-Markov theorem: OLS is BLUE\"",
          "Write out the Gauss-Markov assumptions and sketch the proof structure (why OLS is BLUE) from memory",
          "Work through STA2005S Notes.pdf §9's practice examples",
        ],
      },
      {
        date: "2026-08-22",
        focus: "Residual analysis & model diagnostics",
        tasks: [
          "Review the /concepts cards on residual diagnostics and on outliers/leverage/influence",
          "Practise reading a residual-vs-fitted plot and a Q-Q plot: list what each is used to diagnose",
          "Work through STA2005S Notes.pdf §7's practice examples",
        ],
      },
      {
        date: "2026-08-24",
        focus: "Variable selection procedures",
        tasks: [
          "Review the /concepts card \"Variable selection: all-subsets, stepwise, AIC/BIC\"",
          "Compare AIC vs. BIC vs. adjusted R² as selection criteria, in your own words",
          "Work through STA2005S Notes.pdf §8's practice examples",
        ],
      },
      {
        date: "2026-08-27",
        focus: "Bootstrapping",
        tasks: [
          "No /concepts card exists yet for this topic — work directly from the lecture slides/notes on bootstrapping",
          "Write out the bootstrap resampling procedure for estimating a standard error, step by step",
          "If an R prac covered bootstrapping, re-run it from a blank script without copying old code",
        ],
      },
      {
        date: "2026-08-29",
        focus: "Principal components",
        tasks: [
          "No /concepts card exists yet for this topic — work directly from the lecture slides/notes on PCA",
          "Write out what a principal component is and how it relates to the covariance matrix's eigenvectors, in your own words",
          "Sketch how PCA would reduce a small example dataset to 1–2 components",
        ],
      },
      {
        date: "2026-08-31",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or lecturer-provided practice questions), closed-book",
          "Re-skim all 7 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen/calculator; confirm the venue (JD LT2 & James LT 4A) and arrive early",
        ],
      },
    ],
    resources: [
      { label: "STA2005S Notes.pdf (own notes)" },
      { label: "Week 1 slide decks + Q&A doc (own notes)" },
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — regression, diagnostics, model selection",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
  },
  {
    id: "sta-test-2-plan",
    courseCode: "STA2005S",
    testId: "sta-test-2",
    scope: [
      "Causal inference as a bridge from regression to experiments",
      "Basic design principles",
      "Completely randomised, randomised block & Latin square designs",
      "Factorial experiments & ANOVA",
      "The problem of multiple comparisons",
      "Power and sample size calculations",
    ],
    startDate: "2026-09-26",
    phases: [
      {
        date: "2026-09-26",
        focus: "Causal inference as a bridge from regression to experiments",
        tasks: [
          "No /concepts card exists yet for this topic (design-of-experiments content isn't ingested there) — work directly from lecture slides/notes",
          "Write in your own words why randomised experiments support causal claims that observational regression alone can't",
        ],
      },
      {
        date: "2026-09-28",
        focus: "Basic design principles",
        tasks: [
          "Review lecture notes on replication, randomisation and blocking — the three core design principles",
          "For a made-up experiment (pick any topic), state which of the three principles each design choice addresses",
        ],
      },
      {
        date: "2026-09-30",
        focus: "Completely randomised, randomised block & Latin square designs",
        tasks: [
          "Compare CRD vs. RBD vs. Latin square: when is each the right choice, and what does each control for?",
          "Sketch the layout (treatments × blocks/rows/columns) for one example of each design",
        ],
      },
      {
        date: "2026-10-03",
        focus: "Factorial experiments & ANOVA",
        tasks: [
          "Review the /concepts card \"The regression ANOVA table, R² and adjusted R²\" as a refresher on the ANOVA decomposition before extending it to factorial designs",
          "Write out the sums-of-squares decomposition for a two-factor factorial design, including the interaction term",
        ],
      },
      {
        date: "2026-10-06",
        focus: "The problem of multiple comparisons",
        tasks: [
          "Explain in your own words why running many pairwise t-tests inflates the family-wise error rate",
          "Compare Bonferroni vs. Tukey's HSD as corrections — what does each trade off?",
        ],
      },
      {
        date: "2026-10-09",
        focus: "Power and sample size calculations",
        tasks: [
          "Write out the relationship between effect size, sample size, significance level and power",
          "Work through 2–3 practice sample-size calculations from the lecture notes or tutorial sheets",
        ],
      },
      {
        date: "2026-10-11",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or lecturer-provided practice questions), closed-book",
          "Re-skim all 6 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen/calculator; confirm the venue (JD LT2 & James LT 4A) and arrive early",
        ],
      },
    ],
    resources: [
      { label: "STA2005S Notes.pdf + lecture slides (own notes)" },
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — ANOVA, experimental design intuition",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MAM2012S (2DE) — Differential Equations
  // ---------------------------------------------------------------------------
  {
    id: "mam2012-test-1-plan",
    courseCode: "MAM2012S",
    testId: "mam2012-test-1",
    scope: [
      "Linear independence of functions & the Wronskian",
      "Homogeneous constant-coefficient ODEs & the auxiliary polynomial",
      "The annihilator method for nonhomogeneous ODEs",
      "Variation of parameters",
      "Cauchy-Euler equations",
    ],
    startDate: "2026-08-17",
    phases: [
      {
        date: "2026-08-17",
        focus: "Linear independence of functions & the Wronskian",
        tasks: [
          "Review the /concepts card \"Linear independence of functions & the Wronskian\"",
          "Compute the Wronskian for 2–3 practice function sets and state whether each set is independent",
        ],
      },
      {
        date: "2026-08-19",
        focus: "Homogeneous constant-coefficient ODEs",
        tasks: [
          "Review the /concepts card \"Homogeneous constant-coefficient ODEs & the auxiliary polynomial\"",
          "Solve 3–4 practice ODEs covering all three auxiliary-root cases (real distinct, repeated, complex)",
        ],
      },
      {
        date: "2026-08-21",
        focus: "The annihilator method",
        tasks: [
          "Review the /concepts card \"The annihilator method for nonhomogeneous ODEs\"",
          "Solve 2–3 nonhomogeneous ODEs using the annihilator method unaided",
        ],
      },
      {
        date: "2026-08-24",
        focus: "Variation of parameters",
        tasks: [
          "Review the /concepts card \"Variation of parameters\"",
          "Solve 2–3 nonhomogeneous ODEs using variation of parameters, then check them against the annihilator-method answers from the previous phase where the RHS allows both methods",
        ],
      },
      {
        date: "2026-08-27",
        focus: "Cauchy-Euler equations",
        tasks: [
          "Review the /concepts card \"Cauchy-Euler equations\"",
          "Solve 2–3 practice Cauchy-Euler equations covering all three indicial-root cases",
        ],
      },
      {
        date: "2026-08-30",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 5 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen/calculator; confirm the venue and arrive early",
        ],
      },
    ],
    resources: [
      { label: "2DE NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "Socratica (YouTube channel) — differential equations solution techniques",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "mam2012-test-2-plan",
    courseCode: "MAM2012S",
    testId: "mam2012-test-2",
    scope: [
      "Diagonalisable systems & the matrix exponential",
      "Generalised eigenvectors & Jordan normal forms",
      "Complex eigenvalues & nonhomogeneous systems",
      "The heat equation, separation of variables & orthogonality/Fourier coefficients",
      "Fourier series & term-by-term differentiation/integration",
      "The Fourier transform & the Black-Scholes equation",
    ],
    startDate: "2026-09-27",
    phases: [
      {
        date: "2026-09-27",
        focus: "Diagonalisable systems & the matrix exponential",
        tasks: [
          "Review the /concepts cards \"Systems of linear ODEs & diagonalisable systems\" and \"The matrix exponential\"",
          "Solve a diagonalisable linear system by both the eigenvector method and the matrix-exponential method, and confirm they agree",
        ],
      },
      {
        date: "2026-09-30",
        focus: "Generalised eigenvectors & Jordan normal forms",
        tasks: [
          "Review the /concepts cards \"Generalised eigenvectors\" and \"Jordan normal form\" (both marked hard/stretch — use the tips)",
          "Work through 1–2 practice systems with a repeated eigenvalue and an incomplete eigenspace",
        ],
      },
      {
        date: "2026-10-03",
        focus: "Complex eigenvalues & nonhomogeneous systems",
        tasks: [
          "Review the /concepts cards \"Complex eigenvalues in systems of ODEs\" and \"Nonhomogeneous systems of linear ODEs\"",
          "Solve one system with complex eigenvalues and one nonhomogeneous system unaided",
        ],
      },
      {
        date: "2026-10-06",
        focus: "The heat equation, separation of variables & Fourier coefficients",
        tasks: [
          "Review the /concepts cards \"The heat equation & separation of variables\" and \"Orthogonality of functions & Fourier coefficients\"",
          "Work through the separation-of-variables derivation for the heat equation step by step, from memory",
        ],
      },
      {
        date: "2026-10-09",
        focus: "Fourier series & term-by-term differentiation/integration",
        tasks: [
          "Review the /concepts cards \"Fourier series, periodic extensions & Fourier's theorem\" and \"Term-by-term differentiation & integration of Fourier series\" (both marked hard/stretch — use the tips)",
          "Compute the Fourier series for 1–2 practice periodic functions",
        ],
      },
      {
        date: "2026-10-12",
        focus: "The Fourier transform & the Black-Scholes equation",
        tasks: [
          "Review the /concepts cards \"The Fourier transform & the heat equation on an infinite domain\" and \"The Black-Scholes equation\" (both marked hard/stretch — use the tips)",
          "Write out, from memory, how the Black-Scholes PDE is transformed into the heat equation",
        ],
      },
      {
        date: "2026-10-14",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 6 scope topics once, prioritising the four hard/stretch cards (Jordan form, Fourier series, term-by-term differentiation, Black-Scholes)",
          "Pack for the test: student card, pen/calculator; confirm the venue and arrive early",
        ],
      },
    ],
    resources: [
      { label: "2DE NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Linear Algebra",
        href: "https://www.youtube.com/@3blue1brown",
      },
      {
        label: "MIT OpenCourseWare — 18.S096 Topics in Mathematics with Applications in Finance",
        href: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MAM2013S (2IA)
  // ---------------------------------------------------------------------------
  {
    id: "mam-test-1-plan",
    courseCode: "MAM2013S",
    testId: "mam-test-1",
    scope: [
      "Mathematical induction & the Well-Ordering Axiom",
      "Divisibility, gcd, Bézout's Lemma & prime factorisation",
      "Congruence, ℤₙ & modular arithmetic",
      "Permutations, matrix notation & cycle decomposition",
      "The alternating group & the Parity Theorem",
      "Groups: definition, examples & Cayley tables",
      "Subgroups & the Subgroup Test",
    ],
    startDate: "2026-08-19",
    phases: [
      {
        date: "2026-08-19",
        focus: "Induction & the Well-Ordering Axiom",
        tasks: [
          "Review the /concepts card \"Mathematical induction & the Well-Ordering Axiom\"",
          "Write out 2 practice induction proofs (weak and strong) from scratch, unaided",
        ],
      },
      {
        date: "2026-08-21",
        focus: "Divisibility, gcd & prime factorisation",
        tasks: [
          "Review the /concepts card \"Divisibility, gcd, Bézout's Lemma & prime factorisation\"",
          "Run the Euclidean algorithm by hand on 2 practice pairs and express each gcd as a Bézout combination",
        ],
      },
      {
        date: "2026-08-23",
        focus: "Congruence, ℤₙ & modular arithmetic",
        tasks: [
          "Review the /concepts card \"Congruence, ℤₙ, modular arithmetic & solving congruences\"",
          "Solve 2–3 practice linear congruences unaided",
        ],
      },
      {
        date: "2026-08-25",
        focus: "Permutations & cycle decomposition",
        tasks: [
          "Review the /concepts card \"Permutations, matrix notation & cycle decomposition\"",
          "Write 3 practice permutations in cycle notation and compute their products by hand",
        ],
      },
      {
        date: "2026-08-27",
        focus: "The alternating group & parity",
        tasks: [
          "Review the /concepts card \"Transpositions, the Parity Theorem & the alternating group\"",
          "Determine the parity of 3 practice permutations two different ways (transposition count and cycle-length parity) and confirm they agree",
        ],
      },
      {
        date: "2026-08-29",
        focus: "Groups: definition & Cayley tables",
        tasks: [
          "Review the /concepts card \"Groups: definition, examples & Cayley tables\"",
          "Build the Cayley table for a small group (e.g. a symmetry group of order ≤6) and verify closure, identity and inverses directly from it",
        ],
      },
      {
        date: "2026-08-31",
        focus: "Subgroups & the Subgroup Test",
        tasks: [
          "Review the /concepts card \"Subgroups, the Subgroup Test & the centre of a group\"",
          "Apply the Subgroup Test to 2–3 candidate subsets of a group to decide which are actually subgroups",
        ],
      },
      {
        date: "2026-09-01",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 7 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen; confirm venue/time on Amathuba (still TBC as of writing) and arrive early",
        ],
      },
    ],
    resources: [
      { label: "MAM2013S NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra & number theory",
        href: "https://www.youtube.com/@Socratica",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for symmetry & permutations",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "mam-test-2-plan",
    courseCode: "MAM2013S",
    testId: "mam-test-2",
    scope: [
      "Cyclic groups, element order & the Fundamental Theorem of Finite Cyclic Groups",
      "Group homomorphisms & isomorphisms",
      "Cosets and Lagrange's Theorem",
      "Normal subgroups & factor (quotient) groups",
      "The First Isomorphism Theorem",
    ],
    startDate: "2026-09-25",
    phases: [
      {
        date: "2026-09-25",
        focus: "Cyclic groups & element order",
        tasks: [
          "Review the /concepts card \"Cyclic groups, element order & the Fundamental Theorem of Finite Cyclic Groups\"",
          "For a cyclic group of order 12, list the order of every element and every subgroup, and check it against the Fundamental Theorem",
        ],
      },
      {
        date: "2026-09-28",
        focus: "Homomorphisms & isomorphisms",
        tasks: [
          "Review the /concepts card \"Group homomorphisms & isomorphisms\"",
          "For 2 practice maps between small groups, check the homomorphism property directly and find the kernel/image",
        ],
      },
      {
        date: "2026-10-01",
        focus: "Cosets & Lagrange's Theorem",
        tasks: [
          "Review the /concepts card \"Cosets and Lagrange's Theorem\"",
          "List all left cosets of a chosen subgroup in a small group and verify they partition the group as Lagrange's Theorem predicts",
        ],
      },
      {
        date: "2026-10-03",
        focus: "Normal subgroups & factor groups",
        tasks: [
          "Review the /concepts card \"Normal subgroups & factor (quotient) groups\"",
          "Check whether 2 candidate subgroups are normal, then build the factor group's Cayley table for the one that is",
        ],
      },
      {
        date: "2026-10-05",
        focus: "The First Isomorphism Theorem",
        tasks: [
          "Review the /concepts card \"The First Isomorphism Theorem\"",
          "Work one practice example end to end: find a homomorphism's kernel/image and state the resulting isomorphism explicitly",
        ],
      },
      {
        date: "2026-10-06",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 5 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen; confirm venue/time on Amathuba (still TBC as of writing) and arrive early",
        ],
      },
    ],
    resources: [
      { label: "MAM2013S NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra / group theory series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MAM2014S (2RA) — Real Analysis
  // ---------------------------------------------------------------------------
  {
    id: "mam2014-test-1-plan",
    courseCode: "MAM2014S",
    testId: "mam2014-test-1",
    scope: [
      "Sets, number systems & ordered fields",
      "Well-ordering, induction & the irrationality of √2",
      "The Completeness Axiom, suprema & infima",
      "Nested intervals, the Archimedean Property & density of ℚ",
      "Cardinality: countable & uncountable sets",
      "Limits of sequences & the Algebraic/Order Limit Theorems",
      "The Monotone Convergence Theorem",
    ],
    startDate: "2026-08-08",
    phases: [
      {
        date: "2026-08-08",
        focus: "Sets, number systems & ordered fields",
        tasks: [
          "Review the /concepts card \"Sets, number systems & ordered fields\"",
          "Write out the ordered-field axioms from memory and check ℚ against each one",
        ],
      },
      {
        date: "2026-08-10",
        focus: "Induction & the irrationality of √2",
        tasks: [
          "Review the /concepts card \"Well-ordering, induction & the irrationality of √2\"",
          "Reproduce the √2-irrationality proof (contradiction via a minimal counterexample) unaided",
        ],
      },
      {
        date: "2026-08-12",
        focus: "The Completeness Axiom, suprema & infima",
        tasks: [
          "Review the /concepts card \"The Completeness Axiom, suprema & infima\"",
          "Find the sup/inf of 3 practice sets and justify each with the ε-characterisation of supremum",
        ],
      },
      {
        date: "2026-08-14",
        focus: "Nested intervals, the Archimedean Property & density of ℚ",
        tasks: [
          "Review the /concepts card \"Nested intervals, the Archimedean Property & density of ℚ\"",
          "Prove the Archimedean Property from the Completeness Axiom, from memory",
        ],
      },
      {
        date: "2026-08-16",
        focus: "Cardinality",
        tasks: [
          "Review the /concepts card \"Cardinality: countable & uncountable sets\" (marked stretch)",
          "Reproduce Cantor's diagonal argument for the uncountability of ℝ, step by step, unaided",
        ],
      },
      {
        date: "2026-08-18",
        focus: "Limits of sequences",
        tasks: [
          "Review the /concepts card \"Limits of sequences & the Algebraic/Order Limit Theorems\"",
          "Prove convergence of 2 practice sequences directly from the ε-N definition, without shortcuts",
        ],
      },
      {
        date: "2026-08-21",
        focus: "The Monotone Convergence Theorem",
        tasks: [
          "Review the /concepts card \"The Monotone Convergence Theorem\"",
          "Use the MCT to show convergence of a recursively-defined sequence, then find its limit",
        ],
      },
      {
        date: "2026-08-23",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 7 scope topics once, noting only genuinely weak spots",
          "Pack for the test: student card, pen; venue is TBC — check Amathuba the day before",
        ],
      },
    ],
    resources: [
      { label: "MAM2014S NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — real analysis / foundations series",
        href: "https://www.youtube.com/@Socratica",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for limits, the real line & infinity",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "mam2014-test-2-plan",
    courseCode: "MAM2014S",
    testId: "mam2014-test-2",
    scope: [
      "Series basics; the Comparison Test & the p-series",
      "Subsequences & the Bolzano-Weierstrass Theorem; Cauchy sequences",
      "Absolute/conditional convergence; the Ratio Test & the Root Test",
      "Rearrangements of series",
      "Open, closed & compact sets in ℝ (topology of ℝ)",
      "Limits of functions, continuity & uniform continuity",
      "Derivatives, Fermat's Theorem & the Mean Value Theorem family",
      "Pointwise/uniform convergence; power series & Taylor series",
    ],
    startDate: "2026-09-15",
    phases: [
      {
        date: "2026-09-15",
        focus: "Series basics & the Comparison Test",
        tasks: [
          "Review the /concepts cards \"Series, partial sums & the geometric/harmonic series\" and \"The Comparison Test & the p-series\"",
          "Classify 4 practice series as convergent/divergent using the comparison test against a known p-series",
        ],
      },
      {
        date: "2026-09-18",
        focus: "Subsequences, Bolzano-Weierstrass & Cauchy sequences",
        tasks: [
          "Review the /concepts cards \"Subsequences & the Bolzano-Weierstrass Theorem\" and \"Cauchy sequences & the Cauchy Criterion\"",
          "Prove one practice sequence is Cauchy directly from the definition, and use Bolzano-Weierstrass to extract a convergent subsequence from a bounded one",
        ],
      },
      {
        date: "2026-09-21",
        focus: "Absolute/conditional convergence & the Ratio/Root Tests",
        tasks: [
          "Review the /concepts cards \"Absolute/conditional convergence & the Alternating Series Test\" and \"The Ratio Test & the Root Test\"",
          "Classify 4 practice series as absolutely convergent, conditionally convergent, or divergent",
        ],
      },
      {
        date: "2026-09-24",
        focus: "Rearrangements & the topology of ℝ",
        tasks: [
          "Review the /concepts cards \"Rearrangements & the Riemann Rearrangement Theorem\" (stretch) and \"Open, closed & compact sets in ℝ\"",
          "Give one example of a conditionally convergent series and describe (don't need to fully execute) how it could be rearranged to change its sum",
          "Classify 3 practice subsets of ℝ as open/closed/neither, and compact/not compact",
        ],
      },
      {
        date: "2026-09-27",
        focus: "Continuity & uniform continuity",
        tasks: [
          "Review the /concepts cards \"Limits of functions & continuity\" and \"Uniform continuity\" (stretch)",
          "Prove continuity of one practice function from the ε-δ definition, then explain in your own words why it fails to be uniformly continuous on an unbounded domain (or does)",
        ],
      },
      {
        date: "2026-09-30",
        focus: "Derivatives & the Mean Value Theorem family",
        tasks: [
          "Review the /concepts card \"Derivatives, Fermat's Theorem & the Mean Value Theorem family\"",
          "State Rolle's Theorem and the MVT precisely, then use the MVT to prove one practice inequality",
        ],
      },
      {
        date: "2026-10-03",
        focus: "Series of functions, power series & Taylor series",
        tasks: [
          "Review the /concepts cards \"Pointwise vs. uniform convergence of functions\" and \"Power series, the radius of convergence & Taylor series\" (marked hard — use the tips)",
          "Find the radius of convergence of 2 practice power series, and derive the Taylor series of a standard function from scratch",
        ],
      },
      {
        date: "2026-10-05",
        focus: "Consolidation & practice",
        tasks: [
          "Do a full timed practice attempt (past paper or tutorial sheet questions), closed-book",
          "Re-skim all 8 scope topics once, prioritising power/Taylor series (the hardest card) and rearrangements/uniform continuity (the stretch cards)",
          "Pack for the test: student card, pen; venue is TBC — check Amathuba the day before",
        ],
      },
    ],
    resources: [
      { label: "MAM2014S NOTES.pdf (own notes)" },
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — proof techniques & real analysis",
        href: "https://www.youtube.com/@Socratica",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
];
