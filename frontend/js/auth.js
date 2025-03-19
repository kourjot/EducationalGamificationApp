const baseURL = "https://educationalgamificationapp.onrender.com";
const token = localStorage.getItem("token");
const authBtn = document.getElementById("auth-btn");

if (authBtn) {
    if (token) {
        authBtn.innerText = "Logout";
        authBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    } else {
        authBtn.innerText = "Login";
        authBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
}

// Redirect unauthorized users from protected pages
const protectedPages = ["quiz.html", "leaderboard.html", "rewards.html"];
const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage) && !token) {
    window.location.href = "login.html";
}
