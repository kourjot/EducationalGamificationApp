const badgesContainer = document.getElementById("badges");

const badges = [
    { name: "Quiz Master", icon: "🏆" },
    { name: "Fast Learner", icon: "🎓" },
    { name: "Top Scorer", icon: "⭐" }
];

badges.forEach(badge => {
    let div = document.createElement("div");
    div.innerHTML = `${badge.icon} ${badge.name}`;
    badgesContainer.appendChild(div);
});
