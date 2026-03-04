const form = document.getElementById("cube-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const discriminant = a + b + c + d;

    if (discriminant < 0) {
        (document.getElementById("result") as HTMLInputElement).value = "No roots";
    } else if (discriminant > 0) {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
    } else {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
    }
})

