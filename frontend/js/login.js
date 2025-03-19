const baseURL = "https://educationalgamificationapp.onrender.com";

document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${baseURL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html"; // Redirect after login
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error("Login Error:", err);
    }
});
