const form = document.getElementById("cube-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission refresh

  const formData = new FormData(form);

  const a: number = Number(formData.get("a"));

  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Checking if a = 0, otherwise proceed.
  if (a === 0) {
    (document.getElementById("result") as HTMLInputElement).value =
      "a-value cannot be 0";
    console.log("Case 0: a-value is zero");
    document
      .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
      .forEach((td) => {
        td.textContent = `n/a`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  // 15x15 grid for canvas graph
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "grey";
  ctx.beginPath();
  for (let i = 1; i < 30; i++) {
    ctx.moveTo(i * 20, 0);
    ctx.lineTo(i * 20, canvas.height);
    ctx.moveTo(0, i * 20);
    ctx.lineTo(canvas.width, i * 20);
  }
  ctx.stroke();

  // x and y axis
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.strokeStyle = "darkgreen";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= canvas.width; i++) {
    const j =
      canvas.height / 2 -
      (a * ((i - canvas.width / 2) / 20) ** 3 +
        b * ((i - canvas.width / 2) / 20) ** 2 +
        c * ((i - canvas.width / 2) / 20) +
        d) *
        20;
    ctx.lineTo(i, j);
  }
  ctx.stroke();

  ctx.fillStyle = "crimson";
  ctx.strokeStyle = "darkred";
  ctx.lineWidth = 1;

  function drawRoot(x: number) {
    ctx.beginPath();
    ctx.arc(x * 20 + canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    return;
  }

  // Cases for Cubic Equation
  if (discriminant > 0) {
    console.log("Case 2: 1 Real Root, 2 Complex Roots");
    const u = Math.cbrt(
      -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
    );
    const v = Math.cbrt(
      -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
    );
    const x1 = u + v + h;
    document
      .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
      .forEach((td) => {
        td.textContent = `Imaginary`;
      });
    (
      document.getElementById("x1") as HTMLTableCellElement
    ).textContent = `${x1}`;
    (document.getElementById("y1") as HTMLTableCellElement).textContent = `0`;
    drawRoot(x1);
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
    (
      document.getElementById("x1") as HTMLTableCellElement
    ).textContent = `${x1}`;
    (
      document.getElementById("x2") as HTMLTableCellElement
    ).textContent = `${x2}`;
    (
      document.getElementById("x3") as HTMLTableCellElement
    ).textContent = `${x3}`;
    drawRoot(x1);
    drawRoot(x2);
    drawRoot(x3);
  } else {
    if (p === 0 && q === 0) {
      console.log("Case 3: Triple Roots");
      const u = Math.cbrt(
        -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
      );
      const v = Math.cbrt(
        -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
      );
      const x1 = u + v + h;
      document
        .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
        .forEach((td) => {
          td.textContent = `0`;
        });
      (
        document.getElementById("x1") as HTMLTableCellElement
      ).textContent = `${x1}`;
      (
        document.getElementById("x2") as HTMLTableCellElement
      ).textContent = `${x1}`;
      (
        document.getElementById("x3") as HTMLTableCellElement
      ).textContent = `${x1}`;
      drawRoot(x1);
    } else if (p != 0) {
      console.log("Case 4: 1 Real Root, Double Roots");
      const u = Math.cbrt(
        -q / 2 + Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
      );
      const v = Math.cbrt(
        -q / 2 - Math.sqrt(Math.abs((q / 2) ** 2 + (p / 3) ** 3))
      );
      const x1 = u + v + h;
      const x2 = Math.cbrt(q / 2) + h;
      document
        .querySelectorAll<HTMLTableCellElement>("td.ZeroIsA")
        .forEach((td) => {
          td.textContent = `0`;
        });
      (
        document.getElementById("x1") as HTMLTableCellElement
      ).textContent = `${x2}`;
      (
        document.getElementById("x2") as HTMLTableCellElement
      ).textContent = `${x1}`;
      (
        document.getElementById("x3") as HTMLTableCellElement
      ).textContent = `${x1}`;
      drawRoot(x2);
      drawRoot(x1);
    } else {
      console.log("Case 5: Unexpected Result");
    }
  }
  (
    document.getElementById("result") as HTMLElement
  ).textContent = `${a}x^3 + ${b}x^2 + ${c}x + ${d}`;
  (document.getElementById("p") as HTMLTableCellElement).textContent = `${p}`;
  (document.getElementById("q") as HTMLTableCellElement).textContent = `${q}`;
  (
    document.getElementById("Discriminant") as HTMLTableCellElement
  ).textContent = `${discriminant}`;
});
