import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const navy = rgb(10 / 255, 31 / 255, 68 / 255);
const gold = rgb(212 / 255, 175 / 255, 55 / 255);
const emerald = rgb(15 / 255, 157 / 255, 88 / 255);
const ink = rgb(18 / 255, 32 / 255, 51 / 255);
const muted = rgb(70 / 255, 82 / 255, 102 / 255);

type Section = { title: string; lines: string[] };

const sections: Section[] = [
  {
    title: "Algebra and number",
    lines: [
      "Quadratic formula: x = (-b +/- sqrt(b^2 - 4ac)) / (2a), for ax^2 + bx + c = 0.",
      "Discriminant: D = b^2 - 4ac. D > 0 two real roots, D = 0 one repeated root, D < 0 no real roots.",
      "Sum of roots = -b/a. Product of roots = c/a.",
      "Straight line: y = mx + c, with m = (y2 - y1) / (x2 - x1).",
      "Distance: d = sqrt( (x2 - x1)^2 + (y2 - y1)^2 ).",
      "Midpoint: ( (x1 + x2)/2 , (y1 + y2)/2 ).",
      "Indices: a^m * a^n = a^(m+n). (a^m)^n = a^(mn). a^m / a^n = a^(m-n). a^0 = 1.",
      "Logarithms: log(ab) = log a + log b. log(a/b) = log a - log b. log(a^n) = n log a.",
      "Change of base: log_b(a) = log a / log b.",
      "Direct variation y = kx. Inverse variation y = k/x. Joint variation follows the same constant.",
      "Arithmetic progression: T(n) = a + (n - 1)d. S(n) = n/2 * (2a + (n - 1)d).",
      "Geometric progression: T(n) = a r^(n-1). S(n) = a (r^n - 1) / (r - 1), when r is not 1.",
      "Combinations: C(n, r) = n! / ( r! (n - r)! ).",
    ],
  },
  {
    title: "Trigonometry, calculus, and vectors",
    lines: [
      "sin^2 A + cos^2 A = 1. 1 + tan^2 A = sec^2 A. 1 + cot^2 A = csc^2 A.",
      "sin(A + B) = sin A cos B + cos A sin B.",
      "cos(A + B) = cos A cos B - sin A sin B.",
      "Sine rule: a / sin A = b / sin B = c / sin C = 2R.",
      "Cosine rule: c^2 = a^2 + b^2 - 2ab cos C.",
      "Area of a triangle: (1/2) ab sin C.",
      "Derivative of x^n is n x^(n-1). Derivative of a constant is 0.",
      "Product rule: (uv)' = u'v + uv'. Quotient rule: (u/v)' = (u'v - uv') / v^2.",
      "Chain rule: derivative of f(g(x)) is f'(g(x)) * g'(x).",
      "Integral of x^n is x^(n+1) / (n+1) + C, when n is not -1.",
      "Gradient of a curve at x is dy/dx. Equation of a tangent uses that gradient and the point of contact.",
      "Vector magnitude: |a| = sqrt(x^2 + y^2). Unit vector = a / |a|.",
    ],
  },
  {
    title: "Physics",
    lines: [
      "v = u + at.",
      "s = ut + (1/2) at^2.",
      "v^2 = u^2 + 2as.",
      "s = ((u + v) / 2) * t.",
      "Take the direction of travel as positive unless the question sets another sign. Braking then has negative a.",
      "F = ma. Momentum p = mv. Impulse = change in momentum.",
      "Weight = mg. Moment = force x perpendicular distance.",
      "Work = Fd cos(theta). Kinetic energy = (1/2) mv^2. Gravitational potential energy = mgh.",
      "Power = work / time = Fv when force and velocity stay along the same line.",
      "Density = mass / volume. Pressure = force / area.",
      "Wave speed v = f lambda. Period T = 1/f.",
      "Ohm's law: V = IR. Power P = IV = I^2 R = V^2 / R.",
      "Series resistance: R = R1 + R2 + ... Parallel: 1/R = 1/R1 + 1/R2 + ...",
      "Snell's law: n1 sin i = n2 sin r.",
      "Heat: Q = mc (T2 - T1). Ideal gas: PV = nRT, with the units the question specifies.",
    ],
  },
  {
    title: "Chemistry",
    lines: [
      "Amount of substance: n = m / M, with M the molar mass in g/mol.",
      "Concentration: n = C x V, with V in dm^3. If V is in cm^3, divide by 1000 first.",
      "Dilution: C1 V1 = C2 V2, same concentration unit on both sides.",
      "Gas amount: n = V / Vm. Use 22.4 dm^3/mol at s.t.p., or 24 dm^3/mol only when the paper states room conditions.",
      "Percentage yield = (actual mass / theoretical mass) x 100.",
      "pH = -log[H+]. At 25 degrees Celsius, pH + pOH = 14 for aqueous solutions in the usual school treatment.",
      "Empirical formula: convert mass to moles, divide by the smallest number of moles, then clear simple ratios.",
      "A balanced equation is a ratio of moles, not a ratio of grams.",
      "Faraday electrolysis: m = (M I t) / (z F), with F = 96500 C/mol.",
      "Alkanes C(n)H(2n+2). Alkenes C(n)H(2n). Alkynes C(n)H(2n-2). Alkanols C(n)H(2n+1)OH.",
    ],
  },
  {
    title: "Chemical engineering fundamentals",
    lines: [
      "Write the balance before you hunt for a formula: In - Out + Generation = Accumulation.",
      "At steady state, accumulation is zero. Say that assumption on the script.",
      "Mole fraction of i: x(i) = n(i) / n(total). Mass fraction uses mass in the same way.",
      "Reynolds number: Re = (density x velocity x diameter) / viscosity. It compares inertia with viscosity.",
      "Bernoulli, along a streamline, for the idealised case: P/(rho g) + v^2/(2g) + z = constant.",
      "Sensible heat for a stream: Q = m Cp (T2 - T1), when heat capacity may be treated as constant.",
      "Conversion of a reactant: X = (moles in - moles out) / moles in, for that reactant, when the basis is stated.",
      "Keep one basis (a feed rate, or 100 kg, or 1 hour) and convert every term onto it before you add.",
    ],
  },
];

