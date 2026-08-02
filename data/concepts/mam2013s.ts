import type { ConceptBriefing } from "../types";

// MAM2013S (2IA, Introductory Algebra) content transcribed from
// course-docs/MAM2013S/MAM2013S NOTES.pdf: Ch1 Integers, Ch2 Permutations,
// Ch3 Groups, Ch4 Lagrange's Theorem, Ch5 Factor groups, plus Appendix A
// (sets/maps/binary operations/equivalence relations, folded into the
// induction card's pre-lecture prerequisites rather than given its own card,
// since the notes themselves treat it as background review).
export const mam2013sConceptBriefings: ConceptBriefing[] = [
  {
    id: "mam-induction",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 1.1: Induction",
    week: 1,
    weekConfirmed: false,
    title: "Mathematical induction & the Well-Ordering Axiom",
    tags: ["proofs", "induction", "foundations"],
    difficulty: "core",
    summary:
      "Mathematical induction proves a statement pₙ holds for every natural number n by checking a base case and an inductive step (pₖ true ⟹ pₖ₊₁ true). Strong induction is a variant that lets the inductive step assume ALL of pₘ,...,pₖ are true, not just pₖ — useful exactly when the immediately-preceding case alone doesn't give enough to work with (e.g. proving every integer ≥2 is a product of primes). Underneath both sits the Well-Ordering Axiom (every nonempty subset of ℕ has a least element), and the three principles — induction, strong induction, well-ordering — are logically equivalent, each provable from either of the others.",
    subConcepts: [
      {
        title: "Principle of Mathematical Induction",
        gloss:
          "p1 true (basis step) and (pk true ⟹ pk+1 true, for k≥1, inductive step) together imply pn true for every n ≥ 1.",
      },
      {
        title: "General Principle of Mathematical Induction",
        gloss:
          "The same idea starting from any integer m rather than 1: pm true plus (pk true ⟹ pk+1 true for k≥m) implies pn true for all n ≥ m.",
      },
      {
        title: "Strong Induction",
        gloss:
          "pm true, and (if k≥m and ALL of pm,...,pk are true then pk+1 is true) together imply pn true for all n≥m — needed when pk alone doesn't suffice to prove pk+1 (e.g. k+1=ab needs the primality of both a and b, not just of k).",
      },
      {
        title: "Well-Ordering Axiom (Least Integer Principle)",
        gloss: "Every nonempty subset of ℕ has a smallest element.",
      },
      {
        title: "Equivalence of the three principles",
        gloss:
          "Well-Ordering Axiom ⟺ Principle of Mathematical Induction ⟺ Strong Induction — each is provable from the others (the notes prove all three implications).",
      },
    ],
    preLecture: [
      "Review sets, maps and binary operations (Appendix A of the notes) if these are unfamiliar — the course leans on this notation from the first lecture.",
      "Recall the pattern-spotting example: 1, 1+3=4, 1+3+5=9, ... suggesting the sum of the first n odd integers is n².",
      "Key question to hold in mind: when does the immediately-preceding case (pk) fail to give you enough to prove the next one (pk+1) — i.e. when do you actually need strong induction instead of ordinary induction?",
      "No prior group theory needed — this is the standalone logical toolkit the rest of the course is built on.",
    ],
    learningPath: [
      "Recall: state ordinary induction and strong induction side by side and identify exactly what differs in the inductive-step hypothesis.",
      "Practise: redo the 1+3+5+...+(2n−1)=n² proof and the \"every integer ≥2 is a product of primes\" strong-induction proof from memory.",
      "Connect: identify which of the two induction variants a given proof later in the course (e.g. Cycle Decomposition Theorem, Prime Factorisation Theorem) actually uses, and why.",
      "Extend: try proving the equivalence chain (well-ordering ⟹ induction ⟹ strong induction ⟹ well-ordering) without looking, to see how each principle unlocks the next.",
    ],
    applications: [
      "CS/algorithms: proving loop invariants and the correctness of recursive functions is literally induction — strong induction in particular underlies proofs about recursive algorithms that call themselves on multiple smaller subproblems.",
      "This course itself: the Prime Factorisation Theorem, the Division Algorithm, and the Cycle Decomposition Theorem (later chapters) are all proved using induction or strong induction — this topic is the toolkit, not an isolated result.",
      "Quant/finance: recursive pricing recursions (e.g. binomial option trees) are validated the same way — an inductive argument that a formula holds at each node given it holds one step earlier.",
    ],
    examples: [
      "1 + 3 + 5 + ... + (2n−1) = n² — base case 1=1² holds; assuming it for k, adding the next odd number (2k+1) gives k²+2k+1=(k+1)², closing the inductive step.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra video series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "mam-divisibility-primes",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 1.2: Divisibility and Prime Factorisation",
    week: 2,
    weekConfirmed: false,
    title: "Divisibility, gcd, Bézout's Lemma & prime factorisation",
    tags: ["number-theory", "proofs", "foundations"],
    difficulty: "core",
    summary:
      "The Division Algorithm guarantees a unique quotient and remainder for integer division; from there, divisibility, greatest common divisor (gcd) and coprimality are built up, culminating in Bézout's Lemma (gcd(m,n) is always expressible as a linear combination xm+yn) and the Euclidean Algorithm (a fast way to compute gcd by repeated division, and to backtrack for Bézout's coefficients). Euclid's Lemma — if a prime divides a product it divides one of the factors — is the key step in proving the Prime Factorisation Theorem: every integer ≥2 factors into primes uniquely, up to order.",
    subConcepts: [
      { title: "Division Algorithm", gloss: "For integers n and d≥1, unique q, r exist with n=qd+r and 0≤r<d." },
      { title: "Divisibility (d∣n)", gloss: "d∣n means n=qd for some integer q; basic properties include transitivity (d∣m, m∣n ⟹ d∣n) and closure under linear combinations." },
      { title: "Greatest common divisor & coprime integers", gloss: "d=gcd(m,n) is the largest common divisor of m,n (equivalently, every common divisor divides d); m,n are coprime if gcd(m,n)=1." },
      { title: "Bézout's Lemma", gloss: "For m,n not both zero, d=gcd(m,n) exists and can be written d=xm+yn for some integers x,y — proved via the Well-Ordering Axiom applied to the set of positive linear combinations of m and n." },
      { title: "Euclidean Algorithm", gloss: "Repeatedly apply the Division Algorithm (m=q1n+r1, n=q2r1+r2, ...); the last nonzero remainder is gcd(m,n), and back-substituting the equations gives Bézout's coefficients explicitly." },
      { title: "Euclid's Lemma", gloss: "For a prime p: if p∣mn then p∣m or p∣n (and more generally, if p divides a product of several integers, it divides at least one of them) — fails for non-primes (e.g. 6∣3·4 but 6∤3 and 6∤4)." },
      { title: "Prime Factorisation Theorem", gloss: "Every integer n≥2 is a product of one or more primes, and this factorisation is unique up to the order of the factors." },
      { title: "Least common multiple (lcm) and lcm·gcd = product", gloss: "lcm(a,b) can be read off prime factorisations (max exponents, vs. gcd's min exponents); for two integers, lcm(a,b)·gcd(a,b)=ab (not true in general for three or more integers)." },
    ],
    preLecture: [
      "Be comfortable with the Division Algorithm (n=qd+r) before this lecture — everything else here builds on it.",
      "Recall what \"coprime\" means from earlier stats/maths courses, and recall the definition of a prime number.",
      "Key question to hold in mind: why can't a matrix-style linear-combination argument (xm+yn) directly hand you the gcd without the Well-Ordering Axiom underneath it?",
      "Practical goal for this deck: be able to run the Euclidean Algorithm by hand and then back-substitute to get Bézout's coefficients — this is a recurring computational skill.",
    ],
    learningPath: [
      "Recall: state Bézout's Lemma and Euclid's Lemma precisely, including why Euclid's Lemma needs p to be prime (the 6∣3·4 counterexample).",
      "Practise: redo the gcd(268,112) example via the Euclidean Algorithm, then back-substitute to write 4 as a linear combination of 268 and 112.",
      "Connect: link the Prime Factorisation Theorem's uniqueness proof (via Well-Ordering + Euclid's Lemma) back to the strong-induction proof of existence from the previous concept card.",
      "Extend: compute gcd and lcm of three integers via prime factorisation (min/max exponents) and verify lcm·gcd≠product in general for three integers, only for two.",
    ],
    applications: [
      "Cryptography (RSA and related): the Euclidean Algorithm and Bézout's Lemma are exactly how modular inverses are computed, which is the computational core of RSA key generation.",
      "CS: gcd/lcm computations underlie scheduling problems (finding common periods), fraction simplification, and hashing schemes.",
      "This course itself: Bézout's Lemma is reused directly to construct inverses in ℤₙ (next concept) and the Chinese Remainder Theorem.",
    ],
    examples: [
      "gcd(268,112)=4 via the Euclidean Algorithm (268=2·112+44, 112=2·44+24, 44=1·24+20, 24=1·20+4, 20=5·4+0), and back-substitution gives 4 = 268·(−5) + 112·12.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra & number theory",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "mam-integers-mod-n",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 1.3: Integers modulo n",
    week: 3,
    weekConfirmed: false,
    title: "Congruence, ℤₙ, modular arithmetic & solving congruences",
    tags: ["number-theory", "modular-arithmetic", "proofs"],
    difficulty: "core",
    summary:
      "Congruence modulo n (a≡b mod n, meaning n∣(a−b)) is an equivalence relation that partitions the integers into n residue classes, forming the set ℤₙ. Addition and multiplication lift to ℤₙ in a well-defined way, but ℤₙ's arithmetic can behave very differently from ℤ's — cancellation can fail, and a product can be zero without either factor being zero, unless n is prime. An element ā has a multiplicative inverse in ℤₙ exactly when gcd(a,n)=1, and Bézout's Lemma gives a constructive way to find it — which is exactly the tool used to solve linear congruences, systems of congruences (the Chinese Remainder Theorem), and to prove Fermat's Little Theorem.",
    subConcepts: [
      { title: "Congruence modulo n", gloss: "a≡b (mod n) means n∣(a−b); this is an equivalence relation on ℤ (reflexive, symmetric, transitive)." },
      { title: "Residue classes and ℤₙ", gloss: "[a]ₙ = {x∈ℤ : x≡a mod n} is a's residue class; ℤₙ = {[0]ₙ,...,[n−1]ₙ} has exactly n distinct elements." },
      { title: "Modular arithmetic", gloss: "[a]+[b]=[a+b] and [a]·[b]=[ab] are well-defined (independent of which generator represents each class) — proved via Theorem 1.38." },
      { title: "How ℤₙ's arithmetic differs from ℤ's", gloss: "Cancellation can fail (e.g. 4·2=4·5 in ℤ6 with 4≠0) and a product can vanish without either factor vanishing (e.g. 2·3=0 in ℤ6) — both are impossible in ℤ." },
      { title: "Inverses in ℤₙ", gloss: "ā has an inverse in ℤₙ iff gcd(a,n)=1; the inverse is (the residue class of) the Bézout coefficient of a — constructive via the Euclidean Algorithm." },
      { title: "When does EVERY nonzero element have an inverse?", gloss: "Equivalent for n≥2: every ā≠0 has an inverse; ℤₙ has no zero-divisors (āb̄=0 ⟹ ā=0 or b̄=0); n is prime." },
      { title: "Solving linear equations/systems in ℤₙ", gloss: "āx=c̄ has a unique solution x=b̄c̄ (b̄ the inverse of ā) whenever gcd(a,n)=1; systems reduce to the same technique via substitution." },
      { title: "Classical Chinese Remainder Theorem", gloss: "For coprime m,n, the system x≡s (mod m), x≡t (mod n) always has a common solution, unique modulo mn." },
      { title: "Fermat's Little Theorem", gloss: "For prime p and a not divisible by p: a^(p−1) ≡ 1 (mod p); more generally a^(pᵏ) ≡ a (mod p) for any k≥1 — a fast primality-testing tool." },
    ],
    preLecture: [
      "Be solid on Bézout's Lemma and the Euclidean Algorithm (previous concept card) — inverses in ℤₙ are computed with exactly the same machinery.",
      "Recall the clock analogy: congruence mod n is like a clock face with n numbers, wrapping around at n instead of 12.",
      "Key question to hold in mind: why does an inverse of ā in ℤₙ exist only when gcd(a,n)=1, and not always?",
      "This deck is computation-heavy — be ready to run the Euclidean Algorithm multiple times per worked example.",
    ],
    learningPath: [
      "Recall: state the condition for ā to have an inverse in ℤₙ, and state the three equivalent conditions for EVERY nonzero element to have one (Theorem 1.48).",
      "Practise: find the inverse of 16 in ℤ35 via the Euclidean Algorithm + Bézout coefficient extraction, following the worked example.",
      "Connect: link \"n prime ⟹ no zero-divisors in ℤₙ\" to why Fermat's Little Theorem specifically needs p to be prime.",
      "Extend: solve a small system of two linear congruences in ℤₙ (elimination, then invert the remaining coefficient) and a Chinese-Remainder-Theorem-style simultaneous congruence, following the worked examples.",
    ],
    applications: [
      "Cryptography: RSA's decryption exponent is a modular inverse computed exactly this way, and Fermat's Little Theorem is the mathematical basis of both RSA correctness and fast (Fermat) primality tests.",
      "Hashing / checksums: modular arithmetic (e.g. mod 9 or mod 11 checks) underlies simple error-detecting codes like ISBN and credit-card check digits.",
      "CS: the Chinese Remainder Theorem is used in fast modular exponentiation and in reconstructing values split across independent moduli (e.g. in secret-sharing schemes).",
    ],
    examples: [
      "Finding the remainder of 4^119 mod 7: since 4³≡1 (mod 7) and 119=3·39+2, 4^119 = (4³)^39·4² ≡ 1^39·2 = 2 (mod 7) — no calculator needed.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — number theory & modular arithmetic",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
  },
  {
    id: "mam-permutations-cycles",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 2.1–2.2: Permutations & Cycles",
    week: 4,
    weekConfirmed: false,
    title: "Permutations, matrix notation & cycle decomposition",
    tags: ["group-theory", "permutations", "proofs"],
    difficulty: "core",
    summary:
      "A permutation of {1,...,n} is a bijection of the set to itself; the set of all of them, Sₙ (the symmetric group of degree n), has n! elements. Permutations are written in matrix (two-row) notation for easy computation of products (composition) and inverses (read the matrix upside-down). Every permutation decomposes uniquely (up to order) into disjoint cycles — a much more compact and structural way to see what a permutation actually does — and disjoint permutations always commute, even though permutations in general don't.",
    subConcepts: [
      { title: "Permutation & symmetric group Sₙ", gloss: "A permutation of Xₙ={1,...,n} is a bijection Xₙ→Xₙ; Sₙ is the set of all of them, with |Sₙ|=n!." },
      { title: "Matrix-type notation", gloss: "Top row lists 1,...,n; bottom row lists σ(1),...,σ(n) — the image of each element sits beneath it." },
      { title: "Product of permutations", gloss: "(γσ)(k)=γ(σ(k)) — apply σ first, then γ; computed practically by tracing the bottom row of σ through the top row of γ." },
      { title: "Inverse of a permutation", gloss: "σ⁻¹ is read directly off σ's matrix by swapping which row is on top (reading the arrows backwards)." },
      { title: "Disjoint permutations commute", gloss: "If σ and τ move no common element, then στ=τσ — a genuine theorem (proved via a fixed/moved-element case analysis), not just a convenient assumption." },
      { title: "Cycles & cycle notation", gloss: "An r-cycle (k1 k2 ... kr) sends each kᵢ to the next, cycling the last back to k1, and fixes everything else; length-1 cycles are the identity, length-2 cycles are transpositions." },
      { title: "Cycle Decomposition Theorem", gloss: "Every permutation ≠ ε factors as a product of disjoint cycles of length ≥2, uniquely up to the order of the factors — proved by induction on n." },
    ],
    preLecture: [
      "Recall function composition (Appendix A: maps) — permutation products are just composition of bijections.",
      "Key question to hold in mind: why must disjoint cycles specifically commute, when permutations in general don't?",
      "Practical goal: be fluent converting between matrix notation and cycle notation in both directions before the lecture on the alternating group.",
      "No group-theory prerequisite yet — Sₙ is introduced here as a concrete example before \"group\" is formally defined in Chapter 3.",
    ],
    learningPath: [
      "Recall: state the Cycle Decomposition Theorem and what \"unique up to order of factors\" actually permits (cycles can be listed in any order, and each cycle can start at any of its own elements).",
      "Practise: factor a permutation given in matrix notation into disjoint cycles by hand, following the \"how to factor a permutation\" algorithm from the notes.",
      "Connect: verify Lemma 2.9 (\"if k is moved by σ, then σ(k) is also moved by σ\") concretely on one of your own examples — it's the engine behind the disjoint-permutations-commute proof.",
      "Extend: compute a product of two permutations both via matrix notation (trace top-to-bottom-to-top) and via cycle notation (\"β carries 1 to 2, α carries 2 to 4, hence αβ carries 1 to 4\") and confirm they agree.",
    ],
    applications: [
      "CS: permutation groups underlie shuffling algorithms, the mathematics of sorting network complexity, and symmetry-breaking arguments in combinatorial search.",
      "Cryptography: substitution ciphers are literally permutations of an alphabet; cycle structure is used in analysing cipher security.",
      "Rubik's-cube-style puzzles and any physical permutation puzzle are analysed via exactly this cycle-decomposition machinery.",
    ],
    examples: [
      "σ=(1 6)(2 4)(3 7 8 9) in S9 is a disjoint-cycle factorisation found by tracing 1→6→1, then 2→4→2, then 3→7→8→9→3, with 5 fixed.",
    ],
    resources: [
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for symmetry and permutation structure",
        href: "https://www.youtube.com/@3blue1brown",
      },
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
    ],
  },
  {
    id: "mam-alternating-group-parity",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 2.3: The Alternating Group",
    week: 5,
    weekConfirmed: false,
    title: "Transpositions, the Parity Theorem & the alternating group",
    tags: ["group-theory", "permutations", "proofs"],
    difficulty: "stretch",
    summary:
      "Every permutation can be written as a product of transpositions (2-cycles), but that factorisation is far from unique — what IS invariant is its parity: any two transposition-factorisations of the same permutation use either both an even number of transpositions or both an odd number (the Parity Theorem). This lets you cleanly label a permutation \"even\" or \"odd\", and the even permutations form a subgroup, the alternating group Aₙ, with exactly half of Sₙ's elements.",
    subConcepts: [
      { title: "Transpositions generate Sₙ", gloss: "Every cycle of length r decomposes into r−1 transpositions, so via the Cycle Decomposition Theorem every permutation is some product of transpositions." },
      { title: "Non-uniqueness of the transposition count", gloss: "The same permutation can be written with different numbers of transpositions (e.g. (1 2 4 5) = (1 2)(2 4)(4 5) = (1 5)(1 4)(1 2)) — the factorisation itself isn't unique." },
      { title: "The Parity Theorem", gloss: "Despite that non-uniqueness, if one factorisation of σ into transpositions has an even count, EVERY factorisation of σ does (and likewise for odd) — proved via a lemma that ε itself can never be written with an odd number of transpositions." },
      { title: "Even/odd permutations & the alternating group Aₙ", gloss: "A permutation is even/odd according to the (now well-defined) parity of its transposition count; Aₙ, the set of even permutations, is a subgroup of Sₙ with |Aₙ| = n!/2." },
      { title: "Finding the parity in practice", gloss: "Factor into disjoint cycles first (Cycle Decomposition Theorem), read each cycle's parity off its length (an r-cycle is even iff r is odd, since it needs r−1 transpositions), then add parities." },
    ],
    preLecture: [
      "Be solid on the Cycle Decomposition Theorem (previous concept card) — this whole topic reduces to it plus one extra step.",
      "Key question to hold in mind: how can a permutation's transposition-count be non-unique, yet its PARITY still be a genuinely well-defined property?",
      "This is flagged as one of the more subtle proofs in this chapter (the Lemma that ε can't be an odd number of transpositions has several sub-cases) — budget extra time.",
      "No new prerequisite beyond cycles, but the case-analysis proof style here is harder than earlier ones.",
    ],
    learningPath: [
      "Recall: state the Parity Theorem precisely and explain in one sentence why it's surprising (transposition factorisations aren't unique, but their parity is).",
      "Practise: factor a permutation into disjoint cycles, determine each cycle's parity from its length, and combine them to get the overall permutation's parity.",
      "Connect: verify |Aₙ|=n!/2 via the bijection argument (multiplying every even permutation by one fixed transposition gives a bijection onto the odd permutations).",
      "Extend / reproduce in R: for small n, generate all of Sₙ, label each permutation even/odd by counting a transposition factorisation, and confirm exactly half are even.",
    ],
    applications: [
      "The 15-puzzle and similar sliding puzzles: a configuration is solvable exactly when its permutation (relative to solved) is even — a direct, checkable use of parity.",
      "Determinants in linear algebra: the sign of a permutation (its parity) is exactly the ± sign appearing in the Leibniz formula for a determinant.",
      "Galois theory (a later course): Aₙ's structure for n≥5 (it turns out to be \"simple\") is the key fact behind why the general quintic has no radical solution formula.",
    ],
    examples: [
      "σ=(1 5 7 2 4)(3 6 8 9) is a product of a 5-cycle (even, needs 4 transpositions) and a 4-cycle (odd, needs 3 transpositions), so σ itself is odd (even+odd=odd).",
    ],
    resources: [
      {
        label: "3Blue1Brown (YouTube channel) — visual intuition for permutation parity and symmetry",
        href: "https://www.youtube.com/@3blue1brown",
      },
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
    ],
    tips: [
      "Common pitfall: trying to determine parity by counting transpositions in one specific factorisation and trusting that count exactly — it's the PARITY (even/odd) that's invariant, not the count itself, so always reduce to the shortest/cleanest factorisation (via cycle lengths) rather than trusting an arbitrary one.",
      "Sanity check: an r-cycle is even iff r is odd — a 3-cycle is even, a 4-cycle is odd. Easy to misremember the direction; re-derive it from \"r-cycle = r−1 transpositions\" if in doubt.",
      "Mnemonic: \"odd cycle, even permutation\" — the length and the parity are always opposite parities of each other, because of the −1 in r−1.",
    ],
  },
  {
    id: "mam-groups-definition",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 3.1: What is a group?",
    week: 6,
    weekConfirmed: false,
    title: "Groups: definition, examples & Cayley tables",
    tags: ["group-theory", "foundations", "proofs"],
    difficulty: "core",
    summary:
      "A group is a set with a binary operation satisfying associativity, having an identity element, and having every element invertible; if the operation is also commutative, the group is abelian. Familiar number systems (ℤ, ℚ, ℝ, ℂ under addition; nonzero rationals/reals/complexes under multiplication), ℤₙ, matrix groups GLₙ, and the symmetric group Sₙ are all examples. A finite group's entire structure is captured by its Cayley (multiplication) table, from which properties like commutativity, the identity, and inverses can all be read off directly — and, remarkably, up to isomorphism there is essentially only one group of each of orders 1, 2 and 3, but two genuinely different ones (cyclic vs. the Klein four-group) of order 4.",
    subConcepts: [
      { title: "Group axioms", gloss: "Associativity; existence of a unity 1 with 1·a=a·1=a; every a has an inverse b with ab=ba=1. Abelian adds commutativity: ab=ba." },
      { title: "Standard examples", gloss: "(ℤ,+), (ℚ,+), (ℝ,+), (ℂ,+); (ℚ\\{0},·) etc.; (ℤₙ,+); GLₙ(R) (invertible matrices); Sₙ (permutations under composition)." },
      { title: "Direct product of groups", gloss: "G1×...×Gn with component-wise operation is a group; unity (1,...,1), inverse (g1⁻¹,...,gn⁻¹)." },
      { title: "Cayley tables", gloss: "A finite group's table of all products ab; reveals abelian-ness (symmetric about the diagonal), the identity (row/column matching the labels), and inverses (where the entry is 1)." },
      { title: "Every row/column of a Cayley table is a permutation of G", gloss: "A consequence of the cancellation laws — each group element appears exactly once in every row and column." },
      { title: "Groups of order 1, 2, 3 are all cyclic (and unique up to isomorphism)", gloss: "Filling in the Cayley table via the group axioms + cancellation forces a unique table in each case." },
      { title: "Two groups of order 4: C4 and the Klein group K4", gloss: "K4={1,a,b,c} with a²=b²=c²=1 and the product of any two of a,b,c being the third — genuinely non-cyclic, unlike C4." },
    ],
    preLecture: [
      "Recall binary operations, associativity, identity elements and inverses (Appendix A) — the group axioms package these together formally.",
      "Key question to hold in mind: what's the difference between a set merely having SOME structure (a binary operation) and being a group specifically?",
      "Practical goal: be able to verify the group axioms for a genuinely new example (like the matrix example later in the chapter) rather than just recalling ℤ/ℚ/ℝ.",
      "Skim the Cayley-table examples for S3 and ℤ2×ℤ2 before lecture — reading a Cayley table is a skill worth priming.",
    ],
    learningPath: [
      "Recall: state the three group axioms (plus the fourth, commutativity, for abelian) from memory and match each to a concrete example.",
      "Practise: build the Cayley table for C4 or K4 from scratch using only the group axioms + cancellation, following the notes' derivation for groups of order ≤4.",
      "Connect: identify, for each standard example (ℤ, ℚ\\{0}, GLₙ, Sₙ), what plays the role of the identity and what an inverse looks like.",
      "Extend / reproduce in R: build the Cayley table of ℤ6 or S3 computationally (e.g. with nested loops over group elements) and check it matches the notes' hand-built table.",
    ],
    applications: [
      "Cryptography: many public-key schemes are literally built on a specific group (elliptic curve groups, multiplicative groups mod p) — recognising the group axioms is the first step to understanding why the scheme is secure.",
      "Physics/chemistry: symmetry groups of molecules and crystals are groups in exactly this sense, and their Cayley tables classify possible symmetry types.",
      "Quant/ML: matrix groups (GLₙ, orthogonal groups) appear throughout linear algebra-heavy methods (PCA, rotations, normalizing flows) — this is the abstract skeleton beneath that machinery.",
    ],
    examples: [
      "ℤ⋆={1,−1} under multiplication and ℤ2={0̄,1̄} under addition have IDENTICAL Cayley tables once you relabel 1↔0̄ and −1↔1̄ — they are isomorphic, foreshadowing the isomorphism chapter.",
    ],
    resources: [
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
  {
    id: "mam-subgroups",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 3.2: Subgroups",
    week: 7,
    weekConfirmed: false,
    title: "Subgroups, the Subgroup Test & the centre of a group",
    tags: ["group-theory", "proofs"],
    difficulty: "core",
    summary:
      "A subgroup is a subset of a group that is itself a group under the same operation; rather than re-verifying all the group axioms, the Subgroup Test lets you confirm a subset is a subgroup by checking just three conditions (contains the identity, closed under the operation, closed under inverses) — and for finite subsets, closure under the operation alone is enough. The centre Z(G), the elements that commute with everything in G, is always a subgroup, and G is abelian precisely when Z(G)=G.",
    subConcepts: [
      { title: "Subgroup definition", gloss: "H⊆G is a subgroup if H is itself a group under G's operation." },
      { title: "Subgroup Test", gloss: "H is a subgroup of G iff (1) 1G∈H, (2) h,h1∈H ⟹ hh1∈H, (3) h∈H ⟹ h⁻¹∈H." },
      { title: "Finite Subgroup Test", gloss: "For H a finite nonempty subset of G, H is a subgroup iff H is closed under the operation alone — closure forces the identity and inverses to appear automatically." },
      { title: "Worked subgroup examples", gloss: "nℤ (multiples of n) is a subgroup of (ℤ,+); the alternating group Aₙ is a subgroup of Sₙ; {2̄,4̄,6̄} is a subgroup of ℤ6." },
      { title: "The centre Z(G)", gloss: "Z(G)={z∈G : zg=gz for all g∈G} — always a subgroup of G (proved via the Subgroup Test); G is abelian iff Z(G)=G." },
      { title: "Lattice diagrams of subgroups", gloss: "A diagram connecting K up to H whenever K⊆H, visualising all of a group's subgroups and their containments at a glance." },
    ],
    preLecture: [
      "Recall the group axioms (previous concept card) — the Subgroup Test is just \"check the axioms survive restriction to a subset\", packaged efficiently.",
      "Key question to hold in mind: why does the Finite Subgroup Test get to drop two of the three conditions (identity, inverses) and keep only closure?",
      "Prerequisite: comfort verifying group axioms directly, since the Subgroup Test's proof leans on cancellation laws.",
      "No new machinery — this is efficient bookkeeping on top of the previous concept.",
    ],
    learningPath: [
      "Recall: state the Subgroup Test and the Finite Subgroup Test, and explain why finiteness is what lets closure alone suffice.",
      "Practise: verify that {ε,τ} and {ε,σ,σ²} are/aren't normal-irrelevant-for-now subgroups of S3 using the Finite Subgroup Test (closure check only).",
      "Connect: compute Z(S3) and Z(K4) and connect the results to which of the two groups is abelian.",
      "Extend: draw the full lattice diagram of subgroups for C4 and for K4, following the notes' examples, and explain why they look structurally different.",
    ],
    applications: [
      "Symmetry analysis: subgroups of a symmetry group correspond to \"partial\" symmetries (e.g. a subgroup of a molecule's symmetry group describing symmetries that fix one particular bond).",
      "Cryptography: the subgroup structure of a multiplicative group mod p (which elements have small order) directly affects the security of discrete-log-based schemes.",
      "CS: closure-based tests like the Finite Subgroup Test are a template for efficient membership/validity checks in algebraic data structures generally.",
    ],
    examples: [
      "H={1,a²} is a subgroup of C4={1,a,a²,a³} (a⁴=1): 1·a²=a²∈H and a²·a²=a⁴=1∈H, so H is closed, hence a subgroup by the Finite Subgroup Test.",
    ],
    resources: [
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
  {
    id: "mam-cyclic-groups",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 3.3: Cyclic groups",
    week: 8,
    weekConfirmed: false,
    title: "Cyclic groups, element order & the Fundamental Theorem of Finite Cyclic Groups",
    tags: ["group-theory", "proofs"],
    difficulty: "core",
    summary:
      "A cyclic group is generated by a single element g — every element is some power gᵏ. The order of g (smallest n with gⁿ=1) determines everything: which powers coincide, how many distinct elements ⟨g⟩ has, and which powers of g are themselves generators (exactly those gᵏ with gcd(k,n)=1). The Fundamental Theorem of Finite Cyclic Groups completes the picture: a cyclic group of order n has exactly one subgroup for every positive divisor of n, and no others — so its entire subgroup lattice is read straight off the divisors of n.",
    subConcepts: [
      { title: "Cyclic subgroup & cyclic group", gloss: "⟨g⟩={gᵏ : k∈ℤ} is the cyclic subgroup generated by g, the smallest subgroup containing g; G is cyclic if G=⟨g⟩ for some g." },
      { title: "Order of an element", gloss: "o(g) is the smallest positive n with gⁿ=1 (or infinite if no such n exists); o(g)=|⟨g⟩|." },
      { title: "Behaviour of powers once order is known", gloss: "If o(g)=n: gᵏ=1 iff n∣k; gᵏ=gᵐ iff k≡m (mod n); ⟨g⟩={1,g,...,g^(n−1)} with all n elements distinct." },
      { title: "Every cyclic group is abelian; every subgroup of a cyclic group is cyclic", gloss: "Two structural facts proved directly from the exponent laws and the Well-Ordering Axiom." },
      { title: "Which powers of g are generators", gloss: "G=⟨g⟩ with o(g)=n: G=⟨gᵏ⟩ iff gcd(k,n)=1 — e.g. ℤ12's generators are exactly 1̄,5̄,7̄,11̄." },
      { title: "Fundamental Theorem of Finite Cyclic Groups", gloss: "For G=⟨g⟩ of order n: every subgroup is ⟨g^d⟩ for some divisor d of n; every subgroup's order divides n; for each divisor k of n, ⟨g^(n/k)⟩ is THE unique subgroup of order k." },
      { title: "Corollary: ⟨gᵐ⟩=⟨g^d⟩ where d=gcd(m,n)", gloss: "Lets you find the order of any power gᵐ directly as n/gcd(m,n), without listing elements." },
    ],
    preLecture: [
      "Be fluent with the exponent laws (gⁿgᵐ=gⁿ⁺ᵐ, (gⁿ)ᵐ=gⁿᵐ) before this deck — they're used constantly and silently.",
      "Recall gcd from the divisibility concept card — the generator criterion (gcd(k,n)=1) directly reuses it.",
      "Key question to hold in mind: why does a cyclic group of order n have EXACTLY one subgroup per divisor of n, no more and no fewer?",
      "Practical goal: be able to draw a cyclic group's full subgroup lattice from its order alone, before working through any specific elements.",
    ],
    learningPath: [
      "Recall: state the Fundamental Theorem of Finite Cyclic Groups precisely, including both directions (subgroups correspond to divisors, and each divisor gives a UNIQUE subgroup).",
      "Practise: find all subgroups of C12 (or ℤ100) using the theorem's divisor-matching recipe, then draw the lattice diagram, following the worked examples.",
      "Connect: verify the generators of ℤ12 (1̄,5̄,7̄,11̄) directly against the gcd(k,12)=1 criterion.",
      "Extend / reproduce in R: for a cyclic group like ℤ30, compute the order of every element via o(gᵐ)=n/gcd(m,n) and cross-check against brute-force listing.",
    ],
    applications: [
      "Cryptography: cyclic groups (of units mod p, or on elliptic curves) are the standard setting for Diffie-Hellman and related discrete-log schemes — subgroup order directly controls security parameters.",
      "Signal processing: cyclic groups underlie the structure of the discrete Fourier transform (roots of unity form a cyclic group under multiplication).",
      "CS: hash table probing sequences and circular buffers are literally cyclic-group arithmetic in disguise.",
    ],
    examples: [
      "In ℤ30, 18̄=18·1̄; since gcd(30,18)=6, ⟨18̄⟩=⟨6̄⟩ has order 30/6=5: ⟨18̄⟩={0̄,6̄,12̄,18̄,24̄}.",
    ],
    resources: [
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
  {
    id: "mam-homomorphisms-isomorphisms",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 3.4: Homomorphisms and isomorphisms",
    week: 9,
    weekConfirmed: false,
    title: "Group homomorphisms & isomorphisms",
    tags: ["group-theory", "proofs"],
    difficulty: "stretch",
    summary:
      "A homomorphism φ:G1→G2 is a map that preserves the group operation (φ(ab)=φ(a)φ(b)); an isomorphism is a bijective one, meaning G1 and G2 are \"the same group wearing different labels\". Isomorphisms automatically preserve the identity, inverses and powers, and being isomorphic is an equivalence relation. There's no algorithm for spotting an isomorphism — you propose a map, check it's bijective, then check it respects the operation — but there IS an easy way to prove two groups are NOT isomorphic: find a structural property (abelian, cyclic, an element's order, a solution to x²=1) that one group has and the other doesn't.",
    subConcepts: [
      { title: "Group homomorphism, mono/epi/isomorphism", gloss: "φ(a·1b)=φ(a)·2φ(b) for all a,b; monomorphism = injective, epimorphism = surjective, isomorphism = bijective homomorphism." },
      { title: "Homomorphisms preserve structure", gloss: "φ(1G1)=1G2; φ(g⁻¹)=φ(g)⁻¹; φ(gᵏ)=φ(g)ᵏ for all k∈ℤ — all provable from the homomorphism property alone." },
      { title: "Isomorphic relation ≅ is an equivalence relation", gloss: "Reflexive (identity map), symmetric (inverse of an isomorphism is an isomorphism), transitive (composition of isomorphisms is an isomorphism)." },
      { title: "The automorphism group aut(G)", gloss: "The set of all isomorphisms G→G forms a group under composition." },
      { title: "Recipe for finding an isomorphism", gloss: "(1) guess a plausible bijection, (2) verify it's bijective, (3) verify φ(ab)=φ(a)φ(b) on arbitrary elements — e.g. proving (ℝ,+)≅(ℝ⁺,·) via the exponential map." },
      { title: "Recipe for proving NON-isomorphism", gloss: "Find a property one group has and the other lacks — e.g. cyclic vs. non-cyclic, abelian vs. non-abelian, or \"has an element x≠1 with x²=1\" (as ℝ⁺ does via −1, but ℝ under + does not)." },
      { title: "Isomorphism of Cyclic Groups theorem", gloss: "Every cyclic group of order n is isomorphic to ℤₙ; every infinite cyclic group is isomorphic to ℤ — so, up to isomorphism, there is really only ONE cyclic group per order." },
    ],
    preLecture: [
      "Recall bijective maps (injective + surjective) from Appendix A — an isomorphism is exactly \"bijective homomorphism\", nothing more exotic.",
      "Recall the Cayley-table observation from the groups-definition card: isomorphic finite groups have identical Cayley tables up to relabelling — this concept formalises that intuition.",
      "Key question to hold in mind: why is it usually EASIER to prove two groups are NOT isomorphic than to prove they ARE?",
      "This is flagged as more abstract than earlier group-theory topics — the recipe (guess, verify bijective, verify operation-preserving) needs practice to internalise.",
    ],
    learningPath: [
      "Recall: state what a homomorphism must preserve (identity, inverses, powers) and why isomorphism specifically requires bijectivity on top of that.",
      "Practise: verify (ℝ,+)≅(ℝ⁺,·) via the exponential map, following all three steps of the recipe explicitly.",
      "Connect: use the \"find a differing property\" method to show ℤ2×ℤ2 and ℤ4 are NOT isomorphic (one is cyclic, the other isn't).",
      "Extend / reproduce in R: for a small cyclic group, construct the explicit isomorphism to ℤₙ from the Isomorphism of Cyclic Groups theorem and verify it numerically on several products.",
    ],
    applications: [
      "Classification problems throughout mathematics (and physics) hinge on isomorphism: two seemingly different symmetry groups, coding schemes, or physical systems can be recognised as \"the same\" once an isomorphism is found.",
      "CS: recognising that two data structures or automata are isomorphic as algebraic objects lets you transfer algorithms/proofs from one to the other for free.",
      "Cryptography: some attacks work by finding an isomorphism between a hard group and an easier one (e.g. certain elliptic curve weaknesses), transferring the discrete-log problem to a solvable setting.",
    ],
    examples: [
      "ℝ∗ (nonzero reals under ·) is NOT isomorphic to ℝ (under +): ℝ∗ has −1≠1 with (−1)²=1, but no nonzero a∈ℝ satisfies a+a=0 except a=0 — that structural mismatch rules out any isomorphism.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra / group theory series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
    tips: [
      "Common pitfall: trying to build an isomorphism between two groups that merely have the same order — same size is necessary but nowhere near sufficient (e.g. ℤ4 and ℤ2×ℤ2 both have order 4 but aren't isomorphic).",
      "Sanity check: before hunting for an isomorphism, quickly check the \"free\" structural properties (abelian? cyclic? does some non-identity element square to 1?) — a mismatch there saves you from a doomed search.",
      "Mnemonic: an isomorphism is a relabelling, not a coincidence — if you can't articulate WHY each element maps where it does (not just that the map happens to work), you probably haven't found the natural one.",
    ],
  },
  {
    id: "mam-cosets-lagrange",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 4: Cosets & Lagrange's Theorem",
    week: 10,
    weekConfirmed: false,
    title: "Cosets and Lagrange's Theorem",
    tags: ["group-theory", "proofs"],
    difficulty: "core",
    summary:
      "For a subgroup H of G, the right coset Ha={ha : h∈H} and left coset aH partition G into equal-sized blocks — every element of G lies in exactly one coset of H, and every coset has exactly |H| elements. That single counting fact is Lagrange's Theorem: the order of any subgroup divides the order of the group. It has immediate, powerful consequences — every element's order divides |G|, and every group of prime order is forced to be cyclic.",
    subConcepts: [
      { title: "Right and left cosets", gloss: "Ha={ha : h∈H}, aH={ah : h∈H} — subsets of G, NOT elements of G; in general Ha≠aH." },
      { title: "Coset properties", gloss: "H1=H=1H; a∈Ha; if G abelian then Ha=aH always; Ha=Hb iff ab⁻¹∈H; Ha=H iff a∈H; there's a bijection H→Ha so |Ha|=|H|." },
      { title: "Cosets partition G", gloss: "Any two cosets of H are either identical or completely disjoint, and every element of G lies in some coset — so {Ha : a∈G} partitions G exactly." },
      { title: "Lagrange's Theorem", gloss: "For H a subgroup of a finite group G: |G| is a multiple of |H| — proved by counting G as a disjoint union of equal-sized cosets." },
      { title: "Corollary: element order divides group order", gloss: "o(g)=|⟨g⟩| and ⟨g⟩ is a subgroup, so Lagrange's Theorem forces o(g) to divide |G|." },
      { title: "Corollary: every group of prime order is cyclic", gloss: "If |G|=p (prime) and g≠1, then |⟨g⟩| divides p, so must equal p, forcing G=⟨g⟩." },
      { title: "Index of a subgroup", gloss: "|G:H| = number of cosets of H in G = |G|/|H| when G is finite; can be finite even when both G and H are infinite (e.g. |ℤ:4ℤ|=4)." },
    ],
    preLecture: [
      "Be comfortable with subgroups and the Subgroup Test (earlier concept card) — cosets are built directly on top of a chosen subgroup H.",
      "Key question to hold in mind: why must two cosets of the same subgroup be either IDENTICAL or completely disjoint — never partially overlapping?",
      "Recall the bijection idea (Appendix A) — the proof that |Ha|=|H| is a one-line bijection argument.",
      "This is one of the most-reused theorems in the rest of the course (factor groups, the First Isomorphism Theorem) — worth over-preparing for.",
    ],
    learningPath: [
      "Recall: state Lagrange's Theorem and sketch its one-paragraph proof (cosets partition G into equal-sized blocks, so |G| is a multiple of |H|).",
      "Practise: compute all left and right cosets of H={ε,(1 3)} in S3, following the worked example, and confirm they don't coincide (H is not normal — flagged for the next concept).",
      "Connect: derive \"every group of prime order is cyclic\" from Lagrange's Theorem plus the fact that o(g)=|⟨g⟩|, without looking at the proof.",
      "Extend: compute all cosets of 4ℤ in ℤ and recognise them as exactly the four residue classes mod 4 from the integers-modulo-n concept card — cosets of nℤ in ℤ ARE the residue classes mod n.",
    ],
    applications: [
      "Coding theory: cosets of a linear code (a subgroup of a vector space under addition) are literally used in syndrome decoding to identify and correct errors.",
      "Cryptography: Lagrange's Theorem underlies why element orders in a cryptographic group must divide the group's order, constraining which orders are even possible to search for.",
      "CS: coset-based partitioning is the mathematical basis of certain hashing and load-balancing schemes that split a large set into equal-sized, non-overlapping classes.",
    ],
    examples: [
      "For H={ε,(1 3)} in S3: H(1 2)={(1 2),(1 2 3)} and (1 2)H={(1 2),(1 3 2)} are DIFFERENT sets — a concrete instance of Ha≠aH when H isn't normal (flagged for the normal-subgroups concept).",
    ],
    resources: [
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
  {
    id: "mam-normal-subgroups-factor-groups",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 5.1–5.2: Normal subgroups & Factor groups",
    week: 11,
    weekConfirmed: false,
    title: "Normal subgroups & factor (quotient) groups",
    tags: ["group-theory", "proofs"],
    difficulty: "hard",
    summary:
      "A subgroup H is normal in G (written H◁G) when its left and right cosets always coincide (gH=Hg for every g) — equivalently, when gHg⁻¹=H for every g (the Normality Test). Normality is exactly the condition needed for coset multiplication Ha·Hb:=H(ab) to be well-defined, and once it is, the set of all cosets G/H becomes a group in its own right — the factor (quotient) group — with H itself as the identity coset. This is the mechanism that turns \"collapsing a subgroup to a point\" into a legitimate new group.",
    subConcepts: [
      { title: "Normal subgroup", gloss: "H◁G if gH=Hg for every g∈G; every subgroup of an abelian group is automatically normal, and {1} and G itself are always normal in G." },
      { title: "Normality Test", gloss: "Equivalent conditions: H◁G ⟺ gHg⁻¹⊆H for all g ⟺ gHg⁻¹=H for all g — usually the easiest way to check normality in practice." },
      { title: "Kernel of a homomorphism is always normal", gloss: "ker φ = {k∈G : φ(k)=1G′} is a normal subgroup of G, and φ is injective iff ker φ={1G} — links this chapter directly back to homomorphisms." },
      { title: "Why coset multiplication needs normality", gloss: "Ha·Hb:=H(ab) is only well-defined (independent of which generators a,b are chosen) when H is normal — a genuine theorem, not a convention, proved via H's normality directly." },
      { title: "The factor group G/H", gloss: "The set of all cosets of a normal H, with operation Ha·Hb=H(ab): associative, identity H, inverse of Ha is Ha⁻¹ — a bona fide group." },
      { title: "The canonical projection π:G→G/H", gloss: "π(a)=Ha is always a group epimorphism with kernel H — every factor group is a homomorphic image of G." },
      { title: "Factor groups inherit some properties", gloss: "If G is abelian, so is G/H; if G=⟨g⟩ is cyclic, so is G/H=⟨Hg⟩ — e.g. ℤ/6ℤ ≅ ℤ6." },
    ],
    preLecture: [
      "Be fluent with cosets and Lagrange's Theorem (previous concept card) — normal subgroups are a special, extra-well-behaved kind of subgroup with respect to its cosets.",
      "Recall the S3 example where H(1 2)≠(1 2)H for H={ε,(1 3)} — that failure of normality is exactly why coset multiplication breaks for non-normal H, motivating this whole topic.",
      "Key question to hold in mind: WHY does gH=Hg for every g guarantee that Ha·Hb=H(ab) doesn't depend on which representatives a,b you pick?",
      "Flagged as one of the more abstract topics this term — budget extra time and don't skip the worked S3 counterexample showing coset multiplication genuinely failing for a non-normal H.",
    ],
    learningPath: [
      "Recall: state the Normality Test and explain, in your own words, why it's usually easier to check than the raw gH=Hg definition.",
      "Practise: verify K={ε,σ,σ²}◁S3 and H={ε,τ} is NOT normal in S3, using the Normality Test's conjugation check on each, following the notes' worked calculations.",
      "Connect: build the Cayley table of ℤ/6ℤ from coset arithmetic and confirm it matches ℤ6's table from the groups-definition concept card.",
      "Extend / reproduce in R: for a small non-abelian group, pick a non-normal subgroup, compute Ha and aH for some a where they differ, and confirm H(ab)≠H(cd) even though Ha=Hc and Hb=Hd — the concrete failure mode this whole theory is built to avoid.",
    ],
    applications: [
      "Physics: quotienting a symmetry group by a normal subgroup of \"unobservable\" symmetries is a standard move in gauge theory and crystallography to get the group of genuinely distinct configurations.",
      "Coding theory / CS: quotient constructions (cosets of a normal subgroup) appear in algebraic coding and in some hashing schemes that need a well-defined \"collapsed\" structure, not just an arbitrary partition.",
      "This course itself: factor groups are the direct setup for the First Isomorphism Theorem (next concept), which is the single most-used tool for identifying unfamiliar groups.",
    ],
    examples: [
      "In S3 with the NON-normal H={ε,(1 2)}: H(1 3)=H(1 3 2) and H(2 3)=H(1 2 3), yet H(1 3)(2 3)=H(1 3 2) while H(1 3 2)(1 2 3)=H(ε) — coset multiplication genuinely gives inconsistent answers, exactly because H isn't normal.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra / group theory series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
    tips: [
      "Common pitfall: assuming coset multiplication Ha·Hb=H(ab) is automatically well-defined for any subgroup — it isn't; without normality, different generators of the same coset can give different products, as the S3 example shows explicitly.",
      "Sanity check: before building a factor group G/H, always run the Normality Test (gHg⁻¹=H) first — if it fails, G/H as a group construction simply doesn't exist.",
      "Mnemonic: \"normal = safe to collapse\" — normality is precisely the safety condition that makes collapsing each coset to a single point produce a consistent, well-defined group.",
    ],
  },
  {
    id: "mam-first-isomorphism-theorem",
    courseCode: "MAM2013S",
    sourceRef: "MAM2013S — Ch 5.3: The First Isomorphism Theorem",
    week: 12,
    weekConfirmed: false,
    title: "The First Isomorphism Theorem",
    tags: ["group-theory", "proofs"],
    difficulty: "hard",
    summary:
      "If φ:G→G′ is a group epimorphism with kernel K, then G/K ≅ G′ — quotienting G by exactly the elements that φ collapses to the identity recovers G′ itself, up to isomorphism. This is the capstone result tying together homomorphisms, cosets, normal subgroups and factor groups: every homomorphic image of a group is (isomorphic to) one of its own factor groups, so classifying \"what G′s can I map G onto\" reduces entirely to classifying G's normal subgroups.",
    subConcepts: [
      { title: "Homomorphic image", gloss: "G′ is a homomorphic image of G if there's an epimorphism (surjective homomorphism) from G onto G′; the canonical projection shows every factor group G/H is automatically a homomorphic image of G." },
      { title: "Key lemma: φ(a)=φ(b) iff Ka=Kb", gloss: "For φ:G→G′ with kernel K, two elements have the same image under φ exactly when they lie in the same coset of K — the bridge between homomorphisms and cosets." },
      { title: "First Isomorphism Theorem", gloss: "φ:G→G′ an epimorphism with kernel K ⟹ G/K ≅ G′, via the well-defined bijective map φ̃(Kx)=φ(x)." },
      { title: "Corollary for non-surjective homomorphisms", gloss: "For any homomorphism φ:G→G′ with kernel K (not necessarily onto), G/K ≅ Im φ — restrict to the image and apply the theorem." },
      { title: "Converse reading", gloss: "A group G′ is a homomorphic image of G if and only if G′ is isomorphic to SOME factor group of G — factor groups are literally the complete list of possible homomorphic images." },
    ],
    preLecture: [
      "Be solid on factor groups and normality (previous concept card), and on kernels being normal subgroups — this theorem is the payoff for both.",
      "Recall Lagrange's Theorem (earlier concept card) — several worked applications combine it with the First Isomorphism Theorem to pin down |ker φ| or |Im φ| from order constraints alone.",
      "Key question to hold in mind: why does proving G/K≅G′ reduce to just checking one map (φ̃(Kx)=φ(x)) is well-defined, injective, surjective, and operation-preserving — what does each of those four checks correspond to conceptually?",
      "This is the term's capstone algebra result — expect it to combine essentially everything from cosets through factor groups in one proof.",
    ],
    learningPath: [
      "Recall: state the First Isomorphism Theorem precisely, including what \"kernel\" and \"epimorphism\" mean in the statement.",
      "Practise: work through the φ̃(Kx)=φ(x) well-defined/injective/surjective/homomorphism verification from the notes' proof, step by step, without looking.",
      "Connect: redo the matrix-group example (G/Z(G)≅ℝ×ℝ) or the ℤ30→G example, identifying exactly where Lagrange's Theorem and the First Isomorphism Theorem are each invoked.",
      "Extend / reproduce in R: pick a concrete surjective group homomorphism (e.g. ℤ→ℤₙ via reduction mod n), confirm its kernel is nℤ, and verify numerically that cosets of nℤ correspond one-to-one with elements of ℤₙ.",
    ],
    applications: [
      "Classification: this theorem is the standard tool for identifying an unfamiliar group's \"shape\" by mapping it onto a known one and reading off the quotient — used throughout algebra, not just this course.",
      "Coding theory / signal processing: many transform-based codes are analysed via a homomorphism onto a smaller \"syndrome\" group, with the First Isomorphism Theorem justifying that the quotient structure captures exactly the recoverable information.",
      "Cryptography: security reductions sometimes work by exhibiting a homomorphism onto an easier group and using the isomorphism theorem to transfer a hardness assumption between the two settings.",
    ],
    examples: [
      "For a homomorphism φ:ℤ30→G with |G|=5 (prime): Lagrange's Theorem forces |Im φ| to be 1 or 5; combined with the First Isomorphism Theorem (ℤ30/ker φ ≅ Im φ), this pins ker φ down to either ℤ30 itself (trivial φ) or the unique order-6 subgroup 5ℤ30.",
    ],
    resources: [
      {
        label: "MIT OpenCourseWare — 18.703 Modern Algebra",
        href: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/",
      },
      {
        label: "Socratica (YouTube channel) — abstract algebra / group theory series",
        href: "https://www.youtube.com/@Socratica",
      },
    ],
    tips: [
      "Common pitfall: forgetting that the theorem requires φ to be an EPIMORPHISM (onto) to get G/K≅G′ directly — for a general homomorphism, you get G/K≅Im φ, which may be a proper subgroup of G′, not all of it.",
      "Sanity check: after invoking the theorem, check that |G/K| (via Lagrange, |G|/|K|) matches |Im φ| — a mismatch means an arithmetic slip in identifying the kernel or the image.",
      "Mnemonic: \"quotient by what's collapsed\" — the kernel is exactly the set of elements φ sends to the identity, so quotienting it out is precisely undoing that collapsing, recovering the image faithfully.",
    ],
  },
];
