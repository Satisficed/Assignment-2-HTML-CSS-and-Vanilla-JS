const form = document.getElementById("cube-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission refresh

  const formData = new FormData(form);

  const a: number = Number(formData.get("a"));

  if (a === 0) {
    (document.getElementById("result") as HTMLInputElement).value =
      "a-value cannot be 0";
    console.log("Case 0: a-value is zero");
    return;
  }

  const b: number = Number(formData.get("b"));
  const c: number = Number(formData.get("c"));
  const d: number = Number(formData.get("d"));

  const p = (3 * a * c - b ** 2) / (3 * a ** 2);
  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
  // const CD = (q / 2) ** 2 + (p / 3) ** 2;
  const discriminant =
    b ** 2 * c ** 2 -
    4 * a * c ** 3 -
    4 * b ** 3 * d -
    27 * a ** 2 * d ** 2 +
    18 * a * b * c * d;
  const h = -b / (3 * a);
  // const y =
    (-q / 2 + Math.sqrt(discriminant)) ** (1 / 3) +
    (-q / 2 - Math.sqrt(discriminant)) ** (1 / 3);
  // const x = y + h;
  console.log(discriminant);
  console.log("Testing Values:", q, p);
  console.log(a, b, c, d);
  if (discriminant < 0) {
    const k = 2 * Math.sqrt(-p / 3);
    const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-(p / 3) ** 3)));
    const y1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
    const y2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
    const y3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
    const x1 = y1 + h;
    const x2 = y2 + h;
    const x3 = y3 + h;
    (document.getElementById("result") as HTMLInputElement).value =
      `${a}x^3,${b}x^2,${c}x,${d}`;
    console.log("Case 1: 3 Real Roots");
    console.log("Discriminant:", discriminant);
    console.log("Parameters:", { p, q, k, theta });
    console.log(x1, y1);
    console.log(x2, y2);
    console.log(x3, y3);
  } else if (discriminant > 0) {
    d;
    const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
    (document.getElementById("result") as HTMLInputElement).value =
      `x=${rootOne}, x2=${rootTwo}`;
    console.log("Case 2: 1 Real Root, 2 Complex Roots");
  } else {
    if (p === 0 && q === 0) {
      const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
      (document.getElementById("result") as HTMLInputElement).value =
        `x=${rootOne}`;
      console.log("Case 3: 1 Real Root, Double Roots");
    } else if (p != 0) {
      const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
      (document.getElementById("result") as HTMLInputElement).value =
        `x=${rootOne}`;
      console.log("Case 4: Triple Roots");
    }
  }
});
