const form = document.getElementById("cube-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p = ((3 * a * c) - b ** 2) / (3 * a ** 2);
    const q = ((27 * a ** 2 * d) - (9 * a * b * c) + (2 * b ** 3)) / (27 * a ** 3)
    const discriminant = b * b - 4 * a * c;
    
    if (a == 0) {
        (document.getElementById("result") as HTMLInputElement).value = "Not A Cubic";
        console.log(d, "Case 0");
    } else if (discriminant < 0) {
        (document.getElementById("result") as HTMLInputElement).value = "No roots";
        console.log(d, "Case 1");
    } else if (discriminant > 0) {d 
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
        (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}, x2=${rootTwo}`;
        console.log(d, "Case 2");
    } else {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}`;
        console.log(d, "Case 3");
    }
})

