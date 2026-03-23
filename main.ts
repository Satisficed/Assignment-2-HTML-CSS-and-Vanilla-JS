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
  const h = -b / (3 * a);
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 800, 500);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  if (discriminant > 0) {
    console.log("Case 2: 1 Real Root, 2 Complex Roots");
    const u = Math.cbrt(
      -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
    );
    const v = Math.cbrt(
      -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
    );
    const x1 = u + v + h;
    document
      .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
      .forEach((td) => {
        td.textContent = `Complex`;
      });
    (document.getElementById("x1") as HTMLTableCellElement).textContent =
      `${x1}`;
  } else if (discriminant < 0) {
    console.log("Case 1: 3 Real Roots");
    const k = 2 * Math.sqrt(-p / 3);
    const theta =
      (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
    const x1 = k * Math.cos(theta) + h;
    const x2 = k * Math.cos(theta + (2 * Math.PI) / 3) + h;
    const x3 = k * Math.cos(theta + (4 * Math.PI) / 3) + h;
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
  } else {
    if (p === 0 && q === 0) {
      console.log("Case 3: Triple Roots");
      const u = Math.cbrt(
        -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
      );
      const v = Math.cbrt(
        -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
      );
      const x1 = u + v + h;
      document
        .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
        .forEach((td) => {
          td.textContent = `0`;
        });
      (document.getElementById("x1") as HTMLTableCellElement).textContent =
        `${x1}`;
      (document.getElementById("x2") as HTMLTableCellElement).textContent =
        `${x1}`;
      (document.getElementById("x3") as HTMLTableCellElement).textContent =
        `${x1}`;
    } else if (p != 0) {
      console.log("Case 4: 1 Real Root, Double Roots");
      const u = Math.cbrt(
        -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
      );
      const v = Math.cbrt(
        -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3)),
      );
      const x1 = u + v + h;
      const x2 = Math.cbrt(q / 2) + h;
      document
        .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
        .forEach((td) => {
          td.textContent = `0`;
        });
      (document.getElementById("x1") as HTMLTableCellElement).textContent =
        `${x2}`;
      (document.getElementById("x2") as HTMLTableCellElement).textContent =
        `${x1}`;
      (document.getElementById("x3") as HTMLTableCellElement).textContent =
        `${x1}`;
    } else {
      console.log("Case 5: Unexpected Result");
      return;
    }
  }
  (document.getElementById("result") as HTMLElement).textContent =
    `${a}x^3 + ${b}x^2 + ${c}x + ${d}`;
  (document.getElementById("p") as HTMLTableCellElement).textContent = `${p}`;
  (document.getElementById("q") as HTMLTableCellElement).textContent = `${q}`;
  (
    document.getElementById("Discriminant") as HTMLTableCellElement
  ).textContent = `${discriminant}`;
  ctx.beginPath();
  ctx.moveTo(a, a);
  ctx.lineTo(b, b);
  ctx.lineTo(c, c);
  ctx.lineTo(q, d);
  ctx.stroke();
});
