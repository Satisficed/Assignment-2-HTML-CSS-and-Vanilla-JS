const form = document.getElementById("cube-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission refresh

  const formData = new FormData(form);

  const a: number = Number(formData.get("a"));

  if (a === 0) {
    (document.getElementById("result") as HTMLInputElement).value =
      "a-value cannot be 0";
    console.log("Case 0: a-value is zero");
    document
      .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
      .forEach((td) => {
        td.textContent = `n/a`;
      });
    return;
  }

  const b: number = Number(formData.get("b"));
  const c: number = Number(formData.get("c"));
  const d: number = Number(formData.get("d"));

  const p = (3 * a * c - b ** 2) / (3 * a ** 2);
  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);

  const Test =
    18 * a * b * c * d -
    4 * b ** 3 * d +
    b ** 2 * c ** 2 -
    4 * a * c ** 3 -
    27 * a ** 2 * d ** 2;

  const h = -b / (3 * a);
  const CD = -4 * p ** 3 - 27 * q ** 2;
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

  // const yCube = -p * y - q;
  // function tryCardano {}

  console.log("Parameters:", { p, q, discriminant, CD });

  console.log(a, b, c, d);

  if (discriminant > 0) {
    const u = Math.cbrt(
      -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
    );
    const v = Math.cbrt(
      -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
    );
    console.log("Case 2: 1 Real Root, 2 Complex Roots");
    const x1 = u + v + h;
    console.log("Parameters:", { p, q, x1 });
    (document.getElementById("x1") as HTMLTableCellElement).textContent =
      `${x1}`;
    (document.getElementById("x2") as HTMLTableCellElement).textContent =
      `Complex`;
    (document.getElementById("x3") as HTMLTableCellElement).textContent =
      `Complex`;
  } else if (discriminant < 0) {
    const k = 2 * Math.sqrt(-p / 3);
    const theta =
      (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
    const y1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
    const y2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
    const y3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
    const x1 = y1 + h;
    const x2 = y2 + h;
    const x3 = y3 + h;
    document
      .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
      .forEach((td) => {
        td.textContent = `0`;
      });
    (document.getElementById("x1") as HTMLTableCellElement).textContent =
      `${x1}`;
    (document.getElementById("x2") as HTMLTableCellElement).textContent =
      `${x2}`;
    (document.getElementById("x3") as HTMLTableCellElement).textContent =
      `${x3}`;
    console.log("Case 1: 3 Real Roots");
    console.log("Discriminant:", discriminant);
    console.log("Parameters:", { p, q, k, theta });
  } else {
    if (p === 0 && q === 0) {
      const y =
        (-q / 2 + Math.sqrt(discriminant)) ** (1 / 3) +
        (-q / 2 - Math.sqrt(discriminant)) ** (1 / 3);
      const x = y + h;
      const rootOne = x;
      (document.getElementById("result") as HTMLInputElement).value =
        `x=${rootOne}`;
      console.log("Case 3: Triple Roots");
    } else if (p != 0) {
      const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
      (document.getElementById("result") as HTMLInputElement).value =
        `x=${rootOne}`;
      console.log("Case 4: 1 Real Root, Double Roots");
    } else {
      (document.getElementById("result") as HTMLInputElement).value =
        `Unexpected Case`;
      console.log("Case 5: Unexpected Result");
      return;
    }
  }
  (document.getElementById("result") as HTMLInputElement).value =
    `${a}x^3 + ${b}x^2 + ${c}x + ${d}`;
  (document.getElementById("p") as HTMLTableCellElement).textContent = `${p}`;
  (document.getElementById("q") as HTMLTableCellElement).textContent = `${q}`;
  (
    document.getElementById("Discriminant") as HTMLTableCellElement
  ).textContent = `${discriminant}`;
});
