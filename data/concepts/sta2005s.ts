import type { ConceptBriefing } from "../types";

// STA2005S content transcribed from course-docs/STA2005S: only Week 1 material has
// been released so far (W1 - Intro.pdf, W1 - Foundations.pdf i.e. slide deck III on
// the MVN distribution, and its Q&A doc). The course outline lists further Week 2-6
// regression topics (GLM formulation/estimation, inference, ANOVA, variable
// selection/Gauss-Markov, PCA/bootstrapping) and a later experimental-design section —
// none of that is transcribed here because the notes for it don't exist yet. Add more
// concepts as more weeks are ingested.
export const sta2005sConceptBriefings: ConceptBriefing[] = [
  {
    id: "sta-intro-to-regression",
    courseCode: "STA2005S",
    sourceRef: "Regression W1 — Slide deck I: Course introduction",
    title: "What is regression?",
    tags: ["regression", "foundations", "statistics"],
    difficulty: "core",
    summary:
      "Regression models how the distribution of a continuous response Y depends on one or more explanatory variables X, with random variation captured by an error term ε (written Y ∼ f(X, ε)). Unlike a single correlation coefficient or a t-test, regression can use multiple predictors at once, control for confounders, and answer prediction questions for an individual case — not just describe an average association. In this course \"regression\" specifically means linear regression: a continuous response, a linear relationship with the predictors, a normally distributed error term, and constant variance.",
    subConcepts: [
      {
        title: "Response and explanatory variables",
        gloss:
          "Y is the continuous response (dependent variable); X contains one or more explanatory variables (independent variables); f describes how they relate.",
      },
      {
        title: "Random error term ε",
        gloss:
          "Represents variation in Y not explained by X; its distributional assumptions are what drive later inference (tests, intervals).",
      },
      {
        title: "Regression vs. the correlation coefficient",
        gloss:
          "Correlation only summarises the strength/direction of a linear association between two variables — it can't predict an individual case (e.g. judging one baby's healthy weight) or use several predictors at once.",
      },
      {
        title: "Regression vs. the t-test",
        gloss:
          "A t-test comparing groups can be confounded (e.g. more males than females took a drug) and can't use a continuous predictor like BMI directly — regression handles both continuous and grouped predictors in one framework.",
      },
      {
        title: "Linear regression assumptions",
        gloss:
          "Normally distributed response, a linear relationship with the predictors, and constant variance (homoscedasticity).",
      },
      {
        title: "Where regression becomes flexible (beyond this course)",
        gloss:
          "Non-constant variance, correlated errors (clustered/time-series/spatial), non-normal responses (e.g. counts) and categorical responses are flagged as extensions — not covered by STA2005S's linear model.",
      },
    ],
    preLecture: [
      "Be able to state Y ∼ f(X, ε) and identify Y, X and ε in a simple example before Week 2's general linear model formulation.",
      "Recall from earlier stats: what does a correlation coefficient actually measure, and what does it NOT tell you?",
      "Key question to hold in mind: why would a doctor need more than \"weight and age are correlated\" to judge one baby's healthy weight?",
      "No hard prerequisites beyond first-year stats intuition for this specific deck.",
    ],
    learningPath: [
      "Recall: write out Y ∼ f(X, ε) and label each term for the advertising-spend/revenue example from lecture.",
      "Practise: for the drug/blood-pressure example, explain in one sentence why a t-test alone is confounded by sex.",
      "Connect: link each of the three linear-regression assumptions (normal, linear, constant variance) to a diagnostic plot you'd use to check it (covered later in model diagnostics).",
      "Extend: skim the \"regression becomes flexible\" slide and note which extension (non-constant variance, correlated errors, non-normal response, categorical response) sounds most like a dataset you've seen before.",
    ],
    applications: [
      "Quant/finance: modelling asset returns against risk factors is linear regression at its core (e.g. CAPM: expected return regressed on market return).",
      "ML: linear regression is the simplest supervised-learning model and the baseline every more complex model (regularised regression, GLMs, neural nets) is compared against.",
      "Any prediction-for-an-individual problem (like the baby's weight example) where a single summary correlation can't answer the question.",
    ],
    examples: [
      "Advertising spend vs revenue: a positive correlation alone doesn't tell you how much extra revenue an additional R10,000 of spend buys — the regression slope does.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — statistics fundamentals & regression intuition",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
    ],
    tips: [
      "Common pitfall: treating a correlation coefficient as if it answers a prediction or individual-level question — it only describes an average linear association across a population.",
      "Sanity check: if someone's entire analysis is \"X and Y are correlated\", ask what they'd predict for one new case with a given X — if they can't answer, they need regression, not correlation.",
      "Mnemonic: correlation asks \"how strong\"; regression asks \"how much, for a given X, and can I predict a new one\".",
    ],
  },
  {
    id: "sta-mvn-distribution",
    courseCode: "STA2005S",
    sourceRef: "Regression W1 — Slide deck III: The normal distribution and related theorems",
    title: "The multivariate normal (MVN) distribution",
    tags: ["probability", "distributions", "multivariate-normal", "linear-algebra"],
    difficulty: "core",
    summary:
      "A p-dimensional random vector X has a multivariate normal distribution, written X ∼ N_p(μ, Σ), if its density is the bell-shaped surface f(x) ∝ exp{−½(x−μ)ᵀΣ⁻¹(x−μ)}, generalising the familiar univariate normal N(μ, σ²). μ is the mean vector and Σ is the p×p covariance matrix (Σ must be positive definite for the density to be well-defined), whose (i,j) entry is Cov(Xᵢ, Xⱼ). The normal-errors assumption isn't needed to compute OLS point estimates, but it's exactly what gives regression's inference machinery — confidence intervals and hypothesis tests — their exact, finite-sample t and F distributions, and it's what makes least-squares estimates coincide with maximum likelihood estimates.",
    subConcepts: [
      {
        title: "Univariate normal recap",
        gloss:
          "X ∼ N(μ, σ²), density f(x) = (2πσ²)^(−1/2) exp{−(x−μ)²/2σ²}, with E(X) = μ and Var(X) = σ².",
      },
      {
        title: "MVN density and parameters",
        gloss:
          "f(x) = (2π)^(−p/2)|Σ|^(−1/2) exp{−½(x−μ)ᵀΣ⁻¹(x−μ)}; requires Σ to be positive definite.",
      },
      {
        title: "Mean vector and covariance matrix",
        gloss:
          "E(X) = μ; Cov(X) = E{(X−μ)(X−μ)ᵀ} = Σ. Σ is a matrix, not a scalar — its off-diagonal entries are the covariances between pairs of components.",
      },
      {
        title: "Why normality matters for regression, not for OLS",
        gloss:
          "OLS point estimation needs no distributional assumption on the errors; normal errors are what deliver exact t/F inference and make OLS coincide with maximum likelihood estimation.",
      },
      {
        title: "What's deliberately excluded this year",
        gloss:
          "Deriving the MVN density or MGF, and recovering μ/Σ from the exponent, are explicitly off this course's syllabus (overlap with STA2004F) — you need to use these results, not re-derive them.",
      },
    ],
    preLecture: [
      "Recall the univariate normal PDF and what μ and σ² mean before generalising to vectors.",
      "Key question to hold in mind: what does it mean for a matrix Σ to be a \"covariance matrix\" rather than just a matrix of numbers?",
      "Prerequisite: comfort with matrix/vector notation (transpose, matrix inverse, determinant) — this is the linear-algebra prerequisite content flagged for Week 1.",
      "You do not need to be able to derive the MVN density or MGF — only to use them.",
    ],
    learningPath: [
      "Recall: write down both the univariate and multivariate normal density formulas side by side and map each symbol across (μ → μ, σ² → Σ).",
      "Practise: for a bivariate case, write out Σ explicitly with entries σ11, σ12, σ21, σ22 and state what each one means.",
      "Connect: note that Σ must be positive definite, and connect this to the requirement that variances (diagonal entries) be positive.",
      "Extend / reproduce in R: simulate a bivariate normal sample with a chosen Σ (e.g. via mvtnorm::rmvnorm or MASS::mvrnorm) and compare the resulting scatter to the density-surface/contour-plot slide from lecture.",
    ],
    applications: [
      "Quant finance: joint returns of a portfolio of assets are commonly modelled as multivariate normal, with Σ as the asset covariance matrix used directly in Markowitz portfolio optimisation.",
      "ML: many models (Gaussian processes, LDA, Kalman filters) rest on multivariate normal assumptions for vectors of features or state variables.",
      "Regression itself: the fitted coefficient vector and the residual vector are both linear transformations of a (assumed) multivariate normal response vector — why this topic opens the course.",
    ],
    examples: [
      "For X ∼ N₂((0,0)ᵀ, I₂) (independent standard normal components), the density surface is a symmetric bell centred at the origin with circular contours, because Σ = I means no correlation and equal variances — matching the bivariate visualisation from lecture.",
    ],
    resources: [
      {
        label: "3Blue1Brown (YouTube channel) — visual linear algebra intuition (matrices, determinants) underlying Σ",
        href: "https://www.youtube.com/@3blue1brown",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: reading Σ as just \"the variances\" — every off-diagonal entry is a covariance between a specific pair of components, and Σ must be symmetric and positive definite.",
      "Sanity check: the diagonal of Σ must be positive (they're variances); a computed \"covariance matrix\" with a negative or zero diagonal entry means something upstream is wrong.",
      "Mnemonic: MVN is \"the univariate normal, but μ becomes a vector and σ² becomes a matrix that also tracks how components move together\".",
    ],
  },
  {
    id: "sta-mvn-linear-transformations",
    courseCode: "STA2005S",
    sourceRef: "Regression W1 — Slide deck III: The normal distribution and related theorems",
    title: "Linear transformations & partitions of the MVN distribution",
    tags: ["probability", "distributions", "multivariate-normal", "linear-algebra", "proofs"],
    difficulty: "core",
    summary:
      "If X ∼ N_p(μ, Σ) and C is any fixed q×p matrix, then Y = CX is itself multivariate normal: Y ∼ N_q(Cμ, CΣCᵀ). This one theorem — proved by substituting into the MVN moment-generating function, since an MGF uniquely identifies its distribution — is what lets you get the distribution of a single component, a subvector, or a sum of an MVN vector's components just by choosing the right \"selection matrix\" C. It's essential for regression because fitted coefficients and residuals are literally linear transformations of the (assumed normal) response vector.",
    subConcepts: [
      {
        title: "Moment-generating functions (MGF)",
        gloss:
          "M_X(t) = E{exp(tᵀX)}. In this course MGFs are mainly used to identify distributions — an existing MGF uniquely determines its distribution — not to compute moments.",
      },
      {
        title: "MGF of the MVN",
        gloss:
          "M_X(t) = exp{tᵀμ + ½tᵀΣt} — a linear term plus a quadratic term in the exponent.",
      },
      {
        title: "Linear transformation theorem",
        gloss:
          "X ∼ N_p(μ,Σ), C a fixed q×p matrix ⟹ Y = CX ∼ N_q(Cμ, CΣCᵀ); proved via M_Y(t) = M_X(Cᵀt). C need not have full row rank — if CΣCᵀ is singular, Y is a degenerate (still valid) normal distribution.",
      },
      {
        title: "Selection matrices",
        gloss:
          "A special case of C (a 0/1 matrix) used to extract one component (a row vector eᵢᵀ), a subvector, all-but-one component, or a sum (1ₚᵀ) — each inherits an MVN (or normal) distribution for free from the linear-transformation theorem.",
      },
      {
        title: "Partitions of an MVN vector are MVN",
        gloss:
          "Splitting X into (X⁽¹⁾, X⁽²⁾) with matching splits of μ and block splits of Σ, each sub-vector is itself MVN: X⁽¹⁾ ∼ N_q(μ⁽¹⁾, Σ₁₁) — proved with selection matrices C₁ = (I_q 0) and C₂ = (0 I_r).",
      },
      {
        title: "Joint normality vs. marginal normality",
        gloss:
          "Every component/subvector of a jointly MVN vector is itself normal, but the converse fails — two normal marginals do not by themselves guarantee joint normality.",
      },
    ],
    preLecture: [
      "Be confident manipulating matrix products (Cμ, CΣCᵀ) before this topic — the linear-algebra prerequisite content directly in use here.",
      "Recall the MGF of the MVN distribution from the previous concept card — this proof substitutes directly into it.",
      "Key question to hold in mind: if I only care about one entry of a random vector, what's the smallest \"transformation\" I can apply to get its distribution?",
      "No calculus is required — the whole proof is algebraic substitution into the MGF.",
    ],
    learningPath: [
      "Recall: state the linear-transformation theorem (Y = CX ⟹ Y ∼ N_q(Cμ, CΣCᵀ)) from memory, including what happens if C isn't full row rank.",
      "Practise: redo the \"extract one component\", \"first two elements\" and \"sum of all elements\" examples from the notes without looking, checking your C matrix each time.",
      "Connect: link \"joint normality implies marginal normality, not conversely\" to why you can't assume two normal-looking variables are jointly normal just from their individual histograms.",
      "Extend / reproduce in R: simulate an MVN vector, extract a subvector both by matrix multiplication (C %*% X) and by direct indexing, and confirm the sample mean/covariance match the theorem's predictions.",
    ],
    applications: [
      "Regression: OLS coefficients β̂ = (XᵀX)⁻¹XᵀY are a linear transformation CY of the response vector — this theorem is exactly why β̂ is normally distributed when Y is.",
      "Portfolio finance: a portfolio return is a weighted sum of asset returns — if asset returns are jointly MVN, portfolio return is normal by this same theorem, no extra derivation needed.",
      "Time series / state-space models: Kalman filter updates are linear transformations of Gaussian state vectors, relying on exactly this stability-under-linear-transformation property.",
    ],
    examples: [
      "If (X1,X2)ᵀ ∼ N₂((μ1,μ2)ᵀ, [[σ11,σ12],[σ21,σ22]]), selecting C = [[1,0],[0,1]] (the identity) just recovers (X1,X2)ᵀ itself — the trivial case that confirms the theorem is consistent.",
    ],
    resources: [
      {
        label: "3Blue1Brown (YouTube channel) — matrix transformations as geometric intuition for C",
        href: "https://www.youtube.com/@3blue1brown",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: assuming two individually-normal variables must be jointly normal — keep in mind a counterexample (e.g. a variable and a sign-flipped copy of itself depending on a coin flip) to remember why this fails.",
      "Sanity check: after finding Y = CX's distribution, check dimensions — Cμ should be q×1 and CΣCᵀ should be q×q, matching Y's length.",
      "Mnemonic: \"MGF in, MGF out\" — proving a new variable is MVN is almost always substitute-into-the-MGF-and-recognise-the-shape, not a direct density computation.",
    ],
  },
  {
    id: "sta-quadratic-forms-chi-square",
    courseCode: "STA2005S",
    sourceRef: "Regression W1 — Slide deck III: The normal distribution and related theorems",
    title: "Quadratic forms and the chi-square distribution",
    tags: ["probability", "distributions", "multivariate-normal", "linear-algebra", "proofs", "inference"],
    difficulty: "hard",
    summary:
      "If Y ∼ N_n(0, Iₙ) and A is a symmetric, idempotent (A² = A) matrix of rank k, then the quadratic form YᵀAY follows a chi-square distribution with k degrees of freedom. The proof orthogonally diagonalises A (via a matrix P with PᵀAP = [[I_k,0],[0,0]]), transforms Z = PᵀY (still N_n(0, Iₙ) by the linear-transformation theorem), and shows YᵀAY collapses to a sum of k independent squared standard normals — the definition of a χ²_k variable. This result matters for regression because residual sums of squares are quadratic forms in the response vector, and the projection matrices used to compute fitted values and residuals are exactly symmetric and idempotent — the reason t-tests and F-tests in regression have the distributions they do.",
    subConcepts: [
      {
        title: "Idempotent matrices",
        gloss:
          "A is idempotent if A² = A — applying the transformation twice does the same thing as applying it once (a projection).",
      },
      {
        title: "The quadratic-form theorem",
        gloss: "Y ∼ N_n(0, Iₙ), A symmetric & idempotent with rank k ⟹ YᵀAY ∼ χ²_k.",
      },
      {
        title: "Proof sketch — orthogonal diagonalisation",
        gloss:
          "Symmetry lets you write PᵀAP = [[I_k,0],[0,0]] for an orthogonal P; setting Z = PᵀY keeps Z ∼ N_n(0, Iₙ) since PᵀP = Iₙ (the linear-transformation theorem again).",
      },
      {
        title: "Proof sketch — collapsing to independent squares",
        gloss:
          "YᵀAY = Zᵀ[[I_k,0],[0,0]]Z = Σᵢ₌₁ᵏ Zᵢ², and since the Zᵢ are independent standard normals, this sum is χ²_k by definition.",
      },
      {
        title: "Why rank = degrees of freedom",
        gloss:
          "The rank k of A is exactly how many transformed coordinates survive the [[I_k,0],[0,0]] projection, which is why it becomes the chi-square degrees of freedom.",
      },
      {
        title: "Link to regression inference",
        gloss:
          "Residual sums of squares are quadratic forms in Y; the projection matrices used to get fitted values and residuals are symmetric and idempotent — exactly why residual variance estimates, t-tests for coefficients, and F-tests comparing models all have known, exact finite-sample distributions.",
      },
    ],
    preLecture: [
      "Be solid on the linear-transformation theorem (previous concept card) before this — this proof reuses it directly for Z = PᵀY.",
      "Recall what \"symmetric\" and \"orthogonal matrix\" mean (A = Aᵀ; PᵀP = I).",
      "Key question to hold in mind: why does the RANK of a projection matrix, specifically, end up as the degrees of freedom of a chi-square distribution?",
      "This is flagged as the hardest topic in Week 1 — budget extra time and don't skip the proof steps.",
    ],
    learningPath: [
      "Recall: state the quadratic-form theorem precisely, including both conditions on A (symmetric AND idempotent) and why both are needed.",
      "Practise: work through the proof step by step from memory — diagonalise A, define Z, show Z ∼ N_n(0, Iₙ), collapse the quadratic form to Σzᵢ².",
      "Connect: identify which regression quantity (residual sum of squares) this quadratic form corresponds to, and which matrix (the residual-maker/projection matrix) plays the role of A.",
      "Extend / reproduce in R: construct a small symmetric idempotent matrix (e.g. I − X(XᵀX)⁻¹Xᵀ for a toy X), confirm A² = A numerically, then simulate YᵀAY across many draws and compare its histogram to a χ²_k density.",
    ],
    applications: [
      "Regression diagnostics and inference: the mathematical reason residual variance, t-tests on coefficients, and F-tests comparing nested models all have known exact distributions under normal errors.",
      "ANOVA (later in this course): sums-of-squares decompositions are quadratic forms built from idempotent projection matrices — exactly this theorem, applied repeatedly.",
      "Any least-squares/projection-based method in ML (e.g. ridge regression's effective-degrees-of-freedom calculations) traces back to properties of idempotent projection matrices.",
    ],
    examples: [
      "If A = Iₙ itself (rank n, trivially idempotent and symmetric), the theorem reduces to the familiar fact that a sum of n independent squared standard normals is χ²_n — a useful sanity check for the general result.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — eigenvectors/diagonalisation intuition behind orthogonal diagonalisation",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: forgetting that BOTH symmetric AND idempotent are required — a matrix can be idempotent without being symmetric, and the chi-square result specifically needs the orthogonal-diagonalisation step, which needs symmetry.",
      "Sanity check: always check A² = A directly (even numerically in R) before invoking this theorem — an off-by-one error building a projection matrix is a common source of a wrong degrees-of-freedom count.",
      "Mnemonic: \"rank = degrees of freedom\" — count how many dimensions a projection matrix actually keeps (its rank), and that count is your chi-square's df.",
    ],
  },
];
