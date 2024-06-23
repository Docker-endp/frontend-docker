// datos
const register = ()=>{
    const name = document.getElementById('name').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const doc = document.getElementById('doc').value
    const cel = document.getElementById('cel').value
    const date = document.getElementById('date').value
    const password = document.getElementById('password').value

    alert(name + lastname + email + doc +   cel + date + password);

}