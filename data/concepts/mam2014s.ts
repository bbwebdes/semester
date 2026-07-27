import type { ConceptBriefing } from "../types";

// MAM2014S (2RA, Real Analysis) content transcribed from
// course-docs/MAM2014S/MAM2014S NOTES.pdf: Ch0 Preliminaries, Ch1 The real
// numbers, Ch2 Sequences and series, Ch3 The topology of R, Ch4 Limits of
// functions and continuity, Ch5 Derivatives, Ch6 Sequences of functions.
export const mam2014sConceptBriefings: ConceptBriefing[] = [
  {
    id: "ra-sets-number-systems",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 0: Preliminaries",
    title: "Sets, number systems & ordered fields",
    tags: ["foundations", "real-analysis"],
    difficulty: "core",
    summary:
      "Real analysis builds ℝ up from ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ, each system extending the last to fix a specific gap: ℤ adds subtraction, ℚ adds division, and (as the rest of Chapter 1 shows) ℝ adds completeness — the property ℚ lacks. ℚ is an ordered field: addition and multiplication satisfy the usual algebraic laws, and a compatible order (<, =, >, trichotomy) sits on top. This is background the course assumes you're comfortable with before the real content — the Completeness Axiom — begins.",
    subConcepts: [
      { title: "Sets: union, intersection, difference", gloss: "A∪B, A∩B, A\\B defined via \"or\"/\"and\"/\"but not\"; disjoint means A∩B=∅; generalizes to finite and infinite families of sets." },
      { title: "Intervals", gloss: "[a,b], (a,b), (a,b], [a,b) for finite a≤b, plus unbounded intervals [a,∞), (a,∞), (−∞,b], (−∞,b) — \"∞\" is notation, not a real number." },
      { title: "Number systems ℕ⊆ℤ⊆ℚ⊆ℝ", gloss: "ℕ={1,2,3,...} (no 0, by this course's convention); ℤ adds negatives/0 to fix subtraction; ℚ=p/q fractions to fix division; each is a proper subset of the next." },
      { title: "Field & ordered field", gloss: "ℚ is a field: +, × satisfy commutativity, associativity, identities, inverses, distributivity. An ordered field also has a compatible order where exactly one of x<y, x=y, x>y holds for any x,y." },
      { title: "ℚ's missing property: completeness", gloss: "There is no rational x with x²=2 — ℚ has \"holes\"; ℝ is defined as the complete ordered field containing ℚ, fixing exactly this gap (the subject of the rest of Chapter 1)." },
    ],
    preLecture: [
      "This is explicitly \"assumed background\" material in the notes — skim it before the first lecture rather than during it, so class time goes straight to the Completeness Axiom.",
      "Recall set operations (union, intersection, difference) and interval notation from earlier courses.",
      "Key question to hold in mind: at each step ℕ→ℤ→ℚ, what specific operation was broken, and what was added to fix it?",
      "No proof-writing expected here — this is definitions and vocabulary the rest of the course leans on immediately.",
    ],
    learningPath: [
      "Recall: state the chain ℕ⊆ℤ⊆ℚ⊆ℝ and, for each inclusion, the one arithmetic operation it was introduced to fix.",
      "Practise: verify the ordered-field axioms (commutativity, associativity, distributivity, trichotomy of order) hold for a couple of concrete rational number pairs.",
      "Connect: hold onto \"ℚ lacks completeness\" as the open thread — it's resolved in the very next concept card.",
      "Extend: think about why ℚ[√2] (rationals plus √2) is still not \"complete\" in the sense the course will define — it plugs one hole, not all of them.",
    ],
    applications: [
      "Numerical computing: floating-point arithmetic is a finite approximation of ℝ; understanding which real-number properties survive (and which don't, like exact equality) matters for any quant/ML code doing floating-point math.",
      "This course itself: every later chapter (limits, continuity, derivatives) depends on ℝ actually being complete — this card is the setup for that entire payoff.",
    ],
    examples: [
      "2÷3 = 2/3 is not an integer, motivating the extension ℤ→ℚ — directly parallel to how √2 not being rational motivates ℚ→ℝ.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — real analysis / foundations series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-induction-irrational-sqrt2",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 1.1: The well-ordering principle and induction",
    title: "Well-ordering, induction & the irrationality of √2",
    tags: ["induction", "proofs", "real-analysis"],
    difficulty: "core",
    summary:
      "The Well-Ordering Principle (every nonempty subset of ℕ has a smallest element) is the axiom underlying ℕ, and it's logically equivalent to the familiar Principle of Mathematical Induction — this course derives induction from well-ordering explicitly, rather than just asserting both. The same well-ordering machinery gives a clean proof that √2 is irrational: assuming √2=p/q leads, via a minimal-counterexample argument, to a contradiction. This sets up the central theme of Chapter 1 — ℚ has \"holes\" like √2, and ℝ is built to not have them.",
    subConcepts: [
      { title: "Well-Ordering Principle", gloss: "Every nonempty subset of ℕ has a smallest element — fails for ℤ, ℚ, ℝ (e.g. {x<0} has no smallest element in any of them)." },
      { title: "Principle of Mathematical Induction, proved from well-ordering", gloss: "P(1) true and (P(k)⟹P(k+1)) together imply P(n) for all n — proved here by contradiction: if the failure set S were nonempty, its least element would create a contradiction." },
      { title: "Recursive sequences and induction", gloss: "Induction proves bounds/monotonicity properties of sequences defined recursively (e.g. aₙ₊₁=aₙ²+1/5) — a technique reused constantly in Chapter 2." },
      { title: "√2 is irrational", gloss: "Proved via well-ordering: assuming √2=p/q with q minimal among such representations, construct a strictly smaller q₁=(√2−1)q₀ that also works — contradicting minimality." },
    ],
    preLecture: [
      "Recall ordinary induction from earlier courses — this deck's novelty is proving it FROM well-ordering, not just using it.",
      "Recall the definition of a rational number (p/q, integers, q≠0) before the √2 proof.",
      "Key question to hold in mind: why does ℤ, ℚ, ℝ each fail the Well-Ordering Principle, while ℕ satisfies it?",
      "This deck's √2 proof is a specific, memorable instance of a \"minimal counterexample\" argument — a proof technique that recurs throughout analysis.",
    ],
    learningPath: [
      "Recall: state the Well-Ordering Principle and the Principle of Mathematical Induction, and sketch how one is derived from the other.",
      "Practise: redo the recursive-sequence induction example (0≤aₙ₊₁≤aₙ≤1/2) — base case, then the inductive step using that x↦x² is increasing for x≥0.",
      "Connect: work through the √2 irrationality proof end to end, identifying exactly where the Well-Ordering Principle is invoked (constructing q₁<q₀ still in the same set S).",
      "Extend: try adapting the √2 proof strategy to show √3 is irrational, to test whether you've internalised the argument or just memorised it.",
    ],
    applications: [
      "CS: well-ordering underlies termination proofs for recursive algorithms — showing a decreasing sequence of natural numbers can't decrease forever.",
      "This course itself: the √2 irrationality proof is the motivating example for the entire Completeness Axiom (next concept) — ℚ provably has gaps, and ℝ is built to not have them.",
    ],
    examples: [
      "1+3+5+...+(2n−1)=n²: base case 1=1², inductive step adds (2k+1) to both sides of k²=1+3+...+(2k−1) to get (k+1)².",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — proof techniques & real analysis",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-completeness-axiom",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 1.2: The completeness axiom",
    title: "The Completeness Axiom, suprema & infima",
    tags: ["real-analysis", "proofs", "foundations"],
    difficulty: "core",
    summary:
      "The Completeness Axiom — every nonempty subset of ℝ that's bounded above has a least upper bound (supremum) in ℝ — is THE defining property that distinguishes ℝ from ℚ. It's not provable from the ordered-field axioms alone; it's an extra assumption, and it's exactly what's needed to prove things like \"√2 exists as a real number\" (the set {t:t²<2} has a supremum in ℝ, but the analogous set in ℚ doesn't). A supremum need not belong to the set itself (max may not exist even when sup does), and Proposition 1.11's ε-characterisation of sup/inf is the workhorse tool for almost every proof that follows.",
    subConcepts: [
      { title: "Bounded above/below, upper/lower bound", gloss: "A is bounded above if some M∈ℝ satisfies a≤M for all a∈A; bounds are never unique and need not belong to A." },
      { title: "Supremum (least upper bound) & infimum (greatest lower bound)", gloss: "sup A is the smallest of all upper bounds; inf A the largest of all lower bounds — each unique when it exists." },
      { title: "The Completeness Axiom", gloss: "Every nonempty A⊆ℝ bounded above has sup A ∈ ℝ (equivalently, every nonempty A bounded below has inf A ∈ ℝ)." },
      { title: "√2 ∈ ℝ but the analogous rational supremum doesn't exist", gloss: "A={t∈ℝ:t²<2} has sup A=√2 by completeness; the same construction in ℚ (B={r∈ℚ:r²<2}) has no least upper bound in ℚ, since no rational squares to exactly 2." },
      { title: "max/min vs sup/inf", gloss: "max A requires the bound to actually be IN A (e.g. max[a,b]=b exists, but max(a,b) doesn't); sup A always exists (given boundedness) regardless of whether it's attained." },
      { title: "The ε-characterisation of sup/inf (Proposition 1.11)", gloss: "M=sup A iff M is an upper bound AND for every ε>0 there's some a∈A with a>M−ε — the practical tool for proving a specific number is the supremum." },
    ],
    preLecture: [
      "Recall the √2-is-irrational proof from the previous concept card — this axiom is introduced specifically to give ℝ the point ℚ was missing.",
      "Be ready for a genuinely new kind of statement: this is an AXIOM (an assumption), not something proved from earlier facts — it's what makes ℝ different from every other ordered field containing ℚ.",
      "Key question to hold in mind: why must \"least upper bound\" be part of the definition, rather than just \"upper bound\" — what goes wrong if you only require boundedness?",
      "Practical goal: be fluent with Proposition 1.11's ε-test for showing a specific candidate number equals sup A, since almost every subsequent completeness-based proof uses it.",
    ],
    learningPath: [
      "Recall: state the Completeness Axiom precisely, and state Proposition 1.11's ε-characterisation of the supremum from memory.",
      "Practise: reproduce the proof that x=sup{t:t²<2} satisfies x²=2, tracking exactly where the ε-characterisation is invoked to rule out x²<2 and x²>2 in turn.",
      "Connect: work through why B={r∈ℚ:r²<2} has no supremum IN ℚ, even though it's bounded above there — connect this back to why ℚ needed extending.",
      "Extend: prove sup(x+A)=x+sup A for A bounded above and x∈ℝ fixed, as a first independent completeness-based proof.",
    ],
    applications: [
      "Optimisation/ML: many convergence proofs for optimisation algorithms rely on a monotone, bounded sequence of loss values having a limit — completeness is the reason that limit is guaranteed to exist.",
      "Quant finance: no-arbitrage pricing arguments often construct a supremum/infimum over a set of possible prices or strategies; completeness guarantees that supremum is a genuine real number, not just a bound.",
      "This course itself: completeness is reused directly in the Nested Interval Property, the Monotone Convergence Theorem, and the Extreme Value Theorem — nearly every major theorem traces back to this one axiom.",
    ],
    examples: [
      "For [a,b] with a<b: sup[a,b]=sup(a,b)=b (the supremum needn't be IN the set, as with the open interval), while max[a,b]=b exists but max(a,b) does not.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for limits and the real line",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-consequences-of-completeness",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 1.3: Consequences of completeness",
    title: "Nested intervals, the Archimedean Property & density of ℚ",
    tags: ["real-analysis", "proofs"],
    difficulty: "core",
    summary:
      "Three landmark results all flow from the Completeness Axiom. The Nested Interval Property says a shrinking chain of closed bounded intervals always has nonempty intersection — another way ℝ has \"no holes\" (it genuinely fails for ℚ). The Archimedean Property says ℕ is not bounded above in ℝ — obvious-sounding, but it needs completeness to prove, and it immediately gives \"1/n can be made smaller than any ε>0\". Combining these shows ℚ is dense in ℝ (every interval contains a rational number) — and, by a similar trick, the irrationals are dense too.",
    subConcepts: [
      { title: "Nested Interval Property", gloss: "For nonempty closed bounded intervals [a₁,b₁]⊇[a₂,b₂]⊇..., the intersection ⋂[aₙ,bₙ] is nonempty — proved by taking sup of the left endpoints." },
      { title: "Closed and bounded are both necessary", gloss: "[n,∞) (closed, unbounded) and (0,1/n) (bounded, not closed) are both nested with empty intersection — the theorem genuinely needs both hypotheses." },
      { title: "The Archimedean Property", gloss: "For any x∈ℝ there's n∈ℕ with n>x — i.e. ℕ is unbounded in ℝ; proved by contradiction using completeness (if ℕ had a least upper bound M, M−1 wouldn't be an upper bound, giving a contradiction)." },
      { title: "Corollary: 1/n can be made arbitrarily small", gloss: "For any ε>0, there's n∈ℕ with 0<1/n<ε — a direct application of the Archimedean Property with x=1/ε." },
      { title: "Density of ℚ (and of the irrationals) in ℝ", gloss: "For any a<b in ℝ, there's a rational r with a<r<b (found via the Archimedean Property + Well-Ordering); adding √2 to a rational-density argument gives an irrational number in (a,b) too." },
    ],
    preLecture: [
      "Be solid on the Completeness Axiom and the ε-characterisation of sup/inf (previous concept card) — every proof here is built directly on top of it.",
      "Recall the √2-nested-interval example from earlier (⋂[√2−1/n, √2+1/n] = {√2}) as a preview of what this section formalises.",
      "Key question to hold in mind: why does the Nested Interval Property genuinely need BOTH closed AND bounded, and not just one of the two?",
      "Practical goal: be able to state which everyday-obvious-sounding fact (\"ℕ isn't bounded\", \"every interval has a rational in it\") corresponds to which named theorem here.",
    ],
    learningPath: [
      "Recall: state the Nested Interval Property, the Archimedean Property, and the density of ℚ in ℝ, and identify which one is used to prove which other one.",
      "Practise: reproduce the Archimedean Property's proof by contradiction (assume ℕ bounded above, derive a contradiction from M−1 not being an upper bound).",
      "Connect: work through why the Nested Interval Property fails when ℝ is replaced by ℚ (the same √2-approximating intervals, intersected in ℚ only, give the empty set).",
      "Extend: prove the density of the irrationals in ℝ using density of ℚ plus a shift by √2, following the notes' one-paragraph argument.",
    ],
    applications: [
      "Numerical analysis: nested-interval/bisection-style algorithms (e.g. bisection method for root-finding) rely directly on the Nested Interval Property to guarantee convergence to a real root.",
      "This course itself: the Archimedean Property (via 1/n→0) is reused constantly from here on to make ε-δ arguments concrete, and density of ℚ underlies later results about approximating reals by rationals.",
    ],
    examples: [
      "⋂ₙ₌₁^∞ [√2−1/n, √2+1/n] = {√2}: any x in every interval satisfies |x−√2|≤1/n for all n, which forces x=√2 by the Archimedean corollary.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for the real line and limits",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-cardinality",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 1.4: Cardinality",
    title: "Cardinality: countable & uncountable sets",
    tags: ["real-analysis", "proofs", "set-theory"],
    difficulty: "stretch",
    summary:
      "Two sets \"have the same size\" (the same cardinality) if there's a bijection between them — a surprisingly powerful idea once applied to infinite sets. ℤ and ℚ turn out to be countable (listable as a sequence, same size as ℕ) despite ℚ feeling far bigger, via a clever diagonal listing trick. But ℝ is uncountable — genuinely too big to list — proved with a nested-interval construction that's a direct payoff of Chapter 1.3. Since ℚ∪(irrationals)=ℝ and a union of two countable sets is countable, the irrationals alone must be uncountable: there are, in a precise sense, \"far more\" irrational numbers than rational ones.",
    subConcepts: [
      { title: "Bijection & \"same cardinality\"", gloss: "A∼B if there's a bijection f:A→B; this is an equivalence relation (reflexive via identity, symmetric via f⁻¹, transitive via composition)." },
      { title: "Finite, countable, uncountable, at-most-countable", gloss: "A is finite if A∼{1,...,n}; countable if A∼ℕ (listable as a sequence); uncountable if neither; \"at most countable\" = finite or countable." },
      { title: "ℤ and the evens/primes are countable", gloss: "List ℤ as 0,1,−1,2,−2,...; any infinite subset of ℕ is countable (a consequence of a more general subset-of-countable proposition)." },
      { title: "Union of countable sets is countable", gloss: "Interleave the two listings (a₁,b₁,a₂,b₂,...) and delete repeats — extends by induction to any finite union." },
      { title: "ℚ is countable", gloss: "Arrange positive rationals m/n in an infinite square table, list along diagonals, delete repeats to get a sequence — then prepend 0 and alternate ±qᵢ to list all of ℚ." },
      { title: "ℝ is uncountable", gloss: "Proved by contradiction: given any proposed listing x₁,x₂,..., construct nested closed intervals with xₙ∉[aₙ,bₙ], then the Nested Interval Property gives a real number never on the list." },
      { title: "The irrationals are uncountable", gloss: "Since ℝ=ℚ∪(ℝ\\ℚ) and ℚ is countable, if the irrationals were also (at most) countable, their union would be countable — contradicting ℝ's uncountability." },
    ],
    preLecture: [
      "Be solid on the Nested Interval Property and the Archimedean Property (previous concept card) — the proof that ℝ is uncountable reuses the Nested Interval Property directly.",
      "Recall bijections, injectivity and surjectivity — the whole chapter is built on these.",
      "Key question to hold in mind: how can ℚ feel intuitively \"much bigger\" than ℕ, yet be proven exactly the same size?",
      "This is flagged as one of the more conceptually surprising topics in the course — budget extra time to sit with the diagonal-listing argument before moving on.",
    ],
    learningPath: [
      "Recall: state the definitions of countable and uncountable precisely, and state that a countable set is, by this course's convention, always infinite (finite sets aren't called countable here).",
      "Practise: reproduce the diagonal argument that lists all positive rationals as a sequence, then extend it to list all of ℚ.",
      "Connect: work through the uncountability-of-ℝ proof and identify exactly where the Nested Interval Property is invoked to produce a contradiction.",
      "Extend / reproduce in R: for a small finite listing exercise, write code that interleaves two countable lists (à la the union-of-countable-sets proof) and confirm no element is skipped.",
    ],
    applications: [
      "CS/theory of computation: countability underlies why most real numbers are not computable (there are only countably many possible finite programs, but uncountably many reals) — a foundational result in computability theory.",
      "This distinction (countable vs. uncountable) is the starting point for measure theory in more advanced probability/analysis courses — countable sets always have measure zero, which is why \"almost every\" real number is irrational in a precise sense.",
    ],
    examples: [
      "The set of even natural numbers is countable via the explicit listing 2,4,6,8,... — a bijection n↦2n with ℕ.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for infinity and cardinality",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: assuming \"ℚ is dense in ℝ\" (every interval contains a rational) means ℚ is \"almost as big as\" ℝ — density is a topological/order property, completely unrelated to cardinality; ℚ is still only countable.",
      "Sanity check: if you think you've found a bijection between ℝ and ℕ, you've made an error — re-check against the Nested Interval Property proof, since ℝ's uncountability is a proven theorem, not a conjecture.",
      "Mnemonic: \"listable = countable\" — if you can write out a set as a first, second, third,... entry (even with a clever indexing trick like diagonals), it's countable; if no such list can ever capture every element, it's uncountable.",
    ],
  },
  {
    id: "ra-limits-of-sequences",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.1–2.2: Limits of sequences & rules of working with limits",
    title: "Limits of sequences & the Algebraic/Order Limit Theorems",
    tags: ["real-analysis", "limits", "proofs"],
    difficulty: "core",
    summary:
      "A sequence (aₙ) converges to a limit a if, for every ε>0, all terms beyond some point N lie within ε of a — the formal ε-N definition that replaces \"gets closer and closer\" with something provable. Limits are unique, and every convergent sequence is bounded (though the converse fails — a bounded sequence need not converge). The Algebraic Limit Theorem lets you compute new limits (sums, products, quotients) from known ones instead of grinding through the ε-N definition every time, and the Order Limit Theorem says limits preserve ≤ (but not necessarily strict <).",
    subConcepts: [
      { title: "ε-N definition of a limit", gloss: "aₙ→a means: for every ε>0 there's N∈ℕ such that |aₙ−a|<ε for all n≥N — all but finitely many terms lie in (a−ε,a+ε)." },
      { title: "Uniqueness of limits", gloss: "If a sequence has two limits a and b, the triangle inequality forces |a−b|<ε for every ε>0, hence a=b." },
      { title: "Divergent sequences & the negation of convergence", gloss: "A sequence diverges if, for every candidate a, some ε>0 has infinitely many terms outside (a−ε,a+ε) — e.g. ((−1)ⁿ) diverges since no candidate limit can capture both its values." },
      { title: "Convergent ⟹ bounded (but not conversely)", gloss: "Every convergent sequence is bounded (take ε=1, bound the finite exceptional terms plus the tail); ((−1)ⁿ) is bounded yet divergent, so the converse fails." },
      { title: "The Squeeze Theorem", gloss: "If aₙ≤xₙ≤bₙ eventually and aₙ,bₙ→L, then xₙ→L — used e.g. to show sin(n)/n→0 via −1/n≤sin(n)/n≤1/n." },
      { title: "The Algebraic Limit Theorem", gloss: "If aₙ→a, bₙ→b: c·aₙ→ca; aₙ+bₙ→a+b; aₙbₙ→ab; aₙ/bₙ→a/b (provided b≠0) — makes limit computation compositional instead of ε-N from scratch every time." },
      { title: "The Order Limit Theorem", gloss: "If aₙ≤bₙ for all n and both converge, then lim aₙ ≤ lim bₙ — note strict aₙ<bₙ still only gives ≤ in the limit, not <, as 0<1/n but both limits equal 0." },
    ],
    preLecture: [
      "Recall the Archimedean Property's corollary (1/n can be made smaller than any ε) from the previous chapter — it's used constantly to choose N in ε-N proofs.",
      "Key question to hold in mind: why does the definition require ALL terms beyond N to be within ε, rather than just infinitely many terms?",
      "Practical goal: be able to produce an explicit N for a given ε on a simple example (like (n+1)/n→1) before relying on the Algebraic Limit Theorem to skip that work.",
      "No new axioms here — this chapter is where the payoff of completeness (via the Archimedean Property) starts showing up in everyday limit computations.",
    ],
    learningPath: [
      "Recall: state the ε-N definition of convergence, and state all parts of the Algebraic Limit Theorem and the Order Limit Theorem from memory.",
      "Practise: prove (n+1)/n→1 directly from the ε-N definition, following the notes' worked example, then re-derive the same limit using only algebraic-limit-theorem shortcuts.",
      "Connect: explain why a<b (strict) for all n only gives lim a ≤ lim b (not strict) in the limit, using the 0<1/n→0 counterexample.",
      "Extend: use the Squeeze Theorem to evaluate lim sin(n)/n, writing out the bounding sequences and confirming both converge to 0 via the Archimedean corollary.",
    ],
    applications: [
      "Numerical methods: iterative algorithms (Newton's method, gradient descent) are analysed by showing the iterate sequence converges — the ε-N definition is exactly what a convergence proof for such an algorithm has to establish.",
      "Quant/ML: proving an estimator is \"consistent\" (converges to the true parameter as sample size grows) is literally an ε-N argument about a sequence of estimates.",
    ],
    examples: [
      "lim(n+1)/n = 1: |aₙ−1|=1/n, and by the Archimedean corollary, for any ε>0 choose N>1/ε so that 1/n≤1/N<ε for all n≥N.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus (limits intuition)",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-monotone-convergence-theorem",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.3: The Monotone Convergence Theorem",
    title: "The Monotone Convergence Theorem",
    tags: ["real-analysis", "limits", "proofs"],
    difficulty: "core",
    summary:
      "An increasing sequence that's bounded above always converges — and its limit is exactly its supremum. This is one of the most useful tools in the whole course precisely because it proves a limit EXISTS without requiring you to know its value in advance, which then lets you find the value afterward (by taking limits of both sides of a defining equation) — a two-step trick used repeatedly on recursively-defined sequences.",
    subConcepts: [
      { title: "Increasing, decreasing, monotone sequences", gloss: "Increasing: aₙ≤aₙ₊₁ for all n (some texts call this \"non-decreasing\"); decreasing analogously; monotone means one or the other." },
      { title: "sup and inf of a sequence's value set", gloss: "For (aₙ) bounded above, supₙ aₙ = sup{aₙ:n∈ℕ} exists by the Completeness Axiom; similarly infₙ aₙ for bounded-below sequences." },
      { title: "The Monotone Convergence Theorem", gloss: "An increasing sequence bounded above converges, and its limit equals its supremum — proved via Proposition 1.11's ε-characterisation of sup." },
      { title: "Corollary for decreasing sequences", gloss: "A decreasing sequence bounded below converges to its infimum — the mirror-image statement." },
      { title: "Eventually monotone suffices", gloss: "The theorem still applies if monotonicity only holds from some point N₀ onward, not from n=1." },
      { title: "The prove-existence-then-find-the-value technique", gloss: "For a recursively defined sequence, first show increasing + bounded above (existence of a=lim aₙ via MCT), THEN take limits of the recursive formula itself (valid only because the limit is now known to exist) to solve for a's actual value." },
    ],
    preLecture: [
      "Be solid on the Completeness Axiom and sup/inf (earlier concept cards) — this theorem is essentially the Completeness Axiom applied to a sequence's value set.",
      "Recall induction (Chapter 1.1) — proving a sequence is increasing and bounded above is almost always done by induction on both properties simultaneously.",
      "Key question to hold in mind: why is it valid to take limits of BOTH sides of a recursive formula (aₙ=¼(aₙ₋₁²+1)) ONLY after you already know the limit exists — what would go wrong if you tried this on a divergent sequence?",
      "Practical goal: be able to separate the two steps (prove existence via MCT; THEN solve for the value) rather than conflating them.",
    ],
    learningPath: [
      "Recall: state the Monotone Convergence Theorem and its decreasing-sequence corollary, including the \"eventually monotone\" relaxation.",
      "Practise: reproduce the worked example (a₀=0, aₙ=¼(aₙ₋₁²+1)) — prove aₙ<1 by induction, prove aₙ<aₙ₊₁ by induction, invoke MCT, then solve the limiting equation a=¼(a²+1) and use the Order Limit Theorem to rule out the wrong root.",
      "Connect: identify why this two-step technique (existence via MCT, then value via the Algebraic Limit Theorem) is strictly necessary — you cannot skip straight to solving the equation without first establishing the limit exists.",
      "Extend / reproduce in R: numerically iterate a similar recursively-defined sequence and confirm the computed limit matches the value derived analytically.",
    ],
    applications: [
      "Numerical methods: many fixed-point iteration schemes (e.g. iterative square-root algorithms) are proven convergent exactly via monotonicity + boundedness, then the fixed-point equation gives the limiting value.",
      "Quant/ML: proving that an iterative optimisation procedure's loss sequence converges (monotone decreasing, bounded below by zero) is a direct application of this theorem's decreasing-sequence corollary.",
    ],
    examples: [
      "a₀=0, aₙ=¼(aₙ₋₁²+1): MCT gives a=lim aₙ exists; solving a=¼(a²+1) gives a=2±√3, and since aₙ<1 for all n, the Order Limit Theorem forces a≤1, ruling out 2+√3 and leaving a=2−√3.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-series-basics",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.4: A first look at series",
    title: "Series, partial sums & the geometric/harmonic series",
    tags: ["real-analysis", "series"],
    difficulty: "core",
    summary:
      "An infinite series ∑aₙ is really just a sequence in disguise — the sequence of partial sums sₙ=a₁+...+aₙ — so it converges (to a \"sum\") exactly when that sequence of partial sums does. A convergent series' terms must tend to 0, but the converse is famously false: the harmonic series ∑1/n has terms tending to 0 yet diverges, by a grouping argument that makes its partial sums provably unbounded. Geometric series ∑arⁿ are the cleanest fully-solved case, converging exactly when |r|<1, with sum a/(1−r).",
    subConcepts: [
      { title: "Series & partial sums", gloss: "∑aₙ converges to s if the sequence sₙ=∑ₖ₌₁ⁿaₖ converges to s; otherwise the series diverges — series convergence is literally sequence convergence of the partial sums." },
      { title: "Necessary condition: terms must go to 0", gloss: "If ∑aₙ converges, then aₙ=sₙ−sₙ₋₁→s−s=0 — useful for proving DIVERGENCE (if terms don't →0, series diverges), but not sufficient for convergence." },
      { title: "The tail of a convergent series →0", gloss: "For convergent ∑aₙ, the tail sums ∑ₖ₌ₙ₊₁^∞ aₖ can be made arbitrarily small for large n — a direct consequence of the partial sums converging." },
      { title: "Linearity of convergent series", gloss: "∑(can)=c∑aₙ and ∑(aₙ+bₙ)=∑aₙ+∑bₙ when the pieces converge — but you can't split a convergent series into two divergent pieces (e.g. ∑1/(n(n+1)) ≠ ∑1/n − ∑1/(n+1), since the latter two both diverge)." },
      { title: "Telescoping series", gloss: "∑1/(n(n+1)) = ∑(1/n − 1/(n+1)) collapses via cancellation to 1 − 1/(m+1) → 1 — a technique for evaluating a series exactly, not just proving convergence." },
      { title: "Geometric series", gloss: "∑ₙ₌₀^∞ arⁿ converges iff |r|<1, with sum a/(1−r); proved via the closed form sₙ=a(1−rⁿ⁺¹)/(1−r) and rⁿ⁺¹→0 when |r|<1." },
      { title: "The harmonic series diverges", gloss: "∑1/n diverges despite 1/n→0: grouping terms in power-of-2 blocks (1/3+1/4 > 1/4+1/4, etc.) shows s₂ᵐ > 1+m/2, which is unbounded." },
    ],
    preLecture: [
      "Be comfortable with sequence limits and the Algebraic Limit Theorem (previous concept cards) — series convergence is defined entirely in terms of the partial-sum SEQUENCE.",
      "Key question to hold in mind: why is \"terms →0\" necessary but not sufficient for convergence — what does the harmonic series' grouping argument actually exploit?",
      "Recall the Monotone Convergence Theorem — it's exactly what proves the geometric series formula's derivation is legitimate (bounded, monotone partial sums for 0≤r<1).",
      "Practical goal: be able to instantly recognise \"terms don't tend to 0\" as grounds to declare a series divergent without further work.",
    ],
    learningPath: [
      "Recall: state the definition of series convergence (via partial sums), the necessary terms-→0 condition, and the geometric series convergence criterion (|r|<1).",
      "Practise: redo the telescoping-series evaluation of ∑1/(n(n+1))=1 and the harmonic-series divergence proof (grouping into power-of-2 blocks), both from memory.",
      "Connect: explain precisely why you can't split ∑1/(n(n+1)) into ∑1/n − ∑1/(n+1) even though the telescoping trick uses exactly that decomposition termwise.",
      "Extend / reproduce in R: numerically sum the first N terms of the harmonic series for increasing N and observe how slowly (logarithmically) the partial sums grow, despite genuinely diverging.",
    ],
    applications: [
      "Finance: perpetuity and annuity valuation formulas are geometric series in disguise (a/(1−r) is literally the present-value formula for a perpetual cash flow discounted at rate r).",
      "CS: amortised analysis of algorithms often sums a geometric-like series of costs to bound total runtime; recognising divergence (like the harmonic series appearing in certain probabilistic algorithm analyses, e.g. the coupon collector problem) is equally important.",
    ],
    examples: [
      "∑ₙ₌₁^∞(1/2)ⁿ = ½·1/(1−½) = 1 — a convergent geometric series with a=½, r=½.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for infinite series",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-comparison-test-p-series",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.5: The comparison test for series",
    title: "The Comparison Test & the p-series",
    tags: ["real-analysis", "series"],
    difficulty: "core",
    summary:
      "For series with non-negative terms, if 0≤aₙ≤bₙ, then ∑bₙ converging forces ∑aₙ to converge too (squeezed underneath a convergent \"ceiling\"), and ∑aₙ diverging forces ∑bₙ to diverge (it has to be at least as big as something already unbounded). This turns convergence-checking into a matter of finding the right comparison series — and the p-series ∑1/nᵖ (convergent iff p>1) is the single most useful \"ruler\" to compare against.",
    subConcepts: [
      { title: "The Comparison Test", gloss: "For 0≤aₙ≤bₙ: ∑bₙ convergent ⟹ ∑aₙ convergent (via Monotone Convergence Theorem on the smaller partial sums); ∑aₙ divergent ⟹ ∑bₙ divergent (the contrapositive)." },
      { title: "Only valid for non-negative terms", gloss: "The Comparison Test's proof relies on partial sums being increasing, which needs aₙ,bₙ≥0 — it does not apply directly to series with mixed-sign terms." },
      { title: "The p-series", gloss: "∑1/nᵖ converges iff p>1: for p≤1, compare against the (divergent) harmonic series; for p>1, group into power-of-2 blocks (mirroring the harmonic-series proof) to bound partial sums by a convergent geometric series." },
      { title: "Comparison in practice: bounding the algebraic form", gloss: "To compare a messy term (e.g. (n²+3)/(n³+2)) against 1/n or 1/n², bound numerator/denominator crudely (e.g. n²+3 ≥ n², n³+2 ≤ 2n³) to land on a recognisable comparison series." },
    ],
    preLecture: [
      "Be solid on the Monotone Convergence Theorem (earlier concept card) — the Comparison Test's proof is a direct application of it to the smaller sequence's partial sums.",
      "Recall the harmonic series' divergence (previous concept card) — it's the base case (p=1) of the p-series family, and the comparison anchor for showing p≤1 diverges.",
      "Key question to hold in mind: why does the Comparison Test require BOTH series to have non-negative terms — what step of the proof would break otherwise?",
      "Practical goal: get fast at eyeballing a messy rational-function term and finding the right power of n to compare it against.",
    ],
    learningPath: [
      "Recall: state the Comparison Test in both directions (convergence transfers down, divergence transfers up) and state the p-series convergence criterion.",
      "Practise: redo the p>1 case of the p-series proof (grouping partial sums into power-of-2 blocks bounded by a geometric series), following the notes' argument in full.",
      "Connect: use the Comparison Test to show ∑(sin n/n)² converges (compare against ∑1/n²) and ∑(n²+3)/(n³+2) diverges (compare against ∑1/(2n)).",
      "Extend / reproduce in R: numerically sum partial sums of ∑1/n^1.5 (a convergent p-series) and ∑1/n (divergent) side by side to see the qualitatively different growth.",
    ],
    applications: [
      "Statistics: convergence of ∑1/n² (via the p-series test) underlies why certain infinite-variance-adjacent sums in probability (e.g. moments of specific distributions) are finite while superficially similar sums diverge.",
      "CS: p-series comparisons are a standard tool for bounding the running time of algorithms that sum a decreasing sequence of costs across iterations (e.g. certain divide-and-conquer recurrences).",
    ],
    examples: [
      "∑1/n² converges by comparison: 1/n² = 2/(n(n+n)) ≤ 2/(n(n+1)), and ∑2/(n(n+1)) converges (a scalar multiple of the telescoping series from the previous card), so ∑1/n² converges too, with 0≤∑1/n²≤2 (in fact it equals π²/6).",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — series convergence tests",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-subsequences-bolzano-weierstrass",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.6: Subsequences and the Bolzano-Weierstrass Theorem",
    title: "Subsequences & the Bolzano-Weierstrass Theorem",
    tags: ["real-analysis", "limits", "proofs"],
    difficulty: "core",
    summary:
      "A subsequence keeps some of a sequence's terms, in their original order, and throws the rest away. Every subsequence of a convergent sequence converges to the SAME limit — which gives a powerful divergence test: if you can find two subsequences converging to different limits (or one subsequence that diverges outright), the original sequence must diverge. The Bolzano-Weierstrass Theorem is the striking converse-flavoured result: even a sequence that itself diverges is guaranteed to have SOME convergent subsequence, as long as it's bounded — proved by repeatedly bisecting an interval and using the Nested Interval Property.",
    subConcepts: [
      { title: "Subsequence", gloss: "For a strictly increasing sequence of indices n₁<n₂<..., (aₙₖ) is a subsequence of (aₙ) — same terms, same order, possibly some skipped." },
      { title: "Subsequences of convergent sequences converge to the same limit", gloss: "If aₙ→a, then aₙₖ→a for any subsequence — because nₖ≥k eventually pushes past any N from the original ε-N argument." },
      { title: "Sequential Test for Divergence", gloss: "A sequence with a divergent subsequence, or two subsequences converging to DIFFERENT limits, must itself diverge — a practical divergence-detection tool." },
      { title: "The Bolzano-Weierstrass Theorem", gloss: "Every bounded sequence in ℝ has a convergent subsequence — proved by repeatedly bisecting a containing interval, always keeping the half with infinitely many terms, and invoking the Nested Interval Property." },
      { title: "The bisection construction in detail", gloss: "Build nested intervals Iₖ of length (½)ᵏℓ each containing infinitely many terms; pick aₙₖ∈Iₖ with n₁<n₂<...; the resulting subsequence converges to the (unique) point in ⋂Iₖ." },
    ],
    preLecture: [
      "Be solid on the Nested Interval Property (earlier concept card) — the Bolzano-Weierstrass proof is a direct, elegant application of it via repeated bisection.",
      "Recall why dividing an interval into THIRDS (not halves) was needed for the ℝ-is-uncountable proof — a similar \"avoid landing exactly on a point\" subtlety does NOT arise here, since Bolzano-Weierstrass only needs \"infinitely many terms\", not \"avoid one specific point\".",
      "Key question to hold in mind: why does BOUNDEDNESS alone (without any monotonicity assumption) suffice to guarantee a convergent subsequence exists?",
      "Practical goal: be able to use the Sequential Test for Divergence as a quick, computation-light way to show a sequence diverges, rather than always going back to the ε-N definition.",
    ],
    learningPath: [
      "Recall: state that subsequences of convergent sequences share the same limit, and state the Bolzano-Weierstrass Theorem precisely (bounded ⟹ has a convergent subsequence).",
      "Practise: for ((−1)ⁿ⁻¹(1−1/n)), identify two subsequences converging to different limits (1 and −1) and conclude divergence via the Sequential Test.",
      "Connect: reproduce the bisection construction step by step — at each stage, why must AT LEAST ONE half contain infinitely many terms of the original sequence?",
      "Extend / reproduce in R: for a bounded but oscillating numerical sequence, extract a convergent subsequence by repeated bisection and confirm numerically that it converges while the full sequence does not.",
    ],
    applications: [
      "Optimisation: Bolzano-Weierstrass underlies why bounded iterate sequences in many optimisation algorithms have at least a convergent subsequence, even when full convergence of the whole sequence is hard to establish directly.",
      "This course itself: Bolzano-Weierstrass is the key lemma behind the Cauchy Criterion (next concept card) and behind compactness (Chapter 3) — one of the most-reused results in the whole course.",
    ],
    examples: [
      "((−1)ⁿ⁻¹(1−1/n)) has subsequence (1−1/(2k−1)) → 1 and subsequence (−(1−1/2k)) → −1 — two different subsequential limits, so by the Sequential Test the original sequence diverges.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for sequences and limits",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-cauchy-sequences",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.7: Cauchy sequences",
    title: "Cauchy sequences & the Cauchy Criterion",
    tags: ["real-analysis", "limits", "proofs"],
    difficulty: "core",
    summary:
      "A Cauchy sequence is one whose terms eventually get close to EACH OTHER, not to some pre-specified limit — a definition that doesn't need to know the limit's value in advance. Every convergent sequence is Cauchy (easy direction), but the deep fact special to ℝ is the converse: every Cauchy sequence in ℝ converges — proved by combining boundedness, Bolzano-Weierstrass (to extract a convergent subsequence), and a squeeze argument to show the WHOLE sequence converges to that subsequence's limit. This equivalence genuinely fails in ℚ (a sequence of rationals converging to √2 is Cauchy in ℚ but has no rational limit) — so the Cauchy Criterion is, at its core, another face of completeness.",
    subConcepts: [
      { title: "Cauchy sequence", gloss: "(aₙ) is Cauchy if for every ε>0 there's N such that |aₙ−aₘ|<ε for all n,m≥N — terms cluster together, without reference to any specific limit value." },
      { title: "Every Cauchy sequence is bounded", gloss: "Same proof strategy as \"convergent ⟹ bounded\": fix ε=1, bound the finite exceptional terms plus the eventually-clustered tail." },
      { title: "Convergent ⟹ Cauchy", gloss: "If aₙ→a, the triangle inequality |aₙ−aₘ|≤|aₙ−a|+|a−aₘ| immediately gives the Cauchy property — always true, in any space." },
      { title: "The Cauchy Criterion (the converse, special to ℝ)", gloss: "In ℝ: a sequence converges IF AND ONLY IF it's Cauchy — proved via boundedness + Bolzano-Weierstrass (get a convergent subsequence) + the Cauchy property itself (push the whole sequence to that same limit)." },
      { title: "This fails in ℚ", gloss: "A sequence of rationals converging (in ℝ) to √2 is Cauchy as a sequence of rationals, yet has no limit within ℚ — the Cauchy Criterion is essentially the Completeness Axiom restated in sequence language." },
      { title: "The Cauchy Criterion for Series", gloss: "∑aₙ converges iff its tail sums aₙ₊₁+...+aₘ can be made arbitrarily small for all m>n≥N — the series analogue, since series convergence is partial-sum-sequence convergence." },
    ],
    preLecture: [
      "Be solid on Bolzano-Weierstrass (previous concept card) — the hard direction of the Cauchy Criterion's proof (Cauchy ⟹ convergent) leans on it directly.",
      "Recall that the Completeness Axiom itself has multiple equivalent faces (least upper bounds, Nested Interval Property, now Cauchy sequences) — this deck adds one more entry to that list.",
      "Key question to hold in mind: why is being Cauchy a genuinely USEFUL notion — what practical problem does it solve that \"knowing the limit and checking against it\" doesn't?",
      "Practical goal: be able to state which direction of the Cauchy Criterion (convergent⟹Cauchy vs. Cauchy⟹convergent) is the \"easy\" one and which needs Bolzano-Weierstrass.",
    ],
    learningPath: [
      "Recall: state the definition of a Cauchy sequence and the Cauchy Criterion, and identify which direction is trivial (via the triangle inequality) and which needs real machinery.",
      "Practise: reproduce the proof that a Cauchy sequence converges — extract a convergent subsequence via Bolzano-Weierstrass, then show the FULL sequence converges to that same limit using the Cauchy property plus the triangle inequality.",
      "Connect: explain concretely why a sequence of rationals approximating √2 is Cauchy in ℚ but not convergent in ℚ — tying the Cauchy Criterion back to why ℝ needed to be built in the first place.",
      "Extend: state and prove (or sketch) the Cauchy Criterion for Series as a direct corollary of the sequence version applied to partial sums.",
    ],
    applications: [
      "Numerical computing: convergence tests in iterative numerical algorithms are frequently implemented as Cauchy-style stopping criteria (\"stop when consecutive iterates are close to each other\"), precisely because the true limit is unknown in advance.",
      "This concept generalises directly to \"complete metric spaces\" in more advanced analysis/functional analysis — Banach and Hilbert spaces (central to ML theory) are defined as normed spaces where every Cauchy sequence converges.",
    ],
    examples: [
      "A sequence of rationals like 1, 1.4, 1.41, 1.414, ... (truncated decimal approximations of √2) is Cauchy — consecutive terms get arbitrarily close — but has no limit within ℚ, only within ℝ.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — real analysis / sequences series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-absolute-conditional-convergence",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.8: Absolute and conditional convergence of series",
    title: "Absolute/conditional convergence & the Alternating Series Test",
    tags: ["real-analysis", "series"],
    difficulty: "core",
    summary:
      "A series converges absolutely if ∑|aₙ| converges (a strong, robust kind of convergence, provable via the Cauchy Criterion); it converges only conditionally if ∑aₙ converges but ∑|aₙ| does not (a fragile kind of convergence, as the next concept card on rearrangements reveals). The Alternating Series Test (Leibniz Test) gives a clean sufficient condition for series with alternating signs and decreasing magnitudes: they converge, and — usefully — the error from stopping at any partial sum is bounded by the very next term, giving a built-in error estimate for approximation.",
    subConcepts: [
      { title: "Absolute convergence ⟹ convergence", gloss: "If ∑|aₙ| converges, then ∑aₙ converges — proved via the Cauchy Criterion for Series and the triangle inequality (|aₙ₊₁+...+aₘ|≤|aₙ₊₁|+...+|aₘ|)." },
      { title: "Absolute vs. conditional convergence", gloss: "Absolutely convergent: ∑|aₙ| converges (e.g. ∑(−1)ⁿ⁻¹/n² — its absolute series is the convergent p-series with p=2). Conditionally convergent: ∑aₙ converges but ∑|aₙ| diverges (e.g. the alternating harmonic series ∑(−1)ⁿ⁻¹/n)." },
      { title: "Alternating series", gloss: "∑(−1)ⁿaₙ with aₙ≥0 — signs strictly alternate." },
      { title: "The Alternating Series Test (Leibniz Test)", gloss: "If a₀≥a₁≥a₂≥...≥0 and aₙ→0, then ∑(−1)ⁿaₙ converges — proved by showing the even partial sums decrease, odd partial sums increase, and both squeeze to the same limit." },
      { title: "Error bound from the Alternating Series Test", gloss: "|s−sₘ|≤aₘ₊₁ — the error from truncating at the m-th partial sum is bounded by the very next (unused) term, giving a concrete, checkable approximation guarantee." },
      { title: "Both hypotheses (monotone AND →0) are needed", gloss: "A counterexample with aₙ→0 but NOT monotone decreasing (mixing a 4/n² pattern on even terms with a 2/(n+1) pattern on odd terms) diverges despite terms tending to 0 — monotonicity genuinely can't be dropped." },
    ],
    preLecture: [
      "Be solid on the Cauchy Criterion for Series and the Comparison/p-series tests (previous concept cards) — absolute convergence's proof leans on the Cauchy Criterion directly.",
      "Recall the harmonic series' divergence and the p-series criterion — needed to classify ∑(−1)ⁿ⁻¹/n as conditionally convergent and ∑(−1)ⁿ⁻¹/n² as absolutely convergent.",
      "Key question to hold in mind: why does \"absolute convergence\" deserve to be called a STRONGER form of convergence than plain convergence — what extra guarantee does it buy you (previewed properly in the next concept card on rearrangements)?",
      "Practical goal: given a specific alternating series, be able to quickly check both Leibniz-Test hypotheses (decreasing, →0) before invoking the test.",
    ],
    learningPath: [
      "Recall: state the definitions of absolute and conditional convergence, and state the Alternating Series Test with its error bound.",
      "Practise: classify ∑(−1)ⁿ⁻¹/n² (absolute) and ∑(−1)ⁿ⁻¹/n (conditional) using the p-series test on the absolute-value series, then reproduce the Alternating Series Test's even/odd-subsequence proof for the alternating harmonic series.",
      "Connect: use the error bound |s−sₘ|≤aₘ₊₁ to determine how many terms of the alternating harmonic series are needed to approximate ln 2 to within 0.001 (following the notes' worked calculation, m=1000).",
      "Extend: work through the counterexample where aₙ→0 but isn't monotone (mixing 4/n² and 2/(n+1) patterns) and confirm its even partial sums genuinely diverge, to see why monotonicity is load-bearing.",
    ],
    applications: [
      "Numerical computing: the Alternating Series error bound gives a cheap, rigorous stopping criterion for truncating a series approximation (e.g. approximating ln 2 or π/4 via known alternating series) to a guaranteed precision.",
      "Signal processing / Fourier analysis: conditionally convergent trigonometric series appear often, and knowing whether a series is absolutely or only conditionally convergent affects whether its terms can be safely reordered or regrouped (see the next concept card).",
    ],
    examples: [
      "∑(−1)ⁿ⁻¹/n = ln 2 (provable via Taylor series later in the course); truncating at m=1000 terms guarantees error ≤ 1/1001 < 0.001, per the Alternating Series Test's error bound.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — series convergence tests",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-ratio-root-tests",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.9: The ratio and the root tests",
    title: "The Ratio Test & the Root Test",
    tags: ["real-analysis", "series"],
    difficulty: "core",
    summary:
      "Both tests work by comparing a series, in the limit, against a geometric series: the Ratio Test looks at how much each term shrinks relative to the last (|aₙ₊₁/aₙ|→L), the Root Test looks at the n-th root of the term's size (|aₙ|^(1/n)→L). Both give the same clean trichotomy — L<1 means absolute convergence, L>1 means divergence, L=1 means the test simply can't tell (the harmonic series, alternating harmonic series, and ∑1/n² all give L=1 despite having three different convergence behaviours) — so a failed L=1 case always needs a different tool, not a retry.",
    subConcepts: [
      { title: "The Ratio Test", gloss: "L=lim|aₙ₊₁/aₙ|: L<1 ⟹ ∑aₙ converges absolutely (compare against a geometric series with ratio r, L<r<1); L>1 ⟹ terms don't →0, so ∑aₙ diverges; L=1 ⟹ inconclusive." },
      { title: "The Root Test", gloss: "L=lim|aₙ|^(1/n): same trichotomy as the Ratio Test, proved similarly by comparison to a geometric series (|aₙ|<rⁿ eventually, when L<r<1)." },
      { title: "Why L=1 is genuinely inconclusive", gloss: "The harmonic series (diverges), alternating harmonic series (converges conditionally), and ∑1/n² (converges absolutely) all give L=1 under both tests — proof that L=1 carries zero information about convergence either way." },
      { title: "Practical use: factorial and exponential terms", gloss: "The Ratio Test is especially effective on terms involving n! or cⁿ, since consecutive-term ratios collapse nicely (e.g. 2ⁿ/n! gives ratio 2/(n+1)→0)." },
    ],
    preLecture: [
      "Be solid on the geometric series and the Comparison Test (earlier concept cards) — both tests are, underneath, comparison-with-a-geometric-series arguments in disguise.",
      "Recall which specific series gave L=1 under the p-series/harmonic-series analysis (previous concept card) — they're the canonical examples proving the L=1 case is a genuine dead end, not just an unlucky pick.",
      "Key question to hold in mind: since both tests reduce to comparison with SOME geometric series, why bother having two tests rather than just one?",
      "Practical goal: recognise quickly which kind of term (factorial-heavy vs. n-th-power-heavy) each test is naturally suited to.",
    ],
    learningPath: [
      "Recall: state both the Ratio Test and Root Test trichotomies, and name three series that give L=1 with three different actual convergence behaviours.",
      "Practise: apply the Ratio Test to ∑2ⁿ/n! (converges, L=0) and to ∑n(n+1)/(1+2ⁿ) (converges, L=½), following the notes' worked computations.",
      "Connect: apply the Root Test to ∑2^(3n+4)/nⁿ by rewriting the term as 16(8/n)ⁿ first, then taking the n-th root — connect this simplification technique to why the Root Test suits n-th-power-shaped terms.",
      "Extend / reproduce in R: numerically compute the ratio |aₙ₊₁/aₙ| for increasing n on a series where the Ratio Test is inconclusive (like ∑1/n) and observe the ratio creeping toward 1 without ever definitively resolving convergence.",
    ],
    applications: [
      "Power series (a later concept card): the Ratio and Root Tests are exactly how a power series' radius of convergence is computed — this is their single most important downstream application in this course.",
      "Probability/combinatorics: series involving n! or exponential growth (e.g. Poisson-distribution-style sums) are routinely checked for convergence via the Ratio Test.",
    ],
    examples: [
      "∑2ⁿ/n!: aₙ₊₁/aₙ = 2/(n+1) → 0 < 1, so the series converges (absolutely, since all terms are positive) by the Ratio Test.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — series convergence tests",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "ra-rearrangements",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 2.10: Rearrangements",
    title: "Rearrangements & the Riemann Rearrangement Theorem",
    tags: ["real-analysis", "series", "proofs"],
    difficulty: "stretch",
    summary:
      "A rearrangement of a series reorders its terms via a bijection ℕ→ℕ — and for ABSOLUTELY convergent series, this changes nothing: every rearrangement converges to the exact same sum. But for CONDITIONALLY convergent series, the Riemann Rearrangement Theorem delivers a genuinely startling result: for any real number x you like, some rearrangement of the series sums to exactly x — because the positive and negative terms each diverge to infinity separately, letting you dial the running total to any target by strategically choosing when to add positives versus negatives.",
    subConcepts: [
      { title: "Rearrangement", gloss: "∑bₙ is a rearrangement of ∑aₙ if bf(n)=aₙ for some bijection f:ℕ→ℕ — same terms, same infinite multiset, different order." },
      { title: "Absolutely convergent series: order never matters", gloss: "Every rearrangement of an absolutely convergent series converges to the SAME sum — proved by choosing N large enough that both the tail (∑|aₙ| small beyond N) and the rearrangement (which eventually includes all of a₁,...,a_N) agree to within any ε." },
      { title: "The Riemann Rearrangement Theorem", gloss: "If ∑aₙ converges only conditionally, then for ANY x∈ℝ, some rearrangement of ∑aₙ converges to x — a genuinely surprising failure of \"order doesn't matter\" for conditionally convergent series." },
      { title: "Why this is possible: positive/negative parts both diverge", gloss: "For a conditionally convergent series, the series of just its positive terms and the series of just the absolute values of its negative terms BOTH diverge to +∞ — so you can always add enough of one sign to overshoot any target, then enough of the other to undershoot it, repeating forever." },
      { title: "The construction in practice", gloss: "To hit a target x with the alternating harmonic series: add positive terms until you exceed x, then add negative terms until you drop below x, repeating indefinitely — since the terms →0, the oscillation around x shrinks to 0." },
    ],
    preLecture: [
      "Be solid on absolute vs. conditional convergence (previous concept card) — this whole topic is about exactly what changes between the two.",
      "Recall that the harmonic series diverges (Chapter 2.4) — needed to see why the positive-terms-only and negative-terms-only sub-series of the alternating harmonic series both diverge to infinity.",
      "Key question to hold in mind: intuitively, why should merely CHANGING THE ORDER of the same infinite list of numbers ever change what they add up to?",
      "This is flagged as one of the most counterintuitive results in the course — budget extra time, and don't just memorise the statement without working through the alternating-harmonic-series construction by hand.",
    ],
    learningPath: [
      "Recall: state the Riemann Rearrangement Theorem precisely, including the exact condition (conditional, not absolute, convergence) that makes it apply.",
      "Practise: reproduce the proof that rearranging an ABSOLUTELY convergent series doesn't change its sum, tracking exactly where the tail-smallness property (from the Cauchy Criterion for Series) is used.",
      "Connect: work through the notes' worked construction rearranging the alternating harmonic series to sum to x=1.1 — add positive terms until exceeding 1.1, subtract negative terms until below 1.1, repeat.",
      "Extend / reproduce in R: numerically implement the greedy \"add positives until above target, then negatives until below\" rearrangement algorithm on the alternating harmonic series and confirm the partial sums do converge to your chosen target.",
    ],
    applications: [
      "Numerical computing: floating-point summation of a long list of conditionally-convergent-flavoured values is genuinely order-dependent in practice — this theorem is the rigorous reason why summation ORDER can matter for numerical accuracy, not just an artifact of rounding.",
      "This result is a standard cautionary tale in any field (physics, engineering) that manipulates infinite or very long sums somewhat informally — it's the formal reason \"just reorder the terms\" is only safe once absolute convergence has been checked.",
    ],
    examples: [
      "The alternating harmonic series ∑(−1)ⁿ⁻¹/n = ln 2 ≈ 0.693, but a specific rearrangement (add 1+1/3=1.333>1.1, subtract ½ to get 0.833<1.1, add 1/5+1/7 to exceed 1.1 again, etc.) converges instead to exactly 1.1.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for series and infinite sums",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: assuming any convergent series can be safely reordered or regrouped (e.g. when manipulating a sum algebraically) — this is only safe for ABSOLUTELY convergent series; check that first.",
      "Sanity check: before trusting a rearrangement argument, verify ∑|aₙ| actually converges — if it doesn't, the rearranged sum could legitimately be anything (including diverging to +∞ or −∞, or oscillating forever).",
      "Mnemonic: \"conditional = order matters\" — conditional convergence is precisely the situation where the positive and negative parts are each individually infinite, which is exactly the fuel the Riemann Rearrangement construction needs.",
    ],
  },
  {
    id: "ra-topology-of-r",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 3: The topology of ℝ",
    title: "Open, closed & compact sets in ℝ",
    tags: ["real-analysis", "topology", "proofs"],
    difficulty: "core",
    summary:
      "Open sets are those where every point has some entire ε-neighbourhood still inside the set — closed sets are their complements, equivalently the sets that contain all their own limit points. A set's closure adds in exactly the limit points it's missing, giving the smallest closed set containing it. Compactness — the single most useful topological property in this course — turns out to be exactly \"closed AND bounded\": compact sets are precisely the ones where every sequence has a subsequence converging to a point still inside the set, which is what powers the Extreme Value Theorem and uniform continuity later on.",
    subConcepts: [
      { title: "ε-neighbourhood & open sets", gloss: "Vε(x)=(x−ε,x+ε); G is open if every x∈G has SOME ε>0 with Vε(x)⊆G. Open sets are closed under arbitrary unions and FINITE intersections (infinite intersections can fail: ⋂(−1/k,1+1/k)=[0,1], not open)." },
      { title: "Limit points & the derived set", gloss: "x is a limit point of A if every ε-neighbourhood of x contains a point of A other than x itself — equivalently, some sequence in A\\{x} converges to x. A′ is the set of all A's limit points." },
      { title: "Isolated points", gloss: "x∈A that is NOT a limit point of A — every point of A is either a limit point or an isolated point (never both)." },
      { title: "Closed sets", gloss: "F is closed if F′⊆F (contains all its limit points) — equivalently, every convergent sequence IN F has its limit IN F too. A set can be neither open nor closed (e.g. (0,1]), or both (∅ and ℝ)." },
      { title: "Open ⟺ complement is closed", gloss: "A is open iff ℝ\\A is closed — the two notions are complementary, and closed sets are closed under arbitrary intersections and FINITE unions (the De Morgan dual of the open-set rules)." },
      { title: "Closure", gloss: "Ā=A∪A′ is always closed, and is the SMALLEST closed set containing A — a genuinely useful \"minimal completion\" construction." },
      { title: "Compact sets", gloss: "K is compact if every sequence in K has a subsequence converging to a point IN K. The Heine–Borel-flavoured theorem: K⊆ℝ is compact iff K is closed AND bounded — proved using Bolzano-Weierstrass (bounded gives a convergent subsequence) plus closedness (keeping the limit inside K)." },
    ],
    preLecture: [
      "Be solid on limits of sequences and the Bolzano-Weierstrass Theorem (earlier concept cards) — both closedness and compactness are defined and proved directly in terms of sequences.",
      "Recall sup/inf and the Completeness Axiom — Proposition 3.21 (sup A and inf A always lie in the CLOSURE of A) reuses the ε-characterisation of sup directly.",
      "Key question to hold in mind: why does the intersection rule for open sets work for FINITE collections but fail for infinite ones (the (−1/k,1+1/k) example) — what breaks specifically as k→∞?",
      "Practical goal: get fluent converting between the \"every point has a wiggle-room neighbourhood\" (open) and \"contains all its own limit points\" (closed) descriptions, since both keep appearing in different proofs.",
    ],
    learningPath: [
      "Recall: state the definitions of open, closed, limit point, closure, and compact, and state the closed-iff-closed-and-bounded compactness theorem.",
      "Practise: classify each of (a,b), [a,b], (0,1]∪{2}, ℕ, and {1/n:n∈ℕ} as open/closed/neither, and identify each set's limit points and isolated points, following the notes' worked examples.",
      "Connect: reproduce the proof that K⊆ℝ compact ⟺ closed and bounded, identifying exactly where Bolzano-Weierstrass is invoked (bounded direction) and where closedness is invoked (limit stays inside K).",
      "Extend / reproduce in R: numerically verify that a sequence in a NON-closed set like (0,1) can have all its terms in the set yet converge to a limit (0) that's NOT in the set — confirming why (0,1) fails to be compact.",
    ],
    applications: [
      "Optimisation: the Extreme Value Theorem (next concept card) — that a continuous function attains a max and min on a compact set — is the mathematical reason optimisation problems over a closed, bounded feasible region always have a solution.",
      "ML/quant: compactness assumptions on parameter spaces or feasible regions are a standing requirement in many convergence proofs for optimisation and estimation procedures, precisely to guarantee optimal points exist and can be approached by convergent sequences.",
    ],
    examples: [
      "[a,b] is compact (closed and bounded), so by Bolzano-Weierstrass + closedness, every sequence inside it has a subsequence converging to a point still inside [a,b] — this is exactly why closed bounded intervals are the \"safe\" setting for later theorems like the Extreme Value Theorem.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for topology on the real line",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-limits-functions-continuity",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 4.1–4.2: Limits of functions & continuity",
    title: "Limits of functions & continuity",
    tags: ["real-analysis", "continuity", "limits"],
    difficulty: "core",
    summary:
      "The ε-δ definition of a functional limit — f(x)→L as x→a means f(x) can be forced arbitrarily close to L by keeping x close enough to (but not equal to) a — mirrors the ε-N definition for sequences exactly, and the Sequential Criterion makes the connection precise: f(x)→L as x→a iff f(xₙ)→L for EVERY sequence xₙ→a. Continuity is the special case where a is actually in the domain and the limit equals f(a) there. The big payoff results — the Extreme Value Theorem (continuous functions attain their max/min on compact sets) and the Intermediate Value Theorem (continuous functions hit every value between f(a) and f(b)) — both trace directly back to compactness and completeness.",
    subConcepts: [
      { title: "ε-δ definition of a functional limit", gloss: "lim_{x→a} f(x)=L means: for every ε>0 there's δ>0 such that 0<|x−a|<δ ⟹ |f(x)−L|<ε — the \"0<\" excludes x=a itself, so f need not even be defined at a." },
      { title: "One-sided limits", gloss: "Restricting the domain to x<a or x>a gives left-hand and right-hand limits (e.g. x/|x| has right-limit 1 and left-limit −1 at x=0, so the two-sided limit doesn't exist there)." },
      { title: "The Sequential Criterion for functional limits", gloss: "lim_{x→a} f(x)=L iff for EVERY sequence (xₙ) in the domain minus {a} with xₙ→a, f(xₙ)→L — bridges functional limits back to sequence limits, letting you reuse all earlier sequence machinery." },
      { title: "The Sequential Test for Divergence", gloss: "Exhibit one sequence xₙ→a with f(xₙ) divergent, or two sequences xₙ,yₙ→a with f(xₙ)→different limits than f(yₙ), to prove a functional limit doesn't exist — e.g. sin(1/x) has no limit at x=0 via xₙ=1/(2πn) and yₙ=1/(2πn+π/2)." },
      { title: "Continuity at a point", gloss: "f is continuous at a∈domain if for every ε>0 there's δ>0 with |x−a|<δ ⟹ |f(x)−f(a)|<ε; equivalently, if a is a limit point of the domain, this is exactly lim_{x→a}f(x)=f(a). Isolated points are automatically points of continuity." },
      { title: "Composition of continuous functions", gloss: "If f is continuous at a and g is continuous at f(a), then g∘f is continuous at a — proved by chaining two ε-δ arguments." },
      { title: "The Extreme Value Theorem", gloss: "A continuous function on a compact set K attains both its maximum and minimum values on K — proved via continuous images of compact sets being compact, then applying Proposition 3.21 (sup/inf of the image lie in its closure, hence in the image itself)." },
      { title: "The Intermediate Value Theorem", gloss: "A continuous function on [a,b] hits every value y strictly between f(a) and f(b) — proved via the Completeness Axiom (take the supremum of {x:f(x)≤y}) and continuity forcing f of that supremum to equal y exactly." },
    ],
    preLecture: [
      "Be solid on the ε-N definition of sequence limits and the Sequential Criterion mindset (earlier concept cards) — the ε-δ definition here is the direct functional analogue.",
      "Recall compact sets = closed + bounded (previous concept card) — both the Extreme Value Theorem and the fact that continuous images of compact sets are compact depend on this directly.",
      "Key question to hold in mind: why does the definition of a functional limit specifically exclude x=a (the \"0<|x−a|\" condition) — what would break if it didn't?",
      "Practical goal: be able to use the Sequential Test for Divergence (two sequences, two different limits) as a fast way to disprove a functional limit exists, rather than fighting the ε-δ definition directly.",
    ],
    learningPath: [
      "Recall: state the ε-δ definition of a functional limit, the Sequential Criterion, and the Extreme Value and Intermediate Value Theorems.",
      "Practise: reproduce the ε-δ proof that lim_{x→2}(x²+3)=7, following the notes' worked example (bound |x−2|<1 first, then bound |x+2|, then choose δ=min{1,ε/5}).",
      "Connect: use the Sequential Test for Divergence to show lim_{x→0} sin(1/x) doesn't exist, using xₙ=1/(2πn) (giving 0) and yₙ=1/(2πn+π/2) (giving 1).",
      "Extend: reproduce the Intermediate Value Theorem's proof sketch — define A={x∈[a,b]:f(x)≤y}, take c=sup A via the Completeness Axiom, and show continuity forces f(c)=y exactly (squeezing from both sides).",
    ],
    applications: [
      "Optimisation/ML: the Extreme Value Theorem is the formal guarantee that a continuous loss function on a closed, bounded parameter region actually HAS a minimiser to search for — the starting assumption behind most optimisation algorithms.",
      "Numerical root-finding: the Intermediate Value Theorem is exactly why the bisection method for finding roots is guaranteed to work — if f(a) and f(b) have opposite signs, IVT guarantees a root exists between them.",
      "Quant finance: continuity/IVT-style arguments justify that a continuously-varying pricing function (e.g. as a function of an implied volatility parameter) must hit every price between two computed bounds, underlying implied-volatility solvers.",
    ],
    examples: [
      "f(x)=1/(1+x²) is continuous on ℝ, and f(ℝ)=(0,1] — showing a continuous function's image of a CLOSED but unbounded set (ℝ) need not be closed, illustrating why the Extreme Value Theorem specifically needs a COMPACT domain, not just a closed one.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-uniform-continuity",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 4.3: Uniform Continuity",
    title: "Uniform continuity",
    tags: ["real-analysis", "continuity"],
    difficulty: "stretch",
    summary:
      "Ordinary continuity lets the \"how close is close enough\" number δ depend on BOTH the target error ε and the specific point a you're standing at. Uniform continuity demands one δ that works everywhere on the set at once, for a given ε — a strictly stronger requirement. f(x)=x² is continuous everywhere on ℝ but famously NOT uniformly continuous there (the graph keeps getting steeper, so no single δ works for all points) — yet the same function restricted to a bounded interval IS uniformly continuous. This isn't a coincidence: continuity on a compact set always upgrades to uniform continuity, a theorem proved by combining Bolzano-Weierstrass with a contradiction argument.",
    subConcepts: [
      { title: "Uniform continuity", gloss: "f is uniformly continuous on A if for every ε>0 there's a SINGLE δ>0 (not depending on which point) such that |x−y|<δ ⟹ |f(x)−f(y)|<ε for ALL x,y∈A." },
      { title: "Uniform continuity ⟹ continuity, not conversely", gloss: "Uniform continuity is strictly stronger; f(x)=x² is continuous on ℝ but not uniformly so — its graph's slope grows without bound, so a fixed δ that works near x=0 fails near large x." },
      { title: "Sequential test for failure of uniform continuity", gloss: "f is NOT uniformly continuous on A iff there's ε>0 and sequences xₙ,yₙ∈A with (xₙ−yₙ)→0 but |f(xₙ)−f(yₙ)|≥ε for all n — e.g. xₙ=√(n+1), yₙ=√n for f(x)=x², where xₙ−yₙ→0 but f(xₙ)−f(yₙ)=1 always." },
      { title: "Sums vs. products of uniformly continuous functions", gloss: "Sums of uniformly continuous functions stay uniformly continuous; PRODUCTS need not — g(x)=x is uniformly continuous on ℝ, yet f(x)=x²=g(x)·g(x) is not." },
      { title: "Continuity on a compact set upgrades to uniform continuity", gloss: "If f is continuous on a compact K, then f is automatically uniformly continuous on K — proved by contradiction using the sequential failure test plus Bolzano-Weierstrass to extract a common convergent subsequence." },
    ],
    preLecture: [
      "Be solid on the ε-δ definition of continuity and compact sets (previous two concept cards) — uniform continuity is a small but crucial tightening of the first, and its main theorem needs the second.",
      "Recall the sequential-failure-test pattern from earlier divergence tests (functional limits, series) — uniform continuity's failure criterion follows the exact same template.",
      "Key question to hold in mind: precisely which quantifier moves where between the definitions of continuity and uniform continuity (\"∀a∃δ\" vs. \"∃δ∀a\") — and why does that reordering matter so much?",
      "This is flagged as more subtle than plain continuity — the x² example (continuous everywhere, uniformly continuous only on bounded pieces) is worth sitting with carefully before the lecture.",
    ],
    learningPath: [
      "Recall: state the definition of uniform continuity, explicitly contrasting the ORDER of quantifiers against ordinary continuity's definition.",
      "Practise: reproduce the proof that f(x)=x² is NOT uniformly continuous on ℝ using xₙ=√(n+1), yₙ=√n, confirming (xₙ−yₙ)→0 while f(xₙ)−f(yₙ)=1 always.",
      "Connect: reproduce (or closely follow) the proof that continuity on a compact set implies uniform continuity, identifying exactly where Bolzano-Weierstrass is invoked to get a common convergent subsequence for both xₙ and yₙ.",
      "Extend / reproduce in R: numerically compare the δ needed for a fixed ε at x=1 versus x=100 for f(x)=x² to see concretely how the required δ shrinks as x grows, confirming no single δ can work everywhere.",
    ],
    applications: [
      "Numerical analysis: uniform continuity is exactly the property needed to guarantee a numerical approximation scheme (e.g. a fixed step-size discretisation) has uniformly bounded error across an entire domain, not just near one point.",
      "This course itself: uniform continuity is the key hypothesis needed later for Riemann integrability results (a continuous function on a compact interval is automatically integrable, precisely because it's automatically uniformly continuous there).",
    ],
    examples: [
      "f(x)=2x+3 is uniformly continuous on ℝ (δ=ε/2 works for every point simultaneously, since |f(x)−f(a)|=2|x−a| regardless of a) — contrast with f(x)=x², where the same δ cannot work for both small and large x.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "Socratica (YouTube channel) — real analysis continuity concepts",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
    tips: [
      "Common pitfall: treating \"continuous on ℝ\" and \"uniformly continuous on ℝ\" as interchangeable — they're not; always check whether the domain is compact (closed+bounded) before assuming continuity upgrades automatically.",
      "Sanity check: to test for uniform continuity failure, look for a family of point-pairs that get closer together (xₙ−yₙ→0) while the function's outputs stay apart by a fixed gap — that pattern is the signature of a steepening (or otherwise badly-behaved) graph.",
      "Mnemonic: \"one δ to rule them all\" — uniform continuity means a single δ has to serve every point in the domain simultaneously, not just the one you're currently standing at.",
    ],
  },
  {
    id: "ra-derivatives-mvt",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 5: Derivatives",
    title: "Derivatives, Fermat's Theorem & the Mean Value Theorem family",
    tags: ["real-analysis", "derivatives", "proofs"],
    difficulty: "core",
    summary:
      "The derivative f′(x₀)=lim_{x→x₀}(f(x)−f(x₀))/(x−x₀) formalises \"instantaneous rate of change\", and differentiability is strictly stronger than continuity (f(x)=|x| is continuous but not differentiable at 0). Fermat's Theorem says local extrema of a differentiable function force f′=0 there — the seed for Rolle's Theorem (f(a)=f(b) forces some f′(c)=0 in between) and its generalisation, the Mean Value Theorem (some tangent line is parallel to the secant line). The Generalized MVT (comparing two functions' rates simultaneously) is the engine behind l'Hôpital's Rule for evaluating 0/0-type limits.",
    subConcepts: [
      { title: "Differentiability & the derivative", gloss: "f′(x₀)=lim_{x→x₀}(f(x)−f(x₀))/(x−x₀), when the limit exists; f is differentiable on (a,b) if this holds at every point there." },
      { title: "Algebraic Differentiability Theorem", gloss: "Sum, scalar multiple, product, and quotient rules for derivatives — the functional-limit analogue of the Algebraic Limit Theorem for sequences." },
      { title: "Chain Rule", gloss: "(g∘f)′(x₀)=g′(f(x₀))·f′(x₀), provided f is differentiable at x₀ and g is differentiable at f(x₀)." },
      { title: "Differentiable ⟹ continuous, not conversely", gloss: "Differentiability at x₀ forces continuity there; f(x)=|x| is the standard counterexample — continuous everywhere, not differentiable at x=0." },
      { title: "Local maximum/minimum/extremum", gloss: "f has a local max at c if f(x)≤f(c) for all x within some δ of c (local min analogously); local extremum means either." },
      { title: "Fermat's Theorem", gloss: "If f is differentiable on (a,b) and has a local extremum at c∈(a,b), then f′(c)=0 — proved by showing f′(c)<0 or f′(c)>0 would each force f to be strictly monotone near c, contradicting the extremum. The converse is false: f(x)=x³ has f′(0)=0 but no extremum there." },
      { title: "Rolle's Theorem", gloss: "If f is continuous on [a,b], differentiable on (a,b), and f(a)=f(b), then f′(c)=0 for some c∈(a,b) — proved via the Extreme Value Theorem (f attains its max/min somewhere) plus Fermat's Theorem." },
      { title: "The Mean Value Theorem", gloss: "For f continuous on [a,b] and differentiable on (a,b), some c∈(a,b) has f′(c)=(f(b)−f(a))/(b−a) — the tangent at c is parallel to the secant through the endpoints; proved by applying Rolle's Theorem to f minus the secant line." },
      { title: "The Generalized Mean Value Theorem & l'Hôpital's Rule", gloss: "(f(b)−f(a))g′(c)=f′(c)(g(b)−g(a)) for some c — proved via Rolle's Theorem applied to a combined function; this is exactly the tool behind l'Hôpital's Rule for evaluating 0/0-type limits of g(x)/f(x)." },
    ],
    preLecture: [
      "Be solid on functional limits and continuity (previous concept cards) — the derivative is defined as a functional limit, and differentiability is proved to imply continuity via that same limit machinery.",
      "Recall the Extreme Value Theorem (compactness card) — Rolle's Theorem's proof invokes it directly to guarantee f attains a max or min somewhere on [a,b].",
      "Key question to hold in mind: why does Fermat's Theorem have NO converse (f′(c)=0 doesn't imply an extremum, as x³ at 0 shows) — what extra information would be needed to go the other way?",
      "Practical goal: be able to state clearly which of Fermat's/Rolle's/MVT is a special case of which other one, since they form a genuine logical chain (Fermat ⟹ Rolle ⟹ MVT ⟹ Generalized MVT).",
    ],
    learningPath: [
      "Recall: state the definition of the derivative as a limit, and state Fermat's Theorem, Rolle's Theorem, the Mean Value Theorem, and the Generalized Mean Value Theorem in the correct logical order (each building on the last).",
      "Practise: reproduce Rolle's Theorem's proof (Extreme Value Theorem gives a max/min point; Fermat's Theorem forces the derivative to vanish there) and then the Mean Value Theorem's proof (apply Rolle's Theorem to f minus the secant line).",
      "Connect: work through how the Generalized Mean Value Theorem is used to prove l'Hôpital's Rule (0/0 case) — identify exactly where a point cₓ between x and c is produced and why cₓ→c as x→c.",
      "Extend / reproduce in R: numerically verify the Mean Value Theorem on a simple function (e.g. f(x)=x² on [0,2]) by finding the point c where f′(c) matches the secant slope, and confirm it satisfies f′(c)=(f(b)−f(a))/(b−a).",
    ],
    applications: [
      "Optimisation: Fermat's Theorem (f′=0 at interior extrema) is the entire justification for \"set the derivative to zero and solve\" as a method for finding critical points — used everywhere from calculus-based optimisation to ML gradient-based methods.",
      "Numerical methods: l'Hôpital's Rule (via the Generalized MVT) is a standard technique for evaluating indeterminate limits that arise when analysing the asymptotic behaviour of algorithms or statistical estimators.",
      "Quant finance: the Mean Value Theorem underlies first-order (\"Greeks\"-style) sensitivity approximations — the change in a pricing function over an interval is exactly captured by the derivative at SOME intermediate point, justifying linear approximation techniques.",
    ],
    examples: [
      "f(x)=x³ has f′(0)=0 (satisfying Fermat's Theorem's conclusion) yet x=0 is neither a local max nor a local min — the standard counterexample showing Fermat's Theorem's converse fails.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-sequences-series-of-functions",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 6.1–6.2: Pointwise/uniform convergence & series of functions",
    title: "Pointwise vs. uniform convergence of functions",
    tags: ["real-analysis", "series", "convergence"],
    difficulty: "core",
    summary:
      "A sequence of functions (fₙ) can converge pointwise — at each x separately, fₙ(x)→f(x) — without the limit function inheriting nice properties like continuity, as the classic xⁿ example shows (continuous functions on [0,1] converging pointwise to a DIScontinuous limit). Uniform convergence is the fix: it requires one N that works for every x at once (mirroring uniform continuity's \"one δ for every point\" upgrade), and it's exactly strong enough to guarantee the limit of continuous functions IS continuous. The Weierstrass M-Test packages this into a practical checklist for series of functions: bound each |fₖ(x)|≤Mₖ, and if ∑Mₖ converges, the function series converges absolutely and uniformly for free.",
    subConcepts: [
      { title: "Pointwise convergence", gloss: "fₙ→f pointwise on A if fₙ(x)→f(x) for each individual x∈A — the N in the ε-N argument is allowed to depend on x." },
      { title: "Uniform convergence", gloss: "fₙ→f uniformly on A if, for every ε>0, a SINGLE N works for all x∈A simultaneously — equivalently, supₓ|fₙ(x)−f(x)|→0." },
      { title: "Pointwise limits of continuous functions need not be continuous", gloss: "fₙ(x)=xⁿ on [−1,1]: each fₙ is continuous, but the pointwise limit is 0 on (−1,1) and 1 at x=1 — genuinely discontinuous, showing pointwise convergence alone isn't enough to preserve continuity." },
      { title: "Uniform convergence preserves continuity", gloss: "If (fₙ) are continuous and fₙ→f uniformly, then f is continuous — proved by a three-term triangle-inequality split (f(x) to fN(x) to fN(a) to f(a)), each piece controlled by uniform convergence and fN's own continuity." },
      { title: "The Cauchy Criterion for Uniform Convergence", gloss: "(fₙ) converges uniformly on A iff for every ε>0 there's N such that |fₙ(x)−fₘ(x)|<ε for all n,m≥N and ALL x∈A simultaneously — the function-sequence analogue of the numerical Cauchy Criterion." },
      { title: "The Differential Limit Theorem", gloss: "If fₙ→f pointwise and f′ₙ→g uniformly (both on [a,b]), then f is differentiable with f′=g — a genuinely delicate result: you can only interchange differentiation and limit-taking under the STRONGER (uniform) convergence hypothesis on the derivatives." },
      { title: "Series of functions & the Weierstrass M-Test", gloss: "If |fₖ(x)|≤Mₖ for all x∈A and ∑Mₖ converges, then ∑fₖ converges absolutely and uniformly on A — turns a numerical-series convergence check into a function-series convergence guarantee." },
    ],
    preLecture: [
      "Be solid on the Cauchy Criterion for sequences and uniform continuity (previous concept cards) — both this chapter's central definitions (uniform convergence, Cauchy Criterion for Uniform Convergence) directly mirror them.",
      "Recall the p-series and geometric-series convergence criteria — the Weierstrass M-Test's whole power comes from reducing a function-series question back to a NUMERICAL series question you already know how to answer.",
      "Key question to hold in mind: concretely, what goes wrong with the xⁿ example that makes the pointwise limit discontinuous, even though every fₙ in the sequence is perfectly continuous?",
      "Practical goal: be able to state precisely which quantifier changes between pointwise and uniform convergence (\"∀ε∀x∃N\" vs. \"∀ε∃N∀x\"), matching the same pattern as continuity vs. uniform continuity.",
    ],
    learningPath: [
      "Recall: state the definitions of pointwise and uniform convergence, explicitly contrasting where the \"for all x\" quantifier sits relative to \"there exists N\".",
      "Practise: work through the xⁿ example (pointwise limit discontinuous) and then the (1−xⁿ)/(1−x) example restricted to [−r,r] (uniformly convergent there, by an explicit ε-N bound using rⁿ/(1−r)→0), to see both a failure and a success case side by side.",
      "Connect: reproduce the proof that uniform convergence of continuous functions preserves continuity, tracking the three-term split |f(x)−f(a)|≤|f(x)−fN(x)|+|fN(x)−fN(a)|+|fN(a)−f(a)|.",
      "Extend / reproduce in R: numerically apply the Weierstrass M-Test to ∑sin(kx)/2ᵏ (bound by ∑1/2ᵏ, a convergent geometric series) and verify computationally that the partial sums converge uniformly across a range of x values.",
    ],
    applications: [
      "Fourier analysis / signal processing: Fourier series are series of (sine/cosine) functions, and the Weierstrass M-Test is the standard tool for establishing that a given Fourier series converges uniformly to a continuous signal.",
      "ML: understanding when a sequence of learned functions (e.g. neural network approximations across training iterations) converges uniformly versus only pointwise is directly relevant to guarantees about worst-case (not just average-case) approximation error.",
      "Numerical methods: the Differential Limit Theorem is the rigorous justification for term-by-term differentiation of a series-based numerical approximation, which is routinely done in practice but needs uniform convergence of the DERIVATIVES to be valid.",
    ],
    examples: [
      "fₙ(x)=x^(1/n) on [0,∞): pointwise limit is 0 at x=0 and 1 for all x>0 — each fₙ is continuous, but the discontinuous jump in the limit again shows pointwise convergence doesn't preserve continuity.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for series and function approximation",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
  },
  {
    id: "ra-power-series-taylor-series",
    courseCode: "MAM2014S",
    sourceRef: "MAM2014S — Ch 6.3–6.4: Power series & Taylor series",
    title: "Power series, the radius of convergence & Taylor series",
    tags: ["real-analysis", "series", "proofs"],
    difficulty: "hard",
    summary:
      "A power series ∑aₙ(x−x₀)ⁿ has a radius of convergence R: it converges absolutely (and uniformly on any smaller closed interval) for |x−x₀|<R, and diverges for |x−x₀|>R — computable directly from the coefficients via the Ratio or Root Test. Within that radius, the power series can be differentiated term-by-term, and its coefficients are forced to equal f⁽ⁿ⁾(x₀)/n! — meaning any function defined by a convergent power series IS its own Taylor series. But the converse is subtle and genuinely fails in general: a function can have derivatives of every order with a well-defined Taylor series that converges to the WRONG thing (or doesn't converge at all) — Taylor's Theorem with Lagrange's Form of the Remainder is the tool that lets you rigorously verify, case by case, whether a Taylor series actually reconstructs its function.",
    subConcepts: [
      { title: "Power series & domain of convergence", gloss: "∑aₙ(x−x₀)ⁿ; the domain of convergence is always an interval centred at x₀ — proved via a direct comparison-to-geometric-series argument once convergence at any one point away from x₀ is known." },
      { title: "Radius of convergence R", gloss: "R=sup{|x−x₀|: the series converges} (R=0, a finite positive value, or ∞); computable via 1/R=lim|aₙ₊₁/aₙ| (Ratio Test) or 1/R=lim|aₙ|^(1/n) (Root Test)." },
      { title: "Behaviour at and inside the radius", gloss: "Absolute + uniform convergence on any [x₀−r,x₀+r] with r<R (via the Weierstrass M-Test, comparing against a geometric series); convergence AT the endpoints x₀±R is not determined by R alone and must be checked case by case." },
      { title: "Term-by-term differentiation of power series", gloss: "A power series and its differentiated series ∑n·aₙ(x−x₀)ⁿ⁻¹ share the same radius of convergence, and (via the Differential Limit Theorem) f is differentiable on (x₀−R,x₀+R) with f′ given by the differentiated series." },
      { title: "Taylor series & the coefficient formula", gloss: "If f(x)=∑aₙ(x−x₀)ⁿ on (x₀−R,x₀+R), repeated term-by-term differentiation plus substituting x=x₀ forces aₙ=f⁽ⁿ⁾(x₀)/n! — so f must equal its own Taylor series wherever the original power series converges." },
      { title: "Taylor series don't always converge to their function", gloss: "g₀(x)=e^(−1/x²) (0 at x=0) has ALL derivatives equal to 0 at x=0, so its Taylor series there is identically 0 — yet g₀(x)≠0 for x≠0. A function's Taylor series can converge to something other than the function, or not converge at all." },
      { title: "Taylor's Theorem with Lagrange's Form of the Remainder", gloss: "f(x)=Tₙ(x)+Rₙ(x) where Rₙ(x)=f⁽ⁿ⁺¹⁾(cₓ)/(n+1)!·(x−x₀)ⁿ⁺¹ for some cₓ between x and x₀ — a precise formula for exactly how far the degree-n Taylor polynomial is from f, without needing all-orders differentiability." },
      { title: "Taylor's Inequality & convergence verification", gloss: "If |f⁽ⁿ⁺¹⁾(x)|≤M on [x₀−r,x₀+r], then |Rₙ(x)|≤Mrⁿ⁺¹/(n+1)! — lets you PROVE a Taylor series converges to f (by showing Rₙ(x)→0) and gives a concrete error bound for truncated approximations, as used to verify sin x equals its Maclaurin series everywhere." },
    ],
    preLecture: [
      "Be solid on the Ratio and Root Tests, the Weierstrass M-Test, and the Differential Limit Theorem (previous concept cards) — every major result here is built directly from these three tools.",
      "Recall the Mean Value Theorem / Generalized MVT (derivatives concept card) — Taylor's Theorem with Lagrange's Remainder is proved via essentially the same Rolle's-Theorem-on-a-constructed-function technique.",
      "Key question to hold in mind: why isn't it automatic that a function with derivatives of every order equals its own Taylor series — what extra ingredient (captured by the remainder term Rₙ) is missing in general?",
      "This is flagged as the most demanding topic in the course, combining nearly every earlier tool — budget significant extra time, and work through the e^(−1/x²) counterexample carefully rather than skimming it.",
    ],
    learningPath: [
      "Recall: state the definition of radius of convergence, both formulas for computing it (Ratio Test and Root Test versions), and Taylor's Theorem with Lagrange's Form of the Remainder.",
      "Practise: compute the radius of convergence for ∑n!xⁿ (R=0), ∑xⁿ (R=1), and ∑xⁿ/n (R=1, but with different endpoint behaviour), following the notes' three contrasting worked examples.",
      "Connect: work through why the coefficients aₙ=f⁽ⁿ⁾(x₀)/n! are FORCED once you assume f equals a convergent power series — repeatedly differentiate term-by-term and substitute x=x₀ at each order.",
      "Extend / reproduce in R: numerically verify Taylor's Inequality for sin x — compute the bound |Rₙ(1)|≤1/(n+1)! and confirm computationally how few terms (n=7, per the notes) are needed to approximate sin(1) to 4 decimal digits.",
    ],
    applications: [
      "Numerical computing: virtually every \"transcendental function evaluation\" in a computing library (sin, cos, exp, log) is, under the hood, a truncated Taylor/power series with an error bound exactly like Taylor's Inequality controlling the precision.",
      "Quant finance: Taylor expansions (e.g. Itô's Lemma in stochastic calculus, or Greeks-based option pricing approximations) are power-series-flavoured local approximations, and understanding radius-of-convergence-style breakdowns is relevant to when such approximations remain valid.",
      "ML: Taylor expansions of loss functions around a current parameter estimate underlie second-order optimisation methods (e.g. Newton's method), where the remainder term's size determines how trustworthy the local quadratic approximation is.",
    ],
    examples: [
      "sin x = ∑ₖ₌₀^∞ (−1)ᵏ/(2k+1)! · x^(2k+1) for ALL x∈ℝ: since every derivative of sin is ±sin or ±cos (hence bounded by 1), Taylor's Inequality gives |Rₙ(x)|≤|x|ⁿ⁺¹/(n+1)!→0 for every fixed x, rigorously confirming the Taylor series converges to sin x everywhere — not just formally matching derivatives at 0.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.100A Real Analysis",
        href: "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/",
      },
      {
        label: "3Blue1Brown (YouTube channel) — Essence of Calculus (Taylor series intuition)",
        href: "https://www.youtube.com/@3blue1brown",
      },
    ],
    tips: [
      "Common pitfall: assuming that because a function has derivatives of every order, its Taylor series automatically converges back to the function — this is false in general (the e^(−1/x²) example) and must be verified via the remainder term, not assumed.",
      "Sanity check: before trusting a Taylor series approximation, bound the (n+1)-th derivative on the relevant interval and check that Taylor's Inequality's bound genuinely tends to 0 as n→∞ — if you can't establish that, you haven't proven convergence to f, only written down a formal series.",
      "Mnemonic: \"the remainder tells the truth\" — Tₙ(x) is just a polynomial guess; Rₙ(x)=f(x)−Tₙ(x) is the actual gap, and everything about whether a Taylor series is trustworthy comes down to controlling that gap, not the polynomial itself.",
    ],
  },
];
