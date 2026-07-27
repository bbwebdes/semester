import type { ConceptBriefing } from "../types";

// MAM2012S content transcribed from course-docs/MAM2012S/2DE NOTES.pdf
// (MAM2000W - 2DE: Differential equations, partial derivatives, vector
// geometry, matrix algebra, complex numbers, Taylor series — this file
// covers the differential-equations chapters actually present in the
// notes: Ch1 Introduction, Ch2 Linear ODEs, Ch3 Systems of linear ODEs,
// Ch4 Linear PDEs). MAM2012S is not yet a tracked dashboard course
// (pending registration confirmation — see PROJECT_STATUS.md Blockers),
// hence courseCode: "MAM2012S" via the wider ConceptModuleCode type
// rather than the core CourseCode union.
export const mam2012sConceptBriefings: ConceptBriefing[] = [
  {
    id: "de-linear-independence-wronskian",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 1: Linear independence and the Wronskian",
    title: "Linear independence of functions & the Wronskian",
    tags: ["differential-equations", "linear-algebra", "proofs"],
    difficulty: "core",
    summary:
      "A set of functions is linearly independent if the only way a linear combination of them equals the zero function (for every t in the domain) is the trivial one — all coefficients zero. Checking this directly from the definition is often awkward, so the Wronskian (the determinant of the matrix of the functions and their successive derivatives) gives a practical test: a nonzero Wronskian at even one point proves independence. The converse fails for arbitrary functions (a zero Wronskian proves nothing), but for functions that are all solutions of the same linear homogeneous ODE, the Wronskian is either always zero or never zero — making it an iff test in that specific setting.",
    subConcepts: [
      { title: "Linear independence of a function set", gloss: "{f₁,...,fₙ} is linearly independent on D if ∑αᵢfᵢ=0 for all t∈D forces every αᵢ=0 — must hold for every t simultaneously, not just at isolated points." },
      { title: "The Wronskian matrix & determinant", gloss: "M(t;f₁,...,fₙ) stacks f₁,...,fₙ and their derivatives up to order n−1 as rows; W(t;f₁,...,fₙ)=det M is the Wronskian." },
      { title: "Wronskian nonzero ⟹ independent (Theorem 1.2)", gloss: "If W(t₀)≠0 for some t₀∈I, the linear system Mα=0 has only the trivial solution there, so {f₁,...,fₙ} is independent on I — proved by differentiating the linear relation n−1 times to build the matrix equation." },
      { title: "Zero Wronskian proves nothing in general", gloss: "{t², t|t|} has W(t)≡0 on ℝ yet is still linearly independent — shown by going back to the definition directly at t=1 and t=−1, since the Wronskian test is only a one-directional sufficient condition for arbitrary functions." },
      { title: "The stronger iff result for solutions of the same ODE (Theorem 1.3)", gloss: "If f₁,...,fₙ all solve the same n-th order linear homogeneous ODE, then W(t₀)≠0 for some t₀∈I IFF the set is linearly independent on I — the converse that fails for arbitrary functions holds here." },
    ],
    preLecture: [
      "Recall determinants of 2×2 and 3×3 matrices, and the definition of a vector space and linear combination from earlier linear algebra.",
      "Recall higher-order derivatives and how to differentiate products/powers, since building the Wronskian matrix requires up to (n−1) derivatives of each function.",
      "Key question to hold in mind: why does a nonzero Wronskian at a single point guarantee independence everywhere on the interval, when the definition of independence has to hold at every point?",
      "Practical goal: be able to state precisely why the Wronskian test is one-directional for general functions but becomes two-directional once you know all the functions solve the same linear ODE.",
    ],
    learningPath: [
      "Recall: state the definition of linear independence for a function set, and state the Wronskian matrix/determinant definition.",
      "Practise: reproduce the proof that {1,t,t²,...,tⁿ} is linearly independent by computing its Wronskian (an upper-triangular determinant equal to ∏k!).",
      "Connect: work through the {t²,t|t|} counterexample end to end — compute W(t)≡0, then fall back to the direct definition at t=±1 to show independence anyway.",
      "Extend: given two solutions y₁,y₂ of the same second-order linear ODE, use Theorem 1.3 to decide independence from a single Wronskian evaluation rather than checking the definition directly.",
    ],
    applications: [
      "This concept is the load-bearing tool behind variation of parameters (a later concept card) — the coefficient matrix that must be inverted to find a particular solution is exactly the Wronskian matrix, and its invertibility is guaranteed by Theorem 1.3.",
      "Quant/ML: recognising when a set of basis functions (e.g. polynomial or exponential features) is linearly independent is directly relevant to avoiding redundant/collinear features in regression-style models.",
    ],
    examples: [
      "W(t;1,t,t²,...,tⁿ) = ∏ₖ₌₀ⁿ k! ≠ 0 everywhere, via an upper-triangular determinant — confirming {1,t,...,tⁿ} is linearly independent on all of ℝ.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
  },
  {
    id: "de-homogeneous-constant-coefficient-odes",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 2: Homogeneous differential equations with constant coefficients",
    title: "Homogeneous constant-coefficient ODEs & the auxiliary polynomial",
    tags: ["differential-equations", "proofs"],
    difficulty: "core",
    summary:
      "Every constant-coefficient linear homogeneous ODE reduces to finding the roots of a single auxiliary polynomial — substitute the guess y=e^(λt), and the exponents and coefficients literally become the same polynomial you'd get by replacing the differential operator D with λ. Distinct real roots give independent exponential solutions; a repeated real root of multiplicity k needs the extra factors t,t²,...,tᵏ⁻¹ multiplied onto the exponential to stay independent; and a complex conjugate pair combines into a real oscillating e^(μt)cos(ωt)/sin(ωt) pair. The damped harmonic oscillator is the single physical example that cleanly displays all these cases side by side, from undamped oscillation through underdamped, critically damped, to overdamped decay.",
    subConcepts: [
      { title: "The auxiliary polynomial p(λ)", gloss: "For D²y+a₁Dy+a₀y=0, substituting y=e^(λt) gives p(λ)=λ²+a₁λ+a₀=0 — the same polynomial obtained by replacing D with λ in the operator form p(D)y=0." },
      { title: "Two distinct real roots", gloss: "p(λ)=(λ−λ₁)(λ−λ₂) with λ₁≠λ₂ gives fundamental set {e^(λ₁t), e^(λ₂t)} and general solution y=αe^(λ₁t)+βe^(λ₂t)." },
      { title: "A repeated real root", gloss: "p(λ)=(λ−λ₁)² gives fundamental set {e^(λ₁t), te^(λ₁t)} — the extra factor of t is verified by direct substitution, and its necessity is explained rigorously via Theorem 2.2's induction proof." },
      { title: "A complex conjugate pair of roots", gloss: "λ₁,₂=μ±ωi gives real fundamental set {e^(μt)cos(ωt), e^(μt)sin(ωt)}, derived by taking the real/imaginary parts of the complex exponential solution Ce^(μt)e^(iωt)+C̄e^(μt)e^(−iωt)." },
      { title: "n-th order case & Theorem 2.6 (n-dimensional solution space)", gloss: "An n-th order equation factors as a product of (D−λᵢI)^kᵢ operators (∑kᵢ=n); each factor contributes kᵢ independent solutions, and the full solution space is proved n-dimensional via the onto-ness of (D−λI) (Lemma 2.4) combined with a kernel-dimension-counting lemma (Lemma 2.5)." },
      { title: "The damped harmonic oscillator y″+γy′+ω²y=0", gloss: "Undamped (γ=0, pure imaginary roots, periodic), underdamped (0<γ<γc, complex pair, decaying oscillation), critically damped (γ=γc, repeated real root, fastest non-oscillating return), overdamped (γc<γ, two real roots, slow return) — γc=2ω is the critical value." },
    ],
    preLecture: [
      "Be comfortable factoring quadratics and cubics, and recall the fundamental theorem of algebra (every polynomial factors into linear/complex-conjugate-pair factors over ℝ).",
      "Recall Euler's formula e^(iθ)=cos θ+i sin θ — needed to convert the complex-exponential solutions into real cos/sin form for the complex-root case.",
      "Key question to hold in mind: why does a repeated root need an extra factor of t (not, say, t² or a different function) to produce a second independent solution?",
      "Practical goal: given any auxiliary polynomial's roots, be able to immediately write down the fundamental set without re-deriving it from scratch each time.",
    ],
    learningPath: [
      "Recall: state the three root-cases (distinct real, repeated real, complex conjugate pair) and the fundamental set each produces.",
      "Practise: verify by direct substitution that te^(λt) solves (D−λI)²y=0, following the notes' calculation, then reproduce the derivation of the real cos/sin solutions from the complex exponential pair.",
      "Connect: classify the damped harmonic oscillator's four regimes (undamped/underdamped/critically damped/overdamped) purely from the discriminant γ²−4ω² of its auxiliary polynomial.",
      "Extend / reproduce in R: numerically solve y″+γy′+y=0 with y(0)=1,y′(0)=0 for γ=0,1,2,3 and plot all four solutions on one graph to see the qualitative transition from oscillation to fast decay to slow decay.",
    ],
    applications: [
      "Engineering/physics: this is the exact model behind vehicle suspensions (critically damped is the design target), building/bridge vibration damping, and RLC electrical circuits.",
      "Quant/ML: mean-reverting stochastic processes (e.g. the Ornstein-Uhlenbeck process used for interest rates and volatility) have a deterministic drift term that is literally this ODE family — recognising over/under/critical damping behaviour transfers directly to reading mean-reversion speed in those models.",
    ],
    examples: [
      "y‴−y″+2y′−2y=0 has auxiliary polynomial (λ−1)(λ²+2), giving fundamental set {e^t, cos(√2 t), sin(√2 t)} and general solution y=αe^t+β cos(√2 t)+γ sin(√2 t).",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for oscillation and exponential growth/decay",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "de-annihilator-method",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 2: The annihilator method",
    title: "The annihilator method for nonhomogeneous ODEs",
    tags: ["differential-equations"],
    difficulty: "core",
    summary:
      "Every nonhomogeneous solution splits as y = y₀ (the complementary solution, solving the associated homogeneous equation) + yₚ (any one particular solution). The annihilator method finds both at once: apply an operator A that kills the nonhomogeneous term f (i.e. Af=0) to both sides, turning the nonhomogeneous equation into a higher-order homogeneous one; solve that; then substitute back into the original equation to pin down the extra undetermined coefficients the higher order introduced. It's fast and mechanical, but only works when f itself can be annihilated by a polynomial in D — functions like tan(t) or ln(t) can't, which is exactly the gap variation of parameters (next concept) fills.",
    subConcepts: [
      { title: "Complementary + particular solution (Theorem 2.7)", gloss: "y=y₀+yₚ for T(y)=f: y₀ solves T(y)=0, yₚ is any one solution to T(y)=f — the ODE analogue of a familiar linear-algebra result about solutions to Ax=b." },
      { title: "Annihilator operator", gloss: "A is an annihilator of f if Af=0; choose the minimal (lowest-order) annihilator that works, e.g. A=(D−I) annihilates e^t, A=(D+I)² annihilates te^(−t)." },
      { title: "The method: apply A, solve, substitute back", gloss: "Apply A to T(y)=f to get (AT)(y)=0, a higher-order homogeneous equation; solve it for a general solution with extra unknown constants; substitute back into the ORIGINAL equation T(y)=f to fix those extra constants." },
      { title: "Superposition for multi-term nonhomogeneities", gloss: "T(y)=f₁+f₂+...+fₙ has general solution y=y₀+yₚ₁+...+yₚₙ where each yₚⱼ solves T(y)=fⱼ separately — lets you annihilate and solve one piece of a sum at a time." },
      { title: "Limitations of the method", gloss: "Fails whenever f cannot be annihilated by any polynomial in D (e.g. tan(t), ln(t), sec(t)) and cannot be extended to non-constant-coefficient ODEs — both gaps are exactly what variation of parameters solves." },
    ],
    preLecture: [
      "Be fluent solving homogeneous constant-coefficient ODEs (previous concept card) — recognising the right annihilator for a given f requires instantly recognising which homogeneous ODE that f itself solves.",
      "Recall the complementary/particular solution decomposition from earlier linear-algebra courses (the notes explicitly reference an analogous theorem about Ax=b).",
      "Key question to hold in mind: why must the annihilator be chosen as the MINIMAL one that works, rather than any operator that happens to kill f?",
      "Practical goal: build a quick mental table of common nonhomogeneous terms (e^(at), t^n, sin/cos(bt), and products of these) and their minimal annihilators, since this recognition step is the whole method.",
    ],
    learningPath: [
      "Recall: state Theorem 2.7 (general solution = complementary + particular) and describe the annihilator method's three steps (annihilate, solve, substitute back).",
      "Practise: solve y″+y=e^t via the annihilator method, following the notes' worked example — annihilate with (D−I), solve the resulting third-order homogeneous equation, then substitute back to fix the coefficient on e^t.",
      "Connect: solve y′+2y=te^(−t) (needs (D+I)²) and y″+y′−2y=e^t (needs (D−I), which coincides with a root already in the complementary solution) — compare how the substitution step differs when the annihilator's root overlaps a complementary-solution root.",
      "Extend: attempt to find an annihilator for tan(t) or ln(t) and confirm none exists as a finite polynomial in D — this failure is the direct motivation for variation of parameters.",
    ],
    applications: [
      "Control systems/signal processing: forced linear systems (a spring-mass system driven by a sinusoidal or exponential external force) are exactly nonhomogeneous constant-coefficient ODEs, and the annihilator method is a standard hand-solvable technique for finding the forced (particular) response.",
      "This is a strictly narrower but faster sibling of variation of parameters (next concept) — recognising which technique fits a given problem (annihilable nonhomogeneity → annihilator method; anything else → variation of parameters) is itself a practical skill emphasised in the notes.",
    ],
    examples: [
      "y″+y=e^t: annihilate with (D−I) to get (D−I)(D²+I)y=0, solve to get y=Ae^t+B cos(t)+C sin(t), substitute back to find A=½, giving y=B cos(t)+C sin(t)+½e^t.",
    ],
    resources: [
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
    id: "de-variation-of-parameters",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 2: Variation of parameters",
    title: "Variation of parameters",
    tags: ["differential-equations", "linear-algebra"],
    difficulty: "core",
    summary:
      "Variation of parameters finds a particular solution yₚ=u₁y₁+u₂y₂ by letting the \"constants\" in the complementary solution become unknown functions, then imposing a convenient extra condition (u₁′y₁+u₂′y₂=0) that collapses the algebra down to a clean 2×2 linear system for u₁′,u₂′ — and that system's coefficient matrix is exactly the Wronskian matrix, guaranteed invertible because y₁,y₂ solve the same linear ODE (Theorem 1.3). Unlike the annihilator method, this works for ANY nonhomogeneous term f (even tan(t) or ln(t)) and generalises to non-constant-coefficient equations — the price is that it always requires solving an integral, which may or may not have an elementary closed form.",
    subConcepts: [
      { title: "The ansatz yₚ=u₁y₁+u₂y₂", gloss: "Assume the particular solution is the complementary solution's form but with the constants replaced by unknown functions u₁(t),u₂(t) — an assumption originally due to Euler and Lagrange for orbital mechanics problems." },
      { title: "The simplifying condition u₁′y₁+u₂′y₂=0", gloss: "A second, deliberately chosen constraint that eliminates second-derivative terms from y′ₚ when substituting into the ODE — without it there are 2 unknown functions but only 1 equation." },
      { title: "The resulting Wronskian-matrix system", gloss: "(y₁ y₂; y′₁ y′₂)(u′₁; u′₂) = (0; f/a₂) — the coefficient matrix is the Wronskian matrix, invertible since y₁,y₂ solve the same homogeneous ODE (Theorem 1.3), letting you solve for u′₁,u′₂ then integrate." },
      { title: "n-th order generalisation", gloss: "The same pattern extends to n functions y₁,...,yₙ and an n×n Wronskian-matrix system, though solving it by hand becomes impractical beyond n=3." },
      { title: "Choosing the right method", gloss: "If f can be annihilated by a polynomial in D, the annihilator method is faster and preferred; variation of parameters is reserved for f that can't be annihilated (tan, sec, ln) or non-constant-coefficient equations — using variation of parameters when the annihilator method would work is explicitly flagged in the notes as needlessly roundabout." },
    ],
    preLecture: [
      "Be solid on the Wronskian and Theorem 1.3 (first concept card) — the coefficient matrix in the method's core linear system IS the Wronskian matrix, and its invertibility is exactly what that theorem guarantees.",
      "Recall matrix inversion for 2×2 matrices (or Gauss-Jordan elimination for 3×3) since solving for u′₁,u′₂ requires inverting the Wronskian matrix at each step.",
      "Key question to hold in mind: why is the extra condition u₁′y₁+u₂′y₂=0 allowed — isn't it an arbitrary restriction on the unknown functions?",
      "Practical goal: recognise when a nonhomogeneous term (like tan(3t) or ln(t)) rules out the annihilator method entirely, making variation of parameters the only option.",
    ],
    learningPath: [
      "Recall: state the ansatz, the simplifying condition, and the resulting Wronskian-matrix system 2.12 from memory — the notes explicitly say to skip re-deriving this every time and start from it directly.",
      "Practise: solve y″+9y=tan(3t) via variation of parameters, following the notes' worked example (invert the Wronskian matrix, integrate −⅓sin(3t)tan(3t) and ⅓sin(3t), assemble yₚ).",
      "Connect: solve y″−y=e^t by BOTH the annihilator method and variation of parameters, and compare — confirm they give the same final answer (after absorbing integration constants into the complementary solution) and note which method was faster.",
      "Extend: attempt the third-order example D(D−I)(D+I)y=t via variation of parameters (Gauss-reducing the augmented 3×3 Wronskian system), to see firsthand why the notes call n>3 computationally infeasible by hand.",
    ],
    applications: [
      "This is the general-purpose particular-solution technique used whenever the forcing term in an engineering/physics model (electrical circuits, mechanical vibrations) isn't a simple exponential/polynomial/sinusoid combination — e.g. forcing terms involving logarithms or secants that the annihilator method can't touch.",
      "Quant finance: the technique of assuming \"constants\" in a homogeneous solution become time-varying functions, then solving a resulting linear system, is the same conceptual move used in more advanced stochastic calculus when solving certain linear SDEs (e.g. via integrating factors) — this ODE version is the cleanest place to learn the pattern.",
    ],
    examples: [
      "y″−y=e^t: y₁=e^t,y₂=e^(−t); solving the Wronskian system gives u′₁=½, u′₂=−½e^(2t), so yₚ=½te^t (after discarding terms absorbable into the complementary solution) — matching the annihilator method's result exactly.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
  },
  {
    id: "de-cauchy-euler-equations",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 2: Cauchy-Euler equations",
    title: "Cauchy-Euler equations",
    tags: ["differential-equations"],
    difficulty: "core",
    summary:
      "A Cauchy-Euler equation has variable (not constant) coefficients of a very specific form — xⁿ times the n-th derivative, xⁿ⁻¹ times the (n−1)-th, and so on — and it's one of the few non-constant-coefficient ODE families with a fully elementary solution. The trick is the substitution t=ln(x), which turns the equation into an ordinary constant-coefficient ODE in t, solvable by everything already known; then eˡⁿ⁽ˣ⁾=x converts the answer back into powers (and, for repeated/complex roots, logarithms) of x. This same substitution reappears later, unmodified in spirit, when solving the Black-Scholes equation.",
    subConcepts: [
      { title: "Cauchy-Euler equation form", gloss: "xⁿ(dⁿy/dxⁿ)+xⁿ⁻¹(dⁿ⁻¹y/dxⁿ⁻¹)+...+x(dy/dx)+y=0 — coefficients are specific powers of x, not constants, but a very particular pattern (unlike arbitrary variable-coefficient ODEs, most of which have no elementary solution)." },
      { title: "The substitution t=ln(x)", gloss: "Converts the equation into a constant-coefficient ODE in t via the chain rule; y′=(1/x)ẏ, y″=−(1/x²)ẏ+(1/x²)ÿ, and so on for higher derivatives." },
      { title: "Solving in t then converting back", gloss: "Solve the resulting constant-coefficient equation for y(t) using the auxiliary polynomial as usual, then substitute t=ln(x) (so eᵗ=x, e^(kt)=xᵏ) to express the solution in terms of x." },
      { title: "Repeated/complex roots translate to logarithms", gloss: "A repeated root giving αte^(2t) in the t-variable becomes α ln(x)x² after the back-substitution — the \"extra t factor\" pattern from constant-coefficient repeated roots reappears as an \"extra ln(x) factor\" here." },
      { title: "Nonhomogeneous Cauchy-Euler equations", gloss: "Either transform the nonhomogeneous term to t as well and use the annihilator method/variation of parameters there before converting everything back, OR solve the homogeneous part in x-form and apply variation of parameters directly in x." },
      { title: "Why elementary special functions are the exception, not the rule", gloss: "Contrasted with Bessel's equation (solutions are the non-elementary Bessel functions Jα,Yα, describing drum-membrane vibration) and the Airy equation (solutions are the non-elementary Airy function, describing rainbow intensity) — Cauchy-Euler is one of the few variable-coefficient families that avoids needing a newly-defined special function." },
    ],
    preLecture: [
      "Be fluent with the auxiliary-polynomial method for constant-coefficient homogeneous ODEs (an earlier concept card) — the whole point of the t=ln(x) substitution is to reduce back to that already-solved problem.",
      "Recall the chain rule for repeated differentiation (d/dx[f(g(x))]=df/dg · dg/dx), applied here with g(x)=ln(x), since deriving y″,y‴ in terms of ẏ,ÿ requires it explicitly.",
      "Key question to hold in mind: why does the SPECIFIC pattern of coefficients (xⁿ, xⁿ⁻¹, ..., x, 1) in a Cauchy-Euler equation make the t=ln(x) substitution work, when it wouldn't work for a generic variable-coefficient ODE?",
      "Practical goal: be able to convert y′,y″ into 1/x·ẏ and −1/x²ẏ+1/x²ÿ from memory, since every Cauchy-Euler problem starts with this substitution.",
    ],
    learningPath: [
      "Recall: state the Cauchy-Euler equation's defining form and the substitution t=ln(x) that reduces it to a constant-coefficient ODE.",
      "Practise: solve x²y″−3xy′+3y=0 by substituting t=ln(x), following the notes' worked example (auxiliary polynomial λ²−4λ+3=(λ−1)(λ−3), giving y=αx+βx³).",
      "Connect: work through why a repeated-root solution αte^(2t) in t becomes α ln(x)x² in x, connecting the substitution back to the earlier repeated-root pattern for constant-coefficient ODEs.",
      "Extend / reproduce in R: numerically verify a solved Cauchy-Euler example by plugging the closed-form solution back into the original x-form equation and confirming it satisfies the ODE at several sample points.",
    ],
    applications: [
      "This exact substitution (t=ln x) is reused, essentially unmodified, when solving the Black-Scholes option-pricing PDE (a later concept card) — recognising the Cauchy-Euler structure in that context is what motivates the log-price change of variable there.",
      "Physics/engineering: Cauchy-Euler equations arise naturally in problems with radial symmetry (e.g. certain steady-state heat/diffusion problems in polar or spherical coordinates), where the xⁿ coefficient pattern emerges directly from the geometry.",
    ],
    examples: [
      "xy′+2y=0: substituting t=ln(x) gives ẏ+2y=0, solved by y=αe^(−2t)=αe^(−2ln(x))=α/x².",
    ],
    resources: [
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
    id: "de-diagonalisable-systems",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: Diagonalisable systems",
    title: "Systems of linear ODEs & diagonalisable systems",
    tags: ["differential-equations", "linear-algebra", "eigenvalues"],
    difficulty: "core",
    summary:
      "A system dx/dt=Ax bundles several coupled first-order ODEs into one matrix equation — and every n-th order scalar ODE can itself be rewritten as exactly such a system, which is why systems subsume everything studied so far. If A is diagonal the system is uncoupled and trivial; if A is merely diagonalisable, the substitution x=Py (P's columns are eigenvectors) decouples it into n independent scalar equations, each solved by a simple exponential, and translating back gives the elegant fundamental-set solution x=∑αᵢvᵢe^(λᵢt) — the direct n-dimensional generalisation of the single auxiliary-polynomial-roots story from scalar ODEs.",
    subConcepts: [
      { title: "System of linear ODEs, dx/dt=Ax", gloss: "n coupled first-order equations for x₁,...,xₙ, compactly written as a single matrix-vector equation with constant matrix A." },
      { title: "Converting an n-th order scalar ODE to a first-order system", gloss: "Introduce xⱼ₊₁=d^(j)y/dt^j; this turns an n-th order equation into n coupled first-order equations, dx/dt=A(t)x+f(t) — the reason systems are studied at all, and why numerical solvers work with systems rather than high-order scalar equations." },
      { title: "Uncoupled (diagonal A) systems", gloss: "If A is diagonal, each xᵢ satisfies its own independent first-order equation dxᵢ/dt=λᵢxᵢ, solved trivially by xᵢ=cᵢe^(λᵢt)." },
      { title: "Diagonalisable systems via x=Py", gloss: "For A=PDP⁻¹ (P's columns are A's eigenvectors, D diagonal with the eigenvalues), substituting x=Py transforms dx/dt=Ax into the uncoupled dy/dt=Dy — solve for y, then convert back via x=Py." },
      { title: "Fundamental set & fundamental matrix (Theorem 3.1)", gloss: "For A with n linearly independent eigenvectors v₁,...,vₙ and eigenvalues λ₁,...,λₙ, the general solution is x=∑αᵢvᵢe^(λᵢt); the fundamental matrix (v₁e^(λ₁t)|...|vₙe^(λₙt)) is invertible and its columns are all solutions." },
    ],
    preLecture: [
      "Be solid on eigenvalues/eigenvectors and diagonalisation from earlier linear algebra — this entire section is diagonalisation applied to a system of ODEs rather than a static matrix problem.",
      "Recall the auxiliary-polynomial method for scalar constant-coefficient ODEs (earlier concept card) — the diagonalisable-systems solution x=∑αᵢvᵢe^(λᵢt) is its direct n-dimensional analogue, with eigenvalues playing the role of auxiliary-polynomial roots.",
      "Key question to hold in mind: why does the substitution x=Py specifically uncouple the system — what property of P (being built from eigenvectors) makes P⁻¹AP diagonal?",
      "Practical goal: be able to go from a matrix A, through its eigenvalues/eigenvectors, to the general solution x=∑αᵢvᵢe^(λᵢt) as a single fluent pipeline.",
    ],
    learningPath: [
      "Recall: state Theorem 3.1 (the general solution for a diagonalisable system) and describe the x=Py decoupling procedure in your own words.",
      "Practise: solve dx/dt=Ax for A=(2,−1;5,−4), following the notes' worked example — find eigenvalues λ=1,−3, corresponding eigenvectors, and assemble the general solution x=α(1,1)ᵀe^t+β(1,5)ᵀe^(−3t).",
      "Connect: verify by direct substitution that x=∑αᵢvᵢe^(λᵢt) really does satisfy dx/dt=Ax, reproducing the short proof from Theorem 3.1.",
      "Extend / reproduce in R: numerically diagonalise a 3×3 matrix (eigen() in R), reconstruct the general solution formula, and confirm it matches a numerical ODE solver's trajectory for a specific initial condition.",
    ],
    applications: [
      "Quant/ML: coupled linear systems of this exact form describe multi-asset price dynamics under simplifying linear assumptions, and diagonalisation is exactly how such systems are decomposed into independent \"normal modes\" of behaviour — a technique reused in PCA-adjacent dimensionality reduction of dynamical systems.",
      "Physics/engineering: coupled oscillators (e.g. two masses connected by springs) are modelled by exactly this kind of system, and diagonalisation reveals the system's independent normal modes of vibration.",
    ],
    examples: [
      "dx/dt=(1,0,0; 1,3,2; 1,2,3)x has eigenvalues λ=5 (simple) and λ=1 (algebraic multiplicity 2, but also geometric multiplicity 2 — a basis of eigenvectors exists), giving general solution x=α(0,1,1)ᵀe^(5t)+β(−2,0,1)ᵀe^t+γ(−2,1,0)ᵀe^t.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Linear Algebra (eigenvectors/eigenvalues)",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "de-matrix-exponential",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: The matrix exponential",
    title: "The matrix exponential",
    tags: ["differential-equations", "linear-algebra", "eigenvalues"],
    difficulty: "core",
    summary:
      "Just as e^x is defined by its power series, e^A for a square matrix A is defined the same way (∑Aᵏ/k!), and it behaves enough like the scalar exponential — same derivative rule d/dt[e^(tA)]=Ae^(tA), same invertibility, commuting matrices still satisfy e^Ae^B=e^(A+B) — to make x=e^(tA)c THE solution formula for dx/dt=Ax, with no restriction on A's eigenvalues or diagonalisability at all. This is the strongest, most general existence-and-uniqueness result in the whole systems chapter; the only remaining work in later concepts is figuring out how to actually COMPUTE e^(tA) when A isn't diagonalisable.",
    subConcepts: [
      { title: "Matrix exponential definition", gloss: "exp(A)=∑ₖ₌₀^∞ Aᵏ/k!, directly analogous to the scalar Taylor series for eˣ; convergence for any square matrix A is a fact taken on faith at this level (provable with tools from 2RA/real analysis)." },
      { title: "Key algebraic properties", gloss: "e^Ae^B=e^(A+B) when AB=BA (so e^A is always invertible via e^Ae^(−A)=I); e^(P⁻¹AP)=P⁻¹e^AP for invertible P — both proved via manipulating the defining power series." },
      { title: "Derivative of the matrix exponential", gloss: "d/dt[e^(tA)]=Ae^(tA), proved by differentiating the power series term-by-term (valid here because the matrix exponential converges uniformly)." },
      { title: "Theorem 3.2: x=e^(tA)c solves dx/dt=Ax unconditionally", gloss: "No diagonalisability or eigenvalue assumption needed — proved by showing e^(−tA)x is constant along any solution, using exactly the same integrating-factor-style trick as the scalar case (Theorem 2.1)." },
      { title: "Computing e^(tA) for diagonalisable A", gloss: "e^(tA)=Pe^(tD)P⁻¹ where e^(tD) is just the diagonal matrix of e^(λᵢt) terms — reduces to the same diagonalisation already used in the previous concept card, now applied to compute an exponential rather than decouple equations directly." },
    ],
    preLecture: [
      "Be solid on diagonalisable systems (previous concept card) — this concept reframes the same solution as a single exponential formula and re-derives the identical answer as a sanity check.",
      "Recall the scalar Taylor series for e^x — every property of the matrix exponential is a direct, term-by-term generalisation of a corresponding scalar fact.",
      "Key question to hold in mind: why is x=e^(tA)c a STRONGER result than the diagonalisable-systems formula from the previous concept card — what does it not require that the earlier result did?",
      "Practical goal: be able to state Theorem 3.2 and explain, in one sentence, why its proof is structurally identical to the scalar proof of Theorem 2.1.",
    ],
    learningPath: [
      "Recall: state the matrix exponential's definition and its three key properties (commuting-matrix product rule, similarity-transform rule, derivative rule).",
      "Practise: reproduce the proof of Theorem 3.2 (x=e^(tA)c solves dx/dt=Ax) by differentiating e^(−tA)x and showing it's identically zero.",
      "Connect: recompute the diagonalisable-systems worked example (dx/dt=(1,0,0;1,3,2;1,2,3)x) using the matrix-exponential formula e^(tA)=Pe^(tD)P⁻¹ and confirm it gives the exact same solution as diagonalising directly.",
      "Extend / reproduce in R: numerically compute e^(tA) for a small diagonalisable matrix at a few values of t (via P %*% diag(exp(eigenvalues*t)) %*% solve(P)) and cross-check against R's expm package if available.",
    ],
    applications: [
      "This is the single most important object in continuous-time linear systems theory across engineering, control theory, and quantitative finance — the state-transition matrix in control systems and the propagator in linear stochastic models are both literally the matrix exponential.",
      "Quant/ML: the matrix exponential is exactly the tool used to solve linear systems of SDEs (e.g. multivariate Ornstein-Uhlenbeck processes used for interest-rate or volatility co-movements) — this deterministic ODE version is the foundational case before noise terms are added.",
    ],
    examples: [
      "For the diagonalisable A=(1,0,0;1,3,2;1,2,3), e^(tA)=P·diag(e^(5t),e^t,e^t)·P⁻¹, and applying this to c=(α,β,γ)ᵀ reproduces x=α(0,1,1)ᵀe^(5t)+β(−2,0,1)ᵀe^t+γ(−2,1,0)ᵀe^t exactly as found by direct diagonalisation.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
  },
  {
    id: "de-generalised-eigenvectors",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: Generalised eigenvectors",
    title: "Generalised eigenvectors",
    tags: ["differential-equations", "linear-algebra", "eigenvalues"],
    difficulty: "stretch",
    summary:
      "When a matrix isn't diagonalisable (an eigenvalue's geometric multiplicity falls short of its algebraic multiplicity), regular eigenvectors alone can't span the whole space, so the solution to dx/dt=Ax needs an extra ingredient: generalised eigenvectors, defined by (A−λI)ᵐwₘ=0 but (A−λI)ᵐ⁻¹wₘ≠0. A chain of these — each satisfying (A−λI)wₚ₊₁=wₚ down to the ordinary eigenvector — always exists (Rⁿ always has a full basis of generalised eigenvectors, even when it lacks one of ordinary eigenvectors), and crucially, applying the matrix exponential to a generalised eigenvector of rank m truncates the usually-infinite exponential series down to a finite sum of exactly m terms — the key trick that makes e^(tA) computable by hand even for nondiagonalisable A.",
    subConcepts: [
      { title: "Generalised eigenvector of rank m", gloss: "wₘ satisfies (A−λI)ᵐwₘ=0 but (A−λI)ᵐ⁻¹wₘ≠0 — ordinary eigenvectors are exactly the rank-1 case." },
      { title: "Chain of generalised eigenvectors", gloss: "{w₁,...,wₖ} with (A−λI)wₚ₊₁=wₚ for 1≤p<k and (A−λI)w₁=0 — built by solving (A−λI)w=v repeatedly, starting from an ordinary eigenvector v; such a chain is automatically linearly independent." },
      { title: "Lemma 3.3 & 3.4: existence and independence across eigenvalues", gloss: "An eigenvalue with algebraic multiplicity k has exactly k linearly independent generalised eigenvectors (Lemma 3.3, not proved), and generalised eigenspaces for DIFFERENT eigenvalues intersect only at the zero vector (Lemma 3.4, proved by induction on rank)." },
      { title: "Theorem 3.5: Rⁿ always has a basis of generalised eigenvectors", gloss: "Direct consequence of Lemmas 3.3+3.4 — unlike ordinary eigenvectors, which may fail to span Rⁿ, generalised eigenvectors always do, for ANY square matrix." },
      { title: "Truncation of the matrix exponential on a generalised eigenvector", gloss: "e^((A−λI))wₘ = ∑ₖ₌₀^(m−1) (A−λI)ᵏ/k! · wₘ — the infinite series collapses to a FINITE sum of m terms, since (A−λI)ᵐwₘ=0 kills every term from k=m onward." },
      { title: "Solving a nondiagonalisable system via generalised eigenvectors", gloss: "Express the initial-condition vector c as a combination of generalised eigenvectors, then use the truncation trick termwise: x=∑ᵢαᵢe^(λᵢt)∑ₖ₌₀^(mᵢ) tᵏ(A−λᵢI)ᵏ/k! · vᵢ — a finite, hand-computable sum." },
    ],
    preLecture: [
      "Be solid on the matrix exponential and diagonalisable systems (previous two concept cards) — this concept exists specifically to handle the case those tools can't: a matrix without enough ordinary eigenvectors.",
      "Recall algebraic vs. geometric multiplicity of an eigenvalue from earlier linear algebra — a matrix is diagonalisable exactly when every eigenvalue's geometric multiplicity equals its algebraic multiplicity, and generalised eigenvectors are needed precisely when it doesn't.",
      "Key question to hold in mind: why does the matrix exponential series, normally infinite, become a FINITE sum specifically when applied to a generalised eigenvector — what property of (A−λI)ᵐwₘ=0 causes this?",
      "This is flagged as more subtle than the diagonalisable case — budget extra time to work through the trial-and-error derivation (guessing x=αve^(λt), then βvte^(λt), then adding a correction term) before jumping to the clean generalised-eigenvector formula.",
    ],
    learningPath: [
      "Recall: state the definition of a generalised eigenvector of rank m, a chain of generalised eigenvectors, and Theorem 3.5 (Rⁿ always has a basis of generalised eigenvectors).",
      "Practise: reproduce the 2×2 worked example — A=(1,−1;1,3) has a single eigenvalue λ=2 with geometric multiplicity 1; find the rank-2 generalised eigenvector w solving (A−2I)w=v, and verify the resulting solution x=αve^(2t)+β(w+tv)e^(2t) satisfies the ODE by direct substitution.",
      "Connect: redo the same example using the matrix-exponential truncation formula instead of trial and error, and confirm both methods give the identical final solution.",
      "Extend / reproduce in R: for a 3×3 matrix with a repeated eigenvalue and geometric multiplicity 1, compute a chain of two generalised eigenvectors by hand (solving two successive linear systems) and verify numerically that they're linearly independent.",
    ],
    applications: [
      "This is the mathematical reason resonance (unboundedly growing oscillation) occurs in physical systems driven at a natural frequency that coincides with a repeated root — the same te^(λt)-type terms that appear here for repeated eigenvalues.",
      "Quant/ML: nondiagonalisable transition matrices genuinely arise in Markov-chain-adjacent continuous-time models with degenerate eigenstructure; recognising when a system needs generalised eigenvectors (rather than assuming diagonalisability, which not every real system satisfies) prevents silently wrong solutions.",
    ],
    examples: [
      "For A=(1,−1;1,3), eigenvalue λ=2 has only eigenvector v=(−1,1)ᵀ; solving (A−2I)w=v gives generalised eigenvector w=(1,0)ᵀ, and the general solution is x=α(−1,1)ᵀe^(2t)+β((1,0)ᵀ+t(−1,1)ᵀ)e^(2t).",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Linear Algebra",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: assuming every repeated eigenvalue needs generalised eigenvectors — check the GEOMETRIC multiplicity first; if it already equals the algebraic multiplicity (as in the earlier λ=1 example with a 2×2 eigenspace), the matrix is still diagonalisable and no generalised eigenvectors are needed.",
      "Sanity check: after finding a candidate generalised eigenvector w via (A−λI)w=v, verify (A−λI)w really does equal v (not 0) and that w is not itself a multiple of v — a rank-2 generalised eigenvector must genuinely fail to be an ordinary eigenvector.",
      "Mnemonic: \"generalised eigenvectors always exist, ordinary ones might not\" — Theorem 3.5 is the safety net: no matter how degenerate a matrix's eigenstructure, Rⁿ always has a full basis built from chains of generalised eigenvectors.",
    ],
  },
  {
    id: "de-jordan-normal-form",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: Jordan normal forms",
    title: "Jordan normal form",
    tags: ["differential-equations", "linear-algebra", "eigenvalues"],
    difficulty: "hard",
    summary:
      "Every square matrix — diagonalisable or not — is similar to a Jordan matrix: a block-diagonal matrix built from Jordan blocks (λ on the diagonal, 1s on the superdiagonal), where the block structure directly encodes the chains of generalised eigenvectors found in the previous concept. This finally makes the promise of the matrix exponential concept fully explicit and mechanical: e^(Jt) for a Jordan block has a clean closed form (e^(λt) on the diagonal, te^(λt) on the superdiagonal, ½t²e^(λt) one further out for 3×3 blocks), so e^(tA)=Pe^(tJ)P⁻¹ is now a genuinely computable recipe for ANY matrix, not just diagonalisable ones — replacing the case-by-case trial-and-error of the generalised-eigenvectors concept with one clean, reusable formula.",
    subConcepts: [
      { title: "Jordan block Jλ,k", gloss: "A k×k matrix with λ on every diagonal entry and 1 on every superdiagonal entry — has a single eigenvalue λ with algebraic multiplicity k but geometric multiplicity exactly 1." },
      { title: "Jordan matrix & Jordan normal form", gloss: "A block-diagonal matrix built from several Jordan blocks (possibly different λ's and sizes); every square matrix A is similar to some Jordan matrix J (A=PJP⁻¹), though J is not unique since blocks can be reordered." },
      { title: "Building P from chains of generalised eigenvectors (Lemma 3.6, Theorem 3.7)", gloss: "P's columns are chains of generalised eigenvectors (rank-increasing, grouped by eigenvalue); Lemma 3.6 shows A(w₁|...|wₖ)=(w₁|...|wₖ)Jλ,k for any single chain, and Theorem 3.7 assembles the full Jordan form from all chains via Theorem 3.5's guaranteed basis." },
      { title: "Powers and exponentials of Jordan blocks (Lemma 3.8, 3.9)", gloss: "(Jλ,k)ᵏ has binomial-coefficient entries on each superdiagonal (e.g. (Jλ,2)ᵏ has λᵏ on the diagonal and kλᵏ⁻¹ on the superdiagonal); e^(Jλ,2t)=(e^(λt), te^(λt); 0, e^(λt)) and e^(Jλ,3t) adds a ½t²e^(λt) term two off the diagonal." },
      { title: "e^(tA)=Pe^(tJ)P⁻¹ as a universal computational recipe", gloss: "Since e^J for a Jordan matrix is the direct sum of the exponentials of its constituent Jordan blocks, this reduces computing e^(tA) for ANY matrix to (1) finding P and J via chains of generalised eigenvectors, (2) exponentiating each small Jordan block using Lemma 3.9's closed form, (3) reassembling." },
    ],
    preLecture: [
      "Be solid on generalised eigenvectors and chains (previous concept card) — Jordan normal form is literally the organisational structure that chains of generalised eigenvectors reveal, made explicit as a matrix.",
      "Recall binomial coefficients (n choose k) and be ready to see them appear as matrix entries — Lemma 3.8's formulas for Jordan block powers involve them directly.",
      "Key question to hold in mind: why does the trial-and-error approach from the generalised-eigenvectors concept (guessing αve^(λt), then βvte^(λt), then a correction term) turn out to be equivalent to the clean formula e^(Jλ,2t)=(e^(λt),te^(λt);0,e^(λt)) — what's the connection?",
      "This is flagged as the most technically demanding topic in the systems chapter — budget extra time, and work the 2×2 and 3×3 example matrices by hand before trusting the general pattern.",
    ],
    learningPath: [
      "Recall: state the definition of a Jordan block, a Jordan matrix, and Theorem 3.7 (every square matrix is similar to a Jordan matrix).",
      "Practise: reproduce the Jordan normal form calculation for A=(1,−1;1,3) from the generalised-eigenvectors concept card — build P from the chain {w₁=(−1,1)ᵀ, w₂=(1,0)ᵀ}, and verify P⁻¹AP=(2,1;0,2) exactly.",
      "Connect: use Lemma 3.9's closed form for e^(Jλ,2t) to recompute e^(tA) for the same matrix, and confirm the resulting solution formula x=Pe^(Jt)P⁻¹c matches the trial-and-error answer from the generalised-eigenvectors concept exactly.",
      "Extend / reproduce in R: for the 3×3 worked example B=(0,−3,0;−6,−3,0;2,2,−6) (eigenvalues 3 and −6 with multiplicity 2, one generalised eigenvector needed), build P and J, then compute e^(tA) via Pe^(tJ)P⁻¹ using Lemma 3.9's 2×2-block formula.",
    ],
    applications: [
      "This is the definitive, general-purpose tool for solving ANY linear constant-coefficient system, diagonalisable or not — the practical endpoint of the whole \"systems of linear ODEs\" chapter.",
      "Quant/ML: Jordan form appears whenever a linear model's transition matrix is degenerate (repeated eigenvalues with insufficient eigenvectors) — e.g. certain reduced-form term-structure models in fixed income — and recognising the resulting te^(λt)-type polynomial-times-exponential terms is essential to correctly characterising the model's behaviour rather than assuming pure exponential decay/growth.",
    ],
    examples: [
      "J₂,₃=(2,1,0;0,2,1;0,0,2) has a single eigenvector v=(1,0,0)ᵀ (geometric multiplicity 1 despite algebraic multiplicity 3), and its Jordan chain {w₁=(1,0,0)ᵀ, w₂=(0,1,0)ᵀ, w₃=(0,0,1)ᵀ} recovers exactly the canonical basis of ℝ³.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
    ],
    tips: [
      "Common pitfall: forgetting that the Jordan normal form is NOT unique — the constituent Jordan blocks can be listed in any order along the diagonal, so two textbooks (or your answer and a solution key) may present J with blocks swapped and still both be correct.",
      "Sanity check: after building P from a chain of generalised eigenvectors, verify AP=PJ directly by matrix multiplication on a small example before trusting the general construction — the notes themselves work through this check by hand for the 2×2 case.",
      "Mnemonic: \"chains build blocks\" — every Jordan block of size k corresponds to exactly one chain of k generalised eigenvectors; count the chains and their lengths first, and the Jordan form's block structure follows immediately.",
    ],
  },
  {
    id: "de-complex-eigenvalues-systems",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: Complex eigenvalues and eigenvectors",
    title: "Complex eigenvalues in systems of ODEs",
    tags: ["differential-equations", "linear-algebra", "eigenvalues"],
    difficulty: "core",
    summary:
      "When a real matrix has a complex conjugate pair of eigenvalues α±βi, the naive complex-exponential solution is unsatisfactory for a real problem — but splitting the complex eigenvector u−iv into real and imaginary parts u,v reveals that A acts on this real pair exactly like the 2×2 rotation-scaling matrix (α,−β;β,α), whose matrix exponential is the well-known e^(αt)(cos βt, −sin βt; sin βt, cos βt). This gives a systematic (not ad hoc) way to build real oscillating solutions for complex eigenvalues, extending the same Jordan-block-plus-matrix-exponential machinery from real eigenvalues to complex ones without any new ideas — just a new building-block shape.",
    subConcepts: [
      { title: "Complex eigenvector split into real/imaginary parts", gloss: "For eigenvalue λ=α+iβ (β≠0) with eigenvector u−iv, u and v are linearly independent real vectors — proved via a clever algebraic argument applying A twice and using β≠0." },
      { title: "How A acts on u and v (Lemma 3.10)", gloss: "Au=αu+βv and Av=−βu+αv — found by expanding A(u−iv)=(α+iβ)(u−iv) and comparing real/imaginary parts on both sides." },
      { title: "The associated 2×2 real block (Lemma 3.12)", gloss: "A(u|v)=(u|v)(α,−β;β,α) — the matrix (α,−β;β,α) is exactly the real 2×2 representation of the complex number λ=α+iβ under the ring homomorphism α+iβ↦(α,−β;β,α)." },
      { title: "exp of the rotation-scaling block (Lemma 3.13)", gloss: "exp(α,−β;β,α) = e^α(cos β, −sin β; sin β, cos β) — proved via the ring homomorphism ϕ carrying the matrix exponential's power series to the scalar complex exponential e^(α+iβ)=e^α(cos β+i sin β)." },
      { title: "Assembling the real solution", gloss: "x=e^(tA)c=Pe^(tJ)P⁻¹c where J is built from the (α,−β;β,α) block instead of a real λ block; expanding gives real oscillating terms a(u cos(βt)+v sin(βt))e^(αt)+b(−u sin(βt)+v cos(βt))e^(αt)." },
      { title: "Combining with generalised eigenvectors for repeated complex pairs", gloss: "A matrix can have BOTH a repeated real eigenvalue needing a generalised eigenvector AND a complex conjugate pair — the two Jordan-block types (real λ blocks and (α,−β;β,α) blocks) simply appear as separate blocks in the same overall Jordan/near-Jordan form, exponentiated independently." },
    ],
    preLecture: [
      "Be solid on the matrix exponential and Jordan normal form (previous two concept cards) — complex eigenvalues are handled by swapping in a different building-block shape, not by inventing new machinery.",
      "Recall Euler's formula and the complex-conjugate-root case for scalar constant-coefficient ODEs (an earlier concept card) — the real cos/sin solutions constructed there are the n=1 case of the same real/imaginary-part-splitting idea used here for systems.",
      "Key question to hold in mind: why does representing a complex number α+iβ as the real 2×2 matrix (α,−β;β,α) make its exponential come out as a rotation-scaling matrix — what's the connection between complex multiplication and 2D rotation?",
      "Practical goal: be able to go from a matrix's complex eigenvalue/eigenvector pair straight to the real oscillating solution, without getting stuck manipulating complex exponentials by hand as the notes' first (ad hoc) approach does.",
    ],
    learningPath: [
      "Recall: state Lemma 3.10 (how A acts on u,v), Lemma 3.12 (the associated real 2×2 block), and Lemma 3.13 (its matrix exponential).",
      "Practise: solve x′=(−6,−1;5,−4)x, following the notes' worked example — find λ=−5±2i and eigenvector (1,−1)ᵀ−i(0,2)ᵀ, build P and the real Jordan-style block (−5,−2;2,−5), and assemble the final real oscillating solution.",
      "Connect: verify that the two derivations in the notes (the ad hoc complex-exponential-then-simplify approach, and the systematic Lemma 3.10–3.13 approach) give IDENTICAL final answers for the same example.",
      "Extend / reproduce in R: for the 4×4 worked example with eigenvalues −4 (repeated, needs a generalised eigenvector) and −2±6i (complex pair), build the full near-Jordan matrix combining both block types and confirm e^(tA) assembles correctly from the two separate exponential formulas.",
    ],
    applications: [
      "Physics/engineering: coupled oscillator systems with damping (e.g. multi-degree-of-freedom vibration problems) generically have complex eigenvalues, and this is the exact mechanism producing their real decaying-oscillation behaviour.",
      "Quant/ML: multivariate mean-reverting models with cross-asset coupling (e.g. certain multi-factor interest-rate models) can have complex eigenvalues in their drift matrix, producing oscillatory (not purely monotone) mean-reversion — recognising this from the eigenvalues alone, before simulating, is a direct application of this concept.",
    ],
    examples: [
      "x′=(−6,−1;5,−4)x has eigenvalues λ=−5±2i, giving the real general solution x=a((1,−1)ᵀcos(2t)+(0,2)ᵀsin(2t))e^(−5t) + b((0,2)ᵀcos(2t)−(1,−1)ᵀsin(2t))e^(−5t) — purely oscillating and decaying, with no complex numbers in the final answer.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for complex numbers and rotation",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "de-nonhomogeneous-systems",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 3: Nonhomogeneous systems",
    title: "Nonhomogeneous systems of linear ODEs",
    tags: ["differential-equations", "linear-algebra"],
    difficulty: "core",
    summary:
      "The scalar integrating-factor trick from MAM1000W generalises directly to systems: multiplying x′=Ax+b by e^(−At) and integrating gives the closed-form solution x=e^(At)∫e^(−At)b dt — conceptually simple, but two genuinely hard steps remain in practice. First, P⁻¹b (needed to express the nonhomogeneity in the eigenvector/generalised-eigenvector basis) requires either recognising b as a combination of those basis vectors or actually inverting P. Second, the resulting integral ∫e^(−Jt)P⁻¹b dt may need any of the usual integration techniques (or may not have an elementary closed form at all) — this is where all previously-built machinery (diagonalisation, Jordan form, the matrix exponential) finally converges into a single working method.",
    subConcepts: [
      { title: "The integrating-factor derivation", gloss: "Rearranging x′=Ax+b and multiplying by e^(−At) turns the left side into (e^(−At)x)′; integrating both sides and multiplying back by e^(At) gives x=e^(At)∫e^(−At)b dt — the exact matrix analogue of solving y′+py=q via an integrating factor." },
      { title: "Rewriting via P and J", gloss: "x=Pe^(Jt)∫e^(−Jt)P⁻¹b dt — decomposes the problem into (1) computing P⁻¹b, (2) integrating a vector of exponential-times-polynomial terms, (3) reassembling via Pe^(Jt)." },
      { title: "The difficulty of computing P⁻¹b", gloss: "If b happens to already be a linear combination of A's (generalised) eigenvectors, P⁻¹b is just that same combination of canonical basis vectors — no matrix inversion needed; otherwise P must genuinely be inverted." },
      { title: "The difficulty of the resulting integral", gloss: "Terms like ∫te^(−t)dt (needing integration by parts) routinely appear; the integral may require any standard technique, and for some b it may not be elementary at all — this is a genuinely open-ended computational step, not a template to memorise." },
    ],
    preLecture: [
      "Be solid on the matrix exponential, diagonalisation/Jordan form, and generalised eigenvectors (previous concept cards) — this concept is where all of them get used together in a single worked problem.",
      "Recall the scalar integrating-factor method for first-order linear ODEs from MAM1000W — the derivation here is a line-by-line matrix generalisation of that exact technique.",
      "Key question to hold in mind: under what circumstance is computing P⁻¹b trivial (no actual matrix inversion required), and when does it genuinely require inverting P?",
      "Practical goal: be comfortable with integration by parts on terms like te^(−t), since this is the most common integral shape that appears once P⁻¹b has been found.",
    ],
    learningPath: [
      "Recall: state the derivation of x=e^(At)∫e^(−At)b dt from the integrating-factor idea, and the rewritten form x=Pe^(Jt)∫e^(−Jt)P⁻¹b dt.",
      "Practise: solve the worked 3×3 example x′=(3,−2,−3;5,−4,−3;−1,1,−2)x+(1,1,0)ᵀt, following the notes — notice that the nonhomogeneity (1,1,0)ᵀt is exactly t times the first column of P, making P⁻¹b trivial to write down without inverting P.",
      "Connect: work through the integral ∫(1,0,0)ᵀte^(−t)dt=(1,0,0)ᵀ(−te^(−t)−e^(−t)) step by step via integration by parts, and see how it combines with Pe^(Jt) to produce the final answer (including the particular-solution term −(1,1,0)ᵀ(t+1)).",
      "Extend / reproduce in R: numerically verify the worked example's closed-form solution by plugging it back into the original nonhomogeneous system and confirming both sides match at a few sample values of t.",
    ],
    applications: [
      "Engineering/control theory: this is the general method for solving linear systems with a constant or time-varying forcing input (e.g. a control system's response to a ramp or step input) — the forcing term b(t) plays the role of an external control or disturbance signal.",
      "Quant/ML: linear systems with an external deterministic drift term (e.g. a multi-factor model with a time-varying target level rather than a fixed one) are solved exactly this way — recognising when the forcing term aligns with the system's own eigenvector basis (as in the worked example) can turn an otherwise laborious matrix inversion into a one-line simplification.",
    ],
    examples: [
      "For the worked example, since (1,1,0)ᵀt is exactly t times P's first column, P⁻¹(1,1,0)ᵀt=(1,0,0)ᵀt — collapsing what would otherwise require inverting a 3×3 matrix into an immediate substitution.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "MIT OpenCourseWare — 18.06 Linear Algebra",
        href: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      },
    ],
  },
  {
    id: "de-heat-equation-separation-of-variables",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: The heat equation & separation of variables",
    title: "The heat equation & separation of variables",
    tags: ["differential-equations", "pde"],
    difficulty: "core",
    summary:
      "A PDE like the heat equation ∂u/∂t=k∂²u/∂x² involves an unknown function of two variables, needs boundary conditions (Dirichlet: value specified; Neumann: derivative/flux specified) as well as an initial condition, and separation of variables is the classic first attack: guess u(x,t)=X(x)T(t), substitute in, and the PDE splits into two ORDINARY differential equations joined by a shared separation constant C. Solving the spatial ODE as a boundary-value problem forces C to be negative (C=−λ²) for any nontrivial solution to exist — recasting it as an eigenvalue problem with eigenvalues −λ²=(nπ/L)² and eigenfunctions sin(nπx/L), exactly the discrete frequencies that will build up the full Fourier-series solution in the next concept.",
    subConcepts: [
      { title: "PDE vs. ODE, and linear PDEs", gloss: "A PDE involves partial derivatives of a function of ≥2 variables; the heat equation (Dt−kDx²)u=0 is linear because it's a linear operator acting on u, just like an ODE." },
      { title: "Domain, boundary conditions, initial condition", gloss: "The heat equation on [0,L]×[0,∞) needs Dirichlet (value specified, e.g. u(0,t)=0) or Neumann (flux specified, e.g. uₓ(0,t)=0) conditions at x=0,L, plus an initial condition u(x,0)=u₀(x) at t=0; homogeneous BCs are satisfied by the zero function." },
      { title: "The separation ansatz u=X(x)T(t)", gloss: "Substituting into the PDE and dividing gives (1/kT)dT/dt = (1/X)d²X/dx² — a function of t alone equalling a function of x alone, which forces both sides to equal the same constant C (the separation constant)." },
      { title: "The time ODE & why C must be negative", gloss: "dT/dt=CkT gives T=Ae^(Ckt); physically, temperature should decay to zero as t→∞ (since the boundary is held at zero), which requires C<0, i.e. C=−λ² — this physical requirement becomes a hard mathematical constraint once the spatial boundary-value problem is solved." },
      { title: "The spatial boundary-value problem & its eigenvalues", gloss: "d²X/dx²=CX with X(0)=X(L)=0: C>0 or C=0 forces the trivial solution; only C=−λ² with λ=nπ/L gives nontrivial solutions X=B sin(nπx/L) — recast as an eigenvalue problem D²(X)=−λ²X with eigenvalues −λ²=(nπ/L)² and eigenfunctions sin(nπx/L)." },
      { title: "Assembling one separated solution", gloss: "u(x,t)=C sin(nπx/L)e^(−k(nπ/L)²t) solves the heat equation with homogeneous Dirichlet BCs for any integer n — but only matches an initial condition that happens to already be a single such sine term." },
    ],
    preLecture: [
      "Be solid on constant-coefficient ODEs (an early concept card) — the spatial boundary-value problem d²X/dx²=CX is solved with exactly the same auxiliary-polynomial machinery, just with boundary conditions instead of initial conditions.",
      "Recall the three root-cases for a quadratic auxiliary polynomial (distinct real, repeated, complex conjugate) since all three are checked explicitly to determine which sign of C gives nontrivial solutions.",
      "Key question to hold in mind: why does requiring X(0)=X(L)=0 (rather than an initial-value condition) force only a DISCRETE set of allowed values of λ, rather than a continuum?",
      "Practical goal: be able to state, from memory, why physical intuition (temperature decaying to zero) correctly predicts which sign the separation constant must take, before working through the full boundary-value-problem argument that proves it rigorously.",
    ],
    learningPath: [
      "Recall: state the separation ansatz, the resulting pair of ODEs, and why the spatial boundary-value problem forces C=−λ²=−(nπ/L)².",
      "Practise: reproduce the case analysis (C positive, zero, negative) for d²X/dx²=CX with X(0)=X(L)=0, confirming only C=−(nπ/L)² gives a nontrivial solution.",
      "Connect: explain why the eigenvalue-problem framing (D²X=−λ²X) is a useful way to think about the spatial ODE, foreshadowing the orthogonality/Fourier-series machinery in the next concept.",
      "Extend / reproduce in R: numerically plot the separated solutions sin(nπx/L)e^(−k(nπ/L)²t) for n=1,2,3 at a few times t, and observe how higher n modes decay faster — a direct consequence of the (nπ/L)² factor in the exponent.",
    ],
    applications: [
      "This is the foundational technique behind solving essentially every linear PDE with boundary conditions in physics and engineering — vibrating strings/membranes (wave equation), electrostatic potential (Laplace's equation), and quantum wavefunctions (Schrödinger equation) are all solved by the same separation-of-variables + eigenvalue-problem pattern.",
      "The eigenvalue structure found here (discrete −(nπ/L)² values, sine eigenfunctions) is exactly what makes Fourier series work at all — it's the direct bridge to the next concept.",
    ],
    examples: [
      "If u₀(x)=5 sin(3πx/L) exactly, the heat equation with homogeneous Dirichlet BCs is solved immediately by u(x,t)=5 sin(3πx/L)e^(−k(3π/L)²t) — no further work needed, since the initial condition already matches one separated solution.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for the heat equation and diffusion",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "de-orthogonality-fourier-coefficients",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: Linearity, superposition and orthogonality",
    title: "Orthogonality of functions & Fourier coefficients",
    tags: ["differential-equations", "pde", "linear-algebra"],
    difficulty: "core",
    summary:
      "Because the heat equation is linear, superposing many separated solutions u=∑Cₙ sin(nπx/L)e^(−k(nπ/L)²t) is still a solution — the only remaining question is how to pick the Cₙ so the initial condition matches. The inner product ⟨f,g⟩=∫f(x)g(x)dx (the function-space analogue of the dot product) reveals that the sine functions sin(nπx/L) are pairwise orthogonal, and this orthogonality is exactly the tool needed: it isolates a single unknown coefficient Cₘ out of the infinite sum by making every other term vanish under integration, giving the clean formula Cₘ=(2/L)⟨u₀,fₘ⟩.",
    subConcepts: [
      { title: "Superposition of separated solutions", gloss: "Since the heat equation is linear, u(x,t)=∑ₙCₙ sin(nπx/L)e^(−k(nπ/L)²t) is a solution for any choice of coefficients Cₙ — extends the single-mode solution from the previous concept to a full linear combination." },
      { title: "Inner product of functions", gloss: "⟨f,g⟩=∫₀ᴸf(x)g(x)dx — the function-space analogue of the dot product in Rⁿ, satisfying the same bilinearity/symmetry properties." },
      { title: "Orthogonality of sines", gloss: "⟨fₘ,fₙ⟩=0 for m≠n and ⟨fₙ,fₙ⟩=L/2, where fₙ(x)=sin(nπx/L) — proved via the product-to-sum trigonometric identity and evaluating the resulting integral over [0,L]." },
      { title: "Extracting Fourier coefficients via orthogonality", gloss: "Taking ⟨u₀,fₘ⟩ of both sides of u₀=∑Cₙfₙ, every term in the sum except n=m vanishes by orthogonality, isolating Cₘ=(2/L)⟨u₀,fₘ⟩ — the practical payoff of orthogonality." },
      { title: "Caveats glossed over for now", gloss: "This derivation implicitly exchanges an infinite sum and an integral (term-by-term integration) — flagged explicitly as a step that needs justifying, addressed properly in a later concept (term-by-term integration/differentiation)." },
    ],
    preLecture: [
      "Be solid on separation of variables and the eigenfunctions sin(nπx/L) (previous concept card) — orthogonality is the tool that turns those eigenfunctions into a usable coefficient-finding recipe.",
      "Recall the dot product and orthogonality of vectors in Rⁿ from earlier linear algebra — the function inner product ⟨f,g⟩=∫fg dx is deliberately built to mirror that structure exactly.",
      "Key question to hold in mind: why does orthogonality of the fₙ's make it possible to isolate a SINGLE coefficient Cₘ out of an infinite sum — what's the mechanical role that ⟨·,fₘ⟩ plays?",
      "Practical goal: be fluent with the product-to-sum trig identities (sin A sin B = ½[cos(A−B)−cos(A+B)]) since they're the computational engine behind proving orthogonality.",
    ],
    learningPath: [
      "Recall: state the definition of the function inner product, the orthogonality result for sin(nπx/L), and the formula Cₘ=(2/L)⟨u₀,fₘ⟩.",
      "Practise: reproduce the orthogonality proof for ⟨fₘ,fₙ⟩ (m≠n) using the product-to-sum identity, following the notes' calculation in full.",
      "Connect: solve the heat equation with initial condition u₀(x)=x on [0,L] by computing Cₘ=(2/L)⟨x,fₘ⟩ via integration by parts, following the notes' worked example to Cₘ=(−1)^(1+m)2L/(mπ).",
      "Extend / reproduce in R: numerically compute ⟨sin(2πx/L), sin(3πx/L)⟩ over [0,L] via numerical integration and confirm it evaluates to (approximately) zero, directly verifying orthogonality.",
    ],
    applications: [
      "This orthogonality/inner-product framework is the exact same machinery underlying orthogonal polynomial regression and Gram-Schmidt-style feature engineering in statistics/ML — projecting a function (or vector) onto an orthogonal basis to extract independent coefficients.",
      "Signal processing: extracting the amplitude of a specific frequency component from a signal (e.g. via a discrete Fourier transform) is a direct discrete analogue of the Cₘ=(2/L)⟨u₀,fₘ⟩ formula here.",
    ],
    examples: [
      "For u₀(x)=x on [0,L]: Cₘ=(2/L)∫₀ᴸ x sin(mπx/L)dx = (−1)^(1+m)(2L/mπ), giving u(x,t)=∑(−1)^(1+n)(2L/nπ)sin(nπx/L)e^(−k(nπ/L)²t).",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for Fourier series",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "de-fourier-series-convergence",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: Fourier series",
    title: "Fourier series, periodic extensions & Fourier's theorem",
    tags: ["differential-equations", "pde", "series"],
    difficulty: "stretch",
    summary:
      "A function's Fourier series on [−L,L] is the (formal) infinite combination of 1, cos(nπx/L), sin(nπx/L) with coefficients A₀,Aₙ,Bₙ computed via the same inner-product trick as before. Fourier's theorem is the payoff: for any piecewise-smooth f, this series is GUARANTEED to converge — to f itself wherever its periodic extension is continuous, and to the average of the left/right limits at any jump. Every function on [0,L] can be extended in two genuinely different ways (odd → Fourier sine series, even → Fourier cosine series) that both represent the SAME function on [0,L] despite looking contradictory — because they only have to agree on [0,L], not on the different periodic extensions each one implies outside it.",
    subConcepts: [
      { title: "Piecewise smooth functions", gloss: "f is piecewise smooth on an interval if it can be split into finitely many subintervals on which f and f′ are both continuous — the technical hypothesis needed for Fourier's theorem to apply." },
      { title: "Periodic extension", gloss: "Extends f defined on (−L,L] to all of ℝ by repeating it every 2L — f(x)=f(x+2Ln) for the integer n placing x+2Ln back in (−L,L]." },
      { title: "Fourier series & coefficients", gloss: "f(x)∼A₀+∑Aₙcos(nπx/L)+∑Bₙsin(nπx/L) with A₀=(1/2L)⟨f,1⟩, Aₙ=(1/L)⟨f,cos(nπx/L)⟩, Bₙ=(1/L)⟨f,sin(nπx/L)⟩ — note the inner product here is over the FULL interval [−L,L], not just [0,L]." },
      { title: "Fourier's Theorem (Theorem 4.1)", gloss: "For f piecewise smooth on [−L,L]: the Fourier series converges to the periodic extension wherever it's continuous, and to the average of the two one-sided limits at any jump discontinuity." },
      { title: "Odd extension → Fourier sine series", gloss: "f(x) for 0≤x≤L, −f(−x) for −L≤x<0 — an odd function whose Fourier series has only sine terms (A₀=Aₙ=0 by odd-function symmetry of the integrals)." },
      { title: "Even extension → Fourier cosine series", gloss: "f(x) for 0≤x≤L, f(−x) for −L≤x<0 — an even function whose Fourier series has only cosine terms (Bₙ=0 by odd-function symmetry) — represents the SAME original function on [0,L] as the sine series, just via a different (even, rather than odd) periodic extension outside [0,L]." },
      { title: "Basis interpretation", gloss: "Fourier's theorem, together with orthogonality, says continuous 2L-periodic functions have basis {1, cos(πx/L), sin(πx/L), cos(2πx/L), sin(2πx/L), ...} — an infinite-dimensional vector space, with Fourier coefficients playing the role of coordinates." },
    ],
    preLecture: [
      "Be solid on the inner product and orthogonality of sines (previous concept card) — the Fourier coefficient formulas here are the direct extension to a full basis including cosines and the constant function.",
      "Recall even/odd function decomposition and the fact that ∫ over symmetric limits of an odd function is always zero — this single fact explains why odd extensions give purely sine series and even extensions give purely cosine series.",
      "Key question to hold in mind: how can the SAME function on [0,L] have both a valid sine series and a valid cosine series that look nothing alike — what exactly do the two series actually agree and disagree about?",
      "This is flagged as conceptually one of the richer ideas in the chapter — take time with the u(x,0)=x worked example (both series computed explicitly) rather than treating sine/cosine series as interchangeable recipes.",
    ],
    learningPath: [
      "Recall: state Fourier's Theorem precisely (including the jump-discontinuity averaging clause), and state the difference between an odd and even periodic extension.",
      "Practise: reproduce the notes' worked example — find the Fourier SINE series for u₀(x)=x on [0,L] via the odd extension, then the Fourier COSINE series for the same u₀ via the even extension (g(x)=|x|), confirming they give different-looking but equally valid series.",
      "Connect: explain, using Fourier's Theorem, exactly what each series converges to at x=L (the sine series converges to 0; the cosine series converges to L, matching the continuous even extension there) — and why this difference is expected, not a contradiction.",
      "Extend / reproduce in R: numerically plot the partial sums of both the sine and cosine series for u₀(x)=x (reproducing the notes' Figures 4.4 and 4.5) at increasing numbers of terms, and observe both converging to x on (0,L) but disagreeing at x=L.",
    ],
    applications: [
      "Signal processing/audio: any periodic real-world signal (an audio waveform, an AC electrical signal) is represented in exactly this basis, decomposed into a fundamental frequency and its harmonics — the practical origin of concepts like \"frequency spectrum.\"",
      "Numerical PDE solvers (spectral methods) represent solutions in a truncated Fourier basis rather than a spatial grid, directly exploiting Fourier's theorem's convergence guarantee for smooth-enough functions.",
    ],
    examples: [
      "u₀(x)=x on [0,L]: Fourier sine series = ∑(−1)^(1+n)(2L/nπ)sin(nπx/L) (converges to 0 at x=L, the jump-average); Fourier cosine series = L/2 + ∑(2L/(nπ)²)((−1)ⁿ−1)cos(nπx/L) (converges to L at x=L, matching the continuous |x| extension there).",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for Fourier series",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: assuming a function's Fourier series converges pointwise EVERYWHERE to the function itself — at jump discontinuities of the periodic extension, it converges to the AVERAGE of the two one-sided limits, not to either one-sided value.",
      "Sanity check: before choosing between a sine or cosine series for an initial condition on [0,L], remember both are always available (via the odd/even extension) — the choice is about which is more convenient (e.g. matching a homogeneous Dirichlet vs. Neumann boundary condition), not about which one is \"correct.\"",
      "Mnemonic: \"odd extension only needs sines, even extension only needs cosines\" — because ∫(odd function) over symmetric limits is always 0, forcing exactly one family of coefficients to vanish in each case.",
    ],
  },
  {
    id: "de-term-by-term-differentiation-integration",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: Term-by-term integration and differentiation",
    title: "Term-by-term differentiation & integration of Fourier series",
    tags: ["differential-equations", "pde", "series"],
    difficulty: "hard",
    summary:
      "Differentiating or integrating a Fourier series term-by-term is exactly the kind of infinite-sum-and-limit interchange that's dangerous in general — and it turns out differentiation is the fragile operation while integration is always safe. A Fourier sine series can be differentiated term-by-term only when the underlying function's periodic extension has no jump (f(L)=f(−L)); when this endpoint condition fails, term-by-term differentiation silently produces the WRONG cosine series, off by exactly a correction term the notes derive explicitly. Integration, by contrast, always works — any piecewise-smooth function's Fourier series can be integrated term-by-term and always converges to the true integral, even though the resulting series may not itself be a genuine Fourier series without an extra linear correction term.",
    subConcepts: [
      { title: "Why term-by-term operations need justification", gloss: "For arbitrary functions fᵢ, d/dx(∑fᵢ) need not equal ∑(d/dx fᵢ) — even if one side converges, the other might not, or might converge to something different; naively differentiating the heat-equation solution term-by-term to \"verify\" it solves the PDE is exactly this risky move." },
      { title: "Theorem 4.2: differentiating Fourier sine series", gloss: "If f is odd, continuous, f′ piecewise smooth, AND f(−L)=f(L) (no jump in the periodic extension), then the Fourier sine series can be differentiated term-by-term, giving the correct Fourier cosine series of f′." },
      { title: "What goes wrong when f(L)≠f(−L)", gloss: "For f(x)=x (f(L)=L≠−L=f(−L)), naive term-by-term differentiation of its sine series gives ∑(−1)^(n+1)2cos(nπx/L) — NOT the correct cosine series of f′=1 (which is trivially just 1); the exact gap is a computable correction term (Corollary 4.3)." },
      { title: "Corollary 4.3: the corrected differentiation formula", gloss: "f′ ∼ (1/2L)[f(L)−f(−L)] + ∑(Bₙ(nπ/L) + (1/L)(−1)ⁿ[f(L)−f(−L)])cos(nπx/L) — the naive term-by-term result plus two explicit correction terms that vanish exactly when f(L)=f(−L)." },
      { title: "Convergence issues persist even when differentiation formally works", gloss: "For g(x)=x² (continuous, g(L)=g(−L)=L², so term-by-term differentiation IS formally valid), the resulting Fourier series for g′ still fails to converge to g′ at the endpoints x=±L — because the periodic extension of g isn't differentiable exactly at those points." },
      { title: "Theorem 4.4: integrating Fourier series is always safe", gloss: "Any piecewise-smooth f's Fourier series can be integrated term-by-term, and the resulting series always converges to ∫f — proved by isolating a genuinely continuous function G(x)=F(x)−a₀(x+L) that DOES have a convergent Fourier series (since G(−L)=G(L)=0), then translating its coefficients back." },
    ],
    preLecture: [
      "Be solid on Fourier's Theorem and odd/even extensions (previous concept card) — this concept directly interrogates when the term-by-term manipulations implicitly used there are actually valid.",
      "Recall that ∫f over [−L,L] for f piecewise smooth is well-defined even if f is only piecewise (not everywhere) differentiable — needed to understand why F(x)=∫₋ᴸˣf(s)ds is always continuous even when f itself has jumps.",
      "Key question to hold in mind: why is term-by-term INTEGRATION always safe while term-by-term DIFFERENTIATION is fragile — what's structurally different about the two operations here?",
      "This is flagged as one of the more delicate topics in the chapter — work through the x vs. x² examples side by side rather than trying to memorise the differentiation theorem's hypotheses abstractly.",
    ],
    learningPath: [
      "Recall: state Theorem 4.2's three hypotheses for valid term-by-term differentiation of a Fourier sine series, and state Theorem 4.4 (term-by-term integration is always valid).",
      "Practise: reproduce the f(x)=x counterexample — differentiate its known sine series term-by-term, compare against the true (trivial) Fourier cosine series of f′=1, and identify exactly which correction terms from Corollary 4.3 account for the discrepancy.",
      "Connect: work through the g(x)=x² example, confirming its cosine series CAN be differentiated term-by-term (since g(L)=g(−L)) yet the resulting series for g′ still fails to converge at the endpoints — separating \"is term-by-term differentiation valid\" from \"does the resulting series converge everywhere.\"",
      "Extend: reproduce the proof sketch of Theorem 4.4 — define F(x)=∫₋ᴸˣf(s)ds, subtract the linear term a₀(x+L) to get a genuinely 2L-periodic continuous G(x), and derive the coefficient relations Aₙ=−(L/nπ)bₙ, Bₙ=(L/nπ)aₙ.",
    ],
    applications: [
      "Numerical PDE methods (spectral/Fourier-based solvers) rely on knowing precisely when term-by-term differentiation of a truncated Fourier series is trustworthy — silently differentiating an unsuitable series is a real source of numerical PDE solver bugs.",
      "This distinction (integration always safe, differentiation conditionally safe) generalises to a standing caution in any applied context (signal processing, control theory) where a Fourier/frequency-domain representation of a signal is differentiated to estimate a rate of change.",
    ],
    examples: [
      "f(x)=x: term-by-term differentiation of its sine series gives ∑(−1)^(n+1)2cos(nπx/L), while the TRUE Fourier cosine series of f′(x)=1 is simply the constant series 1∼1 — a stark, easily-checked mismatch illustrating why the f(L)=f(−L) hypothesis in Theorem 4.2 is not optional.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "Socratica (YouTube channel) — Fourier series and convergence",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
    tips: [
      "Common pitfall: assuming that because a Fourier series converges nicely, its term-by-term derivative automatically converges to the function's derivative — always check f(L)=f(−L) first (Theorem 4.2's endpoint condition) before differentiating term-by-term.",
      "Sanity check: if you differentiate a Fourier series term-by-term and the result looks like it disagrees with a function you can differentiate directly (as with f(x)=x above), trust the direct differentiation — the term-by-term shortcut has hypotheses that must be checked, not assumed.",
      "Mnemonic: \"integration heals discontinuities, differentiation exposes them\" — integrating smooths out jumps (producing a continuous F), which is why it's always safe; differentiating can amplify or reveal problems at points where the periodic extension isn't actually smooth.",
    ],
  },
  {
    id: "de-fourier-transform-infinite-domain",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: The Fourier transform",
    title: "The Fourier transform & the heat equation on an infinite domain",
    tags: ["differential-equations", "pde"],
    difficulty: "hard",
    summary:
      "Taking the heat equation's domain from a finite interval [0,L] to the whole real line replaces the discrete Fourier-series frequencies nπ/L with a continuous spectrum of frequencies ω, turning sums into integrals: the Fourier transform. The strategy for solving a PDE this way is genuinely elegant — transform the PDE in x to turn it into an ODE in t only (since the transform converts each x-derivative into a multiplication by −iω), solve that easy ODE, then invert the transform to recover the solution. The key facts that make this work end-to-end are that Gaussians transform to Gaussians (so the transformed solution can always be inverted) and the Convolution Theorem (so a PRODUCT of transforms, which is what you get after solving the ODE, corresponds to a CONVOLUTION in the original variable) — together producing the heat equation's Green's function, a single Gaussian kernel that generates the solution for ANY initial condition via convolution.",
    subConcepts: [
      { title: "From Fourier series to the Fourier transform", gloss: "As L→∞ in a Fourier series, the discrete frequencies nπ/L pack together into a continuum ω, and the sum ∑ turns into an integral — informally derived by taking the complex-exponential form of the Fourier series and passing to the limit L→∞." },
      { title: "The Fourier transform pair", gloss: "f̂(ω)=F[f]=(1/2π)∫f(x)e^(iωx)dx transforms x↦ω (spatial to frequency domain); f(x)=F⁻¹[f̂]=∫f̂(ω)e^(−iωx)dω inverts it — note this is one specific normalisation convention among several used in different textbooks." },
      { title: "Transform of derivatives (Lemma 4.5)", gloss: "F[∂ⁿf/∂xⁿ]=(−iω)ⁿf̂(ω,t) — proved by integrating by parts and using that f decays at ±∞; this is exactly what converts a PDE in x,t into an ODE in t alone, since x-derivatives become mere multiplication by powers of −iω." },
      { title: "Transforming the heat equation into an ODE", gloss: "ut=kuxx transforms to ûₜ=−kω²û, an ordinary (not partial) differential equation in t for each fixed ω, solved immediately as û(ω,t)=û₀(ω)e^(−kω²t) — the PDE-to-ODE reduction promised by the whole method." },
      { title: "Fourier transform of a Gaussian (Lemma 4.6)", gloss: "The Fourier transform of a Gaussian is another Gaussian (e^(−αω²)↔√(π/α)e^(−x²/4α)) — proved by showing the transform satisfies a first-order linear ODE (via differentiating under the integral and integrating by parts) that's itself solved by a Gaussian." },
      { title: "Convolution & the Convolution Theorem (Theorem 4.7)", gloss: "f(x)*g(x)=∫f(s)g(x−s)ds; ĥ(ω)=f̂(ω)ĝ(ω) IFF h(x)=(1/2π)f(x)*g(x) — lets a PRODUCT of transforms (exactly what solving the transformed ODE produces) be inverted as a CONVOLUTION in the original spatial variable." },
      { title: "The heat kernel / Green's function", gloss: "Combining the pieces: u(x,t)=u₀(x)*(1/√(4πkt))e^(−x²/4kt) = ∫u₀(s)(1/√(4πkt))e^(−(x−s)²/4kt)ds — the Gaussian kernel is the influence function/Green's function, and EVERY solution for any initial condition is this same kernel convolved against u₀." },
    ],
    preLecture: [
      "Be solid on separation of variables and the discrete eigenvalue structure of the finite-domain heat equation (two concept cards back) — the Fourier transform is explicitly motivated as the L→∞ limit of that exact discrete picture.",
      "Recall integration by parts fluently, since it's used twice in this concept: once to derive the derivative-transform rule (Lemma 4.5), and once inside the Gaussian-transform proof (Lemma 4.6).",
      "Key question to hold in mind: why does transforming x-derivatives into multiplication by (−iω) reduce a PDE in (x,t) to an ODE in t alone — what specifically does the transform eliminate?",
      "This is flagged as one of the most demanding topics in the course, synthesising nearly every earlier PDE tool — budget significant extra time and work through the full PDE→ODE→inverse-transform pipeline on the worked rectangular-pulse example rather than just the abstract derivation.",
    ],
    learningPath: [
      "Recall: state the Fourier transform pair, the derivative-transform rule (Lemma 4.5), and the Convolution Theorem (Theorem 4.7).",
      "Practise: reproduce the derivation that transforms ut=kuxx into ûₜ=−kω²û and solve that ODE for û(ω,t)=û₀(ω)e^(−kω²t).",
      "Connect: use Lemma 4.6 (Fourier transform of a Gaussian) and the Convolution Theorem together to derive the final closed-form solution u(x,t)=∫u₀(s)(1/√(4πkt))e^(−(x−s)²/4kt)ds from û(ω,t)=û₀(ω)e^(−kω²t).",
      "Extend / reproduce in R: numerically evaluate the notes' worked rectangular-pulse example (u₀=C on |x|≤L, 0 otherwise) using the closed-form Erf-based solution, and plot u(x,t) at increasing t to see the sharp initial pulse smooth out and spread — reproducing the qualitative behaviour of the notes' Figure 4.7.",
    ],
    applications: [
      "This exact PDE→ODE→inverse-transform strategy (Figure 4.6 in the notes) is the standard method for solving linear PDEs on unbounded or semi-infinite domains across physics and engineering — heat/diffusion, wave propagation, and quantum mechanics on the real line are all attacked this way.",
      "Quant finance: this is precisely the method used (in the very next concept, Black-Scholes) to price options — the option-pricing PDE is transformed into the heat equation on an infinite domain, and this Fourier-transform machinery is what actually produces the closed-form pricing formula.",
      "Signal processing: the Fourier transform itself (independent of PDEs) is the foundational tool for analysing a continuous, non-periodic signal's frequency content — the direct continuum generalisation of the discrete Fourier series coefficients from earlier concepts.",
    ],
    examples: [
      "For a rectangular pulse initial condition (u₀=C on |x|≤L, 0 otherwise), the convolution integral evaluates in closed form to u(x,t)=(C/2)[Erf((x+L)/√(4kt)) − Erf((x−L)/√(4kt))] — a smoothly spreading, softening version of the sharp initial rectangle.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for the Fourier transform",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: forgetting that Fourier transform conventions vary between textbooks (where the factor of 1/2π and the sign in the exponent are placed differs) — always check which convention a given source uses before combining formulas from different places.",
      "Sanity check: after solving the transformed ODE for û(ω,t), confirm it's a Gaussian in ω (times the known transform of the initial condition) — if it isn't recognisably built from Gaussians and the initial condition's transform, an earlier algebra step likely has an error.",
      "Mnemonic: \"the Green's function does all the work\" — once you have the heat kernel (1/√(4πkt))e^(−x²/4kt), solving the heat equation for ANY initial condition is just one convolution integral away; the hard analytical work (Lemmas 4.5–4.7) only has to be done once.",
    ],
  },
  {
    id: "de-black-scholes-equation",
    courseCode: "MAM2012S",
    sourceRef: "MAM2012S — Ch 4: The Black-Scholes equation",
    title: "The Black-Scholes equation",
    tags: ["differential-equations", "pde", "finance"],
    difficulty: "hard",
    summary:
      "The Black-Scholes PDE for the price V(S,t) of a European option looks intimidating, but three successive changes of variable strip it down to the plain heat equation already solved: first x=ln(S/K) exploits the equation's Cauchy-Euler-like S-dependence (an echo of the earlier Cauchy-Euler concept), then τ=½σ²(T−t) flips the time-direction so the payoff condition at expiry becomes an ordinary initial condition, and finally V=Ke^(αx+βτ)u(x,τ) for carefully chosen α,β eliminates the remaining first-derivative and zeroth-order terms entirely. What's left really is ∂u/∂τ=∂²u/∂x², solved exactly by the previous concept's heat-kernel convolution — and undoing the three substitutions turns the resulting error-function expression into the famous Black-Scholes formula, written in terms of the normal CDF Φ.",
    subConcepts: [
      { title: "Options vocabulary", gloss: "Strike price K (the predetermined transaction price) vs. spot price S (current market value); expiry date T; European option (exercisable only at expiry) vs. American (any time before); call option (right to buy) vs. put option (right to sell) — options are used to hedge risk or speculate on price moves." },
      { title: "The Black-Scholes PDE & its parameters", gloss: "∂V/∂t + ½σ²S²∂²V/∂S² + rS∂V/∂S − rV = 0, where S=spot price, V=option price, K=strike, r=risk-free rate, σ=volatility (standard deviation of the stock's return)." },
      { title: "Boundary conditions for a European call", gloss: "Payoff condition at expiry: V(S,T)=max{0,S−K} (worth S−K if in-the-money, otherwise worthless); zero condition at S=0: V(0,t)=0 (a worthless underlying stock makes any call on it worthless, whatever the strike)." },
      { title: "Change of variable 1: x=ln(S/K)", gloss: "Motivated by recognising the S-dependent terms (ignoring ∂V/∂t) as a Cauchy-Euler equation in S — exactly the earlier Cauchy-Euler concept's substitution, using the dimensionless ratio S/K rather than S alone." },
      { title: "Change of variable 2: τ=½σ²(T−t)", gloss: "Flips time so the expiry condition (t=T) becomes an initial condition (τ=0), and scales by ½σ² to simplify the resulting coefficients — the payoff BC becomes u(x,0)=max{0, e^((k+1)x/2)−e^((k−1)x/2)} where k=2r/σ² is a dimensionless constant." },
      { title: "Change of variable 3: V=Ke^(αx+βτ)u(x,τ)", gloss: "Choosing α=−(k−1)/2 and β=−(k+1)²/4 eliminates the first-derivative and zeroth-order terms entirely, reducing the equation exactly to the heat equation ∂u/∂τ=∂²u/∂x²." },
      { title: "Solving via the heat kernel & undoing the substitutions", gloss: "Apply the previous concept's convolution formula to the transformed initial condition, evaluate the resulting integrals (completing the square, substituting to the complementary error function Erfc), then undo all three substitutions to recover V(S,t) in terms of S,K,T,t,r,σ." },
      { title: "The Black-Scholes formula in terms of Φ", gloss: "V(S,t) = SΦ(d₁) − Ke^(−r(T−t))Φ(d₂), where d₁,₂ = [ln(S/K)+(r±σ²/2)(T−t)] / (σ√(T−t)) and Φ is the standard normal CDF — the same information as the Erfc form, just rewritten in the more commonly quoted probabilistic notation." },
    ],
    preLecture: [
      "Be solid on Cauchy-Euler equations (an earlier concept card) and the heat equation on an infinite domain via the Fourier transform (previous concept card) — Black-Scholes is explicitly built by chaining exactly these two ideas together via three substitutions.",
      "Recall the complementary error function Erfc and the standard normal CDF Φ, and that they're related by a simple rescaling — the final answer is quoted in the notes in both forms.",
      "Key question to hold in mind: at each of the three substitution steps, what SPECIFIC feature of the equation (the Cauchy-Euler-like S-dependence, the future-dated boundary condition, the remaining lower-order terms) motivates that particular choice of new variable?",
      "This is flagged as the capstone application of the whole PDE chapter, combining Cauchy-Euler intuition with the full Fourier-transform heat-equation machinery — budget significant time, and don't expect to reproduce every algebraic step from memory; focus on the logical chain of substitutions and what each one accomplishes.",
    ],
    learningPath: [
      "Recall: state the Black-Scholes PDE, its European call boundary conditions, and the three changes of variable (x=ln(S/K), τ=½σ²(T−t), V=Ke^(αx+βτ)u) in order.",
      "Practise: work through why ignoring the time-derivative term turns the remaining S-dependent terms into a Cauchy-Euler equation, connecting this directly back to the earlier Cauchy-Euler concept card's motivating observation.",
      "Connect: follow the transformed initial condition u(x,0)=max{0,e^((k+1)x/2)−e^((k−1)x/2)} through the heat-kernel convolution (completing the square, substituting to Erfc) to the final V(S,t) formula, checking at least one intermediate step (e.g. the I₁ integral) against the notes.",
      "Extend / reproduce in R: numerically implement the closed-form Black-Scholes call formula V(S,t)=SΦ(d₁)−Ke^(−r(T−t))Φ(d₂) for representative parameters (matching the notes' Figure 4.10: K=2,T=10,σ=2,r=0.5) and plot V against S and t to reproduce the qualitative shape shown there.",
    ],
    applications: [
      "This is THE foundational quantitative finance model — despite being superseded in practice by more sophisticated models (stochastic volatility, jump-diffusion) that address its simplifying assumptions, Black-Scholes remains the conceptual starting point for essentially all derivatives pricing theory and won its creators a Nobel Prize.",
      "The three-substitution pattern here (exploit a Cauchy-Euler-like structure, flip time to get an initial condition, absorb lower-order terms into an exponential prefactor) is a reusable template for recognising when a seemingly novel finance/engineering PDE is secretly the heat equation in disguise.",
      "Directly relevant to a quant/ML-facing student: this is usually the first real-world PDE model encountered that connects pure mathematics (PDEs, Fourier transforms) to priced financial instruments, and the same log-price substitution reappears throughout mathematical finance (e.g. in the Black-Scholes-Merton framework's use of geometric Brownian motion).",
    ],
    examples: [
      "For K=2, T=10, σ=2, r=0.5 (the notes' Figure 4.10 parameters), the Black-Scholes surface V(S,t) shows V(0,t)=0 along the S=0 edge (the zero boundary condition) and V(S,10)=max{0,S−2} along the t=T=10 edge (the payoff boundary condition), with a smooth interpolating surface in between.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.S096 Topics in Mathematics with Applications in Finance",
        href: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/",
      },
      {
        label: "MIT OpenCourseWare — 18.03 Differential Equations",
        href: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/",
      },
    ],
    tips: [
      "Common pitfall: treating the Black-Scholes formula as something to memorise directly — the far more durable understanding is the three-substitution CHAIN (Cauchy-Euler-style log-price change, time reversal, exponential-prefactor absorption) that reduces it to the already-solved heat equation; the final formula falls out mechanically once that chain is understood.",
      "Sanity check: verify the two boundary conditions directly against the final formula at the extremes — as S→0, both Φ(d₁)→0 and the second term→0, giving V→0 (matching the zero BC); as t→T, the formula should reduce to max{0,S−K} (matching the payoff BC).",
      "Mnemonic: \"Black-Scholes is the heat equation wearing a disguise\" — every hard step (the PDE itself, the boundary conditions, the final formula) traces back to a heat-equation fact already established; the real content of this concept is the disguise (the three substitutions), not new PDE theory.",
    ],
  },
];
