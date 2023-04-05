async function main() {
  document
    .querySelector("#add-book-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const formevent = new FormData(event.target);
      const json = JSON.stringify(Object.fromEntries(formevent));
      console.log(formevent);

      await fetch("http://localhost:3000/books", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: json,
      });
    });
}
main();