let cached: Uint8Array | null = null;

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= width) {
      current = trial;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function buildCheatSheetPdf() {
  if (cached) return cached;

  const doc = await PDFDocument.create();
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  doc.setTitle("Essential STEM & Mathematics Formula Cheat Sheet");
  doc.setAuthor("Omorewa Yomi Godwin, Pacesetter Tutorial");
  doc.setSubject("Study sheet for Mathematics, Physics, Chemistry, and Chemical Engineering fundamentals");

  const pages: PDFPage[] = [];
  const margin = 42;
  const width = 595.28;
  const height = 841.89;
  const contentWidth = width - margin * 2;

  const openPage = () => {
    const page = doc.addPage([width, height]);
    pages.push(page);
    page.drawRectangle({ x: 0, y: height - 58, width, height: 58, color: navy });
    page.drawRectangle({ x: 0, y: height - 64, width, height: 6, color: gold });
    page.drawText("PACESETTER TUTORIAL  ·  EKPAN, WARRI", {
      x: margin,
      y: height - 28,
      size: 9,
      font: sansBold,
      color: gold,
    });
    page.drawText("Essential STEM & Mathematics Formula Cheat Sheet", {
      x: margin,
      y: height - 46,
      size: 13,
      font: serifBold,
      color: rgb(1, 1, 1),
    });
    return { page, y: height - 88 };
  };

  let cursor = openPage();

  const intro =
    "Prepared by Omorewa Yomi Godwin for students of Pacesetter Tutorial. These are the relationships to recall. They do not replace a balanced equation, a diagram, or the units in the question in front of you.";
  for (const line of wrap(intro, serif, 11, contentWidth)) {
    cursor.page.drawText(line, { x: margin, y: cursor.y, size: 11, font: serif, color: ink });
    cursor.y -= 15;
  }
  cursor.y -= 8;

  const ensure = (needed: number) => {
    if (cursor.y - needed < 48) cursor = openPage();
  };

  for (const section of sections) {
    ensure(36);
    cursor.page.drawRectangle({
      x: margin,
      y: cursor.y - 4,
      width: 18,
      height: 4,
      color: emerald,
    });
    cursor.page.drawText(section.title, {
      x: margin + 26,
      y: cursor.y - 6,
      size: 14,
      font: serifBold,
      color: navy,
    });
    cursor.y -= 24;

    for (const item of section.lines) {
      const lines = wrap(item, sans, 10, contentWidth - 16);
      ensure(lines.length * 13 + 6);
      cursor.page.drawRectangle({
        x: margin,
        y: cursor.y - 1,
        width: 4,
        height: 4,
        color: gold,
      });
      lines.forEach((line, index) => {
        cursor.page.drawText(line, {
          x: margin + 14,
          y: cursor.y - index * 13,
          size: 10,
          font: sans,
          color: ink,
        });
      });
      cursor.y -= lines.length * 13 + 7;
    }
    cursor.y -= 6;
  }

  ensure(48);
  const close =
    "Bring the question you currently avoid to a free consultation. The sheet tells you what to write. The lesson shows you when.";
  for (const line of wrap(close, serif, 11, contentWidth)) {
    cursor.page.drawText(line, {
      x: margin,
      y: cursor.y,
      size: 11,
      font: serifBold,
      color: navy,
    });
    cursor.y -= 15;
  }

  pages.forEach((page, index) => {
    page.drawText(
      `Omorewa Yomi Godwin  ·  TRCN-certified  ·  ${index + 1} / ${pages.length}`,
      { x: margin, y: 24, size: 8, font: sans, color: muted },
    );
  });

  cached = await doc.save();
  return cached;
}
