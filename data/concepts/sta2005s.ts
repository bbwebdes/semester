import type { ConceptBriefing } from "../types";

// STA2005S content transcribed from course-docs/STA2005S. The first four cards below
// come from the Week 1 slide decks (W1 - Intro.pdf, W1 - Foundations.pdf, its Q&A doc).
// The remaining cards come from a second source added later,
// `learning-documents/STA2005S/STA2005S Notes.pdf` ("Applied Linear Regression — Notes
// and Theorems", dated 2019) — a fuller reference document covering the general linear
// model end to end (MLE, inference, ANOVA, R², residual diagnostics, variable
// selection, Gauss-Markov, transformations, indicator variables). It's a supplementary
// notes document rather than this year's dated lecture deck, but it matches this
// course's own Test 1 scope (`data/tests.ts`'s `sta-test-1`) topic for topic, so it's
// used as the source for those concepts. It does not cover bootstrapping, PCA (also in
// the Test 1 scope) or any of the design-of-experiments Test 2 topics — nothing was
// fabricated for those; add cards for them once matching notes exist.
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
  {
    id: "sta-general-linear-model-mle",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §3 — The General Linear Model",
    title: "The general linear model & maximum likelihood estimation",
    tags: ["regression", "linear-algebra", "estimation", "probability"],
    difficulty: "core",
    summary:
      "Writing Y = Xβ + e in matrix form (Y an n×1 response vector, X the n×k design matrix with a leading column of 1s, β the k×1 coefficient vector, e ∼ N(0, σ²Iₙ)) turns 'fit a line/plane through many predictors' into one matrix equation. Maximising the likelihood of Y is equivalent to minimising eᵀe (the sum of squared residuals) — the calculus gives the normal equations XᵀXβ = XᵀY, solved by β̂ = (XᵀX)⁻¹XᵀY whenever X has full rank. Because β̂ is a linear transformation of the normal vector Y, it's itself normal: β̂ ∼ N(β, σ²(XᵀX)⁻¹) — this is the engine every later regression result (confidence intervals, t-tests, F-tests) is built on.",
    subConcepts: [
      {
        title: "Matrix form of the model",
        gloss:
          "Y (n×1) = Xβ + e, where X (n×k) has a column of 1s for the intercept plus one column per predictor, β (k×1) holds the coefficients, k = p+1, and e ∼ N(0, σ²Iₙ).",
      },
      {
        title: "Maximum likelihood = minimise eᵀe",
        gloss:
          "Under normal errors, maximising the log-likelihood l(β,σ²) with respect to β is equivalent to minimising the residual sum of squares eᵀe — the same target ordinary least squares (OLS) uses.",
      },
      {
        title: "Normal equations & the OLS/MLE estimator",
        gloss:
          "Setting ∂(eᵀe)/∂β = 0 gives XᵀXβ = XᵀY (the normal equations); if X has full column rank, (XᵀX)⁻¹ exists and β̂ = (XᵀX)⁻¹XᵀY.",
      },
      {
        title: "Distribution of β̂",
        gloss:
          "β̂ is a linear transformation Bβ̂ = (XᵀX)⁻¹XᵀY of the normal vector Y, so β̂ ∼ N(β, σ²(XᵀX)⁻¹) — a direct application of the linear-transformation theorem from Week 1.",
      },
      {
        title: "σ̂² is biased; s² is the fix",
        gloss:
          "The raw MLE σ̂² = (1/n)(Y−Xβ̂)ᵀ(Y−Xβ̂) is biased downward; the unbiased version s² = (Y−Xβ̂)ᵀ(Y−Xβ̂)/(n−k) is what's used everywhere afterwards.",
      },
    ],
    preLecture: [
      "Be fluent in matrix multiplication, transpose, and inverse before this — every formula here is matrix algebra, not new statistics.",
      "Recall the linear-transformation theorem (X ∼ MVN, C fixed ⟹ CX ∼ MVN) from Week 1 — it's reused directly to get β̂'s distribution.",
      "Key question to hold in mind: why does 'maximise the likelihood' collapse to 'minimise the sum of squared errors' once you assume normal errors?",
      "Refresher on partial derivatives of a quadratic form (∂(eᵀe)/∂β) if calculus feels rusty.",
    ],
    learningPath: [
      "Recall: write Y = Xβ + e from memory and label the dimension of each piece for a model with 2 predictors and n = 25 observations.",
      "Practise: derive the normal equations XᵀXβ = XᵀY from ∂(eᵀe)/∂β = 0 for the single-predictor case, matching the notes' Toluca Company worked example.",
      "Connect: link β̂ ∼ N(β, σ²(XᵀX)⁻¹) to why individual coefficient t-tests (a later topic) use exactly this variance formula.",
      "Extend / reproduce in R: fit `lm(Y ~ X)` on a small dataset, then recompute β̂ by hand via `solve(t(X) %*% X) %*% t(X) %*% Y` and confirm they match.",
    ],
    applications: [
      "Every applied regression in this course (and in practice) is this same matrix machinery — the Toluca Company lot-size/work-hours example and the Bank Data multi-predictor example both use it directly.",
      "Quant finance: multi-factor asset-pricing models (Fama-French) are exactly this design-matrix setup with several risk-factor columns in X.",
      "ML: this is literally the closed-form solution linear regression libraries compute under the hood before any gradient descent is needed.",
    ],
    examples: [
      "Toluca Company: X = a column of 1s plus lot size, Y = work hours, n = 25; solving β̂ = (XᵀX)⁻¹XᵀY gives β̂ = (62.37, 3.57)ᵀ — each extra unit of lot size adds 3.57 work hours on average.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — linear regression and least squares intuition",
        href: "https://www.youtube.com/@statquest",
      },
    ],
    tips: [
      "Common pitfall: forgetting the leading column of 1s in X — drop it and the intercept term silently disappears from the model.",
      "Sanity check: (XᵀX) must be invertible — if two predictor columns are exact linear combinations of each other (perfect collinearity), (XᵀX)⁻¹ won't exist and R will drop a variable or warn you.",
      "Mnemonic: \"MLE with normal errors = OLS\" — you never need to re-derive the likelihood from scratch in this course, just recognise that minimising eᵀe is the shortcut.",
    ],
  },
  {
    id: "sta-confidence-prediction-intervals",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §4 — Confidence Intervals",
    title: "Confidence intervals for coefficients and predictions",
    tags: ["regression", "inference", "probability"],
    difficulty: "core",
    summary:
      "Because β̂ᵢ ∼ N(βᵢ, σ²cᵢᵢ) where cᵢᵢ is a diagonal entry of (XᵀX)⁻¹, and s² (using the unknown σ² estimate) is independent of β̂ and scaled chi-square, the ratio (β̂ᵢ−βᵢ)/√(s²cᵢᵢ) follows a t-distribution with n−k degrees of freedom — exactly like the single-sample t-interval from first-year stats, just with a different standard-error formula. The same t-pivot gives confidence intervals for any linear combination of coefficients (lᵀβ̂), for the mean response at a given x (E(Y)), and — widened slightly to account for the extra variance of a single future observation — prediction intervals for a genuinely new Yf.",
    subConcepts: [
      {
        title: "CI for a single coefficient",
        gloss: "βᵢ ∈ β̂ᵢ ± t_(α/2, n−k) √(s²cᵢᵢ), where cᵢᵢ is the i-th diagonal entry of (XᵀX)⁻¹.",
      },
      {
        title: "CI for a linear combination lᵀβ",
        gloss:
          "l′β̂ ± t_(α/2, n−k) √(s²l′Cl) for any fixed vector l — covers a single coefficient (l a unit vector) as a special case.",
      },
      {
        title: "CI for the mean response E(Y) at a given x",
        gloss:
          "x′β̂ ± t_(α/2, n−k) √(s²x′Cx) — the interval for the average Y at a specific combination of predictor values.",
      },
      {
        title: "Prediction interval for a new observation",
        gloss:
          "Yf ∈ Ŷf ± t_(α/2, n−k) √(s²(1 + x′f C xf)) — wider than the CI for the mean because it must also account for the variance of the new error term itself.",
      },
      {
        title: "Collinearity inflates standard errors",
        gloss:
          "Wide confidence intervals (large cᵢᵢ) often signal collinearity among predictors — (XᵀX)⁻¹ becomes numerically unstable and coefficient estimates unreliable.",
      },
    ],
    preLecture: [
      "Recall the standard one-sample t-interval (x̄ ± t·s/√n) from first-year stats — every interval here is that same pivot, just with a regression-specific standard error.",
      "Be comfortable with β̂ ∼ N(β, σ²(XᵀX)⁻¹) from the previous card — these intervals all fall directly out of it.",
      "Key question to hold in mind: why is a prediction interval for a new Yf always wider than a confidence interval for the mean E(Y) at the same x?",
    ],
    learningPath: [
      "Recall: write the general t-pivot form (estimate − parameter)/standard error ∼ t_(n−k) and identify what plays each role for a single βᵢ.",
      "Practise: using the Bank Data C matrix from the notes, compute the CI for β₁ by hand and compare to R's `confint()` output.",
      "Connect: explain in one sentence why the prediction-interval formula has a '+1' inside the square root that the mean-response CI doesn't.",
      "Extend / reproduce in R: use `predict(model, newdata, interval = \"confidence\")` vs `interval = \"prediction\"` on the same new x and confirm the prediction interval is wider.",
    ],
    applications: [
      "Reporting an effect size with uncertainty in any applied regression (e.g. \"each extra lot unit adds 3.57 ± 0.34 work hours\") rather than a bare point estimate.",
      "Forecasting: predicting a plausible range for a specific future case (e.g. a student's expected first-year mark from their matric maths mark) uses the prediction-interval formula directly.",
      "Diagnosing multicollinearity early by scanning for unusually wide coefficient CIs before trusting a fitted model.",
    ],
    examples: [
      "Bank Data example: β̂₁ = 0.5435 with CI 0.5435 ± t₃₉^(0.025)(0.1721) — a fairly tight interval, unlike β̂₃ whose wide interval (std. error 4.99 against an estimate of 0.82) reflects severe collinearity with other X's.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
    ],
    tips: [
      "Common pitfall: quoting a confidence interval for E(Y) when what's actually needed is a prediction interval for one new observation — they answer different questions and are never the same width.",
      "Sanity check: a prediction interval must always be at least as wide as the matching confidence interval for the mean at the same x — if yours isn't, recheck the formula.",
      "Mnemonic: \"predicting one point is riskier than estimating the average\" — that extra risk is exactly the '+1' under the square root.",
    ],
  },
  {
    id: "sta-hypothesis-tests-wald",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §5 — Tests of Hypotheses",
    title: "Testing coefficients: t-tests, subset F-tests & the Wald test",
    tags: ["regression", "inference", "hypothesis-testing", "probability"],
    difficulty: "core",
    summary:
      "Testing a single coefficient H₀: βᵢ = 0 uses t = β̂ᵢ/√(s²cᵢᵢ) ~ t_(n−k) — the familiar t-statistic, which is also just the square root of an equivalent F₁,ₙ₋ₖ test. Testing whether a whole subset of coefficients is jointly zero compares a restricted model (that subset forced to zero) against the unrestricted (full) model via F = (SSE_R − SSE_UR)/(q s²_UR) ~ F_q,n−k, where q is the number of restrictions — this is the same logic used to test 'should we regress at all' and generalises further to the Wald test, which tests any linear restriction Lβ = l₀ on the coefficients at once.",
    subConcepts: [
      {
        title: "t-test for a single coefficient",
        gloss:
          "H₀: βᵢ = 0 vs H₁: βᵢ ≠ 0, test statistic t = β̂ᵢ/√(s²cᵢᵢ) ~ t_(n−k); equivalently t² ~ F₁,ₙ₋ₖ.",
      },
      {
        title: "Restricted vs unrestricted models",
        gloss:
          "The restricted model assumes H₀ true (some β's forced to zero); the unrestricted model is the full fitted model — comparing their residual sums of squares (SSER, SSEUR) is the basis of the subset F-test.",
      },
      {
        title: "F-test for a subset of coefficients",
        gloss:
          "F = (SSER − SSEUR)/(q s²UR) ~ F_q,n−k, where q is the number of coefficients restricted to zero under H₀ — reject H₀ if F exceeds the critical F value.",
      },
      {
        title: "Testing 'should we regress at all'",
        gloss:
          "A special case of the subset F-test: H₀: β₁ = ... = βₚ = 0 (only the intercept survives) — this is the overall F-statistic every regression printout reports automatically.",
      },
      {
        title: "The Wald test",
        gloss:
          "Generalises the subset F-test to any linear restriction H₀: Lβ = l₀ for a q×k matrix L of rank q, via F = (Lβ̂−l₀)′(LCL′)⁻¹(Lβ̂−l₀)/(qs²) ~ F_q,n−k — e.g. testing βᵢ = βⱼ directly.",
      },
    ],
    preLecture: [
      "Recall the confidence-interval card — the same t-pivot underlies both the interval and the single-coefficient hypothesis test.",
      "Be comfortable reading a standard R `summary(lm(...))` output (estimate, std. error, t value, Pr(>|t|)) before this topic connects the columns to the theory.",
      "Key question to hold in mind: why does comparing two nested models' residual sums of squares tell you whether the extra predictors actually help?",
    ],
    learningPath: [
      "Recall: state the subset-F-test formula F = (SSER−SSEUR)/(qs²UR) and identify q and n−k for a specific restricted/unrestricted model pair.",
      "Practise: using the Bank Data example, test whether β₀, β₃, β₅, β₆, β₇ are all jointly zero by fitting the restricted and unrestricted models and computing F by hand.",
      "Connect: explain why the single-coefficient t-test is a special case of the Wald test with L equal to a single unit row vector.",
      "Extend / reproduce in R: fit `lm(Y ~ X1+X2+X4+X8)` (restricted) and `lm(Y ~ .)` (unrestricted) on the Bank Data, then verify `anova(restricted, unrestricted)` reproduces the notes' F = 1.2776.",
    ],
    applications: [
      "Deciding whether to drop a group of weak predictors from a model (subset F-test) rather than judging each one individually.",
      "Testing an economically/scientifically meaningful restriction directly (e.g. two coefficients are equal, βᵢ = βⱼ) via the Wald test, rather than re-fitting a constrained model by hand.",
      "The overall 'F-statistic' line every `summary(lm(...))` prints is precisely the should-we-regress-at-all special case of this same machinery.",
    ],
    examples: [
      "Bank Data: testing H₀: β₃ = 0 gives t = 0.163, p = 0.87 — cannot reject, consistent with X3's very wide, collinearity-inflated confidence interval from the previous card.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — hypothesis testing and F-statistics intuition",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: running several individual t-tests instead of one joint F-test when the real question is about a whole group of coefficients at once — individual tests can each fail to reject while the group is jointly significant, or vice versa (especially under collinearity).",
      "Sanity check: q (the number of restrictions) must equal the difference in the number of parameters between the unrestricted and restricted models — miscounting this is the most common arithmetic slip.",
      "Mnemonic: \"restricted vs unrestricted\" is just \"smaller model vs bigger model\" — the F-test asks whether the bigger model's extra flexibility earned a real reduction in error.",
    ],
  },
  {
    id: "sta-anova-r-squared",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §5.1, §6 — The ANOVA Table & The Coefficient of Determination",
    title: "The regression ANOVA table, R² and adjusted R²",
    tags: ["regression", "anova", "inference"],
    difficulty: "core",
    summary:
      "The total variation in Y (SST = Σ(Yᵢ−Ȳ)²) splits exactly into variation explained by the model (SSR = Σ(Ŷᵢ−Ȳ)²) plus leftover residual variation (SSE = Σ(Yᵢ−Ŷᵢ)²) — SST = SSR + SSE. Dividing each by its degrees of freedom gives mean squares, and MSR/MSE ~ F_p,n−k tests whether the model explains significantly more than chance (the 'should we regress at all' test from the previous card, reframed as a table). R² = SSR/SST is the fraction of variance explained (0 to 1, and mechanically can't decrease as you add predictors); adjusted R² corrects for that by penalising extra predictors, making it the fairer statistic for comparing models of different sizes.",
    subConcepts: [
      {
        title: "Sums-of-squares decomposition",
        gloss: "SST = SSR + SSE, i.e. Σ(Yᵢ−Ȳ)² = Σ(Ŷᵢ−Ȳ)² + Σ(Yᵢ−Ŷᵢ)² — total = explained + unexplained.",
      },
      {
        title: "The ANOVA table",
        gloss:
          "Regression (df = p, SS = SSR), Error (df = n−k, SS = SSE), Total (df = n−1, SS = SST); Mean Squares = SS/df; F = MSR/MSE tests overall significance.",
      },
      {
        title: "R² — coefficient of determination",
        gloss: "R² = SSR/SST = 1 − SSE/SST, the proportion of Y's variance explained by the model; 0 ≤ R² ≤ 1 and it never decreases when a predictor is added, even a useless one.",
      },
      {
        title: "Adjusted R²",
        gloss:
          "R²_adj = 1 − (1−R²)(n−1)/(n−k) — penalises adding predictors that don't pull their weight, so it's the fairer statistic for comparing models with different numbers of predictors.",
      },
    ],
    preLecture: [
      "Recall the subset F-test card — the ANOVA table's F-statistic for 'should we regress at all' is exactly that test, just tabulated.",
      "Be comfortable with the idea of decomposing variance from earlier stats (e.g. one-way ANOVA) before seeing it reframed for regression.",
      "Key question to hold in mind: why can R² never decrease when you add a new predictor, even a completely irrelevant one — and why does that make it a poor tool for comparing models of different sizes?",
    ],
    learningPath: [
      "Recall: draw the SST = SSR + SSE decomposition and label each term's degrees of freedom.",
      "Practise: given SSR, SSE and n, k for the Bank Data example, reconstruct the full ANOVA table (df, SS, MS, F) by hand.",
      "Connect: compute R² and R²_adj for the same model and explain, in one sentence, when they'd diverge noticeably (many weak predictors vs one strong one).",
      "Extend / reproduce in R: run `anova(lm(Y ~ ., data))` and match every number in its printed table against the hand-derived formulas.",
    ],
    applications: [
      "Reporting model fit quality in any applied regression report — R² (with its adjusted counterpart alongside it) is the standard headline statistic.",
      "Model comparison: preferring R²_adj over raw R² whenever comparing models with different numbers of predictors, e.g. during variable selection (a later topic).",
      "Finance: R² of a factor-model regression (e.g. how much of a stock's return variance is explained by market beta) is a standard risk-decomposition tool.",
    ],
    examples: [
      "Bank Data full model: R² = 0.98, meaning 98% of the variance in Y is explained by the 8 predictors jointly — but R²_adj = 0.9759 is the fairer number given how many predictors were used.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — R-squared and ANOVA explained clearly",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
    ],
    tips: [
      "Common pitfall: treating a high R² alone as proof a model is 'good' — it says nothing about whether assumptions hold, whether predictors are collinear, or whether the model is overfit.",
      "Sanity check: R²_adj should always be ≤ R² — if a computed R²_adj comes out higher, there's an arithmetic error.",
      "Mnemonic: \"R² only ever goes up; R²_adj keeps it honest\" — reach for the adjusted version whenever comparing models of different sizes.",
    ],
  },
  {
    id: "sta-residual-diagnostics",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §7 — Model Checking and the Analysis of Residuals",
    title: "Checking model assumptions with residual plots",
    tags: ["regression", "diagnostics", "probability"],
    difficulty: "core",
    summary:
      "The linear model's four assumptions — zero-mean errors, constant variance (homoscedasticity), uncorrelated errors, and normally distributed errors — can't be checked on the true (unknown) errors eⱼ, only on the estimated residuals ê = (I−H)e, where H = X(XᵀX)⁻¹Xᵀ is the 'hat' matrix projecting Y onto its fitted values Ŷ. Because residuals are themselves correlated (Cov(ê) = σ²M for the idempotent M = I−H) and don't have equal variance, raw residual plots are checked visually (residuals vs. fitted, vs. each predictor, QQ-plots for normality) and backed up with formal tests (Kolmogorov-Smirnov, Shapiro-Wilk) — with the standard shape of a 'good' plot being patternless random scatter and a straight-line QQ-plot.",
    subConcepts: [
      {
        title: "The four assumptions to check",
        gloss:
          "E(eⱼ)=0 (correct model form); E(eⱼ²)=σ² for all j (homoscedasticity); E(eⱼek)=0 for j≠k (uncorrelated errors); eⱼ ∼ N(0,σ²) (normality).",
      },
      {
        title: "The hat matrix H",
        gloss:
          "H = X(XᵀX)⁻¹Xᵀ, so that Ŷ = HY — H \"puts the hat on\" Y to get fitted values; it's symmetric and idempotent (a projection).",
      },
      {
        title: "Residuals are correlated, not i.i.d.",
        gloss: "ê = (I−H)e = Me, with M idempotent, so Cov(ê) = σ²M — residuals aren't independent or equal-variance even though the true errors are, which is why raw residuals need care in diagnostics.",
      },
      {
        title: "Residuals vs. fitted / vs. predictors plots",
        gloss:
          "A random, patternless scatter with constant spread supports the assumptions; a fan shape signals heteroscedasticity, a curved trend signals a missing quadratic/transformation term.",
      },
      {
        title: "Normality checks: QQ-plots and formal tests",
        gloss:
          "A QQ-plot (ordered residuals vs. expected normal quantiles/'rankits') should be roughly a straight line; Kolmogorov-Smirnov and Shapiro-Wilk formalise the same visual check into a p-value.",
      },
    ],
    preLecture: [
      "Recall the idempotent-matrix material from the quadratic-forms card — H and M = I−H are exactly that kind of matrix, reused here for a different purpose.",
      "Be comfortable reading a scatterplot for pattern vs. randomness before this topic — the whole diagnostic toolkit is visual pattern-recognition backed by a handful of formal tests.",
      "Key question to hold in mind: why can't you check 'are the true errors normal' directly, and what do you use instead?",
    ],
    learningPath: [
      "Recall: state all four assumptions of the linear model and, for each, name the plot or test that checks it.",
      "Practise: given the Bank Data residuals-vs-fitted plot showing increasing spread with fitted value, diagnose which assumption is violated and what remedy (transformation) the notes suggest.",
      "Connect: explain why Cov(ê) = σ²M rather than σ²I, and why that means residuals shouldn't be treated as literally independent even though the true errors are assumed to be.",
      "Extend / reproduce in R: run `plot(lm(Y ~ ., data))` on a dataset and match each of the four default diagnostic plots to the assumption it's checking.",
    ],
    applications: [
      "Any applied regression project's mandatory first post-fit step: before trusting coefficients, tests, or predictions, check the residual plots.",
      "Deciding on a transformation (log Y, √Y, log X) when a residual plot shows a fan shape or curvature, rather than fitting blindly.",
      "Time-series and panel-data regression: checking for serially correlated residuals specifically (assumption 3) before trusting standard errors.",
    ],
    examples: [
      "Bank Data: the residuals-vs-fitted plot fans outward as fitted values grow (heteroscedastic) and roughly follows x = ay²+b, prompting the notes to suggest a √Y or log Y transformation.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — regression diagnostics and residual plots",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: treating a normal-looking QQ-plot as proof the model is otherwise fine — normality is only one of four assumptions, and the other three need their own checks.",
      "Sanity check: if a formal normality test (Shapiro-Wilk) and the QQ-plot visually disagree, trust the visual check for small departures — these tests are sensitive to sample size and can flag trivial deviations as \"significant\" in large samples.",
      "Mnemonic: \"random scatter is good news\" — any visible pattern (fan, curve, trend) in a residual plot is the model telling you something is wrong.",
    ],
  },
  {
    id: "sta-outliers-influence",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §7.7–7.8 — Detection of Outliers and Influential Points",
    title: "Outliers, leverage & influential observations",
    tags: ["regression", "diagnostics", "probability"],
    difficulty: "stretch",
    summary:
      "An outlier and an influential observation are different failure modes: an outlier has an unusually large residual, while an influential observation — often flagged by high leverage hᵢᵢ (the i-th diagonal of the hat matrix H) — is one whose removal would substantially change the fitted coefficients, whether or not its raw residual looks unusual. Studentized residuals tᵢ (which use s²₍ᵢ₎, the residual variance recomputed with observation i deleted) are the preferred way to flag outliers since they follow a known t-distribution; Cook's distance Dᵢ combines leverage and residual size into a single influence score, with Di = tᵢ²/k · hᵢᵢ/(1−hᵢᵢ) making explicit that a point needs both largeish leverage and a largeish residual to be truly influential.",
    subConcepts: [
      {
        title: "Outlier vs. influential observation",
        gloss:
          "An outlier is unusual in its residual (large |êᵢ|); an influential point is one whose deletion meaningfully changes β̂ — a point can be one, both, or neither.",
      },
      {
        title: "Leverage hᵢᵢ",
        gloss:
          "The i-th diagonal element of H = X(XᵀX)⁻¹Xᵀ; measures how far observation i's predictor values are from the centre of the X-data; 0 ≤ hᵢᵢ ≤ 1, average value k/n, flagged if hᵢᵢ ≥ 2k/n.",
      },
      {
        title: "Studentized residuals",
        gloss:
          "tᵢ = êᵢ/√(s²₍ᵢ₎(1−hᵢᵢ)), where s²₍ᵢ₎ is the residual variance with observation i deleted — follows a t_(n−k−1) distribution, so |tᵢ| ≥ t_(α/2,n−k−1) (or roughly ±2 for large n) flags a potential outlier.",
      },
      {
        title: "Cook's distance",
        gloss:
          "Dᵢ measures how much β̂ changes when observation i is deleted, and simplifies to Dᵢ = (tᵢ²/k)·(hᵢᵢ/(1−hᵢᵢ)) — combining outlyingness (tᵢ) and leverage (hᵢᵢ) into one influence score.",
      },
      {
        title: "Why both matter together",
        gloss:
          "A high-leverage point with a small residual (sits on the fitted line but far from the rest of the X-data) can still be highly influential — Cook's distance is what catches this case that a residual plot alone would miss.",
      },
    ],
    preLecture: [
      "Recall the hat matrix H from the residual-diagnostics card — leverage is literally its diagonal.",
      "Key question to hold in mind: can a point have a small residual but still be highly influential? Hold that question until Cook's distance answers it.",
      "This is flagged as a stretch topic — the leave-one-out formulas (s²₍ᵢ₎, β̂₍ᵢ₎) are conceptually the trickiest part; focus on what each statistic is *for* before worrying about deriving the algebraic shortcuts.",
    ],
    learningPath: [
      "Recall: state the leverage cut-off (2k/n) and the rough studentized-residual cut-off (±2) from memory.",
      "Practise: for the Bank Data example (observation 2 flagged as an outlier, observations 1/23/32 flagged as influential), explain from the diagnostic plots which statistic caught each one and why.",
      "Connect: explain in one sentence why Cook's distance needs BOTH a residual term and a leverage term, using the 'small residual but far-out X' scenario.",
      "Extend / reproduce in R: run `influence.measures(lm(Y ~ ., data))` on a dataset and cross-check its flagged observations against a hand-made leverage/Cook's-distance plot.",
    ],
    applications: [
      "Cleaning a dataset before finalising a regression: deciding whether a flagged point is a data-entry error (delete/correct it) or a genuine, informative extreme case (keep it, but note its influence).",
      "Robustness checks in applied econometrics/finance: refitting a model with the most influential few points removed to confirm conclusions don't hinge on them.",
      "Any automated ML pipeline that reports 'influential training examples' (e.g. via influence functions) is a modern generalisation of exactly this Cook's-distance idea.",
    ],
    examples: [
      "Bank Data: observation 2 has a large studentized residual (an outlier) while observations 1, 23 and 32 have high leverage/Cook's distance (influential) — the notes recommend investigating and potentially refitting without them.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — leverage, outliers and Cook's distance",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: deleting every flagged 'influential' point automatically — investigate first; a genuine, correctly recorded extreme case is real information about the data, not necessarily an error to remove.",
      "Sanity check: leverage values must sum to k (the number of parameters) across all n observations, since tr(H) = k — a useful arithmetic check when computing hᵢᵢ by hand.",
      "Mnemonic: \"leverage is about X, residual is about Y, influence needs both\" — Cook's distance is the statistic that only lights up when unusual-X and unusual-residual combine.",
    ],
  },
  {
    id: "sta-variable-selection",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §8 — Variable Selection Procedures",
    title: "Variable selection: all-subsets, stepwise, AIC/BIC",
    tags: ["regression", "model-selection"],
    difficulty: "core",
    summary:
      "Choosing which predictors belong in a model trades off fit against complexity. All-subsets regression fits every possible 2^p−1 combination and compares them by a criterion (R², adjusted R², Mallows' Cp, AIC, BIC); stepwise procedures (forward selection, backward elimination, or a combination) avoid that combinatorial explosion by adding/removing one variable at a time based on partial F-tests, at the cost of not guaranteeing the same answer both directions — especially when predictors are collinear. No procedure replaces judgement: as the notes themselves quote, 'applied with common sense, they can provide useful results; applied thoughtlessly, and/or mechanically, they may be useless or even misleading.'",
    subConcepts: [
      {
        title: "All-subsets regression",
        gloss:
          "Fit all 2^p−1 possible models from p candidate predictors and compare via a chosen criterion — computationally expensive but exhaustive.",
      },
      {
        title: "Selection criteria: R², adjusted R², Mallows' Cp",
        gloss:
          "R² always favours the biggest model; adjusted R² and Mallows' Cp (which should be ≈ p for a well-specified p-parameter model) penalise unnecessary complexity.",
      },
      {
        title: "AIC and BIC",
        gloss:
          "AIC = n·ln(Σêᵢ²) + 2p − n·ln(n); BIC = n·ln(Σêᵢ²) + p·ln(n) − n·ln(n); lower is better for both, with BIC penalising extra parameters more heavily as n grows.",
      },
      {
        title: "Backward elimination",
        gloss:
          "Start with all predictors, repeatedly drop the variable with the smallest partial F (equivalently smallest |t|) if it's below a chosen F-out threshold, until none qualify for removal.",
      },
      {
        title: "Forward selection & stepwise regression",
        gloss:
          "Forward selection starts empty and adds the most-improving variable at each step (if its partial F exceeds F-in); stepwise regression alternates forward and backward steps, since collinearity can make the two orderings disagree.",
      },
    ],
    preLecture: [
      "Recall the subset F-test card — the partial F-test used at each step of forward/backward/stepwise selection is exactly that test applied to a single added/removed variable.",
      "Key question to hold in mind: why can forward selection and backward elimination sometimes land on different final models from the same data?",
      "No new distribution theory here — this topic is about *procedure* and judgement, building on tools from earlier cards.",
    ],
    learningPath: [
      "Recall: list the three families of variable-selection method (all-subsets, stepwise-type, information-criteria) and one criterion/statistic each relies on.",
      "Practise: given a Bank Data-style output, decide which predictor backward elimination would drop first (smallest partial F) and explain why.",
      "Connect: explain why Mallows' Cp being close to p is treated as good, using the intuition that Cp ≈ p happens when the fitted model isn't missing important structure or padded with noise variables.",
      "Extend / reproduce in R: run both `step(lm(Y~., data), direction=\"backward\")` and `direction=\"forward\"` on the same dataset and check whether they agree on a final model.",
    ],
    applications: [
      "Building a parsimonious model for prediction or reporting when many candidate predictors exist but only a handful are truly useful.",
      "Financial factor-model selection: deciding which of many candidate risk factors belong in an asset-pricing regression.",
      "ML feature selection: these classical stepwise/AIC-BIC ideas are the direct ancestors of modern regularisation-based selection (LASSO, elastic net).",
    ],
    examples: [
      "Bank Data: backward elimination from the full 8-predictor model, using the smallest t-statistics (X3, X7 both have |t| < 0.3), would drop those variables first — matching the notes' restricted-model example.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — model selection, AIC/BIC intuition",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
    ],
    tips: [
      "Common pitfall: trusting an automated stepwise procedure's final model as 'the' correct one — the notes explicitly warn no selection procedure substitutes for the researcher's own judgement and domain knowledge.",
      "Sanity check: if backward and forward selection (or different criteria) land on noticeably different final models, that's itself a signal of collinearity among the candidate predictors, worth investigating directly.",
      "Mnemonic: \"more variables always raise R², never AIC/BIC/adjusted-R² for free\" — reach for a penalised criterion whenever comparing models of different sizes.",
    ],
  },
  {
    id: "sta-gauss-markov",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §9 — The Gauss-Markoff Theorem",
    title: "The Gauss-Markov theorem: OLS is BLUE",
    tags: ["regression", "estimation", "proofs", "linear-algebra"],
    difficulty: "hard",
    summary:
      "The Gauss-Markov theorem says that among all linear unbiased estimators of β, the OLS estimator β̂ = (XᵀX)⁻¹XᵀY has the smallest variance — it's BLUE (Best Linear Unbiased Estimator). The proof considers any other linear unbiased estimator β* = AY, writes A as (XᵀX)⁻¹Xᵀ + B for an arbitrary matrix B, shows unbiasedness forces BX = 0, then shows the covariance of β* exceeds that of β̂ by a positive-semi-definite term σ²BBᵀ that's only zero when B = 0 — meaning β* = β̂ is the unique minimum-variance choice. Crucially, this holds under only E(e) = 0 and E(eeᵀ) = σ²I — normality of the errors is never used, which is why OLS's optimality (though not its exact finite-sample t/F distributions) survives even without a normality assumption.",
    subConcepts: [
      {
        title: "BLUE — Best Linear Unbiased Estimator",
        gloss:
          "Among estimators that are (a) linear in Y and (b) unbiased for β, OLS has the smallest variance for every component of β simultaneously.",
      },
      {
        title: "Setup: an arbitrary competitor β* = AY",
        gloss:
          "Write A = (XᵀX)⁻¹Xᵀ + B for an arbitrary matrix B; A = (XᵀX)⁻¹Xᵀ (i.e. B = 0) recovers OLS.",
      },
      {
        title: "Unbiasedness forces BX = 0",
        gloss:
          "E(β*) = β requires BXβ = 0 for every β, which forces BX = 0 — this constraint is what the rest of the proof works within.",
      },
      {
        title: "Cov(β*) = σ²{(XᵀX)⁻¹ + BBᵀ}",
        gloss:
          "Using BX = 0, the covariance of the competitor decomposes into OLS's covariance plus a σ²BBᵀ term; since BBᵀ is positive semi-definite, its diagonal (variance) entries are ≥ 0.",
      },
      {
        title: "Minimum variance forces B = 0",
        gloss:
          "The diagonal entries of BBᵀ can only all be zero if every entry of B is zero — so β* = β̂ is the unique BLUE, not just tied with it.",
      },
      {
        title: "Normality was never used",
        gloss:
          "The whole proof uses only E(e) = 0 and E(eeᵀ) = σ²I — Gauss-Markov optimality holds regardless of the error distribution, unlike the exact t/F inference results which do need normality.",
      },
    ],
    preLecture: [
      "Be very comfortable with matrix transpose/multiplication rules and the idea of a positive semi-definite matrix before this proof.",
      "Recall that 'unbiased' means E(estimator) = true parameter — the proof's central algebraic step is turning this into the constraint BX = 0.",
      "This is flagged as the hardest topic in this batch — the proof is entirely algebraic (no new probability), so budget time to follow each matrix manipulation rather than rushing to the conclusion.",
    ],
    learningPath: [
      "Recall: state the Gauss-Markov theorem precisely (linear, unbiased, minimum variance — BLUE) and what assumptions it needs (only E(e)=0, E(eeᵀ)=σ²I, not normality).",
      "Practise: work through the derivation from β* = AY to Cov(β*) = σ²{(XᵀX)⁻¹+BBᵀ} step by step from memory.",
      "Connect: explain why 'BBᵀ is positive semi-definite' is exactly the fact that makes OLS's variance the smallest possible, not just *a* possible value.",
      "Extend: contrast this theorem's guarantee (smallest variance among *linear unbiased* estimators) with what it does *not* claim (e.g. it says nothing about biased estimators like ridge regression, which can have lower mean-squared error).",
    ],
    applications: [
      "The theoretical justification for defaulting to OLS whenever its assumptions hold, rather than some other ad hoc linear estimator.",
      "Understanding *why* biased alternatives (ridge regression, LASSO) are sometimes preferred in ML despite Gauss-Markov: they trade a little bias for a large variance reduction, which BLUE doesn't allow itself to consider.",
      "Econometrics: the standard textbook justification cited whenever OLS is chosen as the estimation method for a linear model.",
    ],
    examples: [
      "If B is any nonzero matrix with BX = 0 (e.g. adding a row that's orthogonal to every column of X), Cov(β*) = σ²{(XᵀX)⁻¹+BBᵀ} strictly exceeds σ²(XᵀX)⁻¹ in every diagonal entry — a concrete illustration that any 'creative' alternative linear unbiased estimator can only do worse than OLS, never better.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.650 Statistics for Applications",
        href: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — linear algebra intuition for matrix proofs like this one",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: thinking Gauss-Markov proves OLS is the 'best possible' estimator in every sense — it's only best among linear, unbiased estimators; biased estimators can beat it on mean-squared error.",
      "Sanity check: after deriving BX = 0, confirm it algebraically closes off B = 0 as the *only* variance-minimising choice, not merely a convenient one — that uniqueness is the actual content of \"BLUE\".",
      "Mnemonic: \"Best Linear Unbiased\" — say all three words every time; dropping any one of them (allowing bias, or nonlinearity) changes what's actually being claimed.",
    ],
  },
  {
    id: "sta-transformations-indicator-variables",
    courseCode: "STA2005S",
    sourceRef: "STA2005S Notes.pdf §10–11 — Transformations & Indicator Variables",
    title: "Linearising transformations and indicator (dummy) variables",
    tags: ["regression", "linear-algebra"],
    difficulty: "core",
    summary:
      "Many non-linear-looking relationships are secretly linear once transformed: polynomial terms (X, X², X³) just become extra columns of X in the same Y = Xβ + e framework, and multiplicative/exponential/reciprocal models become linear after a log or reciprocal transform (e.g. Y = αX₁^β X₂^γ ε becomes ln Y = ln α + β ln X₁ + γ ln X₂ + ln ε). Categorical predictors (sex, education level, risk category) need indicator (dummy/factor) variables rather than raw category codes — using f−1 dummies for f categories (never f, or (XᵀX) becomes singular), with the omitted category becoming the 'baseline' that every other category's coefficient is measured relative to.",
    subConcepts: [
      {
        title: "Polynomial terms as extra columns",
        gloss:
          "Y = β₀+β₁X+β₂X²+...+βₚXᵖ+e is fit by treating X, X², ..., Xᵖ as separate columns of the same design matrix — no new theory needed, just more predictors; very high-degree polynomials risk numerical inaccuracy.",
      },
      {
        title: "Log/multiplicative transformations",
        gloss:
          "The multiplicative model Y = αX₁^β X₂^γ ε linearises to ln Y = ln α + β ln X₁ + γ ln X₂ + ln ε; the exponential model Y = e^(β₀+β₁X₁+...)ε linearises similarly via ln Y.",
      },
      {
        title: "Reciprocal and Gompertz models",
        gloss:
          "Y = 1/(β₀+β₁X₁+...+e) linearises via 1/Y; the Gompertz (logistic-style) model linearises via ln(1/Y − 1) — useful when Y is naturally bounded.",
      },
      {
        title: "Why raw category codes break (XᵀX)⁻¹",
        gloss:
          "Coding both 'is male' and 'is female' as separate 0/1 columns alongside an intercept makes one column a linear combination of the others (they sum to the intercept column), so (XᵀX) becomes singular and has no inverse.",
      },
      {
        title: "Indicator (dummy) variables and the baseline category",
        gloss:
          "Use only f−1 dummy variables for f categories; the omitted category becomes the baseline, and every other category's coefficient represents its difference from that baseline, holding other predictors fixed.",
      },
    ],
    preLecture: [
      "Recall the general-linear-model card — every transformation and dummy-variable trick here still fits inside the same Y = Xβ+e / β̂ = (XᵀX)⁻¹XᵀY machinery, just with cleverly chosen columns.",
      "Be comfortable with logarithm and exponent rules — most transformations here are just applying ln to both sides of a non-linear equation.",
      "Key question to hold in mind: why does including a dummy variable for every category of a factor (with no omitted baseline) break the model?",
    ],
    learningPath: [
      "Recall: name one linearising transformation each for a multiplicative model, an exponential model, and a reciprocal model.",
      "Practise: for a 3-category factor (Technikon/University/College/No-study — 4 categories), write out the f−1=3 dummy variables and the baseline-relative regression equation for each group.",
      "Connect: using the Salary Survey example, explain what the mgt.1 coefficient (6883.53) actually represents in plain English, referencing the baseline category it's measured against.",
      "Extend / reproduce in R: fit `lm(salary ~ exp + factor(educ) + factor(mgt))` and confirm R automatically picks the lowest factor level as the baseline, matching the notes' worked example.",
    ],
    applications: [
      "Any regression with a categorical predictor (sex, region, education level, risk category) — indicator variables are the standard, always-applicable tool.",
      "Log-linear (multiplicative) models are the default choice in economics/finance whenever effects are naturally proportional rather than additive (e.g. percentage changes in price/quantity).",
      "Choosing Y* = √Y or ln Y as a fix for the fan-shaped heteroscedasticity spotted in the residual-diagnostics card, rather than abandoning linear regression entirely.",
    ],
    examples: [
      "Salary Survey data: Salary = 8035.60 + 546.18·exp + 3144.04·college + 2996.21·advanced + 6883.53·mgt — a high-school-educated, non-management employee is the baseline; a college-educated manager's predicted salary adds both the college and management dummy coefficients on top.",
    ],
    resources: [
      {
        label: "StatQuest with Josh Starmer (YouTube channel) — dummy variables and categorical predictors in regression",
        href: "https://www.youtube.com/@statquest",
      },
      {
        label: "Khan Academy — Statistics and probability",
        href: "https://www.khanacademy.org/math/statistics-probability",
      },
    ],
    tips: [
      "Common pitfall: including a dummy variable for every level of a category (the 'dummy variable trap') — always use one fewer dummy than the number of categories when an intercept is present.",
      "Sanity check: after fitting a model with factor variables in R, check that the number of coefficients reported for a factor is (number of levels − 1) — if it matches the full level count, something's misconfigured.",
      "Mnemonic: \"transform the equation, not the theory\" — every linearising transformation in this card is just algebra applied before fitting; all the OLS/MLE/inference machinery from earlier cards still applies unchanged afterwards.",
    ],
  },
];
