async function test() {
  try {
    const res = await fetch('http://localhost:5000/library/form-data');
    const text = await res.text();
    console.log("RESPONSE:", text.substring(0, 1000) + "...");
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
