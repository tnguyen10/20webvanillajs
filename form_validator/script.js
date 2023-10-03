const form =document.querySelector('form')
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    console.log(data.getAll())
    console.log('hihi')
    for (const [name, value] of data) {
        console.log(name, ":", value)
    }
})